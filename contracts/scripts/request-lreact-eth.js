import dotenv from "dotenv";
import { JsonRpcProvider, Wallet, Contract, parseEther, formatEther } from "ethers";

dotenv.config();

const ETH_SEPOLIA_FAUCET = "0x9b9BB25f1A81078C544C829c5EB7822d747Cf434";
const AMOUNT = parseEther("0.002"); // 0.002 ETH -> 0.2 lREACT

async function main() {
  const provider = new JsonRpcProvider("https://ethereum-sepolia-rpc.publicnode.com");
  const wallet = new Wallet(process.env.PRIVATE_KEY, provider);
  console.log("Deployer:", wallet.address);
  console.log("Balance:", formatEther(await provider.getBalance(wallet.address)), "ETH");
  console.log("Sending", formatEther(AMOUNT), "ETH to Reactive faucet on Ethereum Sepolia...");

  const faucet = new Contract(
    ETH_SEPOLIA_FAUCET,
    ["function request(address) payable"],
    wallet
  );

  const tx = await faucet.request(wallet.address, { value: AMOUNT });
  await tx.wait();
  console.log("✅ Faucet tx:", tx.hash);
  console.log("   lREACT should arrive on Lasna shortly.");
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
