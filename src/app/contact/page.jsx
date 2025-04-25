'use client';

import { motion } from 'framer-motion';
import { Mail, PhoneCall } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from "next/navigation";
import { useState } from 'react';
import emailjs from 'emailjs-com';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Breadcrumbs from '@/components/Breadcrumbs';

export default function ContactPage() {
  const pathname = usePathname();
  const paths = pathname.split("/").filter((p) => p);
  const [form, setForm] = useState({ name: '', phone: '', email: '', message: '' });

  const handleSubmit = async (e) => {
    e.preventDefault();

    const serviceID = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID;
    const templateID = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID;
    const publicKey = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY;

    const templateParams = {
      from_name: form.name,
      phone: form.phone,
      reply_to: form.email,
      message: form.message,
    };

    try {
      await emailjs.send(serviceID, templateID, templateParams, publicKey);
      toast.success('Message sent successfully 💌');
      setForm({ name: '', phone: '', email: '', message: '' });
    } catch (error) {
      console.error(error);
      toast.error('Failed to send message 😢');
    }
  };

  return (
    <main className="m-0 p-0 min-w-full mt-[80px] overflow-x-hidden bg-white">
      {/* Breadcrumb */}
      <div
        className="text-white px-6 py-8 flex justify-between items-center"
        style={{
          background: 'linear-gradient(to right, #dc2626, #b91c1c)',
        }}
      >
        <h1 className="text-3xl font-bold">Contact Us</h1>
        <Suspense fallback={<div>Loading breadcrumbs...</div>}>
                    <Breadcrumbs />
                </Suspense>

      </div>

      <section className="bg-white py-12 px-4 md:px-12">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-10 items-start">

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="bg-white p-8 rounded-xl shadow-lg border border-gray-100"
          >
            <h2 className="text-2xl font-bold mb-6 text-red-600">Get In Touch</h2>
            <form className="space-y-5" onSubmit={handleSubmit}>
              <input
                type="text"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                placeholder="Full Name"
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-red-500 focus:border-transparent"
              />
              <input
                type="tel"
                value={form.phone}
                onChange={(e) => setForm({ ...form, phone: e.target.value })}
                placeholder="Phone No."
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-red-500 focus:border-transparent"
              />
              <input
                type="email"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                placeholder="Email"
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-red-500 focus:border-transparent"
              />
              <textarea
                placeholder="Message"
                rows="4"
                value={form.message}
                onChange={(e) => setForm({ ...form, message: e.target.value })}
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-red-500 focus:border-transparent"
              ></textarea>
              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.98 }}
                type="submit"
                className="w-full bg-red-600 text-white py-3 rounded-md font-semibold shadow-lg hover:bg-red-700 transition-colors duration-300"
              >
                SUBMIT YOUR QUERY
              </motion.button>
            </form>
          </motion.div>

          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="text-gray-800"
          >
            <h2 className="text-2xl font-bold mb-4 text-red-600">Our Contact Information</h2>
            <p className="mb-6 text-gray-600">
              Have questions or need assistance? Reach out to us through any of these channels.
              Our team is ready to help you with your inquiries.
            </p>

            <div className="space-y-6">
              <div className="flex items-center gap-4 p-4 bg-red-50 rounded-lg">
                <span className="p-3 bg-red-600 rounded-full text-white">
                  <Mail className="w-5 h-5" />
                </span>
                <div>
                  <p className="text-sm font-medium text-gray-500">Email</p>
                  <p className="font-semibold text-red-600">info@nkleducation.in</p>
                </div>
              </div>

              <div className="flex items-center gap-4 p-4 bg-red-50 rounded-lg">
                <span className="p-3 bg-red-600 rounded-full text-white">
                  <PhoneCall className="w-5 h-5" />
                </span>
                <div>
                  <p className="text-sm font-medium text-gray-500">Phone</p>
                  <p className="font-semibold text-red-600">+91 6397 12XXXX</p>
                </div>
              </div>

              <div className="flex items-center gap-4 p-4 bg-red-50 rounded-lg">
                <span className="p-3 bg-red-600 rounded-full text-white">
                  <PhoneCall className="w-5 h-5" />
                </span>
                <div>
                  <p className="text-sm font-medium text-gray-500">Alternate Phone</p>
                  <p className="font-semibold text-red-600">+91 6397 12XXXX</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Toast Notifications */}
        <ToastContainer
          position="top-right"
          autoClose={3000}
          toastClassName="bg-white text-gray-800 shadow-lg border border-gray-200"
          progressClassName="bg-red-600"
        />
      </section>
    </main>
  );
}