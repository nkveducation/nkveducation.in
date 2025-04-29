'use client'
import Breadcrumbs from '@/components/Breadcrumbs';
import OffersSection from '@/components/OffersSection';
import { motion } from 'framer-motion';
import { Suspense } from 'react';


export default function Offer() {
    return (
      <Suspense fallback={<div>Loading offers...</div>}>
        <OfferContent />
      </Suspense>
    );
  }

export  function OfferContent() {
    return (
      <main className="bg-white min-h-screen m-0 p-0 mt-[80px] min-w-full">
        <div className="px-6 py-8 flex justify-between items-center" style={{ background: 'linear-gradient(to right, #dc2626, #b91c1c)' }}>
          <h1 className="text-3xl text-white font-bold">Exciting Offers</h1>
          <Breadcrumbs />
        </div>
        <OffersSection/>
      </main>
    );
  }