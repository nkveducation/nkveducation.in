'use client';

import { useEffect } from 'react';
import emailjs from 'emailjs-com';
import toast, { Toaster } from 'react-hot-toast';

export default function PaymentPopupPage() {
  const handlePayment = async () => {
    const data = JSON.parse(localStorage.getItem('formData') || '{}');

    if (!data?.email || !data?.fullName) {
      toast.error('Form data missing');
      window.close();
      return;
    }

    const options = {
      key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
      amount: 51400,
      currency: 'INR',
      name: 'Registration Fee',
      description: 'Membership Registration',
      handler: function (response) {
        emailjs
          .send(
            process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID,
            'template_upc18bf',
            data,
            process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY
          )
          .then(() => {
            toast.success('Payment Successful & Email Sent!');
            localStorage.removeItem('formData');
            setTimeout(() => window.close(), 2000);
          })
          .catch(() => {
            toast.error('Email send failed');
            setTimeout(() => window.close(), 2000);
          });
      },
      prefill: {
        name: data.fullName,
        email: data.email,
        contact: data.phone
      },
      theme: { color: '#F37254' },
      modal: {
        ondismiss: () => {
          toast('Payment Cancelled');
          setTimeout(() => window.close(), 1500);
        }
      }
    };

    const rzp = new window.Razorpay(options);
    rzp.open();
  };

  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://checkout.razorpay.com/v1/checkout.js';
    script.async = true;
    script.onload = handlePayment;
    document.body.appendChild(script);
  }, []);

  return (
    <div className="text-center mt-10">
      <Toaster position="top-center" />
      <p>Loading Razorpay...</p>
    </div>
  );
}
