import { useState } from 'react';
import { mint, getMintErrorMessage } from '@/utils/mintResidencyNFTs';

export default function MintCard() {
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [success, setSuccess] = useState(false);

    const handleMint = async () => {
        setIsLoading(true);
        setError(null);
        setSuccess(false);

        try {
            const tokenURI = "ipfs://bafkreicpm75u4xjyzg4u5z73qlosicq26d6qp6fv7du45iil27k7psnrqq";
            const result = await mint(tokenURI);
            setSuccess(true);
            console.log("Minting successful:", result);
        } catch (err) {
            const errorInfo = getMintErrorMessage(err);
            setError(errorInfo);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="bg-zinc-900 rounded-lg border border-green-400/20 overflow-hidden">
            <div className="p-5">
                <div className="flex items-start mb-4">
                    <div className="ml-4">
                        <h2 className="text-lg font-medium text-green-400">Mint Your Residency NFT</h2>
                        <p className="text-zinc-400 text-sm mt-1">
                            Join the community by minting your unique Residency NFT.
                        </p>
                    </div>
                </div>

                {error && (
                    <div className={`mt-4 p-4 rounded-lg ${error.style === 'error' ? 'bg-red-500/10 border border-red-500/20' : 'bg-yellow-500/10 border border-yellow-500/20'}`}>
                        <h3 className={`font-medium ${error.style === 'error' ? 'text-red-400' : 'text-yellow-400'}`}>
                            {error.title}
                        </h3>
                        <p className="text-sm text-zinc-300 mt-1">{error.message}</p>
                        {error.solution && (
                            <p className="text-sm text-zinc-400 mt-2">
                                Solution: {error.solution}
                            </p>
                        )}
                    </div>
                )}

                {success && (
                    <div className="mt-4 p-4 rounded-lg bg-green-500/10 border border-green-500/20">
                        <h3 className="font-medium text-green-400">Success!</h3>
                        <p className="text-sm text-zinc-300 mt-1">
                            Your Residency NFT has been minted successfully.
                        </p>
                    </div>
                )}

                <button
                    onClick={handleMint}
                    disabled={isLoading}
                    className={`w-full mt-4 py-3 px-4 rounded-lg font-medium 
                        ${isLoading 
                            ? 'bg-zinc-700 text-zinc-400 cursor-not-allowed' 
                            : 'bg-green-500 text-black hover:bg-green-400 transition-colors'}`}
                >
                    {isLoading ? 'Minting...' : 'Mint Residency NFT'}
                </button>
            </div>
        </div>
    );
} 