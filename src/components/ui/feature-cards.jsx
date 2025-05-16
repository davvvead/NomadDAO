import { FileText, Vote, Landmark } from "lucide-react"

export default function FeatureCards() {
  const stats = [
    {
      title: "Active Residents",
      value: "3,721",
      description: "Community members with voting rights",
      icon: FileText,
      color: "text-green-400",
      bgColor: "bg-green-400/10",
      borderColor: "border-green-400/20",
    },
    {
      title: "Active Proposals",
      value: "12",
      description: "Governance proposals open for voting",
      icon: Vote,
      color: "text-green-400",
      bgColor: "bg-green-400/10",
      borderColor: "border-green-400/20",
    },
    {
      title: "Treasury Balance",
      value: "1,234 ROC",
      description: "Community funds available",
      icon: Landmark,
      color: "text-yellow-400",
      bgColor: "bg-yellow-400/10",
      borderColor: "border-yellow-400/20",
    },
  ]

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      {stats.map((stat) => (
        <div
          key={stat.title}
          className={`bg-zinc-900 rounded-lg border ${stat.borderColor} p-5 hover:border-opacity-50 transition-colors`}
        >
          <div className={`w-10 h-10 ${stat.bgColor} rounded-full flex items-center justify-center mb-4`}>
            <stat.icon className={`w-5 h-5 ${stat.color}`} />
          </div>
          <h3 className={`text-lg font-medium ${stat.color}`}>{stat.title}</h3>
          <p className="text-2xl font-bold mt-1 text-white">{stat.value}</p>
          <p className="text-zinc-400 text-sm mt-1">{stat.description}</p>
        </div>
      ))}
    </div>
  )
}
