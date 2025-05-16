"use client"

import { useState, useEffect } from "react"
import { Loader2 } from "lucide-react"

export default function ResidencyNFTsGallery() {
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Simulate brief loading state
    const timer = setTimeout(() => {
      setLoading(false)
    }, 1500)

    return () => clearTimeout(timer)
  }, [])

  return (
    <>
      {/* Page Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-green-400">🌍 Residency NFTs</h1>
        <p className="mt-2 text-zinc-400">Your digital passport to virtual cities and communities</p>
      </div>

      {/* NFT Gallery */}
      {loading ? (
        <div className="flex flex-col items-center justify-center space-y-4 py-12">
          <Loader2 className="h-8 w-8 animate-spin text-green-400" />
          <p className="text-zinc-400">Loading your NFT</p>
        </div>
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          <div className="group overflow-hidden rounded-xl border border-zinc-800 bg-zinc-900/50 transition-all hover:border-green-500/20 hover:shadow-[0_0_15px_rgba(34,197,94,0.1)]">
            <div className="relative aspect-square overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-green-500/20 to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
              <img
                src="/tokyo.png"
                alt="Tokyo Citizen NFT"
                className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
              />
            </div>
            <div className="p-4">
              <h3 className="text-xl font-bold text-green-400">Tokyo Citizen</h3>
              <p className="mt-2 text-sm text-zinc-400">
                Digital residency in the vibrant Tokyo virtual city. Access to all Tokyo community events and voting rights.
              </p>
              <div className="mt-4 flex items-center justify-between">
                <span className="text-xs text-zinc-500">Token ID: NOMAD-001</span>
                <span className="rounded-full bg-green-500/10 px-2 py-1 text-xs font-medium text-green-400">
                  Active
                </span>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
