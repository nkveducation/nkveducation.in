'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';
import Link from 'next/link';

const fadeUp = {
    hidden: { opacity: 0, y: 30 },
    visible: (i) => ({
        opacity: 1,
        y: 0,
        transition: { delay: i * 0.1 },
    }),
};

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
    });

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(form);
    };

    return (
        <main className="m-0 p-0 min-w-full mt-[80px]">
            <div
                className="text-white px-6 py-8 flex justify-between items-center"
                style={{
                    backgroundImage: 'url("/images/red-dot-button-bg.jpeg")',
                    backgroundSize: 'cover',
                    backgroundRepeat: 'no-repeat',
                    backgroundPosition: 'center',
                }}
            >
                {/* Breadcrumb */}
                <h1 className="text-3xl font-bold">Tie-Up Register</h1>
                <div className="bg-white text-black px-4 py-2 rounded-full shadow-md">
                    <Link href="/" className="text-red-700 font-bold">Home</Link>
                    <span className="mx-2">/</span>
                    <span className="text-gray-600">Tie-Up Register</span>
                </div>

            </div>

            <section className="min-h-screen bg-gray-100 py-12 px-4">
                <div className="max-w-xl mx-auto bg-white rounded-2xl shadow-xl p-8">

                    <h1 className="text-2xl font-bold text-center text-red-600 mb-6">Registration Form</h1>

                    <form className="space-y-5" onSubmit={handleSubmit}>
                        {[
                            { label: 'Business Name', name: 'businessName' },
                            { label: 'Employee Id', name: 'employeeId' },
                            { label: 'Sponsor Code', name: 'sponsorCode' },
                            { label: 'Full Name', name: 'fullName' },
                            { label: 'Date of Birth', name: 'dob', placeholder: 'dd-mm-yyyy' },
                            { label: 'Father / Husband Name', name: 'guardianName' },
                            { label: 'Phone No.', name: 'phone' },
                            { label: 'Email', name: 'email' },
                            { label: 'Full Address', name: 'address' },
                            { label: 'State', name: 'state' },
                        ].map((field, i) => (
                            <motion.div
                                key={field.name}
                                custom={i}
                                initial="hidden"
                                animate="visible"
                                variants={fadeUp}
                            >
                                <input
                                    type={field.name === 'email' ? 'email' : 'text'}
                                    name={field.name}
                                    placeholder={field.placeholder || field.label}
                                    value={form[field.name]}
                                    onChange={handleChange}
                                    className="w-full px-4 py-3 border rounded-md focus:ring-2 focus:ring-red-400"
                                    required
                                />
                            </motion.div>
                        ))}

                        <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            type="submit"
                            className="w-full bg-red-600 text-white py-3 rounded-md font-bold shadow hover:bg-red-700 transition"
                        >
                            REGISTER NOW
                        </motion.button>
                    </form>
                </div>
            </section>
        </main>

    );
}
