'use client';
import { useState, useEffect , useRef  } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { motion } from 'framer-motion';


export default function EmployeeSearchPage() {
  const params = useParams();
  const router = useRouter();
  const empId = params.empId;
  const [employee, setEmployee] = useState(null);
  const [teamMembers, setTeamMembers] = useState([]);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [isFlipped, setIsFlipped] = useState(false);
  const flipIntervalRef = useRef(null);
  const itemsPerPage = 6;

  // Combine both related employees and teachers into team members
  const paginatedTeamMembers = teamMembers.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const totalPages = Math.ceil(teamMembers.length / itemsPerPage);

  useEffect(() => {
    // Start flip interval when component mounts
    flipIntervalRef.current = setInterval(() => {
      setIsFlipped(prev => !prev);
    }, 5000); // Flip every 5 seconds

    // Clean up interval on unmount
    return () => {
      if (flipIntervalRef.current) {
        clearInterval(flipIntervalRef.current);
      }
    };
  }, []);

  useEffect(() => {
    const fetchEmployee = async () => {
      try {
        const response = await fetch(`/api/employees/search?empId=${empId}`);
        const result = await response.json();

        if (result.success) {
          setEmployee(result.data.employee);
          // Combine both related employees and teachers
          const combinedTeam = [
            ...(result.data.relatedEmployees || []),
            ...(result.data.relatedTeachers || [])
          ];
          setTeamMembers(combinedTeam);
        } else {
          setError(result.error || 'Employee not found');
        }
      } catch (error) {
        setError('An error occurred while searching');
      } finally {
        setIsLoading(false);
      }
    };

    if (empId) {
      fetchEmployee();
    }
  }, [empId]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100">
        <div className="text-center space-y-4">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-red-600 mx-auto"></div>
          <p className="text-gray-600 font-medium">Loading employee details...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100 py-20">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center p-8 bg-white rounded-xl shadow-md border border-gray-100 max-w-md mx-4"
        >
          <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">{error}</h3>
          <Link 
            href="/team" 
            className="inline-flex items-center px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 font-medium transition-colors mt-4"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Back to search
          </Link>
        </motion.div>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-19 md:py-8">
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="space-y-6"
        >
          {/* Header */}
          <div className="bg-white rounded-xl shadow-md border border-gray-200 overflow-hidden">
            <div className="bg-gradient-to-r from-red-600 to-red-700 px-4 py-4 md:px-6 md:py-6">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                  <h1 className="text-xl md:text-2xl lg:text-3xl font-bold text-white">Employee Profile</h1>
                  <p className="text-red-100 mt-1 md:mt-2 flex items-center text-sm md:text-base">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 md:h-5 md:w-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V8a2 2 0 00-2-2h-5m-4 0V5a2 2 0 114 0v1m-4 0a2 2 0 104 0m-5 8a2 2 0 100-4 2 2 0 000 4zm0 0c1.306 0 2.417.835 2.83 2M9 14a3.001 3.001 0 00-2.83 2M15 11h3m-3 4h2" />
                    </svg>
                    Employee ID: {employee.empId}
                  </p>
                </div>
                <Link 
                  href="/team" 
                  className="flex items-center px-3 py-1 md:px-4 md:py-2 bg-white text-red-600 rounded-lg hover:bg-gray-100 font-medium transition-colors shadow-sm text-sm md:text-base"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 md:h-5 md:w-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                  </svg>
                  Back to search
                </Link>
              </div>
            </div>
          </div>

          {/* Employee details */}
          <div className="bg-white rounded-xl shadow-md border border-gray-200 overflow-hidden">
            <div className="p-4 md:p-6 lg:p-8">
              <div className="flex items-center gap-3 mb-4 md:mb-6">
                <div className="p-2 bg-red-100 rounded-lg">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 md:h-6 md:w-6 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                </div>
                <h2 className="text-lg md:text-xl font-semibold text-gray-900">Personal Information</h2>
              </div>
              
              <div className="flex flex-col md:flex-row md:justify-center md:items-start gap-4 md:gap-8">
                {employee.photo && (
                  <div className="flex-shrink-0 mx-auto  md:mx-0">
                    <div className="relative w-32 h-39 md:w-40 md:h-40 perspective-1000">
                      {/* Flipping card container */}
                      <motion.div
                        className="relative w-full h-full transform-style-preserve-3d"
                        animate={{ rotateY: isFlipped ? 180 : 0 }}
                        transition={{ duration: 0.6, ease: "easeInOut" }}
                      >
                        {/* Front side - Employee Photo */}
                        <div className="absolute inset-0 backface-hidden h-full">
                          <div className="relative group w-full h-full">
                            <img 
                              src={employee.photo} 
                              alt={employee.fullName} 
                              className="w-full h-full object-cover rounded-xl border-4 border-white shadow-lg"
                            />
                            <div className="absolute inset-0 rounded-xl border-2 border-red-400 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-2 md:p-3 rounded-b-xl">
                              <p className="text-white text-sm font-medium">{employee.fullName}</p>
                              <p className="text-white/80 text-xs">{employee.rank}</p>
                            </div>
                          </div>
                        </div>

                        {/* Back side - ID Card Style */}
                        <div className="absolute inset-0 backface-hidden bg-white rounded-xl shadow-lg border-2 border-red-100 transform rotate-y-180 p-3 flex flex-col justify-between h-full gap-1.5">
                          <div className="text-center">
                            <div className="w-10 h-10 md:w-12 md:h-12 mx-auto mb-2 md:mb-3 rounded-full bg-red-100 flex items-center justify-center">
                              <svg className="w-5 h-5 md:w-6 md:h-6 text-red-600" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                              </svg>
                            </div>
                            <h3 className="text-xs md:text-sm font-bold text-gray-800 truncate">{employee.fullName}</h3>
                            <p className="text-xs text-gray-600">{employee.rank}</p>
                            <div className="mt-1 md:mt-2 p-1 bg-gray-100 rounded">
                              <p className="text-xs font-mono text-gray-800">ID: {employee.empId}</p>
                            </div>
                          </div>
                          <div className="flex justify-between items-center">
                            <div className="text-xs text-gray-600">Verified</div>
                            <div className="w-6 h-6 md:w-8 md:h-8 bg-red-600 rounded flex items-center justify-center">
                              <svg className="w-3 h-3 md:w-4 md:h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                              </svg>
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    </div>
                  </div>
                )}

                <div className="w-full md:w-2/3 space-y-4 md:space-y-6 relative overflow-y-auto max-h-[60vh] md:max-h-none">
                  {/* Vertical line */}
                  <div className="absolute left-6 md:left-8 top-0 bottom-0 w-0.5 bg-indigo-100 z-0"></div>

                  {/* Information sections */}
                  <div className="relative z-20 space-y-4 md:space-y-6">
                    {/* Personal Information */}
                    <motion.div 
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.3 }}
                      className="pl-8 md:pl-12"
                    >
                      <div className="flex items-center mb-2 md:mb-4">
                        <div className="p-1 md:p-2 bg-indigo-100 rounded-lg mr-3 md:mr-4">
                          <svg className="w-4 h-4 md:w-5 md:h-5 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                          </svg>
                        </div>
                        <h3 className="text-base md:text-lg font-bold text-indigo-800">Personal Information</h3>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4">
                        {[
                          ["Full Name", employee.fullName],
                          ["Father's Name", employee.fatherName],
                          ["Aadhar Number", employee.aadhar],
                          ["City", employee.city]
                        ].map(([label, value]) => (
                          <div 
                            key={label} 
                            className="bg-white p-3 md:p-4 rounded-lg md:rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition-all"
                          >
                            <span className="block text-xs font-medium text-indigo-600 uppercase tracking-wider">{label}</span>
                            <span className="block mt-1 text-sm md:text-base font-semibold text-gray-800">
                              {value || <span className="text-gray-400">—</span>}
                            </span>
                          </div>
                        ))}
                      </div>
                    </motion.div>

                    {/* Professional Information */}
                    <motion.div 
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.3, delay: 0.1 }}
                      className="pl-8 md:pl-12"
                    >
                      <div className="flex items-center mb-2 md:mb-4">
                        <div className="p-1 md:p-2 bg-indigo-100 rounded-lg mr-3 md:mr-4">
                          <svg className="w-4 h-4 md:w-5 md:h-5 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                          </svg>
                        </div>
                        <h3 className="text-base md:text-lg font-bold text-indigo-800">Professional Details</h3>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4">
                        {[
                          ["Employee ID", employee.empId],
                          ["Rank", employee.rank],
                          ["Institute Name", employee.instituteName],
                          ["Sponsor Code", employee.sponsorCode]
                        ].map(([label, value]) => (
                          <div 
                            key={label} 
                            className="bg-white p-3 md:p-4 rounded-lg md:rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition-all"
                          >
                            <span className="block text-xs font-medium text-indigo-600 uppercase tracking-wider">{label}</span>
                            <span className="block mt-1 text-sm md:text-base font-semibold text-gray-800">
                              {value || <span className="text-gray-400">—</span>}
                            </span>
                          </div>
                        ))}
                      </div>
                    </motion.div>

                    {/* Contact Information */}
                    <motion.div 
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.3, delay: 0.2 }}
                      className="pl-8 md:pl-12"
                    >
                      <div className="flex items-center mb-2 md:mb-4">
                        <div className="p-1 md:p-2 bg-indigo-100 rounded-lg mr-3 md:mr-4">
                          <svg className="w-4 h-4 md:w-5 md:h-5 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                          </svg>
                        </div>
                        <h3 className="text-base md:text-lg font-bold text-indigo-800">Contact Information</h3>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4">
                        {[
                          ["Phone", employee.phone],
                          ["Institute Address", employee.instituteAddress],
                          ["Email", employee.email || "—"]
                        ].map(([label, value]) => (
                          <div 
                            key={label} 
                            className="bg-white p-3 md:p-4 rounded-lg md:rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition-all"
                          >
                            <span className="block text-xs font-medium text-indigo-600 uppercase tracking-wider">{label}</span>
                            <span className="block mt-1 text-sm md:text-base font-semibold text-gray-800">
                              {value || <span className="text-gray-400">—</span>}
                            </span>
                          </div>
                        ))}
                      </div>
                    </motion.div>
                  </div>
                </div>
              </div>

              <div className="mt-6 flex items-center justify-center px-4 py-2 md:px-6 md:py-3 bg-green-50 rounded-full w-max mx-auto">
                <svg className="w-5 h-5 md:w-6 md:h-6 text-green-600 mr-2" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span className="text-green-700 font-medium text-sm md:text-base">Verified Employee</span>
              </div>
            </div>
          </div>

          {/* Team Members Section */}
          {teamMembers.length > 0 && (
            <div className="bg-white rounded-xl shadow-md border border-gray-200 overflow-hidden">
              <div className="p-4 md:p-6 lg:p-8">
                <div className="flex items-center gap-3 mb-4 md:mb-6">
                  <div className="p-2 bg-red-100 rounded-lg">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 md:h-6 md:w-6 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                    </svg>
                  </div>
                  <h2 className="text-lg md:text-xl font-semibold text-gray-900">Team Members ({teamMembers.length})</h2>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-4">
                  {paginatedTeamMembers.map((member) => (
                    <motion.div 
                      key={member._id}
                      whileHover={{ y: -3 }}
                      className="p-3 md:p-4 bg-gray-50 border border-gray-200 rounded-lg md:rounded-xl hover:shadow-md transition-all"
                    >
                      <div className="flex items-center gap-2 md:gap-3">
                        {member.photo ? (
                          <img 
                            src={member.photo} 
                            alt={member.fullName} 
                            className="w-10 h-10 md:w-12 md:h-12 object-cover rounded-full border-2 border-white shadow-sm"
                          />
                        ) : (
                          <div className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-gray-200 flex items-center justify-center text-gray-500">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 md:h-6 md:w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                            </svg>
                          </div>
                        )}
                        <div className="flex-1 min-w-0">
                          <h3 className="text-sm md:text-base font-medium text-gray-900 truncate">{member.fullName}</h3>
                          <p className="text-xs text-gray-500 truncate">
                            {member.empId || member.teacherId || "—"} • {member.rank || "—"}
                          </p>
                        </div>
                        {member.isVerified && (
                          <span className="ml-2 px-1.5 py-0.5 text-xs bg-green-100 text-green-700 rounded-full">Verified</span>
                        )}
                      </div>
                    </motion.div>
                  ))}
                </div>

                {totalPages > 1 && (
                  <div className="mt-4 md:mt-6 flex justify-center space-x-1 md:space-x-2">
                    <button 
                      onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))} 
                      className="px-3 py-1 md:px-4 md:py-2 text-xs md:text-sm border rounded-lg hover:bg-gray-100 disabled:opacity-50 flex items-center"
                      disabled={currentPage === 1}
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 md:h-4 md:w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                      </svg>
                      Prev
                    </button>
                    {[...Array(totalPages)].map((_, i) => (
                      <button 
                        key={i}
                        onClick={() => setCurrentPage(i + 1)} 
                        className={`px-3 py-1 md:px-4 md:py-2 text-xs md:text-sm border rounded-lg ${currentPage === i + 1 ? 'bg-red-600 text-white' : 'hover:bg-gray-100'}`}
                      >
                        {i + 1}
                      </button>
                    ))}
                    <button 
                      onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))} 
                      className="px-3 py-1 md:px-4 md:py-2 text-xs md:text-sm border rounded-lg hover:bg-gray-100 disabled:opacity-50 flex items-center"
                      disabled={currentPage === totalPages}
                    >
                      Next
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 md:h-4 md:w-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </button>
                  </div>
                )}
              </div>
            </div>
          )}
        </motion.div>
      </section>

      {/* Add this CSS for 3D effects */}
      <style jsx global>{`
        .perspective-1000 {
          perspective: 1000px;
        }
        .transform-style-preserve-3d {
          transform-style: preserve-3d;
        }
        .backface-hidden {
          backface-visibility: hidden;
        }
        .rotate-y-180 {
          transform: rotateY(180deg);
        }
      `}</style>
    </main>
  );
}