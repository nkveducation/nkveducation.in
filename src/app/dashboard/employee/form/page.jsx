'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';

export default function EmployeeForm() {
  const [formData, setFormData] = useState({
    fullName: '',
    fatherName: '',
    empId: '',
    instituteName: '',
    instituteAddress: '',
    aadhar: '',
    city: '',
    rank: '',
    phone: '',
    sponsorCode: '',
    photo: null,
  });
  const [imagePreview, setImagePreview] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handlePhotoUpload = async (e) => {
    const file = e.target.files[0];
    if (file) {
      const base64 = await convertToBase64(file);
      setImagePreview(base64);
      setFormData({ ...formData, photo: base64 });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch('/api/submit', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData),
    });
    const result = await response.json();
    console.log(result);
  };

  return (
    <div className="flex justify-center w-screen items-center min-h-screen bg-gray-100 p-4">
      <Card className="w-full max-w-lg shadow-lg">
        <CardHeader className="text-center">
          <CardTitle className="text-xl font-semibold">Employee Registration</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            {Object.keys(formData).map((key) => (
              key !== 'photo' && (
                <div key={key}>
                  <Label htmlFor={key} className="capitalize">{key.replace(/([A-Z])/g, ' $1')}</Label>
                  <Input type="text" name={key} id={key} value={formData[key]} onChange={handleChange} className="w-full" />
                </div>
              )
            ))}
            
            <div>
              <Label htmlFor="photo">Employee Photo</Label>
              <Input type="file" id="photo" name="photo" accept="image/*" onChange={handlePhotoUpload} className="w-full" />
              {imagePreview && (
                <div className="mt-2 flex justify-center">
                  <img src={imagePreview} alt="Preview" className="w-24 h-24 rounded-lg shadow" />
                </div>
              )}
            </div>

            <Button type="submit" className="w-full">Submit</Button>
          </form>
        </CardContent>
      </Card>
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
