"use client"
import { useState } from "react"
import Link from "next/link"
import { BarChart3, TrendingUp, MapPin, Calendar } from "lucide-react"

export default function AnalyticsDashboard() {
  const [timeFilter, setTimeFilter] = useState("month")
  const [departmentFilter, setDepartmentFilter] = useState("all")

  // Mock analytics data
  const stats = {
    totalComplaints: 2547,
    resolvedComplaints: 2267,
    avgResolutionTime: 3.2,
    satisfactionScore: 4.6,
  }

  const departmentData = [
    { name: "Water Supply", complaints: 645, resolved: 578, percentage: 89.6 },
    { name: "Electricity", complaints: 523, resolved: 487, percentage: 93.1 },
    { name: "Sanitation", complaints: 412, resolved: 389, percentage: 94.4 },
    { name: "Roads & Transport", complaints: 398, resolved: 356, percentage: 89.4 },
    { name: "Public Health", complaints: 289, resolved: 267, percentage: 92.4 },
    { name: "Others", complaints: 280, resolved: 190, percentage: 67.9 },
  ]

  const monthlyTrend = [
    { month: "Jan", submitted: 180, resolved: 165 },
    { month: "Feb", submitted: 220, resolved: 210 },
    { month: "Mar", submitted: 195, resolved: 185 },
    { month: "Apr", submitted: 240, resolved: 225 },
    { month: "May", submitted: 210, resolved: 200 },
    { month: "Jun", submitted: 185, resolved: 175 },
  ]

  const areaData = [
    { area: "Sector 15", complaints: 89, severity: "high" },
    { area: "Green Park", complaints: 67, severity: "medium" },
    { area: "Market Street", complaints: 54, severity: "medium" },
    { area: "Highway Road", complaints: 43, severity: "low" },
    { area: "Residential Zone A", complaints: 38, severity: "low" },
  ]

  const getSeverityColor = (severity) => {
    switch (severity) {
      case "high":
        return "bg-red-500"
      case "medium":
        return "bg-yellow-500"
      case "low":
        return "bg-green-500"
      default:
        return "bg-gray-500"
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation */}
      <nav className="bg-white shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <Link href="/" className="text-2xl font-bold text-blue-600">
                CivicNivaran Analytics
              </Link>
            </div>
            <div className="flex items-center space-x-4">
              <Link href="/admin" className="text-gray-700 hover:text-blue-600">
                Admin Dashboard
              </Link>
              <Link href="/" className="text-gray-700 hover:text-blue-600">
                Home
              </Link>
            </div>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Analytics Dashboard</h1>
            <p className="text-gray-600 mt-2">Comprehensive insights into complaint management</p>
          </div>

          {/* Filters */}
          <div className="flex gap-4">
            <select
              value={timeFilter}
              onChange={(e) => setTimeFilter(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="week">This Week</option>
              <option value="month">This Month</option>
              <option value="quarter">This Quarter</option>
              <option value="year">This Year</option>
            </select>
            <select
              value={departmentFilter}
              onChange={(e) => setDepartmentFilter(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="all">All Departments</option>
              <option value="water">Water Supply</option>
              <option value="electricity">Electricity</option>
              <option value="sanitation">Sanitation</option>
              <option value="roads">Roads & Transport</option>
            </select>
          </div>
        </div>

        {/* Key Metrics */}
        <div className="grid md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white p-6 rounded-lg shadow">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Total Complaints</p>
                <p className="text-3xl font-bold text-gray-900">{stats.totalComplaints.toLocaleString()}</p>
                <p className="text-sm text-green-600 flex items-center gap-1 mt-1">
                  <TrendingUp className="w-3 h-3" />
                  +12% from last month
                </p>
              </div>
              <BarChart3 className="w-8 h-8 text-blue-600" />
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Resolution Rate</p>
                <p className="text-3xl font-bold text-green-600">
                  {((stats.resolvedComplaints / stats.totalComplaints) * 100).toFixed(1)}%
                </p>
                <p className="text-sm text-green-600 flex items-center gap-1 mt-1">
                  <TrendingUp className="w-3 h-3" />
                  +3% from last month
                </p>
              </div>
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                <span className="text-green-600 font-bold">✓</span>
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Avg Resolution Time</p>
                <p className="text-3xl font-bold text-blue-600">{stats.avgResolutionTime} days</p>
                <p className="text-sm text-green-600 flex items-center gap-1 mt-1">
                  <TrendingUp className="w-3 h-3" />
                  -0.5 days improvement
                </p>
              </div>
              <Calendar className="w-8 h-8 text-blue-600" />
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Satisfaction Score</p>
                <p className="text-3xl font-bold text-yellow-600">{stats.satisfactionScore}/5</p>
                <p className="text-sm text-green-600 flex items-center gap-1 mt-1">
                  <TrendingUp className="w-3 h-3" />
                  +0.2 from last month
                </p>
              </div>
              <div className="flex">
                {[1, 2, 3, 4, 5].map((star) => (
                  <span
                    key={star}
                    className={`text-lg ${star <= Math.floor(stats.satisfactionScore) ? "text-yellow-400" : "text-gray-300"}`}
                  >
                    ★
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Charts Section */}
        <div className="grid lg:grid-cols-2 gap-8 mb-8">
          {/* Department Performance */}
          <div className="bg-white p-6 rounded-lg shadow">
            <h3 className="text-lg font-semibold mb-6">Complaints by Department</h3>
            <div className="space-y-4">
              {departmentData.map((dept, index) => (
                <div key={index} className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium text-gray-700">{dept.name}</span>
                    <span className="text-sm text-gray-600">{dept.complaints} complaints</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-blue-600 h-2 rounded-full"
                      style={{
                        width: `${(dept.complaints / Math.max(...departmentData.map((d) => d.complaints))) * 100}%`,
                      }}
                    ></div>
                  </div>
                  <div className="flex justify-between text-xs text-gray-500">
                    <span>Resolved: {dept.resolved}</span>
                    <span>{dept.percentage}% resolution rate</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Monthly Trend */}
          <div className="bg-white p-6 rounded-lg shadow">
            <h3 className="text-lg font-semibold mb-6">Monthly Trend</h3>
            <div className="space-y-4">
              {monthlyTrend.map((month, index) => (
                <div key={index} className="flex items-center justify-between">
                  <span className="text-sm font-medium text-gray-700 w-12">{month.month}</span>
                  <div className="flex-1 mx-4">
                    <div className="flex gap-1">
                      <div className="flex-1 bg-gray-200 rounded h-6 flex items-center">
                        <div
                          className="bg-blue-500 h-full rounded"
                          style={{ width: `${(month.submitted / 250) * 100}%` }}
                        ></div>
                        <span className="text-xs text-white ml-2">{month.submitted}</span>
                      </div>
                      <div className="flex-1 bg-gray-200 rounded h-6 flex items-center">
                        <div
                          className="bg-green-500 h-full rounded"
                          style={{ width: `${(month.resolved / 250) * 100}%` }}
                        ></div>
                        <span className="text-xs text-white ml-2">{month.resolved}</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
              <div className="flex justify-center gap-6 mt-4 text-xs">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-blue-500 rounded"></div>
                  <span>Submitted</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-green-500 rounded"></div>
                  <span>Resolved</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Area Heatmap */}
        <div className="bg-white p-6 rounded-lg shadow">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold">Complaint Heatmap by Area</h3>
            <MapPin className="w-5 h-5 text-gray-400" />
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h4 className="font-medium mb-4">Top Areas by Complaint Volume</h4>
              <div className="space-y-3">
                {areaData.map((area, index) => (
                  <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div className="flex items-center gap-3">
                      <div className={`w-3 h-3 rounded-full ${getSeverityColor(area.severity)}`}></div>
                      <span className="font-medium">{area.area}</span>
                    </div>
                    <span className="text-sm text-gray-600">{area.complaints} complaints</span>
                  </div>
                ))}
              </div>

              <div className="mt-6">
                <h5 className="text-sm font-medium mb-2">Severity Legend</h5>
                <div className="flex gap-4 text-xs">
                  <div className="flex items-center gap-1">
                    <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                    <span>High (80+ complaints)</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                    <span>Medium (40-79)</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <span>Low (0-39)</span>
                  </div>
                </div>
              </div>
            </div>

            <div>
              <h4 className="font-medium mb-4">Geographic Distribution</h4>
              <div className="bg-gray-100 rounded-lg h-64 flex items-center justify-center">
                <div className="text-center text-gray-500">
                  <MapPin className="w-12 h-12 mx-auto mb-2" />
                  <p>Interactive Map Placeholder</p>
                  <p className="text-sm">Complaint density visualization</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
