"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";

// Clean MotionCard component
const MotionCard = ({ children }) => (
  <motion.div
    whileHover={{
      scale: 1.01,
      boxShadow: "0 4px 20px rgba(0,0,0,0.08)",
    }}
    className="rounded-xl p-6 border border-gray-200 bg-white transition-all duration-300 shadow-sm"
  >
    {children}
  </motion.div>
);

export default function Result() {
  const pathname = usePathname();
  const router = useRouter();
  const paths = pathname.split("/").filter((p) => p);

  return (
    <main className="min-h-screen bg-gray-50 py-12">
      {/* Clean white header with subtle shadow */}
      <section className="bg-gradient-to-r from-red-600 to-red-800 text-white px-6 py-16">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Student Results</h1>
            <p className="mt-2 text-red-100 max-w-lg">Verify and view examination results</p>
          </div>
          
          <div className="flex items-center space-x-2 bg-gray-50 px-4 py-2 rounded-full text-sm">
            <Link href="/" className="text-gray-700 hover:text-gray-900 transition">
              Home
            </Link>
            {paths.map((p, i) => (
              <span key={i} className="flex items-center">
                <span className="mx-2 text-gray-400">/</span>
                <span className="text-gray-700">
                  {p.charAt(0).toUpperCase() + p.slice(1)}
                </span>
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Search Section with clean white cards */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="max-w-4xl mx-auto px-4 py-12"
      >
        <div className="grid grid-cols-1 gap-6">
          <MotionCard>
            <StudentSearch router={router} />
          </MotionCard>
          
          {/* Info card */}
          <MotionCard>
            <div className="space-y-4 text-gray-700">
              <h3 className="text-lg font-semibold">How to check your results</h3>
              <ol className="space-y-3 list-decimal list-inside">
                <li>Enter your certificate number in the search field</li>
                <li>Click the search button or press Enter</li>
                <li>View your detailed results</li>
              </ol>
              <div className="pt-2 border-t border-gray-100">
                <p className="text-sm text-gray-500">
                  Having issues? <a href="/contact" className="text-red-600 hover:underline">Contact support</a>
                </p>
              </div>
            </div>
          </MotionCard>
        </div>
      </motion.section>
    </main>
  );
}

export function StudentSearch({ router }) {
  const [certificateNo, setCertificateNo] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSearch = async () => {
    if (!certificateNo) {
      setError('Please enter a certificate number');
      return;
    }
    
    setLoading(true);
    setError(null);

    try {
      const response = await fetch(`/api/students/search?certificateNo=${certificateNo}`);
      const result = await response.json();
      
      if (result.success) {
        router.push(`/result/certificate/${certificateNo}`);
      } else {
        setError(result.error || 'Certificate not found');
      }
    } catch (err) {
      setError('Failed to connect to server');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-semibold text-gray-900 mb-2">Result Verification</h2>
        <p className="text-gray-600 mb-6">Enter your certificate details to continue</p>
      </div>
      
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="flex-1">
          <label className="block text-sm font-medium text-gray-700 mb-2">Certificate Number</label>
          <motion.input
            type="text"
            placeholder="e.g. ABC123456"
            value={certificateNo}
            onChange={(e) => setCertificateNo(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
            whileFocus={{ scale: 1.005 }}
            transition={{ type: 'spring', stiffness: 300 }}
            className="w-full px-4 py-3 bg-white text-gray-900 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 focus:outline-none placeholder:text-gray-400 shadow-sm"
          />
        </div>
        
        <div className="flex items-end">
          <motion.button
            onClick={handleSearch}
            disabled={loading}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="bg-red-600 text-white px-6 py-3 rounded-lg font-medium shadow-sm hover:bg-red-700 transition-all duration-200 disabled:opacity-70 disabled:cursor-not-allowed w-full sm:w-auto"
          >
            {loading ? (
              <span className="flex items-center justify-center gap-2">
                <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Searching...
              </span>
            ) : (
              <span className="flex items-center gap-2">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
                Search
              </span>
            )}
          </motion.button>
        </div>
      </div>

      <AnimatePresence>
        {error && (
          <motion.div 
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
            className="overflow-hidden"
          >
            <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded-r-lg flex items-start">
              <svg className="h-5 w-5 text-red-500 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
              </svg>
              <p className="ml-3 text-sm font-medium text-red-800">{error}</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}