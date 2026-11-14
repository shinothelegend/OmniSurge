"use client";

import React, { createContext, useContext, useState, useEffect, useCallback } from "react";
import { ethers } from "ethers";
import {
  WalletState,
  NetworkTelemetry,
  fetchNetworkTelemetry,
  switchNetwork,
  executePoolDeposit,
  executeSurgeSimulation,
} from "@/lib/web3";
import { NETWORKS } from "@/lib/contracts";

interface Web3ContextType {
  wallet: WalletState;
  connectWallet: () => Promise<void>;
  disconnectWallet: () => void;
  switchChain: (chainId: number) => Promise<boolean>;
  telemetry: {
    baseSepolia: NetworkTelemetry;
    unichainSepolia: NetworkTelemetry;
    reactiveLasna: NetworkTelemetry;
  };
  refreshTelemetry: () => Promise<void>;
  deposit: (amountEth: string, chain: "baseSepolia" | "unichainSepolia") => Promise<{ success: boolean; txHash?: string; error?: string }>;
  simulateSurge: (volumeEth: string, chain: "baseSepolia" | "unichainSepolia") => Promise<{ success: boolean; txHash?: string; latencyMs: number; error?: string }>;
}

const defaultTelemetry: NetworkTelemetry = {
  blockNumber: 0,
  latencyMs: 180,
  gasPriceGwei: "0.01",
  timestamp: Date.now(),
  online: false,
};

const Web3Context = createContext<Web3ContextType | null>(null);

export function Web3Provider({ children }: { children: React.ReactNode }) {
  const [wallet, setWallet] = useState<WalletState>({
    address: null,
    chainId: null,
    balanceEth: "0.00",
    isConnected: false,
    isConnecting: false,
    networkName: "Disconnected",
  });

  const [telemetry, setTelemetry] = useState({
    baseSepolia: { ...defaultTelemetry },
    unichainSepolia: { ...defaultTelemetry },
    reactiveLasna: { ...defaultTelemetry },
  });

  // Poll live block data from Base Sepolia & Unichain Sepolia public RPCs
  const refreshTelemetry = useCallback(async () => {
    try {
      const [base, uni, reactive] = await Promise.all([
        fetchNetworkTelemetry("baseSepolia"),
        fetchNetworkTelemetry("unichainSepolia"),
        fetchNetworkTelemetry("reactiveLasna"),
      ]);
      setTelemetry({
        baseSepolia: base,
        unichainSepolia: uni,
        reactiveLasna: reactive,
      });
    } catch (e) {
      console.warn("[Web3Provider] Telemetry poll error:", e);
    }
  }, []);

  useEffect(() => {
    refreshTelemetry();
    const interval = setInterval(refreshTelemetry, 5000);
    return () => clearInterval(interval);
  }, [refreshTelemetry]);

  // Connect to Injected Browser Wallet
  const connectWallet = useCallback(async () => {
    if (typeof window === "undefined" || !(window as any).ethereum) {
      alert("No Ethereum wallet found. Please install MetaMask, Rabby, or Coinbase Wallet.");
      return;
    }

    setWallet((prev) => ({ ...prev, isConnecting: true }));
    try {
      const provider = new ethers.BrowserProvider((window as any).ethereum);
      const accounts = await provider.send("eth_requestAccounts", []);
      const network = await provider.getNetwork();
      const signer = await provider.getSigner();
      const balance = await provider.getBalance(accounts[0]);

      const chainId = Number(network.chainId);
      let networkName = `Chain ${chainId}`;
      if (chainId === NETWORKS.baseSepolia.chainId) networkName = NETWORKS.baseSepolia.name;
      else if (chainId === NETWORKS.unichainSepolia.chainId) networkName = NETWORKS.unichainSepolia.name;
      else if (chainId === NETWORKS.reactiveLasna.chainId) networkName = NETWORKS.reactiveLasna.name;

      setWallet({
        address: accounts[0],
        chainId,
        balanceEth: Number(ethers.formatEther(balance)).toFixed(4),
        isConnected: true,
        isConnecting: false,
        networkName,
      });
    } catch (err: any) {
      console.error("Wallet connection failed:", err);
      setWallet((prev) => ({ ...prev, isConnecting: false }));
    }
  }, []);

  const disconnectWallet = useCallback(() => {
    setWallet({
      address: null,
      chainId: null,
      balanceEth: "0.00",
      isConnected: false,
      isConnecting: false,
      networkName: "Disconnected",
    });
  }, []);

  // Listen for account / chain changes
  useEffect(() => {
    if (typeof window === "undefined" || !(window as any).ethereum) return;
    const eth = (window as any).ethereum;

    const handleAccountsChanged = (accounts: string[]) => {
      if (accounts.length === 0) {
        disconnectWallet();
      } else {
        connectWallet();
      }
    };

    const handleChainChanged = () => {
      connectWallet();
    };

    eth.on?.("accountsChanged", handleAccountsChanged);
    eth.on?.("chainChanged", handleChainChanged);

    return () => {
      eth.removeListener?.("accountsChanged", handleAccountsChanged);
      eth.removeListener?.("chainChanged", handleChainChanged);
    };
  }, [connectWallet, disconnectWallet]);

  return (
    <Web3Context.Provider
      value={{
        wallet,
        connectWallet,
        disconnectWallet,
        switchChain: switchNetwork,
        telemetry,
        refreshTelemetry,
        deposit: (amount, chain) => executePoolDeposit({ amountEth: amount, chain }),
        simulateSurge: (vol, chain) => executeSurgeSimulation({ swapVolumeEth: vol, chain }),
      }}
    >
      {children}
    </Web3Context.Provider>
  );
}

export function useWeb3() {
  const context = useContext(Web3Context);
  if (!context) {
    throw new Error("useWeb3 must be used within a Web3Provider");
  }
  return context;
}

