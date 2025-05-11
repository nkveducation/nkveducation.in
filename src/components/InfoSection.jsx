'use client';

import { motion, useAnimation } from 'framer-motion';
import Link from 'next/link';
import { useEffect } from 'react';
import { Sparkles, ArrowRight, ChevronRight, Check, Phone } from 'lucide-react';

export default function InfoSection() {
  const controls = useAnimation();

  useEffect(() => {
    controls.start({
      opacity: 1,
      y: 0,
      transition: { staggerChildren: 0.1 }
    });
  }, [controls]);

  return (
    <section className="relative py-20 px-4 sm:px-6 lg:px-8 w-full bg-white overflow-hidden">
      {/* Floating gradient blobs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(8)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full bg-gradient-to-r from-red-500/10 to-blue-500/10 backdrop-blur-sm"
            initial={{
              x: Math.random() * 100,
              y: Math.random() * 100,
              opacity: 0.3
            }}
            animate={{
              x: [0, Math.random() * 50 - 25],
              y: [0, Math.random() * 50 - 25],
            }}
            transition={{
              duration: Math.random() * 10 + 10,
              repeat: Infinity,
              repeatType: "reverse",
              ease: "easeInOut",
            }}
            style={{
              width: `${Math.random() * 400 + 100}px`,
              height: `${Math.random() * 400 + 100}px`,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
          />
        ))}
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Modern Gradient Heading with Animated Underline */}
        <div className="text-center mb-20">
          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
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
            viewport={{ once: true }}
            className="h-1.5 bg-gradient-to-r from-red-500 via-blue-500 to-purple-500 w-1/4 mx-auto rounded-full shadow-lg"
          />
        </div>

        {/* Interactive Pill Buttons with Glow Effect */}
        <div className="flex flex-wrap justify-center gap-6 mb-20">
          {['Dream It', 'Believe It', 'Achieve It'].map((label, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ y: -6, scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
              className="relative group"
            >
              <div className="absolute -inset-0.5 bg-gradient-to-br from-red-500 to-blue-500 rounded-full blur opacity-75 group-hover:opacity-100 transition-all duration-300" />
              <button className="relative px-8 py-3.5 bg-white text-gray-900 font-semibold rounded-full border border-gray-200 hover:border-transparent transition-all shadow-sm hover:shadow-lg flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-red-500" />
                {label}
              </button>
            </motion.div>
          ))}
        </div>

        {/* Modern Content Layout with 3D Card Effect */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -40, rotateY: 15 }}
            whileInView={{ opacity: 1, x: 0, rotateY: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="relative perspective-1000"
          >
            <div className="absolute -inset-4 bg-gradient-to-tr from-red-500/20 to-blue-500/20 rounded-3xl blur-xl opacity-70" />
            <div className="relative rounded-2xl shadow-2xl overflow-hidden transform-style-preserve-3d hover:rotate-y-5 transition-all duration-500 ease-out">
              <img
                src="/images/demo_images.png"
                alt="About NKV Education"
                className="w-full h-auto transform hover:scale-105 transition duration-700 ease-out"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300 flex items-end p-6">
                <motion.button
                  whileHover={{ x: 5 }}
                  className="text-white font-medium flex items-center"
                >
                  View Gallery <ArrowRight className="ml-2 w-4 h-4" />
                </motion.button>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            <div className="inline-block bg-gradient-to-r from-red-600 to-blue-600 rounded-lg p-1 mb-6">
              <h2 className="text-3xl sm:text-4xl font-bold text-white px-4 py-2">
                Who We Are?
              </h2>
            </div>

            <h3 className="text-xl sm:text-2xl font-medium text-gray-800 leading-snug bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
              NKV Education is a premier institute dedicated to empowering individuals through transformative learning.
            </h3>

            <div className="space-y-6 text-gray-700">
              {[
                "Comprehensive computer skills from fundamentals to advanced applications",
                "Professional and trading courses designed for real-world success",
                "Mission-driven approach to make learning accessible and career-focused",
                "NKV Education is a leading training institute dedicated to empowering individuals with the knowledge and skills necessary for success in the digital age."
              ].map((item, i) => (
                <motion.p 
                  key={i}
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: 0.1 * i }}
                  viewport={{ once: true }}
                  className="flex items-start"
                >
                  <span className="flex-shrink-0 w-6 h-6 mt-0.5 mr-3 bg-red-500 text-white rounded-full flex items-center justify-center">
                    <Check className="w-3 h-3" />
                  </span>
                  {item}
                </motion.p>
              ))}
            </div>

            <div className="flex flex-wrap gap-6 pt-6">
              <Link href="/about">
                <motion.button
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.4 }}
                  viewport={{ once: true }}
                  whileHover={{ 
                    scale: 1.05,
                    boxShadow: "0 10px 25px -5px rgba(220, 38, 38, 0.4)"
                  }}
                  whileTap={{ scale: 0.98 }}
                  className="px-8 py-4 bg-gradient-to-r from-red-600 to-red-700 text-white font-semibold rounded-xl shadow-xl hover:shadow-2xl transition-all flex items-center gap-3 relative overflow-hidden"
                >
                  <span className="relative z-10">Read More</span>
                  <ChevronRight className="w-5 h-5 relative z-10 group-hover:translate-x-1 transition-transform" />
                  <span className="absolute inset-0 bg-gradient-to-r from-red-700 to-red-800 opacity-0 hover:opacity-100 transition-opacity"></span>
                </motion.button>
              </Link>

              <Link href="/contact">
                <motion.button
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.5 }}
                  viewport={{ once: true }}
                  whileHover={{ 
                    scale: 1.05,
                    boxShadow: "0 10px 25px -5px rgba(59, 130, 246, 0.3)"
                  }}
                  whileTap={{ scale: 0.98 }}
                  className="px-8 py-4 bg-white text-gray-900 font-semibold rounded-xl border border-gray-300 hover:border-gray-400 shadow-lg hover:shadow-xl transition-all flex items-center gap-3 relative overflow-hidden"
                >
                  <Phone className="w-5 h-5 text-blue-600" />
                  <span className="relative z-10">Contact Us</span>
                  <span className="absolute inset-0 bg-gray-50 opacity-0 hover:opacity-100 transition-opacity"></span>
                </motion.button>
              </Link>
            </div>
          </motion.div>
        </div>

        {/* Floating sparkles decoration */}
        <div className="absolute top-0 left-0 w-full h-full pointer-events-none overflow-hidden">
          {[...Array(20)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute text-yellow-400"
              initial={{
                x: Math.random() * 100,
                y: Math.random() * 100,
                opacity: 0,
                scale: 0
              }}
              animate={{
                opacity: [0, 0.8, 0],
                scale: [0, 1.2, 0],
                rotate: Math.random() * 360
              }}
              transition={{
                duration: Math.random() * 3 + 2,
                repeat: Infinity,
                repeatDelay: Math.random() * 5,
                ease: "easeInOut"
              }}
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
            >
              <Sparkles className="w-4 h-4" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}