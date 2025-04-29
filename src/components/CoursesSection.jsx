'use client';
import { motion } from 'framer-motion';
import { BriefcaseBusiness, LaptopMinimal, UserRoundCheck, ChevronRight, ArrowRight } from 'lucide-react';

const courseCategories = [
  {
    id: 1,
    icon: <LaptopMinimal className="w-6 h-6" />,
    title: 'COMPUTER COURSES',
    desc: 'Comprehensive programs to equip you with essential digital skills for the modern workplace.',
    courses: [
      'Basic Computer', 'Advanced Basic', 'Tally', 'Advanced Tally',
      'C Programming', 'C++', 'Java', 'Python', 'Web Development',
      'Cyber Security', 'Data Science', 'AI/ML', 'Cloud Computing',
      'Graphic Design', 'Animation', 'Video Editing', '3D Modeling'
    ]
  },
  {
    id: 2,
    icon: <UserRoundCheck className="w-6 h-6" />,
    title: 'PROFESSIONAL COURSES',
    desc: 'Career-focused programs to boost your professional growth and marketability.',
    courses: [
      'Digital Marketing', 'Financial Accounting', 'Business Management',
      'Human Resources', 'Project Management', 'Data Analysis',
      'UX/UI Design', 'Content Writing', 'Public Speaking',
      'Entrepreneurship', 'Leadership Training', 'Corporate Communication'
    ]
  },
  {
    id: 3,
    icon: <BriefcaseBusiness className="w-6 h-6" />,
    title: 'TRADING COURSES',
    desc: 'Master financial markets with our practical trading and investment curriculum.',
    courses: [
      'Stock Market Basics', 'Technical Analysis', 'Fundamental Analysis',
      'Options Trading', 'Futures Trading', 'Forex Trading',
      'Cryptocurrency', 'Portfolio Management', 'Risk Management',
      'Algorithmic Trading', 'Commodities Trading', 'Trading Psychology'
    ]
  },
  {
    id: 4,
    icon: <BriefcaseBusiness className="w-6 h-6" />,
    title: 'CREATIVE ARTS',
    desc: 'Unlock your creative potential with our hands-on arts and crafts programs.',
    courses: [
      'Painting & Drawing', 'Photography', 'Pottery',
      'Graphic Design', 'Fashion Design', 'Interior Design',
      'Jewelry Making', 'Textile Design', 'Calligraphy',
      'Woodworking', 'Metal Crafts', 'Glass Art'
    ]
  }
];

export default function ModernCoursesSection() {
  return (
    <section className="py-20 px-4 md:px-8 bg-gradient-to-b from-gray-50 to-white">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-4xl md:text-5xl font-bold text-gray-900 mb-4"
          >
            Transform Your <span className="text-red-600">Skills</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-lg text-gray-600 max-w-3xl mx-auto"
          >
            Discover our cutting-edge courses designed to empower your career and personal growth in today's competitive world.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
          {courseCategories.map((category) => (
            <motion.div
              key={category.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: category.id * 0.1 }}
              whileHover={{ y: -5 }}
              className="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-100 hover:shadow-xl transition-all duration-300"
            >
              <div className="p-6">
                <div className="flex items-start gap-4 mb-4">
                  <div className="bg-red-100 p-3 rounded-lg">
                    {category.icon}
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-900">{category.title}</h3>
                    <p className="text-gray-600">{category.desc}</p>
                  </div>
                </div>
                
                <div className="mt-6">
                  <h4 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-3">Popular Courses</h4>
                  <div className="flex flex-wrap gap-2">
                    {category.courses.slice(0, 6).map((course, index) => (
                      <span key={index} className="px-3 py-1 bg-gray-100 text-gray-800 text-sm rounded-full">
                        {course}
                      </span>
                    ))}
                  </div>
                </div>
                
                <motion.button
                  whileHover={{ x: 5 }}
                  className="mt-6 flex items-center text-red-600 font-medium group"
                >
                  Explore all {category.title.toLowerCase()}
                  <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </motion.button>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="text-center"
        >
          <button className="relative px-8 py-4 bg-red-600 text-white rounded-lg text-lg font-semibold overflow-hidden group">
            <span className="relative z-10 flex items-center justify-center gap-2">
              Browse All Courses
              <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </span>
            <span className="absolute inset-0 bg-gradient-to-r from-red-600 to-red-700 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
          </button>
          
          <p className="mt-6 text-gray-500">
            Not sure which course is right for you?{' '}
            <a href="#" className="text-red-600 hover:underline font-medium">Get personalized recommendations</a>
          </p>
        </motion.div>
      </div>
    </section>
  );
}