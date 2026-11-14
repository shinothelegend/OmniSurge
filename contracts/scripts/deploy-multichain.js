import hre from "hardhat";
import { ethers } from "ethers";
import * as fs from "fs";
import * as path from "path";

const { network } = hre;

const BASE_SEPOLIA_CHAIN_ID = 84532;
const UNICHAIN_SEPOLIA_CHAIN_ID = 1301;
const REACTIVE_LASNA_CHAIN_ID = 5318007;
const SYSTEM_CONTRACT = "0x0000000000000000000000000000000000fffFfF";

// Uniswap V2 Swap topic
const UNISWAP_V2_SWAP_TOPIC =
  "0xc42079f94a6350d7e6235f29174924f928cc2ac818eb64fed8004e115fbcca67";

const DEPLOYMENTS_PATH = path.resolve(__dirname, "../deployments.json");

function loadDeployments(): Record<string, any> {
  if (fs.existsSync(DEPLOYMENTS_PATH)) {
    return JSON.parse(fs.readFileSync(DEPLOYMENTS_PATH, "utf8"));
  }
  return {};
}

function saveDeployments(deployments: Record<string, any>) {
  fs.writeFileSync(
    DEPLOYMENTS_PATH,
    JSON.stringify(deployments, null, 2) + "\n"
  );
  console.log(`\n💾 Deployments saved to ${DEPLOYMENTS_PATH}\n`);
}

