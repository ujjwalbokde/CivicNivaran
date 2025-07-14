"use client"
import { useState } from "react"
import Link from "next/link"
import {
  Upload,
  X,
  User,
  FileText,
  Shield,
  CheckCircle,
  Clock,
  ArrowLeft,
  ArrowRight,
  AlertCircle,
  ImageIcon,
} from "lucide-react"
import Navbar from "@/components/Navbar"

export default function SubmitComplaint() {
  const [formData,  setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    address: "",
    department: "",
    category: "",
    title: "",
    description: "",
    urgency: "normal",
    images: [],
  })
  const [showModal, setShowModal] = useState(false)
  const [complaintId, setComplaintId] = useState("")
  const [currentStep, setCurrentStep] = useState(1)
  const [dragActive, setDragActive] = useState(false)
  const [errors, setErrors] = useState({})

  const departments = [
    {
      value: "water",
      label: "Water Supply",
      icon: "💧",
      categories: ["Water shortage", "Pipe leakage", "Water quality", "Billing issues"],
    },
    {
      value: "electricity",
      label: "Electricity",
      icon: "⚡",
      categories: ["Power outage", "Street lights", "Meter issues", "Electrical hazards"],
    },
    {
      value: "sanitation",
      label: "Sanitation",
      icon: "🗑️",
      categories: ["Garbage collection", "Drain blockage", "Public toilets", "Waste management"],
    },
    {
      value: "roads",
      label: "Roads & Transport",
      icon: "🛣️",
      categories: ["Potholes", "Traffic signals", "Road maintenance", "Parking issues"],
    },
    {
      value: "health",
      label: "Public Health",
      icon: "🏥",
      categories: ["Hospital services", "Vaccination", "Disease outbreak", "Medical facilities"],
    },
    {
      value: "others",
      label: "Others",
      icon: "📋",
      categories: ["Noise pollution", "Building permits", "Public safety", "General issues"],
    },
  ]

  const urgencyLevels = [
    {
      value: "low",
      label: "Low",
      color: "green",
      description: "Can wait a few days",
      bgColor: "bg-green-50",
      borderColor: "border-green-200",
      textColor: "text-green-700",
    },
    {
      value: "normal",
      label: "Normal",
      color: "blue",
      description: "Standard response time",
      bgColor: "bg-blue-50",
      borderColor: "border-blue-200",
      textColor: "text-blue-700",
    },
    {
      value: "high",
      label: "High",
      color: "orange",
      description: "Needs quick attention",
      bgColor: "bg-orange-50",
      borderColor: "border-orange-200",
      textColor: "text-orange-700",
    },
    {
      value: "urgent",
      label: "Urgent",
      color: "red",
      description: "Emergency situation",
      bgColor: "bg-red-50",
      borderColor: "border-red-200",
      textColor: "text-red-700",
    },
  ]

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData({
      ...formData,
      [name]: value,
    })

    // Clear error when user starts typing
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: "",
      })
    }

    // Reset category when department changes
    if (name === "department") {
      setFormData((prev) => ({
        ...prev,
        department: value,
        category: "",
      }))
    }
  }

  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files)
    const imageFiles = files.filter((file) => file.type.startsWith("image/"))

    if (imageFiles.length !== files.length) {
      alert("Only image files are allowed!")
      return
    }

    if (formData.images.length + imageFiles.length > 5) {
      alert("Maximum 5 images allowed!")
      return
    }

    // Check file sizes (max 5MB each)
    const oversizedFiles = imageFiles.filter((file) => file.size > 5 * 1024 * 1024)
    if (oversizedFiles.length > 0) {
      alert("Each image must be less than 5MB!")
      return
    }

    setFormData({
      ...formData,
      images: [...formData.images, ...imageFiles],
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
      const imageFiles = files.filter((file) => file.type.startsWith("image/"))

      if (imageFiles.length !== files.length) {
        alert("Only image files are allowed!")
        return
      }

      if (formData.images.length + imageFiles.length > 5) {
        alert("Maximum 5 images allowed!")
        return
      }

      const oversizedFiles = imageFiles.filter((file) => file.size > 5 * 1024 * 1024)
      if (oversizedFiles.length > 0) {
        alert("Each image must be less than 5MB!")
        return
      }

      setFormData({
        ...formData,
        images: [...formData.images, ...imageFiles],
      })
    }
  }

  const removeImage = (index) => {
    const newImages = formData.images.filter((_, i) => i !== index)
    setFormData({
      ...formData,
      images: newImages,
    })
  }

  const validateStep1 = () => {
    const newErrors = {}

    if (!formData.fullName.trim()) newErrors.fullName = "Full name is required"
    if (!formData.email.trim()) newErrors.email = "Email is required"
    else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = "Email is invalid"
    if (!formData.phone.trim()) newErrors.phone = "Phone number is required"
    if (!formData.address.trim()) newErrors.address = "Address is required"

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const validateStep2 = () => {
    const newErrors = {}

    if (!formData.department) newErrors.department = "Please select a department"
    if (!formData.category) newErrors.category = "Please select a category"
    if (!formData.title.trim()) newErrors.title = "Complaint title is required"
    if (!formData.description.trim()) newErrors.description = "Description is required"
    else if (formData.description.trim().length < 20)
      newErrors.description = "Description must be at least 20 characters"

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const nextStep = () => {
    if (currentStep === 1 && validateStep1()) {
      setCurrentStep(2)
    }
  }

  const prevStep = () => {
    if (currentStep === 2) {
      setCurrentStep(1)
    }
  }


  const handleSubmit = async (e) => {
  e.preventDefault();

  if (currentStep === 2 && validateStep2()) {
    const id = "CN" + Math.random().toString(36).substr(2, 9).toUpperCase();
    const formDataToSend = new FormData();
    // Append complaintId
    formDataToSend.append("complaintId", id);

    // Append text fields
    Object.entries(formData).forEach(([key, value]) => {
      if (key === "images") return; // handle below
      formDataToSend.append(key, value);
    });

    // Append images
    formData.images.forEach((image) => {
      formDataToSend.append("images", image);
    });

    try {
      const response = await fetch("https://civicnivaran.onrender.com/api/complaints/submit", {
        method: "POST",
        body: formDataToSend,
      });

      if (!response.ok) {
        throw new Error("Failed to submit complaint.");
      }

      const data = await response.json();
      
      setComplaintId(id);
      setShowModal(true);

      // Reset form
      setFormData({
        complaintId: id,
        fullName: "",
        email: "",
        phone: "",
        address: "",
        department: "",
        category: "",
        title: "",
        description: "",
        urgency: "normal",
        images: [],
      });
      setErrors({});
      setCurrentStep(1);

    } catch (error) {
      console.error("Submission error:", error);
      alert("Something went wrong while submitting your complaint.");
    }
  }
};
// const handleSubmit = async (e) => {
//   e.preventDefault();

//   if (currentStep === 2 && validateStep2()) {
//     const id = "CN" + Math.random().toString(36).substr(2, 9).toUpperCase(); // 1. Generate ID

//     const formDataToSend = new FormData();

//     // 2. Append complaintId
//     formDataToSend.append("complaintId", id);

//     // 3. Append other text fields
//     Object.entries(formData).forEach(([key, value]) => {
//       if (key === "images") return; // handle images separately
//       formDataToSend.append(key, value);
//     });

//     // 4. Append images
//     formData.images.forEach((image) => {
//       formDataToSend.append("images", image);
//     });

//     try {
//       const response = await fetch("http://localhost:5000/api/complaints/submit", {
//         method: "POST",
//         body: formDataToSend,
//       });

//       if (!response.ok) {
//         throw new Error("Failed to submit complaint.");
//       }

//       const data = await response.json();

//       setComplaintId(id);           // update local state
//       setShowModal(true);           // show confirmation modal

//       // Reset form with new ID stored
//       setFormData({
//         complaintId: id,
//         fullName: "",
//         email: "",
//         phone: "",
//         address: "",
//         department: "",
//         category: "",
//         title: "",
//         description: "",
//         urgency: "normal",
//         images: [],
//       });
//       setErrors({});
//       setCurrentStep(1);

//     } catch (error) {
//       console.error("Submission error:", error);
//       alert("Something went wrong while submitting your complaint.");
//     }
//   }
// };


  const selectedDepartment = departments.find((d) => d.value === formData.department)
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50">
      {/* Navigation */}
      <Navbar/> 

      <div className="max-w-4xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center bg-blue-100 text-blue-800 px-4 py-2 rounded-full text-sm font-medium mb-4">
            <FileText className="w-4 h-4 mr-2" />
            Submit New Complaint
          </div>
          <h1 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">Report a Public Service Issue</h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Help us improve your community by reporting issues with public services. Complete the form in just 2 simple
            steps.
          </p>
        </div>

        {/* Progress Steps */}
        <div className="mb-8">
          <div className="flex items-center justify-center">
            {[1, 2].map((step) => (
              <div key={step} className="flex items-center">
                <div
                  className={`w-12 h-12 rounded-full flex items-center justify-center text-sm font-semibold transition-all ${
                    currentStep >= step ? "bg-blue-600 text-white" : "bg-gray-200 text-gray-600"
                  }`}
                >
                  {currentStep > step ? <CheckCircle className="w-6 h-6" /> : step}
                </div>
                {step < 2 && (
                  <div
                    className={`w-24 h-1 mx-4 transition-all ${currentStep > step ? "bg-blue-600" : "bg-gray-200"}`}
                  ></div>
                )}
              </div>
            ))}
          </div>
          <div className="flex justify-center mt-4 space-x-32 text-sm">
            <span className={currentStep >= 1 ? "text-blue-600 font-medium" : "text-gray-500"}>
              Personal Information
            </span>
            <span className={currentStep >= 2 ? "text-blue-600 font-medium" : "text-gray-500"}>
              Complaint Details & Evidence
            </span>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-xl border overflow-hidden">
          <form onSubmit={handleSubmit}>
            {/* Step 1: Personal Information */}
            {currentStep === 1 && (
              <div className="p-8">
                <div className="flex items-center mb-8">
                  <div className="bg-blue-100 p-4 rounded-full mr-4">
                    <User className="w-8 h-8 text-blue-600" />
                  </div>
                  <div>
                    <h2 className="text-3xl font-bold text-gray-900">Personal Information</h2>
                    <p className="text-gray-600 text-lg">
                      We need your contact details to keep you updated on the progress
                    </p>
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-8">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-3">Full Name *</label>
                    <input
                      type="text"
                      name="fullName"
                      value={formData.fullName}
                      onChange={handleInputChange}
                      className={`w-full px-4 py-4 border rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all text-lg ${
                        errors.fullName ? "border-red-300 bg-red-50" : "border-gray-300"
                      }`}
                      placeholder="Enter your full name"
                    />
                    {errors.fullName && <p className="mt-2 text-sm text-red-600">{errors.fullName}</p>}
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-3">Email Address *</label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      className={`w-full px-4 py-4 border rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all text-lg ${
                        errors.email ? "border-red-300 bg-red-50" : "border-gray-300"
                      }`}
                      placeholder="Enter your email address"
                    />
                    {errors.email && <p className="mt-2 text-sm text-red-600">{errors.email}</p>}
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-3">Phone Number *</label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      className={`w-full px-4 py-4 border rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all text-lg ${
                        errors.phone ? "border-red-300 bg-red-50" : "border-gray-300"
                      }`}
                      placeholder="Enter your phone number"
                    />
                    {errors.phone && <p className="mt-2 text-sm text-red-600">{errors.phone}</p>}
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-3">Complete Address *</label>
                    <input
                      type="text"
                      name="address"
                      value={formData.address}
                      onChange={handleInputChange}
                      className={`w-full px-4 py-4 border rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all text-lg ${
                        errors.address ? "border-red-300 bg-red-50" : "border-gray-300"
                      }`}
                      placeholder="Enter your complete address"
                    />
                    {errors.address && <p className="mt-2 text-sm text-red-600">{errors.address}</p>}
                  </div>
                </div>

                <div className="mt-8 bg-blue-50 border border-blue-200 rounded-xl p-6">
                  <div className="flex items-start">
                    <Shield className="w-6 h-6 text-blue-600 mt-1 mr-4" />
                    <div>
                      <h4 className="font-semibold text-blue-900 text-lg">Privacy Protection</h4>
                      <p className="text-blue-700 mt-2">
                        Your personal information is encrypted and will only be used to process your complaint and
                        provide updates. We never share your data with third parties.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Step 2: Complaint Details & Evidence */}
            {currentStep === 2 && (
              <div className="p-8 space-y-8">
                <div className="flex items-center mb-8">
                  <div className="bg-green-100 p-4 rounded-full mr-4">
                    <FileText className="w-8 h-8 text-green-600" />
                  </div>
                  <div>
                    <h2 className="text-3xl font-bold text-gray-900">Complaint Details & Evidence</h2>
                    <p className="text-gray-600 text-lg">Provide specific information about the issue</p>
                  </div>
                </div>

                {/* Department Selection */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-4">Select Department *</label>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
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
                          className={`p-6 rounded-xl border-2 text-center transition-all ${
                            formData.department === dept.value
                              ? "border-blue-500 bg-blue-50 text-blue-700"
                              : "border-gray-200 hover:border-gray-300 hover:bg-gray-50"
                          }`}
                        >
                          <div className="text-3xl mb-3">{dept.icon}</div>
                          <div className="font-medium">{dept.label}</div>
                        </div>
                      </label>
                    ))}
                  </div>
                  {errors.department && <p className="mt-2 text-sm text-red-600">{errors.department}</p>}
                </div>

                {/* Category Selection */}
                {selectedDepartment && (
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-4">Select Category *</label>
                    <div className="grid grid-cols-2 gap-4">
                      {selectedDepartment.categories.map((category) => (
                        <label key={category} className="cursor-pointer">
                          <input
                            type="radio"
                            name="category"
                            value={category}
                            checked={formData.category === category}
                            onChange={handleInputChange}
                            className="sr-only"
                          />
                          <div
                            className={`p-4 rounded-xl border-2 text-center transition-all ${
                              formData.category === category
                                ? "border-green-500 bg-green-50 text-green-700"
                                : "border-gray-200 hover:border-gray-300 hover:bg-gray-50"
                            }`}
                          >
                            <div className="font-medium">{category}</div>
                          </div>
                        </label>
                      ))}
                    </div>
                    {errors.category && <p className="mt-2 text-sm text-red-600">{errors.category}</p>}
                  </div>
                )}

                {/* Complaint Title */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-3">Complaint Title *</label>
                  <input
                    type="text"
                    name="title"
                    value={formData.title}
                    onChange={handleInputChange}
                    className={`w-full px-4 py-4 border rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all text-lg ${
                      errors.title ? "border-red-300 bg-red-50" : "border-gray-300"
                    }`}
                    placeholder="Brief, descriptive title of your complaint"
                  />
                  {errors.title && <p className="mt-2 text-sm text-red-600">{errors.title}</p>}
                </div>

                {/* Urgency Level */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-4">Urgency Level</label>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {urgencyLevels.map((level) => (
                      <label key={level.value} className="cursor-pointer">
                        <input
                          type="radio"
                          name="urgency"
                          value={level.value}
                          checked={formData.urgency === level.value}
                          onChange={handleInputChange}
                          className="sr-only"
                        />
                        <div
                          className={`p-4 rounded-xl border-2 text-center transition-all ${
                            formData.urgency === level.value
                              ? `${level.borderColor} ${level.bgColor} ${level.textColor}`
                              : "border-gray-200 hover:border-gray-300 hover:bg-gray-50"
                          }`}
                        >
                          <div className="font-semibold">{level.label}</div>
                          <div className="text-xs mt-1 opacity-75">{level.description}</div>
                        </div>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Description */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-3">Detailed Description *</label>
                  <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleInputChange}
                    rows={6}
                    className={`w-full px-4 py-4 border rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all resize-none text-lg ${
                      errors.description ? "border-red-300 bg-red-50" : "border-gray-300"
                    }`}
                    placeholder="Provide a detailed description of the issue. Include when it started, how it affects you, location details, and any other relevant information..."
                  />
                  <div className="flex justify-between items-center mt-2">
                    <div className="text-sm text-gray-500">{formData.description.length}/1000 characters</div>
                    {errors.description && <p className="text-sm text-red-600">{errors.description}</p>}
                  </div>
                </div>

                {/* Image Upload */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-4">Supporting Images (Optional)</label>
                  <div
                    className={`border-2 border-dashed rounded-xl p-8 text-center transition-all ${
                      dragActive
                        ? "border-purple-400 bg-purple-50"
                        : "border-gray-300 hover:border-purple-400 hover:bg-purple-50"
                    }`}
                    onDragEnter={handleDrag}
                    onDragLeave={handleDrag}
                    onDragOver={handleDrag}
                    onDrop={handleDrop}
                  >
                    <input
                      type="file"
                      multiple
                      accept="image/*"
                      onChange={handleImageUpload}
                      className="hidden"
                      id="image-upload"
                    />
                    <label htmlFor="image-upload" className="cursor-pointer">
                      <ImageIcon className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                      <p className="text-lg font-medium text-gray-700 mb-2">Drop images here or click to upload</p>
                      <p className="text-sm text-gray-500 mb-4">PNG, JPG, JPEG up to 5MB each • Maximum 5 images</p>
                      <div className="inline-flex items-center px-6 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors">
                        <Upload className="w-5 h-5 mr-2" />
                        Choose Images
                      </div>
                    </label>
                  </div>

                  {/* Image Preview */}
                  {formData.images.length > 0 && (
                    <div className="mt-6">
                      <h4 className="font-semibold text-gray-900 mb-4">Uploaded Images ({formData.images.length}/5)</h4>
                      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
                        {formData.images.map((image, index) => (
                          <div key={index} className="relative group">
                            <div className="aspect-square bg-gray-100 rounded-lg overflow-hidden border-2 border-gray-200">
                              <img
                                src={URL.createObjectURL(image) || "/placeholder.svg"}
                                alt={`Upload ${index + 1}`}
                                className="w-full h-full object-cover"
                              />
                            </div>
                            <button
                              type="button"
                              onClick={() => removeImage(index)}
                              className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center hover:bg-red-600 transition-colors opacity-0 group-hover:opacity-100"
                            >
                              <X className="w-4 h-4" />
                            </button>
                            <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-50 text-white text-xs p-2 rounded-b-lg">
                              {image.name.length > 15 ? `${image.name.substring(0, 15)}...` : image.name}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  <div className="mt-4 bg-blue-50 border border-blue-200 rounded-lg p-4">
                    <div className="flex items-start">
                      <AlertCircle className="w-5 h-5 text-blue-600 mt-0.5 mr-3" />
                      <div>
                        <h4 className="font-medium text-blue-900">Image Guidelines</h4>
                        <ul className="text-sm text-blue-700 mt-1 space-y-1">
                          <li>• Take clear, well-lit photos of the issue</li>
                          <li>• Include wide shots and close-up details</li>
                          <li>• Only image files (PNG, JPG, JPEG) are accepted</li>
                          <li>• Each image must be less than 5MB</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Navigation Buttons */}
            <div className="px-8 py-6 bg-gray-50 border-t flex justify-between items-center">
              {currentStep === 1 ? (
                <div></div>
              ) : (
                <button
                  type="button"
                  onClick={prevStep}
                  className="flex items-center px-6 py-3 border border-gray-300 text-gray-700 rounded-xl hover:bg-gray-50 transition-colors font-semibold"
                >
                  <ArrowLeft className="w-5 h-5 mr-2" />
                  Previous Step
                </button>
              )}

              {currentStep === 1 ? (
                <button
                  type="button"
                  onClick={nextStep}
                  className="flex items-center px-8 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-colors font-semibold text-lg"
                >
                  Next Step
                  <ArrowRight className="w-5 h-5 ml-2" />
                </button>
              ) : (
                <button
                  type="submit"
                  className="flex items-center px-8 py-3 bg-green-600 text-white rounded-xl hover:bg-green-700 transition-colors font-semibold text-lg"
                >
                  <CheckCircle className="w-6 h-6 mr-2" />
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
