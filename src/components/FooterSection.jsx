import { motion } from "framer-motion";

export default function FooterSection() {
  return (
    <footer className="relative overflow-hidden bg-gradient-to-b from-red-700 to-red-900 text-white">
      {/* Wave Background Effect */}
      <div className="absolute bottom-0 left-0 w-full h-20 md:h-32 z-0">
        <svg
          viewBox="0 0 1200 120"
          preserveAspectRatio="none"
          className="w-full h-full"
        >
          <path
            d="M0,0V46.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5C438.64,32.43,512.34,53.67,583,72.05c69.27,18,138.3,24.88,209.4,13.08,36.15-6,69.85-17.84,104.45-29.34C989.49,25,1113-14.29,1200,52.47V0Z"
            opacity=".25"
            className="fill-red-800"
          ></path>
          <path
            d="M0,0V15.81C13,36.92,27.64,56.86,47.69,72.05,99.41,111.27,165,111,224.58,91.58c31.15-10.15,60.09-26.07,89.67-39.8,40.92-19,84.73-46,130.83-49.67,36.26-2.85,70.9,9.42,98.6,31.56,31.77,25.39,62.32,62,103.63,73,40.44,10.79,81.35-6.69,119.13-24.28s75.16-39,116.92-43.05c59.73-5.85,113.28,22.88,168.9,38.84,30.2,8.66,59,6.17,87.09-7.5,22.43-10.89,48-26.93,60.65-49.24V0Z"
            opacity=".5"
            className="fill-red-800"
          ></path>
          <path
            d="M0,0V5.63C149.93,59,314.09,71.32,475.83,42.57c43-7.64,84.23-20.12,127.61-26.46,59-8.63,112.48,12.24,165.56,35.4C827.93,77.22,886,95.24,951.2,90c86.53-7,172.46-45.71,248.8-84.81V0Z"
            className="fill-red-800"
          ></path>
        </svg>
      </div>

      {/* Content */}
      <div className="relative max-w-7xl mx-auto px-4 md:px-8 py-16 z-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          {/* Company Info */}
          <div className="md:col-span-2">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <h2 className="text-4xl font-bold mb-6">
                <span className="text-white">NKV</span>
                <span className="text-white opacity-90">Education</span>
              </h2>
              <p className="mb-6 text-red-100 text-lg leading-relaxed">
                Our Professional Course focuses on specialized areas of study, providing in-depth knowledge and practical skills.
              </p>
              <div className="flex space-x-4">
                <motion.a
                  href="https://www.facebook.com/nkveducation?mibextid=ZbWKwL"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-12 h-12 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full flex items-center justify-center hover:bg-white/20 transition-all"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <img
                    src={`/assets/svg/facebook-svgrepo-com.svg`}
                    alt="Facebook"
                    className="w-6 h-6 filter brightness-0 invert"
                  />
                </motion.a>
                <motion.a
                  href="https://instagram.com/nkveducation_?igshid=MzNlNGNkZWQ4Mg=="
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-12 h-12 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full flex items-center justify-center hover:bg-white/20 transition-all"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <img
                    src={`/assets/svg/instagram-svgrepo-com.svg`}
                    alt="Instagram"
                    className="w-6 h-6 filter brightness-0 invert"
                  />
                </motion.a>
                <motion.a
                  href="https://youtube.com/@navodayaeducation"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-12 h-12 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full flex items-center justify-center hover:bg-white/20 transition-all"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <img
                    src={`/assets/svg/youtube.svg`}
                    alt="YouTube"
                    className="w-6 h-6 filter brightness-0 invert"
                  />
                </motion.a>
              </div>
            </motion.div>
          </div>

          {/* Quick Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <h3 className="text-xl font-semibold mb-6 text-white">Quick Links</h3>
            <ul className="space-y-4">
              {[
                { name: 'Home', link: '/' },
                { name: 'About Us', link: '/about' },
                { name: 'Our Courses', link: '/courses' },
                { name: 'Gallery', link: '/gallery' },
                { name: 'Our Team', link: '/team' },
                { name: 'Contact Us', link: '/contact' },
              ].map(({ name, link }) => (
                <motion.li
                  key={name}
                  whileHover={{ x: 5 }}
                  transition={{ type: 'spring', stiffness: 300 }}
                >
                  <a
                    href={link}
                    className="text-red-100 hover:text-white transition flex items-center group text-lg"
                  >
                    <span className="w-2 h-2 bg-white rounded-full mr-3 group-hover:mr-4 transition-all"></span>
                    {name}
                  </a>
                </motion.li>
              ))}
            </ul>
          </motion.div>


          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <h3 className="text-xl font-semibold mb-6 text-white">Contact Us</h3>
            <ul className="space-y-4 text-red-100">
              <motion.li
                className="flex items-start hover:text-white transition"
                whileHover={{ x: 5 }}
              >
                <svg className="w-6 h-6 text-white mr-3 mt-1 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
                </svg>
                <span className="text-lg">nkveducation@gmail.com</span>
              </motion.li>
              <motion.li
                className="flex items-start hover:text-white transition"
                whileHover={{ x: 5 }}
              >
                <svg className="w-6 h-6 text-white mr-3 mt-1 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"></path>
                </svg>
                <span className="text-lg">+91 9557273142</span>
              </motion.li>
              <motion.li
                className="flex items-start hover:text-white transition mt-8"
                whileHover={{ x: 5 }}
              >
                <svg className="w-6 h-6 text-white mr-3 mt-1 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path>
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path>
                </svg>
                <span className="text-lg">123 Education St, Learning City</span>
              </motion.li>
            </ul>
          </motion.div>
        </div>
      </div>

      {/* Copyright Section */}
      <motion.div
        className="relative bg-red-900 py-6 text-center text-white text-sm z-10"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.3 }}
      >
        <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-white/50 to-transparent"></div>
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <p className="text-lg">
            Copyright © {new Date().getFullYear()} NKV Education. All rights reserved.
          </p>
          <div className="mt-4 flex justify-center space-x-6">
            <a href="#" className="hover:text-red-200 transition">Privacy Policy</a>
            <a href="#" className="hover:text-red-200 transition">Terms of Service</a>
            <a href="#" className="hover:text-red-200 transition">Sitemap</a>
          </div>
        </div>
      </motion.div>
    </footer>
  );
}