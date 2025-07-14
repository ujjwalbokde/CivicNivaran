"use client";
import React from "react";
import { useState, useEffect } from "react";
import Link from "next/link";
import { is } from "date-fns/locale";
import { Shield } from "lucide-react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
const Navbar = () => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);

  useEffect(() => {
    // Runs only on client side
    const storedToken = localStorage.getItem("token");
    setToken(storedToken);
  }, []);

  const [isadmin, setisadmin] = useState(false);
  const [isLogin, setisLogin] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const router = useRouter();

  useEffect(() => {
    // Simulate fetching user data
    const fetchUser = async () => {
      //localhost:5000/api/auth/profile
      try {
        const response = await fetch(
          "https://civicnivaran.onrender.com/api/auth/profile",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        const userData = await response.json();

        setUser(userData);
        setisadmin(userData.role === "officer");
        setisLogin(true);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };
    fetchUser();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    setUser(null);
    setisadmin(false);
    setisLogin(false);
    toast.success("Logout successful!");
    router.push("/login"); // Redirect to login page
  };
  return (
    <div>
      {/* Navigation */}
      <nav className="bg-white shadow-lg sticky top-0 z-50 border-b ">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <div className="flex-shrink-0 flex items-center">
                <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center mr-3">
                  <Shield className="w-6 h-6 text-white" />
                </div>
                <h1 className="text-2xl font-bold text-blue-600">
                  CivicNivaran
                </h1>
              </div>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-8">
              <Link
                href="/"
                className="text-gray-700 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium transition-colors"
              >
                Home
              </Link>
              <Link
                href="/track"
                className="text-gray-700 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium transition-colors"
              >
                Track Complaint
              </Link>
              {isadmin && (
                <Link
                  href="/admin"
                  className="text-gray-700 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium transition-colors"
                >
                  Dashboard
                </Link>
              )}
              <Link
                href="/feedback"
                className="text-gray-700 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium transition-colors"
              >
                Feedback
              </Link>
              {isLogin ? (
                <>
                  <Link
                    href="/profile"
                    className=" text-gray-700 hover:text-blue-600 px-6 py-2 rounded-lg text-sm font-medium transition-colors"
                  >
                    My Account
                  </Link>
                  <Link
                    href="/login"
                    onClick={handleLogout}
                    className="bg-blue-600 text-white px-6 py-2 rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors"
                  >
                    Logout
                  </Link>
                </>
              ) : (
                <Link
                  href="/login"
                  className="bg-blue-600 text-white px-6 py-2 rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors"
                >
                  Login
                </Link>
              )}
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden">
              <button
                className="text-gray-700 hover:text-blue-600 p-2"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              >
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              </button>
            </div>
            {isMobileMenuOpen && (
              <div className="md:hidden fixed top-16 left-0 right-0 z-50 bg-white shadow-md border-t border-gray-200">
                <div className="flex flex-col px-6 py-4 space-y-4">
                  <Link
                    href="/"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="text-lg text-gray-800 hover:text-blue-600 font-medium"
                  >
                    Home
                  </Link>
                  <Link
                    href="/track"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="text-lg text-gray-800 hover:text-blue-600 font-medium"
                  >
                    Track Complaint
                  </Link>
                  {isadmin && (
                    <Link
                      href="/admin"
                      onClick={() => setIsMobileMenuOpen(false)}
                      className="text-lg text-gray-800 hover:text-blue-600 font-medium"
                    >
                      Dashboard
                    </Link>
                  )}
                  <Link
                    href="/feedback"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="text-lg text-gray-800 hover:text-blue-600 font-medium"
                  >
                    Feedback
                  </Link>
                  {isLogin ? (
                    <>
                      <Link
                        href="/profile"
                        onClick={() => setIsMobileMenuOpen(false)}
                        className="text-lg text-gray-800 hover:text-blue-600 font-medium"
                      >
                        My Account
                      </Link>
                      <button
                        onClick={() => {
                          handleLogout();
                          setIsMobileMenuOpen(false);
                        }}
                        className="w-full text-left text-white bg-blue-600 hover:bg-blue-700 py-2 px-4 rounded-md text-base font-medium"
                      >
                        Logout
                      </button>
                    </>
                  ) : (
                    <Link
                      href="/login"
                      onClick={() => setIsMobileMenuOpen(false)}
                      className="bg-blue-600 text-white py-2 px-4 rounded-md text-base font-medium"
                    >
                      Login
                    </Link>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
