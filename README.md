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

## 🔧 Tech Stack

### **Blockchain**
- 🪐 **Moonbase Alpha** (Moonbeam's testnet, EVM-compatible, built on Polkadot)

### **Smart Contracts**
- 🧾 **Solidity**
- `ResidencyNFT`: A non-transferable ERC721 contract representing membership in a city DAO
- **Optional**: DAO contract with proposal and voting functionality

### **Frontend**
- ⚛️ **Next.js** + **TailwindCSS** + `shadcn/ui`
- Clean, modular dashboard with minting, tracking, and future governance sections

### **Wallet Integration**
- 🔐 **MetaMask** via `ethers.js`
- Auto-detection and switching to **Moonbase Alpha**
- Transaction signing and on-chain interaction

### **Smart Contract Interface**
- 🔧 **ethers.js** for all contract calls
- Includes:
  - `mint()`
  - `hasMinted(address)`
  - `tokenURI(tokenId)`
  - `totalMinted()`

### **Moonbeam's Role**
- 🌉 Full EVM compatibility within the **Polkadot ecosystem**
- Enables:
  - Standard Ethereum tooling (Remix, MetaMask, Hardhat)
  - Use of **Moonscan** for block exploration
  - Future cross-chain governance using Polkadot's XCM

## 🧪 Demo Video
[![Watch Demo]()

## 📸 Screenshots
![Dashboard](https://github.com/user-attachments/assets/d0d77e44-211d-400a-8d4f-d3dc6e396fb1)
![nft success](https://github.com/user-attachments/assets/b8bc595e-6f71-4fed-bd4c-0644f0c48311)
![Residence NFT ](https://github.com/user-attachments/assets/7203835b-4678-4f00-921f-86c4b08742b2)
![Proposal mockups](https://github.com/user-attachments/assets/6da1f313-5d22-4096-b0a6-4dd07fb191b2)
![community](https://github.com/user-attachments/assets/3f3c8cfc-c813-4275-8bb7-f44aa99e7dbe)
![moonbase link](https://github.com/user-attachments/assets/e63c88e9-c4bb-4243-865b-febb21167b1d)
![contract verification](https://github.com/user-attachments/assets/e1349dc8-7cba-4311-a9db-ae4ea5eca8dc)

## 🧭 Features
- Residency-based NFT minting
- Dynamic dashboard
- DAO proposals with vote tracking
- Treasury overview and mock contributions
- Community interaction panel

## 🛠️ How to Run Locally

```bash
git clone https://github.com/davvvead/NomadDAO.git
cd NomadDAO
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
