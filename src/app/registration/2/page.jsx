'use client';

import Link from 'next/link';
import { useState } from 'react';

export default function TeacherForm() {
  const [form, setForm] = useState({
    teacherId: '', fullName: '', fatherName: '', dob: '',
    aadhar: '', email: '', phone: '', address: '', state: '',
    duration: '', photo: null
  });

  const [showPaymentInfo, setShowPaymentInfo] = useState(false);

  const handleChange = async (e) => {
    const { name, value, files } = e.target;
    if (files && files[0]) {
      const imageData = new FormData();
      imageData.append('file', files[0]);
      imageData.append('upload_preset', 'unsigned_upload');
      imageData.append('folder', 'img');

      const res = await fetch('https://api.cloudinary.com/v1_1/dzjzkjsiq/image/upload', {
        method: 'POST',
        body: imageData
      });

      const data = await res.json();
      setForm({ ...form, photo: data.secure_url });
    } else {
      setForm({ ...form, [name]: value });
    }
  };

  const handleNextClick = (e) => {
    e.preventDefault();
    // You can add form validation here
    setShowPaymentInfo(true);
  };

  const handlePayClick = () => {
    localStorage.setItem('formData', JSON.stringify(form));
    window.open('/membership/payment-popup', '_blank', 'width=500,height=700');
  };

  return (
    <main className="m-0 p-0 min-w-full mt-[80px] overflow-x-hidden">
      <div
        className="text-white px-6 py-8 flex justify-between items-center  "
        style={{
          backgroundImage: 'url("/images/red-dot-button-bg.jpeg")',
          backgroundSize: 'cover',
          backgroundRepeat: 'no-repeat',
          backgroundPosition: 'center',
        }}
      >
        <h1 className="text-3xl font-bold">Student Registration</h1>
        <div className="bg-white text-black px-4 py-2 rounded-full shadow-md">
          <Link href="/" className="text-red-700 font-bold">
            Home
          </Link>
          <span className="mx-2">/</span>
          <span className="text-gray-600">Student Registration</span>
        </div>
      </div>

      
      <div className="p-6 max-w-lg mx-auto bg-white rounded shadow">
        {!showPaymentInfo ? (
          <form onSubmit={handleNextClick}>
            <h2 className="text-xl font-bold mb-4">Step 1: Fill Your Details</h2>

            <input name="teacherId" onChange={handleChange} placeholder="Teacher ID *" className="w-full border p-2 mb-2" required />
            <input name="fullName" onChange={handleChange} placeholder="Full Name *" className="w-full border p-2 mb-2" required />
            <input name="fatherName" onChange={handleChange} placeholder="Father's Name *" className="w-full border p-2 mb-2" required />
            <input name="dob" type="date" onChange={handleChange} className="w-full border p-2 mb-2" required />
            <input name="aadhar" onChange={handleChange} placeholder="Aadhar No. *" className="w-full border p-2 mb-2" required />
            <input name="email" type="email" onChange={handleChange} placeholder="Email Address *" className="w-full border p-2 mb-2" required />
            <input name="phone" type="tel" onChange={handleChange} placeholder="Phone No. *" className="w-full border p-2 mb-2" required />
            <input name="address" onChange={handleChange} placeholder="Full Address *" className="w-full border p-2 mb-2" required />
            <input name="state" onChange={handleChange} placeholder="State *" className="w-full border p-2 mb-2" required />
            <select name="duration" onChange={handleChange} className="w-full border p-2 mb-2" required>
              <option value="">Select Duration*</option>
              <option value="3">3 Months</option>
              <option value="6">6 Months</option>
              <option value="12">1 Year</option>
              <option value="24">2 Years</option>
            </select>
            <input name="photo" type="file" accept="image/*" onChange={handleChange} className="w-full border p-2 mb-4" required />

            <button type="submit" className="w-full bg-red-600 text-white p-2 rounded">Next</button>
          </form>
        ) : (
          <div className="text-center text-black">
            <h2 className="text-2xl font-bold mb-6">Payment Summary</h2>

            <div className="bg-white border border-gray-300 shadow-sm p-6 rounded-lg text-left mb-6 w-full max-w-md mx-auto">
              <div className="flex justify-between mb-2">
                <span className="font-medium">Registration Fee:</span>
                <span>₹500</span>
              </div>
              <div className="flex justify-between mb-2">
                <span className="font-medium">GST:</span>
                <span>₹14</span>
              </div>
              <div className="flex justify-between mb-2">
                <span className="font-medium">Charges:</span>
                <span>₹0</span>
              </div>

              <hr className="my-4 border-gray-300" />

              <div className="flex justify-between text-lg font-semibold">
                <span>Total:</span>
                <span>₹514/-</span>
              </div>
            </div>

            <button
              onClick={handlePayClick}
              className="bg-green-600 hover:bg-green-700 transition-colors duration-200 text-white px-8 py-3 rounded-lg shadow-md"
            >
              Proceed to Pay
            </button>
          </div>

        )}
      </div>
    </main>
  );
}
