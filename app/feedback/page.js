"use client"
import { useState } from "react"
import Link from "next/link"
import { Star, MessageSquare, Award, ThumbsUp } from "lucide-react"

export default function FeedbackPage() {
  const [rating, setRating] = useState(0)
  const [hoverRating, setHoverRating] = useState(0)
  const [feedback, setFeedback] = useState("")
  const [complaintId, setComplaintId] = useState("")
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault()
    if (rating === 0 || !feedback.trim()) return

    // In real app, this would submit to backend
    console.log("Feedback submitted:", { complaintId, rating, feedback })
    setSubmitted(true)
  }

  const resetForm = () => {
    setRating(0)
    setHoverRating(0)
    setFeedback("")
    setComplaintId("")
    setSubmitted(false)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-green-50">
      {/* Navigation */}
      <nav className="bg-white shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <Link href="/" className="text-2xl font-bold text-blue-600">
                CivicNivaran
              </Link>
            </div>
            <div className="flex items-center space-x-4">
              <Link href="/" className="text-gray-700 hover:text-blue-600">
                Home
              </Link>
              <Link href="/track" className="text-gray-700 hover:text-blue-600">
                Track
              </Link>
              <Link href="/submit" className="text-gray-700 hover:text-blue-600">
                Submit
              </Link>
            </div>
          </div>
        </div>
      </nav>

      <div className="max-w-2xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        {!submitted ? (
          <div className="bg-white rounded-lg shadow-lg p-8">
            <div className="text-center mb-8">
              <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <MessageSquare className="w-8 h-8 text-blue-600" />
              </div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">Share Your Feedback</h1>
              <p className="text-gray-600">Help us improve our services by sharing your experience</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Complaint ID (Optional)</label>
                <input
                  type="text"
                  value={complaintId}
                  onChange={(e) => setComplaintId(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Enter your complaint ID"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-4">Rate Our Service *</label>
                <div className="flex justify-center gap-2 mb-4">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      type="button"
                      onClick={() => setRating(star)}
                      onMouseEnter={() => setHoverRating(star)}
                      onMouseLeave={() => setHoverRating(0)}
                      className="transition-colors"
                    >
                      <Star
                        className={`w-10 h-10 ${
                          star <= (hoverRating || rating) ? "text-yellow-400 fill-current" : "text-gray-300"
                        }`}
                      />
                    </button>
                  ))}
                </div>
                <div className="text-center">
                  <span className="text-sm text-gray-600">
                    {rating === 0 && "Please rate our service"}
                    {rating === 1 && "Poor - Needs significant improvement"}
                    {rating === 2 && "Fair - Could be better"}
                    {rating === 3 && "Good - Satisfactory service"}
                    {rating === 4 && "Very Good - Exceeded expectations"}
                    {rating === 5 && "Excellent - Outstanding service"}
                  </span>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Your Comments *</label>
                <textarea
                  value={feedback}
                  onChange={(e) => setFeedback(e.target.value)}
                  rows={5}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Share your experience, suggestions, or any issues you faced..."
                  required
                />
              </div>

              <button
                type="submit"
                disabled={rating === 0 || !feedback.trim()}
                className={`w-full py-4 px-6 rounded-lg font-semibold text-lg transition-colors ${
                  rating > 0 && feedback.trim()
                    ? "bg-blue-600 text-white hover:bg-blue-700"
                    : "bg-gray-300 text-gray-500 cursor-not-allowed"
                }`}
              >
                Submit Feedback
              </button>
            </form>
          </div>
        ) : (
          <div className="bg-white rounded-lg shadow-lg p-8 text-center">
            <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
              <ThumbsUp className="w-8 h-8 text-green-600" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Thank You for Your Feedback!</h2>
            <p className="text-gray-600 mb-6">Your feedback helps us improve our services and serve you better.</p>

            <div className="bg-blue-50 rounded-lg p-6 mb-6">
              <div className="flex items-center justify-center gap-2 mb-2">
                <Award className="w-6 h-6 text-blue-600" />
                <span className="font-semibold text-blue-900">Reward Points Earned!</span>
              </div>
              <p className="text-blue-700">You've earned 50 points for providing feedback</p>
            </div>

            <div className="space-y-3">
              <button
                onClick={resetForm}
                className="w-full bg-blue-600 text-white py-3 px-6 rounded-lg hover:bg-blue-700 transition-colors"
              >
                Submit Another Feedback
              </button>
              <Link
                href="/"
                className="block w-full bg-gray-600 text-white py-3 px-6 rounded-lg hover:bg-gray-700 transition-colors"
              >
                Back to Home
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
