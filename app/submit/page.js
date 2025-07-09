"use client"
import { useState } from "react"
import Link from "next/link"
import { Upload, X, MapPin, Phone, Mail, User, FileText, Shield, CheckCircle, AlertCircle, Camera, Clock, ArrowLeft } from 'lucide-react'

export default function SubmitComplaint() {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    department: "",
    location: "",
    title: "",
    description: "",
    files: [],
    priority: "medium",
  })
  const [showModal, setShowModal] = useState(false)
  const [complaintId, setComplaintId] = useState("")
  const [currentStep, setCurrentStep] = useState(1)
  const [dragActive, setDragActive] = useState(false)

  const departments = [
    { value: "water", label: "Water Supply", icon: "💧" },
    { value: "electricity", label: "Electricity", icon: "⚡" },
    { value: "sanitation", label: "Sanitation", icon: "🗑️" },
    { value: "roads", label: "Roads & Transport", icon: "🛣️" },
    { value: "health", label: "Public Health", icon: "🏥" },
    { value: "others", label: "Others", icon: "📋" }
  ]

  const priorities = [
    { value: "low", label: "Low", color: "green", description: "Non-urgent issues" },
    { value: "medium", label: "Medium", color: "yellow", description: "Standard priority" },
    { value: "high", label: "High", color: "red", description: "Urgent attention needed" }
  ]

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  const handleFileUpload = (e) => {
    const files = Array.from(e.target.files)
    setFormData({
      ...formData,
      files: [...formData.files, ...files],
    })
  }

  const handleDrag = (e) => {
    e.preventDefault()
    e.stopPropagation()
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true)
    } else if (e.type === "dragleave") {
      setDragActive(false)
    }
  }

  const handleDrop = (e) => {
    e.preventDefault()
    e.stopPropagation()
    setDragActive(false)
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const files = Array.from(e.dataTransfer.files)
      setFormData({
        ...formData,
        files: [...formData.files, ...files],
      })
    }
  }

  const removeFile = (index) => {
    const newFiles = formData.files.filter((_, i) => i !== index)
    setFormData({
      ...formData,
      files: newFiles,
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    // Generate random complaint ID
    const id = "CN" + Math.random().toString(36).substr(2, 9).toUpperCase()
    setComplaintId(id)
    setShowModal(true)
    // Reset form
    setFormData({
      fullName: "",
      email: "",
      phone: "",
      department: "",
      location: "",
      title: "",
      description: "",
      files: [],
      priority: "medium",
    })
    setCurrentStep(1)
  }

  const nextStep = () => {
    if (currentStep < 3) setCurrentStep(currentStep + 1)
  }

  const prevStep = () => {
    if (currentStep > 1) setCurrentStep(currentStep - 1)
  }

  const isStepValid = (step) => {
    switch (step) {
      case 1:
        return formData.fullName && formData.email && formData.phone
      case 2:
        return formData.department && formData.title && formData.description
      case 3:
        return true
      default:
        return false
    }
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
              <Link href="/track" className="text-gray-700 hover:text-blue-600 transition-colors">
                Track Complaint
              </Link>
            </div>
          </div>
        </div>
      </nav>

      <div className="max-w-4xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center bg-blue-100 text-blue-800 px-4 py-2 rounded-full text-sm font-medium mb-4">
            <FileText className="w-4 h-4 mr-2" />
            Submit New Complaint
          </div>
          <h1 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">Report a Public Service Issue</h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Help us improve your community by reporting issues with public services. We'll track and resolve your complaint transparently.
          </p>
        </div>

        {/* Progress Steps */}
        <div className="mb-8">
          <div className="flex items-center justify-center">
            {[1, 2, 3].map((step) => (
              <div key={step} className="flex items-center">
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-semibold transition-all ${
                    currentStep >= step
                      ? "bg-blue-600 text-white"
                      : "bg-gray-200 text-gray-600"
                  }`}
                >
                  {currentStep > step ? <CheckCircle className="w-5 h-5" /> : step}
                </div>
                {step < 3 && (
                  <div className={`w-16 h-1 mx-2 transition-all ${
                    currentStep > step ? "bg-blue-600" : "bg-gray-200"
                  }`}></div>
                )}
              </div>
            ))}
          </div>
          <div className="flex justify-center mt-4 space-x-8 text-sm">
            <span className={currentStep >= 1 ? "text-blue-600 font-medium" : "text-gray-500"}>
              Personal Info
            </span>
            <span className={currentStep >= 2 ? "text-blue-600 font-medium" : "text-gray-500"}>
              Complaint Details
            </span>
            <span className={currentStep >= 3 ? "text-blue-600 font-medium" : "text-gray-500"}>
              Evidence & Submit
            </span>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-xl p-8 border">
          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Step 1: Personal Information */}
            {currentStep === 1 && (
              <div className="space-y-6">
                <div className="text-center mb-6">
                  <h2 className="text-2xl font-semibold text-gray-900 mb-2">Personal Information</h2>
                  <p className="text-gray-600">We need your contact details to keep you updated on the progress</p>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      <User className="w-4 h-4 inline mr-2" />
                      Full Name *
                    </label>
                    <input
                      type="text"
                      name="fullName"
                      value={formData.fullName}
                      onChange={handleInputChange}
                      className="w-full px-4 py-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                      placeholder="Enter your full name"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      <Mail className="w-4 h-4 inline mr-2" />
                      Email Address *
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      className="w-full px-4 py-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                      placeholder="Enter your email"
                      required
                    />
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      <Phone className="w-4 h-4 inline mr-2" />
                      Phone Number *
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      className="w-full px-4 py-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                      placeholder="Enter your phone number"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      <MapPin className="w-4 h-4 inline mr-2" />
                      Location/Address
                    </label>
                    <input
                      type="text"
                      name="location"
                      value={formData.location}
                      onChange={handleInputChange}
                      className="w-full px-4 py-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                      placeholder="Enter location or address"
                    />
                  </div>
                </div>

                <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
                  <div className="flex items-start">
                    <Shield className="w-5 h-5 text-blue-600 mt-0.5 mr-3" />
                    <div>
                      <h4 className="font-medium text-blue-900">Privacy Protection</h4>
                      <p className="text-sm text-blue-700 mt-1">
                        Your personal information is encrypted and will only be used to process your complaint and provide updates.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Step 2: Complaint Details */}
            {currentStep === 2 && (
              <div className="space-y-6">
                <div className="text-center mb-6">
                  <h2 className="text-2xl font-semibold text-gray-900 mb-2">Complaint Details</h2>
                  <p className="text-gray-600">Provide detailed information about the issue you're reporting</p>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-3">Department *</label>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                    {departments.map((dept) => (
                      <label key={dept.value} className="cursor-pointer">
                        <input
                          type="radio"
                          name="department"
                          value={dept.value}
                          checked={formData.department === dept.value}
                          onChange={handleInputChange}
                          className="sr-only"
                        />
                        <div
                          className={`p-4 rounded-xl border-2 text-center transition-all ${
                            formData.department === dept.value
                              ? "border-blue-500 bg-blue-50 text-blue-700"
                              : "border-gray-200 hover:border-gray-300"
                          }`}
                        >
                          <div className="text-2xl mb-2">{dept.icon}</div>
                          <div className="text-sm font-medium">{dept.label}</div>
                        </div>
                      </label>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    <FileText className="w-4 h-4 inline mr-2" />
                    Complaint Title *
                  </label>
                  <input
                    type="text"
                    name="title"
                    value={formData.title}
                    onChange={handleInputChange}
                    className="w-full px-4 py-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                    placeholder="Brief, descriptive title of your complaint"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Priority Level</label>
                  <div className="grid grid-cols-3 gap-3">
                    {priorities.map((priority) => (
                      <label key={priority.value} className="cursor-pointer">
                        <input
                          type="radio"
                          name="priority"
                          value={priority.value}
                          checked={formData.priority === priority.value}
                          onChange={handleInputChange}
                          className="sr-only"
                        />
                        <div
                          className={`p-4 rounded-xl border-2 text-center transition-all ${
                            formData.priority === priority.value
                              ? `border-${priority.color}-500 bg-${priority.color}-50 text-${priority.color}-700`
                              : "border-gray-200 hover:border-gray-300"
                          }`}
                        >
                          <div className="font-medium">{priority.label}</div>
                          <div className="text-xs text-gray-600 mt-1">{priority.description}</div>
                        </div>
                      </label>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Detailed Description *</label>
                  <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleInputChange}
                    rows={6}
                    className="w-full px-4 py-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                    placeholder="Provide a detailed description of the issue, including when it started, how it affects you, and any other relevant information..."
                    required
                  />
                  <div className="text-sm text-gray-500 mt-2">
                    {formData.description.length}/500 characters
                  </div>
                </div>
              </div>
            )}

            {/* Step 3: Evidence Upload */}
            {currentStep === 3 && (
              <div className="space-y-6">
                <div className="text-center mb-6">
                  <h2 className="text-2xl font-semibold text-gray-900 mb-2">Upload Evidence</h2>
                  <p className="text-gray-600">Add photos or videos to support your complaint (optional but recommended)</p>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-4">
                    <Camera className="w-4 h-4 inline mr-2" />
                    Upload Photos/Videos (Optional)
                  </label>
                  <div
                    className={`border-2 border-dashed rounded-xl p-8 text-center transition-all ${
                      dragActive
                        ? "border-blue-400 bg-blue-50"
                        : "border-gray-300 hover:border-blue-400 hover:bg-blue-50"
                    }`}
                    onDragEnter={handleDrag}
                    onDragLeave={handleDrag}
                    onDragOver={handleDrag}
                    onDrop={handleDrop}
                  >
                    <input
                      type="file"
                      multiple
                      accept="image/*,video/*"
                      onChange={handleFileUpload}
                      className="hidden"
                      id="file-upload"
                    />
                    <label htmlFor="file-upload" className="cursor-pointer">
                      <Upload className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                      <p className="text-lg font-medium text-gray-700 mb-2">
                        Drop files here or click to upload
                      </p>
                      <p className="text-sm text-gray-500">
                        PNG, JPG, MP4 up to 10MB each • Maximum 5 files
                      </p>
                    </label>
                  </div>

                  {/* File Preview */}
                  {formData.files.length > 0 && (
                    <div className="mt-6">
                      <h4 className="font-medium text-gray-900 mb-4">Uploaded Files ({formData.files.length})</h4>
                      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                        {formData.files.map((file, index) => (
                          <div key={index} className="relative bg-gray-50 rounded-lg p-4 border">
                            <div className="flex items-center space-x-3">
                              <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                                <Camera className="w-5 h-5 text-blue-600" />
                              </div>
                              <div className="flex-1 min-w-0">
                                <p className="text-sm font-medium text-gray-900 truncate">{file.name}</p>
                                <p className="text-xs text-gray-500">{(file.size / 1024 / 1024).toFixed(2)} MB</p>
                              </div>
                            </div>
                            <button
                              type="button"
                              onClick={() => removeFile(index)}
                              className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center hover:bg-red-600 transition-colors"
                            >
                              <X className="w-4 h-4" />
                            </button>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                <div className="bg-green-50 border border-green-200 rounded-xl p-4">
                  <div className="flex items-start">
                    <CheckCircle className="w-5 h-5 text-green-600 mt-0.5 mr-3" />
                    <div>
                      <h4 className="font-medium text-green-900">Ready to Submit</h4>
                      <p className="text-sm text-green-700 mt-1">
                        Review your complaint details and click submit. You'll receive a tracking ID immediately.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Summary */}
                <div className="bg-gray-50 rounded-xl p-6">
                  <h4 className="font-semibold text-gray-900 mb-4">Complaint Summary</h4>
                  <div className="space-y-3 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Name:</span>
                      <span className="font-medium">{formData.fullName}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Department:</span>
                      <span className="font-medium">
                        {departments.find(d => d.value === formData.department)?.label || 'Not selected'}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Priority:</span>
                      <span className={`font-medium capitalize text-${
                        priorities.find(p => p.value === formData.priority)?.color
                      }-600`}>
                        {formData.priority}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Files:</span>
                      <span className="font-medium">{formData.files.length} attached</span>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Navigation Buttons */}
            <div className="flex justify-between pt-6 border-t">
              {currentStep > 1 ? (
                <button
                  type="button"
                  onClick={prevStep}
                  className="px-6 py-3 border border-gray-300 text-gray-700 rounded-xl hover:bg-gray-50 transition-colors flex items-center"
                >
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Previous
                </button>
              ) : (
                <div></div>
              )}

              {currentStep < 3 ? (
                <button
                  type="button"
                  onClick={nextStep}
                  disabled={!isStepValid(currentStep)}
                  className={`px-6 py-3 rounded-xl font-semibold transition-colors flex items-center ${
                    isStepValid(currentStep)
                      ? "bg-blue-600 text-white hover:bg-blue-700"
                      : "bg-gray-300 text-gray-500 cursor-not-allowed"
                  }`}
                >
                  Next Step
                  <ArrowLeft className="w-4 h-4 ml-2 rotate-180" />
                </button>
              ) : (
                <button
                  type="submit"
                  className="px-8 py-3 bg-green-600 text-white rounded-xl font-semibold hover:bg-green-700 transition-colors flex items-center"
                >
                  <CheckCircle className="w-5 h-5 mr-2" />
                  Submit Complaint
                </button>
              )}
            </div>
          </form>
        </div>
      </div>

      {/* Success Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl p-8 max-w-md mx-auto shadow-2xl">
            <div className="text-center">
              <div className="bg-green-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
                <CheckCircle className="w-10 h-10 text-green-600" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Complaint Submitted Successfully!</h3>
              <p className="text-gray-600 mb-6">Your complaint has been registered and assigned a tracking ID.</p>
              
              <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 mb-6">
                <p className="text-sm text-blue-700 mb-2">Your Complaint ID:</p>
                <p className="text-2xl font-bold text-blue-600 font-mono">{complaintId}</p>
              </div>

              <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-4 mb-6">
                <div className="flex items-start">
                  <Clock className="w-5 h-5 text-yellow-600 mt-0.5 mr-3" />
                  <div className="text-left">
                    <p className="text-sm font-medium text-yellow-800">What happens next?</p>
                    <p className="text-xs text-yellow-700 mt-1">
                      You'll receive SMS and email updates. Expected response within 24-48 hours.
                    </p>
                  </div>
                </div>
              </div>

              <div className="space-y-3">
                <Link
                  href={`/track?id=${complaintId}`}
                  className="block bg-blue-600 text-white px-6 py-3 rounded-xl hover:bg-blue-700 transition-colors font-semibold"
                >
                  Track Your Complaint
                </Link>
                <button 
                  onClick={() => setShowModal(false)} 
                  className="block w-full text-gray-600 hover:text-gray-800 py-2 transition-colors"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
