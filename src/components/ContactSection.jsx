"use client";
import { StudentSearch } from "@/app/result/page";
import { SearchEmployee } from "@/app/team/page";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";

const Info = ({ label, value }) => (
  <div className="flex flex-col space-y-1">
    <span className="text-xs font-medium text-gray-500 uppercase tracking-wider">{label}</span>
    <span className="text-sm font-medium text-gray-800">{value || '-'}</span>
  </div>
);

export default function ContactSection() {
  const router = useRouter();
  return (
    <motion.section
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="py-12 px-4 md:px-8 bg-white"
    >
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <motion.h2
            className="text-3xl md:text-4xl font-bold text-gray-900 mb-4"
          >
            TEAM MEMBER / REGISTRATION CERTIFICATE
          </motion.h2>
          <motion.div className="w-20 h-1 bg-red-600 mx-auto mb-4" />
          <motion.p
            className="text-gray-600 max-w-3xl mx-auto text-lg"
          >
            Our certificate verifies the credentials of team members/registration
            certificate, confirming their expertise, status, membership, and
            compliance as trusted professionals within their respective fields.
          </motion.p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Team Member Search */}
          <motion.div
            whileHover={{ y: -5 }}
            className="rounded-xl p-6 border border-gray-200 transition-all duration-300 hover:shadow-lg"
            style={{
              background: "white",
            }}
          >
            <h3 className="text-xl md:text-2xl font-bold text-gray-900 mb-6 flex items-center">
              <span className="w-3 h-8 bg-red-600 mr-3"></span>
              SEARCH TEAM MEMBER
            </h3>
            <SearchEmployee />
          </motion.div>

          {/* Certificate Search */}
          <motion.div
            whileHover={{ y: -5 }}
            className="rounded-xl p-6 border border-gray-200 transition-all duration-300 hover:shadow-lg"
            style={{
              background: "white",
            }}
          >
            <h3 className="text-xl md:text-2xl font-bold text-gray-900 mb-6 flex items-center">
              <span className="w-3 h-8 bg-red-600 mr-3"></span>
              SEARCH CERTIFICATE
            </h3>
            <StudentSearch router={router}  />
          </motion.div>
        </div>
      </div>
    </motion.section>
  );
}
