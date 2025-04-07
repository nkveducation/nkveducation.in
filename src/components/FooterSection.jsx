export default function FooterSection() {
    return (
      <footer className="bg-zinc-900 text-white">
        <div className="max-w-6xl mx-auto px-4 md:px-8 py-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="md:col-span-2">
              <h2 className="text-3xl font-bold mb-4">
                NKV<span className="text-red-600">Education</span>
              </h2>
              <p className="mb-6 text-gray-300">
                Our Professional Course focuses on specialized areas of study, providing in-depth knowledge and practical skills to excel in specific industries.
              </p>
              <button className="px-6 py-2 bg-red-600 rounded-md hover:bg-red-700 transition">
                READ MORE 〉
              </button>
            </div>
            
            <div>
              <h3 className="text-xl font-semibold mb-4">Quick Menu</h3>
              <ul className="space-y-2">
                {['Home', 'About Us', 'Our Course', 'Our Gallery', 'Our Team', 'Contact Us'].map((item) => (
                  <li key={item} className="hover:text-red-400 transition cursor-pointer">
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            
            <div>
              <h3 className="text-xl font-semibold mb-4">Important Links</h3>
              <ul className="space-y-2">
                {['Offers', 'Our plan', 'Join us', 'Register', 'Our institute', 'Results'].map((item) => (
                  <li key={item} className="hover:text-red-400 transition cursor-pointer">
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
          
          <div className="mt-12 pt-8 border-t border-gray-700">
            <div className="flex flex-col md:flex-row justify-between items-center gap-6">
              <div>
                <h3 className="text-lg font-semibold mb-3">Follow Us:</h3>
                <div className="flex space-x-4">
                  {[1, 2, 3].map((item) => (
                    <a 
                      key={item} 
                      href="#" 
                      className="w-10 h-10 bg-red-600 rounded-full flex items-center justify-center hover:bg-red-700 transition"
                    >
                      <img 
                        src="/assets/svg/twitter-svgrepo-com.svg" 
                        alt="Social Icon" 
                        className="w-5 h-5"
                      />
                    </a>
                  ))}
                </div>
              </div>
              
              <div className="w-full md:w-auto">
                <h3 className="text-lg font-semibold mb-3">Newsletter</h3>
                <div className="flex gap-1">
                  <input 
                    type="email" 
                    placeholder="Your Email" 
                    className="px-4 py-2 rounded-l text-gray-900 w-full bg-white rounded-md border-gray-300 focus:outline-none focus:ring-2 focus:ring-red-600"
                  />
                  <button className="px-4 py-2 rounded-lg bg-red-600 rounded-r hover:bg-red-700 transition">
                    SUBMIT
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <div className="bg-red-700 py-4 text-center text-sm">
          <p>Copyright © {new Date().getFullYear()} NKV Education. All rights reserved.</p>
        </div>
      </footer>
    );
  }