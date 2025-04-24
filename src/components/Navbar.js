'use client';

import { useState } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, Menu, X } from 'lucide-react';

const navLinks = ['Home', 'About', 'Course', 'Plan', 'Join Us', 'Contact', 'Seminar'];
const moreLinks = ['Team', 'Institute', 'Offer', 'Result', 'Gallery'];
const registrationLinks = ['Tie-Up Registration', 'Student Registration'];

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
      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
      className="bg-white/90 backdrop-blur-md border-b border-gray-100 fixed w-full z-50 h-[80px] top-0 py-4 shadow-md"
    >
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex justify-between items-center h-full">
          <Link href="/" className="text-2xl font-bold text-red-600 tracking-tight">
            NKV<span className="text-gray-900">Education</span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden lg:flex items-center gap-8">
            <div className="flex items-center gap-6">
              {navLinks.map((item) => (
                <Link
                  key={item}
                  href={item === 'Home' ? '/' : `/${item.toLowerCase().replace(' ', '-')}`}
                  className="relative group font-medium text-gray-600 hover:text-gray-900 transition-colors"
                >
                  <span className="relative">
                    {item}
                    <span className="absolute left-0 -bottom-1 w-0 h-0.5 bg-red-600 group-hover:w-full transition-all duration-300" />
                  </span>
                </Link>
              ))}

              {/* Registration Dropdown */}
              <div className="relative">
                <button
                  onClick={() => {
                    setShowRegistration(!showRegistration);
                    setShowMore(false);
                  }}
                  className="flex items-center gap-1 font-medium text-gray-600 hover:text-gray-900 transition-colors"
                >
                  Registration
                  <ChevronDown className={`w-4 h-4 transition-transform ${showRegistration ? 'rotate-180' : ''}`} />
                </button>

                <AnimatePresence>
                  {showRegistration && (
                    <motion.div
                      variants={dropdownVariants}
                      initial="hidden"
                      animate="visible"
                      exit="exit"
                      className="absolute mt-2 bg-white shadow-lg rounded-lg w-56 py-2 border border-gray-100 z-50"
                      onMouseLeave={() => setShowRegistration(false)}
                    >
                      {registrationLinks.map((r, i) => (
                        <Link
                          key={i}
                          href={`/registration/${i + 1}`}
                          className="block px-4 py-2.5 hover:bg-gray-50 text-gray-700 transition-colors"
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
                  onClick={() => {
                    setShowMore(!showMore);
                    setShowRegistration(false);
                  }}
                  className="flex items-center gap-1 font-medium text-gray-600 hover:text-gray-900 transition-colors"
                >
                  More
                  <ChevronDown className={`w-4 h-4 transition-transform ${showMore ? 'rotate-180' : ''}`} />
                </button>

                <AnimatePresence>
                  {showMore && (
                    <motion.div
                      variants={dropdownVariants}
                      initial="hidden"
                      animate="visible"
                      exit="exit"
                      className="absolute mt-2 bg-white shadow-lg rounded-lg w-48 py-2 border border-gray-100 z-50"
                      onMouseLeave={() => setShowMore(false)}
                    >
                      {moreLinks.map((item) => (
                        <Link
                          key={item}
                          href={`/${item.toLowerCase()}`}
                          className="block px-4 py-2.5 hover:bg-gray-50 text-gray-700 transition-colors"
                        >
                          {item}
                        </Link>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>

            <Link
              href="/contact"
              className="px-4 py-2 bg-red-600 text-white rounded-md font-medium hover:bg-red-700 transition-colors"
            >
              Get Started
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 rounded-md text-gray-700 hover:bg-gray-100 transition-colors"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="lg:hidden bg-white border-t border-gray-100 overflow-hidden"
          >
            <div className="px-6 py-4 space-y-1">
              {navLinks.map((item) => (
                <Link
                  key={item}
                  href={item === 'Home' ? '/' : `/${item.toLowerCase().replace(' ', '-')}`}
                  className="block py-3 px-4 text-gray-700 hover:bg-gray-50 rounded-lg transition-colors"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {item}
                </Link>
              ))}

              {/* Registration Dropdown */}
              <div className="py-2">
                <button
                  onClick={() => setShowRegistration(!showRegistration)}
                  className="w-full flex justify-between items-center py-3 px-4 text-gray-700 hover:bg-gray-50 rounded-lg transition-colors"
                >
                  <span>Registration</span>
                  <ChevronDown className={`w-4 h-4 transition-transform ${showRegistration ? 'rotate-180' : ''}`} />
                </button>
                {showRegistration && (
                  <div className="pl-6 mt-1 space-y-1">
                    {registrationLinks.map((r, i) => (
                      <Link
                        key={i}
                        href={`/registration/${i + 1}`}
                        className="block py-2.5 px-4 text-gray-600 hover:bg-gray-50 rounded-lg transition-colors"
                        onClick={() => setMobileMenuOpen(false)}
                      >
                        {r}
                      </Link>
                    ))}
                  </div>
                )}
              </div>

              {/* More Dropdown */}
              <div className="py-2">
                <button
                  onClick={() => setShowMore(!showMore)}
                  className="w-full flex justify-between items-center py-3 px-4 text-gray-700 hover:bg-gray-50 rounded-lg transition-colors"
                >
                  <span>More</span>
                  <ChevronDown className={`w-4 h-4 transition-transform ${showMore ? 'rotate-180' : ''}`} />
                </button>
                {showMore && (
                  <div className="pl-6 mt-1 space-y-1">
                    {moreLinks.map((item) => (
                      <Link
                        key={item}
                        href={`/${item.toLowerCase()}`}
                        className="block py-2.5 px-4 text-gray-600 hover:bg-gray-50 rounded-lg transition-colors"
                        onClick={() => setMobileMenuOpen(false)}
                      >
                        {item}
                      </Link>
                    ))}
                  </div>
                )}
              </div>

              <Link
                href="/contact"
                className="block mt-4 py-2.5 px-4 bg-red-600 text-white text-center rounded-md font-medium hover:bg-red-700 transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                Get Started
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}
