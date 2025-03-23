'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

import AddTeacher from './form/page'

const page = () => {
  return (
    <div>
      <AddTeacher/>
      <TeachersList/>
    </div>
  )
}

export default page

export function TeachersList(){
  const [teachers, setTeachers] = useState([]);
  const [filteredTeachers, setFilteredTeachers] = useState([]); // Filtered list
  const [searchQuery, setSearchQuery] = useState(''); // Search query
  const [isLoading, setIsLoading] = useState(true); // Loading state
  const router = useRouter();

  useEffect(() => {
    fetchTeachers();
  }, []);

  // Fetch all teachers
  const fetchTeachers = async () => {
    try {
      const response = await fetch('/api/teachers');
      if (!response.ok) {
        throw new Error('Failed to fetch teachers');
      }
      const result = await response.json();
      if (result.success) {
        setTeachers(result.data);
        setFilteredTeachers(result.data); // Initialize filtered list
      }
    } catch (error) {
      console.error('Error fetching teachers:', error);
    } finally {
      setIsLoading(false); // Set loading to false after fetch
    }
  };

  // Handle Edit: Navigate to the edit page
  const handleEdit = (id) => {
    router.push(`/dashboard/teachers/${id}/edit`);
  };

  // Handle Delete: Delete a teacher
  const handleDelete = async (id) => {
    try {
      const response = await fetch(`/api/teachers/${id}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error('Failed to delete teacher');
      }

      const result = await response.json();
      if (result.success) {
        fetchTeachers(); // Refresh the list after deletion
      }
    } catch (error) {
      console.error('Error deleting teacher:', error);
    }
  };

  // Handle Search: Filter teachers based on search query
  const handleSearch = (query) => {
    setSearchQuery(query);
    const filtered = teachers.filter((teacher) =>
      teacher.fullName.toLowerCase().includes(query.toLowerCase()) ||
      teacher.teacherId.toLowerCase().includes(query.toLowerCase()) ||
      teacher.city.toLowerCase().includes(query.toLowerCase()) ||
      teacher.rank.toLowerCase().includes(query.toLowerCase())
    );
    setFilteredTeachers(filtered);
  };

  if (isLoading) {
    return <div className="text-center mt-4">Loading...</div>;
  }

  return (
    <div className="flex flex-col items-center min-h-screen bg-gray-100 p-4">
      <Card className="w-full max-w-lg shadow-lg mt-8">
        <CardHeader className="text-center">
          <CardTitle className="text-xl font-semibold">Teachers List</CardTitle>
        </CardHeader>
        <CardContent>
          {/* Search Bar */}
          <div className="mb-4">
            <Input
              type="text"
              placeholder="Search teachers..."
              value={searchQuery}
              onChange={(e) => handleSearch(e.target.value)}
              className="w-full p-2 border rounded-lg"
            />
          </div>

          {/* Teachers List */}
          <ul className="space-y-4">
            {filteredTeachers.map((teacher) => (
              <li key={teacher._id} className="p-4 border rounded-lg flex flex-col items-center text-center bg-white shadow-md">
                <img src={teacher.photo} alt={teacher.fullName} className="w-16 h-16 rounded-full mb-2" />
                <p className="font-semibold">{teacher.fullName}</p>
                <p className="text-sm text-gray-600">ID: {teacher.teacherId}</p>
                <p className="text-sm text-gray-600">City: {teacher.city}</p>
                <p className="text-sm text-gray-600">Rank: {teacher.rank}</p>
                <div className="mt-2 flex space-x-2">
                  <Button
                    onClick={() => handleEdit(teacher._id)}
                    className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-1 text-sm"
                  >
                    Edit
                  </Button>
                  <Button
                    onClick={() => handleDelete(teacher._id)}
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
