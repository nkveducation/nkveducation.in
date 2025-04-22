'use client';
import { usePathname } from 'next/navigation';
import Navbar from '@/components/Navbar';
import './globals.css';
import { ThemeProvider } from '@/components/theme-provider';
import FooterSection from '@/components/FooterSection';

export default function RootLayout({ children }) {
  const pathname = usePathname();
  const isDashboard = pathname.startsWith('/dashboard');
  const isPay = pathname.startsWith('/membership/payment-popup');

  const hideLayout = isDashboard || isPay;

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
          {!hideLayout && <Navbar />}
          {children}
          {!hideLayout && <FooterSection />}
        </ThemeProvider>
      </body>
    </html>
  );
}
