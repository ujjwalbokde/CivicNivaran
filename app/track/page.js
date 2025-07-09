"use client"
import { useState } from "react"
import Link from "next/link"
import {
  Search,
  CheckCircle,
  Clock,
  AlertCircle,
  User,
  MapPin,
  Shield,
  ArrowLeft,
  Phone,
  Mail,
  FileText,
  Star,
  MessageSquare,
  Download,
} from "lucide-react"

export default function TrackComplaint() {
  const [searchQuery, setSearchQuery] = useState("")
  const [complaint, setComplaint] = useState(null)
  const [loading, setLoading] = useState(false)
  const [searchType, setSearchType] = useState("id")

  // Mock complaint data
  const mockComplaint = {
    id: "CN123456789",
    title: "Broken Street Light on Main Road",
    description:
      "The street light near the bus stop has been broken for over a week, causing safety concerns for pedestrians during night hours.",
    department: "Electricity",
    location: "Main Road, Sector 15, Near Bus Stop",
    submittedDate: "2024-01-15",
    status: "In Progress",
    assignedOfficer: "John Smith",
    officerPhone: "+91 9876543210",
    officerEmail: "john.smith@electricity.gov",
    estimatedResolution: "2024-01-20",
    priority: "Medium",
    citizenName: "Priya Sharma",
    citizenPhone: "+91 9876543211",
    timeline: [
      {
        status: "Submitted",
        date: "2024-01-15 10:30 AM",
        completed: true,
        description: "Complaint submitted by citizen with photo evidence",
        icon: FileText,
      },
      {
        status: "Verified",
        date: "2024-01-16 02:15 PM",
        completed: true,
        description: "Complaint verified by department and marked as valid",
        icon: CheckCircle,
      },
      {
        status: "Assigned",
        date: "2024-01-17 09:00 AM",
        completed: true,
        description: "Assigned to field officer John Smith for resolution",
        icon: User,
      },
      {
        status: "In Progress",
        date: "2024-01-18 11:45 AM",
        completed: true,
        description: "Field inspection completed, repair work has begun",
        icon: Clock,
      },
      {
        status: "Resolved",
        date: "",
        completed: false,
        description: "Issue resolution and final verification pending",
        icon: CheckCircle,
      },
    ],
    updates: [
      {
        date: "2024-01-18 11:45 AM",
        message: "Field inspection completed. Repair materials ordered.",
        type: "progress",
      },
      {
        date: "2024-01-17 09:00 AM",
        message: "Complaint assigned to John Smith (Field Officer)",
        type: "assignment",
      },
    ],
  }

  const handleSearch = (e) => {
    e.preventDefault()
    if (!searchQuery.trim()) return

    setLoading(true)
    // Simulate API call
    setTimeout(() => {
      setComplaint(mockComplaint)
      setLoading(false)
    }, 1000)
  }

  const getStatusColor = (status) => {
    switch (status) {
      case "Submitted":
        return "bg-blue-100 text-blue-800 border-blue-200"
      case "Verified":
        return "bg-yellow-100 text-yellow-800 border-yellow-200"
      case "Assigned":
        return "bg-purple-100 text-purple-800 border-purple-200"
      case "In Progress":
        return "bg-orange-100 text-orange-800 border-orange-200"
      case "Resolved":
        return "bg-green-100 text-green-800 border-green-200"
      default:
        return "bg-gray-100 text-gray-800 border-gray-200"
    }
  }

  const getPriorityColor = (priority) => {
    switch (priority) {
      case "High":
        return "bg-red-100 text-red-800 border-red-200"
      case "Medium":
        return "bg-yellow-100 text-yellow-800 border-yellow-200"
      case "Low":
        return "bg-green-100 text-green-800 border-green-200"
      default:
        return "bg-gray-100 text-gray-800 border-gray-200"
    }
  }

  const getProgressPercentage = () => {
    const completedSteps = complaint?.timeline.filter((step) => step.completed).length || 0
    const totalSteps = complaint?.timeline.length || 1
    return (completedSteps / totalSteps) * 100
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50">
      {/* Navigation */}
      <nav className="bg-white shadow-lg sticky top-0 z-40 border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center mr-3">
                <Shield className="w-6 h-6 text-white" />
              </div>
              <Link href="/" className="text-2xl font-bold text-blue-600">
                CivicNivaran
              </Link>
            </div>
            <div className="flex items-center space-x-6">
              <Link href="/" className="text-gray-700 hover:text-blue-600 transition-colors flex items-center">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Home
              </Link>
              <Link
                href="/submit"
                className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
              >
                Submit Complaint
              </Link>
            </div>
          </div>
        </div>
      </nav>

      <div className="max-w-6xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center bg-blue-100 text-blue-800 px-4 py-2 rounded-full text-sm font-medium mb-4">
            <Search className="w-4 h-4 mr-2" />
            Track Complaint Status
          </div>
          <h1 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">Track Your Complaint</h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Enter your complaint ID or phone number to check the current status and progress of your complaint.
          </p>
        </div>

        <div className="bg-white rounded-2xl shadow-xl p-8 border mb-8">
          {/* Search Form */}
          <form onSubmit={handleSearch} className="mb-8">
            <div className="max-w-2xl mx-auto">
              {/* Search Type Selection */}
              <div className="flex justify-center mb-6">
                <div className="bg-gray-100 p-1 rounded-xl">
                  <button
                    type="button"
                    onClick={() => setSearchType("id")}
                    className={`px-6 py-2 rounded-lg text-sm font-medium transition-all ${
                      searchType === "id" ? "bg-white text-blue-600 shadow-sm" : "text-gray-600 hover:text-gray-800"
                    }`}
                  >
                    Complaint ID
                  </button>
                  <button
                    type="button"
                    onClick={() => setSearchType("phone")}
                    className={`px-6 py-2 rounded-lg text-sm font-medium transition-all ${
                      searchType === "phone" ? "bg-white text-blue-600 shadow-sm" : "text-gray-600 hover:text-gray-800"
                    }`}
                  >
                    Phone Number
                  </button>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="flex-1 relative">
                  <Search className="w-5 h-5 absolute left-4 top-4 text-gray-400" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder={
                      searchType === "id"
                        ? "Enter Complaint ID (e.g., CN123456789)"
                        : "Enter Phone Number (e.g., +91 9876543210)"
                    }
                    className="w-full pl-12 pr-4 py-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all text-lg"
                  />
                </div>
                <button
                  type="submit"
                  disabled={loading}
                  className={`px-8 py-4 rounded-xl font-semibold transition-all flex items-center ${
                    loading
                      ? "bg-gray-400 text-white cursor-not-allowed"
                      : "bg-blue-600 text-white hover:bg-blue-700 hover:scale-105 active:scale-95"
                  }`}
                >
                  {loading ? (
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                  ) : (
                    <Search className="w-5 h-5 mr-2" />
                  )}
                  {loading ? "Searching..." : "Search"}
                </button>
              </div>
            </div>
          </form>

          {/* Quick Access */}
          <div className="text-center">
            <p className="text-sm text-gray-500 mb-4">Don't have your complaint ID?</p>
            <div className="flex flex-wrap justify-center gap-3">
              <button
                onClick={() => setSearchQuery("CN123456789")}
                className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors text-sm"
              >
                Try Demo: CN123456789
              </button>
              <Link
                href="/submit"
                className="px-4 py-2 bg-blue-100 text-blue-700 rounded-lg hover:bg-blue-200 transition-colors text-sm"
              >
                Submit New Complaint
              </Link>
            </div>
          </div>
        </div>

        {/* Complaint Details */}
        {complaint && (
          <div className="space-y-8">
            {/* Header Card */}
            <div className="bg-white rounded-2xl shadow-xl p-8 border">
              <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-6">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-4">
                    <h2 className="text-2xl lg:text-3xl font-bold text-gray-900">{complaint.title}</h2>
                  </div>
                  <p className="text-gray-600 mb-4 text-lg">{complaint.description}</p>
                  <div className="flex items-center gap-2 text-sm text-gray-500">
                    <span className="font-mono bg-gray-100 px-3 py-1 rounded-lg">ID: {complaint.id}</span>
                    <span>•</span>
                    <span>Submitted on {complaint.submittedDate}</span>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row lg:flex-col gap-3">
                  <span
                    className={`px-4 py-2 rounded-xl text-sm font-medium border ${getStatusColor(complaint.status)}`}
                  >
                    {complaint.status}
                  </span>
                  <span
                    className={`px-4 py-2 rounded-xl text-sm font-medium border ${getPriorityColor(complaint.priority)}`}
                  >
                    {complaint.priority} Priority
                  </span>
                </div>
              </div>

              {/* Progress Bar */}
              <div className="mt-8">
                <div className="flex justify-between text-sm text-gray-600 mb-2">
                  <span>Overall Progress</span>
                  <span>{Math.round(getProgressPercentage())}% Complete</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-3">
                  <div
                    className="bg-gradient-to-r from-blue-500 to-green-500 h-3 rounded-full transition-all duration-500"
                    style={{ width: `${getProgressPercentage()}%` }}
                  ></div>
                </div>
              </div>
            </div>

            <div className="grid lg:grid-cols-3 gap-8">
              {/* Timeline */}
              <div className="lg:col-span-2">
                <div className="bg-white rounded-2xl shadow-xl p-8 border">
                  <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center">
                    <Clock className="w-6 h-6 mr-3 text-blue-600" />
                    Progress Timeline
                  </h3>

                  <div className="space-y-6">
                    {complaint.timeline.map((step, index) => {
                      const IconComponent = step.icon
                      return (
                        <div key={index} className="flex items-start gap-4">
                          <div
                            className={`w-12 h-12 rounded-full flex items-center justify-center border-2 ${
                              step.completed ? "bg-green-100 border-green-500" : "bg-gray-100 border-gray-300"
                            }`}
                          >
                            <IconComponent
                              className={`w-6 h-6 ${step.completed ? "text-green-600" : "text-gray-400"}`}
                            />
                          </div>

                          <div className="flex-1 pb-6">
                            <div className="flex items-center gap-3 mb-2">
                              <h4 className={`font-semibold ${step.completed ? "text-gray-900" : "text-gray-500"}`}>
                                {step.status}
                              </h4>
                              {step.date && (
                                <span className="text-sm text-gray-500 bg-gray-100 px-2 py-1 rounded">{step.date}</span>
                              )}
                            </div>
                            <p className="text-gray-600 text-sm leading-relaxed">{step.description}</p>
                          </div>
                        </div>
                      )
                    })}
                  </div>
                </div>

                {/* Recent Updates */}
                <div className="bg-white rounded-2xl shadow-xl p-8 border mt-8">
                  <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center">
                    <MessageSquare className="w-6 h-6 mr-3 text-blue-600" />
                    Recent Updates
                  </h3>

                  <div className="space-y-4">
                    {complaint.updates.map((update, index) => (
                      <div key={index} className="border-l-4 border-blue-500 pl-4 py-2">
                        <p className="text-gray-800 font-medium">{update.message}</p>
                        <p className="text-sm text-gray-500 mt-1">{update.date}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Sidebar */}
              <div className="space-y-6">
                {/* Contact Information */}
                <div className="bg-white rounded-2xl shadow-xl p-6 border">
                  <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center">
                    <User className="w-5 h-5 mr-2 text-blue-600" />
                    Assigned Officer
                  </h3>

                  <div className="space-y-4">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                        <User className="w-6 h-6 text-blue-600" />
                      </div>
                      <div>
                        <p className="font-semibold text-gray-900">{complaint.assignedOfficer}</p>
                        <p className="text-sm text-gray-600">{complaint.department} Department</p>
                      </div>
                    </div>

                    <div className="space-y-3 pt-4 border-t">
                      <div className="flex items-center gap-3 text-sm">
                        <Phone className="w-4 h-4 text-gray-400" />
                        <span className="text-gray-600">{complaint.officerPhone}</span>
                      </div>
                      <div className="flex items-center gap-3 text-sm">
                        <Mail className="w-4 h-4 text-gray-400" />
                        <span className="text-gray-600">{complaint.officerEmail}</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Complaint Details */}
                <div className="bg-white rounded-2xl shadow-xl p-6 border">
                  <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center">
                    <FileText className="w-5 h-5 mr-2 text-blue-600" />
                    Complaint Details
                  </h3>

                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">Department</span>
                      <span className="font-medium">{complaint.department}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">Priority</span>
                      <span className={`px-2 py-1 rounded text-xs font-medium ${getPriorityColor(complaint.priority)}`}>
                        {complaint.priority}
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">Expected Resolution</span>
                      <span className="font-medium">{complaint.estimatedResolution}</span>
                    </div>
                    <div className="pt-4 border-t">
                      <div className="flex items-start gap-2">
                        <MapPin className="w-4 h-4 text-gray-400 mt-1" />
                        <span className="text-sm text-gray-600">{complaint.location}</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Actions */}
                <div className="bg-white rounded-2xl shadow-xl p-6 border">
                  <h3 className="text-lg font-bold text-gray-900 mb-4">Actions</h3>

                  <div className="space-y-3">
                    <button className="w-full bg-blue-600 text-white py-3 px-4 rounded-xl hover:bg-blue-700 transition-colors flex items-center justify-center">
                      <Download className="w-4 h-4 mr-2" />
                      Download Report
                    </button>

                    {complaint.status === "Resolved" && (
                      <Link
                        href="/feedback"
                        className="block w-full bg-green-600 text-white py-3 px-4 rounded-xl hover:bg-green-700 transition-colors text-center"
                      >
                        <Star className="w-4 h-4 inline mr-2" />
                        Rate & Review
                      </Link>
                    )}

                    <button className="w-full border border-gray-300 text-gray-700 py-3 px-4 rounded-xl hover:bg-gray-50 transition-colors flex items-center justify-center">
                      <MessageSquare className="w-4 h-4 mr-2" />
                      Contact Officer
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* No Results */}
        {!complaint && !loading && searchQuery && (
          <div className="bg-white rounded-2xl shadow-xl p-12 border text-center">
            <AlertCircle className="w-16 h-16 text-gray-400 mx-auto mb-6" />
            <h3 className="text-2xl font-bold text-gray-900 mb-4">No Complaint Found</h3>
            <p className="text-gray-600 mb-8 max-w-md mx-auto">
              We couldn't find a complaint with the provided {searchType === "id" ? "ID" : "phone number"}. Please check
              your information and try again.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={() => setSearchQuery("")}
                className="px-6 py-3 border border-gray-300 text-gray-700 rounded-xl hover:bg-gray-50 transition-colors"
              >
                Try Again
              </button>
              <Link
                href="/submit"
                className="px-6 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-colors"
              >
                Submit New Complaint
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
