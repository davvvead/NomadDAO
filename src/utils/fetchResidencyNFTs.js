import { ethers } from "ethers";
import { CONTRACT_ADDRESS, CONTRACT_ABI } from "@/config/contract";

// IPFS gateway URLs in order of preference
const IPFS_GATEWAYS = [
  "https://nftstorage.link/ipfs/",
  "https://ipfs.io/ipfs/",
  "https://gateway.ipfs.io/ipfs/",
  "https://cloudflare-ipfs.com/ipfs/",
  "https://gateway.pinata.cloud/ipfs/"
];

// Default metadata as fallback
const DEFAULT_METADATA = {
  name: "Nomad Residency",
  description: "A digital residency NFT in the NomadDAO ecosystem.",
  image: "/placeholder.svg"
};

async function fetchWithFallback(uri, tokenId) {
  // Remove ipfs:// prefix if present
  const hash = uri.replace("ipfs://", "");
  
  // Try each gateway in sequence until one works
  for (const gateway of IPFS_GATEWAYS) {
    try {
      const response = await fetch(gateway + hash);
      if (response.ok) {
        const metadata = await response.json();
        return {
          ...DEFAULT_METADATA,
          ...metadata,
          // Ensure image uses a gateway URL if it's IPFS
          image: metadata.image?.startsWith("ipfs://")
            ? gateway + metadata.image.replace("ipfs://", "")
            : metadata.image || DEFAULT_METADATA.image
        };
      }
    } catch (err) {
      console.warn(`Failed to fetch from ${gateway}:`, err);
    }
  }

  // If all gateways fail, return default metadata with token ID
  console.warn(`Failed to fetch metadata for token ${tokenId}, using default`);
  return {
    ...DEFAULT_METADATA,
    name: `${DEFAULT_METADATA.name} #${tokenId}`,
    tokenId
  };
}

export const fetchAllResidencyNFTs = async (setLoadingState = null) => {
  if (typeof window === "undefined") return [];

  try {
    const provider = new ethers.BrowserProvider(window.ethereum);
    const signer = await provider.getSigner();
    const contract = new ethers.Contract(CONTRACT_ADDRESS, CONTRACT_ABI, signer);

    // Get total minted NFTs
    const total = await contract.totalMinted();
    const totalNumber = Number(total);
    const nfts = [];
    
    // Update loading state with total
    if (setLoadingState) {
      setLoadingState({ total: totalNumber, loaded: 0 });
    }

    // Fetch all NFTs in parallel with rate limiting
    const batchSize = 5; // Number of concurrent requests
    for (let i = 0; i < totalNumber; i += batchSize) {
      const batch = Array.from(
        { length: Math.min(batchSize, totalNumber - i) }, 
        (_, j) => i + j + 1
      );
      
      const batchPromises = batch.map(async (tokenId) => {
        try {
          const uri = await contract.tokenURI(tokenId);
          const metadata = await fetchWithFallback(uri, tokenId);
          
          // Update loading state
          if (setLoadingState) {
            setLoadingState(prev => ({ 
              ...prev, 
              loaded: Math.min(prev.loaded + 1, totalNumber)
            }));
          }

          return {
            tokenId: Number(tokenId),
            ...metadata
          };
        } catch (err) {
          console.error(`Failed to fetch token ${tokenId}:`, err);
          // Return default metadata on error
          return {
            tokenId: Number(tokenId),
            ...DEFAULT_METADATA,
            name: `${DEFAULT_METADATA.name} #${tokenId}`
          };
        }
      });

      const batchResults = await Promise.all(batchPromises);
      nfts.push(...batchResults);
    }

    return nfts.sort((a, b) => a.tokenId - b.tokenId);
  } catch (err) {
    console.error("Failed to fetch NFTs:", err);
    throw new Error(
      err.code === "NETWORK_ERROR" 
        ? "Please connect your wallet and ensure you're on Moonbase Alpha network" 
        : "Failed to fetch NFTs. Please try again."
    );
  }
};
