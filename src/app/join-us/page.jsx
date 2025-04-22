'use client';

import { motion } from 'framer-motion';
import { FiArrowRight, FiUser, FiMail, FiPhone, FiMapPin, FiBook } from 'react-icons/fi';

export default function JoinUs() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-12">
      {/* Animated Background Elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-1/4 w-64 h-64 bg-red-100 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
        <div className="absolute top-60 right-1/4 w-72 h-72 bg-blue-100 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
        <div className="absolute bottom-20 left-1/2 w-80 h-80 bg-amber-100 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-4000"></div>
      </div>

      {/* Main Content */}
      <main className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Header Section */}
        <motion.section
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <motion.div
            initial={{ scale: 0.9 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2 }}
            className="inline-block mb-6"
          >
            <span className="inline-flex items-center px-4 py-2 rounded-full text-sm font-medium bg-red-100 text-red-800">
              Join Our Community
            </span>
          </motion.div>
          <motion.h1
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="text-4xl md:text-5xl font-bold text-gray-900 mb-4"
          >
            Start Your Journey With Us
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="text-xl text-gray-600 max-w-3xl mx-auto"
          >
            Fill out the form below to join our programs and take the first step towards your goals.
          </motion.p>
        </motion.section>

        {/* Form Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="bg-white rounded-2xl shadow-xl overflow-hidden max-w-4xl mx-auto"
        >
          {/* Decorative Header */}
          <div className="relative h-4 bg-gradient-to-r from-red-500 to-amber-500">
            <div className="absolute inset-0 bg-gradient-to-r from-red-600 to-amber-600 opacity-70"></div>
          </div>

          {/* Form Content */}
          <div className="p-8 sm:p-10">
            <form className="space-y-6">
              {/* Personal Information Section */}
              <div className="space-y-6">
                <motion.h2
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1 }}
                  className="text-2xl font-bold text-gray-800 flex items-center"
                >
                  <span className="w-4 h-4 bg-red-500 rounded-full mr-3"></span>
                  Personal Information
                </motion.h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                  >
                    <label className="block text-sm font-medium text-gray-700 mb-1 flex items-center">
                      <FiUser className="mr-2 text-gray-500" />
                      Full Name <span className="text-red-500 ml-1">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="John Doe"
                      className="w-full px-4 py-3 pl-10 rounded-lg border border-gray-300 focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-all"
                    />
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                  >
                    <label className="block text-sm font-medium text-gray-700 mb-1 flex items-center">
                      <FiMail className="mr-2 text-gray-500" />
                      Email <span className="text-red-500 ml-1">*</span>
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="john@example.com"
                      className="w-full px-4 py-3 pl-10 rounded-lg border border-gray-300 focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-all"
                    />
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                  >
                    <label className="block text-sm font-medium text-gray-700 mb-1 flex items-center">
                      <FiPhone className="mr-2 text-gray-500" />
                      Phone Number <span className="text-red-500 ml-1">*</span>
                    </label>
                    <input
                      type="tel"
                      required
                      placeholder="+91 9876543210"
                      className="w-full px-4 py-3 pl-10 rounded-lg border border-gray-300 focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-all"
                    />
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 }}
                  >
                    <label className="block text-sm font-medium text-gray-700 mb-1 flex items-center">
                      <FiMapPin className="mr-2 text-gray-500" />
                      Location
                    </label>
                    <input
                      type="text"
                      placeholder="City, Country"
                      className="w-full px-4 py-3 pl-10 rounded-lg border border-gray-300 focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-all"
                    />
                  </motion.div>
                </div>
              </div>

              {/* Submit Button */}
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.9 }}
                className="pt-6"
              >
                <button
                  type="submit"
                  className="w-full group relative flex justify-center items-center py-4 px-6 border border-transparent text-lg font-bold rounded-lg shadow-lg text-white bg-gradient-to-r from-red-500 to-amber-500 hover:from-red-600 hover:to-amber-600 transition-all duration-300 overflow-hidden"
                >
                  <span className="relative z-10 flex items-center">
                    Submit Application
                    <FiArrowRight className="ml-2 transition-transform group-hover:translate-x-1" />
                  </span>
                  <span className="absolute inset-0 bg-gradient-to-r from-red-600 to-amber-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
                </button>
              </motion.div>
            </form>
          </div>
        </motion.div>

        {/* Footer Note */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 1 }}
          viewport={{ once: true }}
          className="text-center mt-16 text-gray-500"
        >
          <p>We'll contact you within 24 hours after receiving your application.</p>
          <p className="mt-2">Have questions? <a href="#" className="text-red-600 hover:underline">Contact our support team</a></p>
        </motion.div>
      </main>
    </div>
  );
}