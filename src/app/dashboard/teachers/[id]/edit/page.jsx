'use client';

import { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

export default function EditTeacher() {
  const router = useRouter();
  const { id } = useParams();
  const [formData, setFormData] = useState({
    teacherId: '',
    fullName: '',
    dob: '',
    phoneNo: '',
    email: '',
    city: '',
    state: '',
    businessname: '',
    businessaddress: '',
    sponsorcode: '',
    photo: '',
    rank: '',
  });

  useEffect(() => {
    fetchTeacher();
  }, [id]);

  const fetchTeacher = async () => {
    const response = await fetch(`/api/teachers/${id}`);
    const result = await response.json();
    if (result.success) {
      setFormData(result.data);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handlePhotoUpload = async (e) => {
    const file = e.target.files[0];
    const base64 = await convertToBase64(file);
    setFormData({ ...formData, photo: base64 });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(`/api/teachers/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const result = await response.json();
      if (result.success) {
        router.push('/dashboard/teachers'); // Redirect to teachers list
      } else {
        console.error('Error updating teacher:', result.error);
      }
    } catch (error) {
      console.error('Error updating teacher:', error);
    }
  };

  return (
    <div className="flex flex-col items-center min-h-screen bg-gray-100 p-4">
      <div className="w-full max-w-lg bg-white p-6 rounded-lg shadow-lg">
        <h1 className="text-2xl font-semibold mb-4">Edit Teacher</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Form fields (same as Add Teacher form) */}
          <Button type="submit" className="w-full bg-blue-500 hover:bg-blue-600 text-white">
            Update
          </Button>
        </form>
      </div>
    </div>
  );
}

// Helper function to convert file to base64
const convertToBase64 = (file) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });
};