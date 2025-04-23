'use client';

import { useParams } from 'next/navigation';
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';

export default function CertificateSearchPage() {
  const params = useParams();
  const query = decodeURIComponent(params?.query || '');
  const [results, setResults] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(`/api/teachers/search?query=${query}`);
        const data = await res.json();
        if (!res.ok) throw new Error(data.message || 'Failed to fetch data');
        setResults(data.data || []);
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
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="p-4 bg-red-50 text-red-700 rounded-lg border border-red-200 max-w-md text-center">
          <p className="font-medium">{error}</p>
          <Link href="/team" className="mt-3 inline-block text-sm text-red-600 hover:text-red-800">
            ← Back to search
          </Link>
        </div>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-gray-50 py-12">
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="space-y-8"
        >
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-bold text-gray-900">Certificate Search Results</h1>
            <Link href="/team" className="text-sm text-blue-600 hover:text-blue-800 flex items-center gap-1">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              Back to search
            </Link>
          </div>

          {results.length > 0 ? (
            <div className="space-y-4">
              {results.map(({ teacher, students }) => (
                <motion.div
                  key={teacher._id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm"
                >
                  <div className="flex flex-col md:flex-row gap-6">
                    {teacher.photo && (
                      <div className="flex-shrink-0">
                        <img
                          src={teacher.photo || "/placeholder.png"}
                          onError={(e) => e.target.src = "/placeholder.png"}
                          alt={teacher.fullName}
                          className="w-24 h-24 object-cover rounded-lg border-2 border-white shadow-md"
                        />
                      </div>
                    )}

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 w-full">
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
                        <div key={label}>
                          <p className="text-xs font-medium text-gray-500 uppercase tracking-wider">{label}</p>
                          <p className="font-medium text-gray-900">{value || '—'}</p>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="mt-6 flex justify-end">
                    <div className="inline-flex items-center bg-green-50 px-4 py-2 rounded-full border border-green-200">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-green-600 mr-2" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm-1.707-5.707l4-4a1 1 0 10-1.414-1.414L9 10.586 8.121 9.707a1 1 0 10-1.414 1.414l2 2a1 1 0 001.414 0z" clipRule="evenodd" />
                      </svg>
                      <span className="font-medium text-green-700">Verified</span>
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
            <div className="text-center py-12 bg-white rounded-lg border border-gray-200 shadow-sm">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 mx-auto text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <h3 className="mt-2 text-sm font-medium text-gray-900">No certificates found</h3>
              <p className="mt-1 text-sm text-gray-500">No results found for "{query}"</p>
              <Link href="/team" className="mt-4 inline-block text-sm text-blue-600 hover:text-blue-800">
                ← Back to search
              </Link>
            </div>
          )}
        </motion.div>
      </section>
    </main>
  );
}
