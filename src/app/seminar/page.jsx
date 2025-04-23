"use client";

import Head from 'next/head';
import Image from 'next/image';
import { useState } from 'react';
import emailjs from 'emailjs-com';


const Gallery = [
  {img:"/seminar-img/gallery1.jpg", alt:"Beauty seminar demonstration"},
  {img:"/seminar-img/gallery2.jpg", alt:"Makeup workshop"},
  {img:"/seminar-img/gallery3.jpg", alt:"Hair styling session"},
  {img:"/seminar-img/gallery4.jpg", alt:"Skincare tutorial"},
  {img:"/seminar-img/gallery5.png", alt:"Professional techniques"},
  {img:"/seminar-img/gallery6.jpg", alt:"Student practice"},
  {img:"/seminar-img/gallery7.jpg", alt:"Seminar group photo"},
];

export default function Home() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    interest: ''
  });
  const [formErrors, setFormErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
    // Clear error when user types
    if (formErrors[name]) {
      setFormErrors({
        ...formErrors,
        [name]: ''
      });
    }
  };

  const validateForm = () => {
    const errors = {};
    if (!formData.name.trim()) errors.name = 'Name is required';
    if (!formData.email.trim()) {
      errors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      errors.email = 'Email is invalid';
    }
    if (!formData.phone.trim()) errors.phone = 'Phone is required';
    if (!formData.interest) errors.interest = 'Please select an interest';
    
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;
    
    setIsSubmitting(true);
    
    try {
      // Initialize EmailJS with your Public Key
      emailjs.init(process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY);
      
      // Send the form data using EmailJS
      const response = await emailjs.send(
        process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID,
        process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID_TOW,
        {
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          interest: getInterestLabel(formData.interest),
          date: new Date().toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
          })
        }
      );
      
      if (response.status === 200) {
        setSubmitSuccess(true);
        setFormData({
          name: '',
          email: '',
          phone: '',
          interest: ''
        });
      }
    } catch (error) {
      console.error('Error sending email:', error);
      alert('There was an error submitting your form. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };
  
  // Helper function to get interest label
  const getInterestLabel = (value) => {
    const interests = {
      makeup: "Makeup Artistry",
      skincare: "Skincare",
      hairstyling: "Hair Styling",
      all: "All Areas"
    };
    return interests[value] || value;
  };

  return (
    <div className="min-h-screen bg-pink-50">
      <Head>
        <title>NKV Education - Professional Beauty Seminar</title>
        <meta name="description" content="Join our exclusive beauty seminar and learn from industry experts" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center">
        <div className="absolute inset-0 overflow-hidden">
          <Image 
            src="/seminar-img/hero.jpg" 
            alt="NKV Education Beauty Seminar"
            layout="fill"
            objectFit="cover"
            quality={100}
            priority
            className="opacity-70"
          />
        </div>
        <div className="relative z-10 text-center px-4">
          <h1 className="text-5xl md:text-7xl font-bold text-pink-800 mb-4">NKV Education</h1>
          <h2 className="text-3xl md:text-5xl font-semibold text-gray-800 mb-8">Professional Beauty Seminar 2026</h2>
          <a href="#register" className="inline-block bg-pink-600 hover:bg-pink-700 text-white font-bold py-3 px-8 rounded-full text-lg transition duration-300 transform hover:scale-105">
            Register Now
          </a>
        </div>
      </section>

      {/* About Seminar */}
      <section className="py-20 px-4 max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-pink-700 mb-4">About The Seminar</h2>
          <div className="w-24 h-1 bg-pink-500 mx-auto"></div>
        </div>
        
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="relative aspect-video rounded-lg overflow-hidden shadow-xl">
            <Image 
              src="/seminar-img/salon-hero.jpg"
              alt="Beauty Seminar"
              fill
              className="object-cover"
            />
          </div>
          <div>
            <h3 className="text-2xl font-semibold text-gray-800 mb-4">Transform Your Beauty Skills</h3>
            <p className="text-gray-600 mb-6">
              Join our exclusive one-day beauty seminar featuring industry-leading professionals. 
              Learn the latest techniques in skincare, makeup, hair styling, and more from NKV Education's 
              certified experts with over 10 years of experience in the beauty industry.
            </p>
            <ul className="space-y-3">
              <li className="flex items-start">
                <svg className="h-6 w-6 text-pink-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span>Hands-on demonstrations with professional tools</span>
              </li>
              <li className="flex items-start">
                <svg className="h-6 w-6 text-pink-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span>Latest industry trends and techniques</span>
              </li>
              <li className="flex items-start">
                <svg className="h-6 w-6 text-pink-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span>Professional product recommendations</span>
              </li>
              <li className="flex items-start">
                <svg className="h-6 w-6 text-pink-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span>Certificate of participation</span>
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* Gallery */}
      <section className="py-20 bg-pink-100">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-pink-700 mb-4">Gallery</h2>
            <div className="w-24 h-1 bg-pink-500 mx-auto"></div>
            <p className="mt-4 text-gray-600 max-w-2xl mx-auto">
              See highlights from our previous seminars and workshops
            </p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {Gallery.map((item, index) => (
              <div key={index} className="group relative overflow-hidden rounded-lg shadow-lg aspect-square">
                <Image 
                  src={item.img}
                  alt={item.alt}
                  fill
                  className="object-cover transform group-hover:scale-105 transition duration-500"
                />
                <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition duration-300">
                  <svg className="h-12 w-12 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="register" className="py-20 px-4 max-w-4xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-pink-700 mb-4">Register Now</h2>
          <div className="w-24 h-1 bg-pink-500 mx-auto"></div>
          <p className="mt-4 text-gray-600 max-w-2xl mx-auto">
            Limited seats available! Register today to secure your spot.
          </p>
        </div>
        
        <div className="bg-white rounded-xl shadow-xl p-8 md:p-12">
          {submitSuccess ? (
            <div className="text-center py-8">
              <svg className="h-16 w-16 text-green-500 mx-auto mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              <h3 className="text-2xl font-bold text-gray-800 mb-2">Registration Successful!</h3>
              <p className="text-gray-600 mb-6">Thank you for registering. We've sent a confirmation to your email and will contact you soon.</p>
              <button
                onClick={() => setSubmitSuccess(false)}
                className="bg-pink-600 hover:bg-pink-700 text-white font-bold py-3 px-6 rounded-lg transition duration-300"
              >
                Register Another Person
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} noValidate>
              <div className="grid md:grid-cols-2 gap-6 mb-8">
                <div>
                  <label htmlFor="name" className="block text-gray-700 mb-2">Full Name *</label>
                  <input 
                    type="text" 
                    id="name" 
                    name="name" 
                    value={formData.name}
                    onChange={handleChange}
                    className={`w-full px-4 py-3 rounded-lg border ${formErrors.name ? 'border-red-500' : 'border-gray-300'} focus:outline-none focus:ring-2 focus:ring-pink-500`}
                    required
                  />
                  {formErrors.name && <p className="text-red-500 text-sm mt-1">{formErrors.name}</p>}
                </div>
                <div>
                  <label htmlFor="email" className="block text-gray-700 mb-2">Email Address *</label>
                  <input 
                    type="email" 
                    id="email" 
                    name="email" 
                    value={formData.email}
                    onChange={handleChange}
                    className={`w-full px-4 py-3 rounded-lg border ${formErrors.email ? 'border-red-500' : 'border-gray-300'} focus:outline-none focus:ring-2 focus:ring-pink-500`}
                    required
                  />
                  {formErrors.email && <p className="text-red-500 text-sm mt-1">{formErrors.email}</p>}
                </div>
                <div>
                  <label htmlFor="phone" className="block text-gray-700 mb-2">Phone Number *</label>
                  <input 
                    type="tel" 
                    id="phone" 
                    name="phone" 
                    value={formData.phone}
                    onChange={handleChange}
                    className={`w-full px-4 py-3 rounded-lg border ${formErrors.phone ? 'border-red-500' : 'border-gray-300'} focus:outline-none focus:ring-2 focus:ring-pink-500`}
                    required
                  />
                  {formErrors.phone && <p className="text-red-500 text-sm mt-1">{formErrors.phone}</p>}
                </div>
                <div>
                  <label htmlFor="interest" className="block text-gray-700 mb-2">Area of Interest *</label>
                  <select 
                    id="interest" 
                    name="interest" 
                    value={formData.interest}
                    onChange={handleChange}
                    className={`w-full px-4 py-3 rounded-lg border ${formErrors.interest ? 'border-red-500' : 'border-gray-300'} focus:outline-none focus:ring-2 focus:ring-pink-500`}
                    required
                  >
                    <option value="">Select an option</option>
                    <option value="makeup">Makeup Artistry</option>
                    <option value="skincare">Skincare</option>
                    <option value="hairstyling">Hair Styling</option>
                    <option value="all">All of the above</option>
                  </select>
                  {formErrors.interest && <p className="text-red-500 text-sm mt-1">{formErrors.interest}</p>}
                </div>
              </div>
              <button 
                type="submit" 
                disabled={isSubmitting}
                className={`w-full bg-pink-600 hover:bg-pink-700 text-white font-bold py-4 px-6 rounded-lg text-lg transition duration-300 ${isSubmitting ? 'opacity-70 cursor-not-allowed' : ''}`}
              >
                {isSubmitting ? 'Submitting...' : 'Submit Registration'}
              </button>
            </form>
          )}
        </div>
      </section>
    </div>
  );
}