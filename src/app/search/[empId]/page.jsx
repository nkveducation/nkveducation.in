'use client';
import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { motion } from 'framer-motion';

function InfoCard({ label, value }) {
  return (
    <div className="space-y-1 p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
      <p className="text-xs font-medium text-gray-500 uppercase tracking-wider">{label}</p>
      <p className="text-sm font-medium text-gray-900 truncate">{value || "—"}</p>
    </div>
  );
}

export default function EmployeeSearchPage() {
  const params = useParams();
  const router = useRouter();
  const empId = params.empId;
  const [employee, setEmployee] = useState(null);
  const [relatedEmployees, setRelatedEmployees] = useState([]);
  const [relatedTeachers, setRelatedTeachers] = useState([]);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [currentTeachersPage, setCurrentTeachersPage] = useState(1);
  const itemsPerPage = 6;

  // Pagination for employees
  const paginatedEmployees = relatedEmployees.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  // Pagination for teachers
  const paginatedTeachers = relatedTeachers.slice(
    (currentTeachersPage - 1) * itemsPerPage,
    currentTeachersPage * itemsPerPage
  );

  const totalPages = Math.ceil(relatedEmployees.length / itemsPerPage);
  const totalTeachersPages = Math.ceil(relatedTeachers.length / itemsPerPage);

  useEffect(() => {
    const fetchEmployee = async () => {
      try {
        const response = await fetch(`/api/employees/search?empId=${empId}`);
        const result = await response.json();

        if (result.success) {
          setEmployee(result.data.employee);
          setRelatedEmployees(result.data.relatedEmployees || []);
          setRelatedTeachers(result.data.relatedTeachers || []);
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
    <main className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-19">
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="space-y-8"
        >
          {/* Header */}
          <div className="bg-white rounded-xl shadow-md border border-gray-200 overflow-hidden">
            <div className="bg-gradient-to-r from-red-600 to-red-700 px-6 py-6">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                  <h1 className="text-2xl md:text-3xl font-bold text-white">Employee Profile</h1>
                  <p className="text-red-100 mt-2 flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V8a2 2 0 00-2-2h-5m-4 0V5a2 2 0 114 0v1m-4 0a2 2 0 104 0m-5 8a2 2 0 100-4 2 2 0 000 4zm0 0c1.306 0 2.417.835 2.83 2M9 14a3.001 3.001 0 00-2.83 2M15 11h3m-3 4h2" />
                    </svg>
                    Employee ID: {employee.empId}
                  </p>
                </div>
                <Link 
                  href="/team" 
                  className="flex items-center px-4 py-2 bg-white text-red-600 rounded-lg hover:bg-gray-100 font-medium transition-colors shadow-sm"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                  </svg>
                  Back to search
                </Link>
              </div>
            </div>
          </div>

          {/* Employee details */}
          <div className="bg-white rounded-xl shadow-md border border-gray-200 overflow-hidden">
            <div className="p-6 md:p-8">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-2 bg-red-100 rounded-lg">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                </div>
                <h2 className="text-xl font-semibold text-gray-900">Personal Information</h2>
              </div>
              
              <div className="flex flex-col md:flex-row gap-8">
                {employee.photo && (
                  <div className="flex-shrink-0">
                    <div className="relative group">
                      <img 
                        src={employee.photo} 
                        alt={employee.fullName} 
                        className="w-40 h-40 object-cover rounded-xl border-4 border-white shadow-lg group-hover:opacity-90 transition-opacity"
                      />
                      <div className="absolute inset-0 rounded-xl border-2 border-red-400 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                    </div>
                  </div>
                )}
                
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 w-full">
                  {[
                    ["Full Name", employee.fullName],
                    ["Father's Name", employee.fatherName],
                    ["Employee ID", employee.empId],
                    ["Institute Name", employee.instituteName],
                    ["Institute Address", employee.instituteAddress],
                    ["Aadhar Number", employee.aadhar],
                    ["City", employee.city],
                    ["Rank", employee.rank],
                    ["Phone", employee.phone],
                    ["Sponsor Code", employee.sponsorCode],
                  ].map(([label, value]) => (
                    <InfoCard key={label} label={label} value={value} />
                  ))}
                </div>
              </div>

              <div className="mt-8 pt-6 border-t border-gray-200 flex justify-end">
                <div className="inline-flex items-center bg-gradient-to-r from-green-50 to-green-100 px-4 py-2 rounded-lg border border-green-200 shadow-sm">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-green-600 mr-2" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span className="font-medium text-green-700">Verified Employee</span>
                </div>
              </div>
            </div>
          </div>

          {/* Related Teachers Section */}
          {relatedTeachers.length > 0 && (
            <div className="bg-white rounded-xl shadow-md border border-gray-200 overflow-hidden">
              <div className="p-6 md:p-8">
                <div className="flex items-center gap-3 mb-6">
                  <div className="p-2 bg-red-100 rounded-lg">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                    </svg>
                  </div>
                  <h2 className="text-xl font-semibold text-gray-900">Related Teachers ({relatedTeachers.length})</h2>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {paginatedTeachers.map((teacher) => (
                    <motion.div 
                      key={teacher._id}
                      whileHover={{ y: -5 }}
                      className="p-5 bg-gray-50 border border-gray-200 rounded-xl hover:shadow-md transition-all"
                    >
                      <div className="flex items-center gap-3 mb-3">
                        {teacher.photo ? (
                          <img 
                            src={teacher.photo} 
                            alt={teacher.fullName} 
                            className="w-12 h-12 object-cover rounded-full border-2 border-white shadow-sm"
                          />
                        ) : (
                          <div className="w-12 h-12 rounded-full bg-gray-200 flex items-center justify-center text-gray-500">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                            </svg>
                          </div>
                        )}
                        <div>
                          <h3 className="font-medium text-gray-900">{teacher.fullName}</h3>
                          <p className="text-xs text-gray-500">{teacher.teacherId || "—"}</p>
                        </div>
                        {teacher.isVerified && (
                          <span className="ml-auto px-2 py-0.5 text-xs bg-green-100 text-green-700 rounded-full">Verified</span>
                        )}
                      </div>
                      {/* <div className="space-y-3 mt-4">
                        <div className="flex items-center text-sm">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-gray-400 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                          </svg>
                          <span>{teacher.phone || "Not provided"}</span>
                        </div>
                        <div className="flex items-center text-sm">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-gray-400 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                          </svg>
                          <span>{teacher.instituteName || "Not provided"}</span>
                        </div>
                        <div className="flex items-center text-sm">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-gray-400 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                          </svg>
                          <span>{teacher.subject || "Not specified"}</span>
                        </div>
                      </div> */}
                    </motion.div>
                  ))}
                </div>

                {totalTeachersPages > 1 && (
                  <div className="mt-6 flex justify-center space-x-2">
                    <button 
                      onClick={() => setCurrentTeachersPage((p) => Math.max(p - 1, 1))} 
                      className="px-4 py-2 text-sm border rounded-lg hover:bg-gray-100 disabled:opacity-50 flex items-center"
                      disabled={currentTeachersPage === 1}
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                      </svg>
                      Prev
                    </button>
                    {[...Array(totalTeachersPages)].map((_, i) => (
                      <button 
                        key={i}
                        onClick={() => setCurrentTeachersPage(i + 1)} 
                        className={`px-4 py-2 text-sm border rounded-lg ${currentTeachersPage === i + 1 ? 'bg-red-600 text-white' : 'hover:bg-gray-100'}`}
                      >
                        {i + 1}
                      </button>
                    ))}
                    <button 
                      onClick={() => setCurrentTeachersPage((p) => Math.min(p + 1, totalTeachersPages))} 
                      className="px-4 py-2 text-sm border rounded-lg hover:bg-gray-100 disabled:opacity-50 flex items-center"
                      disabled={currentTeachersPage === totalTeachersPages}
                    >
                      Next
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </button>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Related Employees Section */}
          {relatedEmployees.length > 0 && (
            <div className="bg-white rounded-xl shadow-md border border-gray-200 overflow-hidden">
              <div className="p-6 md:p-8">
                <div className="flex items-center gap-3 mb-6">
                  <div className="p-2 bg-red-100 rounded-lg">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                    </svg>
                  </div>
                  <h2 className="text-xl font-semibold text-gray-900">Related Employees ({relatedEmployees.length})</h2>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {paginatedEmployees.map((emp) => (
                    <motion.div 
                      key={emp._id}
                      whileHover={{ y: -5 }}
                      className="p-5 bg-gray-50 border border-gray-200 rounded-xl hover:shadow-md transition-all"
                    >
                      <div className="flex items-center gap-3 mb-3">
                        <div>
                          <h3 className="font-medium text-gray-900">{emp.fullName}</h3>
                          <p className="text-xs text-gray-500">{emp.empId || "—"}</p>
                        </div>
                        {emp.isVerified && (
                          <span className="ml-auto px-2 py-0.5 text-xs bg-green-100 text-green-700 rounded-full">Verified</span>
                        )}
                      </div>
                    </motion.div>
                  ))}
                </div>

                {totalPages > 1 && (
                  <div className="mt-6 flex justify-center space-x-2">
                    <button 
                      onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))} 
                      className="px-4 py-2 text-sm border rounded-lg hover:bg-gray-100 disabled:opacity-50 flex items-center"
                      disabled={currentPage === 1}
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                      </svg>
                      Prev
                    </button>
                    {[...Array(totalPages)].map((_, i) => (
                      <button 
                        key={i}
                        onClick={() => setCurrentPage(i + 1)} 
                        className={`px-4 py-2 text-sm border rounded-lg ${currentPage === i + 1 ? 'bg-red-600 text-white' : 'hover:bg-gray-100'}`}
                      >
                        {i + 1}
                      </button>
                    ))}
                    <button 
                      onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))} 
                      className="px-4 py-2 text-sm border rounded-lg hover:bg-gray-100 disabled:opacity-50 flex items-center"
                      disabled={currentPage === totalPages}
                    >
                      Next
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
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
    </main>
  );
}