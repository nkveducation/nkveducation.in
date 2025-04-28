"use client"

import Breadcrumbs from "@/components/Breadcrumbs"
import { Suspense, use } from "react"
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function GalleryDetailPage({ params }) {
  // Unwrap the params promise
  const unwrappedParams = use(params);
  
  return (
    <Suspense fallback={<div>Loading image details...</div>}>
      <GalleryDetail id={unwrappedParams.id} />
    </Suspense>
  )
}

function GalleryDetail({ id }) {
  const [image, setImage] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const router = useRouter();

  useEffect(() => {
    const fetchImage = async () => {
      try {
        setIsLoading(true);
        setError(null);
        const response = await fetch(`/api/images/${id}`);
        
        if (!response.ok) {
          throw new Error('Failed to fetch image');
        }
        
        const data = await response.json();
        
        if (data.success) {
          setImage(data.data);
        } else {
          throw new Error(data.message || 'Image not found');
        }
      } catch (error) {
        setError(error.message);
        router.push('/gallery');
      } finally {
        setIsLoading(false);
      }
    };

    if (id) {
      fetchImage();
    } else {
      router.push('/gallery');
    }
  }, [id, router]);

  if (isLoading) {
    return (
      <div className="grid place-items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-red-600"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-white rounded-xl p-6 max-w-md w-full mx-auto mt-8">
        <p className="text-red-500 mb-4">{error}</p>
        <button 
          onClick={() => router.push('/gallery')}
          className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
        >
          Back to Gallery
        </button>
      </div>
    );
  }

  if (!image) return null;

  return (
    <main className="m-0 p-0 min-w-full mt-[80px] overflow-x-hidden bg-white">
      <div className="text-white px-6 py-8 flex justify-between items-center" style={{ background: 'linear-gradient(to right, #dc2626, #b91c1c)' }}>
        <h1 className="text-3xl font-bold">{image.title}</h1>
        <Breadcrumbs />
      </div>
      
      <section className="bg-white py-12 px-4 md:px-12">
        <div className="max-w-7xl mx-auto">
          <div className="mb-8">
            <button 
              onClick={() => router.push('/gallery')}
              className="flex items-center text-gray-600 hover:text-gray-900 mb-6"
            >
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              Back to Gallery
            </button>
            
            <div className="bg-white rounded-xl shadow-md overflow-hidden">
              <div className="relative pb-[56.25%]">
                <img 
                  src={image.imageUrl} 
                  alt={image.title} 
                  className="absolute h-full w-full object-contain"
                  loading="lazy"
                />
              </div>
              
              <div className="p-6">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">{image.title}</h2>
                <div className="prose max-w-none">
                  <p className="text-gray-600">{image.description}</p>
                </div>
                
                <div className="mt-6 pt-4 border-t">
                  <p className="text-sm text-gray-500">
                    Uploaded on: {new Date(image.createdAt).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric'
                    })}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}