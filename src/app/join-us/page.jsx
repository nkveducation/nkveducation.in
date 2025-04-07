'use client';

import { motion } from 'framer-motion';
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function JoinUs() {
    const pathname = usePathname();
    const paths = pathname.split("/").filter((p) => p);
    return (
        <main className=" m-0 p-0 min-w-full mt-[80px]">
            <div
                className="text-white px-6 py-8 flex justify-between items-center"
                style={{
                    backgroundImage: 'url("/images/red-dot-button-bg.jpeg")',
                    backgroundSize: 'cover',
                    backgroundRepeat: 'no-repeat',
                    backgroundPosition: 'center',
                }}
            >
                <h1 className="text-3xl font-bold">Join Us</h1>
                <div className="bg-white text-black px-4 py-2 rounded-full shadow-md">
                    <Link href="/" className="text-red-700 font-bold">Home</Link>
                    {paths.map((p, i) => (
                        <span key={i} className="text-gray-600">
                            {" "} / {p.charAt(0).toUpperCase() + p.slice(1)}
                        </span>
                    ))}
                </div>
            </div>
            <div className="max-w-2xl mx-auto bg-white p-8 rounded-xl shadow-md">
                <motion.h2
                    initial={{ opacity: 0, y: -20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="text-3xl font-bold text-center text-red-700 mb-6"
                >
                    Join Us
                </motion.h2>

                <form className="space-y-6">
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Full Name</label>
                        <input
                            type="text"
                            placeholder="Enter your full name"
                            className="mt-1 block w-full px-4 py-2 border rounded-md shadow-sm focus:ring-red-500 focus:border-red-500"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700">Email</label>
                        <input
                            type="email"
                            placeholder="Enter your email"
                            className="mt-1 block w-full px-4 py-2 border rounded-md shadow-sm focus:ring-red-500 focus:border-red-500"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700">Address</label>
                        <textarea
                            placeholder="Enter your address"
                            rows="3"
                            className="mt-1 block w-full px-4 py-2 border rounded-md shadow-sm focus:ring-red-500 focus:border-red-500"
                        ></textarea>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700">Phone Number</label>
                        <input
                            type="tel"
                            placeholder="Enter your phone number"
                            className="mt-1 block w-full px-4 py-2 border rounded-md shadow-sm focus:ring-red-500 focus:border-red-500"
                        />
                    </div>

                    <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        type="submit"
                        className="w-full py-3 px-4 bg-red-600 text-white font-semibold rounded-md hover:bg-red-700 transition"
                    >
                        Submit
                    </motion.button>
                </form>
            </div>
        </main>
    );
}
