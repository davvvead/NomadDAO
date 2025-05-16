"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { ChevronLeft, HelpCircle, Calendar, Clock, AlertCircle, CheckCircle, XCircle, Plus, Trash2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Badge } from "@/components/ui/badge"

export default function CreateProposalPage() {
  const router = useRouter()
  const [formData, setFormData] = useState({
    title: "",
    summary: "",
    details: "",
    duration: "7",
    votingSystem: "simple",
    options: [
      { id: 1, label: "For", description: "Vote in favor of this proposal" },
      { id: 2, label: "Against", description: "Vote against this proposal" },
      { id: 3, label: "Abstain", description: "Formally abstain from voting" },
    ],
  })
  const [errors, setErrors] = useState({})
  const [isPreviewMode, setIsPreviewMode] = useState(false)

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData({
      ...formData,
      [name]: value,
    })

    // Clear error when user types
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: null,
      })
    }
  }

  const handleOptionChange = (id, field, value) => {
    setFormData({
      ...formData,
      options: formData.options.map((option) => (option.id === id ? { ...option, [field]: value } : option)),
    })
  }

  const addOption = () => {
    const newId = Math.max(...formData.options.map((o) => o.id), 0) + 1
    setFormData({
      ...formData,
      options: [...formData.options, { id: newId, label: "", description: "" }],
    })
  }

  const removeOption = (id) => {
    if (formData.options.length <= 2) {
      setErrors({
        ...errors,
        options: "At least two voting options are required",
      })
      return
    }

    setFormData({
      ...formData,
      options: formData.options.filter((option) => option.id !== id),
    })

    if (errors.options) {
      setErrors({
        ...errors,
        options: null,
      })
    }
  }

  const validateForm = () => {
    const newErrors = {}

    if (!formData.title.trim()) {
      newErrors.title = "Title is required"
    } else if (formData.title.length < 10) {
      newErrors.title = "Title must be at least 10 characters"
    }

    if (!formData.summary.trim()) {
      newErrors.summary = "Summary is required"
    }

    if (!formData.details.trim()) {
      newErrors.details = "Details are required"
    }

    // Validate options
    const emptyOptions = formData.options.filter((o) => !o.label.trim())
    if (emptyOptions.length > 0) {
      newErrors.options = "All voting options must have a label"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    if (!validateForm()) {
      return
    }

    // Here you would normally submit the proposal to your backend
    console.log("Submitting proposal:", formData)

    // Simulate success and redirect
    setTimeout(() => {
      router.push("/proposals?success=true")
    }, 1000)
  }

  const togglePreview = () => {
    if (!isPreviewMode && !validateForm()) {
      return
    }
    setIsPreviewMode(!isPreviewMode)
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <Link href="/proposals" className="mb-4 inline-flex items-center text-sm text-zinc-400 hover:text-green-400">
            <ChevronLeft className="mr-1 h-4 w-4" />
            Back to Proposals
          </Link>
          <h1 className="text-3xl font-bold text-green-400">Create New Proposal</h1>
          <p className="mt-2 text-zinc-400">Submit a governance proposal for the community to vote on</p>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Main Form */}
        <div className="lg:col-span-2">
          <Card className="border-zinc-800 bg-zinc-900/50">
            <CardContent className="p-6">
              {isPreviewMode ? (
                <div className="space-y-6">
                  <div>
                    <Badge className="mb-2 bg-green-500/10 text-green-400">Preview</Badge>
                    <h2 className="text-2xl font-bold text-white">{formData.title || "Untitled Proposal"}</h2>
                    <div className="mt-1 flex items-center gap-2 text-sm text-zinc-400">
                      <span>PROP-XX</span>
                      <span className="text-zinc-600">•</span>
                      <span>your.eth</span>
                      <span className="text-zinc-600">•</span>
                      <span className="flex items-center gap-1">
                        <Clock className="h-3.5 w-3.5" />
                        {formData.duration} days
                      </span>
                    </div>
                  </div>

                  <div>
                    <h3 className="mb-2 text-lg font-medium text-zinc-200">Summary</h3>
                    <p className="text-zinc-400">{formData.summary || "No summary provided"}</p>
                  </div>

                  <Separator className="bg-zinc-800" />

                  <div>
                    <h3 className="mb-2 text-lg font-medium text-zinc-200">Details</h3>
                    <div className="rounded-lg border border-zinc-800 bg-zinc-950 p-4 text-zinc-400">
                      {formData.details || "No details provided"}
                    </div>
                  </div>

                  <Separator className="bg-zinc-800" />

                  <div>
                    <h3 className="mb-4 text-lg font-medium text-zinc-200">Voting Options</h3>
                    <div className="space-y-3">
                      {formData.options.map((option) => (
                        <div key={option.id} className="rounded-lg border border-zinc-800 bg-zinc-950 p-4">
                          <div className="flex items-start">
                            {option.id === 1 && <CheckCircle className="mr-2 h-5 w-5 text-green-400" />}
                            {option.id === 2 && <XCircle className="mr-2 h-5 w-5 text-red-400" />}
                            {option.id > 2 && <HelpCircle className="mr-2 h-5 w-5 text-zinc-400" />}
                            <div>
                              <h4 className="font-medium text-zinc-200">{option.label || "Unnamed Option"}</h4>
                              <p className="text-sm text-zinc-500">{option.description || "No description"}</p>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="flex justify-end space-x-3">
                    <Button
                      variant="outline"
                      className="border-zinc-800 text-zinc-400 hover:border-green-500/20 hover:text-green-400"
                      onClick={togglePreview}
                    >
                      Edit Proposal
                    </Button>
                    <Button className="bg-green-500 text-black hover:bg-green-600" onClick={handleSubmit}>
                      Submit Proposal
                    </Button>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <label htmlFor="title" className="mb-2 block text-sm font-medium text-zinc-200">
                      Proposal Title <span className="text-red-400">*</span>
                    </label>
                    <input
                      id="title"
                      name="title"
                      type="text"
                      value={formData.title}
                      onChange={handleInputChange}
                      placeholder="Enter a clear, descriptive title"
                      className={`w-full rounded-lg border ${
                        errors.title ? "border-red-500/50 bg-red-500/10" : "border-zinc-800 bg-zinc-950"
                      } px-4 py-2.5 text-white placeholder:text-zinc-500 focus:border-green-500/30 focus:outline-none focus:ring-1 focus:ring-green-500/30`}
                    />
                    {errors.title && <p className="mt-1 text-sm text-red-400">{errors.title}</p>}
                  </div>

                  <div>
                    <label htmlFor="summary" className="mb-2 block text-sm font-medium text-zinc-200">
                      Summary <span className="text-red-400">*</span>
                    </label>
                    <input
                      id="summary"
                      name="summary"
                      type="text"
                      value={formData.summary}
                      onChange={handleInputChange}
                      placeholder="Brief one-sentence summary of your proposal"
                      className={`w-full rounded-lg border ${
                        errors.summary ? "border-red-500/50 bg-red-500/10" : "border-zinc-800 bg-zinc-950"
                      } px-4 py-2.5 text-white placeholder:text-zinc-500 focus:border-green-500/30 focus:outline-none focus:ring-1 focus:ring-green-500/30`}
                    />
                    {errors.summary && <p className="mt-1 text-sm text-red-400">{errors.summary}</p>}
                  </div>

                  <div>
                    <label htmlFor="details" className="mb-2 block text-sm font-medium text-zinc-200">
                      Proposal Details <span className="text-red-400">*</span>
                    </label>
                    <textarea
                      id="details"
                      name="details"
                      value={formData.details}
                      onChange={handleInputChange}
                      placeholder="Provide a detailed explanation of your proposal, including its purpose, implementation details, and expected outcomes."
                      rows={6}
                      className={`w-full rounded-lg border ${
                        errors.details ? "border-red-500/50 bg-red-500/10" : "border-zinc-800 bg-zinc-950"
                      } px-4 py-2.5 text-white placeholder:text-zinc-500 focus:border-green-500/30 focus:outline-none focus:ring-1 focus:ring-green-500/30`}
                    />
                    {errors.details && <p className="mt-1 text-sm text-red-400">{errors.details}</p>}
                  </div>

                  <Separator className="bg-zinc-800" />

                  <div>
                    <div className="mb-4 flex items-center justify-between">
                      <label className="text-sm font-medium text-zinc-200">Voting Options</label>
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        onClick={addOption}
                        className="h-8 border-zinc-800 text-zinc-400 hover:border-green-500/20 hover:text-green-400"
                      >
                        <Plus className="mr-1 h-3.5 w-3.5" />
                        Add Option
                      </Button>
                    </div>

                    {errors.options && (
                      <div className="mb-3 rounded-lg border border-red-500/30 bg-red-500/10 p-3 text-sm text-red-400">
                        <div className="flex items-start">
                          <AlertCircle className="mr-2 h-4 w-4" />
                          <p>{errors.options}</p>
                        </div>
                      </div>
                    )}

                    <div className="space-y-3">
                      {formData.options.map((option) => (
                        <div key={option.id} className="rounded-lg border border-zinc-800 bg-zinc-950 p-4">
                          <div className="mb-3 flex items-center justify-between">
                            <div className="flex items-center">
                              {option.id === 1 && <CheckCircle className="mr-2 h-5 w-5 text-green-400" />}
                              {option.id === 2 && <XCircle className="mr-2 h-5 w-5 text-red-400" />}
                              {option.id > 2 && <HelpCircle className="mr-2 h-5 w-5 text-zinc-400" />}
                              <span className="font-medium">Option {option.id}</span>
                            </div>
                            <Button
                              type="button"
                              variant="ghost"
                              size="sm"
                              onClick={() => removeOption(option.id)}
                              className="h-7 w-7 rounded-full p-0 text-zinc-500 hover:bg-red-500/10 hover:text-red-400"
                            >
                              <Trash2 className="h-4 w-4" />
                              <span className="sr-only">Remove option</span>
                            </Button>
                          </div>
                          <div className="grid gap-3 sm:grid-cols-2">
                            <div>
                              <input
                                type="text"
                                value={option.label}
                                onChange={(e) => handleOptionChange(option.id, "label", e.target.value)}
                                placeholder="Option label"
                                className="w-full rounded-lg border border-zinc-800 bg-zinc-900 px-3 py-1.5 text-white placeholder:text-zinc-500 focus:border-green-500/30 focus:outline-none focus:ring-1 focus:ring-green-500/30"
                              />
                            </div>
                            <div>
                              <input
                                type="text"
                                value={option.description}
                                onChange={(e) => handleOptionChange(option.id, "description", e.target.value)}
                                placeholder="Option description (optional)"
                                className="w-full rounded-lg border border-zinc-800 bg-zinc-900 px-3 py-1.5 text-white placeholder:text-zinc-500 focus:border-green-500/30 focus:outline-none focus:ring-1 focus:ring-green-500/30"
                              />
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <Separator className="bg-zinc-800" />

                  <div>
                    <label htmlFor="duration" className="mb-2 block text-sm font-medium text-zinc-200">
                      Voting Duration
                    </label>
                    <div className="flex items-center">
                      <select
                        id="duration"
                        name="duration"
                        value={formData.duration}
                        onChange={handleInputChange}
                        className="rounded-lg border border-zinc-800 bg-zinc-950 px-3 py-2 text-white focus:border-green-500/30 focus:outline-none focus:ring-1 focus:ring-green-500/30"
                      >
                        <option value="3">3 days</option>
                        <option value="5">5 days</option>
                        <option value="7">7 days</option>
                        <option value="14">14 days</option>
                      </select>
                      <Calendar className="ml-2 h-5 w-5 text-zinc-500" />
                    </div>
                  </div>

                  <div className="flex justify-end space-x-3 pt-4">
                    <Button
                      type="button"
                      variant="outline"
                      className="border-zinc-800 text-zinc-400 hover:border-green-500/20 hover:text-green-400"
                      onClick={togglePreview}
                    >
                      Preview
                    </Button>
                    <Button type="submit" className="bg-green-500 text-black hover:bg-green-600">
                      Submit Proposal
                    </Button>
                  </div>
                </form>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          <Card className="border-zinc-800 bg-zinc-900/50">
            <CardContent className="p-6">
              <h3 className="mb-3 text-lg font-medium text-green-400">Proposal Guidelines</h3>
              <ul className="space-y-3 text-sm text-zinc-400">
                <li className="flex items-start">
                  <span className="mr-2 mt-0.5 flex h-5 w-5 items-center justify-center rounded-full bg-green-500/10 text-green-400">
                    1
                  </span>
                  <span>Be clear and specific about what you're proposing</span>
                </li>
                <li className="flex items-start">
                  <span className="mr-2 mt-0.5 flex h-5 w-5 items-center justify-center rounded-full bg-green-500/10 text-green-400">
                    2
                  </span>
                  <span>Include implementation details and resource requirements</span>
                </li>
                <li className="flex items-start">
                  <span className="mr-2 mt-0.5 flex h-5 w-5 items-center justify-center rounded-full bg-green-500/10 text-green-400">
                    3
                  </span>
                  <span>Consider potential impacts on the community</span>
                </li>
                <li className="flex items-start">
                  <span className="mr-2 mt-0.5 flex h-5 w-5 items-center justify-center rounded-full bg-green-500/10 text-green-400">
                    4
                  </span>
                  <span>Be respectful and constructive in your proposal</span>
                </li>
              </ul>
            </CardContent>
          </Card>

          <Card className="border-zinc-800 bg-zinc-900/50">
            <CardContent className="p-6">
              <h3 className="mb-3 text-lg font-medium text-green-400">Voting Process</h3>
              <p className="mb-4 text-sm text-zinc-400">
                After submission, your proposal will be reviewed by moderators before being published for voting.
              </p>
              <div className="space-y-3 text-sm">
                <div className="flex items-center justify-between">
                  <span className="text-zinc-400">Review Period:</span>
                  <span className="font-medium text-zinc-300">24-48 hours</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-zinc-400">Quorum Required:</span>
                  <span className="font-medium text-zinc-300">10% of token holders</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-zinc-400">Passing Threshold:</span>
                  <span className="font-medium text-zinc-300">Simple majority</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
