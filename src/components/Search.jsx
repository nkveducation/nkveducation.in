'use client';

import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import {  useState } from 'react';

export default function SearchEmployee() {
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
    <div className="space-y-4">
      <div className="flex items-center gap-4">
        <div className="flex-1">
          <label className="block text-white text-sm font-medium mb-1">Employee ID</label>
          <input
            type="text"
            placeholder="Enter Employee ID"
            value={empId}
            onChange={(e) => setEmpId(e.target.value)}
            className="w-full placeholder:text-white px-4 py-2 rounded-md border border-gray-300 focus:outline-none "
          />
        </div>
        <button 
          onClick={handleSearch}
          className="mt-6 border-[1px] border-white text-white  px-6 py-2 rounded-md font-medium hover:bg-gray-100 transition-colors"
        >
          SEARCH
        </button>
      </div>

      {error && <p className="text-red-300 text-sm">{error}</p>}

      {employee && (
        <div className="bg-[hsla(0,0%,100%,0.2)] backdrop-blur-md rounded-lg p-4 mt-4">
          <h3 className="text-white font-semibold text-lg mb-2">Employee Details</h3>
          <div className="grid grid-cols-2 gap-2 text-black">
            {employee.photo && (
              <div className="col-span-2">
                <img 
                  src={employee.photo} 
                  alt={employee.fullName} 
                  className="w-24 h-24 object-cover rounded-md border-2 border-white"
                />
              </div>
            )}
            <div>
              <p className="text-sm opacity-80">Name:</p>
              <p className="font-medium">{employee.fullName}</p>
            </div>
            <div>
              <p className="text-sm opacity-80">Employee ID:</p>
              <p className="font-medium">{employee.empId}</p>
            </div>
            <div>
              <p className="text-sm opacity-80">Sponsor Code:</p>
              <p className="font-medium">{employee.sponsorCode}</p>
            </div>
            
          </div>
        </div>
      )}

      {relatedEmployees.length > 0 && (
        <div className="bg-[hsla(0,0%,100%,0.2)] backdrop-blur-mdrounded-lg p-4 mt-4">
          <h3 className="text-black font-semibold text-lg mb-2">Related Employees</h3>
          <div className="grid grid-cols-3 md:grid-cols-2 gap-4">
            {relatedEmployees.map((emp) => (
              <div key={emp._id} className="bg-[hsla(0,0%,100%,0.2)] backdrop-blur-md p-3 rounded-md">
                <div className="grid grid-cols-2 gap-2 text-black">
                  <div>
                    <p className="text-sm opacity-80">Name:</p>
                    <p className="font-medium">{emp.fullName}</p>
                  </div>
                  <div>
                    <p className="text-sm opacity-80">Employee ID:</p>
                    <p className="font-medium">{emp.empId}</p>
                  </div>
                  <div>
                    <p className="text-sm opacity-80">Sponsor Code:</p>
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


export function StudentSearch() {
  const [certificateNo, setCertificateNo] = useState('');
  const [student, setStudent] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSearch = async () => {
    if (!certificateNo) return;
    setLoading(true);
    setError(null);
    setStudent(null);

    try {
      const response = await fetch(`/api/students?certificateNo=${certificateNo}`);
      const result = await response.json();
      if (result.success) {
        setStudent(result.data);
      } else {
        setError(result.error);
      }
    } catch (err) {
      setError('Failed to fetch student data');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-4 bg-white text-black px-4 sm:px-6 lg:px-8 py-6 rounded-xl shadow-md">
      <div className="flex items-center gap-4">
        <div className="flex-1">
          <label className="block text-sm font-medium mb-1">Certificate No</label>
          <motion.input
            type="text"
            placeholder="Enter Certificate No"
            value={certificateNo}
            onChange={(e) => setCertificateNo(e.target.value)}
            whileFocus={{ scale: 1.02 }}
            transition={{ type: 'spring', stiffness: 300 }}
            className="w-full px-4 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none placeholder:text-gray-400"
          />
        </div>
        <motion.button
          onClick={handleSearch}
          disabled={loading}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="mt-6 bg-red-500 text-white px-6 py-2 rounded-md font-medium hover:bg-gray-800 transition-all duration-300 disabled:opacity-50"
        >
          {loading ? 'SEARCHING...' : 'SEARCH'}
        </motion.button>
      </div>

      {error && <p className="text-red-600 text-sm">{error}</p>}
      {loading && <p className="text-gray-700">Loading...</p>}

      <AnimatePresence>
        {student && (
          <motion.div
            key="student-info"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.5 }}
            className="bg-gray-100 rounded-lg p-4 mt-4 border border-gray-300"
          >
            <h3 className="font-bold text-xl mb-3">Certificate Details</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {student.photo && (
                <div className="md:col-span-2 flex justify-center">
                  <motion.img
                    src={student.photo}
                    alt="Student Photo"
                    whileHover={{ scale: 1.05 }}
                    className="w-24 h-24 object-cover rounded-md border-2  shadow-md"
                  />
                </div>
              )}
              <Info label="Full Name" value={student.fullName} />
              <Info label="Father/Husband Name" value={student.fatherOrHusbandName} />
              <Info label="Date of Birth" value={student.dob} />
              <Info label="Address" value={student.studentAddress} />
              <Info label="Email" value={student.email} />
              <Info label="Phone Number" value={student.phoneNo} />
              <Info label="Aadhar Card No" value={student.aadharCardNo} />
              <Info label="Certificate No" value={student.certificateNo} />
              <div className="md:col-span-2">
                <p className="text-sm text-gray-500">Institute:</p>
                <p className="font-medium">{student.instituteName}, {student.instituteCity}, {student.instituteState}</p>
              </div>
              <Info label="Course" value={student.course} />
              <Info label="Duration" value={student.duration} />
              <Info label="Grade" value={student.grade} />
              <Info label="Roll No" value={student.rollNo} />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

const Info = ({ label, value }) => (
  <div>
    <p className="text-sm text-gray-500">{label}:</p>
    <p className="font-medium">{value}</p>
  </div>
);


export function TeacherSearchResults() {
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
    <div className="w-full px-4 sm:px-6 lg:px-8 py-6 bg-white text-black rounded-lg shadow-md">
      <form onSubmit={handleSearch} className="mb-6">
        <label className="block text-red-600 text-sm font-medium mb-1">Search Certificate</label>
        <div className="flex flex-col sm:flex-row gap-3 items-stretch">
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Enter Teacher ID or Name"
            className="flex-1 px-4 py-2 border border-red-300 rounded-lg bg-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-red-500"
          />
          <button
            type="submit"
            disabled={isLoading}
            className="px-5 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition disabled:opacity-50"
          >
            {isLoading ? "Searching..." : "Search"}
          </button>
        </div>
      </form>

      {/* Error Message */}
      {error && (
        <div className="p-4 mb-4 text-red-700 bg-red-100 rounded-lg border border-red-300">
          Error: {error}
        </div>
      )}

      {/* Search Results */}
      <div className="space-y-6">
        <AnimatePresence>
          {results.map(({ teacher, students }) => (
            <motion.div
              key={teacher._id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              className="rounded-2xl border border-red-300 bg-white shadow-sm transition-all p-6"
            >
              {/* Teacher Info */}
              <div className="flex flex-col lg:flex-row gap-6 items-center">
                {teacher.photo && (
                  <img
                    src={teacher.photo}
                    alt={teacher.fullName}
                    className="w-28 h-28 object-cover rounded-full border-2 border-red-400 shadow-md"
                  />
                )}

                {/* Info Grid */}
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
                      <p className="text-xs text-gray-500">{label}</p>
                      <p className="font-medium text-sm text-black">{value || "—"}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Students Section */}
              {students.length > 0 && (
                <div className="mt-6">
                  <h4 className="font-semibold text-lg text-red-600 mb-2">👥 Students</h4>
                  <ul className="divide-y divide-gray-200">
                    {students.map((student) => (
                      <li key={student._id} className="py-2">
                        <p className="text-sm font-medium">
                          {student.fullName} <span className="text-gray-500">(ID: {student.studentId})</span>
                        </p>
                        <p className="text-xs text-gray-600">Grade: {student.grade}</p>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
}
// export function TeacherSearchResults() {
//   const [query, setQuery] = useState('');
//   const [results, setResults] = useState([]);
//   const [isLoading, setIsLoading] = useState(false);
//   const [error, setError] = useState(null);

//   const handleSearch = async (e) => {
//     e.preventDefault();
//     if (!query.trim()) return;

//     setIsLoading(true);
//     setError(null);

//     try {
//       const response = await fetch(`/api/teachers/search?query=${encodeURIComponent(query)}`);
//       if (!response.ok) {
//         throw new Error('Failed to fetch data');
//       }
//       const data = await response.json();
//       setResults(data.data || []);
//     } catch (err) {
//       setError(err.message);
//       setResults([]);
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   return (
//     <div className="container mx-auto px-4 py-8">
//       <h1 className="text-2xl font-bold mb-6">Teacher Search</h1>
      
//       <form onSubmit={handleSearch} className="mb-8">
//         <div className="flex gap-2">
//           <input
//             type="text"
//             value={query}
//             onChange={(e) => setQuery(e.target.value)}
//             placeholder="Search by teacher ID or name"
//             className="flex-1 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
//           />
//           <button
//             type="submit"
//             disabled={isLoading}
//             className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-blue-400"
//           >
//             {isLoading ? 'Searching...' : 'Search'}
//           </button>
//         </div>
//       </form>

//       {error && (
//         <div className="p-4 mb-4 text-red-700 bg-red-100 rounded-lg">
//           Error: {error}
//         </div>
//       )}

//       {results.length > 0 ? (
//         <div className="space-y-6">
//           {results.map(({ teacher, students }) => (
//             <div key={teacher._id} className="border rounded-lg p-4 shadow-sm">
//               <div className="flex justify-between items-start">
//                 <div>
//                   <h2 className="text-xl font-semibold">{teacher.fullName}</h2>
//                   <p className="text-gray-600">ID: {teacher.teacherId}</p>
//                   <p className="text-gray-600">Email: {teacher.email}</p>
//                 </div>
//                 <Link 
//                   href={`/teachers/${teacher._id}`}
//                   className="px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg"
//                 >
//                   View Details
//                 </Link>
//               </div>

//               {students.length > 0 && (
//                 <div className="mt-4">
//                   <h3 className="font-medium mb-2">Students:</h3>
//                   <ul className="divide-y">
//                     {students.map(student => (
//                       <li key={student._id} className="py-2">
//                         <p>{student.fullName} (ID: {student.studentId})</p>
//                         <p className="text-sm text-gray-500">Grade: {student.grade}</p>
//                       </li>
//                     ))}
//                   </ul>
//                 </div>
//               )}
//             </div>
//           ))}
//         </div>
//       ) : (
//         !isLoading && query && (
//           <p className="text-gray-500">No teachers found matching your search.</p>
//         )
//       )}
//     </div>
//   );
// }


// export function SearchTeachers() {
//   const [query, setQuery] = useState('');
//   const router = useRouter();

//   const handleSearch = (e) => {
//     e.preventDefault();
//     router.push(`/teachers/search?query=${query}`);
//   };

//   return (
//     <div className="max-w-md mx-auto bg-white p-6 rounded-lg shadow">
//       <h2 className="text-xl font-bold mb-4">Search Teachers</h2>
//       <form onSubmit={handleSearch} className="flex">
//         <input
//           type="text"
//           value={query}
//           onChange={(e) => setQuery(e.target.value)}
//           placeholder="Enter Teacher ID or Name"
//           className="flex-1 p-2 border border-gray-300 rounded-l focus:outline-none focus:ring-2 focus:ring-blue-500"
//           required
//         />
//         <button
//           type="submit"
//           className="bg-blue-600 text-white px-4 py-2 rounded-r hover:bg-blue-700"
//         >
//           Search
//         </button>
//       </form>
//     </div>
//   );
// }
