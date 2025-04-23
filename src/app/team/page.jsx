'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { usePathname } from "next/navigation";
import { useRouter } from 'next/navigation';
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

export function SearchEmployee() {
  const [empId, setEmpId] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false); // 👈 loading state added
  const router = useRouter();

  const handleSearch = () => {
    if (!empId) {
      setError('Please enter an Employee ID');
      return;
    }

    setError('');
    setLoading(true); // 👈 start loading

    setTimeout(() => {
      router.push(`/search/${empId}`);
    }, 1000); // simulate network delay (optional but makes the UX feel real)

    // Optional: if you want to stop loading after redirect
    // setLoading(false); // not really needed since navigation happens
  };

  return (
    <div className="space-y-6">
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
              disabled={loading} // 👈 disable input while loading
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
          className="w-full sm:w-auto px-6 py-2.5 bg-red-600 text-white rounded-lg font-medium hover:bg-red-700 transition-colors shadow-sm flex items-center justify-center gap-2 disabled:opacity-70"
          disabled={loading} // 👈 disable button while loading
        >
          {loading ? (
            <>
              <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
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
    </div>
  );
}

export  function TeacherSearchResults() {
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSearch = (e) => {
    e.preventDefault();
    if (!query.trim()) return;
    setLoading(true);
    router.push(`/certificates/${encodeURIComponent(query)}`);
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
              disabled={loading}
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
          disabled={loading}
          className={`w-full sm:w-auto px-6 py-2.5 rounded-lg font-medium transition-colors shadow-sm ${
            loading
              ? "bg-blue-300 text-white cursor-not-allowed"
              : "bg-blue-600 text-white hover:bg-blue-700"
          }`}
        >
          {loading ? (
            <span className="flex items-center gap-2">
              <svg className="animate-spin h-5 w-5 text-white" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8v8H4z"
                ></path>
              </svg>
              Verifying...
            </span>
          ) : (
            "Verify"
          )}
        </button>
      </form>
    </div>
  );
}