"use client";

import HeroSection from '@/components/HeroSection';
import InfoSection from '@/components/InfoSection';
import CoursesSection from '@/components/CoursesSection';
import ContactSection from '@/components/ContactSection';
import OffersSection from '@/components/OffersSection';
import { Suspense } from 'react';

export default function Home() {
  return (
    <main className="m-0 p-0 w-full max-w-screen overflow-x-hidden">
      <Suspense fallback={<div>Loading hero...</div>}>
        <HeroSection />
      </Suspense>
      
      <div className='min-w-fit'>
        <InfoSection />
      </div>

      <CoursesSection />
      <ContactSection />
      <OffersSection />
    </main>
  );
}
