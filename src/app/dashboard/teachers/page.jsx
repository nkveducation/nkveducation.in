'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Skeleton } from '@/components/ui/skeleton';
import { Search, Edit, Trash2, User } from 'lucide-react';

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

export function TeachersList() {
  const [teachers, setTeachers] = useState([]);
  const [filteredTeachers, setFilteredTeachers] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    fetchTeachers();
  }, []);

  const fetchTeachers = async () => {
    try {
      const response = await fetch('/api/teachers');
      if (!response.ok) throw new Error('Failed to fetch teachers');
      const result = await response.json();
      if (result.success) {
        setTeachers(result.data);
        setFilteredTeachers(result.data);
      }
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleEdit = (id) => {
    router.push(`/dashboard/teachers/${id}/edit`);
  };

  const handleDelete = async (id) => {
    if (!confirm('Are you sure you want to delete this teacher?')) return;
    
    try {
      const response = await fetch(`/api/teachers/${id}`, {
        method: 'DELETE',
      });
      if (!response.ok) throw new Error('Failed to delete teacher');
      fetchTeachers();
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const handleSearch = (query) => {
    setSearchQuery(query);
    const filtered = teachers.filter((teacher) =>
      Object.values(teacher).some(
        (value) =>
          typeof value === 'string' &&
          value.toLowerCase().includes(query.toLowerCase())
      )
    );
    setFilteredTeachers(filtered);
  };

  if (isLoading) {
    return (
      <div className="container mx-auto py-8">
        <div className="flex items-center justify-between mb-6">
          <Skeleton className="h-10 w-64" />
          <Skeleton className="h-10 w-32" />
        </div>
        <div className="space-y-4">
          {[...Array(5)].map((_, i) => (
            <Skeleton key={i} className="h-16 w-full" />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-8">
      <Card className="border-0 shadow-sm">
        <CardHeader className="px-6 pt-6 pb-4">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <CardTitle className="text-2xl font-semibold">Teachers</CardTitle>
            <div className="relative w-full sm:w-64">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search teachers..."
                value={searchQuery}
                onChange={(e) => handleSearch(e.target.value)}
                className="pl-9"
              />
            </div>
          </div>
        </CardHeader>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow className="hover:bg-transparent">
                <TableHead className="w-[100px]">Photo</TableHead>
                <TableHead>Name</TableHead>
                <TableHead>ID</TableHead>
                <TableHead>City</TableHead>
                <TableHead>Rank</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredTeachers.length > 0 ? (
                filteredTeachers.map((teacher) => (
                  <TableRow key={teacher._id} className="hover:bg-gray-50/50">
                    <TableCell>
                      <Avatar className="h-9 w-9">
                        <AvatarImage src={teacher.photo} alt={teacher.fullName} />
                        <AvatarFallback>
                          <User className="h-4 w-4" />
                        </AvatarFallback>
                      </Avatar>
                    </TableCell>
                    <TableCell className="font-medium">
                      {teacher.fullName}
                    </TableCell>
                    <TableCell>{teacher.teacherId}</TableCell>
                    <TableCell>{teacher.city}</TableCell>
                    <TableCell>
                      <span className="px-2 py-1 text-xs font-medium rounded-full bg-blue-100 text-blue-800">
                        {teacher.rank}
                      </span>
                    </TableCell>
                    <TableCell className="text-right space-x-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleEdit(teacher._id)}
                      >
                        <Edit className="h-4 w-4 mr-1" />
                        Edit
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleDelete(teacher._id)}
                        className="text-red-600 hover:text-red-700 hover:bg-red-50"
                      >
                        <Trash2 className="h-4 w-4 mr-1" />
                        Delete
                      </Button>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={6} className="h-24 text-center">
                    {searchQuery ? 'No matching teachers found' : 'No teachers available'}
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}