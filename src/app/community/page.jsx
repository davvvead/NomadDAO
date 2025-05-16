"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import {
  Loader2,
  Users,
  MessageSquare,
  Twitter,
  Globe,
  Vote,
  Building2,
  Clock,
  ArrowUpRight,
  ExternalLink,
  Wallet,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { WalletProvider } from '@/context/WalletContext'
import ProtectedRoute from '@/components/ProtectedRoute'
import DashboardLayout from '@/components/layouts/DashboardLayout'

// Mock data for top contributors
const mockContributors = [
  {
    id: 1,
    username: "alex.eth",
    walletAddress: "0x71C7656EC7ab88b098defB751B7401B5f6d8976F",
    proposalsCreated: 12,
    votesCast: 87,
    avatar: "/placeholder.svg?height=100&width=100",
    role: "Core Contributor",
  },
  {
    id: 2,
    username: "maria.eth",
    walletAddress: "0x3a539f58b4e3e5eb35b9f86c81b5e5db2b5d1d7a",
    proposalsCreated: 8,
    votesCast: 64,
    avatar: "/placeholder.svg?height=100&width=100",
    role: "City Builder",
  },
  {
    id: 3,
    username: "nomad.dao",
    walletAddress: "0x7f4e31a8c5e5d8b9c8f8e3a5e3b5d1d7a3a539f5",
    proposalsCreated: 15,
    votesCast: 92,
    avatar: "/placeholder.svg?height=100&width=100",
    role: "DAO Multisig",
  },
  {
    id: 4,
    username: "dev.eth",
    walletAddress: "0x5d8b9c8f8e3a5e3b5d1d7a3a539f58b4e3e5eb35",
    proposalsCreated: 6,
    votesCast: 53,
    avatar: "/placeholder.svg?height=100&width=100",
    role: "Developer",
  },
  {
    id: 5,
    username: "teach.eth",
    walletAddress: "0x8e3a5e3b5d1d7a3a539f58b4e3e5eb35b9f86c81",
    proposalsCreated: 4,
    votesCast: 41,
    avatar: "/placeholder.svg?height=100&width=100",
    role: "Educator",
  },
  {
    id: 6,
    username: "partnerships.eth",
    walletAddress: "0x3e5eb35b9f86c81b5e5db2b5d1d7a3a539f58b4e",
    proposalsCreated: 7,
    votesCast: 38,
    avatar: "/placeholder.svg?height=100&width=100",
    role: "Partnerships Lead",
  },
]

// Mock data for recent activity
const mockActivities = [
  {
    id: 1,
    type: "proposal",
    username: "alex.eth",
    action: "submitted a new proposal",
    title: "Increase Treasury Allocation for Community Events",
    timestamp: "10 minutes ago",
    link: "/proposals/42",
  },
  {
    id: 2,
    type: "vote",
    username: "maria.eth",
    action: "voted on",
    title: "Add New Virtual City: Barcelona",
    timestamp: "25 minutes ago",
    link: "/proposals/41",
  },
  {
    id: 3,
    type: "mint",
    username: "dev.eth",
    action: "minted a new residency NFT",
    title: "Tokyo Citizen",
    timestamp: "1 hour ago",
    link: "/residency-nfts",
  },
  {
    id: 4,
    type: "vote",
    username: "teach.eth",
    action: "voted on",
    title: "Implement Cross-City Collaboration Framework",
    timestamp: "2 hours ago",
    link: "/proposals/40",
  },
  {
    id: 5,
    type: "proposal",
    username: "partnerships.eth",
    action: "submitted a new proposal",
    title: "Establish Partnership with MetaverseDAO",
    timestamp: "3 hours ago",
    link: "/proposals/37",
  },
  {
    id: 6,
    type: "mint",
    username: "nomad.dao",
    action: "minted a new residency NFT",
    title: "Berlin Innovator",
    timestamp: "5 hours ago",
    link: "/residency-nfts",
  },
  {
    id: 7,
    type: "vote",
    username: "alex.eth",
    action: "voted on",
    title: "Upgrade Governance Voting System",
    timestamp: "6 hours ago",
    link: "/proposals/39",
  },
  {
    id: 8,
    type: "proposal",
    username: "maria.eth",
    action: "submitted a new proposal",
    title: "Launch Educational Program for New Residents",
    timestamp: "8 hours ago",
    link: "/proposals/38",
  },
]

