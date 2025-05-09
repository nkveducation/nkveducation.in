// 'use client';

// import Link from 'next/link';
// import { useParams, useRouter } from 'next/navigation';
// import { useState, useEffect } from 'react';
// import { FiEdit, FiTrash2, FiArrowLeft } from 'react-icons/fi';
// import { toast } from 'react-toastify';

// export default function StudentDetailPage() {
//   const params = useParams();
//   const router = useRouter();
//   const studentId = params?.id;
//   const [student, setStudent] = useState(null);
//   const [isLoading, setIsLoading] = useState(true);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     const fetchStudent = async () => {
//       try {
//         const response = await fetch(`/api/students/${studentId}`);
//         const data = await response.json();
        
//         if (!response.ok) {
//           throw new Error(data.error || 'Failed to fetch student');
//         }
        
//         setStudent(data.data);
//       } catch (err) {
//         setError(err.message);
//         toast.error(err.message);
//       } finally {
//         setIsLoading(false);
//       }
//     };

//     fetchStudent();
//   }, [studentId]);

//   const handleDelete = async () => {
//     if (confirm('Are you sure you want to delete this student?')) {
//       try {
//         const response = await fetch(`/api/students/${studentId}`, {
//           method: 'DELETE'
//         });
        
//         const data = await response.json();
        
//         if (!response.ok) {
//           throw new Error(data.error || 'Failed to delete student');
//         }
        
//         toast.success('Student deleted successfully');
//         router.push('/team'); // Redirect to search page
//       } catch (err) {
//         toast.error(err.message);
//       }
//     }
//   };

//   if (isLoading) {
//     return (
//       <div className="min-h-screen bg-gray-50 p-4">
//         <div className="animate-pulse rounded-lg bg-white p-6 shadow-sm">
//           <div className="h-8 w-1/3 rounded bg-gray-200"></div>
//           <div className="mt-4 space-y-4">
//             <div className="h-4 w-full rounded bg-gray-200"></div>
//             <div className="h-4 w-2/3 rounded bg-gray-200"></div>
//             <div className="h-4 w-1/2 rounded bg-gray-200"></div>
//           </div>
//         </div>
//       </div>
//     );
//   }

//   if (error) {
//     return (
//       <div className="min-h-screen bg-gray-50 p-4">
//         <div className="rounded-lg bg-white p-6 shadow-sm">
//           <p className="text-red-500">{error}</p>
//           <Link href="/team" className="mt-4 inline-flex items-center text-blue-600 hover:text-blue-800">
//             <FiArrowLeft className="mr-1" /> Back to search
//           </Link>
//         </div>
//       </div>
//     );
//   }

//   if (!student) {
//     return (
//       <div className="min-h-screen bg-gray-50 p-4">
//         <div className="rounded-lg bg-white p-6 shadow-sm">
//           <p>Student not found</p>
//           <Link href="/team" className="mt-4 inline-flex items-center text-blue-600 hover:text-blue-800">
//             <FiArrowLeft className="mr-1" /> Back to search
//           </Link>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen bg-gray-50 p-4">
//       <div className="rounded-lg bg-white p-6 shadow-sm">
//         <div className="mb-6 flex items-center justify-between">
//           <Link href="/team" className="flex items-center text-blue-600 hover:text-blue-800">
//             <FiArrowLeft className="mr-1" /> Back to search
//           </Link>
//           <div className="flex space-x-2">
//             <Link
//               href={`/students/${studentId}/edit`}
//               className="flex items-center rounded bg-blue-600 px-3 py-1 text-sm text-white hover:bg-blue-700"
//             >
//               <FiEdit className="mr-1" /> Edit
//             </Link>
//             <button
//               onClick={handleDelete}
//               className="flex items-center rounded bg-red-600 px-3 py-1 text-sm text-white hover:bg-red-700"
//             >
//               <FiTrash2 className="mr-1" /> Delete
//             </button>
//           </div>
//         </div>

