'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';
import Link from 'next/link';
import emailjs from 'emailjs-com';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Script from 'next/script';

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.1 },
  }),
};

const plans = [
  { id: 'basic', name: 'Basic', price: 4999, features: ['Basic features'] },
  { id: 'standard', name: 'Standard', price: 9999, features: ['Standard features'] },
  { id: 'premium', name: 'Premium', price: 19999, features: ['Premium features'] },
  { id: 'vip', name: 'VIP', price: 49999, features: ['VIP features'] },
  { id: 'provip', name: 'Pro VIP', price: 99999, features: ['All premium features'] },
];

export default function RegisterPage() {
  const [form, setForm] = useState({
    businessName: '',
    employeeId: '',
    sponsorCode: '',
    fullName: '',
    dob: '',
    guardianName: '',
    phone: '',
    email: '',
    address: '',
    state: '',
    selectedPlan: '',
  });

  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const loadRazorpay = () => {
    return new Promise((resolve) => {
      const script = document.createElement('script');
      script.src = 'https://checkout.razorpay.com/v1/checkout.js';
      script.onload = () => {
        resolve(true);
      };
      script.onerror = () => {
        resolve(false);
      };
      document.body.appendChild(script);
    });
  };

  const handlePayment = async (plan) => {
    try {
      setIsLoading(true);
      setForm({ ...form, selectedPlan: plan.id });
  
      // 1. Verify Razorpay is loaded
      if (!window.Razorpay) {
        const loaded = await loadRazorpay();
        if (!loaded) throw new Error("Failed to load Razorpay");
      }
  
      // 2. Create Order
      const orderResponse = await fetch('/api/create-order', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          amount: plan.price * 100,
          currency: 'INR',
          receipt: `receipt_${Date.now()}`,
          notes: {
            plan: plan.name,
            customerEmail: form.email
          }
        })
      });
  
      const orderData = await orderResponse.json();
      if (!orderData.success) throw new Error(orderData.message || "Order creation failed");
  
      // 3. Payment Options
      const options = {
        key: process.env.RAZORPAY_KEY_ID,
        amount: orderData.order.amount,
        currency: orderData.order.currency,
        name: "Your Company Name",
        description: `${plan.name} Plan Registration`,
        image: '/logo.png',
        order_id: orderData.order.id,
        handler: async function(response) {
          try {
            const verification = await fetch('/api/verify-payment', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({
                razorpay_payment_id: response.razorpay_payment_id,
                razorpay_order_id: response.razorpay_order_id,
                razorpay_signature: response.razorpay_signature,
                formData: form,
                plan: plan
              })
            });
            
            const result = await verification.json();
            if (result.success) {
              toast.success(`Payment successful! ID: ${response.razorpay_payment_id}`);
            } else {
              toast.error("Payment verification failed");
            }
          } catch (error) {
            toast.error("Error verifying payment");
            console.error("Verification error:", error);
          }
        },
        prefill: {
          name: form.fullName,
          email: form.email,
          contact: form.phone
        },
        theme: {
          color: '#EF4444'
        },
        modal: {
          ondismiss: () => {
            toast.info("Payment window closed");
            setIsLoading(false);
          }
        }
      };
  
      const rzp = new window.Razorpay(options);
      rzp.open();
  
    } catch (error) {
      console.error("Payment error:", error);
      toast.error(error.message || "Payment failed");
      setIsLoading(false);
    }
  };

  return (
    <main className="m-0 p-0 min-w-full mt-[80px] overflow-x-hidden">
      <ToastContainer position="top-center" autoClose={3000} />
      <Script src="https://checkout.razorpay.com/v1/checkout.js" strategy="lazyOnload" />

      <div
        className="text-white px-6 py-8 flex justify-between items-center"
        style={{ background: 'linear-gradient(to right, #dc2626, #b91c1c)' }}
      >
        <h1 className="text-3xl font-bold">Tie-Up Register</h1>
        <div className="bg-white text-black px-4 py-2 rounded-full shadow-md">
          <Link href="/" className="text-red-700 font-bold">
            Home
          </Link>
          <span className="mx-2">/</span>
          <span className="text-gray-600">Tie-Up Register</span>
        </div>
      </div>

      <section className="min-h-screen bg-gray-100 py-12 px-4">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-2xl font-bold text-center text-red-600 mb-6">Registration Form</h1>

          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-white rounded-2xl shadow-xl p-8">
              <form className="space-y-5">
                {[
                  { label: 'Business Name', name: 'businessName' },
                  { label: 'Employee Id', name: 'employeeId' },
                  { label: 'Sponsor Code', name: 'sponsorCode' },
                  { label: 'Full Name', name: 'fullName', required: true },
                  { label: 'Date of Birth', name: 'dob', placeholder: 'dd-mm-yyyy' },
                  { label: 'Father / Husband Name', name: 'guardianName' },
                  { label: 'Phone No.', name: 'phone', required: true },
                  { label: 'Email', name: 'email', required: true },
                  { label: 'Full Address', name: 'address' },
                  { label: 'State', name: 'state' },
                ].map((field, i) => (
                  <motion.div key={field.name} custom={i} initial="hidden" animate="visible" variants={fadeUp}>
                    <input
                      type={field.name === 'email' ? 'email' : 'text'}
                      name={field.name}
                      placeholder={field.placeholder || field.label}
                      value={form[field.name]}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border rounded-md focus:ring-2 focus:ring-red-400"
                      required={field.required}
                    />
                  </motion.div>
                ))}
              </form>
            </div>

            <div className="bg-white rounded-2xl shadow-xl p-8">
              <h2 className="text-xl font-bold text-center text-gray-800 mb-6">Select Your Plan</h2>
              <div className="space-y-4">
                {plans.map((plan) => (
                  <motion.div
                    key={plan.id}
                    whileHover={{ scale: 1.02 }}
                    className={`border rounded-lg p-4 cursor-pointer transition-all ${
                      form.selectedPlan === plan.id ? 'border-red-500 bg-red-50' : 'border-gray-200 hover:border-red-300'
                    }`}
                    onClick={() => handlePayment(plan)}
                  >
                    <div className="flex justify-between items-center">
                      <div>
                        <h3 className="font-bold text-lg">{plan.name}</h3>
                        <p className="text-gray-600">{plan.features.join(', ')}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-2xl font-bold text-red-600">₹{plan.price.toLocaleString()}</p>
                        <p className="text-sm text-gray-500">One-time payment</p>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>

              {isLoading && (
                <div className="mt-6 text-center">
                  <div className="inline-block animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-red-600"></div>
                  <p className="mt-2 text-gray-600">Processing payment...</p>
                </div>
              )}

              <div className="mt-6 p-4 bg-gray-50 rounded-lg">
                <h3 className="font-bold text-gray-800 mb-2">Payment Information</h3>
                <p className="text-sm text-gray-600">
                  Secure payment processed by Razorpay. All transactions are encrypted and secure.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}