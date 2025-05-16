"use client";

import { useState } from "react";
import { Coins } from "lucide-react";

export default function MintCard() {
  const [loading, setLoading] = useState(false);
  const [toast, setToast] = useState({ message: "", visible: false });

  const handleMint = async () => {
    try {
      setLoading(true);

      // ✅ Safely import the mint logic at runtime
      const { mint } = await import("@/utils/mintResidencyNFTs");
      await mint("ipfs://bafkreicpm75u4xjyzg4u5z73qlosicq26d6qp6fv7du45iil27k7psnrqq");

      setToast({ message: "✅ NFT minted successfully!", visible: true });
    } catch (err) {
      setToast({ message: err.message, visible: true });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-zinc-900 rounded-lg border border-green-400/20 overflow-hidden">
      <div className="p-5">
        <div className="flex items-start mb-4">
          <div className="w-10 h-10 bg-green-400/10 rounded-full flex items-center justify-center">
            <Coins className="w-5 h-5 text-green-400" />
          </div>
          <div className="ml-4">
            <h2 className="text-lg font-medium text-green-400">Residency NFTs</h2>
            <p className="text-zinc-400 text-sm mt-1">
              Join your city and earn voting rights. Your NFT is your digital passport to community governance.
            </p>
          </div>
        </div>

        <div className="space-y-4 mt-6">
          <div className="flex items-center justify-between text-sm">
            <span className="text-zinc-400">Mint Price</span>
            <span className="font-medium text-zinc-100">Free</span>
          </div>

          <div className="flex items-center justify-between text-sm">
            <span className="text-zinc-400">Available</span>
            <span className="font-medium text-zinc-100">∞ / ∞</span>
          </div>

          <div className="w-full bg-zinc-800 rounded-full h-2">
            <div className="bg-green-400 h-2 rounded-full" style={{ width: "100%" }}></div>
          </div>
        </div>

        <button
          onClick={handleMint}
          disabled={loading}
          className="w-full mt-6 py-3 px-4 bg-green-400/10 border border-green-400/20 rounded-lg font-medium text-green-400 hover:bg-green-400/20 transition-all focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? "Minting..." : "Mint Residency NFT"}
        </button>

        {toast.visible && (
          <p className="text-green-400 text-sm mt-4">{toast.message}</p>
        )}
      </div>
    </div>
  );
}
