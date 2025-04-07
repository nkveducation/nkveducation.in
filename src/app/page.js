"use client"

import Navbar from "@/components/Navbar";
import HeroSection from '@/components/HeroSection';
import InfoSection from '@/components/InfoSection';
import CoursesSection from '@/components/CoursesSection';
import ContactSection from '@/components/ContactSection';
import OffersSection from '@/components/OffersSection';
import FooterSection from '@/components/FooterSection';


export default function Home() {
  return (
    <div>
      <main className="m-0 p-0 min-w-[100vw]">
      <HeroSection />
       <InfoSection />
      <CoursesSection />
      <ContactSection />
      <OffersSection />
    </main>
    </div>
  );
}
