# OmniSurge — Hackathon Submission

## Project Metadata
- **Project Title:** OmniSurge (JIT Flash Liquidity Rebalancer)
- **Track:** Low Latency DeFi (Every Second Counts)
- **Hackathon:** Reactive Omni Buildathon — https://dorahacks.io/hackathon/reactive-omni-buildathon/detail
- **Tagline:** Autonomous Just-In-Time concentrated liquidity rebalancer achieving sub-second reaction finality across Base Sepolia (200ms) and Unichain Sepolia (1s) via the Reactive Network.
- **Ecosystems:** Reactive Network (Lasna testnet), Base Sepolia, Unichain Sepolia

## Submission Deliverables
| Item | Status |
|------|--------|
| Smart Contracts & Tests | Ready (10/10 tests passing) |
| Security Audit | Ready (internal invariant suite) |
| Interactive Web3 Frontend | Ready — single animated landing page + docs page |
| GitHub Repository | Push to public repo |
| Live Frontend URL | Deploy to Vercel (root directory: `frontend`) |
| Demo Video (2–3 min) | Remotion embedded on landing; record screen walkthrough |

## Submission Form Contents
- **Repository:** Public GitHub link
- **Deployed Contract Addresses:** From `contracts/deployments.json` after testnet deploy
- **Transaction Hashes:** Full loop — origin swap → Reactive `react()` → destination `triggerJITLiquidity()`
- **Demo Video:** Under 3 minutes, uploaded to YouTube/GitHub Release

## Networks
| Network | Chain ID | Role |
|---------|----------|------|
| Reactive Lasna | 5318007 | RSC deployment (OmniSurgeReactive) |
| Base Sepolia | 84532 | Destination callback + origin pool |
| Unichain Sepolia | 1301 | Origin pool |

## Contracts
- `contracts/contracts/OmniSurgeReactive.sol` — Reactive Smart Contract
- `contracts/contracts/DestinationCallback.sol` — Destination callback executor
- `contracts/contracts/mocks/MockPool.sol` — Test pool
- `contracts/contracts/mocks/MockReactiveSystem.sol` — Mock Reactive system

## Local Development
```bash
# Contracts
cd contracts
npm install
npx hardhat test
npx hardhat run scripts/deploy.js

# Frontend
cd frontend
npm install
npm run dev   # http://localhost:3000
```

## Security Note
No private keys, seed phrases, or RPC credentials are committed to this repository.
