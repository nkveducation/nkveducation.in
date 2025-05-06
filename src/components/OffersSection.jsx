// import Link from 'next/link';
// import { useEffect, useState } from 'react';

// export default function OffersSection() {
//   const [offers, setOffers] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     const fetchOffers = async () => {
//       try {
//         const response = await fetch('/api/offers');
//         if (!response.ok) {
//           throw new Error('Failed to fetch offers');
//         }
//         const data = await response.json();
//         setOffers(data.data);
//         console.log(data.data);
//       } catch (err) {
//         setError(err.message);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchOffers();
//   }, []);

//   // Placeholder image for when none is provided
//   const getImageUrl = (url) => {
//     return url || 'https://images.unsplash.com/photo-1556740738-b6a63e27c4df?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&h=300&q=80';
//   };

//   if (loading) {
//     return (
//       <section className="py-16 px-4 md:px-8 bg-gradient-to-br from-red-50 to-red-100">
//         <div className="max-w-7xl mx-auto text-center">
//           <div className="inline-block animate-pulse bg-gray-200 h-8 w-48 rounded"></div>
//         </div>
//       </section>
//     );
//   }

//   if (error) {
//     return (
//       <section className="py-16 px-4 md:px-8 bg-gradient-to-br from-gray-50 to-gray-100">
//         <div className="max-w-7xl mx-auto text-center text-red-500">
//           <p>Error loading offers: {error}</p>
//         </div>
//       </section>
//     );
//   }

//   if (!offers.length) {
//     return (
//       <section className="py-16 px-4 md:px-8 bg-gradient-to-br from-gray-50 to-gray-100">
//         <div className="max-w-7xl mx-auto text-center">
//           <p className="text-gray-500">No offers available at the moment. Check back later!</p>
//         </div>
//       </section>
//     );
//   }

//   return (
//     <section className="py-16 px-4 md:px-8 bg-gradient-to-br from-gray-50 to-gray-100">
//       <div className="max-w-7xl mx-auto">
//         <div className="text-center mb-16">
//           <h2 className="text-4xl md:text-5xl font-bold mb-4 text-gray-900 font-serif">
//             Exclusive Offers
//           </h2>
//           <div className="w-24 h-1 bg-blue-500 mx-auto mb-6"></div>
//           <p className="text-gray-600 max-w-2xl mx-auto text-lg">
//             Limited-time deals crafted just for you
//           </p>
//         </div>

//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
//           {offers.map((offer, index) => (
//             <div
//               key={index}
//               className="group relative bg-white rounded-2xl shadow-md overflow-hidden transition-all duration-500 hover:shadow-xl"
//             >
//               <div className="h-60 relative overflow-hidden">
//                 <img
//                   src={getImageUrl(offer.imageUrl)}
//                   alt={offer.title}
//                   className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
//                   loading="lazy"
//                 />
//                 <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
//                 <div className="absolute top-4 right-4">
//                   <span className="bg-amber-400 text-amber-900 text-xs font-bold px-3 py-1 rounded-full">
//                     Limited
//                   </span>
//                 </div>
//               </div>

//               <div className="p-6">
//                 <h3 className="font-bold text-xl mb-3 text-gray-800 group-hover:text-blue-600 transition-colors">
//                   {offer.title}
//                 </h3>
//                 <p className="text-gray-600 mb-5">
//                   {offer.description}
//                 </p>
//                 <div className="flex justify-between items-center">

//                   <span className="text-xs text-gray-500">Offer ends soon</span>
//                 </div>
//               </div>
//             </div>
//           ))}
//         </div>
//         <div className="mt-12 text-center">
//           <Link href="/offer" >
//             <button className="inline-flex items-center gap-2 px-8 py-3 bg-white border border-red-500 text-red-500 font-semibold rounded-full hover:bg-red-500 hover:text-white transition-all shadow hover:shadow-lg cursor-pointer">
//               View All Offers
//               <svg
//                 className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1"
//                 fill="none"
//                 stroke="currentColor"
//                 strokeWidth="2"
//                 viewBox="0 0 24 24"
//               >
//                 <path
//                   strokeLinecap="round"
//                   strokeLinejoin="round"
//                   d="M17 8l4 4m0 0l-4 4m4-4H3"
//                 />
//               </svg>
//             </button>
//           </Link>
//         </div>

//       </div>
//     </section >
//   );
// }

"use client";

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';

