import hre from "hardhat";
import fs from "fs";

const { ethers } = hre;

const BASE_SEPOLIA_CHAIN_ID = 84532;
const SWAP_AMOUNT = ethers.parseEther("1.0");
const SWAP_OUT = ethers.parseUnits("3000", 6);

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function queryEventsChunked(contract, fromBlock, toBlock) {
  const events = [];
  const chunkSize = 199;
  for (let start = fromBlock; start <= toBlock; start += chunkSize) {
    const end = Math.min(start + chunkSize - 1, toBlock);
    const batch = await contract.queryFilter(
      contract.filters.JITSurgeExecuted(),
      start,
      end
    );
    events.push(...batch);
  }
  return events;
}

async function main() {
  const deployments = JSON.parse(fs.readFileSync("deployments.json", "utf8"));
  const base = deployments.baseSepolia;
  const lasna = deployments.reactiveLasna;

  if (!base?.mockPool || !base?.destinationCallback) {
    throw new Error("Base Sepolia deployment missing from deployments.json");
  }
  if (!lasna?.omniSurgeReactive) {
    throw new Error("Reactive Lasna deployment missing from deployments.json");
  }

  const [deployer] = await ethers.getSigners();
  console.log("Deployer:", deployer.address);
  console.log("Base MockPool:", base.mockPool);
  console.log("Base DestinationCallback:", base.destinationCallback);
  console.log("Reactive Lasna:", lasna.omniSurgeReactive);

  const pool = await ethers.getContractAt("MockPool", base.mockPool, deployer);
  const baseLogProvider = new ethers.JsonRpcProvider("https://sepolia.base.org");
  const callback = await ethers.getContractAt("DestinationCallback", base.destinationCallback, baseLogProvider);
  const lasnaProvider = new ethers.JsonRpcProvider(process.env.REACTIVE_RPC);
  const reactive = await ethers.getContractAt("OmniSurgeReactive", lasna.omniSurgeReactive, lasnaProvider);

  const subscription = await reactive.originPools(BASE_SEPOLIA_CHAIN_ID, base.mockPool);
  console.log("Subscription active:", subscription.isActive, "| label:", subscription.networkLabel);
  if (!subscription.isActive) {
    throw new Error("Reactive contract is not subscribed to the Base Sepolia pool");
  }

  const startBlock = await ethers.provider.getBlockNumber();
  console.log("\nStarting block:", startBlock);
  console.log("Sending swap of", ethers.formatEther(SWAP_AMOUNT), "ETH on Base Sepolia...");

  const swapTx = await pool.swap(SWAP_AMOUNT, 0, 0, SWAP_OUT, deployer.address);
  const swapReceipt = await swapTx.wait();
  const swapBlock = await ethers.provider.getBlock(swapReceipt.blockNumber);
  console.log("✅ Swap tx:", swapReceipt.hash);
  console.log("   Block:", swapReceipt.blockNumber, "| timestamp:", swapBlock.timestamp);

  console.log("\nWaiting for Reactive callback on Base Sepolia...");
  const deadline = Date.now() + 180_000;
  let match = null;

  while (Date.now() < deadline && !match) {
    await sleep(3_000);
    const latest = await ethers.provider.getBlockNumber();
    const events = await queryEventsChunked(
      callback,
      swapReceipt.blockNumber,
      latest
    );
    if (events.length > 0) {
      match = events[events.length - 1];
      break;
    }
    console.log("   ...still waiting (latest block", latest + ")");
  }

  if (!match) {
    throw new Error("No JITSurgeExecuted event observed within 180 seconds");
  }

  const callbackReceipt = await ethers.provider.getTransactionReceipt(match.transactionHash);
  const callbackBlock = await ethers.provider.getBlock(callbackReceipt.blockNumber);
  const wallClockMs = (callbackBlock.timestamp - swapBlock.timestamp) * 1000;
  const args = match.args;

  console.log("\n==============================================================");
  console.log("✅ FULL TESTNET LOOP COMPLETE");
  console.log("==============================================================");
  console.log("Swap tx:              ", swapReceipt.hash);
  console.log("Callback tx:          ", callbackReceipt.hash);
  console.log("Swap block:           ", swapReceipt.blockNumber);
  console.log("Callback block:       ", callbackReceipt.blockNumber);
  console.log("Swap timestamp:       ", swapBlock.timestamp);
  console.log("Callback timestamp:   ", callbackBlock.timestamp);
  console.log("Wall-clock latency:   ", wallClockMs, "ms");
  console.log("On-chain latency est: ", args.latencyMsEstimated.toString(), "ms");
  console.log("Liquidity deployed:   ", ethers.formatEther(args.liquidityDeployed), "ETH");
  console.log("Fee captured:         ", ethers.formatEther(args.feeCaptured), "ETH");
  console.log("Gas used:             ", args.gasUsed.toString());
  console.log("==============================================================\n");

  const results = {
    timestamp: new Date().toISOString(),
    network: "Base Sepolia -> Reactive Lasna -> Base Sepolia",
    baseSepolia: {
      chainId: BASE_SEPOLIA_CHAIN_ID,
      mockPool: base.mockPool,
      destinationCallback: base.destinationCallback,
    },
    reactiveLasna: {
      chainId: 5318007,
      omniSurgeReactive: lasna.omniSurgeReactive,
    },
    swap: {
      txHash: swapReceipt.hash,
      blockNumber: swapReceipt.blockNumber,
      timestamp: swapBlock.timestamp,
    },
    callback: {
      txHash: callbackReceipt.hash,
      blockNumber: callbackReceipt.blockNumber,
      timestamp: callbackBlock.timestamp,
      executionId: args.executionId.toString(),
      originChainId: args.originChainId.toString(),
      originPool: args.originPool,
      liquidityDeployed: args.liquidityDeployed.toString(),
      feeCaptured: args.feeCaptured.toString(),
      latencySeconds: args.latencySeconds.toString(),
      latencyMsEstimated: args.latencyMsEstimated.toString(),
      gasUsed: args.gasUsed.toString(),
    },
    latency: {
      wallClockMs,
      onChainEstimatedMs: Number(args.latencyMsEstimated.toString()),
    },
  };

  fs.writeFileSync(
    "benchmark-results-testnet.json",
    JSON.stringify(results, null, 2) + "\n"
  );
  console.log("💾 Saved to benchmark-results-testnet.json\n");
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
