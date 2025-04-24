'use client';
import { usePathname, useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import Navbar from '@/components/Navbar';
import './globals.css';
import { ThemeProvider } from '@/components/theme-provider';
import FooterSection from '@/components/FooterSection';
import GlobalLoading from '@/components/GlobalLoading';

export default function RootLayout({ children }) {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [isLoading, setIsLoading] = useState(false);
  
  const isDashboard = pathname.startsWith('/dashboard');
  const isPay = pathname.startsWith('/membership/payment-popup');
  const hideLayout = isDashboard || isPay;

  useEffect(() => {
    // Handle route changes
    setIsLoading(false); // Hide loading when route change completes
  }, [pathname, searchParams]);

  useEffect(() => {
    const handleStart = () => setIsLoading(true);
    const handleComplete = () => setIsLoading(false);

    // Listen to native browser navigation events
    window.addEventListener('beforeunload', handleStart);
    
    return () => {
      window.removeEventListener('beforeunload', handleStart);
    };
  }, []);

  return (
    <html lang="en" suppressHydrationWarning>
      <head />
      <body>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {/* Global loading overlay - shows above everything */}
          {isLoading && <GlobalLoading />}
          
          {/* Your existing layout */}
          {!hideLayout && <Navbar />}
          {children}
          {!hideLayout && <FooterSection />}
        </ThemeProvider>
      </body>
    </html>
  );
}
