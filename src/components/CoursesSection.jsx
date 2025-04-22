'use client';
import { motion } from 'framer-motion';
import { BriefcaseBusiness, LaptopMinimal, UserRoundCheck } from 'lucide-react';

const courses = [
  {
    id: 1,
    icon: <LaptopMinimal className="w-8 h-8 text-white" />,
    title: 'COMPUTER COURSES',
    desc: 'A comprehensive program designed to equip individuals with essential computer skills.',
  },
  {
    id: 2,
    icon: <UserRoundCheck className="w-8 h-8 text-white" />,
    title: 'PROFESSIONAL COURSES',
    desc: 'Boost your career with courses tailored for business, finance, and soft skills development.',
  },
  {
    id: 3,
    icon: <BriefcaseBusiness className="w-8 h-8 text-white" />,
    title: 'TRADING COURSES',
    desc: 'Master the art of stock and crypto trading with our in-depth and practical curriculum.',
  },
];

export default function Course() {

  return (
    <div className="mt-[80px] min-w-full bg-white">

      {/* Courses Section */}
      <section className="py-16 px-4 md:px-8 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-red-600 mb-4">
              Explore Our Courses
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Discover our comprehensive range of courses designed to empower your career and personal growth.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {courses.map((course) => (
              <motion.div
                key={course.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                whileHover={{ scale: 1.03 }}
                transition={{ duration: 0.3 }}
                className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition-all"
              >
                <div className="bg-red-600 rounded-full w-16 h-16 flex items-center justify-center mb-4 mx-auto shadow-lg">
                  {course.icon}
                </div>

                <h3 className="text-xl font-bold text-center text-gray-800 mb-3">
                  {course.title}
                </h3>
                <p className="text-gray-600 text-center mb-6">{course.desc}</p>
                
                <div className="text-center">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="px-6 py-2 bg-red-600 text-white rounded-full text-sm font-medium hover:bg-red-700 transition-colors"
                  >
                    View Details
                  </motion.button>
                </div>
              </motion.div>
            ))}
          </div>

          <div className="text-center mt-16">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-3 bg-red-600 text-white rounded-md text-lg font-semibold hover:bg-red-700 transition-colors shadow-md"
            >
              View All Courses
            </motion.button>
          </div>
        </div>
      </section>
    </div>
  );
}