'use client';

import { motion } from 'framer-motion';
import { BriefcaseBusiness } from 'lucide-react';
import { LaptopMinimalCheck } from 'lucide-react';
import { UserRoundCheck } from 'lucide-react';

const courses = [
  {
    id: 1,
    icon: <LaptopMinimalCheck/>,
    title: 'COMPUTER COURSES',
    desc: 'A comprehensive program designed to equip individuals with essential computer skills.',
  },
  {
    id: 2,
    icon: <UserRoundCheck/>,
    title: 'PROFESSIONAL COURSES',
    desc: 'Boost your career with courses tailored for business, finance, and soft skills development.',
  },
  {
    id: 3,
    icon: <BriefcaseBusiness/>,
    title: 'TRADING COURSES',
    desc: 'Master the art of stock and crypto trading with our in-depth and practical curriculum.',
  },
];

export default function CoursesSection() {
  return (
    <section className="py-16 px-4 md:px-8 bg-gray-50">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold text-center text-red-600 mb-12">
          Our Popular Courses
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {courses.map((course, i) => (
            <motion.div
              key={course.id}
              whileHover={{ scale: 1.05, y: -5 }}
              transition={{ duration: 0.4 }}
              className="bg-white p-6 rounded-2xl shadow-md hover:shadow-2xl transition relative overflow-hidden"
            >
              <div className="bg-gradient-to-br from-red-500 to-pink-500 rounded-full w-16 h-16 flex items-center justify-center mb-4 mx-auto shadow-md">
                {/* <img src={course.icon} alt={course.title} className="w-8 h-8" /> */}
                {course.icon}
              </div>

              <h3 className="text-xl font-semibold text-center text-red-600 mb-3">
                {course.title}
              </h3>
              <p className="text-gray-600 text-center">{course.desc}</p>

              {/* Optional glow on hover */}
              <div className="absolute inset-0 bg-gradient-to-br from-red-100 to-transparent opacity-0 hover:opacity-10 transition pointer-events-none rounded-2xl"></div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
