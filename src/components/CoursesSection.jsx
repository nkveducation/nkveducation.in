'use client';

import { motion, useAnimation } from 'framer-motion';
import { BriefcaseBusiness, LaptopMinimal, UserRoundCheck, ChevronRight, ArrowRight, Sparkles } from 'lucide-react';
import { useState, useEffect } from 'react';

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
    ],
    color: 'from-blue-500 to-indigo-600'
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
    ],
    color: 'from-purple-500 to-fuchsia-600'
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
    ],
    color: 'from-green-500 to-emerald-600'
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
    ],
    color: 'from-amber-500 to-orange-600'
  }
];

export default function ModernCoursesSection() {
  const [hoveredCard, setHoveredCard] = useState(null);
  const [isMounted, setIsMounted] = useState(false);
  const controls = useAnimation();

  useEffect(() => {
    setIsMounted(true);
    controls.start({
      opacity: 1,
      y: 0,
      transition: { staggerChildren: 0.1 }
    });
  }, [controls]);

  const renderDecorativeElements = () => {
    if (!isMounted) return null;
    
    return [...Array(10)].map((_, i) => {
      const size = Math.random() * 300 + 100;
      const left = Math.random() * 100;
      const top = Math.random() * 100;
      
      return (
        <motion.div
          key={i}
          className="absolute rounded-full bg-gradient-to-r from-red-500/10 to-purple-500/10 backdrop-blur-sm"
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
            width: `${size}px`,
            height: `${size}px`,
            left: `${left}%`,
            top: `${top}%`,
          }}
        />
      );
    });
  };

  return (
    <section className="relative py-20 px-4 md:px-8 bg-gradient-to-b from-gray-50 to-white overflow-hidden">
      {/* Decorative elements - now client-side only */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        {renderDecorativeElements()}
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="text-center mb-16">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-bold text-gray-900 mb-4"
          >
            Transform Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-600 to-red-800">Skills</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            viewport={{ once: true }}
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
              viewport={{ once: true }}
              whileHover={{ y: -5 }}
              onHoverStart={() => setHoveredCard(category.id)}
              onHoverEnd={() => setHoveredCard(null)}
              className="relative bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100 hover:shadow-2xl transition-all duration-300 group"
            >
              {/* Glow effect */}
              <div className={`absolute inset-0 bg-gradient-to-br ${category.color} opacity-0 group-hover:opacity-10 transition-opacity duration-300`}></div>
              
              {/* Hover shine effect */}
              {isMounted && (
                <div className="absolute inset-0 overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/30 to-white/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500" 
                    style={{
                      transform: 'translateX(-100%)',
                      animation: hoveredCard === category.id ? 'shine 1.5s forwards' : 'none'
                    }}
                  />
                </div>
              )}

              <div className="p-8 relative">
                <div className="flex items-start gap-6 mb-6">
                  <div className={`bg-gradient-to-br ${category.color} p-3 rounded-lg text-white shadow-md`}>
                    {category.icon}
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-gray-900">{category.title}</h3>
                    <p className="text-gray-600 mt-2">{category.desc}</p>
                  </div>
                </div>
                
                <div className="mt-8">
                  <h4 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-4 flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-yellow-500" />
                    Popular Courses
                  </h4>
                  <div className="flex flex-wrap gap-3">
                    {category.courses.slice(0, 6).map((course, index) => (
                      <motion.span 
                        key={index}
                        initial={{ scale: 0.9, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ delay: 0.1 * index }}
                        className="px-4 py-2 bg-gray-50 text-gray-800 text-sm rounded-lg border border-gray-200 hover:bg-white hover:shadow-sm transition-all"
                      >
                        {course}
                      </motion.span>
                    ))}
                  </div>
                </div>
                
                <motion.button
                  whileHover={{ x: 5 }}
                  className="mt-8 flex items-center font-medium group"
                >
                  <span className={`bg-gradient-to-r ${category.color} bg-clip-text text-transparent`}>
                    Explore all {category.title.toLowerCase()}
                  </span>
                  <ArrowRight className={`ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform bg-gradient-to-r ${category.color} text-transparent bg-clip-text`} />
                </motion.button>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="relative px-8 py-4 bg-gradient-to-r from-red-600 to-red-700 text-white rounded-xl text-lg font-semibold overflow-hidden group shadow-lg hover:shadow-xl transition-all"
          >
            <span className="relative z-10 flex items-center justify-center gap-2">
              Browse All Courses
              <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </span>
            <span className="absolute inset-0 bg-gradient-to-r from-red-700 to-red-800 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
            
            {/* Button shine effect */}
            {isMounted && (
              <span className="absolute top-0 left-0 w-1/3 h-full bg-white/30 -skew-x-12 -translate-x-full group-hover:translate-x-[300%] transition-transform duration-700"></span>
            )}
          </motion.button>
          
          <motion.p 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            viewport={{ once: true }}
            className="mt-6 text-gray-500"
          >
            Not sure which course is right for you?{' '}
            <a href="#" className="text-red-600 hover:underline font-medium inline-flex items-center gap-1">
              Get personalized recommendations
              <ArrowRight className="w-4 h-4 mt-0.5" />
            </a>
          </motion.p>
        </motion.div>
      </div>

      <style jsx global>{`
        @keyframes shine {
          0% { transform: translateX(-100%) rotate(15deg); }
          20% { transform: translateX(100%) rotate(15deg); }
          100% { transform: translateX(100%) rotate(15deg); }
        }
      `}</style>
    </section>
  );
}