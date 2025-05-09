'use client';

import { useParams } from 'next/navigation';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { 
  FiHome, 
  FiUsers, 
  FiDollarSign, 
  FiFileText,
  FiX,
  FiMenu,
  FiArrowLeft,
  FiCheckCircle,
  FiUser,
  FiChevronRight
} from 'react-icons/fi';

export default function TeacherStudentsPage() {
  const params = useParams();
  const query = decodeURIComponent(params?.query || '');
  const [teacher, setTeacher] = useState({});
  const [students, setStudents] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    if (!isClient) return;

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
  }, [sidebarOpen, isClient]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(`/api/teachers/search?query=${query}`);
        const data = await res.json();
        if (!res.ok) throw new Error(data.message || 'Failed to fetch data');
        
        if (data.data && data.data.length > 0) {
          setTeacher(data.data[0].teacher || {});
          setStudents(data.data[0].students || []);
        }
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
          <p className="text-gray-600">Loading student data...</p>
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
    <div className="flex h-screen bg-gray-50 overflow-hidden">
      {/* Desktop Sidebar - Always visible on desktop */}
      <div 
        id="sidebar"
        className="hidden md:flex md:flex-shrink-0 w-64 h-full bg-gradient-to-b from-blue-700 to-blue-800 shadow-lg flex-col"
      >
        <div className="p-4 h-full flex flex-col">
          {/* Logo */}
          <div className="mb-8 flex items-center space-x-2">
            <img 
              src="/logo.png"
              alt="Company Logo"
              className="h-10 w-10 rounded-full object-cover"
              onError={(e) => (e.target.src = "/placeholder-logo.png")}
            />
            <h1 className="text-xl font-bold text-white">NKV Education</h1>
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
                <FiUser className="text-3xl text-gray-500" />
              </div>
            )}
            <h3 className="text-lg font-semibold text-white text-center">{teacher.fullName || 'Teacher'}</h3>
            <p className="text-sm text-blue-100 mt-1">{teacher.rank || 'Teacher'}</p>
            <div className="flex items-center mt-2">
              <span className="h-2 w-2 rounded-full bg-green-400 mr-2"></span>
              <span className="text-xs text-blue-100">Active</span>
            </div>
          </div>

          {/* Main Navigation */}
          <nav className="space-y-1">
            {[
              { name: 'Home', href: '/home', icon: <FiHome size={18} /> },
              { name: 'Our Students', href: `/certificates/${query}/our-students`, icon: <FiUsers size={18} />, active: true },
              { name: 'Our Income', href: '/our-income', icon: <FiDollarSign size={18} /> },
              { name: 'Active Registration Plan', href: '/active-registration-plan', icon: <FiFileText size={18} /> },
            ].map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className={`flex items-center space-x-3 rounded-lg px-4 py-3 text-sm font-medium transition-colors ${
                  item.active 
                    ? 'bg-white text-blue-700 shadow-sm' 
                    : 'text-blue-100 hover:bg-blue-600 hover:text-white'
                }`}
              >
                <span className="text-lg">{item.icon}</span>
                <span>{item.name}</span>
              </Link>
            ))}
          </nav>
        </div>
      </div>

      {/* Mobile Sidebar - Only render on client side */}
      {isClient && (
        <AnimatePresence>
          {sidebarOpen && (
            <>
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.5 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 bg-black z-20 md:hidden"
                onClick={() => setSidebarOpen(false)}
              />
              <motion.div
                id="sidebar"
                initial={{ x: -300 }}
                animate={{ x: 0 }}
                exit={{ x: -300 }}
                transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                className="fixed z-30 h-full w-64 bg-gradient-to-b from-blue-700 to-blue-800 shadow-lg"
              >
                <div className="p-4 h-full flex flex-col">
                  <div className="mb-8 flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <img 
                        src="/logo.png"
                        alt="Company Logo"
                        className="h-10 w-10 rounded-full object-cover"
                        onError={(e) => (e.target.src = "/placeholder-logo.png")}
                      />
                      <h1 className="text-xl font-bold text-white">NKV Education</h1>
                    </div>
                    <button 
                      onClick={() => setSidebarOpen(false)}
                      className="text-white"
                    >
                      <FiX size={24} />
                    </button>
                  </div>
                  
                  {/* Mobile version of teacher profile */}
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
                        <FiUser className="text-3xl text-gray-500" />
                      </div>
                    )}
                    <h3 className="text-lg font-semibold text-white text-center">{teacher.fullName || 'Teacher'}</h3>
                    <p className="text-sm text-blue-100 mt-1">{teacher.rank || 'Teacher'}</p>
                  </div>

                  {/* Mobile Navigation */}
                  <nav className="space-y-1">
                    {[
                      { name: 'Home', href: '/home', icon: <FiHome size={18} /> },
                      { name: 'Our Students', href: `/certificates/${query}/our-students`, icon: <FiUsers size={18} />, active: true },
                      { name: 'Our Income', href: '/our-income', icon: <FiDollarSign size={18} /> },
                      { name: 'Active Registration Plan', href: '/active-registration-plan', icon: <FiFileText size={18} /> },
                    ].map((item) => (
                      <Link
                        key={item.name}
                        href={item.href}
                        className={`flex items-center space-x-3 rounded-lg px-4 py-3 text-sm font-medium transition-colors ${
                          item.active 
                            ? 'bg-white text-blue-700 shadow-sm' 
                            : 'text-blue-100 hover:bg-blue-600 hover:text-white'
                        }`}
                      >
                        <span className="text-lg">{item.icon}</span>
                        <span>{item.name}</span>
                      </Link>
                    ))}
                  </nav>
                </div>
              </motion.div>
            </>
          )}
        </AnimatePresence>
      )}

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <header className="bg-white shadow-sm">
          <div className="px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
            <div className="flex items-center">
              <button 
                onClick={() => setSidebarOpen(!sidebarOpen)}
                className="mr-4 text-gray-500 hover:text-gray-600 focus:outline-none md:hidden"
              >
                <FiMenu size={24} />
              </button>
              <h1 className="text-xl font-bold text-gray-800">Our Students</h1>
            </div>
            
            <div className="flex items-center space-x-4">
              <Link 
                href={`/certificates/${query}`} 
                className="hidden md:flex items-center text-blue-600 hover:text-blue-800"
              >
                <FiArrowLeft className="mr-1" />
                Back to Teacher
              </Link>
              <Link 
                href="/team" 
                className="hidden md:flex items-center text-blue-600 hover:text-blue-800"
              >
                Back to Search
              </Link>
            </div>
          </div>
        </header>

        {/* Content */}
        <main className="flex-1 overflow-y-auto p-4 md:p-6 bg-gray-50">
          {/* Teacher Header */}
          <div className="mb-6 rounded-lg bg-white p-6 shadow-sm">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between">
              <div>
                <h1 className="text-2xl font-bold text-blue-800">
                  {teacher.fullName}'s Students
                </h1>
                <p className="text-blue-600">Teacher ID: {teacher.teacherId}</p>
              </div>
              <div className="mt-4 flex items-center space-x-4 md:mt-0">
                <Link 
                  href={`/certificates/${query}`} 
                  className="flex items-center text-blue-600 hover:text-blue-800 md:hidden"
                >
                  <FiArrowLeft className="mr-1" />
                  Back to Teacher
                </Link>
                <Link 
                  href="/team" 
                  className="flex items-center text-blue-600 hover:text-blue-800 md:hidden"
                >
                  Back to Search
                </Link>
              </div>
            </div>
          </div>

          {/* Students Section */}
          {students.length > 0 ? (
            <div className="rounded-lg bg-white shadow-sm overflow-hidden">
              <div className="px-6 py-4 border-b border-gray-200 flex items-center justify-between">
                <h2 className="text-xl font-semibold text-blue-800">
                  Student Records ({students.length})
                </h2>
                <div className="flex items-center">
                  <span className="inline-flex items-center rounded-full bg-green-100 px-3 py-1 text-sm font-medium text-green-800">
                    <FiCheckCircle className="mr-1" />
                    Active
                  </span>
                </div>
              </div>

              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-blue-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-blue-700 uppercase tracking-wider">Student ID</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-blue-700 uppercase tracking-wider">Full Name</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-blue-700 uppercase tracking-wider">Grade</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-blue-700 uppercase tracking-wider">Status</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-blue-700 uppercase tracking-wider">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {students.map((student) => (
                      <tr key={student._id} className="hover:bg-blue-50 transition-colors">
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-blue-800">
                          {student.certificateNo}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                          {student.fullName}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {student.grade}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                            Active
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                          <Link
                            href={`/students/${student.certificateNo}`}
                            className="text-blue-600 hover:text-blue-900 inline-flex items-center"
                          >
                            View <FiChevronRight className="ml-1" />
                          </Link>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center rounded-lg bg-white p-8 text-center shadow-sm">
              <div className="mb-4 rounded-full bg-blue-100 p-4">
                <FiUsers className="text-3xl text-blue-600" />
              </div>
              <h3 className="mb-2 text-xl font-semibold text-blue-800">No students found</h3>
              <p className="mb-4 text-gray-600">This teacher doesn't have any students yet</p>
              <Link 
                href={`/certificates/${query}`} 
                className="inline-flex items-center rounded-lg bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
              >
                <FiArrowLeft className="mr-2" />
                Back to Teacher
              </Link>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}