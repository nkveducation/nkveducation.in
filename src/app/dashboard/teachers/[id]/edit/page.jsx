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
    income: '',
    plan: 'Basic Plan'
  });
  const [isLoading, setIsLoading] = useState(true);
  const [isUpdating, setIsUpdating] = useState(false);

  const planOptions = ['Basic Plan', 'Premium Plan', 'Premium+ Plan'];

  useEffect(() => {
    if (id) {
      fetchTeacher();
    }
  }, [id]);

const fetchTeacher = async () => {
  try {
    setIsLoading(true);
    const response = await fetch(`/api/teachers/${id}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const result = await response.json();
    
    if (result.success) {
      setFormData({
        teacherId: result.data.teacherId || '',
        fullName: result.data.fullName || '',
        dob: result.data.dob || '',
        phoneNo: result.data.phoneNo || '',
        email: result.data.email || '',
        city: result.data.city || '',
        state: result.data.state || '',
        businessname: result.data.businessname || '',
        businessaddress: result.data.businessaddress || '',
        sponsorcode: result.data.sponsorcode || '',
        photo: result.data.photo || '',
        rank: result.data.rank || '',
        income: result.data.income || '',
        plan: result.data.plan || 'Basic Plan'
      });
    } else {
      console.error('API Error:', result.error);
      // Handle API error (show toast/message to user)
    }
  } catch (error) {
    console.error('Fetch Error:', error);
    // Handle fetch error (show toast/message to user)
  } finally {
    setIsLoading(false);
  }
};

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handlePhotoUpload = async (e) => {
    const file = e.target.files[0];
    if (file) {
      const base64 = await convertToBase64(file);
      setFormData({ ...formData, photo: base64 });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsUpdating(true);

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
        router.push('/dashboard/teachers');
      } else {
        console.error('Error updating teacher:', result.error);
      }
    } catch (error) {
      console.error('Error updating teacher:', error);
    } finally {
      setIsUpdating(false);
    }
  };

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
        <div className="w-full max-w-lg bg-white p-6 rounded-lg shadow-lg text-center">
          Loading teacher data...
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center min-h-screen bg-gray-100 p-4">
      <div className="w-full max-w-lg bg-white p-6 rounded-lg shadow-lg">
        <h1 className="text-2xl font-semibold mb-4">Edit Teacher</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            type="text"
            name="teacherId"
            placeholder="Teacher ID"
            value={formData.teacherId}
            onChange={handleChange}
            required
          />
          <Input
            type="text"
            name="fullName"
            placeholder="Full Name"
            value={formData.fullName}
            onChange={handleChange}
            required
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
            required
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
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">Photo</label>
            {formData.photo && (
              <div className="mb-2">
                <img 
                  src={formData.photo} 
                  alt="Current teacher photo" 
                  className="h-20 w-20 object-cover rounded"
                />
              </div>
            )}
            <input
              type="file"
              accept="image/*"
              onChange={handlePhotoUpload}
              className="block w-full text-sm text-gray-500
                file:mr-4 file:py-2 file:px-4
                file:rounded-md file:border-0
                file:text-sm file:font-semibold
                file:bg-blue-50 file:text-blue-700
                hover:file:bg-blue-100"
            />
          </div>
          <Input
            type="text"
            name="rank"
            placeholder="Rank"
            value={formData.rank}
            onChange={handleChange}
          />
          <Input
            type="number"
            name="income"
            placeholder="Income"
            value={formData.income}
            onChange={handleChange}
          />
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">Plan</label>
            <select
              name="plan"
              value={formData.plan}
              onChange={handleChange}
              className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            >
              {planOptions.map((plan) => (
                <option key={plan} value={plan}>
                  {plan}
                </option>
              ))}
            </select>
          </div>
          <Button 
            type="submit" 
            className="w-full bg-blue-600 hover:bg-blue-700 text-white"
            disabled={isUpdating}
          >
            {isUpdating ? 'Updating...' : 'Update Teacher'}
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