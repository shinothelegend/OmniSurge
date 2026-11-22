import hre from "hardhat";
import fs from "fs";

const { ethers } = hre;

const BASE_CALLBACK_PROXY = "0x476F44b11F5C942c58f4c8E3d0300E5710743585";

async function main() {
  const deployments = JSON.parse(fs.readFileSync("deployments.json", "utf8"));
  const dcAddress = deployments.baseSepolia?.destinationCallback;
  if (!dcAddress) throw new Error("Base Sepolia deployment not found");

  const [deployer] = await ethers.getSigners();
  console.log("Deployer:", deployer.address);
  console.log("DestinationCallback:", dcAddress);

  const cb = await ethers.getContractAt("DestinationCallback", dcAddress, deployer);
  const currentRelayer = await cb.callbackRelayer();
  console.log("Current callback relayer:", currentRelayer);

  if (currentRelayer.toLowerCase() !== BASE_CALLBACK_PROXY.toLowerCase()) {
    const tx = await cb.setCallbackRelayer(BASE_CALLBACK_PROXY);
    await tx.wait();
    console.log("✅ Callback relayer updated to Base callback proxy");
    console.log("   tx:", tx.hash);
  } else {
    console.log("✅ Callback relayer already correct");
  }

  const balance = await ethers.provider.getBalance(dcAddress);
  console.log("DestinationCallback balance:", ethers.formatEther(balance), "ETH");

  if (balance < ethers.parseEther("0.001")) {
    const tx = await deployer.sendTransaction({
      to: dcAddress,
      value: ethers.parseEther("0.001"),
    });
    await tx.wait();
    console.log("✅ Funded DestinationCallback with 0.001 ETH");
    console.log("   tx:", tx.hash);
  } else {
    console.log("✅ DestinationCallback already funded");
  }

  const reactiveAddress = deployments.reactiveLasna?.omniSurgeReactive;
  if (reactiveAddress) {
    const currentAuthorized = await cb.authorizedReactiveContract();
    if (currentAuthorized.toLowerCase() !== reactiveAddress.toLowerCase()) {
      const tx = await cb.setAuthorizedReactiveContract(reactiveAddress);
      await tx.wait();
      console.log("✅ Authorized reactive contract:", reactiveAddress);
      console.log("   tx:", tx.hash);
    } else {
      console.log("✅ Reactive contract already authorized");
    }
  } else {
    console.log("ℹ️ No reactiveLasna deployment found yet — skipping authorization");
  }
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
