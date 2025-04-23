"use client";

import { useParams, useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Link from "next/link";

const InfoCard = ({ label, value }) => (
  <div className="space-y-1 p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
    <p className="text-xs font-medium text-gray-500 uppercase tracking-wider">{label}</p>
    <p className="font-medium text-gray-900 text-sm md:text-base">{value || "—"}</p>
  </div>
);

export default function CertificateDetails() {
  const params = useParams();
  const router = useRouter();
  const certificateNo = params.certificateNo;
  const [student, setStudent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchStudent = async () => {
      try {
        const response = await fetch(`/api/students/search?certificateNo=${certificateNo}`);
        const result = await response.json();
        
        if (result.success) {
          setStudent(result.data);
        } else {
          setError(result.error || 'Student not found');
          setTimeout(() => router.push('/result'), 3000);
        }
      } catch (err) {
        setError('Failed to fetch student data');
      } finally {
        setLoading(false);
      }
    };

    fetchStudent();
  }, [certificateNo, router]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <div className="text-center space-y-4">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-red-600 mx-auto"></div>
          <p className="text-gray-600">Loading certificate details...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white py-12">
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
          <p className="text-gray-600 mb-4">You'll be redirected shortly</p>
          <Link 
            href="/result" 
            className="inline-flex items-center text-red-600 hover:text-red-800 font-medium transition-colors"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" />
            </svg>
            Back to search
          </Link>
        </motion.div>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-gray-50 py-12">
      <section className="max-w-6xl mx-auto px-4 py-8 md:py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden"
        >
          {/* Header with red accent */}
          <div className="bg-red-600 px-6 py-4">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div>
                <h1 className="text-xl md:text-2xl font-bold text-white">Certificate Verification</h1>
                <p className="text-red-100 mt-1">Certificate No: {student.certificateNo}</p>
              </div>
              <Link 
                href="/result" 
                className="flex items-center text-white hover:text-gray-200 font-medium transition-colors"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" />
                </svg>
                Back to search
              </Link>
            </div>
          </div>

          <div className="p-6 md:p-8">
            <div className="flex flex-col md:flex-row gap-8">
              {/* Student Photo */}
              {student.photo && (
                <div className="flex-shrink-0">
                  <div className="relative">
                    <img
                      src={student.photo}
                      alt={student.fullName}
                      className="w-24 h-24 md:w-32 md:h-32 object-cover rounded-full border-4 border-white shadow-lg"
                    />
                    <div className="absolute inset-0 rounded-full border-2 border-red-400 opacity-0 hover:opacity-100 transition-opacity"></div>
                  </div>
                </div>
              )}

              {/* Student Details */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 w-full">
                <InfoCard label="Full Name" value={student.fullName} />
                <InfoCard label="Father/Husband Name" value={student.fatherOrHusbandName} />
                <InfoCard label="Date of Birth" value={student.dob.split('T')[0]} />
                <InfoCard label="Address" value={student.studentAddress} />
                <InfoCard label="Email" value={student.email} />
                <InfoCard label="Phone Number" value={student.phoneNo} />
                <InfoCard label="Aadhar Card No" value={student.aadharCardNo} />
                <InfoCard label="Roll No" value={student.rollNo} />
                <InfoCard label="Teacher ID" value={student.teacherId} />
                <div className="md:col-span-2 lg:col-span-3">
                  <InfoCard 
                    label="Institute" 
                    value={`${student.instituteName}, ${student.instituteCity}, ${student.instituteState}`} 
                  />
                </div>
                <InfoCard label="Course" value={student.course} />
                <InfoCard label="Duration" value={student.duration} />
                <InfoCard label="Grade" value={student.grade} />
              </div>
            </div>

            {/* Verification Badge */}
            <div className="mt-8 pt-6 border-t border-gray-200 flex justify-end">
              <div className="inline-flex items-center bg-red-50 px-4 py-2 rounded-full border border-red-200">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-red-600 mr-2" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span className="font-medium text-red-700">Verified Certificate</span>
              </div>
            </div>
          </div>
        </motion.div>
      </section>
    </main>
  );
}