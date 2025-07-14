"use client";

import { useState } from "react";
import Link from "next/link";
import toast from 'react-hot-toast'
import {
  Search,
  CheckCircle,
  Clock,
  AlertCircle,
  MapPin,
  FileText
} from "lucide-react";
import Navbar from "@/components/Navbar";

export default function TrackComplaint() {
  const [searchQuery, setSearchQuery] = useState("");
  const [complaint, setComplaint] = useState(null);
  const [loading, setLoading] = useState(false);
  const [searchType, setSearchType] = useState("id");

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;

    setLoading(true);
    setComplaint(null);

    try {
      const queryParam = searchType === "id" ? "complaintId" : "phone";
      const res = await fetch(
        `https://civicnivaran.onrender.com/api/complaints/track?${queryParam}=${encodeURIComponent(searchQuery)}`
      );
      const data = await res.json();

      if (res.ok) {
        toast.success("Complaint found!");
        setComplaint(data);
      } else {
        toast.error("Complaint not found.");
        setComplaint(null);
      }
      
    } catch (err) {
      console.error("API error:", err);
      setComplaint(null);
    } finally {
      setLoading(false);
    }
  };

  const statusColor = {
    "Pending": "bg-yellow-100 text-yellow-800 border-yellow-200",
    "In Progress": "bg-blue-100 text-blue-800 border-blue-200",
    "Resolved": "bg-green-100 text-green-800 border-green-200",
    "Rejected": "bg-red-100 text-red-800 border-red-200",
    "Default": "bg-gray-100 text-gray-800 border-gray-200"
  };

  const urgencyColor = {
    "High": "bg-red-100 text-red-800 border-red-200",
    "Medium": "bg-yellow-100 text-yellow-800 border-yellow-200",
    "Low": "bg-green-100 text-green-800 border-green-200",
    "Default": "bg-gray-100 text-gray-800 border-gray-200"
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50">
      <Navbar />

      <div className="max-w-4xl mx-auto py-10 px-4">
        <div className="text-center mb-10">
          <div className="inline-flex items-center bg-blue-100 text-blue-800 px-4 py-2 rounded-full text-sm font-medium mb-4">
            <Search className="w-4 h-4 mr-2" /> Track Complaint Status
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Track Your Complaint</h1>
          <p className="text-gray-600 text-lg">
            Enter your Complaint ID or Phone Number to check status.
          </p>
        </div>

        <form onSubmit={handleSearch} className="flex flex-col md:flex-row gap-4 items-center justify-center mb-10">
          <select
            value={searchType}
            onChange={(e) => setSearchType(e.target.value)}
            className="px-4 py-3 border rounded-xl bg-white"
          >
            <option value="id" className="px-4 py-3 border rounded-xl bg-white">Complaint ID</option>
            <option value="phone" className="px-4 py-3 border rounded-xl bg-white">Phone Number</option>
          </select>
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full max-w-md px-4 py-3 border rounded-xl"
            placeholder={`Enter ${searchType === "id" ? "Complaint ID" : "Phone Number"}`}
          />
          <button
            type="submit"
            disabled={loading}
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl font-semibold"
          >
            {loading ? "Searching..." : "Search"}
          </button>
        </form>

        {complaint ? (
          <div className="bg-white p-6 rounded-xl shadow-xl border space-y-4">
            <div className="flex justify-between items-start">
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-1">{complaint.title}</h2>
                <p className="text-gray-600 mb-2">{complaint.description}</p>
                <div className="text-sm text-gray-500">
                  <span className="block">ID: {complaint.complaintId}</span>
                  <span className="block">Submitted: {new Date(complaint.createdAt).toLocaleString()}</span>
                </div>
              </div>
              <div className="flex flex-col gap-2">
                <span className={`px-3 py-1 rounded-lg text-sm font-medium border ${statusColor[complaint.status] || statusColor.Default}`}>{complaint.status}</span>
                <span className={`px-3 py-1 rounded-lg text-sm font-medium border ${urgencyColor[complaint.urgency] || urgencyColor.Default}`}>{complaint.urgency} Urgency</span>
              </div>
            </div>

            <div className="pt-4 border-t flex flex-col gap-2">
              <div className="flex items-center gap-2 text-sm">
                <MapPin className="w-4 h-4 text-gray-400" />
                {complaint.address}
              </div>
              <div className="flex items-center gap-2 text-sm">
                <FileText className="w-4 h-4 text-gray-400" />
                Department: {complaint.department}
              </div>
            </div>
          </div>
        ) : (
          searchQuery && !loading && (
            <div className="bg-white p-8 rounded-xl text-center shadow-xl border">
              <AlertCircle className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-xl font-bold text-gray-900 mb-2">Complaint Not Found</h3>
              <p className="text-gray-600 mb-4">
                Please check your {searchType === "id" ? "Complaint ID" : "Phone Number"} and try again.
              </p>
              <button
                onClick={() => setSearchQuery("")}
                className="px-5 py-2 border border-gray-300 rounded-xl hover:bg-gray-50"
              >
                Reset Search
              </button>
            </div>
          )
        )}
      </div>
    </div>
  );
}