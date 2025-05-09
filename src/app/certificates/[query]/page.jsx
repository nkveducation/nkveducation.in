"use client"

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
  FiHome,
  FiUsers,
  FiDollarSign,
  FiFileText,
  FiX,
  FiMenu,
  FiArrowLeft,
  FiCheckCircle
} from 'react-icons/fi';
import { FaChalkboardTeacher } from 'react-icons/fa';
import { useParams } from 'next/navigation';
import Link from 'next/link';

export default function CertificateSearchPage() {
  const params = useParams();
  const query = decodeURIComponent(params?.query || '');
  const [results, setResults] = useState([]);
  const [teacher, setTeacher] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  // Check if mobile on mount and resize
  useEffect(() => {
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkIfMobile();
    window.addEventListener('resize', checkIfMobile);
    return () => window.removeEventListener('resize', checkIfMobile);
  }, []);

  // Close sidebar when clicking outside or on mobile
  useEffect(() => {
    const handleClickOutside = (event) => {
      const sidebar = document.getElementById('sidebar');
      if (sidebarOpen && sidebar && !sidebar.contains(event.target)) {
        setSidebarOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [sidebarOpen]);

  // Auto-close sidebar on mobile when route changes
  useEffect(() => {
    if (isMobile) {
      setSidebarOpen(false);
    }
  }, [query, isMobile]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(`/api/teachers/search?query=${query}`);
        const data = await res.json();
        if (!res.ok) throw new Error(data.message || 'Failed to fetch data');
        setResults(data.data || []);
        setTeacher(data.data[0]?.teacher || {});
      } catch (err) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };

    if (query) {
      fetchData();
    } else {
      setIsLoading(false);
      setError('Invalid query');
    }
  }, [query]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50">
        <div className="p-6 max-w-md w-full bg-white rounded-lg shadow-md text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading certificate data...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50">
        <div className="p-6 max-w-md w-full bg-white rounded-lg shadow-md">
          <div className="text-red-500 mb-4 text-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <h3 className="text-lg font-medium text-gray-800 mb-2 text-center">Error loading data</h3>
          <p className="text-gray-600 mb-4 text-center">{error}</p>
          <Link
            href="/team"
            className="flex items-center justify-center w-full px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
          >
            <FiArrowLeft className="mr-2" />
            Back to search
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar - Always visible on desktop, toggleable on mobile */}
      {(!isMobile || sidebarOpen) && (
        <motion.div
          id="sidebar"
          initial={isMobile ? { x: -300 } : false}
          animate={isMobile ? { x: sidebarOpen ? 0 : -300 } : false}
          transition={{ type: 'spring', stiffness: 300, damping: 30 }}
          className={`fixed z-20 h-full w-64 bg-gradient-to-b from-blue-700 to-blue-800 shadow-xl md:relative ${isMobile ? '' : 'translate-x-0'}`}
        >
          <div className="p-4 h-full flex flex-col">
            {/* Logo and Close Button */}
            <div className="mb-6 flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <img
                  src="/logo.png"
                  alt="Company Logo"
                  className="h-10 w-10 rounded-full object-cover"
                  onError={(e) => (e.target.src = "/placeholder-logo.png")}
                />
                <h1 className="text-xl font-bold text-white">EduCert</h1>
              </div>
              {isMobile && (
                <button
                  onClick={() => setSidebarOpen(false)}
                  className="text-white"
                >
                  <FiX size={24} />
                </button>
              )}
            </div>

            {/* Teacher Profile */}
            <div className="mb-6 flex flex-col items-center">
              {teacher.photo ? (
                <img
                  src={teacher.photo}
                  alt={teacher.fullName || 'Profile'}
                  className="h-24 w-24 rounded-full object-cover border-4 border-white mb-3 shadow-md"
                  onError={(e) => {
                    e.target.src = "/placeholder-profile.png";
                    e.target.className = "h-24 w-24 rounded-full object-cover border-4 border-white bg-gray-200 mb-3 shadow-md";
                  }}
                />
              ) : (
                <div className="flex h-24 w-24 items-center justify-center rounded-full bg-gray-200 border-4 border-white mb-3 shadow-md">
                  <FaChalkboardTeacher className="text-3xl text-gray-500" />
                </div>
              )}
              <h3 className="text-lg font-semibold text-white text-center">{teacher.fullName || 'Teacher'}</h3>
              <p className="text-sm text-blue-100 mt-1">{teacher.rank || 'Teacher'}</p>
              <div className="flex items-center mt-2">
                <span className="h-2 w-2 rounded-full bg-green-400 mr-2"></span>
                <span className="text-xs text-blue-100">Active</span>
              </div>
            </div>

            {/* Navigation */}
            <nav className="flex-1 space-y-1">
              {[
                { name: 'Home', href: '/home', icon: <FiHome size={18} /> },
                { name: 'Our Students', href: `/certificates/${encodeURIComponent(query)}/our-students`, icon: <FiUsers size={18} /> },
                { name: 'Our Income', href: `/certificates/${encodeURIComponent(query)}/our-income`, icon: <FiDollarSign size={18} /> },
                { name: 'Active Registration Plan', href: `/certificates/${encodeURIComponent(query)}/active-registration-plan`, icon: <FiFileText size={18} /> },

              ].map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className="flex items-center space-x-3 rounded-lg px-4 py-3 text-blue-100 hover:bg-blue-600 hover:text-white transition-colors"
                >
                  <span className="text-lg">{item.icon}</span>
                  <span>{item.name}</span>
                </Link>
              ))}
            </nav>
          </div>
        </motion.div>
      )}

      {/* Main Content */}
      <div className="flex-1 overflow-y-auto">
        {/* Mobile header with hamburger menu */}
        {isMobile && (
          <header className="flex items-center justify-between bg-white p-4 shadow-sm">
            <button
              onClick={() => setSidebarOpen(true)}
              className="text-gray-600 focus:outline-none"
            >
              <FiMenu size={24} />
            </button>

            <h1 className="text-xl font-bold text-gray-800">Certificate Search</h1>
            <div className="w-6"></div> {/* Spacer for alignment */}
          </header>
        )}

        <main className="p-4 md:p-6">
          <section>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
              <div className="mb-6">
                <div className="flex items-center">
                  <Link
                    href="/team"
                    className="mr-2 flex items-center text-blue-600 hover:underline"
                  >
                    <FiArrowLeft className="mr-1" />
                  </Link>
                  <h1 className="text-2xl font-bold text-gray-800">Certificate Search Results</h1>
                </div>
                <p className="text-gray-600 mt-1">Showing results for: <span className="font-medium">{query}</span></p>
              </div>

              {results.length > 0 ? (
                <div className="space-y-6">
                  {results.map(({ teacher }) => (
                    <motion.div
                      key={teacher._id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="rounded-lg bg-white p-6 shadow-sm border border-gray-100"
                    >
                      <div className="flex flex-col md:flex-row md:space-x-6">
                        <div className="mb-4 md:mb-0 flex justify-center md:block">
                          {teacher.photo ? (
                            <img
                              src={teacher.photo}
                              onError={(e) => (e.target.src = "/placeholder.png")}
                              alt={teacher.fullName}
                              className="h-32 w-32 rounded-full object-cover border-4 border-blue-100"
                            />
                          ) : (
                            <div className="h-32 w-32 rounded-full bg-gray-200 border-4 border-blue-100 flex items-center justify-center">
                              <FaChalkboardTeacher className="text-4xl text-gray-500" />
                            </div>
                          )}
                        </div>

                        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 flex-1">
                          {[
                            ['Full Name', teacher.fullName],
                            ['Teacher ID', teacher.teacherId],
                            ['Email', teacher.email],
                            ['Phone No', teacher.phoneNo],
                            ['DOB', teacher.dob],
                            ['City', teacher.city],
                            ['State', teacher.state],
                            ['Rank', teacher.rank],
                            ['Sponsor Code', teacher.sponsorcode],
                            ['Business Name', teacher.businessname],
                            ['Business Address', teacher.businessaddress],
                          ].map(([label, value]) => (
                            <div key={label} className="border-b border-gray-100 pb-2">
                              <p className="text-sm font-medium text-gray-500">{label}</p>
                              <p className="text-gray-800 break-words">{value || '—'}</p>
                            </div>
                          ))}
                        </div>
                      </div>

                      <div className="mt-4 flex items-center">
                        <div className="flex items-center rounded-full bg-green-100 px-3 py-1">
                          <FiCheckCircle className="mr-2 text-green-600" />
                          <span className="text-sm font-medium text-green-600">Verified</span>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center rounded-lg bg-white p-8 text-center shadow-sm border border-gray-100">
                  <div className="bg-blue-100 p-4 rounded-full mb-4">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <h3 className="mb-2 text-xl font-semibold text-gray-800">No certificates found</h3>
                  <p className="mb-4 text-gray-600">No results found for "{query}"</p>
                  <Link
                    href="/team"
                    className="flex items-center justify-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
                  >
                    <FiArrowLeft className="mr-2" />
                    Back to search
                  </Link>
                </div>
              )}
            </motion.div>
          </section>
        </main>
      </div>
    </div>
  );
}