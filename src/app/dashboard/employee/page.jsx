'use client';

import { useEffect, useState } from 'react';
import React from 'react'
import EmployeeForm from './form/page'
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const page = () => {
  return (
    <div>
      <EmployeeForm/>
      <EmployeeList/>
    </div>
  )
}

export default page


export  function EmployeeList() {
  const [employees, setEmployees] = useState([]);
  const [filteredEmployees, setFilteredEmployees] = useState([]); // Filtered list
  const [searchQuery, setSearchQuery] = useState(''); // Search query
  const [isLoading, setIsLoading] = useState(true); // Loading state
  const router = useRouter();

  useEffect(() => {
    fetchEmployees();
  }, []);

  // Fetch all employees
  const fetchEmployees = async () => {
    try {
      const response = await fetch('/api/employees');
      if (!response.ok) {
        throw new Error('Failed to fetch employees');
      }
      const result = await response.json();
      if (result.success) {
        setEmployees(result.data);
        setFilteredEmployees(result.data); // Initialize filtered list
      }
    } catch (error) {
      console.error('Error fetching employees:', error);
    } finally {
      setIsLoading(false); // Set loading to false after fetch
    }
  };

  // Handle Edit: Navigate to the edit page
  const handleEdit = (id) => {
    router.push(`/dashboard/employee/${id}/edit`);
  };

  // Handle Delete: Delete an employee
  const handleDelete = async (id) => {
    try {
      const response = await fetch(`/api/employees/${id}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error('Failed to delete employee');
      }

      const result = await response.json();
      if (result.success) {
        fetchEmployees(); // Refresh the list after deletion
      }
    } catch (error) {
      console.error('Error deleting employee:', error);
    }
  };

  // Handle Search: Filter employees based on search query
  const handleSearch = (query) => {
    setSearchQuery(query);
    const filtered = employees.filter((employee) =>
      employee.fullName.toLowerCase().includes(query.toLowerCase()) ||
      employee.empId.toLowerCase().includes(query.toLowerCase()) ||
      employee.city.toLowerCase().includes(query.toLowerCase()) ||
      employee.rank.toLowerCase().includes(query.toLowerCase())
    );
    setFilteredEmployees(filtered);
  };

  if (isLoading) {
    return <div className="text-center mt-4">Loading...</div>;
  }

  return (
    <div className="flex flex-col items-center min-h-screen bg-gray-100 p-4">
      <Card className="w-full max-w-lg shadow-lg mt-8">
        <CardHeader className="text-center">
          <CardTitle className="text-xl font-semibold">Employee List</CardTitle>
        </CardHeader>
        <CardContent>
          {/* Search Bar */}
          <div className="mb-4">
            <Input
              type="text"
              placeholder="Search employees..."
              value={searchQuery}
              onChange={(e) => handleSearch(e.target.value)}
              className="w-full p-2 border rounded-lg"
            />
          </div>

          {/* Employee List */}
          <ul className="space-y-4">
            {filteredEmployees.map((employee) => (
              <li key={employee._id} className="p-4 border rounded-lg flex flex-col items-center text-center bg-white shadow-md">
                <img src={employee.photo} alt={employee.fullName} className="w-16 h-16 rounded-full mb-2" />
                <p className="font-semibold">{employee.fullName}</p>
                <p className="text-sm text-gray-600">ID: {employee.empId}</p>
                <p className="text-sm text-gray-600">City: {employee.city}</p>
                <p className="text-sm text-gray-600">Rank: {employee.rank}</p>
                <div className="mt-2 flex space-x-2">
                  <Button
                    onClick={() => handleEdit(employee._id)}
                    className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-1 text-sm"
                  >
                    Edit
                  </Button>
                  <Button
                    onClick={() => handleDelete(employee._id)}
                    className="bg-red-500 hover:bg-red-600 text-white px-4 py-1 text-sm"
                  >
                    Delete
                  </Button>
                </div>
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>
    </div>
  );
}
