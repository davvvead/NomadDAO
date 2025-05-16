"use client"

import FeatureCards from "@/components/ui/feature-cards"
import MintCard from "@/components/ui/mint-card"
import ProposalsCard from "@/components/ui/proposals-card"
import TreasuryCard from "@/components/ui/treasury-card"

export default function Dashboard() {
    return (
        <div className="max-w-7xl mx-auto space-y-8">
            <h1 className="text-2xl md:text-3xl font-bold text-zinc-100">
                Welcome to <span className="text-green-400">NomadDAO</span>
            </h1>

            {/* Feature Cards */}
            <FeatureCards />

            {/* Cards Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="space-y-6">
                    <MintCard />
                    <ProposalsCard />
                </div>
                <TreasuryCard />
            </div>
        </div>
    )
}
