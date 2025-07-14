"use client"
import { useState } from "react"
import Link from "next/link"
import { User, Lock, Eye, EyeOff, Shield, CheckCircle } from 'lucide-react'
import { useRouter } from 'next/navigation'
import toast from 'react-hot-toast'

export default function LoginPage() {
  const router = useRouter()
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  })
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  
  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    setLoading(true)

    // Simulate login process
    setTimeout(() => {
      console.log("Login attempt:", formData)
    //http://localhost:5000/api/auth/login
      // Make API call to login user
        fetch(`https://civicnivaran.onrender.com/api/auth/login`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        })
          .then((response) => {
            if (!response.ok) {
              throw new Error("Network response was not ok")
            }
            return response.json()
          })
        .then((data) => {
          console.log("Login successful:", data)
          toast.success("Login successful!");
          // Store token in localStorage
          localStorage.setItem("token", data.token)
          // Redirect to login page
          let userRole = data.user.role ;
          if (userRole === "citizen") {
            router.push("/")
          } else if (userRole === "officer") {
            router.push("/admin")
          }
           else if (userRole === "worker") {
            router.push("/worker")
          } else {
            console.error("Unknown user role:", userRole)
          }
        })
        .catch((error) => {
          console.error("There was a problem with the fetch operation:", error)
          toast.error("Login failed. Please try again.")
        })
      setLoading(false)
    }, 1500)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50">
      <div className="flex min-h-screen">
        {/* Left Side - Branding */}
        <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-blue-600 to-blue-700 p-12 flex-col justify-between">
          <div>
            <div className="flex items-center mb-8">
              <div className="w-12 h-12 bg-white rounded-lg flex items-center justify-center mr-4">
                <Shield className="w-8 h-8 text-blue-600" />
              </div>
              <h1 className="text-3xl font-bold text-white">CivicNivaran</h1>
            </div>
            
            <div className="mb-12">
              <h2 className="text-4xl font-bold text-white mb-6 leading-tight">
                Welcome Back to Your
                <span className="block">Civic Platform</span>
              </h2>
              <p className="text-blue-100 text-lg leading-relaxed">
                Continue making a difference in your community. Track your complaints, 
                manage resolutions, and help build better public services.
              </p>
            </div>
            
            <div className="space-y-6">
              <div className="flex items-center text-white">
                <CheckCircle className="w-6 h-6 mr-4 text-green-300" />
                <span>Secure and encrypted login</span>
              </div>
              <div className="flex items-center text-white">
                <CheckCircle className="w-6 h-6 mr-4 text-green-300" />
                <span>Real-time complaint tracking</span>
              </div>
              <div className="flex items-center text-white">
                <CheckCircle className="w-6 h-6 mr-4 text-green-300" />
                <span>Direct communication with officials</span>
              </div>
            </div>
          </div>
          
          <div className="text-blue-100 text-sm">
            <p>&copy; 2024 CivicNivaran. Making governance transparent.</p>
          </div>
        </div>

        {/* Right Side - Login Form */}
        <div className="w-full lg:w-1/2 flex items-center justify-center p-8">
          <div className="max-w-md w-full">
            {/* Mobile Logo */}
            <div className="lg:hidden text-center mb-8">
              <div className="flex items-center justify-center mb-4">
                <div className="w-12 h-12 bg-blue-600 rounded-lg flex items-center justify-center mr-3">
                  <Shield className="w-8 h-8 text-white" />
                </div>
                <h1 className="text-3xl font-bold text-blue-600">CivicNivaran</h1>
              </div>
            </div>

            <div className="bg-white rounded-2xl shadow-xl p-8 border">
              {/* Header */}
              <div className="text-center mb-8">
                <h2 className="text-3xl font-bold text-gray-900 mb-2">Sign In</h2>
                <p className="text-gray-600">Access your grievance management portal</p>
              </div>

              {/* Login Form */}
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Role Selection */}
                {/* <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-3">Login as</label>
                  <div className="grid grid-cols-3 gap-3">
                    {[
                      { value: "citizen", label: "Citizen" },
                      { value: "admin", label: "Officer" },
                      { value: "worker", label: "Worker" }
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
                        <div className={`p-3 rounded-lg border-2 text-center text-sm font-medium transition-all ${
                          formData.role === role.value
                            ? "border-blue-500 bg-blue-50 text-blue-700"
                            : "border-gray-200 text-gray-600 hover:border-gray-300"
                        }`}>
                          {role.label}
                        </div>
                      </label>
                    ))}
                  </div>
                </div> */}

                {/* Email */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Email Address</label>
                  <div className="relative">
                    <User className="w-5 h-5 absolute left-4 top-4 text-gray-400" />
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      className="w-full pl-12 pr-4 py-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                      placeholder="Enter your email"
                      required
                    />
                  </div>
                </div>

                {/* Password */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Password</label>
                  <div className="relative">
                    <Lock className="w-5 h-5 absolute left-4 top-4 text-gray-400" />
                    <input
                      type={showPassword ? "text" : "password"}
                      name="password"
                      value={formData.password}
                      onChange={handleInputChange}
                      className="w-full pl-12 pr-12 py-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                      placeholder="Enter your password"
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-4 top-4 text-gray-400 hover:text-gray-600 transition-colors"
                    >
                      {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                    </button>
                  </div>
                </div>

                {/* Remember Me & Forgot Password */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <input 
                      type="checkbox" 
                      className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded transition-all" 
                    />
                    <label className="ml-3 block text-sm text-gray-700">Remember me</label>
                  </div>
                  <Link href="#" className="text-sm text-blue-600 hover:text-blue-500 font-medium transition-colors">
                    Forgot password?
                  </Link>
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={loading}
                  className={`w-full py-4 px-4 rounded-xl font-semibold text-white transition-all transform ${
                    loading 
                      ? "bg-gray-400 cursor-not-allowed" 
                      : "bg-blue-600 hover:bg-blue-700 hover:scale-[1.02] active:scale-[0.98]"
                  }`}
                >
                  {loading ? (
                    <div className="flex items-center justify-center gap-3">
                      <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                      Signing in...
                    </div>
                  ) : (
                    "Sign In"
                  )}
                </button>
              </form>

              {/* Demo Credentials */}
              <div className="mt-8 p-4 bg-blue-50 rounded-xl border border-blue-200">
                <h4 className="text-sm font-semibold text-blue-900 mb-3">Demo Credentials:</h4>
                <div className="text-xs text-blue-700 space-y-2">
                  <div className="flex justify-between">
                    <span className="font-medium">Citizen:</span>
                    <span>citizen@demo.com / password123</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-medium">Officer:</span>
                    <span>admin@demo.com / admin123</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-medium">Worker:</span>
                    <span>worker@demo.com / worker123</span>
                  </div>
                </div>
              </div>

              {/* Register Link */}
              <div className="mt-8 text-center">
                <p className="text-sm text-gray-600">
                  Don't have an account?{" "}
                  <Link href="/register" className="text-blue-600 hover:text-blue-500 font-semibold transition-colors">
                    Create one here
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
