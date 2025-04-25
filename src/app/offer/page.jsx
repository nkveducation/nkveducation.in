'use client'
import Breadcrumbs from '@/components/Breadcrumbs';
import { motion } from 'framer-motion';
import { Suspense } from 'react';


export default function Offer() {
    return (
      <Suspense fallback={<div>Loading offers...</div>}>
        <OfferContent />
      </Suspense>
    );
  }

const OfferList = [
    {
        id: 1,
        title: '20 Registrations',
        description: 'Android Mobile of worth ₹15,000/- or Cash',
        img: "/assets/images/mobile.jpg",
    },
    {
        id: 2,
        title: '100 Registrations',
        description: 'Laptop of worth ₹40,000/- or Cash',
        img: "/assets/images/laptop.jpg",
    },
    {
        id: 3,
        title: '200 Registrations',
        description: 'Jupiter Scooty of worth ₹80,000/- or Cash',
        img: "/assets/images/scooty.jpg",
    },
    {
        id: 4,
        title: '500 Registrations',
        description: 'Hyundai i10 Car',
        img: "/assets/images/car.jpg",
    }
];

// export default function Offer() {


    

//     return (
//         <main className="bg-white min-h-screen m-0 p-0 mt-[80px] min-w-full">
//             {/* Navigation Header */}
//             <div
//                 className="px-6 py-8 flex justify-between items-center"
//                 style={{
//                     backgroundImage: 'url("/images/red-dot-button-bg.jpeg")',
//                     backgroundSize: 'cover',
//                     backgroundRepeat: 'no-repeat',
//                     backgroundPosition: 'center',
//                 }}
//             >
//                 <h1 className="text-3xl text-white font-bold">Exciting Offers</h1>
//                 <Suspense fallback={<div>Loading breadcrumbs...</div>}>
//                     <Breadcrumbs />
//                 </Suspense>
//             </div>

//             {/* Offers Section */}
//             <div className="p-6 md:p-10">
//                 <h2 className="text-4xl font-bold mb-2 text-center">Get Rewarded</h2>
//                 <p className="text-center text-gray-400 mb-10">Complete registrations and win amazing rewards!</p>

//                 <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
//                     {OfferList.map(offer => (
//                         <motion.div
//                             key={offer.id}
//                             whileHover={{ scale: 1.05 }}
//                             whileTap={{ scale: 0.98 }}
//                             className="bg-white text-black rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300"
//                         >
//                             <img
//                                 src={offer.img}
//                                 alt={offer.title}
//                                 className="w-full h-48 object-contain"
//                             />
//                             <div className="p-4">
//                                 <h2 className="text-xl font-bold">{offer.title}</h2>
//                                 <p className="mt-2 text-gray-700">{offer.description}</p>
//                             </div>
//                         </motion.div>
//                     ))}
//                 </div>
//             </div>
//         </main>
//     );
// }

export  function OfferContent() {
    return (
      <main className="bg-white min-h-screen m-0 p-0 mt-[80px] min-w-full">
        <div className="px-6 py-8 flex justify-between items-center" style={{ backgroundImage: 'url("/images/red-dot-button-bg.jpeg")', backgroundSize: 'cover', backgroundRepeat: 'no-repeat', backgroundPosition: 'center' }}>
          <h1 className="text-3xl text-white font-bold">Exciting Offers</h1>
          <Breadcrumbs />
        </div>
        <div className="p-6 md:p-10">
          <h2 className="text-4xl font-bold mb-2 text-center">Get Rewarded</h2>
          <p className="text-center text-gray-400 mb-10">Complete registrations and win amazing rewards!</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {OfferList.map(offer => (
              <motion.div key={offer.id} whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.98 }} className="bg-white text-black rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300">
                <img src={offer.img} alt={offer.title} className="w-full h-48 object-contain" />
                <div className="p-4">
                  <h2 className="text-xl font-bold">{offer.title}</h2>
                  <p className="mt-2 text-gray-700">{offer.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </main>
    );
  }