//         <div className="mb-8 flex flex-col items-center border-b pb-8 md:flex-row md:items-start md:space-x-8">
//           {student.photo ? (
//             <img
//               src={student.photo}
//               alt={student.fullName}
//               className="h-32 w-32 rounded-full object-cover border-4 border-blue-100 shadow-sm"
//               onError={(e) => {
//                 e.target.src = '/placeholder-profile.png';
//                 e.target.className = 'h-32 w-32 rounded-full object-cover border-4 border-blue-100 bg-gray-200 shadow-sm';
//               }}
//             />
//           ) : (
//             <div className="flex h-32 w-32 items-center justify-center rounded-full bg-gray-200 border-4 border-blue-100 shadow-sm">
//               <span className="text-4xl text-gray-500">
//                 {student.fullName?.charAt(0).toUpperCase() || '?'}
//               </span>
//             </div>
//           )}
//           <div className="mt-4 flex-1 md:mt-0">
//             <h1 className="text-2xl font-bold text-gray-900">{student.fullName}</h1>
//             <p className="text-blue-600">Student ID: {student.studentId}</p>
//             <p className="mt-2 text-gray-600">
//               <span className="font-medium">Course:</span> {student.course} (Grade: {student.grade})
//             </p>
//           </div>
//         </div>

//         <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
//           <div className="space-y-4">
//             <h2 className="text-lg font-semibold text-gray-900">Personal Information</h2>
//             <div className="space-y-2">
//               <div>
//                 <p className="text-sm font-medium text-gray-500">Father/Husband Name</p>
//                 <p className="text-gray-900">{student.fatherOrHusbandName || '—'}</p>
//               </div>
//               <div>
//                 <p className="text-sm font-medium text-gray-500">Date of Birth</p>
//                 <p className="text-gray-900">{student.dob || '—'}</p>
//               </div>
//               <div>
//                 <p className="text-sm font-medium text-gray-500">Address</p>
//                 <p className="text-gray-900">{student.studentAddress || '—'}</p>
//               </div>
//             </div>
//           </div>

//           <div className="space-y-4">
//             <h2 className="text-lg font-semibold text-gray-900">Contact Information</h2>
//             <div className="space-y-2">
//               <div>
//                 <p className="text-sm font-medium text-gray-500">Email</p>
//                 <p className="text-gray-900">{student.email || '—'}</p>
//               </div>
//               <div>
//                 <p className="text-sm font-medium text-gray-500">Phone Number</p>
//                 <p className="text-gray-900">{student.phoneNo || '—'}</p>
//               </div>
//               <div>
//                 <p className="text-sm font-medium text-gray-500">Aadhar Card Number</p>
//                 <p className="text-gray-900">{student.aadharCardNo || '—'}</p>
//               </div>
//             </div>
//           </div>

//           <div className="space-y-4">
//             <h2 className="text-lg font-semibold text-gray-900">Academic Information</h2>
//             <div className="space-y-2">
//               <div>
//                 <p className="text-sm font-medium text-gray-500">Certificate Number</p>
//                 <p className="text-gray-900">{student.certificateNo || '—'}</p>
//               </div>
//               <div>
//                 <p className="text-sm font-medium text-gray-500">Roll Number</p>
//                 <p className="text-gray-900">{student.rollNo || '—'}</p>
//               </div>
//               <div>
//                 <p className="text-sm font-medium text-gray-500">Institute</p>
//                 <p className="text-gray-900">
//                   {student.instituteName || '—'} ({student.instituteCity}, {student.instituteState})
//                 </p>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

"use client";

