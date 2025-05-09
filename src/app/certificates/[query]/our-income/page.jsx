'use client'

import React, { useState, useEffect } from 'react';
import { FiMenu, FiBell, FiDollarSign, FiTrendingUp, FiCalendar, FiFileText, FiDownload, FiArrowLeft, FiHome, FiUsers, FiUser, FiX } from 'react-icons/fi';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { useParams } from 'next/navigation';

export default function IncomePage() {
    const params = useParams();
    const query = decodeURIComponent(params?.query || '');
    const [teacher, setTeacher] = useState({});
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [isClient, setIsClient] = useState(false);

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

    // Process income data - teacher.income is a single value (1200)
    const monthlyIncome = teacher.income || 0;
    const yearlyIncome = monthlyIncome * 12;
    const currentYear = new Date().getFullYear();

    // Create sample monthly data for display
    const monthlyData = Array.from({ length: 12 }, (_, i) => ({
        month: new Date(currentYear, i, 1).toLocaleDateString('en-US', { month: 'long', year: 'numeric' }),
        salary: monthlyIncome
    }));

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
                        <h1 className="text-xl font-bold text-white">NKV Education</h1>
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
                            { name: 'Active Registration Plan', href: `/certificates/${encodeURIComponent(query)}/active-registration-plan`, icon: <FiFileText size={18} /> },
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
                                            <h1 className="text-xl font-bold text-white">NKV Education</h1>
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
                                            { name: 'Active Registration Plan', href: '/active-registration-plan', icon: <FiFileText size={18} /> },
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
            <div className="flex-1 overflow-auto">
                {/* Header */}
                <header className="bg-white shadow-sm">
                    <div className="px-4 py-4 sm:px-6 lg:px-8 flex justify-between items-center">
                        <button 
                            className="md:hidden p-2 rounded-md text-gray-700 hover:bg-gray-100"
                            onClick={() => setSidebarOpen(true)}
                        >
                            <FiMenu className="h-6 w-6" />
                        </button>
                        <h1 className="text-xl font-semibold text-gray-900">Income Details</h1>
                        <div className="flex items-center space-x-4">
                            <button className="p-2 rounded-full hover:bg-gray-100">
                                <FiBell className="h-5 w-5 text-gray-500" />
                            </button>
                            <div className="relative">
                                <button className="flex items-center space-x-2">
                                    <span className="text-sm font-medium text-gray-700">{teacher.fullName || 'Teacher'}</span>
                                    <img 
                                        src={teacher.photo || "/placeholder-profile.png"} 
                                        className="h-8 w-8 rounded-full" 
                                        alt="Profile" 
                                    />
                                </button>
                            </div>
                        </div>
                    </div>
                </header>

                {/* Main Content */}
                <main className="p-4 sm:p-6 lg:p-8">
                    {/* Teacher Profile Summary */}
                    <div className="bg-white rounded-xl shadow-sm p-6 mb-6 border border-gray-100">
                        <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
                            <div className="flex-shrink-0">
                                <img 
                                    src={teacher.photo || "/placeholder-profile.png"} 
                                    className="h-20 w-20 rounded-full object-cover border-2 border-white shadow" 
                                    alt={teacher.fullName || 'Profile'} 
                                />
                            </div>
                            <div className="flex-1">
                                <h2 className="text-2xl font-bold text-gray-800">{teacher.fullName || 'Teacher'}</h2>
                                <p className="text-gray-600">{teacher.rank || 'Teacher'}</p>
                                <p className="text-sm text-gray-500">
                                    Employee since {teacher.joinDate ? new Date(teacher.joinDate).toLocaleDateString() : 'N/A'}
                                </p>
                            </div>
                            <div className="bg-blue-50 px-4 py-3 rounded-lg">
                                <p className="text-sm text-blue-600 font-medium">Monthly Salary</p>
                                <p className="text-xl font-bold text-blue-800">
                                    ₹{monthlyIncome.toLocaleString('en-IN')}
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Income Summary Cards */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                            <div className="flex items-center">
                                <div className="p-3 rounded-full bg-green-100 mr-4">
                                    <FiDollarSign className="h-6 w-6 text-green-600" />
                                </div>
                                <div>
                                    <p className="text-gray-500 text-sm">Monthly Salary</p>
                                    <p className="text-2xl font-bold text-gray-800">
                                        ₹{monthlyIncome.toLocaleString('en-IN')}
                                    </p>
                                </div>
                            </div>
                        </div>

                        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                            <div className="flex items-center">
                                <div className="p-3 rounded-full bg-blue-100 mr-4">
                                    <FiTrendingUp className="h-6 w-6 text-blue-600" />
                                </div>
                                <div>
                                    <p className="text-gray-500 text-sm">Yearly Salary</p>
                                    <p className="text-2xl font-bold text-gray-800">
                                        ₹{yearlyIncome.toLocaleString('en-IN')}
                                    </p>
                                </div>
                            </div>
                        </div>

                        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                            <div className="flex items-center">
                                <div className="p-3 rounded-full bg-purple-100 mr-4">
                                    <FiCalendar className="h-6 w-6 text-purple-600" />
                                </div>
                                <div>
                                    <p className="text-gray-500 text-sm">Daily Rate</p>
                                    <p className="text-2xl font-bold text-gray-800">
                                        ₹{Math.round(monthlyIncome / 30).toLocaleString('en-IN')}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Monthly Income Details */}
                    <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
                        <div className="flex justify-between items-center mb-4">
                            <h2 className="text-lg font-semibold text-gray-800">{currentYear} Monthly Breakdown</h2>
                            <button className="flex items-center text-sm text-blue-600 hover:text-blue-800">
                                <FiDownload className="mr-1" />
                                Export
                            </button>
                        </div>
                        
                        <div className="overflow-x-auto">
                            <table className="min-w-full divide-y divide-gray-200">
                                <thead className="bg-gray-50">
                                    <tr>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Month</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Salary</th>
                                    </tr>
                                </thead>
                                <tbody className="bg-white divide-y divide-gray-200">
                                    {monthlyData.map((income, index) => (
                                        <tr key={index}>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                                {income.month}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                ₹{income.salary.toLocaleString('en-IN')}
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </main>
            </div>
        </div>
    );
}