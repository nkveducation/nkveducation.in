'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

export default function Dashboard() {
  const router = useRouter();
  const [authenticated, setAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [employeeCount, setEmployeeCount] = useState(0);
  const [studentCount, setStudentCount] = useState(0);
  const [teacherCount, setTeacherCount] = useState(0);
  const [error, setError] = useState(null);

  useEffect(() => {
    const isAuth = localStorage.getItem('authenticated');
    if (isAuth !== 'true') {
      router.push('/login');
    } else {
      setAuthenticated(true);
      setIsLoading(false);
      fetchCounts();
    }
  }, []);

  const fetchCounts = async () => {
    try {
      setIsLoading(true);
      setError(null);
      
      // Fetch all counts in parallel
      const [employeesRes, studentsRes, teachersRes] = await Promise.all([
        fetch('/api/employees'),
        fetch('/api/students'),
        fetch('/api/teachers')
      ]);

      if (!employeesRes.ok) throw new Error('Failed to fetch employees');
      if (!studentsRes.ok) throw new Error('Failed to fetch students');
      if (!teachersRes.ok) throw new Error('Failed to fetch teachers');

      const [employeesData, studentsData, teachersData] = await Promise.all([
        employeesRes.json(),
        studentsRes.json(),
        teachersRes.json()
      ]);

      setEmployeeCount(employeesData.data?.length || 0);
      setStudentCount(studentsData.data?.length || 0);
      setTeacherCount(teachersData.data?.length || 0);
    } catch (error) {
      console.error('Error:', error);
      setError(error instanceof Error ? error.message : 'Failed to fetch data');
    } finally {
      setIsLoading(false);
    }
  };

  async function handleLogout() {
    setIsLoading(true);
    const res = await fetch('/api/logout', { method: 'POST' });
    if (res.ok) {
      localStorage.removeItem('authenticated');
      router.push('/login');
    }
  }

  if (!authenticated) return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50">
      <div className="p-8 bg-white rounded-xl shadow-md w-full max-w-md text-center">
        <div className="flex justify-center mb-6">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
        </div>
        <p className="text-gray-600">Verifying your session...</p>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <nav className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            <h1 className="text-xl font-semibold text-gray-800">Dashboard</h1>
            <button
              onClick={handleLogout}
              className="flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-md text-white bg-red-600 hover:bg-red-700 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Logging out...
                </>
              ) : 'Logout'}
            </button>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {error && (
          <div className="mb-6 bg-red-50 border-l-4 border-red-500 p-4">
            <div className="flex">
              <div className="flex-shrink-0">
                <svg className="h-5 w-5 text-red-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                </svg>
              </div>
              <div className="ml-3">
                <p className="text-sm text-red-700">{error}</p>
              </div>
            </div>
          </div>
        )}

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {/* Employee Count Card */}
          <div className="bg-white overflow-hidden shadow rounded-lg">
            <div className="px-4 py-5 sm:p-6">
              <div className="flex items-center">
                <div className="flex-shrink-0 bg-blue-500 rounded-md p-3">
                  <svg className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                  </svg>
                </div>
                <div className="ml-5 w-0 flex-1">
                  <dt className="text-sm font-medium text-gray-500 truncate">Total Employees</dt>
                  <dd className="flex items-baseline">
                    <div className="text-2xl font-semibold text-gray-900">
                      {isLoading ? '...' : employeeCount}
                    </div>
                  </dd>
                </div>
              </div>
            </div>
          </div>

          {/* Students Count Card */}
          <div className="bg-white overflow-hidden shadow rounded-lg">
            <div className="px-4 py-5 sm:p-6">
              <div className="flex items-center">
                <div className="flex-shrink-0 bg-green-500 rounded-md p-3">
                  <svg className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                  </svg>
                </div>
                <div className="ml-5 w-0 flex-1">
                  <dt className="text-sm font-medium text-gray-500 truncate">Total Students</dt>
                  <dd className="flex items-baseline">
                    <div className="text-2xl font-semibold text-gray-900">
                      {isLoading ? '...' : studentCount}
                    </div>
                  </dd>
                </div>
              </div>
            </div>
          </div>

          {/* Teachers Count Card */}
          <div className="bg-white overflow-hidden shadow rounded-lg">
            <div className="px-4 py-5 sm:p-6">
              <div className="flex items-center">
                <div className="flex-shrink-0 bg-purple-500 rounded-md p-3">
                  <svg className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                  </svg>
                </div>
                <div className="ml-5 w-0 flex-1">
                  <dt className="text-sm font-medium text-gray-500 truncate">Total Teachers</dt>
                  <dd className="flex items-baseline">
                    <div className="text-2xl font-semibold text-gray-900">
                      {isLoading ? '...' : teacherCount}
                    </div>
                  </dd>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}