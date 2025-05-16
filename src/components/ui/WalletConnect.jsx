"use client";

import { useState } from "react";
import { useWallet } from "@/context/WalletContext";
import Toast from "@/components/ui/Toast";
import Avatar from "boring-avatars";

export default function WalletConnect({ variant = "button" }) {
  const { account, connect, isLoading } = useWallet();
  const [toast, setToast] = useState({ message: "", visible: false });

  const handleConnect = async () => {
    try {
      await connect();
      setToast({ 
        message: "✅ Connected to MetaMask on Moonbase Alpha!", 
        visible: true 
      });
    } catch (err) {
      setToast({ 
        message: `❌ ${err.message}`, 
        visible: true 
      });
    }
  };

  if (isLoading) {
    return <div className="animate-pulse bg-zinc-800 h-10 w-40 rounded-lg" />;
  }

  if (account) {
    return (
      <div className="flex items-center gap-2 px-4 py-2 bg-zinc-900 rounded-lg border border-green-500/20">
        <Avatar
          size={24}
          name={account}
          variant="marble"
          colors={["#A1FF69", "#059033", "#3BC012", "#1A4301", "#84E840"]}
        />
        <span className="text-sm text-zinc-400">
          {account.slice(0, 6)}...{account.slice(-4)}
        </span>
        {toast.visible && <Toast message={toast.message} onClose={() => setToast({ ...toast, visible: false })} />}
      </div>
    );
  }

  return (
    <>
      <button
        onClick={handleConnect}
        className="flex items-center gap-2 px-4 py-2 bg-green-500 hover:bg-green-600 text-black rounded-lg transition-colors"
      >
        Connect Wallet
      </button>
      {toast.visible && <Toast message={toast.message} onClose={() => setToast({ ...toast, visible: false })} />}
    </>
  );
}
