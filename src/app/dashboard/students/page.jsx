'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import AddStudent from './form/page';

export default function Student() {
    return (
        <div>
            <AddStudent />
            <StudentsList />
        </div>
    )
}

export  function StudentsList() {
  const [students, setStudents] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchStudents();
  }, []);

  const fetchStudents = async (query = '') => {
    try {
      const res = await fetch(`/api/students/search?query=${query}`);
      const { data } = await res.json();
      setStudents(data);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    fetchStudents(searchQuery);
  };

  const handleDelete = async (id) => {
    if (confirm('Are you sure you want to delete this student?')) {
      await fetch(`/api/students/${id}`, { method: 'DELETE' });
      fetchStudents(searchQuery);
    }
  };

  if (isLoading) return <div>Loading...</div>;

  return (
    <div className="p-4">
      <form onSubmit={handleSearch} className="mb-4">
        <input
          type="text"
          placeholder="Search students..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="p-2 border rounded"
        />
        <button type="submit" className="ml-2 bg-blue-500 text-white px-4 py-2 rounded">
          Search
        </button>
      </form>

      <div className="overflow-x-auto">
        <table className="min-w-full bg-white">
          <thead>
            <tr>
              <th>Photo</th>
              <th>Name</th>
              <th>Roll No</th>
              <th>Course</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {students.map((student) => (
              <tr key={student._id}>
                <td>
                  <img 
                    src={student.photo || '/default-avatar.png'} 
                    alt={student.fullName}
                    className="w-10 h-10 rounded-full"
                  />
                </td>
                <td>{student.fullName}</td>
                <td>{student.rollNo}</td>
                <td>{student.course}</td>
                <td>
                  <Link 
                    href={`/dashboard/students/${student._id}/edit`}
                    className="text-blue-500 hover:underline mr-2"
                  >
                    Edit
                  </Link>
                  <button 
                    onClick={() => handleDelete(student._id)}
                    className="text-red-500 hover:underline"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}