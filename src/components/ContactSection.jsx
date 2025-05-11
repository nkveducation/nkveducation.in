"use client";
import { StudentSearch } from "@/app/result/page";
import { SearchEmployee } from "@/app/team/page";
import { motion, useAnimation } from "framer-motion";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { Search, FileText, Users, ShieldCheck } from "lucide-react";

export default function ContactSection() {
  const router = useRouter();
  const controls = useAnimation();

  useEffect(() => {
    controls.start({
      opacity: 1,
      y: 0,
      transition: { staggerChildren: 0.1 }
    });
  }, [controls]);

  return (
    <motion.section
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="relative py-16 px-4 md:px-8 bg-gradient-to-b from-gray-50 to-white overflow-hidden"
    >
      {/* Decorative elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(8)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full bg-gradient-to-r from-red-500/5 to-purple-500/5 backdrop-blur-sm"
            initial={{
              x: Math.random() * 100,
              y: Math.random() * 100,
              opacity: 0.3
            }}
            animate={{
              x: [0, Math.random() * 50 - 25],
              y: [0, Math.random() * 50 - 25],
            }}
            transition={{
              duration: Math.random() * 10 + 10,
              repeat: Infinity,
              repeatType: "reverse",
              ease: "easeInOut",
            }}
            style={{
              width: `${Math.random() * 300 + 100}px`,
              height: `${Math.random() * 300 + 100}px`,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
          />
        ))}
      </div>

      <div className="max-w-6xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <motion.h2
            className="text-3xl md:text-4xl font-bold text-gray-900 mb-6"
          >
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-600 to-red-800">
              TEAM MEMBER
            </span> / <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-blue-800">
              REGISTRATION CERTIFICATE
            </span>
          </motion.h2>
          
          <motion.div 
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
            className="w-32 h-1 bg-gradient-to-r from-red-600 to-blue-600 mx-auto mb-6 rounded-full"
          />
          
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            viewport={{ once: true }}
            className="text-gray-600 max-w-3xl mx-auto text-lg md:text-xl"
          >
            Our certificate verifies the credentials of team members/registration
            certificate, confirming their expertise, status, membership, and
            compliance as trusted professionals within their respective fields.
          </motion.p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Team Member Search */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            whileHover={{ y: -8 }}
            className="relative rounded-2xl p-8 bg-white border border-gray-200 transition-all duration-300 hover:shadow-xl group overflow-hidden"
          >
            {/* Hover shine effect */}
            <div className="absolute inset-0 overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/30 to-white/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500" 
                style={{
                  transform: 'translateX(-100%)',
                  animation: 'shine 1.5s forwards'
                }}
              />
            </div>
            
            <div className="flex items-start gap-4 mb-6">
              <div className="bg-gradient-to-br from-red-600 to-red-800 p-3 rounded-lg text-white shadow-lg">
                <Users className="w-6 h-6" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900">
                SEARCH TEAM MEMBER
              </h3>
            </div>
            
            <div className="relative z-10">
              <SearchEmployee />
            </div>
            
            
          </motion.div>

          {/* Certificate Search */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            viewport={{ once: true }}
            whileHover={{ y: -8 }}
            className="relative rounded-2xl p-8 bg-white border border-gray-200 transition-all duration-300 hover:shadow-xl group overflow-hidden"
          >
            {/* Hover shine effect */}
            <div className="absolute inset-0 overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/30 to-white/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500" 
                style={{
                  transform: 'translateX(-100%)',
                  animation: 'shine 1.5s forwards'
                }}
              />
            </div>
            
            <div className="flex items-start gap-4 mb-6">
              <div className="bg-gradient-to-br from-blue-600 to-blue-800 p-3 rounded-lg text-white shadow-lg">
                <FileText className="w-6 h-6" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900">
                SEARCH CERTIFICATE
              </h3>
            </div>
            
            <div className="relative z-10">
              <StudentSearch router={router} />
            </div>
            
            
          </motion.div>
        </div>
        
        {/* Additional Info Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          viewport={{ once: true }}
          className="mt-16 bg-gradient-to-r from-red-600 to-blue-600 rounded-2xl p-8 text-white shadow-xl"
        >
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="flex items-start gap-4">
              <ShieldCheck className="w-8 h-8 flex-shrink-0" />
              <div>
                <h3 className="text-xl font-bold mb-2">Verified Credentials</h3>
                <p className="text-white/90">All our certificates are digitally verified and tamper-proof</p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <Search className="w-8 h-8 flex-shrink-0" />
              <div>
                <h3 className="text-xl font-bold mb-2">Instant Verification</h3>
                <p className="text-white/90">Quickly verify any team member or certificate in seconds</p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <FileText className="w-8 h-8 flex-shrink-0" />
              <div>
                <h3 className="text-xl font-bold mb-2">Secure Database</h3>
                <p className="text-white/90">All records stored securely with enterprise-grade encryption</p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      <style jsx global>{`
        @keyframes shine {
          0% { transform: translateX(-100%) rotate(15deg); }
          20% { transform: translateX(100%) rotate(15deg); }
          100% { transform: translateX(100%) rotate(15deg); }
        }
      `}</style>
    </motion.section>
  );
}