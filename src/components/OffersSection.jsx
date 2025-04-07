export default function OffersSection() {
  return (
    <section className="py-12 px-4 md:px-8">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-8">
          <h2 className="text-2xl md:text-3xl font-semibold mb-2">
            Latest Offers
          </h2>
          <p className="text-gray-600">
            These offers are applicable for that opens given number of Registrations
          </p>
        </div>
        
        <div className="relative">
          <div className="flex overflow-x-auto pb-6 -mx-4 px-4 scrollbar-hide">
            <div className="flex space-x-6">
              {[1, 2, 3, 4].map((item) => (
                <div 
                  key={item} 
                  className="flex-shrink-0 w-72 sm:w-80 bg-white rounded-lg shadow-md overflow-hidden"
                >
                  <div className="h-48 bg-gray-200 overflow-hidden">
                    <img 
                      src="/assets/images/mobile.jpg" 
                      alt="Offer" 
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="p-4">
                    <h3 className="font-semibold text-lg mb-1">
                      20 Registrations
                    </h3>
                    <p className="text-gray-600 text-sm">
                      Android Mobile of worth ₹15,000/- or Cash
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}