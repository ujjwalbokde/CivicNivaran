"use client"
import { useState,useEffect } from "react"
import Link from "next/link"
import { MapPin, Clock, CheckCircle, Camera, MessageSquare, AlertCircle } from "lucide-react"
import { useRouter } from "next/navigation"
import Navbar from "@/components/Navbar"
import ProtectedRoute from "@/components/ProtectedRoute"
import toast from "react-hot-toast"
export default function FieldWorkerPanel() {
  const [selectedComplaint, setSelectedComplaint] = useState(null)
  const [showModal, setShowModal] = useState(false)
  const router = useRouter()
  const [user, setUser] = useState(null)
  const token = localStorage.getItem('token')

  // Fetch user data
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await fetch("https://civicnivaran.onrender.com/api/auth/profile", {
          headers: {
            Authorization: `Bearer ${token}`
          }
        })
        if (!response.ok) throw new Error("Failed to fetch user")
        const data = await response.json()
        setUser(data)
        if(!data.department) {
          router.push("/profile") // Redirect if not a field worker
        }
      } catch (error) {
        console.error("Error fetching user:", error)
      }
    }
    fetchUser()
  }, [token])
  
  const [assignedComplaints, setAssignedComplaints] = useState([]);

  //http://localhost:5000/api/complaints/user/:id
  useEffect(() => {
    const fetchAssignedComplaints = async () => {
      try {
        const response = await fetch(`https://civicnivaran.onrender.com/api/complaints/user/${user?._id}`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        if (!response.ok) throw new Error("Failed to fetch complaints");
        const data = await response.json();
        setAssignedComplaints(data);
      } catch (error) {
        console.error("Error fetching assigned complaints:", error);
      }
    };
    if (user?._id) {
      fetchAssignedComplaints();
    }
  }, [user, token]);
 

  const getPriorityColor = (priority) => {
    switch (priority) {
      case "high":
        return "bg-red-100 text-red-800 border-red-200"
      case "medium":
        return "bg-yellow-100 text-yellow-800 border-yellow-200"
      case "low":
        return "bg-green-100 text-green-800 border-green-200"
      default:
        return "bg-gray-100 text-gray-800 border-gray-200"
    }
  }

  const getStatusColor = (status) => {
    switch (status) {
      case "Assigned":
        return "bg-blue-100 text-blue-800"
      case "In Progress":
        return "bg-orange-100 text-orange-800"
      case "Resolved":
        return "bg-green-100 text-green-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const updateStatus = (complaintId, newStatus) => {
    // In real app, this would update the backend
    console.log(`Updating complaint ${complaintId} to ${newStatus}`)
  }


  const submitResolution = (complaintId) => {
    // In real app, this would submit to backend
    console.log("Submitting resolution:", complaintId)
    //http://localhost:5000/api/complaints/resolve/:id
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
      .then(response => {
        if (!response.ok) throw new Error("Failed to resolve complaint");

        return response.json();
      })
      .then(data => {
        console.log("Complaint resolved:", data);
        setShowModal(false)
        setSelectedComplaint(null)
        toast.success("Complaint resolved successfully!");
        // Optionally, refresh the complaints list
      })
      .catch(error => {
        toast.error("Failed to resolve complaint. Please try again.");
        console.error("Error resolving complaint:", error);
      });
  }

  return (
    <ProtectedRoute allowedRoles={["worker"]}>
    <div className="min-h-screen bg-gray-50">
      {/* Navigation */}
      <Navbar/>

      <div className="max-w-6xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Assigned Complaints</h1>
          <p className="text-gray-600 mt-2">Manage and resolve complaints assigned to you</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white p-6 rounded-lg shadow">
            <div className="flex items-center">
              <div className="bg-blue-100 p-3 rounded-full">
                <AlertCircle className="w-6 h-6 text-blue-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm text-gray-600">Total Assigned</p>
                <p className="text-2xl font-bold text-gray-900">{user && user.assignedComplaints.length}</p>
              </div>
            </div>
          </div>
          <div className="bg-white p-6 rounded-lg shadow">
            <div className="flex items-center">
              <div className="bg-orange-100 p-3 rounded-full">
                <Clock className="w-6 h-6 text-orange-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm text-gray-600">Pending</p>
                <p className="text-2xl font-bold text-gray-900">
                  {user && (user.assignedComplaints.length - user.resolvedComplaints)}
                </p>
              </div>
            </div>
          </div>
          <div className="bg-white p-6 rounded-lg shadow">
            <div className="flex items-center">
              <div className="bg-green-100 p-3 rounded-full">
                <CheckCircle className="w-6 h-6 text-green-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm text-gray-600">Resolved</p>
                <p className="text-2xl font-bold text-gray-900">{user && user.resolvedComplaints}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Complaints Grid */}
        <div className="grid gap-6">
          {assignedComplaints.map((complaint) => (
            <div key={complaint.complaintId} className="bg-white rounded-lg shadow-lg overflow-hidden">
              <div className="p-6">
                <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-4">
                  {/* Main Content */}
                  <div className="flex-1">
                    <div className="flex items-start justify-between mb-3">
                      <h3 className="text-xl font-semibold text-gray-900">{complaint.title}</h3>
                      <div className="flex gap-2">
                        <span
                          className={`px-3 py-1 rounded-full text-sm font-medium border ${getPriorityColor(complaint.urgency)}`}
                        >
                          {complaint.urgency} Priority
                        </span>
                        <span
                          className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(complaint.status)}`}
                        >
                          {complaint.status}
                        </span>
                      </div>
                    </div>

                    <p className="text-gray-600 mb-4">{complaint.description}</p>

                    <div className="grid md:grid-cols-2 gap-4 mb-4">
                      <div className="flex items-center gap-2 text-gray-600">
                        <MapPin className="w-4 h-4" />
                        <span className="text-sm">{complaint.address}</span>
                      </div>
                      <div className="flex items-center gap-2 text-gray-600">
                        <Clock className="w-4 h-4" />
                        <span className="text-sm">Assigned: {complaint.createdAt}</span>
                      </div>
                    </div>

                

                    <div className="bg-gray-50 rounded-lg p-3">
                      <p className="text-sm text-gray-600">
                        <strong>Contact:</strong> {complaint.phone}
                      </p>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex flex-col gap-3 lg:ml-6">
                    
                    {complaint.status === "In Progress" && (
                      <button
                        onClick={() => {
                          setSelectedComplaint(complaint)
                          setShowModal(true)
                        }}
                        className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 transition-colors flex items-center gap-2"
                      >
                        <CheckCircle className="w-4 h-4" />
                        Mark Resolved
                      </button>
                    )}

                   
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Resolution Modal */}
      {showModal && selectedComplaint && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <h3 className="text-xl font-semibold mb-4">Mark as Resolved</h3>
              <p className="text-gray-600 mb-6">Complaint: {selectedComplaint.title}</p>
              <p className="text-gray-600 mb-4">
                <strong>Description:</strong> {selectedComplaint.description}
              </p>
              <p className="text-gray-600 mb-4">
                <strong>Address:</strong> {selectedComplaint.address}
              </p>

              {/* <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Resolution Remarks *</label>
                  <textarea
                    value={resolution.remarks}
                    onChange={(e) => setResolution({ ...resolution, remarks: e.target.value })}
                    rows={4}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Describe how the issue was resolved..."
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Upload Resolution Proof (Photos/Videos)
                  </label>
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                    <input
                      type="file"
                      multiple
                      accept="image/*,video/*"
                      onChange={handleFileUpload}
                      className="hidden"
                      id="resolution-upload"
                    />
                    <label htmlFor="resolution-upload" className="cursor-pointer">
                      <Camera className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                      <p className="text-gray-600">Upload before/after photos</p>
                    </label>
                  </div>

                  {resolution.files.length > 0 && (
                    <div className="mt-4">
                      <p className="text-sm text-gray-600 mb-2">Selected files:</p>
                      <div className="space-y-2">
                        {resolution.files.map((file, index) => (
                          <div key={index} className="flex items-center gap-2 text-sm text-gray-600">
                            <Camera className="w-4 h-4" />
                            <span>{file.name}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div> */}

              <div className="flex gap-4 mt-8">
                <button
                  onClick={() => submitResolution(selectedComplaint.complaintId)}
                  className={`flex-1 py-3 px-6 rounded-lg font-semibold transition-colors bg-green-600 text-white hover:bg-green-700`}
                >
                  Submit Resolution
                </button>
                <button
                  onClick={() => {
                    setShowModal(false)
                    setSelectedComplaint(null)
                  }}
                  className="flex-1 py-3 px-6 rounded-lg font-semibold bg-gray-600 text-white hover:bg-gray-700 transition-colors"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
    </ProtectedRoute>
  )
}
