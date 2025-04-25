'use client';

import { useEffect, useState } from 'react';
import React from 'react'
import EmployeeForm from './form/page'
import { useRouter } from 'next/navigation';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Loader2, Search, Pencil, Trash2, User } from 'lucide-react';

const page = () => {
  return (
    <div>
      <EmployeeForm/>
      <EmployeeList/>
    </div>
  )
}

export default page


export function EmployeeList() {
  const [employees, setEmployees] = useState([]);
  const [filteredEmployees, setFilteredEmployees] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    fetchEmployees();
  }, []);

  const fetchEmployees = async () => {
    try {
      setIsLoading(true);
      const response = await fetch('/api/employees');
      if (!response.ok) throw new Error('Failed to fetch employees');
      const result = await response.json();
      if (result.success) {
        setEmployees(result.data);
        setFilteredEmployees(result.data);
      }
    } catch (error) {
      console.error('Error fetching employees:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleEdit = (id) => {
    router.push(`/dashboard/employee/${id}/edit`);
  };

  const handleDelete = async (id) => {
    if (!confirm('Are you sure you want to delete this employee?')) return;
    
    try {
      const response = await fetch(`/api/employees/${id}`, {
        method: 'DELETE',
      });

      if (!response.ok) throw new Error('Failed to delete employee');
      
      const result = await response.json();
      if (result.success) {
        fetchEmployees();
      }
    } catch (error) {
      console.error('Error deleting employee:', error);
    }
  };

  const handleSearch = (query) => {
    setSearchQuery(query);
    const filtered = employees.filter((employee) =>
      Object.entries(employee).some(([key, value]) =>
        typeof value === 'string' && 
        value.toLowerCase().includes(query.toLowerCase())
    ));
    setFilteredEmployees(filtered);
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <Loader2 className="h-8 w-8 animate-spin text-blue-500" />
      </div>
    );
  }

  return (
    <div className="container mx-auto py-8">
      <Card className="shadow-sm border-0">
        <CardHeader className="border-b">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <CardTitle className="text-2xl font-bold">Employee Directory</CardTitle>
              <CardDescription>
                {filteredEmployees.length} {filteredEmployees.length === 1 ? 'employee' : 'employees'} found
              </CardDescription>
            </div>
            <div className="relative w-full md:w-64">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Search employees..."
                value={searchQuery}
                onChange={(e) => handleSearch(e.target.value)}
                className="w-full pl-9"
              />
            </div>
          </div>
        </CardHeader>
        <CardContent className="p-0">
          {filteredEmployees.length === 0 ? (
            <div className="flex flex-col items-center justify-center p-8 text-center">
              <User className="h-12 w-12 text-gray-400 mb-4" />
              <h3 className="text-lg font-medium">No employees found</h3>
              <p className="text-sm text-gray-500">
                {searchQuery ? 'Try a different search term' : 'No employees available'}
              </p>
            </div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[100px]">Photo</TableHead>
                  <TableHead>Name</TableHead>
                  <TableHead>Employee ID</TableHead>
                  <TableHead>City</TableHead>
                  <TableHead>Rank</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredEmployees.map((employee) => (
                  <TableRow key={employee._id} className="hover:bg-gray-50/50">
                    <TableCell>
                      <Avatar className="h-10 w-10">
                        {employee.photo ? (
                          <AvatarImage src={employee.photo} alt={employee.fullName} />
                        ) : (
                          <AvatarFallback>
                            {employee.fullName?.charAt(0) || 'E'}
                          </AvatarFallback>
                        )}
                      </Avatar>
                    </TableCell>
                    <TableCell className="font-medium">{employee.fullName}</TableCell>
                    <TableCell>
                      <Badge variant="outline">{employee.empId}</Badge>
                    </TableCell>
                    <TableCell>{employee.city}</TableCell>
                    <TableCell>
                      <Badge variant="secondary">{employee.rank}</Badge>
                    </TableCell>
                    <TableCell className="text-right space-x-2">
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => handleEdit(employee._id)}
                      >
                        <Pencil className="h-4 w-4 mr-2" />
                        Edit
                      </Button>
                      <Button
                        size="sm"
                        variant="destructive"
                        onClick={() => handleDelete(employee._id)}
                      >
                        <Trash2 className="h-4 w-4 mr-2" />
                        Delete
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>
    </div>
  );
}