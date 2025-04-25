'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';

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
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4 md:p-8">
      <Card className="w-full max-w-2xl shadow-xl rounded-2xl overflow-hidden">
        <CardHeader className="bg-gradient-to-r from-indigo-600 to-blue-600 text-white p-6">
          <div className="flex flex-col items-center space-y-2">
            <Avatar className="w-16 h-16 border-4 border-white/20">
              {imagePreview ? (
                <AvatarImage src={imagePreview} alt="Employee" />
              ) : (
                <AvatarFallback className="bg-white/20 text-white text-2xl font-medium">
                  {formData.fullName ? formData.fullName.charAt(0) : 'E'}
                </AvatarFallback>
              )}
            </Avatar>
            <div className="text-center">
              <CardTitle className="text-2xl font-bold">Employee Registration</CardTitle>
              <CardDescription className="text-white/90">
                Fill in the details to register a new employee
              </CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent className="p-6 md:p-8">
          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {Object.keys(formData).map((key) => (
                key !== 'photo' && (
                  <div key={key} className="space-y-2">
                    <Label htmlFor={key} className="text-sm font-medium text-gray-700 capitalize">
                      {key.replace(/([A-Z])/g, ' $1')}
                    </Label>
                    <Input
                      type={key === 'phone' || key === 'aadhar' ? 'tel' : 'text'}
                      name={key}
                      id={key}
                      value={formData[key]}
                      onChange={handleChange}
                      className="w-full focus:ring-2 focus:ring-indigo-500"
                    />
                  </div>
                )
              ))}
              
              <div className="md:col-span-2 space-y-2">
                <Label htmlFor="photo" className="text-sm font-medium text-gray-700">
                  Employee Photo
                </Label>
                <div className="flex items-center gap-4">
                  <div className="relative flex-1">
                    <Input
                      type="file"
                      id="photo"
                      name="photo"
                      accept="image/*"
                      onChange={handlePhotoUpload}
                      className="w-full opacity-0 absolute inset-0 cursor-pointer"
                    />
                    <div className="flex items-center justify-between px-4 py-2 border border-gray-300 rounded-md bg-gray-50 hover:bg-gray-100">
                      <span className="text-sm text-gray-600 truncate">
                        {imagePreview ? 'Change photo' : 'Choose a photo...'}
                      </span>
                      <Button variant="outline" size="sm" type="button" className="pointer-events-none">
                        Browse
                      </Button>
                    </div>
                  </div>
                  {imagePreview && (
                    <Avatar className="w-12 h-12">
                      <AvatarImage src={imagePreview} alt="Preview" />
                    </Avatar>
                  )}
                </div>
              </div>
            </div>

            <div className="pt-4">
              <Button
                type="submit"
                className="w-full py-6 bg-gradient-to-r from-indigo-600 to-blue-600 hover:from-indigo-700 hover:to-blue-700 text-lg font-medium shadow-md transition-all hover:shadow-lg"
              >
                Submit Registration
              </Button>
            </div>
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