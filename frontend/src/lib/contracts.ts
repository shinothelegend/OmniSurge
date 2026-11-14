// OmniSurge Cross-Chain Contract Configuration & ABIs
// Contract addresses are loaded from contracts/deployments.json after testnet deployment.

export interface NetworkConfig {
  chainId: number;
  name: string;
  blockTimeMs: number;
  blockTimeLabel: string;
  rpcUrl: string;
  explorerUrl: string;
  color: string;
  glowColor: string;
  badge: string;
}

export const NETWORKS: Record<string, NetworkConfig> = {
  baseSepolia: {
    chainId: 84532,
    name: "Base Sepolia",
    blockTimeMs: 200,
    blockTimeLabel: "200ms Flashblocks",
    rpcUrl: "https://sepolia.base.org",
    explorerUrl: "https://sepolia.basescan.org",
    color: "#0052FF",
    glowColor: "rgba(0, 82, 255, 0.4)",
    badge: "Base Sepolia (200ms)",
  },
  unichainSepolia: {
    chainId: 1301,
    name: "Unichain Sepolia",
    blockTimeMs: 1000,
    blockTimeLabel: "1s Sub-Second Blocks",
    rpcUrl: "https://sepolia.unichain.org",
    explorerUrl: "https://sepolia.uniscan.xyz",
    color: "#FF007A",
    glowColor: "rgba(255, 0, 122, 0.4)",
    badge: "Unichain Sepolia (1s)",
  },
  reactiveLasna: {
    chainId: 5318007,
    name: "Reactive Lasna",
    blockTimeMs: 1000,
    blockTimeLabel: "~1s ReactVM Finality",
    rpcUrl: "https://lasna-rpc.rnk.dev",
    explorerUrl: "https://lasna.reactscan.net",
    color: "#A855F7",
    glowColor: "rgba(168, 85, 247, 0.4)",
    badge: "Reactive Network",
  },
};

// Placeholder addresses — replaced by deployments.json after testnet deploy.
// Run: cd contracts && npx hardhat run scripts/deploy-multichain.js --network baseSepolia
//      npx hardhat run scripts/deploy-multichain.js --network reactiveLasna
export const CONTRACT_ADDRESSES: Record<string, Record<string, string>> = {
  baseSepolia: {
    destinationCallback: "",
    mockPool: "",
  },
  unichainSepolia: {
    mockPool: "",
  },
  reactiveLasna: {
    omniSurgeReactive: "",
    systemContract: "0x0000000000000000000000000000000000fffFfF",
  },
};

export function loadContractAddresses(): Record<string, Record<string, string>> {
  if (typeof window === "undefined") return CONTRACT_ADDRESSES;
  try {
    const stored = localStorage.getItem("omnisurge_deployments");
    if (stored) {
      return JSON.parse(stored);
    }
  } catch {
    // fallback to defaults
  }
  return CONTRACT_ADDRESSES;
}

export function saveContractAddresses(
  addresses: Record<string, Record<string, string>>
) {
  if (typeof window === "undefined") return;
  localStorage.setItem("omnisurge_deployments", JSON.stringify(addresses));
}

export const OMNISURGE_REACTIVE_ABI = [
  "event Callback(uint256 indexed chain_id, address indexed _contract, uint64 indexed gas_limit, bytes payload)",
  "event SurgeDispatched(uint256 indexed surgeId, uint256 indexed originChainId, address indexed originPool, uint256 volumeIn, uint256 targetLiquidity, uint256 originTimestamp, uint256 originBlock)",
  "function react((uint256,address,uint256,uint256,uint256,uint256,bytes,uint256,uint256)) external",
  "function getTelemetry() external view returns (uint256, uint256, uint256, uint256, uint256)",
  "function minImbalanceThreshold() external view returns (uint256)",
  "function surgeMultiplierBps() external view returns (uint256)",
  "function subscribePool(uint256,address,string) external",
  "function destinationChainId() external view returns (uint256)",
  "function destinationCallback() external view returns (address)",
];

export const DESTINATION_CALLBACK_ABI = [
  "event JITSurgeExecuted(uint256 indexed executionId, uint256 indexed originChainId, address indexed originPool, uint256 liquidityDeployed, uint256 feeCaptured, uint256 latencySeconds, uint256 latencyMsEstimated, uint256 gasUsed)",
  "event PoolRegistered(address indexed pool, bool isRegistered)",
  "function triggerJITLiquidity(uint256,address,uint256,uint256,uint256,uint256,uint256) external returns (uint256)",
  "function getLatestExecutions(uint256 count) external view returns (tuple(uint256 executionId, uint256 originChainId, address originPool, uint256 volumeIn, uint256 liquidityDeployed, uint256 feeCaptured, uint256 originTimestamp, uint256 originBlock, uint256 destinationTimestamp, uint256 destinationBlock, uint256 latencySeconds, uint256 latencyMsEstimated, uint256 gasUsed)[])",
  "function getProtocolMetrics() external view returns (uint256, uint256, uint256, uint256)",
  "function defaultFeeRateBps() external view returns (uint256)",
  "function registeredPools(address) external view returns (bool)",
  "function setPoolRegistration(address,bool) external",
  "function setAuthorizedReactiveContract(address) external",
];

export const MOCK_POOL_ABI = [
  "event Swap(address indexed sender, uint256 amount0In, uint256 amount1In, uint256 amount0Out, uint256 amount1Out, address indexed to)",
  "event LiquiditySurgeInjected(uint256 amount, uint256 timestamp)",
  "event LiquiditySurgeRebalanced(uint256 amount, uint256 timestamp)",
  "function swap(uint256 amount0In, uint256 amount1In, uint256 amount0Out, uint256 amount1Out, address to) external returns (bool)",
  "function surgeDeposit(uint256 amount) external returns (bool)",
  "function surgeWithdraw(uint256 amount) external returns (bool)",
  "function getPoolState() external view returns (uint256, uint256, uint256, uint256)",
  "function feeRateBps() external view returns (uint256)",
  "function name() external view returns (string)",
  "function symbol() external view returns (string)",
];
