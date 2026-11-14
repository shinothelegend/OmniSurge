import hre from "hardhat";
const { ethers } = hre;

async function main() {
  const [deployer] = await ethers.getSigners();
  const network = await ethers.provider.getNetwork();
  console.log(`\n======================================================`);
  console.log(`🚀 Deploying OmniSurge Contracts on Chain ID: ${network.chainId}`);
  console.log(`👤 Deployer Address: ${deployer.address}`);
  console.log(`======================================================\n`);

  // Target Chain IDs
  const BASE_SEPOLIA_CHAIN_ID = 84532;
  const UNICHAIN_SEPOLIA_CHAIN_ID = 1301;
  const REACTIVE_LASNA_CHAIN_ID = 5318007;

  // 1. Deploy Destination Callback Contract (if on Base or Unichain Sepolia)
  console.log("📦 Deploying DestinationCallback...");
  const DestinationCallback = await ethers.getContractFactory("DestinationCallback");
  // Default relayer can be deployer or Reactive Network relayer address
  const destinationCallback = await DestinationCallback.deploy(deployer.address, ethers.ZeroAddress);
  await destinationCallback.waitForDeployment();
  const destAddress = await destinationCallback.getAddress();
  console.log(`✅ DestinationCallback deployed to: ${destAddress}`);

  // 2. Deploy Mock DEX Pools for Testing & Live Demos
  console.log("📦 Deploying MockPool on Origin/Destination...");
  const MockPool = await ethers.getContractFactory("MockPool");
  const poolBase = await MockPool.deploy("Base Sepolia WETH-USDC", "bWETH/USDC", ethers.parseEther("500"), ethers.parseUnits("1500000", 6));
  await poolBase.waitForDeployment();
  const poolBaseAddress = await poolBase.getAddress();
  console.log(`✅ Base Sepolia MockPool deployed to: ${poolBaseAddress}`);

  await destinationCallback.setPoolRegistration(poolBaseAddress, true);
  console.log(`✅ Pool registered on DestinationCallback!`);

  // 3. Deploy OmniSurgeReactive RSC (for Reactive Network or Local Testing)
  console.log("📦 Deploying OmniSurgeReactive RSC...");
  const OmniSurgeReactive = await ethers.getContractFactory("OmniSurgeReactive");
  const reactiveListener = await OmniSurgeReactive.deploy(
    ethers.ZeroAddress, // Uses default Reactive System contract 0x...fffFfF
    BASE_SEPOLIA_CHAIN_ID,
    destAddress,
    ethers.parseEther("0.5") // 0.5 ETH minimum threshold
  );
  await reactiveListener.waitForDeployment();
  const reactiveAddress = await reactiveListener.getAddress();
  console.log(`✅ OmniSurgeReactive deployed to: ${reactiveAddress}`);

  await destinationCallback.setAuthorizedReactiveContract(reactiveAddress);
  console.log(`✅ Authorized Reactive Contract set on DestinationCallback!`);

  console.log(`\n🎉 Deployment Complete! Summary:`);
  console.log({
    network: network.name,
    chainId: Number(network.chainId),
    DestinationCallback: destAddress,
    BaseMockPool: poolBaseAddress,
    OmniSurgeReactive: reactiveAddress,
  });
}

main().catch((error) => {
  console.error("❌ Deployment failed:", error);
  process.exitCode = 1;
});

