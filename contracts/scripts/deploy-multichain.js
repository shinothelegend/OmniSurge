import dns from "dns";
dns.setDefaultResultOrder("ipv4first");

import hre from "hardhat";
import * as fs from "fs";
import * as path from "path";
import { fileURLToPath } from "url";

const { ethers, network } = hre;
const __dirname = path.dirname(fileURLToPath(import.meta.url));

const BASE_SEPOLIA_CHAIN_ID = 84532;
const UNICHAIN_SEPOLIA_CHAIN_ID = 1301;
const REACTIVE_LASNA_CHAIN_ID = 5318007;
const SYSTEM_CONTRACT = "0x8888888888888888888888888888888888888888";
const BASE_CALLBACK_PROXY = "0x476F44b11F5C942c58f4c8E3d0300E5710743585";
const UNICHAIN_CALLBACK_PROXY = "0x775c9B990ADe401060B78D0e98684eEf8d2466C1";

const DEPLOYMENTS_PATH = path.resolve(__dirname, "../deployments.json");

function loadDeployments() {
  if (fs.existsSync(DEPLOYMENTS_PATH)) {
    try {
      return JSON.parse(fs.readFileSync(DEPLOYMENTS_PATH, "utf8"));
    } catch {
      return {};
    }
  }
  return {};
}

function saveDeployments(deployments) {
  fs.writeFileSync(
    DEPLOYMENTS_PATH,
    JSON.stringify(deployments, null, 2) + "\n"
  );
  console.log(`\n💾 Deployments recorded to ${DEPLOYMENTS_PATH}\n`);
}

