'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function ImageUploadForm({ onSuccess }) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [isUploading, setIsUploading] = useState(false);
  const [message, setMessage] = useState({ text: '', type: '' });
  const router = useRouter();

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    setFile(selectedFile);
    
    if (selectedFile) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result);
      };
      reader.readAsDataURL(selectedFile);
    } else {
      setPreview(null);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!file) {
      setMessage({ text: 'Please select an image', type: 'error' });
      return;
    }

    setIsUploading(true);
    setMessage({ text: '', type: '' });

    const formData = new FormData();
    formData.append('title', title);
    formData.append('description', description);
    formData.append('image', file);

    try {
      const response = await fetch('/api/images', {
        method: 'POST',
        body: formData,
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Image upload failed');
      }

      setMessage({ 
        text: 'Image uploaded successfully!', 
        type: 'success' 
      });
      onSuccess();

      // Reset form after successful upload
      setTimeout(() => {
        setTitle('');
        setDescription('');
        setFile(null);
        setPreview(null);
        router.refresh();
      }, 1500);
    } catch (error) {
      setMessage({ 
        text: error.message || 'Error uploading image', 
        type: 'error' 
      });
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {message.text && (
        <div className={`p-3 rounded-lg ${message.type === 'success' 
          ? 'bg-emerald-50 text-emerald-800' 
          : 'bg-rose-50 text-rose-800'}`}>
          {message.text}
        </div>
      )}

      {/* Image Preview */}
      {preview ? (
        <div className="relative pb-[75%] rounded-lg overflow-hidden border border-gray-200">
          <img 
            src={preview} 
            alt="Preview" 
            className="absolute h-full w-full object-cover"
          />
        </div>
      ) : (
        <div className="flex items-center justify-center w-full">
          <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100 transition-colors">
            <div className="flex flex-col items-center justify-center pt-5 pb-6">
              <svg className="w-8 h-8 mb-4 text-gray-500" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 16">
                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"/>
              </svg>
              <p className="mb-2 text-sm text-gray-500">Click to upload</p>
              <p className="text-xs text-gray-500">PNG, JPG, GIF (MAX. 5MB)</p>
            </div>
            <input 
              type="file" 
              onChange={handleFileChange} 
              className="hidden" 
              accept="image/*" 
              required 
            />
          </label>
        </div>
      )}

      {/* Title Input */}
      <div>
        <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">Title</label>
        <input
          type="text"
          id="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          required
        />
      </div>

      {/* Description Input */}
      <div>
        <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">Description</label>
        <textarea
          id="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          rows="3"
        />
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        disabled={isUploading}
        className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:bg-blue-400 disabled:cursor-not-allowed"
      >
        {isUploading ? (
          <>
            <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            Uploading...
          </>
        ) : 'Upload Image'}
      </button>
    </form>
  );
}