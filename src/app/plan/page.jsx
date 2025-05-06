"use client";

import Breadcrumbs from "@/components/Breadcrumbs";
import { Suspense } from "react";

export default function Plans() {
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

    return (
        <main className="m-0 p-0 min-w-full mt-[80px]">
            {/* Breadcrumb */}
            <div
                className="text-white px-6 py-8 flex flex-col md:flex-row justify-between items-center"
                style={{ background: 'linear-gradient(to right, #dc2626, #b91c1c)' }}>
                <h1 className="text-3xl font-bold mb-4 md:mb-0">Plans & Pricing</h1>
                <Suspense fallback={<div>Loading breadcrumbs...</div>}>
                    <Breadcrumbs />
                </Suspense>
            </div>

            {/* Plans Section */}
            <section className="py-16 bg-gray-50 px-4 md:px-12">
                <div className="max-w-6xl mx-auto text-center mb-12">
                    <h2 className="text-3xl font-bold mb-4">Choose Your Plan</h2>
                    <p className="text-gray-600 max-w-2xl mx-auto">
                        Affordable and value-packed plans tailored for your professional growth and business success.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
                    {plans.map((plan, index) => (
                        <div 
                            key={index}
                            className={`relative rounded-xl shadow-lg overflow-hidden transition-all duration-300 hover:shadow-xl ${plan.popular ? "border-2 border-purple-500 transform md:-translate-y-4" : "border border-gray-200"}`}
                        >
                            {plan.popular && (
                                <div className="absolute top-0 right-0 bg-purple-600 text-white text-xs font-bold px-4 py-1 rounded-bl-lg">
                                    POPULAR
                                </div>
                            )}
                            <div className={`${plan.accentColor} p-6 text-white`}>
                                <h3 className="text-2xl font-bold">{plan.name}</h3>
                                <div className="mt-4">
                                    <span className="text-4xl font-bold">{plan.price}</span>
                                    <span className="text-lg ml-1">{plan.duration}</span>
                                </div>
                            </div>
                            <div className="bg-white p-6">
                                <ul className="space-y-3 mb-8">
                                    {plan.features.map((feature, i) => (
                                        <li key={i} className="flex items-start">
                                            <svg className="w-5 h-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                                            </svg>
                                            <span>{feature}</span>
                                        </li>
                                    ))}
                                </ul>
                                <button
                                    className={`w-full py-3 px-6 rounded-lg font-bold text-white ${plan.accentColor} hover:opacity-90 transition cursor-pointer` }
                                >
                                    {plan.cta}
                                </button>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="max-w-4xl mx-auto mt-16 bg-white rounded-xl shadow-md p-8">
                    <h3 className="text-2xl font-bold text-center mb-6">Need help choosing?</h3>
                    <div className="flex flex-col md:flex-row items-center justify-center gap-4">
                        <div className="flex-1 text-center md:text-left">
                            <p className="text-gray-600 mb-2">Contact us for personalized advice</p>
                            <a href="tel:+919557273142" className="text-blue-600 font-medium hover:underline">+91 9557273142</a>
                        </div>
                        <button className="bg-gray-900 hover:bg-gray-800 text-white px-6 py-3 rounded-lg font-medium transition">
                            Request a Callback
                        </button>
                    </div>
                </div>
            </section>
        </main>
    );
}