import hre from "hardhat";

const { ethers } = hre;

const BASE_SEPOLIA_FAUCET = "0x2afaFD298b23b62760711756088F75B7409f5967";
const AMOUNT = ethers.parseEther("0.001"); // 0.001 ETH -> 0.1 lREACT

async function main() {
  const [deployer] = await ethers.getSigners();
  console.log("Deployer:", deployer.address);
  console.log("Sending", ethers.formatEther(AMOUNT), "ETH to Reactive faucet on Base Sepolia...");

  const faucet = new ethers.Contract(
    BASE_SEPOLIA_FAUCET,
    ["function request(address) payable"],
    deployer
  );

  const tx = await faucet.request(deployer.address, { value: AMOUNT });
  await tx.wait();
  console.log("✅ Faucet tx:", tx.hash);
  console.log("   lREACT should arrive on Lasna shortly.");
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
