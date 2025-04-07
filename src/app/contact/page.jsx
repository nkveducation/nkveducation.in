'use client';

import { motion } from 'framer-motion';
import { Mail, PhoneCall } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from "next/navigation";


export default function ContactPage() {
    const pathname = usePathname();
    const paths = pathname.split("/").filter((p) => p);

    return (
        <main className="m-0 p-0 min-w-full mt-[80px]">
            {/* Breadcrumb */}
            <div
                className="text-white px-6 py-8 flex justify-between items-center"
                style={{
                    backgroundImage: 'url("/images/red-dot-button-bg.jpeg")',
                    backgroundSize: 'cover',
                    backgroundRepeat: 'no-repeat',
                    backgroundPosition: 'center',
                }}
            >
                <h1 className="text-3xl font-bold">Contact Us</h1>
                <div className="bg-white text-black px-4 py-2 rounded-full shadow-md">
                    <Link href="/" className="text-red-700 font-bold">Home</Link>
                    {paths.map((p, i) => (
                        <span key={i} className="text-gray-600">
                            {" "} / {p.charAt(0).toUpperCase() + p.slice(1)}
                        </span>
                    ))}
                </div>
            </div>
            <section className=" bg-white py-12 px-4 md:px-12">

                <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-10 items-start">

                    {/* Contact Form */}
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6 }}
                        className="bg-white p-8 rounded-xl shadow-md"
                    >
                        <h2 className="text-2xl font-bold mb-6 text-red-600">Contact Us</h2>
                        <form className="space-y-5">
                            <input
                                type="text"
                                placeholder="Full Name"
                                className="w-full px-4 py-3 border rounded-md focus:ring-2 focus:ring-red-400"
                            />
                            <input
                                type="tel"
                                placeholder="Phone No."
                                className="w-full px-4 py-3 border rounded-md focus:ring-2 focus:ring-red-400"
                            />
                            <input
                                type="email"
                                placeholder="Email"
                                className="w-full px-4 py-3 border rounded-md focus:ring-2 focus:ring-red-400"
                            />
                            <textarea
                                placeholder="Message"
                                rows="4"
                                className="w-full px-4 py-3 border rounded-md focus:ring-2 focus:ring-red-400"
                            ></textarea>
                            <motion.button
                                whileHover={{ scale: 1.03 }}
                                whileTap={{ scale: 0.98 }}
                                type="submit"
                                className="w-full bg-red-600 text-white py-3 rounded-md font-semibold shadow hover:bg-red-700 transition"
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
                        <h2 className="text-2xl font-bold mb-4">Quick Contact</h2>
                        <p className="mb-6 text-sm">
                            If you've got any questions, please fill out the short form or drop us an email.
                            We promise to respond with lightning speed. 🚀
                        </p>

                        <div className="space-y-6">
                            <div className="flex items-center gap-4">
                                <span className="p-3 bg-red-600 rounded-full text-white">
                                    <Mail className="w-5 h-5" />
                                </span>
                                <div>
                                    <p className="text-sm font-medium">Email</p>
                                    <p className="font-semibold">info@nkleducation.in</p>
                                </div>
                            </div>

                            <div className="flex items-center gap-4">
                                <span className="p-3 bg-red-600 rounded-full text-white">
                                    <PhoneCall className="w-5 h-5" />
                                </span>
                                <div>
                                    <p className="text-sm font-medium">Phone</p>
                                    <p className="font-semibold">+91 6397 12XXXX</p>
                                </div>
                            </div>

                            <div className="flex items-center gap-4">
                                <span className="p-3 bg-red-600 rounded-full text-white">
                                    <PhoneCall className="w-5 h-5" />
                                </span>
                                <div>
                                    <p className="text-sm font-medium">Phone 2</p>
                                    <p className="font-semibold">+91 6397 12XXXX</p>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </section>
        </main>
    );
}
