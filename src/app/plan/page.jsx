"use client";

import Breadcrumbs from "@/components/Breadcrumbs";
import { Suspense } from "react";

export default function Plans() {
    return (
        <main className="m-0 p-0 min-w-full mt-[80px]">
            {/* Breadcrumb */}
            <div
                className="text-white px-6 py-8 flex justify-between items-center"
                style={{
                    backgroundImage: 'url("/images/red-dot-button-bg.jpeg")',
                    backgroundSize: 'cover',
                    backgroundRepeat: 'no-repeat',
                    backgroundPosition: 'center',
                }}
            >
                <h1 className="text-3xl font-bold">Plans & Pricing</h1>
                <Suspense fallback={<div>Loading breadcrumbs...</div>}>
                    <Breadcrumbs />
                </Suspense>
            </div>

            {/* Plans Section */}
            <section className="py-16 bg-gray-100 px-4 md:px-12">
                <div className="max-w-6xl mx-auto text-center mb-12">
                    <h2 className="text-3xl font-bold mb-4">Choose Your Plan</h2>
                    <p className="text-gray-600">Affordable and value-packed plans for every learner.</p>
                </div>
            </section>
        </main>
    );
}
