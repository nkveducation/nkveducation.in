"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { StudentSearch } from "@/components/ContactSection";

// MotionCard as a separate reusable component
const MotionCard = ({ children }) => (
    <motion.div
        whileHover={{
            scale: 1.02,
            boxShadow: "0 0 20px rgba(255,255,255,0.2)",
        }}
        className="rounded-2xl p-6 border border-[#D77375] transition-all duration-300 hover:border-white backdrop-blur-xl bg-white/10"
    >
        {children}
    </motion.div>
);

export default function Result() {
    const pathname = usePathname();
    const paths = pathname.split("/").filter((p) => p);

    return (
        <main className="mt-[80px] min-h-screen">
      {/* Header with breadcrumb */}
      <section
        className="text-white px-6 py-10"
        style={{
          backgroundImage: 'url("/images/red-dot-button-bg.jpeg")',
          backgroundSize: 'cover',
          backgroundRepeat: 'no-repeat',
          backgroundPosition: 'center',
        }}
      >
        <div className="max-w-6xl mx-auto flex  md:flex-row justify-between items-start md:items-center gap-4">
          <h1 className="text-4xl font-bold tracking-wide">Result</h1>
          <div className="bg-white text-black px-6 py-2 rounded-full text-sm shadow-lg">
            <Link href="/" className="text-red-700 font-semibold">Home</Link>
            {paths.map((p, i) => (
              <span key={i} className="text-gray-600"> / {p.charAt(0).toUpperCase() + p.slice(1)}</span>
            ))}
          </div>
        </div>
      </section>


            {/* Search Section */}
            <motion.section
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.7, delay: 0.5, ease: "easeOut" }}
                className="max-w-6xl mx-auto px-4 py-12"
            >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                    <MotionCard>
                        <StudentSearch />
                    </MotionCard>
                </div>
            </motion.section>
        </main>
    );
}
