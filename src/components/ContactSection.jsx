"use client";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";

const Info = ({ label, value }) => (
  <div className="flex flex-col space-y-1">
    <span className="text-xs font-medium text-gray-500 uppercase tracking-wider">{label}</span>
    <span className="text-sm font-medium text-gray-800">{value || '-'}</span>
  </div>
);

export default function ContactSection() {
  return (
    <motion.section
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="py-12 px-4 md:px-8 bg-white"
    >
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <motion.h2
            className="text-3xl md:text-4xl font-bold text-gray-900 mb-4"
          >
            TEAM MEMBER / REGISTRATION CERTIFICATE
          </motion.h2>
          <motion.div className="w-20 h-1 bg-red-600 mx-auto mb-4" />
          <motion.p
            className="text-gray-600 max-w-3xl mx-auto text-lg"
          >
            Our certificate verifies the credentials of team members/registration
            certificate, confirming their expertise, status, membership, and
            compliance as trusted professionals within their respective fields.
          </motion.p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Team Member Search */}
          <motion.div
            whileHover={{ y: -5 }}
            className="rounded-xl p-6 border border-gray-200 transition-all duration-300 hover:shadow-lg"
            style={{
              background: "white",
            }}
          >
            <h3 className="text-xl md:text-2xl font-bold text-gray-900 mb-6 flex items-center">
              <span className="w-3 h-8 bg-red-600 mr-3"></span>
              SEARCH TEAM MEMBER
            </h3>
            <SearchEmployee />
          </motion.div>

          {/* Certificate Search */}
          <motion.div
            whileHover={{ y: -5 }}
            className="rounded-xl p-6 border border-gray-200 transition-all duration-300 hover:shadow-lg"
            style={{
              background: "white",
            }}
          >
            <h3 className="text-xl md:text-2xl font-bold text-gray-900 mb-6 flex items-center">
              <span className="w-3 h-8 bg-red-600 mr-3"></span>
              SEARCH CERTIFICATE
            </h3>
            <StudentSearch />
          </motion.div>
        </div>
      </div>
    </motion.section>
  );
}

