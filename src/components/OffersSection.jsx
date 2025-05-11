"use client";

import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';

export default function OffersSection() {
  const [offers, setOffers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [direction, setDirection] = useState(1); // 1 for forward, -1 for backward

  useEffect(() => {
    const fetchOffers = async () => {
      try {
        const response = await fetch('/api/offers');
        if (!response.ok) {
          throw new Error('Failed to fetch offers');
        }
        const data = await response.json();
        setOffers(data.data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchOffers();
  }, []);

  // Auto-rotate slides
  useEffect(() => {
    if (offers.length > 0) {
      const interval = setInterval(() => {
        setDirection(1);
        setCurrentSlide((prev) => (prev === offers.length - 1 ? 0 : prev + 1));
      }, 5000);
      return () => clearInterval(interval);
    }
  }, [offers.length]);

  const nextSlide = () => {
    setDirection(1);
    setCurrentSlide((prev) => (prev === offers.length - 1 ? 0 : prev + 1));
  };

  const prevSlide = () => {
    setDirection(-1);
    setCurrentSlide((prev) => (prev === 0 ? offers.length - 1 : prev - 1));
  };

  const goToSlide = (index) => {
    setDirection(index > currentSlide ? 1 : -1);
    setCurrentSlide(index);
  };

  const getImageUrl = (url) => {
    return url || 'https://images.unsplash.com/photo-1556740738-b6a63e27c4df?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&h=300&q=80';
  };

  const variants = {
    enter: (direction) => {
      return {
        x: direction > 0 ? '100%' : '-100%',
        opacity: 0
      };
    },
    center: {
      x: 0,
      opacity: 1
    },
    exit: (direction) => {
      return {
        x: direction < 0 ? '100%' : '-100%',
        opacity: 0
      };
    }
  };

  if (loading) {
    return (
      <section className="py-20 px-4 md:px-8 bg-gradient-to-br from-red-50 to-red-100">
        <div className="max-w-7xl mx-auto text-center">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-block h-8 w-48 rounded bg-gradient-to-r from-gray-200 to-gray-300 animate-pulse"
          />
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="py-20 px-4 md:px-8 bg-gradient-to-br from-gray-50 to-gray-100">
        <div className="max-w-7xl mx-auto text-center text-red-500">
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            Error loading offers: {error}
          </motion.p>
        </div>
      </section>
    );
  }

  if (!offers.length) {
    return (
      <section className="py-20 px-4 md:px-8 bg-gradient-to-br from-gray-50 to-gray-100">
        <div className="max-w-7xl mx-auto text-center">
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-gray-500"
          >
            No offers available at the moment. Check back later!
          </motion.p>
        </div>
      </section>
    );
  }

  return (
    <section className="py-20 px-4 md:px-8 bg-gradient-to-br from-gray-50 to-gray-100 relative overflow-hidden">
      {/* Floating gradient blobs */}
      <div className="absolute -top-40 -left-40 w-80 h-80 bg-red-400/10 rounded-full filter blur-3xl opacity-50 mix-blend-multiply animate-blob animation-delay-2000" />
      <div className="absolute top-0 -right-40 w-80 h-80 bg-blue-400/10 rounded-full filter blur-3xl opacity-50 mix-blend-multiply animate-blob" />
      <div className="absolute -bottom-20 left-1/4 w-80 h-80 bg-purple-400/10 rounded-full filter blur-3xl opacity-50 mix-blend-multiply animate-blob animation-delay-4000" />

      <div className="max-w-7xl mx-auto relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-gray-900 font-serif">
            <span className="bg-gradient-to-r from-blue-600 to-red-600 bg-clip-text text-transparent">
              Exclusive Offers
            </span>
          </h2>
          <motion.div 
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="w-24 h-1 bg-gradient-to-r from-blue-500 to-red-500 mx-auto mb-6"
          />
          <p className="text-gray-600 max-w-2xl mx-auto text-lg">
            Limited-time deals crafted just for you
          </p>
        </motion.div>

        {/* Slider Container */}
        <div className="relative overflow-hidden h-[500px] md:h-[600px]">
          <AnimatePresence custom={direction} initial={false}>
            <motion.div
              key={currentSlide}
              custom={direction}
              variants={variants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{
                x: { type: "spring", stiffness: 300, damping: 30 },
                opacity: { duration: 0.2 }
              }}
              className="absolute inset-0 px-4"
            >
              <div className="group relative bg-white rounded-2xl shadow-xl overflow-hidden h-full transition-all duration-500 hover:shadow-2xl">
                <div className="h-2/3 relative overflow-hidden">
                  <img
                    src={getImageUrl(offers[currentSlide].imageUrl)}
                    alt={offers[currentSlide].title}
                    className="w-full h-full object-contain lg:object-cover transition-transform duration-700 group-hover:scale-105"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                  <div className="absolute top-4 right-4">
                    <motion.span 
                      whileHover={{ scale: 1.1 }}
                      className="inline-block bg-amber-400 text-amber-900 text-xs font-bold px-3 py-1 rounded-full shadow-md"
                    >
                      Limited
                    </motion.span>
                  </div>
                </div>

                <div className="p-6">
                  <h3 className="font-bold text-xl mb-3 text-gray-800 group-hover:text-blue-600 transition-colors">
                    {offers[currentSlide].title}
                  </h3>
                  <p className="text-gray-600 mb-5">
                    {offers[currentSlide].description}
                  </p>
                  <div className="flex justify-between items-center">
                    <span className="text-xs text-gray-500">Offer ends soon</span>
                    <motion.span 
                      animate={{ 
                        scale: [1, 1.05, 1],
                        opacity: [0.8, 1, 0.8]
                      }}
                      transition={{
                        duration: 2,
                        repeat: Infinity
                      }}
                      className="text-xs text-red-500 font-medium"
                    >
                      ⏳ Hurry!
                    </motion.span>
                  </div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Navigation Arrows */}
          <motion.button
            onClick={prevSlide}
            whileHover={{ scale: 1.1, backgroundColor: "rgba(255,255,255,1)" }}
            whileTap={{ scale: 0.95 }}
            className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white/80 text-gray-800 p-3 rounded-full shadow-lg ml-2 transition-all"
            aria-label="Previous slide"
          >
            <FiChevronLeft className="w-6 h-6" />
          </motion.button>
          <motion.button
            onClick={nextSlide}
            whileHover={{ scale: 1.1, backgroundColor: "rgba(255,255,255,1)" }}
            whileTap={{ scale: 0.95 }}
            className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white/80 text-gray-800 p-3 rounded-full shadow-lg mr-2 transition-all"
            aria-label="Next slide"
          >
            <FiChevronRight className="w-6 h-6" />
          </motion.button>
        </div>

        {/* Dots Navigation */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="flex justify-center mt-8 space-x-2"
        >
          {offers.map((_, index) => (
            <motion.button
              key={index}
              onClick={() => goToSlide(index)}
              whileHover={{ scale: 1.2 }}
              className={`w-3 h-3 rounded-full transition-all ${currentSlide === index ? 'bg-gradient-to-r from-blue-600 to-red-600 w-6' : 'bg-gray-300'}`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          viewport={{ once: true }}
          className="mt-12 text-center"
        >
          <Link href="/offer">
            <motion.button
              whileHover={{ 
                scale: 1.05,
                backgroundColor: "#EF4444",
                color: "#FFFFFF"
              }}
              whileTap={{ scale: 0.98 }}
              className="inline-flex items-center gap-2 px-8 py-3.5 bg-white border-2 border-red-500 text-red-500 font-semibold rounded-full hover:bg-red-500 hover:text-white transition-all shadow-lg hover:shadow-xl cursor-pointer"
            >
              View All Offers
              <motion.span
                animate={{
                  x: [0, 4, 0]
                }}
                transition={{
                  duration: 1.5,
                  repeat: Infinity
                }}
              >
                <FiChevronRight className="w-5 h-5" />
              </motion.span>
            </motion.button>
          </Link>
        </motion.div>
      </div>

      {/* Add this to your global CSS */}
      <style jsx global>{`
        @keyframes blob {
          0%, 100% { transform: translate(0, 0) scale(1); }
          25% { transform: translate(20px, -30px) scale(1.05); }
          50% { transform: translate(0, 20px) scale(0.95); }
          75% { transform: translate(-20px, -15px) scale(1.03); }
        }
        .animate-blob {
          animation: blob 12s infinite ease-in-out;
        }
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        .animation-delay-4000 {
          animation-delay: 4s;
        }
      `}</style>
    </section>
  );
}