import { useParams, useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { 
  FiChevronLeft, 
  FiCheckCircle,
  FiUser,
  FiCalendar,
  FiHome,
  FiMail,
  FiPhone,
  FiCreditCard,
  FiBook,
  FiAward
} from "react-icons/fi";

const InfoCard = ({ label, value, icon: Icon }) => (
  <div className="space-y-2 p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
    <div className="flex items-center gap-2 text-gray-500">
      {Icon && <Icon className="h-4 w-4" />}
      <p className="text-xs font-medium uppercase tracking-wider">{label}</p>
    </div>
    <p className="font-medium text-gray-900 text-sm md:text-base">
      {value || <span className="text-gray-400">—</span>}
    </p>
  </div>
);

export default function CertificateDetails() {
  const params = useParams();
  const router = useRouter();
  const certificateNo = params?.certificateNo;
  const [student, setStudent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!certificateNo) {
      setError('Certificate number is missing');
      setLoading(false);
      return;
    }

    const fetchStudent = async () => {
      try {
        const response = await fetch(`/api/students/search?certificateNo=${certificateNo}`);
        
        if (!response.ok) {
          throw new Error('Failed to fetch certificate data');
        }

        const result = await response.json();
        
        if (result.success && result.data) {
          setStudent(result.data);
        } else {
          throw new Error(result.error || 'Certificate not found');
        }
      } catch (err) {
        setError(err.message);
        setTimeout(() => router.push('/result'), 3000);
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
            <FiCheckCircle className="h-8 w-8 text-red-600" />
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">{error}</h3>
          <p className="text-gray-600 mb-4">You'll be redirected shortly</p>
          <Link 
            href="/result" 
            className="inline-flex items-center text-red-600 hover:text-red-800 font-medium transition-colors"
          >
            <FiChevronLeft className="h-5 w-5 mr-1" />
            Back to search
          </Link>
        </motion.div>
      </div>
    );
  }

  if (!student) {
    return null; // This case should be handled by the error state
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
                <FiChevronLeft className="h-5 w-5 mr-1" />
                Back to search
              </Link>
            </div>
          </div>

          <div className="p-6 md:p-8">
            <div className="flex flex-col md:flex-row gap-8">
              {/* Student Photo */}
              <div className="flex-shrink-0">
                <div className="relative">
                  {student.photo ? (
                    <img
                      src={student.photo}
                      alt={student.fullName}
                      className="w-24 h-24 md:w-32 md:h-32 object-cover rounded-full border-4 border-white shadow-lg"
                      onError={(e) => {
                        e.target.src = '/placeholder-profile.png';
                        e.target.className = 'w-24 h-24 md:w-32 md:h-32 object-cover rounded-full border-4 border-white shadow-lg bg-gray-200';
                      }}
                    />
                  ) : (
                    <div className="w-24 h-24 md:w-32 md:h-32 rounded-full border-4 border-white shadow-lg bg-gray-200 flex items-center justify-center">
                      <FiUser className="h-12 w-12 text-gray-400" />
                    </div>
                  )}
                </div>
              </div>

              {/* Student Details */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 w-full">
                <InfoCard label="Full Name" value={student.fullName} icon={FiUser} />
                <InfoCard label="Father/Husband Name" value={student.fatherOrHusbandName} icon={FiUser} />
                <InfoCard label="Date of Birth" value={student.dob?.split('T')[0]} icon={FiCalendar} />
                <InfoCard label="Address" value={student.studentAddress} icon={FiHome} />
                <InfoCard label="Email" value={student.email} icon={FiMail} />
                <InfoCard label="Phone Number" value={student.phoneNo} icon={FiPhone} />
                <InfoCard label="Aadhar Card No" value={student.aadharCardNo} icon={FiCreditCard} />
                <InfoCard label="Roll No" value={student.rollNo} icon={FiBook} />
                <InfoCard label="Teacher ID" value={student.teacherId} icon={FiUser} />
                <div className="md:col-span-2 lg:col-span-3">
                  <InfoCard 
                    label="Institute" 
                    value={`${student.instituteName}, ${student.instituteCity}, ${student.instituteState}`} 
                    icon={FiBook}
                  />
                </div>
                <InfoCard label="Course" value={student.course} icon={FiBook} />
                <InfoCard label="Duration" value={student.duration} icon={FiCalendar} />
                <InfoCard label="Grade" value={student.grade} icon={FiAward} />
              </div>
            </div>

            {/* Verification Badge */}
            <div className="mt-8 pt-6 border-t border-gray-200 flex justify-end">
              <div className="inline-flex items-center bg-red-50 px-4 py-2 rounded-full border border-red-200">
                <FiCheckCircle className="h-5 w-5 text-red-600 mr-2" />
                <span className="font-medium text-red-700">Verified Certificate</span>
              </div>
            </div>
          </div>
        </motion.div>
      </section>
    </main>
  );
}