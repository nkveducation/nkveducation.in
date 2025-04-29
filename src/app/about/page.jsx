"use client";

import Breadcrumbs from "@/components/Breadcrumbs";
import { motion } from "framer-motion";
import Link from "next/link";

export default function About() {
  return (
    <main className="m-0 p-0 min-w-full mt-[80px]">
      <div
        className="text-white px-6 py-8 flex flex-col md:flex-row justify-between items-center"
        style={{
          background: 'linear-gradient(to right, #dc2626, #b91c1c)',
        }}
      >
        <h1 className="text-3xl font-bold mb-4 md:mb-0">About us</h1>
        <Breadcrumbs />
      </div>

      <section className="py-16 px-4 sm:px-6 lg:px-8 w-full bg-white/95 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto">

          {/* Modern Gradient Heading with Animated Underline */}
          <div className="text-center mb-16">
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight mb-6"
            >
              <span className="bg-gradient-to-r from-red-600 via-blue-600 to-purple-600 bg-clip-text text-transparent">
                Empowering Success
              </span>
              <br />
              <span className="text-gray-900">Through Comprehensive Education</span>
            </motion.h1>
            <motion.div
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              transition={{ duration: 1, delay: 0.4 }}
              className="h-1 bg-gradient-to-r from-transparent via-red-500 to-transparent w-1/3 mx-auto"
            />
          </div>

          {/* Interactive Pill Buttons */}
          <div className="flex flex-wrap justify-center gap-4 mb-16">
            {['Think Smart', 'Do Smart', 'Be Smart'].map((label, i) => (
              <motion.div
                key={i}
                whileHover={{ y: -4 }}
                whileTap={{ scale: 0.98 }}
                className="relative group"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-red-500 to-blue-500 rounded-full blur-md opacity-75 group-hover:opacity-100 transition-opacity" />
                <button className="relative px-8 py-3 bg-white text-gray-900 font-semibold rounded-full border border-gray-200 hover:border-transparent transition-all shadow-sm hover:shadow-md">
                  {label}
                </button>
              </motion.div>
            ))}
          </div>

          {/* Modern Content Layout */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="relative"
            >
              <div className="absolute -inset-4 bg-gradient-to-tr from-red-500/20 to-blue-500/20 rounded-2xl blur-lg opacity-70" />
              <img
                src="/images/demo_images.png"
                alt="About NKV Education"
                className="relative rounded-xl shadow-2xl transform hover:scale-[1.02] transition duration-500 ease-out"
              />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="space-y-6"
            >
              <h2 className="text-3xl sm:text-4xl font-bold text-gray-900">
                <span className="bg-gradient-to-r from-red-600 to-blue-600 bg-clip-text text-transparent">
                  Who We Are?
                </span>
              </h2>

              <h3 className="text-xl sm:text-2xl font-medium text-gray-800 leading-snug">
                NKV Education is a premier institute dedicated to empowering individuals through transformative learning.
              </h3>

              <div className="space-y-4 text-gray-700">
                <p className="flex items-start">
                  <span className="flex-shrink-0 w-5 h-5 mt-1 mr-3 text-red-500">✓</span>
                  Comprehensive computer skills from fundamentals to advanced applications
                </p>
                <p className="flex items-start">
                  <span className="flex-shrink-0 w-5 h-5 mt-1 mr-3 text-red-500">✓</span>
                  Professional and trading courses designed for real-world success
                </p>
                <p className="flex items-start">
                  <span className="flex-shrink-0 w-5 h-5 mt-1 mr-3 text-red-500">✓</span>
                  Mission-driven approach to make learning accessible and career-focused
                </p>
                <p className="flex items-start">
                  NKV Education is a leading training institute dedicated to empowering individuals with the knowledge and skills necessary for success in the digital age. With a diverse range of courses, including Computer, Professional, and Trading, we offer comprehensive educational programs designed to cater to various career paths.

                  Our Computer Course provides a strong foundation in essential computer skills, covering topics such as computer fundamentals, software applications, programming languages, and more. Whether you're a beginner seeking to enhance your computer literacy or an experienced professional aiming to expand your technical expertise, our Computer Course equips you with the necessary skills to thrive in today's technology-driven world.              </p>
              </div>

              <div className="flex flex-wrap gap-4 pt-4">
                <Link href="/about">
                  <motion.button
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.98 }}
                    className="px-8 py-3 bg-gradient-to-r from-red-600 to-red-700 text-white font-semibold rounded-lg shadow-lg hover:shadow-xl transition-all flex items-center gap-2"
                  >
                    <span>Read More</span>
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-8.707l-3-3a1 1 0 00-1.414 0l-3 3a1 1 0 001.414 1.414L9 9.414V13a1 1 0 102 0V9.414l1.293 1.293a1 1 0 001.414-1.414z" clipRule="evenodd" />
                    </svg>
                  </motion.button>
                </Link>

                <Link href="/contact">
                  <motion.button
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.98 }}
                    className="px-8 py-3 bg-white text-gray-900 font-semibold rounded-lg border border-gray-300 hover:border-gray-400 shadow-sm hover:shadow-md transition-all flex items-center gap-2"
                  >
                    <span>Contact Us</span>
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                      <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                    </svg>
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
