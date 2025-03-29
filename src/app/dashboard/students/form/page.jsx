'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function AddStudent() {
  const [formData, setFormData] = useState({
    teacherId: '',
    instituteCity: '',
    instituteState: '',
    instituteName: '',
    fullName: '',
    fatherOrHusbandName: '',
    dob: '',
    studentAddress: '',
    email: '',
    phoneNo: '',
    aadharCardNo: '',
    certificateNo: '',
    duration: '',
    course: '',
    grade: '',
    rollNo: '',
    photo: null
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handlePhotoChange = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onloadend = () => {
      setFormData({ ...formData, photo: reader.result });
    };
    if (file) reader.readAsDataURL(file);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      const response = await fetch('/api/students', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      
      const result = await response.json();
      if (result.success) {
        router.push('/dashboard/students');
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 p-4">
      {/* Personal Details */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <input name="fullName" placeholder="Full Name" value={formData.fullName} onChange={handleChange} required />
        <input name="fatherOrHusbandName" placeholder="Father/Husband Name" value={formData.fatherOrHusbandName} onChange={handleChange} />
        <input name="dob" type="date" placeholder="Date of Birth" value={formData.dob} onChange={handleChange} required />
        <input name="studentAddress" placeholder="Address" value={formData.studentAddress} onChange={handleChange} />
        <input name="email" type="email" placeholder="Email" value={formData.email} onChange={handleChange} required />
        <input name="phoneNo" type="tel" placeholder="Phone Number" value={formData.phoneNo} onChange={handleChange} required />
        <input name="aadharCardNo" placeholder="Aadhar Card Number" value={formData.aadharCardNo} onChange={handleChange} />
      </div>
      
      {/* Institute Details */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <input name="teacherId" placeholder="Teacher ID" value={formData.teacherId} onChange={handleChange} />
        <input name="instituteCity" placeholder="Institute City" value={formData.instituteCity} onChange={handleChange} />
        <input name="instituteState" placeholder="Institute State" value={formData.instituteState} onChange={handleChange} />
        <input name="instituteName" placeholder="Institute Name" value={formData.instituteName} onChange={handleChange} />
      </div>
      
      {/* Course Details */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <input name="certificateNo" placeholder="Certificate Number" value={formData.certificateNo} onChange={handleChange} />
        <input name="duration" placeholder="Duration" value={formData.duration} onChange={handleChange} />
        <input name="course" placeholder="Course" value={formData.course} onChange={handleChange} />
        <input name="grade" placeholder="Grade" value={formData.grade} onChange={handleChange} />
        <input name="rollNo" placeholder="Roll Number" value={formData.rollNo} onChange={handleChange} />
      </div>
      
      {/* Photo Upload */}
      <input type="file" accept="image/*" onChange={handlePhotoChange} />
      
      <button type="submit" disabled={isSubmitting} className="bg-blue-500 text-white px-4 py-2 rounded">
        {isSubmitting ? 'Submitting...' : 'Add Student'}
      </button>
    </form>
  );
}
