"use client";

import { motion } from "framer-motion";
import { useRouter } from "next/navigation";

export default function HeroSection() {


  const router = useRouter();

  // Function to handle the click event for the registration button
  const handleRegistrationClick = () => {
    router.push("/registration/1");
  }
  return (
    <section className="relative h-screen w-full-screen overflow-hidden">
      {/* Background Video */}
      <video
        className="absolute inset-0 w-full-screen h-full object-cover"
        autoPlay
        muted
        loop
      >
        <source src="/video.mp4" type="video/mp4" />
      </video>

      {/* Overlay with glass and center content */}
      <div className="absolute inset-0  bg-opacity-50 flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="bg-[hsla(0,0%,100%,0.2)] backdrop-blur-md rounded-xl p-8 max-w-4xl text-center"
        >
          <motion.h1
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4 drop-shadow"
          >
            Welcome To NKV Education
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="text-sm sm:text-base md:text-lg text-white mb-6 max-w-2xl mx-auto"
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
            <button onClick={handleRegistrationClick} className="px-5 py-2.5 bg-red-600 text-white rounded-md text-sm sm:text-base hover:bg-red-700 transition shadow-md hover:shadow-lg">
              REGISTRATION
            </button>
            <button className="px-5 py-2.5 border border-red-400 text-red-600 bg-white rounded-md text-sm sm:text-base hover:bg-gray-100 transition shadow-md hover:shadow-lg">
              JOIN US
            </button>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
