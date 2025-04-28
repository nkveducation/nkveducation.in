"use client"

import Breadcrumbs from "@/components/Breadcrumbs"
import { Suspense } from "react"
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function GalleryPage() {
    return (
        <Suspense fallback={<div>Loading gallery...</div>}>
            <Gallery />
        </Suspense>
    )
}

function Gallery() {
    return (
        <main className="m-0 p-0 min-w-full mt-[80px] overflow-x-hidden bg-white">
            <div className="text-white px-6 py-8 flex justify-between items-center" style={{ background: 'linear-gradient(to right, #dc2626, #b91c1c)' }}>
                <h1 className="text-3xl font-bold">Gallery</h1>
                <Breadcrumbs />
            </div>
            <section className="bg-white py-12 px-4 md:px-12">
                <div className="max-w-7xl mx-auto">
                   <ImageList />
                </div>
            </section>
        </main>
    )
}

function ImageList() {
  const [images, setImages] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [message, setMessage] = useState({ text: '', type: '' });
  const router = useRouter();

  const fetchImages = async () => {
    try {
      const response = await fetch('/api/images');
      const data = await response.json();
      if (data.success) {
        setImages(data.data);
      }
    } catch (error) {
      setMessage({ text: 'Error fetching images', type: 'error' });
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchImages();
  }, []);

  const handleImageClick = (id) => {
    router.push(`/gallery/${id}`);
  };

  return (
    <div className="max-w-7xl mx-auto">
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
            <div className="rounded-full bg-red-500 h-12 w-12"></div>
          </div>
        </div>
      ) : images.length === 0 ? (
        <div className="bg-white rounded-xl shadow-sm p-8 text-center">
          <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
          <h3 className="mt-2 text-lg font-medium text-gray-900">No images yet</h3>
          <p className="mt-1 text-gray-500">Upload your first image to get started</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {images.map((image) => (
            <div 
              key={image._id} 
              className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300 cursor-pointer transform hover:-translate-y-1 transition-transform"
              onClick={() => handleImageClick(image._id)}
            >
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
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}