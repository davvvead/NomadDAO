"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Loader2, Filter, ChevronDown, Clock, User, CheckCircle, XCircle, HelpCircle, AlertCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"

// Mock proposal data with more variety
const mockProposals = [
  {
    id: "PROP-42",
    title: "Increase Treasury Allocation for Community Events",
    author: "alex.eth",
    status: "active",
    timeLeft: "2 days left",
    votes: {
      for: 1823,
      against: 429,
      abstain: 105,
    },
    description:
      "This proposal aims to increase the budget allocated to community events from 5% to 8% of the treasury to foster more engagement and growth within our virtual cities.",
  },
  {
    id: "PROP-41",
    title: "Add New Virtual City: Barcelona",
    author: "maria.eth",
    status: "closed",
    timeLeft: "Ended 2 hours ago",
    votes: {
      for: 2156,
      against: 342,
      abstain: 78,
    },
    description:
      "Proposal to create a new virtual city based on Barcelona with focus on creative arts and cultural exchange programs.",
  },
  {
    id: "PROP-40",
    title: "Implement Cross-City Collaboration Framework",
    author: "nomad.dao",
    status: "active",
    timeLeft: "1 day left",
    votes: {
      for: 1245,
      against: 856,
      abstain: 231,
    },
    description:
      "Create a framework that allows residents from different virtual cities to collaborate on projects and share resources.",
  },
  {
    id: "PROP-39",
    title: "Establish DAO Emergency Response Fund",
    author: "safety.eth",
    status: "rejected",
    timeLeft: "Ended 1 day ago",
    votes: {
      for: 856,
      against: 1245,
      abstain: 102,
    },
    description:
      "Create an emergency fund worth 10% of the treasury to handle unforeseen circumstances and protect our virtual cities.",
  },
  {
    id: "PROP-38",
    title: "Virtual City Sustainability Initiative",
    author: "green.eth",
    status: "draft",
    timeLeft: "Not started",
    votes: {
      for: 0,
      against: 0,
      abstain: 0,
    },
    description:
      "Implement sustainability metrics and rewards for virtual cities that maintain high engagement and growth rates.",
  }
]

