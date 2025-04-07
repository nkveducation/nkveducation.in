"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function About() {
    const pathname = usePathname();
    const paths = pathname.split("/").filter((p) => p); // ["about"]

    return (
        <main className="m-0 p-0 min-w-full mt-[80px]">
            {/* Breadcrumb Navigation */}
            <div
                className="text-white px-6 py-8 flex justify-between items-center"
                style={{
                    backgroundImage: 'url("/images/red-dot-button-bg.jpeg")',
                    backgroundSize: 'cover',
                    backgroundRepeat: 'no-repeat',
                    backgroundPosition: 'center',
                }}
            >
                <h1 className="text-3xl font-bold">About Us</h1>
                <div className="bg-white text-black px-4 py-2 rounded-full shadow-md">
                    <Link href="/" className="text-red-700 font-bold">Home</Link>
                    {paths.map((p, i) => (
                        <span key={i} className="text-gray-600">
                            {" "} / {p.charAt(0).toUpperCase() + p.slice(1)}
                        </span>
                    ))}
                </div>
            </div>

            {/* About Section */}
            <section className="py-12 px-4 md:px-8 lg:px-16 bg-white">
                <div className="max-w-6xl mx-auto">
                    <div className="flex flex-col lg:flex-row gap-10 items-center">
                        <motion.div
                            initial={{ opacity: 0, x: -40 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.8 }}
                            className="w-full lg:w-2/5"
                        >
                            <img
                                src="/images/demo_images.png"
                                alt="About NKV Education"
                                className="rounded-xl shadow-xl hover:scale-105 transition duration-300"
                            />
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, x: 40 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.8 }}
                            className="w-full lg:w-3/5"
                        >
                            <h2 className="text-2xl md:text-3xl font-bold mb-4">Who We Are?</h2>
                            <h3 className="text-lg md:text-xl font-medium mb-6 text-gray-800">
                                NKV Education is a leading training institute dedicated to empowering individuals.
                            </h3>
                            <p className="mb-4 text-gray-700">
                                We provide strong foundations in computer skills including fundamentals, software applications, and more.
                            </p>
                            <p className="mb-6 text-gray-700">
                                Our mission is to make learning accessible, practical, and career-focused.
                            </p>

                            <div className="flex flex-col sm:flex-row gap-4">
                                <Link href="/about">
                                    <motion.button
                                        whileHover={{ scale: 1.05 }}
                                        className="px-6 py-2 bg-gradient-to-r from-red-600 to-pink-600 text-white font-semibold rounded-md shadow-md hover:shadow-xl transition"
                                    >
                                        📘 READ MORE
                                    </motion.button>
                                </Link>

                                <Link href="/contact">
                                    <motion.button
                                        whileHover={{ scale: 1.05 }}
                                        className="px-6 py-2 border-2 border-red-600 text-red-600 font-semibold rounded-md hover:bg-red-50 transition"
                                    >
                                        📞 CONTACT US
                                    </motion.button>
                                </Link>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </section>
        </main>
    );
}
