import { ethers } from "ethers";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
dotenv.config({ path: path.resolve(__dirname, "../.env") });

const pk = process.env.PRIVATE_KEY;
if (!pk) {
  console.error("PRIVATE_KEY not found in .env");
  process.exit(1);
}

const wallet = new ethers.Wallet(pk);
console.log(`\n============================================================`);
console.log(`👤 Deployer Address: ${wallet.address}`);
console.log(`============================================================\n`);

const providers = [
  { name: "Base Sepolia", url: process.env.BASE_SEPOLIA_RPC || "https://sepolia.base.org" },
  { name: "Unichain Sepolia", url: process.env.UNICHAIN_SEPOLIA_RPC || "https://sepolia.unichain.org" },
  { name: "Reactive Lasna", url: process.env.REACTIVE_RPC || "https://lasna-rpc.rnk.dev" },
];

async function check() {
  for (const p of providers) {
    try {
      const provider = new ethers.JsonRpcProvider(p.url);
      const balance = await provider.getBalance(wallet.address);
      console.log(`📡 ${p.name.padEnd(18)} : ${ethers.formatEther(balance)} native tokens`);
    } catch (err) {
      console.error(`❌ ${p.name.padEnd(18)} : Error querying balance - ${err.message}`);
    }
  }
}

check();
