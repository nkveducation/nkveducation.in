'use client'

import React, { useState, useEffect } from 'react';
import { FiMenu, FiBell, FiDollarSign, FiTrendingUp, FiCalendar, FiFileText, FiDownload, FiArrowLeft, FiHome, FiUsers, FiUser, FiX, FiCheck } from 'react-icons/fi';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { useParams } from 'next/navigation';

export default function ActiveRegistrationPlanPage() {
    const params = useParams();
    const query = decodeURIComponent(params?.query || '');
    const [teacher, setTeacher] = useState({});
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [isClient, setIsClient] = useState(false);

    const plans = [
        {
            name: "Basic Plan",
            price: "4,999",
            duration: "INR",
            features: [
                "Lifetime Membership",
                "Trainer Identity Card",
                "Registration Certificate",
                "Max. 30 Students Certificate Free",
                "List your parlour on Google",
                "Free Seminar Yearly (offline/online)",
                "Loan Facility 1 lac (max 30% interest)",
                "Refer & Earn"
            ],
            cta: "Get Started",
            accentColor: "bg-blue-600",
            popular: false
        },
        {
            name: "Premium Plan",
            price: "9,999",
            duration: "INR",
            features: [
                "Lifetime Membership",
                "Trainer Identity Card",
                "Registration Certificate",
                "Free 100 Student Certificate Yearly",
                "List your parlour on Google",
                "One Free Seminar",
                "Loan Facility upto 1 lac (MAX 30% INT)",
                "Training Academy Authorization",
                "Add two More Courses in Academy",
                "Free One Portfolio Setup in social media",
                "Dynamic page website"
            ],
            cta: "Get Premium",
            accentColor: "bg-purple-600",
            popular: true
        },
        {
            name: "Premium+ Plan",
            price: "18,999",
            duration: "INR",
            features: [
                "Lifetime Membership",
                "Trainer Identity Card",
                "Registration Certificate",
                "List Your parlour in Google",
                "Free Seminar Yearly (offline/online)",
                "Training Academy Authorization",
                "Add any five Course in Academy",
                "Loan Facility upto 20lac (T&C)",
                "Refer & Earn",
                "Students placements",
                "Three Free Portfolio Setup in social media",
                "Free unlimited Student Certificate",
                "Help to improve Your Business"
            ],
            cta: "Get Premium+",
            accentColor: "bg-red-600",
            popular: false
        }
    ];

    useEffect(() => {
        setIsClient(true);
    }, []);

    useEffect(() => {
        if (!isClient) return;

        const handleClickOutside = (event) => {
            const sidebar = document.getElementById('sidebar');
            if (sidebarOpen && sidebar && !sidebar.contains(event.target)) {
                setSidebarOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [sidebarOpen, isClient]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await fetch(`/api/teachers/search?query=${query}`);
                const data = await res.json();
                if (!res.ok) throw new Error(data.message || 'Failed to fetch data');

                if (data.data && data.data.length > 0) {
                    setTeacher(data.data[0].teacher || {});
                }
            } catch (err) {
                setError(err.message);
            } finally {
                setIsLoading(false);
            }
        };

        if (query) {
            fetchData();
        } else {
            setIsLoading(false);
            setError('Invalid query');
        }
    }, [query]);

    if (isLoading) {
        return (
            <div className="flex items-center justify-center min-h-screen bg-gray-50">
                <div className="p-6 max-w-md w-full bg-white rounded-lg shadow-md text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500 mx-auto mb-4"></div>
                    <p className="text-gray-600">Loading Employee data...</p>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="flex items-center justify-center min-h-screen bg-gray-50">
                <div className="p-6 max-w-md w-full bg-white rounded-lg shadow-md">
                    <div className="text-red-500 mb-4 text-center">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                    </div>
                    <h3 className="text-lg font-medium text-gray-800 mb-2 text-center">Error loading data</h3>
                    <p className="text-gray-600 mb-4 text-center">{error}</p>
                    <Link
                        href="/team"
                        className="flex items-center justify-center w-full px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
                    >
                        <FiArrowLeft className="mr-2" />
                        Back to search
                    </Link>
                </div>
            </div>
        );
    }

    const currentPlan = plans.find(plan => plan.name === teacher.plan) || plans[0];

    return (
        <div className="flex h-screen bg-gray-50 overflow-hidden">
            {/* Desktop Sidebar */}
            <div 
                id="sidebar"
                className="hidden md:flex md:flex-shrink-0 w-64 h-full bg-gradient-to-b from-blue-700 to-blue-800 shadow-lg flex-col"
            >
                <div className="p-4 h-full flex flex-col">
                    {/* Logo */}
                    <div className="mb-8 flex items-center space-x-2">
                        <img 
                            src="/logo.png"
                            alt="Company Logo"
                            className="h-10 w-10 rounded-full object-cover"
                            onError={(e) => (e.target.src = "/placeholder-logo.png")}
                        />
                        <h1 className="text-xl font-bold text-white">EduCert</h1>
                    </div>
                    
                    {/* Teacher Profile */}
                    <div className="mb-6 flex flex-col items-center">
                        {teacher.photo ? (
                            <img
                                src={teacher.photo}
                                alt={teacher.fullName || 'Profile'}
                                className="h-24 w-24 rounded-full object-cover border-4 border-white mb-3 shadow-md"
                                onError={(e) => {
                                    e.target.src = "/placeholder-profile.png";
                                    e.target.className = "h-24 w-24 rounded-full object-cover border-4 border-white bg-gray-200 mb-3 shadow-md";
                                }}
                            />
                        ) : (
                            <div className="flex h-24 w-24 items-center justify-center rounded-full bg-gray-200 border-4 border-white mb-3 shadow-md">
                                <FiUser className="text-3xl text-gray-500" />
                            </div>
                        )}
                        <h3 className="text-lg font-semibold text-white text-center">{teacher.fullName || 'Teacher'}</h3>
                        <p className="text-sm text-blue-100 mt-1">{teacher.rank || 'Teacher'}</p>
                        <div className="flex items-center mt-2">
                            <span className="h-2 w-2 rounded-full bg-green-400 mr-2"></span>
                            <span className="text-xs text-blue-100">Active</span>
                        </div>
                    </div>
        
                    {/* Main Navigation */}
                    <nav className="space-y-1">
                        {[
                            { name: 'Home', href: '/home', icon: <FiHome size={18} /> },
                            { name: 'Our Students', href: `/certificates/${query}/our-students`, icon: <FiUsers size={18} /> },
                            { name: 'Our Income', href: `/certificates/${encodeURIComponent(query)}/our-income`, icon: <FiDollarSign size={18} /> },
                            { name: 'Active Registration Plan', href: `/certificates/${encodeURIComponent(query)}/active-registration-plan`, icon: <FiFileText size={18} />, active: true },
                        ].map((item) => (
                            <Link
                                key={item.name}
                                href={item.href}
                                className={`flex items-center space-x-3 rounded-lg px-4 py-3 text-sm font-medium transition-colors ${
                                    item.active 
                                        ? 'bg-white text-blue-700 shadow-sm' 
                                        : 'text-blue-100 hover:bg-blue-600 hover:text-white'
                                }`}
                            >
                                <span className="text-lg">{item.icon}</span>
                                <span>{item.name}</span>
                            </Link>
                        ))}
                    </nav>
                </div>
            </div>

            {/* Mobile Sidebar */}
            {isClient && (
                <AnimatePresence>
                    {sidebarOpen && (
                        <>
                            <motion.div 
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 0.5 }}
                                exit={{ opacity: 0 }}
                                className="fixed inset-0 bg-black z-20 md:hidden"
                                onClick={() => setSidebarOpen(false)}
                            />
                            <motion.div
                                id="sidebar"
                                initial={{ x: -300 }}
                                animate={{ x: 0 }}
                                exit={{ x: -300 }}
                                transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                                className="fixed z-30 h-full w-64 bg-gradient-to-b from-blue-700 to-blue-800 shadow-lg"
                            >
                                <div className="p-4 h-full flex flex-col">
                                    <div className="mb-8 flex items-center justify-between">
                                        <div className="flex items-center space-x-2">
                                            <img 
                                                src="/logo.png"
                                                alt="Company Logo"
                                                className="h-10 w-10 rounded-full object-cover"
                                                onError={(e) => (e.target.src = "/placeholder-logo.png")}
                                            />
                                            <h1 className="text-xl font-bold text-white">EduCert</h1>
                                        </div>
                                        <button 
                                            onClick={() => setSidebarOpen(false)}
                                            className="text-white"
                                        >
                                            <FiX size={24} />
                                        </button>
                                    </div>
                                    
                                    {/* Mobile version of teacher profile */}
                                    <div className="mb-6 flex flex-col items-center">
                                        {teacher.photo ? (
                                            <img
                                                src={teacher.photo}
                                                alt={teacher.fullName || 'Profile'}
                                                className="h-24 w-24 rounded-full object-cover border-4 border-white mb-3 shadow-md"
                                                onError={(e) => {
                                                    e.target.src = "/placeholder-profile.png";
                                                    e.target.className = "h-24 w-24 rounded-full object-cover border-4 border-white bg-gray-200 mb-3 shadow-md";
                                                }}
                                            />
                                        ) : (
                                            <div className="flex h-24 w-24 items-center justify-center rounded-full bg-gray-200 border-4 border-white mb-3 shadow-md">
                                                <FiUser className="text-3xl text-gray-500" />
                                            </div>
                                        )}
                                        <h3 className="text-lg font-semibold text-white text-center">{teacher.fullName || 'Teacher'}</h3>
                                        <p className="text-sm text-blue-100 mt-1">{teacher.rank || 'Teacher'}</p>
                                    </div>
        
                                    {/* Mobile Navigation */}
                                    <nav className="space-y-1">
                                        {[
                                            { name: 'Home', href: '/home', icon: <FiHome size={18} /> },
                                            { name: 'Our Students', href: `/certificates/${query}/our-students`, icon: <FiUsers size={18} /> },
                                            { name: 'Our Income', href: `/certificates/${encodeURIComponent(query)}/our-income`, icon: <FiDollarSign size={18} /> },
                                            { name: 'Active Registration Plan', href: `/certificates/${encodeURIComponent(query)}/active-registration-plan`, icon: <FiFileText size={18} />, active: true },
                                        ].map((item) => (
                                            <Link
                                                key={item.name}
                                                href={item.href}
                                                className={`flex items-center space-x-3 rounded-lg px-4 py-3 text-sm font-medium transition-colors ${
                                                    item.active 
                                                        ? 'bg-white text-blue-700 shadow-sm' 
                                                        : 'text-blue-100 hover:bg-blue-600 hover:text-white'
                                                }`}
                                            >
                                                <span className="text-lg">{item.icon}</span>
                                                <span>{item.name}</span>
                                            </Link>
                                        ))}
                                    </nav>
                                </div>
                            </motion.div>
                        </>
                    )}
                </AnimatePresence>
            )}

            {/* Main Content */}
            <div className="flex-1 flex flex-col overflow-hidden">
                {/* Top Navigation */}
                <header className="bg-white shadow-sm z-10">
                    <div className="flex items-center justify-between px-4 py-3">
                        <div className="flex items-center">
                            <button 
                                onClick={() => setSidebarOpen(true)}
                                className="mr-4 text-gray-500 focus:outline-none md:hidden"
                            >
                                <FiMenu size={24} />
                            </button>
                            <h1 className="text-xl font-semibold text-gray-800">Active Registration Plan</h1>
                        </div>
                        <div className="flex items-center space-x-4">
                            <button className="p-2 text-gray-500 rounded-full hover:bg-gray-100">
                                <FiBell size={20} />
                            </button>
                            <div className="flex items-center">
                                <span className="mr-2 text-sm font-medium text-gray-700 hidden md:block">
                                    {teacher.fullName || 'Teacher'}
                                </span>
                                {teacher.photo ? (
                                    <img
                                        src={teacher.photo}
                                        alt={teacher.fullName || 'Profile'}
                                        className="h-8 w-8 rounded-full object-cover"
                                        onError={(e) => {
                                            e.target.src = "/placeholder-profile.png";
                                            e.target.className = "h-8 w-8 rounded-full object-cover bg-gray-200";
                                        }}
                                    />
                                ) : (
                                    <div className="h-8 w-8 rounded-full bg-gray-200 flex items-center justify-center">
                                        <FiUser className="text-gray-500" />
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </header>

                {/* Page Content */}
                <main className="flex-1 overflow-y-auto p-4 md:p-6 bg-gray-50">
                    <div className="max-w-6xl mx-auto">
                        {/* Current Plan Section */}
                        <div className="mb-8">
                            <h2 className="text-2xl font-bold text-gray-800 mb-4">Current Plan</h2>
                            <div className="bg-white rounded-lg shadow-md overflow-hidden">
                                <div className={`${currentPlan.accentColor} px-6 py-4 text-white`}>
                                    <div className="flex justify-between items-center">
                                        <h3 className="text-xl font-bold">{currentPlan.name}</h3>
                                        <span className="px-3 py-1 bg-white bg-opacity-20 rounded-full text-sm font-medium">
                                            Active Plan
                                        </span>
                                    </div>
                                    <div className="mt-2">
                                        <span className="text-3xl font-bold">{currentPlan.price}</span>
                                        <span className="ml-1 text-lg opacity-80">{currentPlan.duration}</span>
                                    </div>
                                </div>
                                <div className="p-6">
                                    <ul className="space-y-3">
                                        {currentPlan.features.map((feature, index) => (
                                            <li key={index} className="flex items-start">
                                                <FiCheck className="text-green-500 mt-1 mr-2 flex-shrink-0" />
                                                <span className="text-gray-700">{feature}</span>
                                            </li>
                                        ))}
                                    </ul>
                                    <div className="mt-6 pt-6 border-t border-gray-200">
                                        <p className="text-sm text-gray-500">
                                            Plan activated on: <span className="font-medium">{teacher.planActivationDate || 'Not available'}</span>
                                        </p>
                                        <p className="text-sm text-gray-500 mt-1">
                                            Plan expires on: <span className="font-medium">{teacher.planExpiryDate || 'Lifetime'}</span>
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* All Plans Section */}
                        <div>
                            <h2 className="text-2xl font-bold text-gray-800 mb-4">Available Plans</h2>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                {plans.map((plan) => (
                                    <div 
                                        key={plan.name}
                                        className={`bg-white rounded-lg shadow-md overflow-hidden border-2 ${
                                            currentPlan.name === plan.name 
                                                ? 'border-blue-500' 
                                                : 'border-transparent'
                                        }`}
                                    >
                                        {plan.popular && (
                                            <div className="bg-yellow-500 text-white text-center py-1 text-sm font-medium">
                                                Most Popular
                                            </div>
                                        )}
                                        <div className={`${plan.accentColor} px-6 py-4 text-white`}>
                                            <h3 className="text-xl font-bold">{plan.name}</h3>
                                            <div className="mt-2">
                                                <span className="text-3xl font-bold">{plan.price}</span>
                                                <span className="ml-1 text-lg opacity-80">{plan.duration}</span>
                                            </div>
                                        </div>
                                        <div className="p-6">
                                            <ul className="space-y-3 mb-6">
                                                {plan.features.map((feature, index) => (
                                                    <li key={index} className="flex items-start">
                                                        <FiCheck className="text-green-500 mt-1 mr-2 flex-shrink-0" />
                                                        <span className="text-gray-700">{feature}</span>
                                                    </li>
                                                ))}
                                            </ul>
                                            <button
                                                className={`w-full py-2 px-4 rounded-md font-medium ${
                                                    currentPlan.name === plan.name
                                                        ? 'bg-gray-300 text-gray-700 cursor-not-allowed'
                                                        : `${plan.accentColor} text-white hover:opacity-90`
                                                }`}
                                                disabled={currentPlan.name === plan.name}
                                            >
                                                {currentPlan.name === plan.name ? 'Current Plan' : plan.cta}
                                            </button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </main>
            </div>
        </div>
    );
}