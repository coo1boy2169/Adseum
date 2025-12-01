'use client';

import { useState } from 'react';

export default function ImageGallery({ artworks, lang }) {
  const [selectedArtwork, setSelectedArtwork] = useState(null);

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {artworks.map((artwork) => (
          <div 
            key={artwork.id}
            onClick={() => setSelectedArtwork(artwork)}
            className="group cursor-pointer"
          >
            <div className="relative overflow-hidden rounded-2xl shadow-xl card-hover pride-border">

              {/* FIXED IMAGE SIZE */}
              <img 
                src={artwork.image}
                alt={artwork.title[lang]}
                className="
                  w-full 
                  h-60                /* kleiner */
                  md:h-64             /* op tablets iets groter */
                  lg:h-72             /* op desktops nog iets groter */
                  object-cover 
                  transform 
                  transition-transform 
                  duration-500 
                  group-hover:scale-110
                "
                onError={(e) => {
                  e.target.src = 'https://via.placeholder.com/600x800/8B5CF6/FFFFFF?text=Artwork';
                }}
              />

              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                  <h3 className="text-2xl font-bold mb-2">{artwork.title[lang]}</h3>
                  <p className="text-sm">{artwork.medium[lang]} • {artwork.year}</p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Lightbox Modal */}
      {selectedArtwork && (
        <div 
          className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4"
          onClick={() => setSelectedArtwork(null)}
        >
          <button 
            className="absolute top-4 right-4 text-white text-4xl hover:text-gray-300"
            onClick={() => setSelectedArtwork(null)}
          >
            ×
          </button>
          
          <div 
            className="max-w-5xl w-full bg-white rounded-2xl overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="grid md:grid-cols-2 gap-0">

              {/* Image */}
              <div className="relative h-96 md:h-auto">
                <img 
                  src={selectedArtwork.image}
                  alt={selectedArtwork.title[lang]}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    e.target.src = 'https://via.placeholder.com/800x1000/8B5CF6/FFFFFF?text=Artwork';
                  }}
                />
              </div>

              {/* Info */}
              <div className="p-8">
                <h2 className="text-4xl font-bold gradient-text mb-4">
                  {selectedArtwork.title[lang]}
                </h2>

                <div className="space-y-4 text-gray-700">
                  <p className="text-lg">{selectedArtwork.description[lang]}</p>

                  <div className="border-t pt-4">
                    <p><strong>{lang === 'nl' ? 'Medium:' : 'Medium:'}</strong> {selectedArtwork.medium[lang]}</p>
                    <p><strong>{lang === 'nl' ? 'Jaar:' : 'Year:'}</strong> {selectedArtwork.year}</p>
                  </div>
                </div>

                <div className="mt-8 flex gap-4">
                  <button className="btn-pride flex-1">
                    {lang === 'nl' ? '💌 Interesse?' : '💌 Interested?'}
                  </button>
                  <button className="bg-white border-4 border-purple-500 text-purple-600 font-bold py-3 px-6 rounded-full hover:bg-purple-50 transition-colors">
                    {lang === 'nl' ? '↗ Delen' : '↗ Share'}
                  </button>
                </div>

              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