export function SearchEmployee() {
  const [empId, setEmpId] = useState('');
  const [employee, setEmployee] = useState(null);
  const [relatedEmployees, setRelatedEmployees] = useState([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSearch = async () => {
    if (!empId) return;
    setLoading(true);
    setError(null);
    setEmployee(null);

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
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="flex-1">
          <label className="block text-sm font-medium text-gray-700 mb-1">Employee ID</label>
          <motion.input
            type="text"
            placeholder="Enter Employee ID"
            value={empId}
            onChange={(e) => setEmpId(e.target.value)}
            whileFocus={{ scale: 1.01 }}
            transition={{ type: 'spring', stiffness: 300 }}
            className="w-full px-4 py-3 bg-white text-gray-900 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-red-500 focus:border-red-500 focus:outline-none placeholder:text-gray-400"
          />
        </div>
        <motion.button
          onClick={handleSearch}
          disabled={loading}
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.98 }}
          className="mt-auto bg-red-600 text-white px-6 py-3 rounded-lg font-semibold shadow-md hover:bg-red-700 transition-all duration-300 disabled:opacity-70 disabled:cursor-not-allowed"
        >
          {loading ? (
            <span className="flex items-center justify-center gap-2">
              <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Searching...
            </span>
          ) : 'Search'}
        </motion.button>
      </div>

      {error && (
        <motion.div 
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-red-50 border-l-4 border-red-500 p-4 rounded-r-lg"
        >
          <div className="flex items-center">
            <svg className="h-5 w-5 text-red-500" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
            </svg>
            <p className="ml-3 text-sm font-medium text-red-700">{error}</p>
          </div>
        </motion.div>
      )}

      <AnimatePresence>
        {employee && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="bg-white rounded-xl p-6 shadow-sm border border-gray-200"
          >
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-bold text-gray-900">Employee Details</h3>
              {employee.photo && (
                <div className="relative">
                  <img
                    src={employee.photo}
                    alt={employee.fullName}
                    className="w-16 h-16 object-cover rounded-full border-4 border-white shadow-md"
                  />
                  <div className="absolute inset-0 rounded-full border-2 border-red-400 opacity-0 hover:opacity-100 transition-opacity"></div>
                </div>
              )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              <Info label="Full Name" value={employee.fullName} />
              <Info label="Father's Name" value={employee.fatherName} />
              <Info label="Employee ID" value={employee.empId} />
              <Info label="Institute Name" value={employee.instituteName} />
              <Info label="Institute Address" value={employee.instituteAddress} />
              <Info label="Aadhar No" value={employee.aadhar} />
              <Info label="City" value={employee.city} />
              <Info label="Rank" value={employee.rank} />
              <Info label="Phone" value={employee.phone} />
              <Info label="Sponsor Code" value={employee.sponsorCode} />
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {relatedEmployees.length > 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="space-y-4"
        >
          <h3 className="text-lg font-semibold text-gray-900">Related Employees</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {relatedEmployees.map((emp) => (
              <motion.div
                key={emp._id}
                whileHover={{ y: -5 }}
                className="bg-white rounded-lg p-5 shadow-sm border border-gray-200 hover:shadow-md transition-shadow"
              >
                <div className="flex items-start space-x-4">
                  {emp.photo && (
                    <img
                      src={emp.photo}
                      alt={emp.fullName}
                      className="w-14 h-14 object-cover rounded-lg border"
                    />
                  )}
                  <div className="flex-1 grid grid-cols-2 gap-2">
                    <Info label="Name" value={emp.fullName} />
                    <Info label="Employee ID" value={emp.empId} />
                    <Info label="Institute" value={emp.instituteName} />
                    <Info label="City" value={emp.city} />
                    <Info label="Rank" value={emp.rank} />
                    <Info label="Sponsor Code" value={emp.sponsorCode} />
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
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
      const response = await fetch(`/api/students/search?certificateNo=${certificateNo}`);
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
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="flex-1">
          <label className="block text-sm font-medium text-gray-700 mb-1">Certificate No</label>
          <motion.input
            type="text"
            placeholder="Enter Certificate No"
            value={certificateNo}
            onChange={(e) => setCertificateNo(e.target.value)}
            whileFocus={{ scale: 1.01 }}
            transition={{ type: 'spring', stiffness: 300 }}
            className="w-full px-4 py-3 bg-white text-gray-900 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-red-500 focus:border-red-500 focus:outline-none placeholder:text-gray-400"
          />
        </div>
        <motion.button
          onClick={handleSearch}
          disabled={loading}
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.98 }}
          className="mt-auto bg-red-600 text-white px-6 py-3 rounded-lg font-semibold shadow-md hover:bg-red-700 transition-all duration-300 disabled:opacity-70 disabled:cursor-not-allowed"
        >
          {loading ? (
            <span className="flex items-center justify-center gap-2">
              <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Searching...
            </span>
          ) : 'Search'}
        </motion.button>
      </div>

      {error && (
        <motion.div 
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-red-50 border-l-4 border-red-500 p-4 rounded-r-lg"
        >
          <div className="flex items-center">
            <svg className="h-5 w-5 text-red-500" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
            </svg>
            <p className="ml-3 text-sm font-medium text-red-700">{error}</p>
          </div>
        </motion.div>
      )}

      <AnimatePresence>
        {student && (
          <motion.div
            key="student-info"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
            className="bg-white rounded-xl p-6 shadow-sm border border-gray-200"
          >
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-bold text-gray-900">Certificate Details</h3>
              {student.photo && (
                <div className="relative">
                  <img
                    src={student.photo}
                    alt={student.fullName}
                    className="w-16 h-16 object-cover rounded-full border-4 border-white shadow-md"
                  />
                  <div className="absolute inset-0 rounded-full border-2 border-red-400 opacity-0 hover:opacity-100 transition-opacity"></div>
                </div>
              )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Info label="Full Name" value={student.fullName} />
              <Info label="Father/Husband Name" value={student.fatherOrHusbandName} />
              <Info label="Date of Birth" value={student.dob.split('T')[0]} />
              <Info label="Address" value={student.studentAddress} />
              <Info label="Email" value={student.email} />
              <Info label="Phone Number" value={student.phoneNo} />
              <Info label="Aadhar Card No" value={student.aadharCardNo} />
              <Info label="Certificate No" value={student.certificateNo} />
              <Info label="Roll No" value={student.rollNo} />
              <Info label="Teacher ID" value={student.teacherId} />
              <div className="md:col-span-2">
                <Info label="Institute" value={`${student.instituteName}, ${student.instituteCity}, ${student.instituteState}`} />
              </div>
              <Info label="Course" value={student.course} />
              <Info label="Duration" value={student.duration} />
              <Info label="Grade" value={student.grade} />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}