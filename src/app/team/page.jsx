'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { usePathname } from "next/navigation";
import { TeacherSearchResults } from '@/components/Search';
import { useState } from 'react';

const MotionCard = ({ children }) => (
  <motion.div
    whileHover={{ scale: 1.02, boxShadow: "0 0 20px rgba(255,255,255,0.2)" }}
    className="rounded-2xl p-6 border border-[#D77375] transition-all duration-300 hover:border-white backdrop-blur-xl bg-white/10"
  >
    {children}
  </motion.div>
);

export default function FindTeamPage() {
  const pathname = usePathname();
  const paths = pathname.split("/").filter(Boolean);

  return (
    <main className="mt-[80px] min-h-screen">
      {/* Header with breadcrumb */}
      <section
        className="text-white px-6 py-10"
        style={{
          backgroundImage: 'url("/images/red-dot-button-bg.jpeg")',
          backgroundSize: 'cover',
          backgroundRepeat: 'no-repeat',
          backgroundPosition: 'center',
        }}
      >
        <div className="max-w-6xl mx-auto flex  md:flex-row justify-between items-start md:items-center gap-4">
          <h1 className="text-4xl font-bold tracking-wide">Find Team</h1>
          <div className="bg-white text-black px-6 py-2 rounded-full text-sm shadow-lg">
            <Link href="/" className="text-red-700 font-semibold">Home</Link>
            {paths.map((p, i) => (
              <span key={i} className="text-gray-600"> / {p.charAt(0).toUpperCase() + p.slice(1)}</span>
            ))}
          </div>
        </div>
      </section>

      {/* Content Section */}
      <motion.section
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="max-w-6xl mx-auto px-4 py-12"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          <MotionCard>
            <h2 className="text-2xl font-semibold text-black mb-4">🔍 Search Team Member</h2>
            <SearchEmployee  />
          </MotionCard>

          <MotionCard>
            <h2 className="text-2xl font-semibold text-black mb-4">📜 TI-UP Certificate</h2>
            <TeacherSearchResults />
          </MotionCard>
        </div>
      </motion.section>
    </main>
  );
}




export function SearchEmployee() {
  const [empId, setEmpId] = useState('');
  const [employee, setEmployee] = useState(null);
  const [relatedEmployees, setRelatedEmployees] = useState([]);
  const [error, setError] = useState('');

  const handleSearch = async () => {
    if (!empId) {
      setError('Please enter an Employee ID');
      return;
    }

    try {
      const response = await fetch(`/api/employees/search?empId=${empId}`);
      const result = await response.json();

      if (result.success) {
        setEmployee(result.data.employee);
        setRelatedEmployees(result.data.relatedEmployees);
        setError('');
      } else {
        setError(result.error);
        setEmployee(null);
        setRelatedEmployees([]);
      }
    } catch (error) {
      setError('An error occurred while searching');
      console.error(error);
    }
  };

  return (
    <div className="space-y-4 bg-white p-4 rounded-lg shadow-md">
      <div className="flex items-center gap-4">
        <div className="flex-1">
          <label className="block text-red-600 text-sm font-medium mb-1">Employee ID</label>
          <input
            type="text"
            placeholder="Enter Employee ID"
            value={empId}
            onChange={(e) => setEmpId(e.target.value)}
            className="w-full bg-white text-black placeholder:text-gray-500 px-4 py-2 rounded-md border border-red-400 focus:outline-none focus:ring-2 focus:ring-red-500"
          />
        </div>
        <button 
          onClick={handleSearch}
          className="mt-6 bg-red-500 text-white px-6 py-2 rounded-md font-semibold hover:bg-red-600 transition-colors"
        >
          SEARCH
        </button>
      </div>

      {error && <p className="text-red-500 text-sm">{error}</p>}

      {employee && (
        <div className="border border-red-300 rounded-lg p-4 mt-4 bg-white">
          <h3 className="text-red-700 font-semibold text-lg mb-2">Employee Details</h3>
          <div className="grid grid-cols-2 gap-2 text-black">
            {employee.photo && (
              <div className="col-span-2 flex justify-center">
                <img 
                  src={employee.photo} 
                  alt={employee.fullName} 
                  className="w-24 h-24 object-cover rounded-md border-2 border-red-400"
                />
              </div>
            )}
            <div>
              <p className="text-sm text-red-500">Name:</p>
              <p className="font-medium">{employee.fullName}</p>
            </div>
            <div>
              <p className="text-sm text-red-500">Employee ID:</p>
              <p className="font-medium">{employee.empId}</p>
            </div>
            <div>
              <p className="text-sm text-red-500">Sponsor Code:</p>
              <p className="font-medium">{employee.sponsorCode}</p>
            </div>
          </div>
        </div>
      )}

      {relatedEmployees.length > 0 && (
        <div className="border border-red-300 rounded-lg p-4 mt-4 bg-white">
          <h3 className="text-red-700 font-semibold text-lg mb-2">Related Employees</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {relatedEmployees.map((emp) => (
              <div key={emp._id} className="border border-gray-300 p-3 rounded-md bg-white">
                <div className="grid grid-cols-2 gap-2 text-black">
                  <div>
                    <p className="text-sm text-red-500">Name:</p>
                    <p className="font-medium">{emp.fullName}</p>
                  </div>
                  <div>
                    <p className="text-sm text-red-500">Employee ID:</p>
                    <p className="font-medium">{emp.empId}</p>
                  </div>
                  <div className="col-span-2">
                    <p className="text-sm text-red-500">Sponsor Code:</p>
                    <p className="font-medium">{emp.sponsorCode}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
