'use client';

import { useState, useEffect } from 'react';
import ImageUploadForm from './Form';

export default function ImageList() {
  const [offers, setOffers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [message, setMessage] = useState({ text: '', type: '' });

  const fetchOffers = async () => {
    try {
      const response = await fetch('/api/offers');
      const data = await response.json();
      if (data.success) {
        setOffers(data.data);
      }
    } catch (error) {
      setMessage({ text: 'Error fetching offers', type: 'error' });
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchOffers();
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this image?')) return;

    try {
      const response = await fetch(`/api/offers/${id}`, {
        method: 'DELETE',
      });
      const data = await response.json();

      if (data.success) {
        setMessage({ text: 'Image deleted successfully', type: 'success' });
        fetchOffers();
      } else {
        setMessage({ text: data.message || 'Delete failed', type: 'error' });
      }
    } catch (error) {
      setMessage({ text: 'Error deleting image', type: 'error' });
    }
  };

  const handleSuccess = () => {
    setMessage({ text: 'Image operation successful', type: 'success' });
    fetchOffers();
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex flex-col md:flex-row gap-8">
        {/* Upload Section */}
        <div className="md:w-1/3 lg:w-1/4">
          <div className="bg-white rounded-xl shadow-md p-6 sticky top-8">
            <h2 className="text-xl font-bold text-gray-800 mb-4">Upload New Image</h2>
            <ImageUploadForm onSuccess={handleSuccess} />
          </div>
        </div>

        {/* Gallery Section */}
        <div className="md:w-2/3 lg:w-3/4">
          <div className="mb-6">
            <h1 className="text-3xl font-bold text-gray-900">Image Gallery</h1>
            {message.text && (
              <div className={`mt-4 p-3 rounded-lg ${message.type === 'success' 
                ? 'bg-emerald-50 text-emerald-800' 
                : 'bg-rose-50 text-rose-800'}`}>
                {message.text}
              </div>
            )}
          </div>

          {isLoading ? (
            <div className="grid place-items-center h-64">
              <div className="animate-pulse flex space-x-4">
                <div className="rounded-full bg-gray-200 h-12 w-12"></div>
              </div>
            </div>
          ) : offers.length === 0 ? (
            <div className="bg-white rounded-xl shadow-sm p-8 text-center">
              <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              <h3 className="mt-2 text-lg font-medium text-gray-900">No offers yet</h3>
              <p className="mt-1 text-gray-500">Upload your first image to get started</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {offers.map((image) => (
                <div key={image._id} className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
                  <div className="relative pb-[75%]">
                    <img 
                      src={image.imageUrl} 
                      alt={image.title} 
                      className="absolute h-full w-full object-cover"
                      loading="lazy"
                    />
                  </div>
                  <div className="p-4">
                    <h3 className="font-semibold text-lg text-gray-900 mb-1">{image.title}</h3>
                    <p className="text-gray-600 text-sm mb-3 line-clamp-2">{image.description}</p>
                    <div className="flex justify-end">
                      <button
                        onClick={() => handleDelete(image._id)}
                        className="text-rose-600 hover:text-rose-800 text-sm font-medium flex items-center"
                      >
                        <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                        </svg>
                        Delete
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}