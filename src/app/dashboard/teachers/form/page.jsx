'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

export default function AddTeacher() {
  const router = useRouter();
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
      const response = await fetch('/api/teachers', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const result = await response.json();
      if (result.success) {
        router.push('/dashboard/teachers'); // Redirect to teachers list
      } else {
        console.error('Error submitting form:', result.error);
      }
    } catch (error) {
      console.error('Error submitting form:', error);
    }
  };

  return (
    <div className="flex flex-col items-center min-h-screen bg-gray-100 p-4">
      <div className="w-full max-w-lg bg-white p-6 rounded-lg shadow-lg">
        <h1 className="text-2xl font-semibold mb-4">Add Teacher</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            type="text"
            name="teacherId"
            placeholder="Teacher ID"
            value={formData.teacherId}
            onChange={handleChange}
          />
          <Input
            type="text"
            name="fullName"
            placeholder="Full Name"
            value={formData.fullName}
            onChange={handleChange}
          />
          <Input
            type="date"
            name="dob"
            placeholder="Date of Birth"
            value={formData.dob}
            onChange={handleChange}
          />
          <Input
            type="text"
            name="phoneNo"
            placeholder="Phone Number"
            value={formData.phoneNo}
            onChange={handleChange}
          />
          <Input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
          />
          <Input
            type="text"
            name="city"
            placeholder="City"
            value={formData.city}
            onChange={handleChange}
          />
          <Input
            type="text"
            name="state"
            placeholder="State"
            value={formData.state}
            onChange={handleChange}
          />
          <Input
            type="text"
            name="businessname"
            placeholder="Business Name"
            value={formData.businessname}
            onChange={handleChange}
          />
          <Input
            type="text"
            name="businessaddress"
            placeholder="Business Address"
            value={formData.businessaddress}
            onChange={handleChange}
          />
          <Input
            type="text"
            name="sponsorcode"
            placeholder="Sponsor Code"
            value={formData.sponsorcode}
            onChange={handleChange}
          />
          <Input
            type="file"
            name="photo"
            onChange={handlePhotoUpload}
          />
          <Input
            type="text"
            name="rank"
            placeholder="Rank"
            value={formData.rank}
            onChange={handleChange}
          />
          <Button type="submit" className="w-full bg-blue-500 hover:bg-blue-600 text-white cursor-pointer">
            Submit
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