'use client';

import { usePathname, useSearchParams } from 'next/navigation';
import { useEffect, useState, Suspense } from 'react';
import Navbar from '@/components/Navbar';
import './globals.css';
import { ThemeProvider } from '@/components/theme-provider';
import FooterSection from '@/components/FooterSection';
import GlobalLoading from '@/components/GlobalLoading';

function LayoutWithHooks({ children }) {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [isLoading, setIsLoading] = useState(false);

  const isDashboard = pathname.startsWith('/dashboard');
  const isPay = pathname.startsWith('/membership/payment-popup');
  const hideLayout = isDashboard || isPay;

  useEffect(() => {
    setIsLoading(false);
  }, [pathname, searchParams]);

  useEffect(() => {
    const handleStart = () => setIsLoading(true);
    window.addEventListener('beforeunload', handleStart);
    return () => {
      window.removeEventListener('beforeunload', handleStart);
    };
  }, []);

  return (
    <>
      {isLoading && <GlobalLoading />}
      {!hideLayout && <Navbar />}
      {children}
      {!hideLayout && <FooterSection />}
    </>
  );
}

export default function RootLayout({ children }) {
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
          <Suspense fallback={<div>Loading layout...</div>}>
            <LayoutWithHooks>{children}</LayoutWithHooks>
          </Suspense>
        </ThemeProvider>
      </body>
    </html>
  );
}
