'use client';

import { useParams } from 'next/navigation';
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';

const InfoCard = ({ label, value }) => (
  <div className="space-y-1 p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
    <p className="text-xs font-medium text-gray-500 uppercase tracking-wider">{label}</p>
    <p className="font-medium text-gray-900">{value || "—"}</p>
  </div>
);

export default function EmployeeSearchPage() {
  const params = useParams();
  const empId = params.empId;
  const [employee, setEmployee] = useState(null);
  const [relatedEmployees, setRelatedEmployees] = useState([]);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  const paginatedEmployees = relatedEmployees.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const totalPages = Math.ceil(relatedEmployees.length / itemsPerPage);

  useEffect(() => {
    const fetchEmployee = async () => {
      try {
        const response = await fetch(`/api/employees/search?empId=${empId}`);
        const result = await response.json();

        if (result.success) {
          setEmployee(result.data.employee);
          setRelatedEmployees(result.data.relatedEmployees);
        } else {
          setError(result.error || 'Employee not found');
        }
      } catch (error) {
        setError('An error occurred while searching');
      } finally {
        setIsLoading(false);
      }
    };

    fetchEmployee();
  }, [empId]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white ">
        <div className="text-center space-y-4">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-red-600 mx-auto"></div>
          <p className="text-gray-600">Loading employee details...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white py-20">
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center p-8 bg-white rounded-xl shadow-sm border border-gray-200 max-w-md mx-4"
        >
          <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">{error}</h3>
          <Link 
            href="/team" 
            className="inline-flex items-center text-red-600 hover:text-red-800 font-medium transition-colors mt-4"
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
    <main className="min-h-screen bg-gray-50 py-20">
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="space-y-8"
        >
          {/* Header */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
            <div className="bg-red-600 px-6 py-4">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                  <h1 className="text-xl md:text-2xl font-bold text-white">Employee Profile</h1>
                  <p className="text-red-100 mt-1">Employee ID: {employee.empId}</p>
                </div>
                <Link 
                  href="/team" 
                  className="flex items-center text-white hover:text-gray-200 font-medium transition-colors"
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
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
            <div className="p-6 md:p-8">
              <div className="flex items-center gap-3 mb-6">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
                <h2 className="text-xl font-semibold text-gray-900">Personal Information</h2>
              </div>
              
              <div className="flex flex-col md:flex-row gap-8">
                {employee.photo && (
                  <div className="flex-shrink-0">
                    <div className="relative">
                      <img 
                        src={employee.photo} 
                        alt={employee.fullName} 
                        className="w-32 h-32 object-cover rounded-lg border-4 border-white shadow-lg"
                      />
                      <div className="absolute inset-0 rounded-lg border-2 border-red-400 opacity-0 hover:opacity-100 transition-opacity"></div>
                    </div>
                  </div>
                )}
                
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 w-full">
                  {[
                    ["Full Name", employee.fullName],
                    ["Father's Name", employee.fatherName || "—"],
                    ["Employee ID", employee.empId],
                    ["Institute Name", employee.instituteName || "—"],
                    ["Institute Address", employee.instituteAddress || "—"],
                    ["Aadhar Number", employee.aadhar || "—"],
                    ["City", employee.city || "—"],
                    ["Rank", employee.rank || "—"],
                    ["Phone", employee.phone || "—"],
                    ["Sponsor Code", employee.sponsorCode || "—"],
                  ].map(([label, value]) => (
                    <InfoCard key={label} label={label} value={value} />
                  ))}
                </div>
              </div>

              <div className="mt-8 pt-6 border-t border-gray-200 flex justify-end">
              <div className="inline-flex items-center bg-red-50 px-4 py-2 rounded-full border border-red-200">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-red-600 mr-2" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span className="font-medium text-red-700">Verified Employee</span>
              </div>
            </div>
            </div>
          </div>

          {/* Related Employees */}
          {relatedEmployees.length > 0 && (
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
              <div className="p-6 md:p-8">
                <div className="flex items-center gap-3 mb-6">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                  <h2 className="text-xl font-semibold text-gray-900">Related Employees ({relatedEmployees.length})</h2>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {paginatedEmployees.map((emp) => (
                    <motion.div 
                      key={emp._id}
                      whileHover={{ y: -2 }}
                      className="p-4 border border-gray-200 rounded-lg hover:shadow-md transition-all"
                    >
                      <div className="flex items-center gap-3 mb-3">
                        {emp.photo && (
                          <img 
                            src={emp.photo} 
                            alt={emp.fullName} 
                            className="w-10 h-10 object-cover rounded-full border-2 border-white shadow-sm"
                          />
                        )}
                        <h3 className="font-medium text-gray-900">{emp.fullName}</h3>
                        {emp.isVerified && (
                          <span className="ml-auto px-2 py-0.5 text-xs bg-green-100 text-green-700 rounded">Verified</span>
                        )}
                      </div>
                      <div className="space-y-2">
                        <div>
                          <p className="text-xs text-gray-500">Employee ID</p>
                          <p className="text-sm font-medium">{emp.empId}</p>
                        </div>
                        <div>
                          <p className="text-xs text-gray-500">Sponsor Code</p>
                          <p className="text-sm font-medium">{emp.sponsorCode || "—"}</p>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>

                {totalPages > 1 && (
                  <div className="mt-6 flex justify-center space-x-2">
                    <button 
                      onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))} 
                      className="px-3 py-1 text-sm border rounded hover:bg-gray-100 disabled:opacity-50"
                      disabled={currentPage === 1}
                    >
                      Prev
                    </button>
                    {[...Array(totalPages)].map((_, i) => (
                      <button 
                        key={i}
                        onClick={() => setCurrentPage(i + 1)} 
                        className={`px-3 py-1 text-sm border rounded ${currentPage === i + 1 ? 'bg-red-600 text-white' : 'hover:bg-gray-100'}`}
                      >
                        {i + 1}
                      </button>
                    ))}
                    <button 
                      onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))} 
                      className="px-3 py-1 text-sm border rounded hover:bg-gray-100 disabled:opacity-50"
                      disabled={currentPage === totalPages}
                    >
                      Next
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
