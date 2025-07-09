"use client"
import { useState } from "react"
import Link from "next/link"
import { User, Mail, Lock, Phone, MapPin, Eye, EyeOff, Shield, CheckCircle, ArrowRight } from "lucide-react"

export default function RegisterPage() {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    address: "",
    password: "",
    confirmPassword: "",
    role: "citizen",
  })
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const [errors, setErrors] = useState({})
  const [currentStep, setCurrentStep] = useState(1)

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
    // Clear error when user starts typing
    if (errors[e.target.name]) {
      setErrors({
        ...errors,
        [e.target.name]: "",
      })
    }
  }

  const validateForm = () => {
    const newErrors = {}

    if (!formData.fullName.trim()) {
      newErrors.fullName = "Full name is required"
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required"
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Email is invalid"
    }

    if (!formData.phone.trim()) {
      newErrors.phone = "Phone number is required"
    } else if (!/^\+?[\d\s-()]{10,}$/.test(formData.phone)) {
      newErrors.phone = "Phone number is invalid"
    }

    if (!formData.password) {
      newErrors.password = "Password is required"
    } else if (formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters"
    }

    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    if (!validateForm()) {
      return
    }

    setLoading(true)

    // Simulate registration process
    setTimeout(() => {
      console.log("Registration attempt:", formData)
      setLoading(false)
      // In real app, redirect to login or dashboard
      window.location.href = "/login"
    }, 2000)
  }

  const nextStep = () => {
    if (currentStep === 1) {
      // Validate first step
      const stepErrors = {}
      if (!formData.fullName.trim()) stepErrors.fullName = "Full name is required"
      if (!formData.email.trim()) stepErrors.email = "Email is required"
      else if (!/\S+@\S+\.\S+/.test(formData.email)) stepErrors.email = "Email is invalid"
      if (!formData.phone.trim()) stepErrors.phone = "Phone number is required"

      if (Object.keys(stepErrors).length > 0) {
        setErrors(stepErrors)
        return
      }
    }
    setCurrentStep(2)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50">
      <div className="flex min-h-screen">
        {/* Left Side - Branding */}
        <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-green-600 to-green-700 p-12 flex-col justify-between">
          <div>
            <div className="flex items-center mb-8">
              <div className="w-12 h-12 bg-white rounded-lg flex items-center justify-center mr-4">
                <Shield className="w-8 h-8 text-green-600" />
              </div>
              <h1 className="text-3xl font-bold text-white">CivicNivaran</h1>
            </div>

            <div className="mb-12">
              <h2 className="text-4xl font-bold text-white mb-6 leading-tight">
                Join the Movement for
                <span className="block">Better Governance</span>
              </h2>
              <p className="text-green-100 text-lg leading-relaxed">
                Be part of a community that's actively working to improve public services. Your voice matters, and
                together we can create positive change.
              </p>
            </div>

            <div className="space-y-6">
              <div className="flex items-center text-white">
                <CheckCircle className="w-6 h-6 mr-4 text-green-300" />
                <span>Free account with full access</span>
              </div>
              <div className="flex items-center text-white">
                <CheckCircle className="w-6 h-6 mr-4 text-green-300" />
                <span>Real-time complaint tracking</span>
              </div>
              <div className="flex items-center text-white">
                <CheckCircle className="w-6 h-6 mr-4 text-green-300" />
                <span>Direct communication with officials</span>
              </div>
              <div className="flex items-center text-white">
                <CheckCircle className="w-6 h-6 mr-4 text-green-300" />
                <span>Community impact dashboard</span>
              </div>
            </div>
          </div>

          <div className="text-green-100 text-sm">
            <p>&copy; 2024 CivicNivaran. Empowering citizens through technology.</p>
          </div>
        </div>

        {/* Right Side - Registration Form */}
        <div className="w-full lg:w-1/2 flex items-center justify-center p-8">
          <div className="max-w-md w-full">
            {/* Mobile Logo */}
            <div className="lg:hidden text-center mb-8">
              <div className="flex items-center justify-center mb-4">
                <div className="w-12 h-12 bg-green-600 rounded-lg flex items-center justify-center mr-3">
                  <Shield className="w-8 h-8 text-white" />
                </div>
                <h1 className="text-3xl font-bold text-green-600">CivicNivaran</h1>
              </div>
            </div>

            <div className="bg-white rounded-2xl shadow-xl p-8 border">
              {/* Header */}
              <div className="text-center mb-8">
                <h2 className="text-3xl font-bold text-gray-900 mb-2">Create Account</h2>
                <p className="text-gray-600">Join the CivicNivaran community today</p>
              </div>

              {/* Progress Steps */}
              <div className="flex items-center justify-center mb-8">
                <div className="flex items-center">
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold ${
                      currentStep >= 1 ? "bg-green-600 text-white" : "bg-gray-200 text-gray-600"
                    }`}
                  >
                    1
                  </div>
                  <div className={`w-16 h-1 mx-2 ${currentStep >= 2 ? "bg-green-600" : "bg-gray-200"}`}></div>
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold ${
                      currentStep >= 2 ? "bg-green-600 text-white" : "bg-gray-200 text-gray-600"
                    }`}
                  >
                    2
                  </div>
                </div>
              </div>

              {/* Registration Form */}
              <form onSubmit={handleSubmit} className="space-y-6">
                {currentStep === 1 && (
                  <>
                    {/* Role Selection */}
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-3">Register as</label>
                      <div className="grid grid-cols-3 gap-3">
                        {[
                          { value: "citizen", label: "Citizen" },
                          { value: "admin", label: "Officer" },
                          { value: "worker", label: "Worker" },
                        ].map((role) => (
                          <label key={role.value} className="cursor-pointer">
                            <input
                              type="radio"
                              name="role"
                              value={role.value}
                              checked={formData.role === role.value}
                              onChange={handleInputChange}
                              className="sr-only"
                            />
                            <div
                              className={`p-3 rounded-lg border-2 text-center text-sm font-medium transition-all ${
                                formData.role === role.value
                                  ? "border-green-500 bg-green-50 text-green-700"
                                  : "border-gray-200 text-gray-600 hover:border-gray-300"
                              }`}
                            >
                              {role.label}
                            </div>
                          </label>
                        ))}
                      </div>
                    </div>

                    {/* Full Name */}
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">Full Name *</label>
                      <div className="relative">
                        <User className="w-5 h-5 absolute left-4 top-4 text-gray-400" />
                        <input
                          type="text"
                          name="fullName"
                          value={formData.fullName}
                          onChange={handleInputChange}
                          className={`w-full pl-12 pr-4 py-4 border rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all ${
                            errors.fullName ? "border-red-300" : "border-gray-300"
                          }`}
                          placeholder="Enter your full name"
                        />
                      </div>
                      {errors.fullName && <p className="mt-2 text-sm text-red-600">{errors.fullName}</p>}
                    </div>

                    {/* Email */}
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">Email Address *</label>
                      <div className="relative">
                        <Mail className="w-5 h-5 absolute left-4 top-4 text-gray-400" />
                        <input
                          type="email"
                          name="email"
                          value={formData.email}
                          onChange={handleInputChange}
                          className={`w-full pl-12 pr-4 py-4 border rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all ${
                            errors.email ? "border-red-300" : "border-gray-300"
                          }`}
                          placeholder="Enter your email"
                        />
                      </div>
                      {errors.email && <p className="mt-2 text-sm text-red-600">{errors.email}</p>}
                    </div>

                    {/* Phone */}
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">Phone Number *</label>
                      <div className="relative">
                        <Phone className="w-5 h-5 absolute left-4 top-4 text-gray-400" />
                        <input
                          type="tel"
                          name="phone"
                          value={formData.phone}
                          onChange={handleInputChange}
                          className={`w-full pl-12 pr-4 py-4 border rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all ${
                            errors.phone ? "border-red-300" : "border-gray-300"
                          }`}
                          placeholder="Enter your phone number"
                        />
                      </div>
                      {errors.phone && <p className="mt-2 text-sm text-red-600">{errors.phone}</p>}
                    </div>

                    <button
                      type="button"
                      onClick={nextStep}
                      className="w-full bg-green-600 text-white py-4 px-4 rounded-xl font-semibold hover:bg-green-700 transition-all transform hover:scale-[1.02] active:scale-[0.98] flex items-center justify-center"
                    >
                      Continue
                      <ArrowRight className="w-5 h-5 ml-2" />
                    </button>
                  </>
                )}

                {currentStep === 2 && (
                  <>
                    {/* Address */}
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">Address</label>
                      <div className="relative">
                        <MapPin className="w-5 h-5 absolute left-4 top-4 text-gray-400" />
                        <input
                          type="text"
                          name="address"
                          value={formData.address}
                          onChange={handleInputChange}
                          className="w-full pl-12 pr-4 py-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
                          placeholder="Enter your address"
                        />
                      </div>
                    </div>

                    {/* Password */}
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">Password *</label>
                      <div className="relative">
                        <Lock className="w-5 h-5 absolute left-4 top-4 text-gray-400" />
                        <input
                          type={showPassword ? "text" : "password"}
                          name="password"
                          value={formData.password}
                          onChange={handleInputChange}
                          className={`w-full pl-12 pr-12 py-4 border rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all ${
                            errors.password ? "border-red-300" : "border-gray-300"
                          }`}
                          placeholder="Create a password"
                        />
                        <button
                          type="button"
                          onClick={() => setShowPassword(!showPassword)}
                          className="absolute right-4 top-4 text-gray-400 hover:text-gray-600 transition-colors"
                        >
                          {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                        </button>
                      </div>
                      {errors.password && <p className="mt-2 text-sm text-red-600">{errors.password}</p>}
                    </div>

                    {/* Confirm Password */}
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">Confirm Password *</label>
                      <div className="relative">
                        <Lock className="w-5 h-5 absolute left-4 top-4 text-gray-400" />
                        <input
                          type={showConfirmPassword ? "text" : "password"}
                          name="confirmPassword"
                          value={formData.confirmPassword}
                          onChange={handleInputChange}
                          className={`w-full pl-12 pr-12 py-4 border rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all ${
                            errors.confirmPassword ? "border-red-300" : "border-gray-300"
                          }`}
                          placeholder="Confirm your password"
                        />
                        <button
                          type="button"
                          onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                          className="absolute right-4 top-4 text-gray-400 hover:text-gray-600 transition-colors"
                        >
                          {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                        </button>
                      </div>
                      {errors.confirmPassword && <p className="mt-2 text-sm text-red-600">{errors.confirmPassword}</p>}
                    </div>

                    {/* Terms and Conditions */}
                    <div className="flex items-start">
                      <input
                        type="checkbox"
                        className="h-4 w-4 text-green-600 focus:ring-green-500 border-gray-300 rounded mt-1 transition-all"
                        required
                      />
                      <label className="ml-3 block text-sm text-gray-700">
                        I agree to the{" "}
                        <Link href="#" className="text-green-600 hover:text-green-500 font-medium transition-colors">
                          Terms and Conditions
                        </Link>{" "}
                        and{" "}
                        <Link href="#" className="text-green-600 hover:text-green-500 font-medium transition-colors">
                          Privacy Policy
                        </Link>
                      </label>
                    </div>

                    <div className="flex gap-4">
                      <button
                        type="button"
                        onClick={() => setCurrentStep(1)}
                        className="flex-1 bg-gray-600 text-white py-4 px-4 rounded-xl font-semibold hover:bg-gray-700 transition-all"
                      >
                        Back
                      </button>
                      <button
                        type="submit"
                        disabled={loading}
                        className={`flex-1 py-4 px-4 rounded-xl font-semibold text-white transition-all transform ${
                          loading
                            ? "bg-gray-400 cursor-not-allowed"
                            : "bg-green-600 hover:bg-green-700 hover:scale-[1.02] active:scale-[0.98]"
                        }`}
                      >
                        {loading ? (
                          <div className="flex items-center justify-center gap-3">
                            <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                            Creating...
                          </div>
                        ) : (
                          "Create Account"
                        )}
                      </button>
                    </div>
                  </>
                )}
              </form>

              {/* Login Link */}
              <div className="mt-8 text-center">
                <p className="text-sm text-gray-600">
                  Already have an account?{" "}
                  <Link href="/login" className="text-green-600 hover:text-green-500 font-semibold transition-colors">
                    Sign in here
                  </Link>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
