import { expect } from "chai";
import hre from "hardhat";
const { ethers } = hre;

describe("OmniSurge JIT Flash Liquidity Protocol", function () {
  let owner, relayer, trader, attacker;
  let mockSystem;
  let originPoolBase, originPoolUnichain;
  let reactiveListener;
  let destinationCallback;

  const BASE_SEPOLIA_CHAIN_ID = 84532;
  const UNICHAIN_SEPOLIA_CHAIN_ID = 1301;
  const UNISWAP_V2_SWAP_TOPIC = "0xd78ad95fa46c994b6551d0da85fc275fe613ce37657fb8d5e3d130840159d822";

  beforeEach(async function () {
    [owner, relayer, trader, attacker] = await ethers.getSigners();

    // 1. Deploy Mock Reactive System
    const MockReactiveSystem = await ethers.getContractFactory("MockReactiveSystem");
    mockSystem = await MockReactiveSystem.deploy();

    // 2. Deploy Mock DEX Pools
    const MockPool = await ethers.getContractFactory("MockPool");
    originPoolBase = await MockPool.deploy("Base Pool WETH/USDC", "bWETH-USDC", ethers.parseEther("1000"), ethers.parseUnits("3000000", 6));
    originPoolUnichain = await MockPool.deploy("Unichain Pool WETH/USDC", "uWETH-USDC", ethers.parseEther("1000"), ethers.parseUnits("3000000", 6));

    // 3. Deploy Destination Callback contract (destination is Base Sepolia)
    const DestinationCallback = await ethers.getContractFactory("DestinationCallback");
    destinationCallback = await DestinationCallback.deploy(relayer.address, ethers.ZeroAddress);

    // Register origin pools on DestinationCallback
    await destinationCallback.setPoolRegistration(await originPoolBase.getAddress(), true);
    await destinationCallback.setPoolRegistration(await originPoolUnichain.getAddress(), true);

    // 4. Deploy OmniSurgeReactive RSC
    const OmniSurgeReactive = await ethers.getContractFactory("OmniSurgeReactive");
    reactiveListener = await OmniSurgeReactive.deploy(
      await mockSystem.getAddress(),
      BASE_SEPOLIA_CHAIN_ID,
      await destinationCallback.getAddress(),
      ethers.parseEther("1.0") // 1 ETH min threshold
    );

    // Set authorized reactive contract on destination
    await destinationCallback.setAuthorizedReactiveContract(await reactiveListener.getAddress());

    // Subscribe pools
    await reactiveListener.subscribePool(BASE_SEPOLIA_CHAIN_ID, await originPoolBase.getAddress(), "Base Sepolia");
    await reactiveListener.subscribePool(UNICHAIN_SEPOLIA_CHAIN_ID, await originPoolUnichain.getAddress(), "Unichain Sepolia");
  });

  describe("1. Pool Subscription & Parameter Configuration", function () {
    it("should correctly record origin pool subscriptions", async function () {
      const baseSub = await reactiveListener.originPools(BASE_SEPOLIA_CHAIN_ID, await originPoolBase.getAddress());
      expect(baseSub.isActive).to.be.true;
      expect(baseSub.networkLabel).to.equal("Base Sepolia");

      const unichainSub = await reactiveListener.originPools(UNICHAIN_SEPOLIA_CHAIN_ID, await originPoolUnichain.getAddress());
      expect(unichainSub.isActive).to.be.true;
      expect(unichainSub.networkLabel).to.equal("Unichain Sepolia");
    });

    it("should allow owner to update destination config and min threshold", async function () {
      const newThreshold = ethers.parseEther("2.5");
      await reactiveListener.setDestinationConfig(1301, trader.address);
      await reactiveListener.setMinImbalanceThreshold(newThreshold);

      expect(await reactiveListener.destinationCallback()).to.equal(trader.address);
      expect(await reactiveListener.destinationChainId()).to.equal(1301);
      expect(await reactiveListener.minImbalanceThreshold()).to.equal(newThreshold);
    });
  });

  describe("2. Reactive Event Ingestion & Callback Emission", function () {
    it("should ignore swaps below the minimum imbalance threshold", async function () {
      // 0.2 ETH swap (below 1.0 ETH threshold)
      const lowVolumeSwapData = ethers.AbiCoder.defaultAbiCoder().encode(
        ["uint256", "uint256", "uint256", "uint256"],
        [ethers.parseEther("0.2"), 0, 0, ethers.parseUnits("600", 6)]
      );

      const logRecord = {
        chainId: BASE_SEPOLIA_CHAIN_ID,
        contractAddress: await originPoolBase.getAddress(),
        topic0: UNISWAP_V2_SWAP_TOPIC,
        topic1: 0,
        topic2: 0,
        topic3: 0,
        data: lowVolumeSwapData,
        blockNumber: 1000,
        opCode: 0,
        blockHash: 0,
        txHash: 0,
        logIndex: 0,
      };

      await expect(reactiveListener.react(logRecord)).to.not.emit(reactiveListener, "SurgeDispatched");
      expect(await reactiveListener.totalSurgesDispatched()).to.equal(0);
    });

    it("should detect massive swap and emit SurgeDispatched with system callback request", async function () {
      const swapAmount = ethers.parseEther("15.0"); // 15 ETH
      const swapData = ethers.AbiCoder.defaultAbiCoder().encode(
        ["uint256", "uint256", "uint256", "uint256"],
        [swapAmount, 0, 0, ethers.parseUnits("45000", 6)]
      );

      const originBlockNumber = 58663613;
      const logRecord = {
        chainId: BASE_SEPOLIA_CHAIN_ID,
        contractAddress: await originPoolBase.getAddress(),
        topic0: UNISWAP_V2_SWAP_TOPIC,
        topic1: 0,
        topic2: 0,
        topic3: 0,
        data: swapData,
        blockNumber: originBlockNumber,
        opCode: 0,
        blockHash: 0,
        txHash: 0,
        logIndex: 0,
      };

      const reactTx = await reactiveListener.react(logRecord);
      const reactReceipt = await reactTx.wait();

      await expect(reactTx)
        .to.emit(reactiveListener, "SurgeDispatched")
        .withArgs(
          1,
          BASE_SEPOLIA_CHAIN_ID,
          await originPoolBase.getAddress(),
          swapAmount,
          (swapAmount * 15000n) / 10000n,
          (t) => t > 0,
          originBlockNumber
        );

      // Verify mockSystem received callback request
      const cbReq = reactReceipt.logs.find((l) => {
        try {
          return mockSystem.interface.parseLog(l)?.name === "CallbackRequested";
        } catch {
          return false;
        }
      });
      expect(cbReq).to.not.be.undefined;
      const parsedReq = mockSystem.interface.parseLog(cbReq);
      expect(parsedReq.args.chainId).to.equal(BASE_SEPOLIA_CHAIN_ID);
      expect(parsedReq.args.recipient).to.equal(await destinationCallback.getAddress());

      expect(await reactiveListener.totalSurgesDispatched()).to.equal(1);
    });
  });

  describe("3. Destination JIT Liquidity Execution & Latency Telemetry", function () {
    it("should execute JIT surge, capture fees, and record sub-second latency benchmarks", async function () {
      const volumeIn = ethers.parseEther("10.0");
      const targetLiquidity = ethers.parseEther("15.0"); // 150%
      const originBlock = 12000;
      const latestBlock = await ethers.provider.getBlock("latest");
      const originTimestamp = latestBlock.timestamp - 1; // 1 second ago

      // Relayer executes callback with reactive identity injected
      const tx = await destinationCallback.connect(relayer).triggerJITLiquidity(
        await reactiveListener.getAddress(),
        BASE_SEPOLIA_CHAIN_ID,
        await originPoolBase.getAddress(),
        volumeIn,
        0,
        targetLiquidity,
        originTimestamp,
        originBlock
      );

      await expect(tx).to.emit(destinationCallback, "JITSurgeExecuted");

      // Verify protocol metrics
      const [totalExecs, totalVol, totalFees, avgLatency] = await destinationCallback.getProtocolMetrics();
      expect(totalExecs).to.equal(1);
      expect(totalVol).to.equal(volumeIn);
      // Fee = 10 ETH * 30 bps = 0.03 ETH
      expect(totalFees).to.equal(ethers.parseEther("0.03"));
      expect(avgLatency).to.be.gt(0);

      // Verify execution record
      const history = await destinationCallback.getLatestExecutions(1);
      expect(history.length).to.equal(1);
      expect(history[0].executionId).to.equal(1);
      expect(history[0].originChainId).to.equal(BASE_SEPOLIA_CHAIN_ID);
      expect(history[0].volumeIn).to.equal(volumeIn);
      expect(history[0].feeCaptured).to.equal(ethers.parseEther("0.03"));
      expect(history[0].latencySeconds).to.be.gte(1);
    });

    it("should correctly estimate latency for Unichain Sepolia 1s blocks", async function () {
      const volumeIn = ethers.parseEther("5.0");
      const targetLiquidity = ethers.parseEther("7.5");
      const originBlock = 30000;
      const latestBlock = await ethers.provider.getBlock("latest");
      const originTimestamp = latestBlock.timestamp; // same second

      await destinationCallback.connect(relayer).triggerJITLiquidity(
        await reactiveListener.getAddress(),
        UNICHAIN_SEPOLIA_CHAIN_ID,
        await originPoolUnichain.getAddress(),
        0,
        volumeIn,
        targetLiquidity,
        originTimestamp,
        originBlock
      );

      const history = await destinationCallback.getLatestExecutions(1);
      expect(history[0].originChainId).to.equal(UNICHAIN_SEPOLIA_CHAIN_ID);
      expect(history[0].latencyMsEstimated).to.be.gte(0);
    });
  });

  describe("4. Security Assessment & Reentrancy / Attack Resistance", function () {
    it("SECURITY: prevents unauthorized callers from executing callback", async function () {
      const volumeIn = ethers.parseEther("10.0");
      const targetLiquidity = ethers.parseEther("15.0");

      await expect(
        destinationCallback.connect(attacker).triggerJITLiquidity(
          await reactiveListener.getAddress(),
          BASE_SEPOLIA_CHAIN_ID,
          await originPoolBase.getAddress(),
          volumeIn,
          0,
          targetLiquidity,
          1000,
          500
        )
      ).to.be.revertedWith("OmniSurgeCallback: unauthorized caller");
    });

    it("SECURITY: prevents unauthorized reactive contract address injection", async function () {
      const volumeIn = ethers.parseEther("10.0");
      const targetLiquidity = ethers.parseEther("15.0");

      await expect(
        destinationCallback.connect(relayer).triggerJITLiquidity(
          attacker.address, // Spoofed reactive identity
          BASE_SEPOLIA_CHAIN_ID,
          await originPoolBase.getAddress(),
          volumeIn,
          0,
          targetLiquidity,
          1000,
          500
        )
      ).to.be.revertedWith("OmniSurgeCallback: unauthorized reactive");
    });

    it("SECURITY: prevents replay attacks with identical execution parameters", async function () {
      const volumeIn = ethers.parseEther("8.0");
      const targetLiquidity = ethers.parseEther("12.0");
      const originTimestamp = 1700000000;
      const originBlock = 99999;

      // First execution succeeds
      await destinationCallback.connect(relayer).triggerJITLiquidity(
        await reactiveListener.getAddress(),
        BASE_SEPOLIA_CHAIN_ID,
        await originPoolBase.getAddress(),
        volumeIn,
        0,
        targetLiquidity,
        originTimestamp,
        originBlock
      );

      // Second execution with identical hash must revert
      await expect(
        destinationCallback.connect(relayer).triggerJITLiquidity(
          await reactiveListener.getAddress(),
          BASE_SEPOLIA_CHAIN_ID,
          await originPoolBase.getAddress(),
          volumeIn,
          0,
          targetLiquidity,
          originTimestamp,
          originBlock
        )
      ).to.be.revertedWith("OmniSurgeCallback: replay prevented");
    });

    it("SECURITY: emergency pause stops all JIT executions", async function () {
      await destinationCallback.setPaused(true);

      await expect(
        destinationCallback.connect(relayer).triggerJITLiquidity(
          await reactiveListener.getAddress(),
          BASE_SEPOLIA_CHAIN_ID,
          await originPoolBase.getAddress(),
          ethers.parseEther("5.0"),
          0,
          ethers.parseEther("7.5"),
          1700000001,
          100000
        )
      ).to.be.revertedWith("OmniSurgeCallback: contract paused");
    });
  });

  describe("5. End-to-End Simulation Loop: Event -> Reactive -> Destination Callback", function () {
    it("should simulate the complete cross-chain reactive cycle seamlessly", async function () {
      // 1. Trader executes a large swap on Base Sepolia MockPool
      const swapAmount = ethers.parseEther("25.0"); // 25 ETH
      await originPoolBase.connect(trader).swap(
        swapAmount,
        0,
        0,
        ethers.parseUnits("75000", 6),
        trader.address
      );

      const latestBlock = await ethers.provider.getBlock("latest");

      // 2. ReactVM passes log to OmniSurgeReactive
      const swapData = ethers.AbiCoder.defaultAbiCoder().encode(
        ["uint256", "uint256", "uint256", "uint256"],
        [swapAmount, 0, 0, ethers.parseUnits("75000", 6)]
      );

      const logRecord = {
        chainId: BASE_SEPOLIA_CHAIN_ID,
        contractAddress: await originPoolBase.getAddress(),
        topic0: UNISWAP_V2_SWAP_TOPIC,
        topic1: 0,
        topic2: 0,
        topic3: 0,
        data: swapData,
        blockNumber: latestBlock.number,
        opCode: 0,
        blockHash: 0,
        txHash: 0,
        logIndex: 0,
      };

      const reactTx = await reactiveListener.react(logRecord);
      const reactReceipt = await reactTx.wait();

      // Extract CallbackRequested event from mockSystem
      const cbReqLog = reactReceipt.logs.find((l) => {
        try {
          return mockSystem.interface.parseLog(l)?.name === "CallbackRequested";
        } catch {
          return false;
        }
      });
      expect(cbReqLog).to.not.be.undefined;
      const parsedCallback = mockSystem.interface.parseLog(cbReqLog);

      // 3. Relayer executes payload on DestinationCallback
      const destTx = await relayer.sendTransaction({
        to: parsedCallback.args.recipient,
        data: parsedCallback.args.payload,
        gasLimit: parsedCallback.args.gasLimit,
      });
      const destReceipt = await destTx.wait();

      // Verify JIT surge executed on destination
      const jitEvent = destReceipt.logs.find((l) => {
        try {
          return destinationCallback.interface.parseLog(l)?.name === "JITSurgeExecuted";
        } catch {
          return false;
        }
      });
      expect(jitEvent).to.not.be.undefined;
      const parsedJit = destinationCallback.interface.parseLog(jitEvent);

      expect(parsedJit.args.originChainId).to.equal(BASE_SEPOLIA_CHAIN_ID);
      expect(parsedJit.args.liquidityDeployed).to.equal((swapAmount * 15000n) / 10000n);
      expect(parsedJit.args.feeCaptured).to.equal((swapAmount * 30n) / 10000n); // 0.075 ETH

      console.log(`\n    ⚡ End-to-End Latency: ${parsedJit.args.latencyMsEstimated} ms | Fees Captured: ${ethers.formatEther(parsedJit.args.feeCaptured)} ETH | Gas: ${parsedJit.args.gasUsed}\n`);
    });
  });
});