async function main() {
  const [deployer] = await ethers.getSigners();
  const chainId = (await network.provider.send("eth_chainId")).toString();
  const chainIdNum = parseInt(chainId, 16);

  console.log(`\n============================================================`);
  console.log(`🚀 Deploying OmniSurge on Chain ID: ${chainIdNum} (${network.name})`);
  console.log(`👤 Deployer: ${deployer.address}`);
  console.log(`============================================================\n`);

  const deployments = loadDeployments();

  // ================================================================
  // NETWORK 1: Base Sepolia (84532) — Destination + Pool
  // ================================================================
  if (chainIdNum === BASE_SEPOLIA_CHAIN_ID) {
    console.log("📦 Deploying DestinationCallback...");
    const DestinationCallback = await ethers.getContractFactory("DestinationCallback");
    const destinationCallback = await DestinationCallback.deploy(
      deployer.address, // callbackRelayer
      ethers.ZeroAddress // authorizedReactiveContract (set later)
    );
    await destinationCallback.waitForDeployment();
    const destAddress = await destinationCallback.getAddress();
    console.log(`✅ DestinationCallback: ${destAddress}`);

    console.log("📦 Deploying MockPool (Base Sepolia WETH/USDC)...");
    const MockPool = await ethers.getContractFactory("MockPool");
    const poolBase = await MockPool.deploy(
      "Base Sepolia WETH-USDC",
      "bWETH-USDC",
      ethers.parseEther("500"),
      ethers.parseUnits("1500000", 6)
    );
    await poolBase.waitForDeployment();
    const poolBaseAddress = await poolBase.getAddress();
    console.log(`✅ MockPool (Base): ${poolBaseAddress}`);

    console.log("🔗 Registering pool on DestinationCallback...");
    await destinationCallback.setPoolRegistration(poolBaseAddress, true);
    console.log(`✅ Pool registered`);

    deployments.baseSepolia = {
      chainId: BASE_SEPOLIA_CHAIN_ID,
      destinationCallback: destAddress,
      mockPool: poolBaseAddress,
      deployer: deployer.address,
    };
    saveDeployments(deployments);

    console.log("\n🎉 Base Sepolia deployment complete!");
    console.log(`   Next: Deploy OmniSurgeReactive on Reactive Lasna, then setAuthorizedReactiveContract.`);
    return;
  }

  // ================================================================
  // NETWORK 2: Reactive Lasna (5318007) — Reactive Smart Contract
  // ================================================================
  if (chainIdNum === REACTIVE_LASNA_CHAIN_ID) {
    // Load Base Sepolia deployment for cross-chain references
    if (!deployments.baseSepolia) {
      throw new Error(
        "❌ Base Sepolia deployment not found. Deploy to baseSepolia first, then run on reactiveLasna."
      );
    }

    const { destinationCallback: destCallbackAddress } = deployments.baseSepolia;

    console.log("📦 Deploying OmniSurgeReactive RSC...");
    const OmniSurgeReactive = await ethers.getContractFactory("OmniSurgeReactive");
    const reactiveListener = await OmniSurgeReactive.deploy(
      SYSTEM_CONTRACT, // uses default Reactive System contract
      BASE_SEPOLIA_CHAIN_ID, // destination chain
      destCallbackAddress,
      ethers.parseEther("0.5") // minImbalanceThreshold 0.5 ETH
    );
    await reactiveListener.waitForDeployment();
    const reactiveAddress = await reactiveListener.getAddress();
    console.log(`✅ OmniSurgeReactive: ${reactiveAddress}`);

    console.log("🔗 Setting authorized reactive contract on DestinationCallback...");
    // We can't call DestinationCallback on Base Sepolia from Lasna directly.
    // This must be done via a cross-chain call or by the deployer on Base Sepolia.
    console.log(`   ⚠️  MANUAL STEP: On Base Sepolia, call:`);
    console.log(`   destinationCallback.setAuthorizedReactiveContract("${reactiveAddress}")`);

    console.log("🔗 Subscribing to Base Sepolia pool...");
    if (!vm && address(SYSTEM_CONTRACT) !== address(0)) {
      // In real Reactive Network, this subscribes via the system contract
      // Locally, we simulate it
      console.log(`   subscribePool(${BASE_SEPOLIA_CHAIN_ID}, ${deployments.baseSepolia.mockPool}, "Base Sepolia")`);
    }

    console.log("🔗 Subscribing to Unichain Sepolia pool...");
    console.log(`   ⚠️  MANUAL STEP: Deploy MockPool to Unichain Sepolia, then:`);
    console.log(`   subscribePool(${UNICHAIN_SEPOLIA_CHAIN_ID}, <unichainPoolAddress>, "Unichain Sepolia")`);

    deployments.reactiveLasna = {
      chainId: REACTIVE_LASNA_CHAIN_ID,
      omniSurgeReactive: reactiveAddress,
      systemContract: SYSTEM_CONTRACT,
      deployer: deployer.address,
    };
    saveDeployments(deployments);

    console.log("\n🎉 Reactive Lasna deployment complete!");
    console.log(`   Summary:`);
    console.log(`   Base Sepolia DestinationCallback: ${destCallbackAddress}`);
    console.log(`   Reactive Lasna OmniSurgeReactive: ${reactiveAddress}`);
    return;
  }

  // ================================================================
  // NETWORK 3: Unichain Sepolia (1301) — Pool only
  // ================================================================
  if (chainIdNum === UNICHAIN_SEPOLIA_CHAIN_ID) {
    console.log("📦 Deploying MockPool (Unichain Sepolia WETH/USDC)...");
    const MockPool = await ethers.getContractFactory("MockPool");
    const poolUnichain = await MockPool.deploy(
      "Unichain Sepolia WETH-USDC",
      "uWETH-USDC",
      ethers.parseEther("500"),
      ethers.parseUnits("1500000", 6)
    );
    await poolUnichain.waitForDeployment();
    const poolUnichainAddress = await poolUnichain.getAddress();
    console.log(`✅ MockPool (Unichain): ${poolUnichainAddress}`);

    deployments.unichainSepolia = {
      chainId: UNICHAIN_SEPOLIA_CHAIN_ID,
      mockPool: poolUnichainAddress,
      deployer: deployer.address,
    };
    saveDeployments(deployments);

    console.log("\n🎉 Unichain Sepolia deployment complete!");
    console.log(`   ⚠️  MANUAL STEP: On Reactive Lasna, subscribe to this pool:`);
    console.log(`   subscribePool(${UNICHAIN_SEPOLIA_CHAIN_ID}, ${poolUnichainAddress}, "Unichain Sepolia")`);
    return;
  }

  throw new Error(`❌ Unsupported network: ${network.name} (chainId: ${chainIdNum})`);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
