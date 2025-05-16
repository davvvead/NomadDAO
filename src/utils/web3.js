import { ethers } from 'ethers';
import ResidencyNFTAbi from '@/contracts/ResidencyNFT.json';

const CONTRACT_ADDRESS = process.env.NEXT_PUBLIC_CONTRACT_ADDRESS;
const MOONBASE_RPC = 'https://rpc.api.moonbase.moonbeam.network';
const CHAIN_ID = 1287; // Moonbase Alpha chain ID

export const connectWallet = async () => {
    if (typeof window === 'undefined' || !window.ethereum) {
        throw new Error('Please install MetaMask to use this feature');
    }

    try {
        // Request account access
        const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
        
        // Check if we're on Moonbase Alpha
        const chainId = await window.ethereum.request({ method: 'eth_chainId' });
        if (Number(chainId) !== CHAIN_ID) {
            // Try to switch to Moonbase Alpha
            try {
                await window.ethereum.request({
                    method: 'wallet_switchEthereumChain',
                    params: [{ chainId: `0x${CHAIN_ID.toString(16)}` }],
                });
            } catch (switchError) {
                // If the chain hasn't been added to MetaMask
                if (switchError.code === 4902) {
                    await window.ethereum.request({
                        method: 'wallet_addEthereumChain',
                        params: [{
                            chainId: `0x${CHAIN_ID.toString(16)}`,
                            chainName: 'Moonbase Alpha',
                            nativeCurrency: {
                                name: 'DEV',
                                symbol: 'DEV',
                                decimals: 18
                            },
                            rpcUrls: [MOONBASE_RPC],
                            blockExplorerUrls: ['https://moonbase.moonscan.io/']
                        }]
                    });
                } else {
                    throw switchError;
                }
            }
        }

        return accounts[0];
    } catch (error) {
        console.error('Error connecting wallet:', error);
        throw error;
    }
};

export const mintResidencyNFT = async () => {
    if (!CONTRACT_ADDRESS) {
        throw new Error('Contract address not configured');
    }

    try {
        const provider = new ethers.BrowserProvider(window.ethereum);
        const signer = await provider.getSigner();
        
        const contract = new ethers.Contract(
            CONTRACT_ADDRESS,
            ResidencyNFTAbi,
            signer
        );

        // Create transaction
        const tx = await contract.mint();

        // Wait for transaction to be mined
        const receipt = await tx.wait();
        
        // Get the token ID from the event
        const event = receipt.logs.find(
            log => log.topics[0] === ethers.id("ResidencyMinted(address,uint256)")
        );
        
        if (event) {
            const tokenId = ethers.BigNumber.from(event.topics[2]).toNumber();
            return { tokenId, txHash: receipt.hash };
        }

        return { txHash: receipt.hash };
    } catch (error) {
        console.error('Error minting NFT:', error);
        throw error;
    }
};

export const checkIfMinted = async (address) => {
    if (!CONTRACT_ADDRESS || !address) return false;

    try {
        const provider = new ethers.BrowserProvider(window.ethereum);
        const contract = new ethers.Contract(
            CONTRACT_ADDRESS,
            ResidencyNFTAbi,
            provider
        );

        return await contract.hasMinted(address);
    } catch (error) {
        console.error('Error checking mint status:', error);
        return false;
    }
};

export const getTotalMinted = async () => {
    if (!CONTRACT_ADDRESS) return 0;

    try {
        const provider = new ethers.BrowserProvider(window.ethereum);
        const contract = new ethers.Contract(
            CONTRACT_ADDRESS,
            ResidencyNFTAbi,
            provider
        );

        return await contract.totalMinted();
    } catch (error) {
        console.error('Error getting total minted:', error);
        return 0;
    }
}; 