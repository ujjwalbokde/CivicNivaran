"use client"
import { useState, useEffect } from "react"
import Link from "next/link"
import { MapPin, Clock, CheckCircle, Camera, AlertCircle } from "lucide-react"
import { useRouter } from "next/navigation"
import Navbar from "@/components/Navbar"
import ProtectedRoute from "@/components/ProtectedRoute"
import toast from "react-hot-toast"

export default function FieldWorkerPanel() {
  const [selectedComplaint, setSelectedComplaint] = useState(null)
  const [showModal, setShowModal] = useState(false)
  const router = useRouter()
  const [user, setUser] = useState(null)
  const token = typeof window !== 'undefined' ? localStorage.getItem("token") : null
  const [assignedComplaints, setAssignedComplaints] = useState([])

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await fetch("https://civicnivaran.onrender.com/api/auth/profile", {
          headers: { Authorization: `Bearer ${token}` }
        })
        if (!response.ok) throw new Error("Failed to fetch user")
        const data = await response.json()
        setUser(data)
        if (!data.department) router.push("/profile")
      } catch (error) {
        console.error("Error fetching user:", error)
      }
    }
    fetchUser()
  }, [token])

  useEffect(() => {
    const fetchAssignedComplaints = async () => {
      try {
        const response = await fetch(`https://civicnivaran.onrender.com/api/complaints/user/${user?._id}`, {
          headers: { Authorization: `Bearer ${token}` }
        })
        if (!response.ok) throw new Error("Failed to fetch complaints")
        const data = await response.json()
        setAssignedComplaints(data)
      } catch (error) {
        console.error("Error fetching assigned complaints:", error)
      }
    }
    if (user?._id) fetchAssignedComplaints()
  }, [user, token])

  const getPriorityColor = (priority) => {
    switch (priority) {
      case "high": return "bg-red-100 text-red-800 border-red-200"
      case "medium": return "bg-yellow-100 text-yellow-800 border-yellow-200"
      case "low": return "bg-green-100 text-green-800 border-green-200"
      default: return "bg-gray-100 text-gray-800 border-gray-200"
    }
  }

  const getStatusColor = (status) => {
    switch (status) {
      case "Assigned": return "bg-blue-100 text-blue-800"
      case "In Progress": return "bg-orange-100 text-orange-800"
      case "Resolved": return "bg-green-100 text-green-800"
      default: return "bg-gray-100 text-gray-800"
    }
  }

  const submitResolution = (complaintId) => {
    fetch(`https://civicnivaran.onrender.com/api/complaints/resolve/${complaintId}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify({
        status: "Resolved",
        resolutionRemarks: "Issue resolved successfully"
      })
    })
      .then(res => {
        if (!res.ok) throw new Error("Failed to resolve complaint")
        return res.json()
      })
      .then(() => {
        toast.success("Complaint resolved successfully!")
        setShowModal(false)
        setSelectedComplaint(null)
      })
      .catch(err => {
        console.error("Resolve error:", err)
        toast.error("Failed to resolve complaint.")
      })
  }

  return (
    <ProtectedRoute allowedRoles={["worker"]}>
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <main className="max-w-6xl mx-auto p-4 md:p-6 lg:p-8">
          <header className="mb-8">
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900">Assigned Complaints</h1>
            <p className="text-gray-600 mt-2 text-sm md:text-base">Manage and resolve complaints assigned to you</p>
          </header>

          <section className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-10">
            <StatCard icon={<AlertCircle className="w-6 h-6 text-blue-600" />} label="Total Assigned" value={user?.assignedComplaints.length} bg="bg-blue-100" />
            <StatCard icon={<Clock className="w-6 h-6 text-orange-600" />} label="Pending" value={user ? user.assignedComplaints.length - user.resolvedComplaints : 0} bg="bg-orange-100" />
            <StatCard icon={<CheckCircle className="w-6 h-6 text-green-600" />} label="Resolved" value={user?.resolvedComplaints} bg="bg-green-100" />
          </section>

          <section className="space-y-6">
            {assignedComplaints.map((c) => (
              <div key={c.complaintId} className="bg-white shadow rounded-lg p-4 md:p-6 flex flex-col gap-4">
                <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-4">
                  <div className="flex-1">
                    <div className="flex flex-wrap justify-between items-center gap-2 mb-2">
                      <h2 className="text-xl font-semibold text-gray-800">{c.title}</h2>
                      <div className="flex gap-2 flex-wrap">
                        <span className={`px-3 py-1 rounded-full text-xs font-semibold border ${getPriorityColor(c.urgency)}`}>{c.urgency} Priority</span>
                        <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor(c.status)}`}>{c.status}</span>
                      </div>
                    </div>
                    <p className="text-sm text-gray-600 mb-4">{c.description}</p>
                    <div className="grid sm:grid-cols-2 gap-3 text-sm text-gray-600">
                      <div className="flex items-center gap-2"><MapPin className="w-4 h-4" />{c.address}</div>
                      <div className="flex items-center gap-2"><Clock className="w-4 h-4" />Assigned: {c.createdAt}</div>
                    </div>
                    <div className="mt-3 text-sm text-gray-600 bg-gray-50 p-3 rounded">Contact: {c.phone}</div>
                  </div>
                  {c.status === "In Progress" && (
                    <button
                      onClick={() => {
                        setSelectedComplaint(c)
                        setShowModal(true)
                      }}
                      className="w-full md:w-auto px-5 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition"
                    >
                      <CheckCircle className="inline w-4 h-4 mr-1" /> Mark Resolved
                    </button>
                  )}
                </div>
              </div>
            ))}
          </section>
        </main>

        {showModal && selectedComplaint && (
          <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center px-4">
            <div className="bg-white w-full max-w-lg rounded-lg overflow-y-auto max-h-[90vh] p-6">
              <h3 className="text-lg font-semibold mb-2">Mark as Resolved</h3>
              <p className="text-sm text-gray-700 mb-2">Complaint: {selectedComplaint.title}</p>
              <p className="text-sm text-gray-700 mb-4">Description: {selectedComplaint.description}</p>
              <p className="text-sm text-gray-700 mb-6">Address: {selectedComplaint.address}</p>
              <div className="flex gap-4">
                <button
                  onClick={() => submitResolution(selectedComplaint.complaintId)}
                  className="w-full py-2 bg-green-600 text-white rounded hover:bg-green-700"
                >Submit</button>
                <button
                  onClick={() => {
                    setShowModal(false)
                    setSelectedComplaint(null)
                  }}
                  className="w-full py-2 bg-gray-500 text-white rounded hover:bg-gray-600"
                >Cancel</button>
              </div>
            </div>
          </div>
        )}
      </div>
    </ProtectedRoute>
  )
}

function StatCard({ icon, label, value = 0, bg }) {
  return (
    <div className={`p-4 md:p-6 rounded-lg shadow ${bg} flex items-center gap-4`}>
      <div className="p-3 rounded-full bg-white shadow-inner">
        {icon}
      </div>
      <div>
        <p className="text-sm text-gray-600">{label}</p>
        <p className="text-xl font-bold text-gray-900">{value}</p>
      </div>
    </div>
  )
}