export default function OffersSection() {
  const [offers, setOffers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const fetchOffers = async () => {
      try {
        const response = await fetch('/api/offers');
        if (!response.ok) {
          throw new Error('Failed to fetch offers');
        }
        const data = await response.json();
        setOffers(data.data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchOffers();
  }, []);

  // Auto-rotate slides
  useEffect(() => {
    if (offers.length > 0) {
      const interval = setInterval(() => {
        setCurrentSlide((prev) => (prev === offers.length - 1 ? 0 : prev + 1));
      }, 5000);
      return () => clearInterval(interval);
    }
  }, [offers.length]);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev === offers.length - 1 ? 0 : prev + 1));
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev === 0 ? offers.length - 1 : prev - 1));
  };

  const goToSlide = (index) => {
    setCurrentSlide(index);
  };

  const getImageUrl = (url) => {
    return url || 'https://images.unsplash.com/photo-1556740738-b6a63e27c4df?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&h=300&q=80';
  };

  if (loading) {
    return (
      <section className="py-16 px-4 md:px-8 bg-gradient-to-br from-red-50 to-red-100">
        <div className="max-w-7xl mx-auto text-center">
          <div className="inline-block animate-pulse bg-gray-200 h-8 w-48 rounded"></div>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="py-16 px-4 md:px-8 bg-gradient-to-br from-gray-50 to-gray-100">
        <div className="max-w-7xl mx-auto text-center text-red-500">
          <p>Error loading offers: {error}</p>
        </div>
      </section>
    );
  }

  if (!offers.length) {
    return (
      <section className="py-16 px-4 md:px-8 bg-gradient-to-br from-gray-50 to-gray-100">
        <div className="max-w-7xl mx-auto text-center">
          <p className="text-gray-500">No offers available at the moment. Check back later!</p>
        </div>
      </section>
    );
  }

  return (
    <section className="py-16 px-4 md:px-8 bg-gradient-to-br from-gray-50 to-gray-100">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-gray-900 font-serif">
            Exclusive Offers
          </h2>
          <div className="w-24 h-1 bg-blue-500 mx-auto mb-6"></div>
          <p className="text-gray-600 max-w-2xl mx-auto text-lg">
            Limited-time deals crafted just for you
          </p>
        </div>

        {/* Slider Container */}
        <div className="relative overflow-hidden">
          {/* Slider Track */}
          <div 
            className="flex transition-transform duration-500 ease-in-out"
            style={{ transform: `translateX(-${currentSlide * 100}%)` }}
          >
            {offers.map((offer, index) => (
              <div 
                key={index}
                className="w-full flex-shrink-0 px-4"
              >
                <div className="group relative bg-white rounded-2xl shadow-md overflow-hidden transition-all duration-500 hover:shadow-xl">
                  <div className="h-80 md:h-96 relative overflow-hidden">
                    <img
                      src={getImageUrl(offer.imageUrl)}
                      alt={offer.title}
                      className="w-full h-full sm:object-contain object-cover transition-transform duration-700 group-hover:scale-105"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                    <div className="absolute top-4 right-4">
                      <span className="bg-amber-400 text-amber-900 text-xs font-bold px-3 py-1 rounded-full">
                        Limited
                      </span>
                    </div>
                  </div>

                  <div className="p-6">
                    <h3 className="font-bold text-xl mb-3 text-gray-800 group-hover:text-blue-600 transition-colors">
                      {offer.title}
                    </h3>
                    <p className="text-gray-600 mb-5">
                      {offer.description}
                    </p>
                    <div className="flex justify-between items-center">
                      <span className="text-xs text-gray-500">Offer ends soon</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Navigation Arrows */}
          <button
            onClick={prevSlide}
            className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white/80 hover:bg-white text-gray-800 p-2 rounded-full shadow-md ml-2 transition-all hover:scale-110"
            aria-label="Previous slide"
          >
            <FiChevronLeft className="w-6 h-6" />
          </button>
          <button
            onClick={nextSlide}
            className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white/80 hover:bg-white text-gray-800 p-2 rounded-full shadow-md mr-2 transition-all hover:scale-110"
            aria-label="Next slide"
          >
            <FiChevronRight className="w-6 h-6" />
          </button>
        </div>

        {/* Dots Navigation */}
        <div className="flex justify-center mt-8 space-x-2">
          {offers.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`w-3 h-3 rounded-full transition-all ${currentSlide === index ? 'bg-blue-600 w-6' : 'bg-gray-300'}`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>

        <div className="mt-12 text-center">
          <Link href="/offer">
            <button className="inline-flex items-center gap-2 px-8 py-3 bg-white border border-red-500 text-red-500 font-semibold rounded-full hover:bg-red-500 hover:text-white transition-all shadow hover:shadow-lg cursor-pointer group">
              View All Offers
              <FiChevronRight className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" />
            </button>
          </Link>
        </div>
      </div>
    </section>
  );
}