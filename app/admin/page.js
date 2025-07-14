"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import ProtectedRoute from "@/components/ProtectedRoute";
import toast from 'react-hot-toast';
import {
  BarChart3,
  Users,
  FileText,
  Search,
  Eye,
  Edit,
  CheckCircle,
  Clock,
  AlertTriangle,
  MapPin,
  Calendar,
  UserPlus,
} from "lucide-react";
import Navbar from "@/components/Navbar";

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState("dashboard");
  const [filterStatus, setFilterStatus] = useState("all");
  const [filterDepartment, setFilterDepartment] = useState("all");
  const [stats, setStats] = useState();
  const [selectedComplaint, setSelectedComplaint] = useState(null);
  const [workerEmail, setWorkerEmail] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [selectedWorkerId, setSelectedWorkerId] = useState("");
  const [selectedWorkerName, setSelectedWorkerName] = useState("");

  const handleAssignClick = (complaint) => {
    setSelectedComplaint(complaint);
    setWorkerEmail(""); // clear input
    setShowModal(true);
  };

  const handleAssignWorker = async () => {
    if (!selectedWorkerId || !selectedComplaint) return;

    try {
      const res = await fetch(
        `https://civicnivaran.onrender.com/api/complaints/assign/${selectedComplaint._id}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            assignedTo: {
              workerId: selectedWorkerId,
              name: selectedWorkerName,
            },
          }),
        }
      );

      if (res.ok) {
        // Optional: update UI or refetch complaints
        console.log("Worker assigned successfully!");
        toast.success("Worker assigned successfully!");
        setShowModal(false);
      } else {
        console.error("Failed to assign worker");
        toast.error("Failed to assign worker.");
      }
    } catch (error) {
      console.error("Error assigning worker:", error);
    }
  };

  //http://localhost:5000/api/complaints/stats
  useEffect(() => {
    // Fetch stats from API
    const fetchStats = async () => {
      try {
        const response = await fetch(
            "http://localhost:5000/api/complaints/stats"
          );
        if (!response.ok) throw new Error("Failed to fetch stats");
        const data = await response.json();
        setStats(data);
      } catch (error) {
        console.error("Error fetching stats:", error);
      }
    };
    fetchStats();
  }, []);

  const [workers, setWorkers] = useState([]);
  //http://localhost:5000/api/auth/workers
  useEffect(() => {
    // Fetch workers from API
    const fetchWorkers = async () => {
      try {
        const response = await fetch("https://civicnivaran.onrender.com/api/auth/workers");
        if (!response.ok) return;
        const data = await response.json();
        setWorkers(data);
      } catch (error) {
        console.error("Error fetching workers:", error);
      }
    };
    fetchWorkers();
  }, []);

  const [complaints, setComplaints] = useState([]);
  //http://localhost:5000/api/complaints/all
  useEffect(() => {
    // Fetch complaints from API
    const fetchComplaints = async () => {
      try {
        const response = await fetch(
          "https://civicnivaran.onrender.com/api/complaints/all"
        );
        if (!response.ok) throw new Error("Failed to fetch complaints");
        const data = await response.json();
        setComplaints(data);
      } catch (error) {
        console.error("Error fetching complaints:", error);
      }
    };
    fetchComplaints();
  }, []);

  const getStatusColor = (status) => {
    switch (status) {
      case "Pending":
        return "bg-yellow-100 text-yellow-800";
      case "In Progress":
        return "bg-blue-100 text-blue-800";
      case "Resolved":
        return "bg-green-100 text-green-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getUrgencyColor = (urgency) => {
    switch (urgency) {
      case "high":
        return "bg-red-100 text-red-800";
      case "medium":
        return "bg-yellow-100 text-yellow-800";
      case "low":
        return "bg-green-100 text-green-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const filteredComplaints = complaints.filter((complaint) => {
    const statusMatch =
      filterStatus === "all" || complaint.status === filterStatus;
    const deptMatch =
      filterDepartment === "all" || complaint.department === filterDepartment;
    return statusMatch && deptMatch;
  });
  const [viewComplaint, setViewComplaint] = useState(null);
  const handleViewClick = (complaint) => {
    setViewComplaint(complaint);
    console.log(complaint);
  };

  return (
    <ProtectedRoute allowedRoles={["officer"]}>
      <div className="min-h-screen bg-gray-50">
        {/* Navigation */}
        <Navbar />

      <div className="flex">
        {/* Sidebar */}
        <div className="w-64 bg-white shadow-lg min-h-screen">
          <div className="p-4">
            <nav className="space-y-2">
              <button
                onClick={() => setActiveTab("dashboard")}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-left transition-colors ${
                  activeTab === "dashboard"
                    ? "bg-blue-100 text-blue-700"
                    : "text-gray-700 hover:bg-gray-100"
                }`}
              >
                <BarChart3 className="w-5 h-5" />
                Dashboard
              </button>
              <button
                onClick={() => setActiveTab("complaints")}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-left transition-colors ${
                  activeTab === "complaints"
                    ? "bg-blue-100 text-blue-700"
                    : "text-gray-700 hover:bg-gray-100"
                }`}
              >
                <FileText className="w-5 h-5" />
                Complaints
              </button>
              <button
                onClick={() => setActiveTab("workers")}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-left transition-colors ${
                  activeTab === "workers"
                    ? "bg-blue-100 text-blue-700"
                    : "text-gray-700 hover:bg-gray-100"
                }`}
              >
                <Users className="w-5 h-5" />
                Workers
              </button>
            </nav>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 p-8">
          {/* Dashboard Tab */}
          {activeTab === "dashboard" && (
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-8">
                Dashboard Overview
              </h1>

              {/* Stats Cards */}
              <div className="grid md:grid-cols-4 gap-6 mb-8">
                <div className="bg-white p-6 rounded-lg shadow">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-600">Total Complaints</p>
                      <p className="text-3xl font-bold text-gray-900">
                        {stats && stats.totalComplaints}
                      </p>
                    </div>
                    <FileText className="w-8 h-8 text-blue-600" />
                  </div>
                </div>
                <div className="bg-white p-6 rounded-lg shadow">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-600">Pending</p>
                      <p className="text-3xl font-bold text-yellow-600">
                        {stats && stats.pending}
                      </p>
                    </div>
                    <Clock className="w-8 h-8 text-yellow-600" />
                  </div>
                </div>
                {/* <div className="bg-white p-6 rounded-lg shadow">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-600">In Progress</p>
                      <p className="text-3xl font-bold text-blue-600">
                        {stats && stats.inProgress}
                      </p>
                    </div>
                    <AlertTriangle className="w-8 h-8 text-blue-600" />
                  </div>
                </div> */}
                <div className="bg-white p-6 rounded-lg shadow">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-600">Resolved</p>
                      <p className="text-3xl font-bold text-green-600">
                        {stats && stats.resolved}
                      </p>
                    </div>
                    <CheckCircle className="w-8 h-8 text-green-600" />
                  </div>
                </div>
              </div>

              {/* Recent Complaints */}
              <div className="bg-white rounded-lg shadow">
                <div className="p-6 border-b">
                  <h2 className="text-xl font-semibold">Recent Complaints</h2>
                </div>
                <div className="p-6">
                  <div className="space-y-4">
                    {complaints.slice(0, 3).map((complaint) => (
                      <div
                        key={complaint.complaintId}
                        className="flex items-center justify-between p-4 border rounded-lg"
                      >
                        <div className="flex-1">
                          <h3 className="font-medium">{complaint.title}</h3>
                          <p className="text-sm text-gray-600">
                            {complaint.address}
                          </p>
                        </div>
                        <div className="flex items-center gap-3">
                          <span
                            className={`px-2 py-1 rounded-full text-xs ${getStatusColor(
                              complaint.status
                            )}`}
                          >
                            {complaint.status}
                          </span>
                          <span
                            className={`px-2 py-1 rounded-full text-xs ${getUrgencyColor(
                              complaint.urgency
                            )}`}
                          >
                            {complaint.urgency}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Complaints Tab */}
          {activeTab === "complaints" && (
            <div>
              <div className="flex justify-between items-center mb-6">
                <h1 className="text-3xl font-bold text-gray-900">
                  Complaints Management
                </h1>
              </div>

              {/* Filters */}
              <div className="bg-white p-6 rounded-lg shadow mb-6">
                <div className="flex flex-wrap gap-4">
                  <div className="flex-1 min-w-64">
                    <div className="relative">
                      <Search className="w-5 h-5 absolute left-3 top-3 text-gray-400" />
                      <input
                        type="text"
                        placeholder="Search complaints..."
                        className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>
                  </div>
                  <select
                    value={filterStatus}
                    onChange={(e) => setFilterStatus(e.target.value)}
                    className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="all">All Status</option>
                    <option value="Pending">Pending</option>
                    <option value="In Progress">In Progress</option>
                    <option value="Resolved">Resolved</option>
                  </select>
                  <select
                    value={filterDepartment}
                    onChange={(e) => setFilterDepartment(e.target.value)}
                    className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="all">All Departments</option>
                    <option value="water">Water Supply</option>
                    <option value="electricity">Electricity</option>
                    <option value="sanitation">Sanitation</option>
                    <option value="roads">Roads & Transport</option>
                    <option value="others">Others</option>
                  </select>
                </div>
              </div>

              {/* Complaints Table */}
              <div className="bg-white rounded-lg shadow overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          ID
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Complaint
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Department
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Status
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Priority
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          View Complaint
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Assign Worker
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {filteredComplaints.map((complaint) => (
                        <tr
                          key={complaint.complaintId}
                          className="hover:bg-gray-50"
                        >
                          <td className="px-6 py-4 text-sm text-gray-900">
                            {complaint.complaintId}
                          </td>
                          <td className="px-6 py-6">
                            <div>
                              <div className="text-sm font-medium text-gray-900">
                                {complaint.title}
                              </div>
                              <div className="text-sm text-gray-500 flex items-center gap-1">
                                <MapPin className="w-3 h-3" />
                                {complaint.address}
                              </div>
                            </div>
                          </td>
                          <td className="px-6 py-4 text-sm text-gray-900">
                            {complaint.department}
                          </td>
                          <td className="px-6 py-4">
                            <span
                              className={`px-2 py-1 rounded-full text-xs ${getStatusColor(
                                complaint.status
                              )}`}
                            >
                              {complaint.status}
                            </span>
                          </td>
                          <td className="px-6 py-4">
                            <span
                              className={`px-2 py-1 rounded-full text-xs ${getUrgencyColor(
                                complaint.urgency
                              )}`}
                            >
                              {complaint.urgency}
                            </span>
                          </td>
                          <td className="px-6 py-4 ">
                            <button
                              onClick={() => handleViewClick(complaint)}
                              className="text-blue-600 hover:text-blue-900 flex items-center gap-1"
                            >
                              <Eye className="w-4 h-4" />
                              View
                            </button>
                          </td>
                          <td className="px-6 py-4 text-sm font-medium">
                            <div className="flex items-center gap-2">
                              {complaint.assignedTo?.workerId ? (
                                <div className="flex items-center text-green-600">
                                  <CheckCircle className="w-4 h-4" />
                                  <span className="text-xs ml-1">
                                    {complaint.assignedTo.name}
                                  </span>
                                </div>
                              ) : (
                                <button
                                  className="text-indigo-600 hover:text-indigo-900"
                                  onClick={() => handleAssignClick(complaint)}
                                >
                                  <UserPlus className="w-4 h-4" />
                                </button>
                              )}
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* Officers Tab */}
          {activeTab === "workers" && (
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-8">
                Workers Management
              </h1>

              <div className="bg-white rounded-lg shadow overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Worker
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Department
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Active Complaints
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Resolved
                        </th>
                        {/* <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Actions
                        </th> */}
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {workers.map((worker) => (
                        <tr key={worker.id} className="hover:bg-gray-50">
                          <td className="px-6 py-4">
                            <div className="flex items-center">
                              <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                                <Users className="w-5 h-5 text-blue-600" />
                              </div>
                              <div className="ml-4">
                                <div className="text-sm font-medium text-gray-900">
                                  {worker.name}
                                </div>
                              </div>
                            </div>
                          </td>
                          <td className="px-6 py-4 text-sm text-gray-900">
                            {worker.department}
                          </td>
                          <td className="px-6 py-4 text-sm text-gray-900">
                            {worker.activeComplaints}
                          </td>
                          <td className="px-6 py-4 text-sm text-gray-900">
                            {worker.resolvedComplaints}
                          </td>
                          {/* <td className="px-6 py-4 text-sm font-medium">
                            <button className="text-blue-600 hover:text-blue-900 mr-3">
                              View
                            </button>
                            <button className="text-green-600 hover:text-green-900">
                              Edit
                            </button>
                          </td> */}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {showModal && (
            <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
              <div className="bg-white p-6 rounded-lg shadow-lg w-[90%] max-w-md">
                <h2 className="text-lg font-semibold mb-4">Assign Worker</h2>
                <p className="mb-2 text-sm text-gray-700">
                  Assign worker to complaint:{" "}
                  <span className="font-semibold">
                    {selectedComplaint.title}
                  </span>
                </p>

                <select
                  value={selectedWorkerId}
                  onChange={(e) => {
                    const selectedId = e.target.value;
                    const selectedWorker = workers.find(
                      (w) => w._id === selectedId
                    );
                    setSelectedWorkerId(selectedId);
                    setSelectedWorkerName(selectedWorker?.name || "");
                  }}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md mb-4 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                >
                  <option value="" disabled>
                    Select a worker
                  </option>
                  {workers.map((worker) => (
                    <option key={worker._id} value={worker._id}>
                      {worker.name} ({worker.email})
                    </option>
                  ))}
                </select>

                <div className="flex justify-end gap-3">
                  <button
                    onClick={() => setShowModal(false)}
                    className="px-4 py-2 text-sm text-gray-600 hover:text-gray-800"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleAssignWorker}
                    className="px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700"
                  >
                    Assign
                  </button>
                </div>
              </div>
            </div>
          )}
          {viewComplaint && (
            <div
              className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 px-4"
              onClick={() => setViewComplaint(null)}
            >
              <div
                className="bg-white rounded-2xl shadow-xl w-full max-w-3xl max-h-[90vh] overflow-y-auto relative"
                onClick={(e) => e.stopPropagation()}
              >
                {/* Header */}
                <div className="sticky top-0 z-10 bg-white border-b px-6 py-4 flex justify-between items-center rounded-t-2xl">
                  <h2 className="text-xl font-bold text-gray-800">
                    Complaint Details
                  </h2>
                  <button
                    onClick={() => setViewComplaint(null)}
                    className="text-gray-500 hover:text-red-600 text-xl"
                  >
                    ✕
                  </button>
                </div>

                {/* Body */}
                <div className="p-6 space-y-4 text-sm text-gray-700">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-3">
                    <p>
                      <b>Complaint ID:</b>{" "}
                      <span className="font-medium text-gray-900">
                        {viewComplaint.complaintId}
                      </span>
                    </p>
                    <p>
                      <b>Name:</b>{" "}
                      <span className="font-medium text-gray-900">
                        {viewComplaint.fullName}
                      </span>
                    </p>
                    <p>
                      <b>Email:</b>{" "}
                      <span className="font-medium text-gray-900">
                        {viewComplaint.email}
                      </span>
                    </p>
                    <p>
                      <b>Phone:</b>{" "}
                      <span className="font-medium text-gray-900">
                        {viewComplaint.phone}
                      </span>
                    </p>
                    <p>
                      <b>Address:</b>{" "}
                      <span className="font-medium text-gray-900">
                        {viewComplaint.address}
                      </span>
                    </p>
                    <p>
                      <b>Title:</b>{" "}
                      <span className="font-medium text-gray-900">
                        {viewComplaint.title}
                      </span>
                    </p>
                    <p>
                      <b>Description:</b>{" "}
                      <span className="font-medium text-gray-900">
                        {viewComplaint.description}
                      </span>
                    </p>
                    <p>
                      <b>Category:</b>{" "}
                      <span className="font-medium text-gray-900">
                        {viewComplaint.category}
                      </span>
                    </p>
                    <p>
                      <b>Department:</b>{" "}
                      <span className="font-medium text-gray-900">
                        {viewComplaint.department}
                      </span>
                    </p>
                    <p>
                      <b>Status:</b>{" "}
                      <span className="font-medium text-gray-900">
                        {viewComplaint.status}
                      </span>
                    </p>
                    <p>
                      <b>Urgency:</b>{" "}
                      <span className="font-medium text-gray-900">
                        {viewComplaint.urgency}
                      </span>
                    </p>
                    <p>
                      <b>Created At:</b>{" "}
                      <span className="font-medium text-gray-900">
                        {new Date(viewComplaint.createdAt).toLocaleString()}
                      </span>
                    </p>
                  </div>

                  {/* Images */}
                  {viewComplaint.images?.length > 0 && (
                    <div className="mt-6">
                      <p className="text-lg font-semibold text-gray-800 mb-2">
                        Attached Images
                      </p>
                      <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                        {viewComplaint.images.map((img, i) => {
                          const normalizedPath = img.replace(/\\/g, "/");
                          const fullURL = `http://localhost:5000/${normalizedPath}`;
                          return (
                            <div key={i} className="group relative">
                              <img
                                src={fullURL}
                                alt={`Complaint Image ${i + 1}`}
                                className="w-full h-40 object-cover rounded-lg border border-gray-300 transition-transform duration-300 group-hover:scale-105 shadow-md"
                                onClick={() => window.open(fullURL, "_blank")}
                              />
                              <a
                                target="_blank"
                                href={fullURL}
                                download
                                className="absolute bottom-2 right-2 bg-white bg-opacity-80 text-sm px-2 py-1 rounded hover:bg-opacity-100 shadow-sm transition"
                                title="Download"
                              >
                                ⬇
                              </a>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  )}
                </div>

                {/* Footer */}
                <div className="px-6 py-4 flex justify-end border-t">
                  <button
                    onClick={() => setViewComplaint(null)}
                    className="bg-red-600 hover:bg-red-700 text-white px-5 py-2 rounded-lg transition"
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
    </ProtectedRoute>
  );
}
