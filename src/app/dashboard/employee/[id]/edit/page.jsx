'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';

export default function EditEmployee() {
  const router = useRouter();
  const { id } = useParams();
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
    photo: '',
  });
  const [imagePreview, setImagePreview] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (id) {
      fetchEmployee();
    }
  }, [id]);

  const fetchEmployee = async () => {
    try {
      const response = await fetch(`/api/employees/${id}`);
      if (!response.ok) {
        throw new Error('Failed to fetch employee data');
      }
      const result = await response.json();
      if (result.success) {
        setFormData(result.data);
        setImagePreview(result.data.photo);
      }
    } catch (error) {
      console.error('Error fetching employee:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
        setFormData({ ...formData, photo: reader.result });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`/api/employees/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      if (!response.ok) {
        throw new Error('Failed to update employee');
      }
      const result = await response.json();
      if (result.success) {
        router.push('/dashboard/employees');
      }
    } catch (error) {
      console.error('Error updating employee:', error);
    }
  };

  if (isLoading) {
    return <div className="text-center text-lg font-semibold">Loading...</div>;
  }

  return (
    <div className="flex justify-center items-center min-h-screen">
      <Card className="w-full max-w-xl p-6">
        <CardHeader className="text-center">
          <CardTitle>Edit Employee</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            {Object.keys(formData).map((key) => (
              key !== 'photo' && (
                <div key={key}>
                  <Label htmlFor={key} className="capitalize">{key.replace(/([A-Z])/g, ' $1')}</Label>
                  <Input type="text" name={key} id={key} value={formData[key]} onChange={handleChange} />
                </div>
              )
            ))}

            <div>
              <Label htmlFor="photo">Employee Photo</Label>
              <Input type="file" id="photo" name="photo" accept="image/*" onChange={handleImageChange} />
              {imagePreview && (
                <div className="mt-2 flex justify-center">
                  <img src={imagePreview} alt="Employee Preview" className="w-24 h-24 rounded-lg shadow" />
                </div>
              )}
            </div>

            <Button type="submit" className="w-full">Update</Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
