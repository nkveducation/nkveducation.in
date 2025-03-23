'use client';

import { useState } from 'react';

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