async function main() {
  const [deployer] = await ethers.getSigners();
  const net = await ethers.provider.getNetwork();
  const chainIdNum = Number(net.chainId);

  console.log(`\n============================================================`);
  console.log(`🚀 Deploying OmniSurge on Chain ID: ${chainIdNum} (${network.name})`);
  console.log(`👤 Deployer: ${deployer.address}`);
  const balance = await ethers.provider.getBalance(deployer.address);
  console.log(`💰 Deployer Balance: ${ethers.formatEther(balance)} native`);
  console.log(`============================================================\n`);

  if (balance === 0n) {
    throw new Error(`❌ Insufficient funds on chain ${chainIdNum}. Balance is 0.`);
  }

  const deployments = loadDeployments();

  // ================================================================
  // NETWORK 1: Base Sepolia (84532) — DestinationCallback + MockPool
  // ================================================================
  if (chainIdNum === BASE_SEPOLIA_CHAIN_ID) {
    console.log("📦 1/3 Deploying DestinationCallback...");
    const DestinationCallback = await ethers.getContractFactory("DestinationCallback");
    const destinationCallback = await DestinationCallback.deploy(
      BASE_CALLBACK_PROXY,
      ethers.ZeroAddress
    );
    await destinationCallback.waitForDeployment();
    const destAddress = await destinationCallback.getAddress();
    console.log(`✅ DestinationCallback: ${destAddress}`);

    console.log("📦 2/3 Deploying MockPool (Base Sepolia WETH-USDC)...");
    const MockPool = await ethers.getContractFactory("MockPool");
    const poolBase = await MockPool.deploy(
      "Base Sepolia WETH-USDC",
      "bWETH-USDC",
      ethers.parseEther("500"),
      ethers.parseUnits("1500000", 6)
    );
    await poolBase.waitForDeployment();
    const poolBaseAddress = await poolBase.getAddress();
    console.log(`✅ MockPool (Base Sepolia): ${poolBaseAddress}`);

    console.log("🔗 3/3 Registering pool on DestinationCallback...");
    const regTx = await destinationCallback.setPoolRegistration(poolBaseAddress, true);
    await regTx.wait();
    console.log(`✅ Pool registered`);

    deployments.baseSepolia = {
      chainId: BASE_SEPOLIA_CHAIN_ID,
      destinationCallback: destAddress,
      mockPool: poolBaseAddress,
      deployer: deployer.address,
      deployedAt: new Date().toISOString(),
    };
    saveDeployments(deployments);

    console.log("\n🎉 Base Sepolia deployment complete!");
    return;
  }

  // ================================================================
  // NETWORK 2: Reactive Lasna (5318007) — OmniSurgeReactive RSC
  // ================================================================
  if (chainIdNum === REACTIVE_LASNA_CHAIN_ID) {
    if (!deployments.baseSepolia || !deployments.baseSepolia.destinationCallback) {
      throw new Error(
        "❌ Base Sepolia deployment not found in deployments.json. Deploy to Base Sepolia first."
      );
    }

    const destCallbackAddress = deployments.baseSepolia.destinationCallback;
    console.log(`🎯 Target Base Sepolia Callback: ${destCallbackAddress}`);

    console.log("📦 Deploying OmniSurgeReactive RSC...");
    const OmniSurgeReactive = await ethers.getContractFactory("OmniSurgeReactive");
    const reactiveListener = await OmniSurgeReactive.deploy(
      SYSTEM_CONTRACT,
      BASE_SEPOLIA_CHAIN_ID,
      destCallbackAddress,
      ethers.parseEther("0.5")
    );
    await reactiveListener.waitForDeployment();
    const reactiveAddress = await reactiveListener.getAddress();
    console.log(`✅ OmniSurgeReactive: ${reactiveAddress}`);

    console.log("💰 Funding OmniSurgeReactive with 0.05 lREACT for reactive gas...");
    const fundTx = await deployer.sendTransaction({
      to: reactiveAddress,
      value: ethers.parseEther("0.05"),
    });
    await fundTx.wait();
    console.log(`✅ Funded: ${fundTx.hash}`);

    // If Base Sepolia pool is available, subscribe
    if (deployments.baseSepolia.mockPool) {
      console.log(`🔗 Subscribing to Base Sepolia pool: ${deployments.baseSepolia.mockPool}`);
      try {
        const subTx = await reactiveListener.subscribePool(
          BASE_SEPOLIA_CHAIN_ID,
          deployments.baseSepolia.mockPool,
          "Base Sepolia WETH-USDC"
        );
        await subTx.wait();
        console.log(`✅ Subscribed to Base Sepolia pool`);
      } catch (err) {
        console.warn(`⚠️ Subscription note: ${err.message}`);
      }
    }

    // If Unichain Sepolia pool is available, subscribe
    if (deployments.unichainSepolia && deployments.unichainSepolia.mockPool) {
      console.log(`🔗 Subscribing to Unichain Sepolia pool: ${deployments.unichainSepolia.mockPool}`);
      try {
        const subTx = await reactiveListener.subscribePool(
          UNICHAIN_SEPOLIA_CHAIN_ID,
          deployments.unichainSepolia.mockPool,
          "Unichain Sepolia WETH-USDC"
        );
        await subTx.wait();
        console.log(`✅ Subscribed to Unichain Sepolia pool`);
      } catch (err) {
        console.warn(`⚠️ Subscription note: ${err.message}`);
      }
    }

    deployments.reactiveLasna = {
      chainId: REACTIVE_LASNA_CHAIN_ID,
      omniSurgeReactive: reactiveAddress,
      systemContract: SYSTEM_CONTRACT,
      deployer: deployer.address,
      deployedAt: new Date().toISOString(),
    };
    saveDeployments(deployments);

    console.log("\n🎉 Reactive Lasna deployment complete!");
    console.log(`   Next: authorize ${reactiveAddress} on Base Sepolia destinationCallback.`);
    return;
  }

  // ================================================================
  // NETWORK 3: Unichain Sepolia (1301) — MockPool
  // ================================================================
  if (chainIdNum === UNICHAIN_SEPOLIA_CHAIN_ID) {
    console.log("📦 Deploying MockPool (Unichain Sepolia WETH-USDC)...");
    const MockPool = await ethers.getContractFactory("MockPool");
    const poolUnichain = await MockPool.deploy(
      "Unichain Sepolia WETH-USDC",
      "uWETH-USDC",
      ethers.parseEther("500"),
      ethers.parseUnits("1500000", 6)
    );
    await poolUnichain.waitForDeployment();
    const poolUnichainAddress = await poolUnichain.getAddress();
    console.log(`✅ MockPool (Unichain Sepolia): ${poolUnichainAddress}`);

    deployments.unichainSepolia = {
      chainId: UNICHAIN_SEPOLIA_CHAIN_ID,
      mockPool: poolUnichainAddress,
      deployer: deployer.address,
      deployedAt: new Date().toISOString(),
    };
    saveDeployments(deployments);

    console.log("\n🎉 Unichain Sepolia deployment complete!");
    return;
  }

  throw new Error(`❌ Unsupported network: ${network.name} (chainId: ${chainIdNum})`);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
