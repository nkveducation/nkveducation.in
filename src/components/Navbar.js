'use client';

import { useState } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';

const navLinks = ['Home', 'About', 'Course', 'Plan', 'Join Us', 'Contact' , 'Seminar'];
const moreLinks = ['Team', 'Institute', 'Offer', 'Result', 'Gallery'];
const registrationLinks = ['Tie-Up Registration', 'Registration 2'];

const dropdownVariants = {
  hidden: { opacity: 0, y: -10 },
  visible: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -10 }
};

export default function Navbar() {
  const [showRegistration, setShowRegistration] = useState(false);
  const [showMore, setShowMore] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      className="bg-white shadow-md fixed w-screen z-50 h-[80px] top-0"
    >
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex justify-between items-center py-4">
          <Link href="/" className="text-2xl font-bold text-red-600">
            NKV Education
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center space-x-6">
            {navLinks.map((item) => (
              <Link
                key={item}
                href={item === 'Home' ? '/' : `/${item.toLowerCase().replace(' ', '-')}`}
                className="relative group font-medium text-gray-800 hover:text-red-600 transition"
              >
                {item}
                <span className="absolute left-0 bottom-[-4px] w-0 h-[2px] bg-red-600 group-hover:w-full transition-all duration-300" />
              </Link>
            ))}

            {/* Registration Dropdown */}
            <div className="relative">
              <button
                onClick={() => setShowRegistration(!showRegistration)}
                className="text-gray-800 font-medium hover:text-red-600 transition flex items-center"
              >
                Registration {showRegistration ? '▲' : '▼'}
              </button>

              <AnimatePresence>
                {showRegistration && (
                  <motion.div
                    variants={dropdownVariants}
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                    className="absolute mt-2 bg-white shadow-lg rounded-md w-48 py-2 border border-red-100"
                  >
                    {registrationLinks.map((r, i) => (
                      <Link
                        key={i}
                        href={`/registration/${i + 1}`}
                        className="block px-4 py-2 hover:bg-red-50 text-gray-700"
                      >
                        {r}
                      </Link>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* More Dropdown */}
            <div className="relative">
              <button
                onClick={() => setShowMore(!showMore)}
                className="text-gray-800 font-medium hover:text-red-600 transition flex items-center"
              >
                More {showMore ? '▲' : '▼'}
              </button>

              <AnimatePresence>
                {showMore && (
                  <motion.div
                    variants={dropdownVariants}
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                    className="absolute mt-2 bg-white shadow-lg rounded-md w-48 py-2 border border-red-100"
                  >
                    {moreLinks.map((item) => (
                      <Link
                        key={item}
                        href={`/${item.toLowerCase()}`}
                        className="block px-4 py-2 hover:bg-red-50 text-gray-700"
                      >
                        {item}
                      </Link>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>

          {/* Mobile Menu Icon */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden focus:outline-none"
          >
            <svg
              className="w-6 h-6 text-red-600"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              viewBox="0 0 24 24"
            >
              {mobileMenuOpen ? (
                <path d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="md:hidden bg-white shadow-lg overflow-hidden"
          >
            <div className="px-4 py-4 space-y-2">
              {navLinks.map((item) => (
                <Link
                  key={item}
                  href={`/${item.toLowerCase().replace(' ', '-')}`}
                  className="block text-gray-800 font-medium py-2 px-4 hover:bg-red-50 rounded"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {item}
                </Link>
              ))}

              {/* Registration */}
              <div className="pt-2 border-t border-gray-200">
                <button
                  onClick={() => setShowRegistration(!showRegistration)}
                  className="w-full text-left font-medium py-2 px-4 flex justify-between"
                >
                  Registration {showRegistration ? '▲' : '▼'}
                </button>
                <AnimatePresence>
                  {showRegistration && (
                    <motion.div
                      variants={dropdownVariants}
                      initial="hidden"
                      animate="visible"
                      exit="exit"
                      className="pl-4"
                    >
                      {registrationLinks.map((r, i) => (
                        <Link
                          key={i}
                          href={`/registration/${i + 1}`}
                          className="block text-gray-700 py-2 hover:bg-red-50 rounded"
                          onClick={() => setMobileMenuOpen(false)}
                        >
                          {r}
                        </Link>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* More */}
              <div className="pt-2 border-t border-gray-200">
                <button
                  onClick={() => setShowMore(!showMore)}
                  className="w-full text-left font-medium py-2 px-4 flex justify-between"
                >
                  More {showMore ? '▲' : '▼'}
                </button>
                <AnimatePresence>
                  {showMore && (
                    <motion.div
                      variants={dropdownVariants}
                      initial="hidden"
                      animate="visible"
                      exit="exit"
                      className="pl-4"
                    >
                      {moreLinks.map((item) => (
                        <Link
                          key={item}
                          href={`/${item.toLowerCase()}`}
                          className="block text-gray-700 py-2 hover:bg-red-50 rounded"
                          onClick={() => setMobileMenuOpen(false)}
                        >
                          {item}
                        </Link>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}
