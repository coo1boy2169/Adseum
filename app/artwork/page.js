'use client';

import { useState, useEffect } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { artworks } from '@/data/artwork';
import { translations } from '@/lib/translations';

export default function ArtworkPage() {
  const [lang, setLang] = useState('nl');
  const [scrollY, setScrollY] = useState(0);
  const [selectedArtwork, setSelectedArtwork] = useState(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const t = translations[lang];

  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    const handleMouseMove = (e) => setMousePos({ x: e.clientX, y: e.clientY });

    window.addEventListener('scroll', handleScroll);
    window.addEventListener('mousemove', handleMouseMove);

    setDimensions({ width: window.innerWidth, height: window.innerHeight });

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return (
    <>
      <Header lang={lang} setLang={setLang} />
      
      {/* Rainbow Gradient Background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
        <div 
          className="absolute inset-0 opacity-30"
          style={{
            background: 'radial-gradient(circle at 50% 50%, rgba(228, 3, 3, 0.3), transparent 50%)',
            transform: `translate(${mousePos.x * 0.02}px, ${mousePos.y * 0.02}px) scale(${1 + scrollY * 0.0003})`,
          }}
        />
        <div 
          className="absolute inset-0 opacity-30"
          style={{
            background: 'radial-gradient(circle at 80% 20%, rgba(255, 140, 0, 0.3), transparent 50%)',
            transform: `translate(${-mousePos.x * 0.03}px, ${mousePos.y * 0.03}px)`,
          }}
        />
        <div 
          className="absolute inset-0 opacity-30"
          style={{
            background: 'radial-gradient(circle at 20% 80%, rgba(0, 128, 38, 0.3), transparent 50%)',
            transform: `translate(${mousePos.x * 0.025}px, ${-mousePos.y * 0.025}px)`,
          }}
        />
      </div>

      <main className="pt-24 min-h-screen relative z-10">
        {/* Hero Section */}
        <section className="relative py-40 overflow-hidden">
          <div 
            className="container mx-auto px-4 text-center"
            style={{
              transform: `translateY(${scrollY * 0.4}px) scale(${1 - scrollY * 0.0003})`,
              opacity: 1 - scrollY * 0.0015,
            }}
          >
            {/* Animated Title */}
            <h1 className="text-9xl md:text-[12rem] font-black mb-12 leading-none relative">
              {'ARTWORK'.split('').map((letter, i) => (
                <span
                  key={i}
                  className="inline-block cursor-pointer transition-all duration-500 hover:scale-150"
                  style={{
                    animation: 'float 3s ease-in-out infinite, rainbow-text 8s linear infinite',
                    animationDelay: `${i * 0.1}s`,
                    transform: `
                      translateY(${Math.sin(scrollY * 0.01 + i) * 30}px) 
                      rotateZ(${Math.sin(scrollY * 0.005 + i) * 15}deg)
                      scale(${1 + Math.sin(scrollY * 0.01 + i * 0.5) * 0.1})
                    `,
                    textShadow: `
                      0 0 20px hsl(${(i * 60) % 360}, 80%, 60%),
                      0 0 40px hsl(${(i * 60) % 360}, 80%, 60%),
                      0 0 60px hsl(${(i * 60) % 360}, 80%, 60%)
                    `,
                  }}
                >
                  {letter}
                </span>
              ))}
            </h1>

            {/* Subtitle */}
            <p 
              className="text-4xl font-light text-gray-700 mb-12"
              style={{
                transform: `translateY(${scrollY * 0.25}px)`,
              }}
            >
              {t.artwork.description}
            </p>

            {/* Floating Icons */}
            <div className="flex justify-center gap-12">
              {['🎨', '🖼️', '✨', '🌈', '💫'].map((emoji, i) => (
                <div
                  key={i}
                  className="text-7xl"
                  style={{
                    animation: 'float 4s ease-in-out infinite',
                    animationDelay: `${i * 0.3}s`,
                    transform: `
                      translateY(${Math.sin(scrollY * 0.015 + i) * 40}px)
                      rotateZ(${Math.cos(scrollY * 0.01 + i) * 20}deg)
                      scale(${1 + Math.sin(scrollY * 0.02 + i) * 0.2})
                    `,
                    filter: `hue-rotate(${scrollY * 0.5 + i * 30}deg)`,
                  }}
                >
                  {emoji}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Artwork Gallery - Masonry Style with Parallax */}
        <div className="container mx-auto px-4 pb-32">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {artworks.map((artwork, i) => {
              const rowPos = Math.floor(i / 3);
              const colPos = i % 3;
              
              return (
                <div
                  key={artwork.id}
                  className="group cursor-pointer"
                  onClick={() => setSelectedArtwork(artwork)}
                  style={{
                    transform: `
                      translateY(${Math.max(0, 400 - (scrollY - 600) * 0.6 - rowPos * 100)}px)
                      translateX(${(mousePos.x - dimensions.width / 2) * (0.01 + colPos * 0.005)}px)
                      rotateY(${(mousePos.x - dimensions.width / 2) * 0.02}deg)
                      rotateX(${-(mousePos.y - dimensions.height / 2) * 0.02}deg)
                      scale(${Math.min(1, 0.7 + (scrollY - 400 - rowPos * 100) / 400)})
                    `,
                    opacity: Math.min(1, (scrollY - 300 - rowPos * 80) / 300),
                    transformStyle: 'preserve-3d',
                    perspective: '1000px',
                  }}
                >
                  {/* Card Container */}
                  <div className="relative overflow-hidden rounded-3xl shadow-2xl transform transition-all duration-700 group-hover:shadow-purple-500/50">
                    {/* Animated Rainbow Border */}
                    <div 
                      className="absolute -inset-1 opacity-0 group-hover:opacity-100 transition-opacity rounded-3xl blur-xl"
                      style={{
                        background: 'linear-gradient(135deg, #e40303, #ff8c00, #ffed00, #008026, #24408e, #732982)',
                        backgroundSize: '400% 400%',
                        animation: 'gradient-shift 8s ease infinite',
                      }}
                    />

                    {/* Image */}
                    <div className="relative overflow-hidden rounded-3xl bg-black">
                      <img 
                        src={artwork.image}
                        alt={artwork.title[lang]}
                        className="w-full h-[600px] object-cover transform group-hover:scale-125 group-hover:rotate-2 transition-all duration-1000"
                        style={{
                          filter: 'brightness(0.9) contrast(1.1)',
                        }}
                        onError={(e) => {
                          const colors = ['E40303', 'FF8C00', 'FFED00', '008026', '24408E', '732982'];
                          e.target.src = `https://via.placeholder.com/600x800/${colors[i % 6]}/FFFFFF?text=Artwork`;
                        }}
                      />

                      {/* Gradient Overlay */}
                      <div 
                        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                        style={{
                          background: 'linear-gradient(135deg, rgba(228, 3, 3, 0.3), rgba(255, 140, 0, 0.3), rgba(255, 237, 0, 0.3), rgba(0, 128, 38, 0.3), rgba(36, 64, 142, 0.3), rgba(115, 41, 130, 0.3))',
                          backgroundSize: '400% 400%',
                          animation: 'gradient-shift 10s ease infinite',
                          mixBlendMode: 'overlay',
                        }}
                      />

                      {/* Info Overlay */}
                      <div className="absolute inset-0 flex flex-col justify-end p-8 bg-gradient-to-t from-black/90 via-black/50 to-transparent transform translate-y-full group-hover:translate-y-0 transition-transform duration-500">
                        <h3 
                          className="text-4xl font-black mb-3 text-white"
                          style={{
                            textShadow: '0 0 20px rgba(255, 255, 255, 0.5)',
                          }}
                        >
                          {artwork.title[lang]}
                        </h3>
                        <p className="text-xl text-white/90 mb-2">
                          {artwork.description[lang]}
                        </p>
                        <div className="flex items-center justify-between text-white/80">
                          <span className="text-lg">{artwork.medium[lang]}</span>
                          <span className="text-lg font-bold">{artwork.year}</span>
                        </div>
                      </div>

                      {/* Year Badge */}
                      <div 
                        className="absolute top-6 right-6 px-6 py-3 rounded-full backdrop-blur-xl font-black text-white text-xl transform group-hover:scale-110 group-hover:-rotate-12 transition-all"
                        style={{
                          background: 'rgba(255, 255, 255, 0.2)',
                          border: '2px solid rgba(255, 255, 255, 0.3)',
                          boxShadow: '0 8px 30px rgba(0, 0, 0, 0.3)',
                        }}
                      >
                        {artwork.year}
                      </div>

                      {/* Click Indicator */}
                      <div className="absolute top-6 left-6 px-4 py-2 rounded-full backdrop-blur-xl font-bold text-white text-sm opacity-0 group-hover:opacity-100 transition-opacity">
                        👆 {lang === 'nl' ? 'Klik voor details' : 'Click for details'}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Lightbox Modal */}
        {selectedArtwork && (
          <div 
            className="fixed inset-0 bg-black/95 z-50 flex items-center justify-center p-4 backdrop-blur-xl"
            onClick={() => setSelectedArtwork(null)}
            style={{
              animation: 'fadeIn 0.3s ease',
            }}
          >
            {/* Close Button */}
            <button 
              className="absolute top-8 right-8 text-white text-6xl font-light hover:rotate-90 transition-transform duration-500 z-50"
              onClick={() => setSelectedArtwork(null)}
            >
              ×
            </button>
            
            <div 
              className="max-w-7xl w-full relative"
              onClick={(e) => e.stopPropagation()}
              style={{
                animation: 'scaleIn 0.5s cubic-bezier(0.34, 1.56, 0.64, 1)',
              }}
            >
              <div className="grid md:grid-cols-2 gap-8 bg-white rounded-3xl overflow-hidden shadow-2xl">
                {/* Image Side */}
                <div className="relative h-[70vh] md:h-auto">
                  <img 
                    src={selectedArtwork.image}
                    alt={selectedArtwork.title[lang]}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      e.target.src = 'https://via.placeholder.com/800x1000/8B5CF6/FFFFFF?text=Artwork';
                    }}
                  />
                  
                  {/* Animated Rainbow Overlay */}
                  <div 
                    className="absolute inset-0 opacity-20 pointer-events-none"
                    style={{
                      background: 'linear-gradient(135deg, #e40303, #ff8c00, #ffed00, #008026, #24408e, #732982)',
                      backgroundSize: '400% 400%',
                      animation: 'gradient-shift 15s ease infinite',
                      mixBlendMode: 'overlay',
                    }}
                  />
                </div>

                {/* Info Side */}
                <div className="p-12 flex flex-col justify-center">
                  <h2 
                    className="text-6xl font-black mb-6 gradient-text"
                    style={{
                      animation: 'slideInRight 0.6s ease',
                    }}
                  >
                    {selectedArtwork.title[lang]}
                  </h2>
                  
                  <p 
                    className="text-2xl text-gray-700 mb-8 leading-relaxed"
                    style={{
                      animation: 'slideInRight 0.7s ease',
                    }}
                  >
                    {selectedArtwork.description[lang]}
                  </p>

                  <div 
                    className="space-y-4 mb-8 text-xl"
                    style={{
                      animation: 'slideInRight 0.8s ease',
                    }}
                  >
                    <div className="flex items-center gap-4">
                      <span className="font-bold text-gray-900">
                        {lang === 'nl' ? '🎨 Medium:' : '🎨 Medium:'}
                      </span>
                      <span className="text-gray-700">{selectedArtwork.medium[lang]}</span>
                    </div>
                    <div className="flex items-center gap-4">
                      <span className="font-bold text-gray-900">
                        {lang === 'nl' ? '📅 Jaar:' : '📅 Year:'}
                      </span>
                      <span className="text-gray-700">{selectedArtwork.year}</span>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div 
                    className="flex gap-4"
                    style={{
                      animation: 'slideInRight 0.9s ease',
                    }}
                  >
                    <button 
                      className="flex-1 py-5 text-xl font-bold text-white rounded-full transform hover:scale-105 transition-all"
                      style={{
                        background: 'linear-gradient(135deg, #e40303, #ff8c00, #ffed00, #008026, #24408e, #732982)',
                        backgroundSize: '400% 400%',
                        animation: 'gradient-shift 8s ease infinite',
                        boxShadow: '0 10px 40px rgba(148, 0, 211, 0.4)',
                      }}
                    >
                      💌 {lang === 'nl' ? 'Interesse?' : 'Interested?'}
                    </button>
                    <button className="px-8 py-5 text-xl font-bold text-purple-600 bg-purple-100 rounded-full hover:bg-purple-200 transform hover:scale-105 transition-all">
                      ↗
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* CTA Section */}
        <section 
          className="py-40 relative"
          style={{
            transform: `translateY(${Math.max(0, 400 - (scrollY - 2000) * 0.5)}px)`,
            opacity: Math.min(1, (scrollY - 1800) / 400),
          }}
        >
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-7xl font-black gradient-text mb-8">
              {lang === 'nl' ? 'Custom Artwork?' : 'Custom Artwork?'}
            </h2>
            <p className="text-3xl text-gray-700 mb-12 max-w-3xl mx-auto">
              {lang === 'nl' 
                ? 'Laten we samen iets unieks creëren!' 
                : "Let's create something unique together!"}
            </p>
            <a href="/contact">
              <button 
                className="px-16 py-8 text-3xl font-bold text-white rounded-full transform hover:scale-110 transition-all"
                style={{
                  background: 'linear-gradient(135deg, #e40303, #ff8c00, #ffed00, #008026, #24408e, #732982)',
                  backgroundSize: '400% 400%',
                  animation: 'gradient-shift 8s ease infinite',
                  boxShadow: '0 20px 60px rgba(148, 0, 211, 0.5)',
                }}
              >
                🎨 {lang === 'nl' ? 'Neem Contact Op' : 'Get in Touch'}
              </button>
            </a>
          </div>
        </section>
      </main>

      <Footer lang={lang} />

      <style jsx>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }

        @keyframes scaleIn {
          from {
            opacity: 0;
            transform: scale(0.8);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }

        @keyframes slideInRight {
          from {
            opacity: 0;
            transform: translateX(50px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
      `}</style>
    </>
  );
}