export default function CommunityPage() {
  const [loading, setLoading] = useState(true)
  const [contributors, setContributors] = useState([])
  const [activities, setActivities] = useState([])
  const [isAuthenticated, setIsAuthenticated] = useState(false)

  // Simulate loading data
  useEffect(() => {
    const timer = setTimeout(() => {
      setContributors(mockContributors)
      setActivities(mockActivities)
      setLoading(false)
    }, 1200)

    return () => clearTimeout(timer)
  }, [])

  // Format wallet address for display
  const formatWalletAddress = (address) => {
    return `${address.substring(0, 6)}...${address.substring(address.length - 4)}`
  }

  // Get icon for activity type
  const getActivityIcon = (type) => {
    switch (type) {
      case "proposal":
        return <Vote className="h-5 w-5 text-green-400" />
      case "vote":
        return <Vote className="h-5 w-5 text-blue-400" />
      case "mint":
        return <Building2 className="h-5 w-5 text-yellow-400" />
      default:
        return <Clock className="h-5 w-5 text-zinc-400" />
    }
  }

  if (loading) {
    return (
      <WalletProvider>
        <ProtectedRoute>
          <DashboardLayout>
            <div className="flex flex-col items-center justify-center space-y-4 py-12">
              <Loader2 className="h-8 w-8 animate-spin text-green-400" />
              <p className="text-zinc-400">Loading community data...</p>
            </div>
          </DashboardLayout>
        </ProtectedRoute>
      </WalletProvider>
    )
  }

  return (
    <WalletProvider>
      <ProtectedRoute>
        <DashboardLayout>
          <div className="container mx-auto p-4 md:p-6 lg:p-8">
            <div className="mb-8">
              <h1 className="text-3xl font-bold text-green-400 md:text-4xl">👥 Community</h1>
              <p className="mt-2 text-zinc-400">Connect with fellow citizens and participate in our virtual cities</p>
            </div>

            <div className="grid gap-8 lg:grid-cols-3">
              {/* Main Content - Top Contributors and Activity Feed */}
              <div className="lg:col-span-2 space-y-8">
                {/* Top Contributors */}
                <div>
                  <div className="mb-6 flex items-center justify-between">
                    <div>
                      <h2 className="text-2xl font-bold text-white">Top Contributors</h2>
                      <p className="mt-1 text-zinc-400">Community members making an impact</p>
                    </div>
                    <Button
                      variant="outline"
                      className="border-zinc-800 text-zinc-400 hover:border-green-500/20 hover:text-green-400"
                    >
                      View All
                      <ArrowUpRight className="ml-2 h-4 w-4" />
                    </Button>
                  </div>

                  <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
                    {contributors.map((contributor) => (
                      <Card
                        key={contributor.id}
                        className="border-zinc-800 bg-zinc-900/50 transition-all hover:border-green-500/20 hover:shadow-[0_0_15px_rgba(34,197,94,0.1)]"
                      >
                        <CardContent className="p-4">
                          <div className="flex items-start gap-3">
                            <Avatar className="h-12 w-12 border border-green-500/20">
                              <AvatarImage src={contributor.avatar || "/placeholder.svg"} alt={contributor.username} />
                              <AvatarFallback className="bg-green-500/10 text-green-400">
                                {contributor.username.substring(0, 2).toUpperCase()}
                              </AvatarFallback>
                            </Avatar>
                            <div className="flex-1 min-w-0">
                              <div className="flex items-center justify-between">
                                <h3 className="font-bold text-white truncate">{contributor.username}</h3>
                                <Badge className="bg-green-500/10 text-green-400 ml-2 truncate">{contributor.role}</Badge>
                              </div>
                              <p className="text-xs text-zinc-500 mt-1 flex items-center">
                                <Wallet className="h-3 w-3 mr-1" />
                                {formatWalletAddress(contributor.walletAddress)}
                              </p>
                              <div className="mt-3 grid grid-cols-2 gap-2 text-center">
                                <div className="rounded-md bg-zinc-950 px-2 py-1">
                                  <p className="text-lg font-bold text-green-400">{contributor.proposalsCreated}</p>
                                  <p className="text-xs text-zinc-400">Proposals</p>
                                </div>
                                <div className="rounded-md bg-zinc-950 px-2 py-1">
                                  <p className="text-lg font-bold text-green-400">{contributor.votesCast}</p>
                                  <p className="text-xs text-zinc-400">Votes</p>
                                </div>
                              </div>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </div>

                {/* Recent Activity */}
                <div>
                  <div className="mb-6 flex items-center justify-between">
                    <div>
                      <h2 className="text-2xl font-bold text-white">Recent Activity</h2>
                      <p className="mt-1 text-zinc-400">Latest actions from our community members</p>
                    </div>
                    <Button
                      variant="outline"
                      className="border-zinc-800 text-zinc-400 hover:border-green-500/20 hover:text-green-400"
                    >
                      View All
                      <ArrowUpRight className="ml-2 h-4 w-4" />
                    </Button>
                  </div>

                  <Card className="border-zinc-800 bg-zinc-900/50">
                    <CardContent className="p-0">
                      <div className="divide-y divide-zinc-800">
                        {activities.map((activity, index) => (
                          <div key={activity.id} className="p-4 hover:bg-zinc-900/50">
                            <div className="flex items-start gap-3">
                              <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-zinc-950">
                                {getActivityIcon(activity.type)}
                              </div>
                              <div className="min-w-0 flex-1">
                                <div className="flex flex-wrap items-center gap-1">
                                  <span className="font-medium text-green-400">{activity.username}</span>
                                  <span className="text-zinc-400">{activity.action}</span>
                                  <Link
                                    href={activity.link}
                                    className="font-medium text-white hover:text-green-400 truncate"
                                  >
                                    {activity.title}
                                  </Link>
                                </div>
                                <p className="mt-1 flex items-center text-xs text-zinc-500">
                                  <Clock className="mr-1 h-3 w-3" />
                                  {activity.timestamp}
                                </p>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>

              {/* Sidebar - Join Community and Stats */}
              <div className="space-y-6">
                {/* Connect Wallet CTA (if not authenticated) */}
                {!isAuthenticated && (
                  <Card className="border-green-500/20 bg-zinc-900/50 overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-br from-green-500/10 to-transparent opacity-50"></div>
                    <CardContent className="relative p-6">
                      <div className="flex flex-col items-center text-center">
                        <Users className="h-12 w-12 text-green-400 mb-4" />
                        <h3 className="text-xl font-bold text-white">Join Our Community</h3>
                        <p className="mt-2 text-zinc-400">
                          Connect your wallet to participate in governance and access exclusive community features.
                        </p>
                        <Button className="mt-4 bg-green-500 text-black hover:bg-green-600">Connect Wallet & Join</Button>
                      </div>
                    </CardContent>
                  </Card>
                )}

                {/* Join Our Spaces */}
                <Card className="border-zinc-800 bg-zinc-900/50">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-xl text-white">Join Our Spaces</CardTitle>
                    <CardDescription className="text-zinc-400">Connect with us on these platforms</CardDescription>
                  </CardHeader>
                  <CardContent className="p-6">
                    <div className="space-y-4">
                      <a
                        href="https://discord.gg/nomaddao"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center justify-between rounded-lg border border-zinc-800 bg-zinc-950 p-4 transition-colors hover:border-green-500/20 hover:text-green-400"
                      >
                        <div className="flex items-center">
                          <MessageSquare className="h-5 w-5 mr-3 text-zinc-400" />
                          <span className="text-white">Discord</span>
                        </div>
                        <ExternalLink className="h-4 w-4 text-zinc-400" />
                      </a>
                      <a
                        href="https://twitter.com/nomaddao"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center justify-between rounded-lg border border-zinc-800 bg-zinc-950 p-4 transition-colors hover:border-green-500/20 hover:text-green-400"
                      >
                        <div className="flex items-center">
                          <Twitter className="h-5 w-5 mr-3 text-zinc-400" />
                          <span className="text-white">Twitter</span>
                        </div>
                        <ExternalLink className="h-4 w-4 text-zinc-400" />
                      </a>
                      <a
                        href="https://forum.nomaddao.org"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center justify-between rounded-lg border border-zinc-800 bg-zinc-950 p-4 transition-colors hover:border-green-500/20 hover:text-green-400"
                      >
                        <div className="flex items-center">
                          <Globe className="h-5 w-5 mr-3 text-zinc-400" />
                          <span className="text-white">Forum</span>
                        </div>
                        <ExternalLink className="h-4 w-4 text-zinc-400" />
                      </a>
                    </div>
                  </CardContent>
                </Card>

                {/* Community Stats */}
                <Card className="border-zinc-800 bg-zinc-900/50">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-xl text-white">Community Stats</CardTitle>
                    <CardDescription className="text-zinc-400">Current community metrics</CardDescription>
                  </CardHeader>
                  <CardContent className="p-6">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="rounded-lg border border-zinc-800 bg-zinc-950 p-3 text-center">
                        <p className="text-2xl font-bold text-green-400">3,721</p>
                        <p className="text-xs text-zinc-400">Total Members</p>
                      </div>
                      <div className="rounded-lg border border-zinc-800 bg-zinc-950 p-3 text-center">
                        <p className="text-2xl font-bold text-green-400">12</p>
                        <p className="text-xs text-zinc-400">Active Proposals</p>
                      </div>
                      <div className="rounded-lg border border-zinc-800 bg-zinc-950 p-3 text-center">
                        <p className="text-2xl font-bold text-green-400">6</p>
                        <p className="text-xs text-zinc-400">Virtual Cities</p>
                      </div>
                      <div className="rounded-lg border border-zinc-800 bg-zinc-950 p-3 text-center">
                        <p className="text-2xl font-bold text-green-400">87%</p>
                        <p className="text-xs text-zinc-400">Participation Rate</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Upcoming Events */}
                <Card className="border-zinc-800 bg-zinc-900/50">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-xl text-white">Upcoming Events</CardTitle>
                    <CardDescription className="text-zinc-400">Join our community events</CardDescription>
                  </CardHeader>
                  <CardContent className="p-6">
                    <div className="space-y-4">
                      <div className="rounded-lg border border-zinc-800 bg-zinc-950 p-4">
                        <div className="flex justify-between">
                          <h4 className="font-medium text-white">Tokyo City Hall</h4>
                          <Badge className="bg-green-500/10 text-green-400">Tomorrow</Badge>
                        </div>
                        <p className="mt-1 text-sm text-zinc-400">Monthly community call to discuss city initiatives</p>
                        <div className="mt-2 text-xs text-zinc-500">May 17, 2025 • 10:00 AM UTC</div>
                      </div>
                      <div className="rounded-lg border border-zinc-800 bg-zinc-950 p-4">
                        <div className="flex justify-between">
                          <h4 className="font-medium text-white">Governance Workshop</h4>
                          <Badge className="bg-zinc-500/10 text-zinc-400">Next Week</Badge>
                        </div>
                        <p className="mt-1 text-sm text-zinc-400">Learn how to create effective governance proposals</p>
                        <div className="mt-2 text-xs text-zinc-500">May 22, 2025 • 3:00 PM UTC</div>
                      </div>
                    </div>
                    <Button
                      variant="outline"
                      className="mt-4 w-full border-zinc-800 text-zinc-400 hover:border-green-500/20 hover:text-green-400"
                    >
                      View All Events
                    </Button>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </DashboardLayout>
      </ProtectedRoute>
    </WalletProvider>
  )
}