export default function ProposalsPage() {
  const [loading, setLoading] = useState(true)
  const [filter, setFilter] = useState("all")
  const [sortBy, setSortBy] = useState("newest")
  const [userVotes, setUserVotes] = useState({})

  useEffect(() => {
    // Simulate brief loading state
    const timer = setTimeout(() => {
      setLoading(false)
    }, 1500)
    return () => clearTimeout(timer)
  }, [])

  // Get status badge styling
  const getStatusBadge = (status) => {
    switch (status) {
      case "active":
        return <Badge className="bg-green-500/10 text-green-400">Active</Badge>
      case "closed":
        return <Badge className="bg-blue-500/10 text-blue-400">Passed</Badge>
      case "rejected":
        return <Badge className="bg-red-500/10 text-red-400">Rejected</Badge>
      case "draft":
        return <Badge className="bg-zinc-500/10 text-zinc-400">Draft</Badge>
      default:
        return <Badge className="bg-zinc-500/10 text-zinc-400">Unknown</Badge>
    }
  }

  // Calculate vote percentages and total
  const getVotePercentages = (votes) => {
    const total = votes.for + votes.against + votes.abstain
    return {
      for: Math.round((votes.for / total) * 100) || 0,
      against: Math.round((votes.against / total) * 100) || 0,
      abstain: Math.round((votes.abstain / total) * 100) || 0,
      total,
    }
  }

  // Filter proposals based on selected filter
  const filteredProposals = mockProposals.filter(proposal => {
    if (filter === "all") return true
    return proposal.status === filter
  })

  // Sort proposals based on selected sort option
  const sortedProposals = [...filteredProposals].sort((a, b) => {
    if (sortBy === "newest") {
      return parseInt(b.id.split("-")[1]) - parseInt(a.id.split("-")[1])
    }
    if (sortBy === "oldest") {
      return parseInt(a.id.split("-")[1]) - parseInt(b.id.split("-")[1])
    }
    if (sortBy === "mostVotes") {
      const totalVotesA = a.votes.for + a.votes.against + a.votes.abstain
      const totalVotesB = b.votes.for + b.votes.against + b.votes.abstain
      return totalVotesB - totalVotesA
    }
    return 0
  })

  // Handle voting
  const handleVote = (proposalId, voteType) => {
    setUserVotes(prev => ({
      ...prev,
      [proposalId]: voteType
    }))
  }

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center space-y-4 py-12">
        <Loader2 className="h-8 w-8 animate-spin text-green-400" />
        <p className="text-zinc-400">Loading proposals</p>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Filters and Sort */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div className="flex flex-wrap items-center gap-2">
          <Button
            variant={filter === "all" ? "default" : "outline"}
            onClick={() => setFilter("all")}
            className={
              filter === "all"
                ? "bg-green-500 text-black hover:bg-green-600"
                : "border-zinc-800 text-zinc-400 hover:border-green-500/20 hover:text-green-400"
            }
          >
            All Proposals
          </Button>
          <Button
            variant={filter === "active" ? "default" : "outline"}
            onClick={() => setFilter("active")}
            className={
              filter === "active"
                ? "bg-green-500 text-black hover:bg-green-600"
                : "border-zinc-800 text-zinc-400 hover:border-green-500/20 hover:text-green-400"
            }
          >
            Active
          </Button>
          <Button
            variant={filter === "closed" ? "default" : "outline"}
            onClick={() => setFilter("closed")}
            className={
              filter === "closed"
                ? "bg-blue-500 text-black hover:bg-blue-600"
                : "border-zinc-800 text-zinc-400 hover:border-green-500/20 hover:text-green-400"
            }
          >
            Passed
          </Button>
          <Button
            variant={filter === "rejected" ? "default" : "outline"}
            onClick={() => setFilter("rejected")}
            className={
              filter === "rejected"
                ? "bg-red-500 text-black hover:bg-red-600"
                : "border-zinc-800 text-zinc-400 hover:border-green-500/20 hover:text-green-400"
            }
          >
            Rejected
          </Button>
          <Button
            variant={filter === "draft" ? "default" : "outline"}
            onClick={() => setFilter("draft")}
            className={
              filter === "draft"
                ? "bg-zinc-500 text-black hover:bg-zinc-600"
                : "border-zinc-800 text-zinc-400 hover:border-green-500/20 hover:text-green-400"
            }
          >
            Drafts
          </Button>
        </div>
        <div className="flex items-center gap-2">
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="rounded-lg border border-zinc-800 bg-zinc-900/50 px-3 py-2 text-sm text-zinc-400 focus:border-green-500/20 focus:outline-none"
          >
            <option value="newest">Newest First</option>
            <option value="oldest">Oldest First</option>
            <option value="mostVotes">Most Votes</option>
          </select>
        </div>
      </div>

      {/* Stats Overview */}
      <div className="grid gap-4 md:grid-cols-4">
        <div className="rounded-xl border border-zinc-800 bg-zinc-900/50 p-4">
          <div className="text-sm text-zinc-400">Total Proposals</div>
          <div className="mt-1 text-2xl font-bold text-zinc-100">{mockProposals.length}</div>
        </div>
        <div className="rounded-xl border border-green-500/20 bg-zinc-900/50 p-4">
          <div className="text-sm text-zinc-400">Active Proposals</div>
          <div className="mt-1 text-2xl font-bold text-green-400">
            {mockProposals.filter(p => p.status === "active").length}
          </div>
        </div>
        <div className="rounded-xl border border-blue-500/20 bg-zinc-900/50 p-4">
          <div className="text-sm text-zinc-400">Passed Proposals</div>
          <div className="mt-1 text-2xl font-bold text-blue-400">
            {mockProposals.filter(p => p.status === "closed").length}
          </div>
        </div>
        <div className="rounded-xl border border-red-500/20 bg-zinc-900/50 p-4">
          <div className="text-sm text-zinc-400">Rejected Proposals</div>
          <div className="mt-1 text-2xl font-bold text-red-400">
            {mockProposals.filter(p => p.status === "rejected").length}
          </div>
        </div>
      </div>

      {/* Proposals Grid */}
      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
        {sortedProposals.map((proposal) => {
          const voteStats = getVotePercentages(proposal.votes)
          const userVote = userVotes[proposal.id]

          return (
            <div
              key={proposal.id}
              className="group overflow-hidden rounded-xl border border-zinc-800 bg-zinc-900/50 transition-all hover:border-green-500/20 hover:shadow-[0_0_15px_rgba(34,197,94,0.1)]"
            >
              <div className="p-6">
                <div className="mb-4 flex items-start justify-between">
                  <div>
                    <h3 className="text-xl font-bold text-zinc-100 group-hover:text-green-400">
                      {proposal.title}
                    </h3>
                    <div className="mt-1 flex items-center gap-2 text-sm text-zinc-400">
                      <span className="flex items-center gap-1">
                        <User className="h-3.5 w-3.5" />
                        {proposal.author}
                      </span>
                      <span className="text-zinc-600">•</span>
                      <span className="flex items-center gap-1">
                        <Clock className="h-3.5 w-3.5" />
                        {proposal.timeLeft}
                      </span>
                    </div>
                  </div>
                  <div className="flex flex-col items-end gap-2">
                    {getStatusBadge(proposal.status)}
                    <span className="text-xs font-mono text-zinc-500">{proposal.id}</span>
                  </div>
                </div>

                <p className="mb-4 text-sm text-zinc-400 line-clamp-2">{proposal.description}</p>

                <div className="space-y-3">
                  <div className="space-y-1">
                    <div className="flex items-center justify-between text-xs">
                      <span className="flex items-center text-green-400">
                        <CheckCircle className="mr-1 h-3 w-3" /> For: {voteStats.for}%
                      </span>
                      <span className="text-zinc-400">{proposal.votes.for.toLocaleString()} votes</span>
                    </div>
                    <Progress value={voteStats.for} className="h-1.5 bg-zinc-800">
                      <div className="h-full bg-green-500" style={{ width: `${voteStats.for}%` }} />
                    </Progress>
                  </div>

                  <div className="space-y-1">
                    <div className="flex items-center justify-between text-xs">
                      <span className="flex items-center text-red-400">
                        <XCircle className="mr-1 h-3 w-3" /> Against: {voteStats.against}%
                      </span>
                      <span className="text-zinc-400">{proposal.votes.against.toLocaleString()} votes</span>
                    </div>
                    <Progress value={voteStats.against} className="h-1.5 bg-zinc-800">
                      <div className="h-full bg-red-500" style={{ width: `${voteStats.against}%` }} />
                    </Progress>
                  </div>

                  <div className="space-y-1">
                    <div className="flex items-center justify-between text-xs">
                      <span className="flex items-center text-zinc-400">
                        <HelpCircle className="mr-1 h-3 w-3" /> Abstain: {voteStats.abstain}%
                      </span>
                      <span className="text-zinc-400">{proposal.votes.abstain.toLocaleString()} votes</span>
                    </div>
                    <Progress value={voteStats.abstain} className="h-1.5 bg-zinc-800">
                      <div className="h-full bg-zinc-500" style={{ width: `${voteStats.abstain}%` }} />
                    </Progress>
                  </div>
                </div>

                {proposal.status === "active" && (
                  <div className="mt-6 grid grid-cols-3 gap-2">
                    <Button
                      variant="outline"
                      className={`${
                        userVote === "for"
                          ? "border-green-500 bg-green-500/10 text-green-400"
                          : "border-zinc-800 text-zinc-400 hover:border-green-500/20 hover:text-green-400"
                      }`}
                      onClick={() => handleVote(proposal.id, "for")}
                    >
                      <CheckCircle className="mr-1 h-4 w-4" /> For
                    </Button>
                    <Button
                      variant="outline"
                      className={`${
                        userVote === "against"
                          ? "border-red-500 bg-red-500/10 text-red-400"
                          : "border-zinc-800 text-zinc-400 hover:border-red-500/20 hover:text-red-400"
                      }`}
                      onClick={() => handleVote(proposal.id, "against")}
                    >
                      <XCircle className="mr-1 h-4 w-4" /> Against
                    </Button>
                    <Button
                      variant="outline"
                      className={`${
                        userVote === "abstain"
                          ? "border-zinc-500 bg-zinc-500/10 text-zinc-400"
                          : "border-zinc-800 text-zinc-400 hover:border-zinc-500/20"
                      }`}
                      onClick={() => handleVote(proposal.id, "abstain")}
                    >
                      <HelpCircle className="mr-1 h-4 w-4" /> Abstain
                    </Button>
                  </div>
                )}

                {proposal.status !== "active" && (
                  <div className="mt-6 flex items-center justify-between">
                    <div className="text-xs text-zinc-500">
                      Total votes: {voteStats.total.toLocaleString()}
                    </div>
                    <div className="flex items-center text-sm">
                      {proposal.status === "closed" && (
                        <span className="flex items-center text-blue-400">
                          <CheckCircle className="mr-1 h-4 w-4" /> Proposal Passed
                        </span>
                      )}
                      {proposal.status === "rejected" && (
                        <span className="flex items-center text-red-400">
                          <XCircle className="mr-1 h-4 w-4" /> Proposal Rejected
                        </span>
                      )}
                      {proposal.status === "draft" && (
                        <span className="flex items-center text-zinc-400">
                          <AlertCircle className="mr-1 h-4 w-4" /> Draft
                        </span>
                      )}
                    </div>
                  </div>
                )}
              </div>
            </div>
          )
        })}
      </div>

      {/* Create Proposal Card */}
      <div className="rounded-xl border border-green-500/20 bg-zinc-900/50 p-6">
        <h2 className="text-xl font-bold text-green-400">Create a Proposal</h2>
        <p className="mt-2 text-zinc-400">
          Have an idea to improve our virtual cities? Create a governance proposal and let the community vote on it.
        </p>
        <Link href="/proposals/create">
          <Button className="mt-4 bg-green-500 text-black hover:bg-green-600">New Proposal</Button>
        </Link>
      </div>
    </div>
  )
}

