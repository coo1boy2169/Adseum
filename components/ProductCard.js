'use client';

import { useState } from 'react';
import { translations } from '@/lib/translations';
import AddButton from './AddButton';

export default function ProductCard({ product, lang }) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const t = translations[lang];

  const nextImage = () => {
    setCurrentImageIndex((prev) => 
      prev === product.images.length - 1 ? 0 : prev + 1
    );
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => 
      prev === 0 ? product.images.length - 1 : prev - 1
    );
  };

  

  return (
    <div className="bg-white rounded-2xl shadow-xl overflow-hidden card-hover pride-border">
      {/* Image Carousel */}
      <div className="relative h-64 bg-gray-100 group">
        <img 
          src={product.images[currentImageIndex]} 
          alt={product.name[lang]}
          className="w-full h-full object-contain"
          onError={(e) => {
            e.target.src = 'https://via.placeholder.com/400x300/8B5CF6/FFFFFF?text=Product+Image';
          }}
        />
        
        {/* Image Navigation */}
        {product.images.length > 1 && (
          <>
            <button 
              onClick={prevImage}
              className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-white/80 hover:bg-white rounded-full p-2 opacity-0 group-hover:opacity-100 transition-opacity"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7"/>
              </svg>
            </button>
            <button 
              onClick={nextImage}
              className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-white/80 hover:bg-white rounded-full p-2 opacity-0 group-hover:opacity-100 transition-opacity"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"/>
              </svg>
            </button>

            {/* Image Dots */}
            <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 flex space-x-2">
              {product.images.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentImageIndex(index)}
                  className={`w-2 h-2 rounded-full transition-all ${
                    index === currentImageIndex 
                      ? 'bg-white w-6' 
                      : 'bg-white/50'
                  }`}
                />
              ))}
            </div>
          </>
        )}
      </div>

      {/* Product Info */}
      <div className="p-6">
        <h3 className="text-2xl font-bold text-gray-900 mb-2">
          {product.name[lang]}
        </h3>
        <p className="text-gray-600 mb-4 line-clamp-2">
          {product.description[lang]}
        </p>

        {/* Price and Actions */}
        <div className="flex items-center justify-between">
          <div className="text-3xl font-bold gradient-text">
            €{product.price.toFixed(2)}
          </div>
          <AddButton product={product} t={t} />
        </div>

        {/* Category Badge */}
        <div className="mt-4">
          <span className="inline-block bg-purple-100 text-purple-800 text-xs font-semibold px-3 py-1 rounded-full">
            {product.category}
          </span>
        </div>
      </div>
    </div>
  );
}