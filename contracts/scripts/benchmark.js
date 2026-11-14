import hre from "hardhat";
import fs from "fs";

const { ethers } = hre;

/**
 * OmniSurge Latency Benchmark
 * Measures end-to-end latency across the full reactive loop:
 *   Origin Swap -> Reactive react() -> Destination triggerJITLiquidity()
 *
 * Run: npx hardhat run scripts/benchmark.js
 */

const BASE_SEPOLIA_CHAIN_ID = 84532;
const UNISWAP_V2_SWAP_TOPIC =
  "0xc42079f94a6350d7e6235f29174924f928cc2ac818eb64fed8004e115fbcca67";

async function main() {
  const [owner, relayer, trader] = await ethers.getSigners();
  console.log("\n==============================================================");
  console.log("📊 OMNISURGE LATENCY BENCHMARK");
  console.log("==============================================================\n");

  // Deploy contracts locally
  const MockReactiveSystem = await ethers.getContractFactory("MockReactiveSystem");
  const mockSystem = await MockReactiveSystem.deploy();

  const MockPool = await ethers.getContractFactory("MockPool");
  const originPoolBase = await MockPool.deploy(
    "Base Pool WETH/USDC",
    "bWETH-USDC",
    ethers.parseEther("1000"),
    ethers.parseUnits("3000000", 6)
  );

  const DestinationCallback = await ethers.getContractFactory("DestinationCallback");
  const destinationCallback = await DestinationCallback.deploy(
    relayer.address,
    ethers.ZeroAddress
  );
  await destinationCallback.setPoolRegistration(await originPoolBase.getAddress(), true);

  const OmniSurgeReactive = await ethers.getContractFactory("OmniSurgeReactive");
  const reactiveListener = await OmniSurgeReactive.deploy(
    await mockSystem.getAddress(),
    BASE_SEPOLIA_CHAIN_ID,
    await destinationCallback.getAddress(),
    ethers.parseEther("1.0")
  );
  await destinationCallback.setAuthorizedReactiveContract(await reactiveListener.getAddress());

  // ---- BENCHMARK: Base Sepolia origin -> Reactive -> Destination ----
  console.log("🔄 Running full-loop benchmark (Base Sepolia origin)...\n");

  const swapAmount = ethers.parseEther("25.0");
  const swapData = ethers.AbiCoder.defaultAbiCoder().encode(
    ["uint256", "uint256", "uint256", "uint256"],
    [swapAmount, 0, 0, ethers.parseUnits("75000", 6)]
  );

  // Stage 1: Origin swap
  const originStart = Date.now();
  const originBlockBefore = await ethers.provider.getBlockNumber();

  const swapTx = await originPoolBase.connect(trader).swap(
    swapAmount,
    0,
    0,
    ethers.parseUnits("75000", 6),
    trader.address
  );
  const swapReceipt = await swapTx.wait();
  const originEnd = Date.now();
  const originBlockAfter = await ethers.provider.getBlockNumber();

  const stage1Ms = originEnd - originStart;
  console.log(`  Stage 1 - Origin Swap (Base Sepolia): ${stage1Ms} ms`);
  console.log(`    Tx: ${swapReceipt.hash}`);
  console.log(`    Block: ${originBlockBefore} -> ${originBlockAfter}`);

  // Stage 2: Reactive react()
  const reactiveStart = Date.now();
  const latestBlock = await ethers.provider.getBlock("latest");
  const logRecord = {
    chain_id: BASE_SEPOLIA_CHAIN_ID,
    _contract: await originPoolBase.getAddress(),
    topic_0: UNISWAP_V2_SWAP_TOPIC,
    topic_1: 0,
    topic_2: 0,
    topic_3: 0,
    data: swapData,
    block_number: latestBlock.number,
    op_code: 0,
  };

  const reactTx = await reactiveListener.react(logRecord);
  const reactReceipt = await reactTx.wait();
  const reactiveEnd = Date.now();

  const stage2Ms = reactiveEnd - reactiveStart;
  console.log(`  Stage 2 - Reactive ReactVM: ${stage2Ms} ms`);
  console.log(`    Tx: ${reactReceipt.hash}`);

  // Extract Callback payload
  const callbackLog = reactReceipt.logs.find((l) => {
    try {
      return reactiveListener.interface.parseLog(l)?.name === "Callback";
    } catch {
      return false;
    }
  });
  const parsedCallback = reactiveListener.interface.parseLog(callbackLog);

  // Stage 3: Destination callback
  const destStart = Date.now();
  const destTx = await relayer.sendTransaction({
    to: parsedCallback.args._contract,
    data: parsedCallback.args.payload,
    gasLimit: parsedCallback.args.gas_limit,
  });
  const destReceipt = await destTx.wait();
  const destEnd = Date.now();

  const stage3Ms = destEnd - destStart;
  console.log(`  Stage 3 - Destination Callback: ${stage3Ms} ms`);
  console.log(`    Tx: ${destReceipt.hash}`);

  // Extract JIT event
  const jitLog = destReceipt.logs.find((l) => {
    try {
      return destinationCallback.interface.parseLog(l)?.name === "JITSurgeExecuted";
    } catch {
      return false;
    }
  });
  const parsedJit = destinationCallback.interface.parseLog(jitLog);

  // ---- TOTALS ----
  const totalMs = stage1Ms + stage2Ms + stage3Ms;
  const wallClockMs = destEnd - originStart;

  console.log("\n==============================================================");
  console.log("📈 RESULTS");
  console.log("==============================================================");
  console.log(`  Stage 1 (Origin Swap):   ${stage1Ms} ms`);
  console.log(`  Stage 2 (ReactVM):       ${stage2Ms} ms`);
  console.log(`  Stage 3 (Callback):      ${stage3Ms} ms`);
  console.log(`  ----------------------------`);
  console.log(`  Total (sum of stages):   ${totalMs} ms`);
  console.log(`  Wall clock (E2E):        ${wallClockMs} ms`);
  console.log(`  Liquidity Deployed:      ${ethers.formatEther(parsedJit.args.liquidityDeployed)} ETH`);
  console.log(`  Fee Captured:            ${ethers.formatEther(parsedJit.args.feeCaptured)} ETH`);
  console.log(`  Gas Used:                ${parsedJit.args.gasUsed}`);
  console.log(`==============================================================\n`);

  // Save results
  const results = {
    timestamp: new Date().toISOString(),
    network: "local-hardhat",
    stage1OriginSwapMs: stage1Ms,
    stage2ReactiveVMms: stage2Ms,
    stage3DestinationCallbackMs: stage3Ms,
    totalMs,
    wallClockMs,
    liquidityDeployed: parsedJit.args.liquidityDeployed.toString(),
    feeCaptured: parsedJit.args.feeCaptured.toString(),
    gasUsed: parsedJit.args.gasUsed.toString(),
    txHashes: {
      originSwap: swapReceipt.hash,
      reactiveReact: reactReceipt.hash,
      destinationCallback: destReceipt.hash,
    },
  };
  fs.writeFileSync(
    "benchmark-results.json",
    JSON.stringify(results, null, 2) + "\n"
  );
  console.log("💾 Results saved to benchmark-results.json\n");
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
