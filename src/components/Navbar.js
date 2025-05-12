'use client';

import { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, Menu, X, ArrowRight } from 'lucide-react';
import Image from 'next/image';

const navLinks = ['Home', 'About', 'Course', 'Plan', 'Join Us', 'Contact', 'Seminar'];
const moreLinks = ['Team', 'Institute', 'Offer', 'Result', 'Gallery'];
const registrationLinks = ['Tie-Up Registration', 'Student Registration'];

const dropdownVariants = {
  hidden: { opacity: 0, y: -10 },
  visible: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -10 }
};

const navItemVariants = {
  hidden: { opacity: 0, y: -20 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: 0.05 * i,
      duration: 0.3,
      ease: "easeOut"
    }
  })
};

export default function HeaderWithNav() {
   const [showRegistration, setShowRegistration] = useState(false);
  const [showMore, setShowMore] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [headerVisible, setHeaderVisible] = useState(true);
  const [prevScrollPos, setPrevScrollPos] = useState(0);
  const [isMounted, setIsMounted] = useState(false); // New state to track client-side
  const sidebarRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setIsMounted(true); // Set to true when component mounts on client

    const handleScroll = () => {
      const currentScrollPos = window.scrollY;
      const scrollingDown = currentScrollPos > prevScrollPos;
      
      setHeaderVisible(!scrollingDown || currentScrollPos < 10);
      setPrevScrollPos(currentScrollPos);
      setIsScrolled(currentScrollPos > 10);
    };

    // Only add event listener on client side
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [prevScrollPos]);

  useEffect(() => {
    if (!isMounted) return; // Don't run on server

    const handleClickOutside = (event) => {
      if (sidebarRef.current && !sidebarRef.current.contains(event.target)) {
        closeAllDropdowns();
      }
    };

    if (mobileMenuOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [mobileMenuOpen, isMounted]);

  const closeAllDropdowns = () => {
    setShowRegistration(false);
    setShowMore(false);
    setMobileMenuOpen(false);
  };

  // Don't render anything on server (optional, or render a simplified version)
  if (!isMounted) {
    return (
      <header className="h-[120px] bg-white">
        {/* Simple static header for SSR */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 h-full flex items-center">
          <div className="text-2xl font-bold text-red-600">NKV Education</div>
        </div>
      </header>
    );
  }


  return (
    <>
      {/* Top Header - Hides on scroll */}
      <motion.header
        initial={{ y: 0 }}
        animate={{ 
          y: headerVisible ? 0 : -40,
          opacity: headerVisible ? 1 : 0
        }}
        transition={{ duration: 0.3, ease: 'easeInOut' }}
        className="fixed top-0 w-full z-50 flex justify-between items-center bg-white/80 backdrop-blur-sm py-2 px-4 border-b border-gray-200"
      >
        <div className="flex items-center space-x-2">
          <span className="font-semibold text-sm text-black">
            639712XXXX
          </span>
        </div>

        <div className="flex items-center space-x-3">
          <Link href="/login">
          <button className="px-3 py-1 text-sm bg-black text-white rounded hover:opacity-90 transition-opacity font-medium">
            Login
          </button>
          </Link>
        </div>
      </motion.header>

      {/* Main Navigation - Always stays sticky at top */}
      <motion.nav
        className={`fixed top-0 w-full z-40 h-[80px] bg-white/95 backdrop-blur-lg border-b border-gray-200/80 transition-all duration-300 ${isScrolled ? 'shadow-sm' : ''}`}
        style={{ 
          top: headerVisible ? '40px' : '0px',
          transition: 'top 0.3s ease-in-out'
        }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 h-full">
          <div className="flex justify-between items-center h-full">
            {/* Left side - Logo */}
            <Link 
              href="/" 
              className="text-2xl font-bold text-red-600 tracking-tight"
              onClick={closeAllDropdowns}
              aria-label="Home"
            >
              <motion.div 
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="flex items-center"
              >
                <Image 
                  src="/logo.png" 
                  alt="Logo" 
                  width={isScrolled ? 50 : 60} 
                  height={isScrolled ? 50 : 60} 
                  className="inline-block mr-2 rounded-lg transition-all duration-300" 
                />
                <span className="hidden sm:inline-block bg-gradient-to-r from-red-600 to-red-400 bg-clip-text text-transparent">
                  NKV Education
                </span>
              </motion.div>
            </Link>

            {/* Right side - Desktop Nav */}
            <div className="hidden lg:flex items-center gap-8">
              <div className="flex items-center gap-6">
                {navLinks.map((item, i) => (
                  <motion.div
                    key={item}
                    custom={i}
                    initial="hidden"
                    animate="visible"
                    variants={navItemVariants}
                  >
                    <Link
                      href={item === 'Home' ? '/' : `/${item.toLowerCase().replace(/\s+/g, '-')}`}
                      className="relative group font-medium text-gray-600 hover:text-gray-900 transition-colors"
                      onClick={closeAllDropdowns}
                    >
                      <span className="relative">
                        {item}
                        <span className="absolute left-0 -bottom-1 w-0 h-[2px] bg-gradient-to-r from-red-500 to-orange-500 group-hover:w-full transition-all duration-300" />
                      </span>
                    </Link>
                  </motion.div>
                ))}

                {/* Registration Dropdown */}
                <motion.div 
                  className="relative"
                  initial="hidden"
                  animate="visible"
                  custom={navLinks.length}
                  variants={navItemVariants}
                >
                  <button
                    onClick={() => {
                      setShowRegistration(!showRegistration);
                      setShowMore(false);
                    }}
                    onMouseEnter={() => {
                      setShowRegistration(true);
                      setShowMore(false);
                    }}
                    className="flex items-center gap-1 font-medium text-gray-600 hover:text-gray-900 transition-colors"
                    aria-expanded={showRegistration}
                    aria-haspopup="true"
                  >
                    Registration
                    <motion.div
                      animate={{ rotate: showRegistration ? 180 : 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      <ChevronDown className="w-4 h-4" />
                    </motion.div>
                  </button>

                  <AnimatePresence>
                    {showRegistration && (
                      <motion.div
                        variants={dropdownVariants}
                        initial="hidden"
                        animate="visible"
                        exit="exit"
                        className="absolute left-0 mt-2 bg-white shadow-xl rounded-lg w-56 py-2 border border-gray-100 z-50 overflow-hidden"
                        onMouseLeave={() => setShowRegistration(false)}
                        role="menu"
                      >
                        {registrationLinks.map((r) => (
                          <Link
                            key={r}
                            href={`/registration/${r.toLowerCase().replace(/\s+/g, '-')}`}
                            className="block px-4 py-2.5 hover:bg-gray-50 text-gray-700 transition-colors group"
                            onClick={closeAllDropdowns}
                            role="menuitem"
                          >
                            <div className="flex items-center">
                              <span className="group-hover:text-red-600 transition-colors">{r}</span>
                              <ArrowRight className="ml-auto w-4 h-4 opacity-0 group-hover:opacity-100 translate-x-[-5px] group-hover:translate-x-0 transition-all duration-200 text-red-500" />
                            </div>
                          </Link>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>

                {/* More Dropdown */}
                <motion.div 
                  className="relative"
                  initial="hidden"
                  animate="visible"
                  custom={navLinks.length + 1}
                  variants={navItemVariants}
                >
                  <button
                    onClick={() => {
                      setShowMore(!showMore);
                      setShowRegistration(false);
                    }}
                    onMouseEnter={() => {
                      setShowMore(true);
                      setShowRegistration(false);
                    }}
                    className="flex items-center gap-1 font-medium text-gray-600 hover:text-gray-900 transition-colors"
                    aria-expanded={showMore}
                    aria-haspopup="true"
                  >
                    More
                    <motion.div
                      animate={{ rotate: showMore ? 180 : 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      <ChevronDown className="w-4 h-4" />
                    </motion.div>
                  </button>

                  <AnimatePresence>
                    {showMore && (
                      <motion.div
                        variants={dropdownVariants}
                        initial="hidden"
                        animate="visible"
                        exit="exit"
                        className="absolute left-0 mt-2 bg-white shadow-xl rounded-lg w-48 py-2 border border-gray-100 z-50 overflow-hidden"
                        onMouseLeave={() => setShowMore(false)}
                        role="menu"
                      >
                        {moreLinks.map((item) => (
                          <Link
                            key={item}
                            href={`/${item.toLowerCase()}`}
                            className="block px-4 py-2.5 hover:bg-gray-50 text-gray-700 transition-colors group"
                            onClick={closeAllDropdowns}
                            role="menuitem"
                          >
                            <div className="flex items-center">
                              <span className="group-hover:text-red-600 transition-colors">{item}</span>
                              <ArrowRight className="ml-auto w-4 h-4 opacity-0 group-hover:opacity-100 translate-x-[-5px] group-hover:translate-x-0 transition-all duration-200 text-red-500" />
                            </div>
                          </Link>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              </div>

              <motion.div
                initial="hidden"
                animate="visible"
                custom={navLinks.length + 2}
                variants={navItemVariants}
              >
                <Link
                  href="/contact"
                  className="px-5 py-2.5 bg-gradient-to-r from-red-600 to-orange-500 text-white rounded-lg font-medium hover:from-red-700 hover:to-orange-600 transition-all shadow-md hover:shadow-lg active:scale-95"
                  onClick={closeAllDropdowns}
                >
                  Get Started
                </Link>
              </motion.div>
            </div>

            {/* Mobile Menu Button */}
            <motion.button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 rounded-md text-gray-700 hover:bg-gray-100 transition-colors"
              aria-label="Toggle menu"
              aria-expanded={mobileMenuOpen}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {mobileMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </motion.button>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <>
              {/* Overlay */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.5 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="lg:hidden fixed inset-0 bg-black z-40"
                onClick={closeAllDropdowns}
              />
              
              {/* Sidebar */}
              <motion.div
                ref={sidebarRef}
                initial={{ x: '100%' }}
                animate={{ x: 0 }}
                exit={{ x: '100%' }}
                transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                className="lg:hidden fixed top-[120px] right-0 w-80 h-[calc(100vh-120px)] bg-white z-50 shadow-2xl overflow-y-auto"
                role="dialog"
                aria-modal="true"
              >
                <div className="px-4 sm:px-6 py-2 space-y-1">
                  {navLinks.map((item, i) => (
                    <motion.div
                      key={item}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.05 * i }}
                    >
                      <Link
                        href={item === 'Home' ? '/' : `/${item.toLowerCase().replace(/\s+/g, '-')}`}
                        className="block py-3 px-4 text-gray-700 hover:bg-gray-50 rounded-lg transition-colors"
                        onClick={closeAllDropdowns}
                      >
                        {item}
                      </Link>
                    </motion.div>
                  ))}

                  {/* Registration Dropdown */}
                  <motion.div 
                    className="py-1"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.05 * navLinks.length }}
                  >
                    <button
                      onClick={() => setShowRegistration(!showRegistration)}
                      className="w-full flex justify-between items-center py-3 px-4 text-gray-700 hover:bg-gray-50 rounded-lg transition-colors"
                      aria-expanded={showRegistration}
                    >
                      <span>Registration</span>
                      <motion.div
                        animate={{ rotate: showRegistration ? 180 : 0 }}
                        transition={{ duration: 0.2 }}
                      >
                        <ChevronDown className="w-4 h-4" />
                      </motion.div>
                    </button>
                    <AnimatePresence>
                      {showRegistration && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 'auto' }}
                          exit={{ opacity: 0, height: 0 }}
                          className="pl-6 overflow-hidden"
                        >
                          {registrationLinks.map((r, i) => (
                            <motion.div
                              key={i}
                              initial={{ opacity: 0, x: 10 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ delay: 0.05 * i }}
                            >
                              <Link
                                href={`/registration/${r.toLowerCase().replace(/\s+/g, '-')}`}
                                className="block py-2.5 px-4 text-gray-600 hover:bg-gray-50 rounded-lg transition-colors"
                                onClick={closeAllDropdowns}
                              >
                                {r}
                              </Link>
                            </motion.div>
                          ))}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.div>

                  {/* More Dropdown */}
                  <motion.div 
                    className="py-1"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.05 * (navLinks.length + 1) }}
                  >
                    <button
                      onClick={() => setShowMore(!showMore)}
                      className="w-full flex justify-between items-center py-3 px-4 text-gray-700 hover:bg-gray-50 rounded-lg transition-colors"
                      aria-expanded={showMore}
                    >
                      <span>More</span>
                      <motion.div
                        animate={{ rotate: showMore ? 180 : 0 }}
                        transition={{ duration: 0.2 }}
                      >
                        <ChevronDown className="w-4 h-4" />
                      </motion.div>
                    </button>
                    <AnimatePresence>
                      {showMore && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 'auto' }}
                          exit={{ opacity: 0, height: 0 }}
                          className="pl-6 overflow-hidden"
                        >
                          {moreLinks.map((item, i) => (
                            <motion.div
                              key={item}
                              initial={{ opacity: 0, x: 10 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ delay: 0.05 * i }}
                            >
                              <Link
                                href={`/${item.toLowerCase()}`}
                                className="block py-2.5 px-4 text-gray-600 hover:bg-gray-50 rounded-lg transition-colors"
                                onClick={closeAllDropdowns}
                              >
                                {item}
                              </Link>
                            </motion.div>
                          ))}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.05 * (navLinks.length + 2) }}
                  >
                    <Link
                      href="/contact"
                      className="block mt-4 mb-4 py-2.5 px-4 bg-gradient-to-r from-red-600 to-orange-500 text-white text-center rounded-lg font-medium hover:from-red-700 hover:to-orange-600 transition-all shadow-md"
                      onClick={closeAllDropdowns}
                    >
                      Get Started
                    </Link>
                  </motion.div>
                </div>
              </motion.div>
            </>
          )}
        </AnimatePresence>
      </motion.nav>

      {/* Spacer to prevent content from being hidden under fixed header */}
      <div className="h-[120px]" />
    </>
  );
}