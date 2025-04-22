import { motion} from "framer-motion";

export default function FooterSection() {
  return (
    <footer className="relative overflow-hidden bg-red-700 text-white">
      {/* Background Pattern Effect */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0 bg-[url('/images/dot-pattern.png')] bg-[length:120px_120px]"></div>
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-red-700"></div>
      </div>

      <div className="relative max-w-6xl mx-auto px-4 md:px-8 py-12 z-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="md:col-span-2">
            <h2 className="text-3xl font-bold mb-4">
              <span className="text-white">NKV</span>
              <span className="text-white opacity-90">Education</span>
            </h2>
            <p className="mb-6 text-red-100">
              Our Professional Course focuses on specialized areas of study, providing in-depth knowledge and practical skills to excel in specific industries.
            </p>
            <div className="flex space-x-4">
              {['facebook', 'twitter', 'instagram', 'linkedin'].map((social) => (
                <a 
                  key={social}
                  href="#" 
                  className="w-10 h-10 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full flex items-center justify-center hover:bg-white/20 transition-all hover:scale-110"
                >
                  <img 
                    src={`/assets/svg/${social}-svgrepo-com.svg`} 
                    alt={social} 
                    className="w-5 h-5 filter brightness-0 invert"
                  />
                </a>
              ))}
            </div>
          </div>
          
          {/* Quick Links */}
          <div>
            <h3 className="text-xl font-semibold mb-4 text-white">Quick Links</h3>
            <ul className="space-y-3">
              {['Home', 'About Us', 'Our Courses', 'Gallery', 'Our Team', 'Contact Us'].map((item) => (
                <motion.li 
                  key={item}
                  whileHover={{ x: 5 }}
                  transition={{ type: 'spring', stiffness: 300 }}
                >
                  <a 
                    href="#" 
                    className="text-red-100 hover:text-white transition flex items-center group"
                  >
                    <span className="w-2 h-2 bg-white rounded-full mr-2 group-hover:mr-3 transition-all"></span>
                    {item}
                  </a>
                </motion.li>
              ))}
            </ul>
          </div>
          
          {/* Contact Info */}
          <div>
            <h3 className="text-xl font-semibold mb-4 text-white">Contact Us</h3>
            <ul className="space-y-3 text-red-100">
              <li className="flex items-start hover:text-white transition">
                <svg className="w-5 h-5 text-white mr-2 mt-1 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
                </svg>
                info@nkveducation.in
              </li>
              <li className="flex items-start hover:text-white transition">
                <svg className="w-5 h-5 text-white mr-2 mt-1 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"></path>
                </svg>
                +91 6397 12XXXX
              </li>
              <li className="flex items-start hover:text-white transition">
                <svg className="w-5 h-5 text-white mr-2 mt-1 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path>
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path>
                </svg>
                123 Education Street, Learning City
              </li>
            </ul>
          </div>
        </div>
      </div>
      
      {/* Copyright with animated border */}
      <div className="relative bg-red-700 py-4 text-center text-white text-sm">
        <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-white/50 to-transparent"></div>
        <p className="animate-pulse">Copyright © {new Date().getFullYear()} NKV Education. All rights reserved.</p>
      </div>
    </footer>
  );
}