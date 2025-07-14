"use client"
import { useState,useEffect } from "react"
import Link from "next/link"
import { User, Mail, Phone, MapPin, Shield, Edit, Save, X, Calendar, ArrowLeft, Camera,DivideCircleIcon } from "lucide-react"
import Navbar from "@/components/Navbar"
import toast from 'react-hot-toast'
export default function ProfilePage() {
  const [isEditing, setIsEditing] = useState(false)
  const [userData, setUserData] = useState(null)
const [editData, setEditData] = useState({})
const [loading, setLoading] = useState(true)
const [isLogin, setIsLogin] = useState(false)
const [isAdmin, setIsAdmin] = useState(false)
const token = typeof window !== 'undefined' ? localStorage.getItem("token") : null;

 useEffect(() => {
    // Simulate fetching user data
    const fetchUser = async () => {
      //localhost:5000/api/auth/profile
      try {
        const response = await fetch('https://civicnivaran.onrender.com/api/auth/profile', {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        const userData = await response.json();
        setUserData(userData);
        setEditData(userData);
        setIsAdmin(userData.role === "officer");
        
      } catch (error) {
        console.error("Error fetching user data:", error);
        setIsLogin(true);
      }
    };
    fetchUser();
  }, []);



  const handleEditChange = (e) => {
    setEditData({
      ...editData,
      [e.target.name]: e.target.value,
    })
  }

  const handleSave = () => {
    // Simulate saving data
    //http://localhost:5000/api/auth/profile
    try{
    fetch('https://civicnivaran.onrender.com/api/auth/profile', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify(editData)
    })
    setUserData(editData)
    setIsEditing(false)
    toast.success("Profile updated successfully!");
  } catch (error) {
    console.error("Error saving user data:", error);
    toast.error("Failed to save changes. Please try again.");
  }
}

  const handleCancel = () => {
    setEditData(userData)
    setIsEditing(false)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50">
      {/* Navigation */}
      <Navbar/>

      <div className="max-w-4xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center bg-blue-100 text-blue-800 px-4 py-2 rounded-full text-sm font-medium mb-4">
            <User className="w-4 h-4 mr-2" />
            My Profile
          </div>
          <h1 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">Profile Information</h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            View and manage your personal information registered with CivicNivaran
          </p>
        </div>

        <div className="bg-white rounded-2xl shadow-xl border overflow-hidden">
          {/* Profile Header */}
          <div className="bg-gradient-to-r from-blue-600 to-blue-700 px-8 py-12 text-center">
            <div className="relative inline-block mb-6">
              <img
                src={ "/placeholder.svg?height=120&width=120"}
                alt="Profile"
                className="w-32 h-32 rounded-full border-4 border-white object-cover shadow-lg"
              />
              <button className="absolute bottom-2 right-2 bg-white text-blue-600 p-3 rounded-full hover:bg-gray-100 transition-colors shadow-lg">
                <Camera className="w-5 h-5" />
              </button>
            </div>
            <h2 className="text-3xl font-bold text-white mb-2">{userData && userData.name}</h2>
            <p className="text-blue-100 text-lg capitalize mb-4">{userData && userData.role} Account</p>
            <div className="inline-flex items-center bg-blue-500 bg-opacity-50 text-white px-4 py-2 rounded-full text-sm">
              <Calendar className="w-4 h-4 mr-2" />
              Member since{" "}
              {userData && new Date(userData.createdAt).toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </div>
          </div>

          {/* Profile Information */}
          <div className="p-8">
            <div className="flex justify-between items-center mb-8">
              <h3 className="text-2xl font-bold text-gray-900">Personal Information</h3>
              {!isEditing ? (
                <button
                  onClick={() => setIsEditing(true)}
                  className="flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-colors font-semibold"
                >
                  <Edit className="w-5 h-5" />
                  Edit Profile
                </button>
              ) : (
                <div className="flex gap-3">
                  <button
                    onClick={handleSave}
                    className="flex items-center gap-2 px-6 py-3 bg-green-600 text-white rounded-xl hover:bg-green-700 transition-colors font-semibold"
                  >
                    <Save className="w-5 h-5" />
                    Save Changes
                  </button>
                  <button
                    onClick={handleCancel}
                    className="flex items-center gap-2 px-6 py-3 bg-gray-600 text-white rounded-xl hover:bg-gray-700 transition-colors font-semibold"
                  >
                    <X className="w-5 h-5" />
                    Cancel
                  </button>
                </div>
              )}
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              {/* Full Name */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-3">
                  <User className="w-5 h-5 inline mr-2 text-blue-600" />
                  Full Name
                </label>
                {isEditing ? (
                  <input
                    type="text"
                    name="fullName"
                    value={editData && editData.name}
                    onChange={handleEditChange}
                    className="w-full px-4 py-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all text-lg"
                    placeholder="Enter your full name"
                  />
                ) : (
                  <div className="bg-gray-50 px-4 py-4 rounded-xl border">
                    <p className="text-gray-900 font-medium text-lg">{userData && userData.name}</p>
                  </div>
                )}
              </div>

              {/* Email Address */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-3">
                  <Mail className="w-5 h-5 inline mr-2 text-blue-600" />
                  Email Address
                </label>
                {isEditing ? (
                  <input
                    type="email"
                    name="email"
                    value={editData && editData.email}
                    onChange={handleEditChange}
                    className="w-full px-4 py-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all text-lg"
                    placeholder="Enter your email address"
                  />
                ) : (
                  <div className="bg-gray-50 px-4 py-4 rounded-xl border">
                    <p className="text-gray-900 font-medium text-lg">{userData && userData.email}</p>
                  </div>
                )}
              </div>

              {/* Phone Number */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-3">
                  <Phone className="w-5 h-5 inline mr-2 text-blue-600" />
                  Phone Number
                </label>
                {isEditing ? (
                  <input
                    type="tel"
                    name="phone"
                    value={editData && editData.phone}
                    onChange={handleEditChange}
                    className="w-full px-4 py-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all text-lg"
                    placeholder="Enter your phone number"
                  />
                ) : (
                  <div className="bg-gray-50 px-4 py-4 rounded-xl border">
                    <p className="text-gray-900 font-medium text-lg">{userData && userData.phone}</p>
                  </div>
                )}
              </div>

              {/* Account Type */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-3">
                  <Shield className="w-5 h-5 inline mr-2 text-blue-600" />
                  Account Type
                </label>
                <div className="bg-gray-50 px-4 py-4 rounded-xl border">
                  <p className="text-gray-900 font-medium text-lg capitalize">{userData && userData.role}</p>
                  <p className="text-sm text-gray-500 mt-1">This cannot be changed</p>
                </div>
              </div>

              {/* Department */}
              {userData && userData.role === "worker" && (
              <div className="md:col-span-2">
                <label className="block text-sm font-semibold text-gray-700 mb-3">
                  <DivideCircleIcon className="w-5 h-5 inline mr-2 text-blue-600" />
                  Department
                </label>
                {isEditing ? (
                  <input
                    type="text"
                    name="department"
                    value={editData && editData.department}
                    onChange={handleEditChange}
                    className="w-full px-4 py-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all text-lg"
                    placeholder="Enter your complete department"
                  />
                ) : (
                  <div className="bg-gray-50 px-4 py-4 rounded-xl border">
                    <p className="text-gray-900 font-medium text-lg leading-relaxed">{userData && userData.department ? userData.department : "N/A"}</p>
                  </div>
                )}
              </div>
              )}
              
              <div className="md:col-span-2">
                <label className="block text-sm font-semibold text-gray-700 mb-3">
                  <MapPin className="w-5 h-5 inline mr-2 text-blue-600" />
                  Address
                </label>
                {isEditing ? (
                  <textarea
                    name="address"
                    value={editData && editData.address}
                    onChange={handleEditChange}
                    rows={4}
                    className="w-full px-4 py-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all text-lg resize-none"
                    placeholder="Enter your complete address"
                  />
                ) : (
                  <div className="bg-gray-50 px-4 py-4 rounded-xl border">
                    <p className="text-gray-900 font-medium text-lg leading-relaxed">{userData && userData.address}</p>
                  </div>
                )}
              </div>
            </div>

            {/* Account Information */}
            <div className="mt-12 pt-8 border-t border-gray-200">
              <h4 className="text-lg font-semibold text-gray-900 mb-6">Account Information</h4>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-blue-50 border border-blue-200 rounded-xl p-6">
                  <div className="flex items-center mb-3">
                    <Calendar className="w-6 h-6 text-blue-600 mr-3" />
                    <h5 className="font-semibold text-blue-900">Registration Date</h5>
                  </div>
                  <p className="text-blue-800 font-medium">
                    {userData && new Date(userData.createdAt).toLocaleDateString("en-US", {
                      weekday: "long",
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </p>
                </div>

                <div className="bg-green-50 border border-green-200 rounded-xl p-6">
                  <div className="flex items-center mb-3">
                    <Shield className="w-6 h-6 text-green-600 mr-3" />
                    <h5 className="font-semibold text-green-900">Account Status</h5>
                  </div>
                  <p className="text-green-800 font-medium">Active & Verified</p>
                </div>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="mt-12 pt-8 border-t border-gray-200">
              <h4 className="text-lg font-semibold text-gray-900 mb-6">Quick Actions</h4>
              <div className="grid md:grid-cols-3 gap-4">
                <Link
                  href="/submit"
                  className="flex items-center justify-center gap-3 px-6 py-4 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-colors font-semibold"
                >
                  <Edit className="w-5 h-5" />
                  Submit Complaint
                </Link>
                <Link
                  href="/track"
                  className="flex items-center justify-center gap-3 px-6 py-4 border-2 border-blue-600 text-blue-600 rounded-xl hover:bg-blue-50 transition-colors font-semibold"
                >
                  <User className="w-5 h-5" />
                  Track Complaint
                </Link>
                <Link
                  href="/feedback"
                  className="flex items-center justify-center gap-3 px-6 py-4 border-2 border-gray-300 text-gray-700 rounded-xl hover:bg-gray-50 transition-colors font-semibold"
                >
                  <Mail className="w-5 h-5" />
                  Give Feedback
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Privacy Notice */}
        <div className="mt-8 bg-yellow-50 border border-yellow-200 rounded-xl p-6">
          <div className="flex items-start">
            <Shield className="w-6 h-6 text-yellow-600 mt-1 mr-3 flex-shrink-0" />
            <div>
              <h4 className="font-semibold text-yellow-900 mb-2">Privacy & Security</h4>
              <p className="text-yellow-800 text-sm leading-relaxed">
                Your personal information is encrypted and securely stored. We only use this information to process your
                complaints and provide you with updates. Your data will never be shared with third parties without your
                explicit consent.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
