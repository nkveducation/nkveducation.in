'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
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
    <div>
      <h1>Search Employee</h1>
      <div>
        <input
          type="text"
          placeholder="Enter Employee ID"
          value={empId}
          onChange={(e) => setEmpId(e.target.value)}
        />
        <button onClick={handleSearch}>Search</button>
      </div>

      {error && <p style={{ color: 'red' }}>{error}</p>}

      {employee && (
        <div>
          <h2>Employee Details</h2>
          <p>Name: {employee.fullName}</p>
          <p>Employee ID: {employee.empId}</p>
          <p>Sponsor Code: {employee.sponsorCode}</p>
          <img src={employee.photo} alt={employee.fullName} width="100" />
        </div>
      )}

{relatedEmployees.length > 0 ? (
  <div>
    <h2>Related Employees</h2>
    <ul>
      {relatedEmployees.map((emp) => (
        <li key={emp._id}>
          <p>Name: {emp.fullName}</p>
          <p>Employee ID: {emp.empId}</p>
          <p>Sponsor Code: {emp.sponsorCode}</p>
          <img src={emp.photo} alt={emp.fullName} width="100" />
        </li>
      ))}
    </ul>
  </div>
) : (
  <p>No related employees found.</p>
)}
    </div>
  );
}



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



export  function StudentSearch() {
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
    <div className="p-4 border rounded-lg shadow-md bg-white">
      <h2 className="text-xl font-bold mb-4">Search Student</h2>
      <input
        type="text"
        placeholder="Enter Certificate No"
        value={certificateNo}
        onChange={(e) => setCertificateNo(e.target.value)}
        className="border p-2 rounded w-full mb-4"
      />
      <button
        onClick={handleSearch}
        className="bg-blue-500 text-white px-4 py-2 rounded"
        disabled={loading}
      >
        {loading ? 'Searching...' : 'Search'}
      </button>

      {loading && <p>Loading...</p>}
      {error && <p className="text-red-500">Error: {error}</p>}

      {student && (
        <div className="mt-4">
          <h2 className="text-xl font-bold mb-4">Student Details</h2>
          <p><strong>Full Name:</strong> {student.fullName}</p>
          <p><strong>Father/Husband Name:</strong> {student.fatherOrHusbandName}</p>
          <p><strong>Date of Birth:</strong> {student.dob}</p>
          <p><strong>Address:</strong> {student.studentAddress}</p>
          <p><strong>Email:</strong> {student.email}</p>
          <p><strong>Phone Number:</strong> {student.phoneNo}</p>
          <p><strong>Aadhar Card No:</strong> {student.aadharCardNo}</p>
          <p><strong>Certificate No:</strong> {student.certificateNo}</p>
          <p><strong>Institute:</strong> {student.instituteName}, {student.instituteCity}, {student.instituteState}</p>
          <p><strong>Course:</strong> {student.course}</p>
          <p><strong>Duration:</strong> {student.duration}</p>
          <p><strong>Grade:</strong> {student.grade}</p>
          <p><strong>Roll No:</strong> {student.rollNo}</p>
          {student.photo && <img src={student.photo} alt="Student Photo" className="mt-4 w-32 h-32 object-cover rounded" />}
        </div>
      )}
    </div>
  );
}


export function TeacherSearchResults() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!query.trim()) return;

    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch(`/api/teachers/search?query=${encodeURIComponent(query)}`);
      if (!response.ok) {
        throw new Error('Failed to fetch data');
      }
      const data = await response.json();
      setResults(data.data || []);
    } catch (err) {
      setError(err.message);
      setResults([]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">Teacher Search</h1>
      
      <form onSubmit={handleSearch} className="mb-8">
        <div className="flex gap-2">
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search by teacher ID or name"
            className="flex-1 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            type="submit"
            disabled={isLoading}
            className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-blue-400"
          >
            {isLoading ? 'Searching...' : 'Search'}
          </button>
        </div>
      </form>

      {error && (
        <div className="p-4 mb-4 text-red-700 bg-red-100 rounded-lg">
          Error: {error}
        </div>
      )}

      {results.length > 0 ? (
        <div className="space-y-6">
          {results.map(({ teacher, students }) => (
            <div key={teacher._id} className="border rounded-lg p-4 shadow-sm">
              <div className="flex justify-between items-start">
                <div>
                  <h2 className="text-xl font-semibold">{teacher.fullName}</h2>
                  <p className="text-gray-600">ID: {teacher.teacherId}</p>
                  <p className="text-gray-600">Email: {teacher.email}</p>
                </div>
                <Link 
                  href={`/teachers/${teacher._id}`}
                  className="px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg"
                >
                  View Details
                </Link>
              </div>

              {students.length > 0 && (
                <div className="mt-4">
                  <h3 className="font-medium mb-2">Students:</h3>
                  <ul className="divide-y">
                    {students.map(student => (
                      <li key={student._id} className="py-2">
                        <p>{student.fullName} (ID: {student.studentId})</p>
                        <p className="text-sm text-gray-500">Grade: {student.grade}</p>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          ))}
        </div>
      ) : (
        !isLoading && query && (
          <p className="text-gray-500">No teachers found matching your search.</p>
        )
      )}
    </div>
  );
}