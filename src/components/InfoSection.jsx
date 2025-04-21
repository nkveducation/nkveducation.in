'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';

export default function InfoSection() {
  return (
    <section className="py-12 px-4 md:px-8 w-full lg:px-16 bg-white">
      <div className="max-w-6xl mx-auto">
        
        {/* Animated Colorful Heading */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="text-3xl md:text-5xl lg:text-6xl font-extrabold text-center mb-10 bg-gradient-to-r from-red-500 via-blue-500 to-green-500 bg-[length:300%] bg-clip-text text-transparent animate-gradient"
        >
          Empowering Success through Comprehensive Computer, Professional, and Trading Courses
        </motion.h1>

        {/* Custom CSS Animation */}
        <style jsx>{`
          .animate-gradient {
            animation: gradientShift 6s ease infinite;
          }

          @keyframes gradientShift {
            0% { background-position: 0% 50%; }
            50% { background-position: 100% 50%; }
            100% { background-position: 0% 50%; }
          }
        `}</style>

        {/* Motivational Buttons */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12 text-center">
          {['Think Smart', 'Do Smart', 'Be Smart'].map((label, i) => (
            <motion.button
              whileHover={{ scale: 1.08 }}
              whileTap={{ scale: 0.96 }}
              key={i}
              className="py-4 px-6 bg-[url(/images/red-dot-button-bg.jpeg)] text-white font-bold rounded-md bg-cover transition shadow-lg hover:shadow-2xl border border-white"
            >
              {label}
            </motion.button>
          ))}
        </div>

        {/* Info Content */}
        <div className="flex flex-col  lg:flex-row gap-15 items-center">
          
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
  );
}
