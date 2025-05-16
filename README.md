# NomadDAO 🗺️

**Residency NFTs + Local Governance + Treasury Collaboration**

## 🧠 Short Summary
Mint city-based **Residency NFTs** to unlock voting rights and participate in hyperlocal DAO governance.

## 🧩 Problem It Solves
Most DAOs are global and abstract—NomadDAO brings **governance closer to home** by letting users represent their **local city** using on-chain identity and vote on initiatives, events, or funding within that locale.

## ✅ Solution
Users can:
- Mint a **Residency NFT** (one per address)
- Vote on **DAO proposals** unique to their chosen city
- Participate in a **shared treasury** (e.g., fund local community projects)
- Engage in the **community hub** to share ideas

## ⚙️ Technical Description

**Smart Contracts**
- Written in **Solidity**
- Deployed on **Moonbase Alpha** (Moonbeam testnet on Polkadot)
- ERC721-compliant with `mint`, `checkIfMinted`, and `totalMinted` methods

**Frontend Stack**
- Built using **Next.js** + **TailwindCSS**
- Contract interaction powered by **ethers.js**
- Wallet connection via **MetaMask** on Moonbase Alpha

**Deployment**
- Used **Hardhat** for compiling, deploying, and testing
- Contract verified on Sourcify:  
  `https://repo.sourcify.dev/1287/0x74291452A977636C3965625c4462919f144Ee589`

## 🌐 Blockchain Interaction
- NFT minting handled via `mintResidencyNFTs.js`
- Uses `ethers.providers.Web3Provider(window.ethereum)`
- Contract reads: `checkIfMinted`, `getTokenURI`, etc.
- Deployed to: `Moonbase Alpha`
- Verified and published to Sourcify
- Public contract address: `0x74291452A977636C3965625c4462919f144Ee589`

## 🧪 Demo Video
[![Watch Demo]()

## 📸 Screenshots
![Dashboard]()
![Mint NFT]()
![Proposals]()

## 🧭 Features
- Residency-based NFT minting
- Dynamic dashboard
- DAO proposals with vote tracking
- Treasury overview and mock contributions
- Community interaction panel

## 🛠️ How to Run Locally

```bash
git clone https://github.com/yourusername/nomad-dao.git
cd nomad-dao
npm install
npm run dev
```

Add `.env` file:

```env
NEXT_PUBLIC_CONTRACT_ADDRESS=0x74291452A977636C3965625c4462919f144Ee589
NEXT_PUBLIC_CHAIN_ID=1287
NEXT_PUBLIC_RPC_URL=https://rpc.api.moonbase.moonbeam.network
```

## 📄 License
MIT License

## 👨‍💻 Team
Built by **Dave Adams and Akash Sharma**  
Submission for [Consensus Hackathon 2025]  
