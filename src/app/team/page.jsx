'use client';

import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { usePathname } from "next/navigation";
import { useState } from 'react';

const MotionCard = ({ children }) => (
  <motion.div
    whileHover={{ y: -4, boxShadow: "0 10px 25px -5px rgba(0,0,0,0.1)" }}
    className="rounded-xl p-6 border border-gray-200 transition-all duration-300 bg-white"
  >
    {children}
  </motion.div>
);

export default function FindTeamPage() {
  const pathname = usePathname();
  const paths = pathname.split("/").filter(Boolean);

  return (
    <main className="min-h-screen bg-gray-50 py-12">
      {/* Modern Header */}
      <section className="bg-gradient-to-r from-red-600 to-red-800 text-white px-6 py-16">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
            <div>
              <h1 className="text-4xl font-bold tracking-tight">Find Your Team</h1>
              <p className="mt-2 text-red-100 max-w-lg">
                Search for team members or verify TI-UP certificates in our network
              </p>
            </div>
            
            <div className="flex items-center space-x-1 text-sm bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full">
              <Link href="/" className="text-white hover:text-red-200 font-medium">Home</Link>
              {paths.map((p, i) => (
                <span key={i} className="text-white/70"> 
                  <span className="mx-1">/</span> 
                  {p.charAt(0).toUpperCase() + p.slice(1)}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Content Section */}
      <motion.section
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12"
      >
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <MotionCard>
            <div className="flex items-center gap-3 mb-6">
              <div className="p-3 bg-red-100 rounded-lg">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
              <h2 className="text-2xl font-semibold text-gray-900">Search Team Member</h2>
            </div>
            <SearchEmployee />
          </MotionCard>

          <MotionCard>
            <div className="flex items-center gap-3 mb-6">
              <div className="p-3 bg-blue-100 rounded-lg">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h2 className="text-2xl font-semibold text-gray-900">TI-UP Certificate</h2>
            </div>
            <TeacherSearchResults />
          </MotionCard>
        </div>
      </motion.section>
    </main>
  );
}

function SearchEmployee() {
  const [empId, setEmpId] = useState('');
  const [employee, setEmployee] = useState(null);
  const [relatedEmployees, setRelatedEmployees] = useState([]);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSearch = async () => {
    if (!empId) {
      setError('Please enter an Employee ID');
      return;
    }

    setIsLoading(true);
    setError('');

    try {
      const response = await fetch(`/api/employees/search?empId=${empId}`);
      const result = await response.json();

      if (result.success) {
        setEmployee(result.data.employee);
        setRelatedEmployees(result.data.relatedEmployees);
      } else {
        setError(result.error || 'Employee not found');
        setEmployee(null);
        setRelatedEmployees([]);
      }
    } catch (error) {
      setError('An error occurred while searching');
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Search form remains the same */}
      <div className="flex flex-col sm:flex-row gap-4 items-end">
        <div className="flex-1 w-full">
          <label className="block text-sm font-medium text-gray-700 mb-1">Employee ID</label>
          <div className="relative">
            <input
              type="text"
              placeholder="Enter Employee ID"
              value={empId}
              onChange={(e) => setEmpId(e.target.value)}
              className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-red-500 focus:border-red-500 transition"
              onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
            />
            <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
              <svg className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
            </div>
          </div>
        </div>
        <button 
          onClick={handleSearch}
          disabled={isLoading}
          className="w-full sm:w-auto px-6 py-2.5 bg-red-600 text-white rounded-lg font-medium hover:bg-red-700 transition-colors shadow-sm disabled:opacity-70 flex items-center justify-center gap-2"
        >
          {isLoading ? (
            <>
              <svg className="animate-spin h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Searching...
            </>
          ) : 'Search'}
        </button>
      </div>

      {error && (
        <div className="p-3 bg-red-50 text-red-700 rounded-lg border border-red-200 text-sm flex items-start gap-2">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <span>{error}</span>
        </div>
      )}

      <AnimatePresence>
        {employee && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="border border-gray-200 rounded-lg overflow-hidden bg-white shadow-sm"
          >
            <div className="p-5">
              <h3 className="text-lg font-semibold text-gray-900 mb-4 pb-2 border-b border-gray-100 flex items-center gap-2">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
                Employee Details
              </h3>
              <div className="flex flex-col md:flex-row gap-6">
                {employee.photo && (
                  <div className="flex-shrink-0">
                    <img 
                      src={employee.photo} 
                      alt={employee.fullName} 
                      className="w-24 h-24 object-cover rounded-lg border-2 border-white shadow-md"
                    />
                  </div>
                )}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full">
                  <div>
                    <p className="text-xs font-medium text-gray-500 uppercase tracking-wider">Full Name</p>
                    <p className="font-medium text-gray-900">{employee.fullName}</p>
                  </div>
                  <div>
                    <p className="text-xs font-medium text-gray-500 uppercase tracking-wider">Father's Name</p>
                    <p className="font-medium text-gray-900">{employee.fatherName || "—"}</p>
                  </div>
                  <div>
                    <p className="text-xs font-medium text-gray-500 uppercase tracking-wider">Employee ID</p>
                    <p className="font-medium text-gray-900">{employee.empId}</p>
                  </div>
                  <div>
                    <p className="text-xs font-medium text-gray-500 uppercase tracking-wider">Institute Name</p>
                    <p className="font-medium text-gray-900">{employee.instituteName || "—"}</p>
                  </div>
                  <div>
                    <p className="text-xs font-medium text-gray-500 uppercase tracking-wider">Institute Address</p>
                    <p className="font-medium text-gray-900">{employee.instituteAddress || "—"}</p>
                  </div>
                  <div>
                    <p className="text-xs font-medium text-gray-500 uppercase tracking-wider">Aadhar Number</p>
                    <p className="font-medium text-gray-900">{employee.aadhar || "—"}</p>
                  </div>
                  <div>
                    <p className="text-xs font-medium text-gray-500 uppercase tracking-wider">City</p>
                    <p className="font-medium text-gray-900">{employee.city || "—"}</p>
                  </div>
                  <div>
                    <p className="text-xs font-medium text-gray-500 uppercase tracking-wider">Rank</p>
                    <p className="font-medium text-gray-900">{employee.rank || "—"}</p>
                  </div>
                  <div>
                    <p className="text-xs font-medium text-gray-500 uppercase tracking-wider">Phone</p>
                    <p className="font-medium text-gray-900">{employee.phone || "—"}</p>
                  </div>
                  <div>
                    <p className="text-xs font-medium text-gray-500 uppercase tracking-wider">Sponsor Code</p>
                    <p className="font-medium text-gray-900">{employee.sponsorCode || "—"}</p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {relatedEmployees.length > 0 && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="border border-gray-200 rounded-lg overflow-hidden bg-white shadow-sm"
          >
            <div className="p-5">
              <h3 className="text-lg font-semibold text-gray-900 mb-4 pb-2 border-b border-gray-100 flex items-center gap-2">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
                Related Employees ({relatedEmployees.length})
              </h3>
              <div className="grid grid-cols-1 gap-3">
                {relatedEmployees.map((emp) => (
                  <div key={emp._id} className="p-3 border border-gray-100 rounded-lg hover:bg-gray-50 transition">
                    <div className="grid grid-cols-3 gap-4">
                      <div>
                        <p className="text-xs font-medium text-gray-500 uppercase tracking-wider">Full Name</p>
                        <p className="font-medium text-gray-900">{emp.fullName}</p>
                      </div>
                      <div>
                        <p className="text-xs font-medium text-gray-500 uppercase tracking-wider">Employee ID</p>
                        <p className="font-medium text-gray-900">{emp.empId}</p>
                      </div>
                      <div>
                        <p className="text-xs font-medium text-gray-500 uppercase tracking-wider">Sponsor Code</p>
                        <p className="font-medium text-gray-900">{emp.sponsorCode}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Empty state remains the same */}
      {!employee && !error && !isLoading && (
        <div className="text-center py-12 bg-white rounded-lg border border-gray-200 shadow-sm">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 mx-auto text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <h3 className="mt-2 text-sm font-medium text-gray-900">No employee data</h3>
          <p className="mt-1 text-sm text-gray-500">Search by employee ID to find team members</p>
        </div>
      )}
    </div>
  );
}

function TeacherSearchResults() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!query.trim()) return;

    setIsLoading(true);
    setError(null);

    try {
      const res = await fetch(`/api/teachers/search?query=${encodeURIComponent(query)}`);
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Failed to fetch data");
      setResults(data.data || []);
    } catch (err) {
      setError(err.message);
      setResults([]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <form onSubmit={handleSearch} className="flex flex-col sm:flex-row gap-4 items-end">
        <div className="w-full">
          <label className="block text-sm font-medium text-gray-700 mb-1">Search Certificate</label>
          <div className="relative">
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Enter Teacher ID or Name"
              className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
            />
            <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
              <svg className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
              </svg>
            </div>
          </div>
        </div>
        <button
          type="submit"
          disabled={isLoading}
          className="w-full sm:w-auto px-6 py-2.5 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors shadow-sm disabled:opacity-70 flex items-center justify-center gap-2"
        >
          {isLoading ? (
            <>
              <svg className="animate-spin h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Verifying...
            </>
          ) : (
            <>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              Verify
            </>
          )}
        </button>
      </form>

      {error && (
        <div className="p-3 bg-red-50 text-red-700 rounded-lg border border-red-200 text-sm flex items-start gap-2">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <span>{error}</span>
        </div>
      )}

      <AnimatePresence>
        {results.length > 0 ? (
          <div className="space-y-4">
            {results.map(({ teacher, students }) => (
              <motion.div
                key={teacher._id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
                className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm"
              >
                <div className="flex flex-col md:flex-row gap-6">
                  {teacher.photo && (
                    <div className="flex-shrink-0">
                      <img
                        src={teacher.photo}
                        alt={teacher.fullName}
                        className="w-24 h-24 object-cover rounded-lg border-2 border-white shadow-md"
                      />
                    </div>
                  )}

                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 w-full">
                    {[
                      ["Full Name", teacher.fullName],
                      ["Teacher ID", teacher.teacherId],
                      ["Email", teacher.email],
                      ["Phone No", teacher.phoneNo],
                      ["DOB", teacher.dob],
                      ["City", teacher.city],
                      ["State", teacher.state],
                      ["Rank", teacher.rank],
                      ["Sponsor Code", teacher.sponsorcode],
                      ["Business Name", teacher.businessname],
                      ["Business Address", teacher.businessaddress],
                    ].map(([label, value]) => (
                      <div key={label}>
                        <p className="text-xs font-medium text-gray-500 uppercase tracking-wider">{label}</p>
                        <p className="font-medium text-gray-900">{value || "—"}</p>
                      </div>
                    ))}
                  </div>
                </div>

                {students.length > 0 && (
                  <div className="mt-6 pt-6 border-t border-gray-100">
                    <h4 className="text-sm font-semibold text-gray-900 mb-3 flex items-center gap-2">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                      </svg>
                      Students ({students.length})
                    </h4>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {students.map((student) => (
                        <div key={student._id} className="p-3 bg-gray-50 rounded-lg">
                          <p className="font-medium text-gray-900">
                            {student.fullName} 
                            <span className="text-gray-500 text-sm ml-2">(ID: {student.studentId})</span>
                          </p>
                          <p className="text-xs text-gray-600 mt-1">Grade: {student.grade}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        ) : (
          !isLoading && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="text-center py-12 bg-white rounded-lg border border-gray-200 shadow-sm"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 mx-auto text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <h3 className="mt-2 text-sm font-medium text-gray-900">No certificates found</h3>
              <p className="mt-1 text-sm text-gray-500">Search by teacher ID or name to verify certificates</p>
            </motion.div>
          )
        )}
      </AnimatePresence>
    </div>
  );
}