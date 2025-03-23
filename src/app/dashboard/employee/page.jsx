'use client';

import { useEffect, useState } from 'react';
import React from 'react'
import EmployeeForm from './form/page'
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
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
            <ul className="space-y-4">
              {employees.map((employee) => (
                <li key={employee._id} className="p-4 border rounded-lg flex flex-col items-center text-center bg-white shadow-md">
                  <img src={employee.photo} alt={employee.fullName} className="w-16 h-16 rounded-full mb-2" />
                  <p className="font-semibold">{employee.fullName}</p>
                  <p className="text-sm text-gray-600">ID:{employee.empId}</p>
                  <p className="text-sm text-gray-600">City: {employee.city}</p>
                  <p className="text-sm text-gray-600">Rank: {employee.rank}</p>
                  <div className="mt-2 flex space-x-2">
                    <Button className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-1 text-sm">Edit</Button>
                    <Button className="bg-red-500 hover:bg-red-600 text-white px-4 py-1 text-sm">Delete</Button>
                  </div>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      </div>
    );
  }
  