"use client";
import { motion } from "framer-motion";
import SearchEmployee, { StudentSearch } from "./Search";

export default function ContactSection() {
  return (
    <motion.section
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="py-12 px-4 md:px-8 bg-red-700 bg-[url(/images/red-dot-button-bg.jpeg)] bg-cover"
    >
      <div className="max-w-6xl mx-auto">
        <motion.h2
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
          className="text-2xl md:text-3xl font-semibold text-white mb-4"
        >
          TEAM MEMBER / REGISTRATION CERTIFICATE
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.4 }}
          className="text-white mb-8 max-w-3xl"
        >
          Our certificate verifies the credentials of team members/registration
          certificate, confirming their expertise, status, membership, and
          compliance as trusted professionals within their respective fields.
        </motion.p>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Team Member Search */}
          <motion.div
            whileHover={{ scale: 1.02, boxShadow: "0 0 20px rgba(255,255,255,0.2)" }}
            className="rounded-xl p-6 border border-[#D77375] transition-all duration-300 hover:border-white"
            style={{
              background: "hsla(0, 0%, 100%, 0.2)",
              backdropFilter: "blur(10px)",
            }}
          >
            <h3 className="text-xl md:text-2xl font-semibold text-white mb-4">
              SEARCH TEAM MEMBER
            </h3>
            <SearchEmployee />
          </motion.div>

          {/* Certificate Search */}
          <motion.div
            whileHover={{ scale: 1.02, boxShadow: "0 0 20px rgba(255,255,255,0.2)" }}
            className="rounded-xl p-6 border border-[#D77375] transition-all duration-300 hover:border-white"
            style={{
              background: "hsla(0, 0%, 100%, 0.2)",
              backdropFilter: "blur(10px)",
            }}
          >
            <h3 className="text-xl md:text-2xl font-semibold text-white mb-4">
              SEARCH CERTIFICATE
            </h3>
            <StudentSearch />
          </motion.div>
        </div>
      </div>
    </motion.section>
  );
}
