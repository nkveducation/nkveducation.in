"use client";

import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function HeroSection() {
  const router = useRouter();
  const [isHovering, setIsHovering] = useState(false);
  const [cursorPos, setCursorPos] = useState({ x: 0, y: 0 });
  const [isClient, setIsClient] = useState(false);

  const handleRegistrationClick = () => {
    router.push("/registration/tie-up-registration");
  };

  useEffect(() => {
    setIsClient(true);
    const handleMouseMove = (e) => {
      setCursorPos({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  // Don't render particles on server
  const renderParticles = () => {
    if (!isClient) return null;
    
    return [...Array(20)].map((_, i) => (
      <motion.div
        key={i}
        className="absolute rounded-full bg-white/10 backdrop-blur-sm"
        initial={{
          x: Math.random() * window.innerWidth,
          y: Math.random() * window.innerHeight,
          scale: Math.random() * 0.5 + 0.5,
        }}
        animate={{
          y: [0, Math.random() * 100 - 50],
          x: [0, Math.random() * 100 - 50],
        }}
        transition={{
          duration: Math.random() * 10 + 10,
          repeat: Infinity,
          repeatType: "reverse",
          ease: "easeInOut",
        }}
        style={{
          width: `${Math.random() * 10 + 5}px`,
          height: `${Math.random() * 10 + 5}px`,
        }}
      />
    ));
  };

  return (
    <section className="relative h-screen w-full overflow-hidden">
      {/* Animated gradient background layer */}
      <div className="absolute inset-0 bg-gradient-to-br from-purple-900 via-indigo-800 to-blue-900 opacity-70 z-0"></div>

      {/* Background Video with parallax effect */}
      <motion.video
        className="absolute inset-0 w-full h-full object-cover z-0"
        autoPlay
        muted
        loop
        playsInline
        initial={{ scale: 1.2 }}
        animate={{ scale: 1 }}
        transition={{ duration: 2, ease: [0.2, 0.8, 0.4, 1] }}
      >
        <source src="/video.mp4" type="video/mp4" />
      </motion.video>

      {/* Floating particles - client-side only */}
      {renderParticles()}

      {/* Cursor follower - client-side only */}
      {isClient && (
        <motion.div
          className="fixed w-64 h-64 rounded-full bg-gradient-to-r from-red-600/20 to-purple-600/20 pointer-events-none z-10"
          animate={{
            x: cursorPos.x - 128,
            y: cursorPos.y - 128,
            scale: isHovering ? 1 : 0.5,
            opacity: isHovering ? 0.8 : 0.2,
          }}
          transition={{ type: "spring", damping: 20, stiffness: 300 }}
        />
      )}

      {/* Main content */}
      <div className="absolute inset-0 flex items-center justify-center z-20">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.2, 0.8, 0.4, 1] }}
          className="bg-[hsla(0,0%,100%,0.15)] backdrop-blur-lg rounded-2xl p-8 max-w-4xl text-center border border-white/10 shadow-2xl"
          onMouseEnter={() => setIsHovering(true)}
          onMouseLeave={() => setIsHovering(false)}
        >
          <motion.h1
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="text-4xl sm:text-5xl md:text-6xl font-bold text-white mb-6 drop-shadow-lg"
          >
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-red-400 to-red-600">
              Welcome To NKV Education
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="text-base sm:text-lg md:text-xl text-white/90 mb-8 max-w-2xl mx-auto leading-relaxed"
          >
            We are a leading training institute dedicated to empowering individuals
            with the knowledge and skills necessary for success in the digital age.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.6 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <motion.button
              onClick={handleRegistrationClick}
              whileHover={{ scale: 1.05, boxShadow: "0 10px 25px -5px rgba(220, 38, 38, 0.4)" }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-3.5 bg-gradient-to-r from-red-600 to-red-700 text-white rounded-xl text-sm sm:text-base font-medium transition-all duration-300 shadow-lg hover:shadow-xl relative"
            >
              REGISTRATION
              <span className="absolute inset-0 rounded-xl border border-white/20"></span>
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.05, boxShadow: "0 10px 25px -5px rgba(255, 255, 255, 0.2)" }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-3.5 border-2 border-white/30 text-white bg-white/10 rounded-xl text-sm sm:text-base font-medium backdrop-blur-sm transition-all duration-300 shadow-lg hover:shadow-xl relative"
            >
              JOIN US
              <span className="absolute inset-0 rounded-xl border border-white/20"></span>
            </motion.button>
          </motion.div>
        </motion.div>
      </div>

      {/* Scrolling indicator - client-side only */}
      {isClient && (
        <motion.div
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2, duration: 0.6 }}
        >
          <div className="flex flex-col items-center">
            <span className="text-white/80 text-sm mb-2">Scroll Down</span>
            <motion.div
              animate={{ y: [0, 10, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
              className="w-4 h-8 border-2 border-white/50 rounded-full"
            >
              <motion.div
                className="w-1 h-2 bg-white rounded-full mx-auto mt-1"
                animate={{ opacity: [0, 1, 0] }}
                transition={{ duration: 1.5, repeat: Infinity, delay: 0.3 }}
              />
            </motion.div>
          </div>
        </motion.div>
      )}
    </section>
  );
}