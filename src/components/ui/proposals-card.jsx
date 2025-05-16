import { Vote, CheckCircle, Clock, XCircle } from "lucide-react"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"

export default function ProposalsCard() {
  const proposals = [
    {
      id: "PROP-42",
      title: "Increase Treasury Allocation for Community Events",
      votes: { for: 1823, against: 429 },
      status: "active",
      author: "alex.eth",
      timeLeft: "2 days left",
    },
    {
      id: "PROP-41",
      title: "Add New Governance Framework for DAO Decisions",
      votes: { for: 2145, against: 321 },
      status: "passed",
      author: "nomad.lens",
      timeLeft: "Ended 3 days ago",
    },
    {
      id: "PROP-40",
      title: "Partner with MetaCollective for Cross-DAO Initiatives",
      votes: { for: 1245, against: 1532 },
      status: "failed",
      author: "0xJosh",
      timeLeft: "Ended 5 days ago",
    },
  ]

  const getStatusIcon = (status) => {
    switch (status) {
      case "active":
        return <Clock size={16} className="text-yellow-400" />
      case "passed":
        return <CheckCircle size={16} className="text-green-400" />
      case "failed":
        return <XCircle size={16} className="text-red-400" />
      default:
        return null
    }
  }

  const getStatusClass = (status) => {
    switch (status) {
      case "active":
        return "bg-yellow-400/10 text-yellow-400 border-yellow-400/30"
      case "passed":
        return "bg-green-400/10 text-green-400 border-green-400/30"
      case "failed":
        return "bg-red-400/10 text-red-400 border-red-400/30"
      default:
        return ""
    }
  }

  return (
    <div className="bg-zinc-900 rounded-lg border border-green-400/20 overflow-hidden">
      <div className="p-5">
        <div className="flex items-start mb-4">
          <div className="w-10 h-10 bg-green-400/10 rounded-full flex items-center justify-center">
            <Vote className="w-5 h-5 text-green-400" />
          </div>
          <div className="ml-4">
            <h2 className="text-lg font-medium text-green-400">DAO Proposals</h2>
            <p className="text-zinc-400 text-sm mt-1">
              Help govern upgrades to your community. Vote on proposals and shape the future of your virtual city.
            </p>
          </div>
        </div>

        <div className="space-y-3 mt-6">
          {proposals.map((proposal) => (
            <div
              key={proposal.id}
              className="p-3 rounded-lg bg-zinc-800/50 border border-zinc-700 hover:bg-zinc-800 transition-colors"
            >
              <div className="flex items-start justify-between mb-2">
                <div>
                  <h3 className="font-medium text-zinc-100">{proposal.title}</h3>
                  <div className="flex items-center mt-1 space-x-2">
                    <span className="text-xs text-zinc-400">{proposal.id}</span>
                    <span className="text-xs text-zinc-500">•</span>
                    <div className="flex items-center">
                      <Avatar className="h-4 w-4 mr-1">
                        <AvatarFallback name={proposal.author} variant="pixel" size={16} />
                      </Avatar>
                      <span className="text-xs text-zinc-400">{proposal.author}</span>
                    </div>
                  </div>
                </div>
                <div
                  className={`px-2 py-1 text-xs rounded border ${getStatusClass(proposal.status)} flex items-center`}
                >
                  {getStatusIcon(proposal.status)}
                  <span className="ml-1 capitalize">{proposal.status}</span>
                </div>
              </div>

              <div className="mt-3">
                <div className="flex items-center justify-between text-xs mb-1">
                  <span className="text-zinc-400">Votes</span>
                  <span className="text-zinc-400">{proposal.timeLeft}</span>
                </div>
                <div className="w-full bg-zinc-700 rounded-full h-1.5 overflow-hidden">
                  <div
                    className="bg-green-400 h-1.5"
                    style={{
                      width: `${(proposal.votes.for / (proposal.votes.for + proposal.votes.against)) * 100}%`,
                    }}
                  ></div>
                </div>
                <div className="flex items-center justify-between text-xs mt-1">
                  <span className="text-green-400">{proposal.votes.for} For</span>
                  <span className="text-red-400">{proposal.votes.against} Against</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        <button className="w-full mt-4 py-3 px-4 bg-zinc-800 rounded-lg font-medium text-zinc-100 hover:bg-zinc-700 transition-colors">
          View All Proposals
        </button>
      </div>
    </div>
  )
}
