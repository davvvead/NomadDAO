"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import {
  Loader2,
  ArrowUpRight,
  ArrowUp,
  ArrowDown,
  Download,
  Filter,
  ChevronDown,
  ExternalLink,
  Landmark,
  Search,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"

export default function TreasuryPage() {
  const [loading, setLoading] = useState(true)
  const [transactions, setTransactions] = useState([])
  const [treasuryData, setTreasuryData] = useState({
    balance: "1,234.56",
    token: "ROC",
    usdValue: "24,691.20",
    changePercent: "+2.4%",
    lastUpdated: "10 minutes ago",
  })

  // Mock transaction data
  const mockTransactions = [
    {
      id: "tx-8392",
      date: "May 16, 2025",
      description: "Community Event Funding",
      amount: "45.00",
      type: "outgoing",
      status: "completed",
      txHash: "0x71C7656EC7ab88b098defB751B7401B5f6d8976F",
    },
    {
      id: "tx-8391",
      date: "May 15, 2025",
      description: "New Resident Mint",
      amount: "10.00",
      type: "incoming",
      status: "completed",
      txHash: "0x3a539f58b4e3e5eb35b9f86c81b5e5db2b5d1d7a",
    },
    {
      id: "tx-8390",
      date: "May 14, 2025",
      description: "Infrastructure Upgrade",
      amount: "120.00",
      type: "outgoing",
      status: "completed",
      txHash: "0x7f4e31a8c5e5d8b9c8f8e3a5e3b5d1d7a3a539f5",
    },
    {
      id: "tx-8389",
      date: "May 12, 2025",
      description: "New Resident Mint",
      amount: "10.00",
      type: "incoming",
      status: "completed",
      txHash: "0x5d8b9c8f8e3a5e3b5d1d7a3a539f58b4e3e5eb35",
    },
    {
      id: "tx-8388",
      date: "May 10, 2025",
      description: "Developer Grants",
      amount: "75.00",
      type: "outgoing",
      status: "completed",
      txHash: "0x8e3a5e3b5d1d7a3a539f58b4e3e5eb35b9f86c81",
    },
    {
      id: "tx-8387",
      date: "May 8, 2025",
      description: "Token Swap",
      amount: "200.00",
      type: "outgoing",
      status: "completed",
      txHash: "0x3e5eb35b9f86c81b5e5db2b5d1d7a3a539f58b4e",
    },
    {
      id: "tx-8386",
      date: "May 5, 2025",
      description: "NFT Sales Revenue",
      amount: "300.00",
      type: "incoming",
      status: "completed",
      txHash: "0xb5e5db2b5d1d7a3a539f58b4e3e5eb35b9f86c81",
    },
    {
      id: "tx-8385",
      date: "May 3, 2025",
      description: "Marketing Campaign",
      amount: "50.00",
      type: "outgoing",
      status: "completed",
      txHash: "0x1d7a3a539f58b4e3e5eb35b9f86c81b5e5db2b5d",
    },
  ]

  // Simulate loading data
  useEffect(() => {
    const timer = setTimeout(() => {
      setTransactions(mockTransactions)
      setLoading(false)
    }, 1200)

    return () => clearTimeout(timer)
  }, [])

  // Format transaction hash for display
  const formatTxHash = (hash) => {
    return `${hash.substring(0, 6)}...${hash.substring(hash.length - 4)}`
  }

  return (
    <div className="min-h-screen bg-black text-white">
      <div className="container mx-auto p-4 md:p-6 lg:p-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-green-400 md:text-4xl">💰 Shared Treasury</h1>
          <p className="mt-2 text-zinc-400">
            Transparent funding for public goods. See how community funds are allocated and spent.
          </p>
        </div>

        {/* Treasury Balance Card */}
        <div className="mb-8">
          <Card className="border-zinc-800 bg-zinc-900/50 overflow-hidden">
            <CardHeader className="pb-2">
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-xl text-white flex items-center">
                    <Landmark className="mr-2 h-5 w-5 text-green-400" />
                    Treasury Balance
                  </CardTitle>
                  <CardDescription className="text-zinc-400">Last updated {treasuryData.lastUpdated}</CardDescription>
                </div>
                <Button variant="outline" className="border-green-500/20 text-green-400 hover:bg-green-500/10">
                  <Download className="mr-2 h-4 w-4" />
                  Export
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="mt-4 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
                <div className="rounded-lg border border-zinc-800 bg-zinc-950 p-4">
                  <div className="text-sm font-medium text-zinc-400">Current Balance</div>
                  <div className="mt-1 flex items-baseline">
                    <span className="text-3xl font-bold text-white">{treasuryData.balance}</span>
                    <span className="ml-1 text-xl text-green-400">{treasuryData.token}</span>
                  </div>
                  <div className="mt-1 text-sm text-zinc-500">≈ ${treasuryData.usdValue} USD</div>
                </div>

                <div className="rounded-lg border border-zinc-800 bg-zinc-950 p-4">
                  <div className="text-sm font-medium text-zinc-400">30 Day Change</div>
                  <div className="mt-1 flex items-baseline">
                    <span className="text-3xl font-bold text-white">+95.20</span>
                    <span className="ml-1 text-xl text-green-400">{treasuryData.token}</span>
                  </div>
                  <div className="mt-1 flex items-center text-sm text-green-400">
                    <ArrowUp className="mr-1 h-3 w-3" />
                    {treasuryData.changePercent} from last month
                  </div>
                </div>

                <div className="rounded-lg border border-zinc-800 bg-zinc-950 p-4">
                  <div className="text-sm font-medium text-zinc-400">Total Inflow</div>
                  <div className="mt-1 flex items-baseline">
                    <span className="text-3xl font-bold text-white">320.00</span>
                    <span className="ml-1 text-xl text-green-400">{treasuryData.token}</span>
                  </div>
                  <div className="mt-1 flex items-center text-sm text-green-400">
                    <ArrowUp className="mr-1 h-3 w-3" />
                    Last 30 days
                  </div>
                </div>

                <div className="rounded-lg border border-zinc-800 bg-zinc-950 p-4">
                  <div className="text-sm font-medium text-zinc-400">Total Outflow</div>
                  <div className="mt-1 flex items-baseline">
                    <span className="text-3xl font-bold text-white">224.80</span>
                    <span className="ml-1 text-xl text-green-400">{treasuryData.token}</span>
                  </div>
                  <div className="mt-1 flex items-center text-sm text-red-400">
                    <ArrowDown className="mr-1 h-3 w-3" />
                    Last 30 days
                  </div>
                </div>
              </div>

              <div className="mt-6 flex justify-center">
                <Link href="/proposals/create">
                  <Button className="bg-green-500 text-black hover:bg-green-600">Propose Treasury Action</Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Transaction History */}
        <div>
          <div className="mb-6">
            <h2 className="text-2xl font-bold text-white">Transaction History</h2>
            <p className="mt-1 text-zinc-400">View all treasury transactions and their details</p>
          </div>

          {/* Filters and Search */}
          <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
            <div className="relative w-full max-w-sm">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-zinc-500" />
              <input
                type="text"
                placeholder="Search transactions..."
                className="w-full rounded-lg border border-zinc-800 bg-zinc-950 py-2 pl-10 pr-4 text-white placeholder:text-zinc-500 focus:border-green-500/30 focus:outline-none focus:ring-1 focus:ring-green-500/30"
              />
            </div>
            <div className="flex flex-wrap items-center gap-2">
              <Button
                variant="outline"
                className="border-zinc-800 text-zinc-400 hover:border-green-500/20 hover:text-green-400"
              >
                <Filter className="mr-2 h-4 w-4" />
                Filter
                <ChevronDown className="ml-2 h-4 w-4" />
              </Button>
              <Button
                variant="outline"
                className="border-zinc-800 text-zinc-400 hover:border-green-500/20 hover:text-green-400"
              >
                Latest First
                <ChevronDown className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </div>

          {loading ? (
            <div className="flex flex-col items-center justify-center space-y-4 py-12">
              <Loader2 className="h-8 w-8 animate-spin text-green-400" />
              <p className="text-zinc-400">Loading transaction history...</p>
            </div>
          ) : (
            <div className="rounded-lg border border-zinc-800 bg-zinc-900/50 overflow-hidden">
              {/* Desktop Table */}
              <div className="hidden md:block">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-zinc-800 bg-zinc-950">
                      <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-zinc-400">
                        Date
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-zinc-400">
                        Description
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-zinc-400">
                        Amount
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-zinc-400">
                        Type
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-zinc-400">
                        Transaction
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-zinc-800">
                    {transactions.map((tx) => (
                      <tr key={tx.id} className="hover:bg-zinc-900">
                        <td className="whitespace-nowrap px-6 py-4 text-sm text-zinc-300">{tx.date}</td>
                        <td className="px-6 py-4 text-sm text-white">{tx.description}</td>
                        <td className="whitespace-nowrap px-6 py-4 text-sm">
                          <span className={tx.type === "incoming" ? "text-green-400" : "text-zinc-300"}>
                            {tx.type === "incoming" ? "+" : "-"} {tx.amount} {treasuryData.token}
                          </span>
                        </td>
                        <td className="whitespace-nowrap px-6 py-4 text-sm">
                          <Badge
                            className={
                              tx.type === "incoming" ? "bg-green-500/10 text-green-400" : "bg-zinc-500/10 text-zinc-400"
                            }
                          >
                            {tx.type === "incoming" ? "Incoming" : "Outgoing"}
                          </Badge>
                        </td>
                        <td className="whitespace-nowrap px-6 py-4 text-sm text-zinc-400">
                          <a
                            href={`https://etherscan.io/tx/${tx.txHash}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center hover:text-green-400"
                          >
                            {formatTxHash(tx.txHash)}
                            <ExternalLink className="ml-1 h-3 w-3" />
                          </a>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Mobile List */}
              <div className="md:hidden">
                {transactions.map((tx, index) => (
                  <div key={tx.id}>
                    <div className="p-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-medium text-white">{tx.description}</p>
                          <p className="text-xs text-zinc-400">{tx.date}</p>
                        </div>
                        <Badge
                          className={
                            tx.type === "incoming" ? "bg-green-500/10 text-green-400" : "bg-zinc-500/10 text-zinc-400"
                          }
                        >
                          {tx.type === "incoming" ? "Incoming" : "Outgoing"}
                        </Badge>
                      </div>
                      <div className="mt-2 flex items-center justify-between">
                        <span className={tx.type === "incoming" ? "text-green-400" : "text-zinc-300"}>
                          {tx.type === "incoming" ? "+" : "-"} {tx.amount} {treasuryData.token}
                        </span>
                        <a
                          href={`https://etherscan.io/tx/${tx.txHash}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center text-xs text-zinc-400 hover:text-green-400"
                        >
                          {formatTxHash(tx.txHash)}
                          <ExternalLink className="ml-1 h-3 w-3" />
                        </a>
                      </div>
                    </div>
                    {index < transactions.length - 1 && <Separator className="bg-zinc-800" />}
                  </div>
                ))}
              </div>

              <div className="flex items-center justify-between border-t border-zinc-800 bg-zinc-950 px-6 py-3">
                <div className="text-sm text-zinc-400">
                  Showing <span className="font-medium text-white">1</span> to{" "}
                  <span className="font-medium text-white">{transactions.length}</span> of{" "}
                  <span className="font-medium text-white">24</span> transactions
                </div>
                <div className="flex space-x-2">
                  <Button
                    variant="outline"
                    size="sm"
                    className="h-8 border-zinc-800 text-zinc-400 hover:border-green-500/20 hover:text-green-400"
                    disabled
                  >
                    Previous
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    className="h-8 border-zinc-800 text-zinc-400 hover:border-green-500/20 hover:text-green-400"
                  >
                    Next
                  </Button>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Call to Action */}
        <div className="mt-12 rounded-xl border border-green-500/20 bg-zinc-900/50 p-6">
          <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
            <div>
              <h3 className="text-xl font-bold text-green-400">Want to propose a treasury action?</h3>
              <p className="mt-1 text-zinc-400">
                Submit a proposal to allocate treasury funds for community initiatives.
              </p>
            </div>
            <Link href="/proposals/create">
              <Button className="bg-green-500 text-black hover:bg-green-600">
                Create Proposal
                <ArrowUpRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
