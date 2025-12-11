'use client';

import { useState, useEffect, useRef } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { products } from '@/data/products';
import { artworks } from '@/data/artwork';
import Link from 'next/link';
import { translations } from '@/lib/translations';

export default function Home() {
  const [lang, setLang] = useState('nl');
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [scrollY, setScrollY] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const heroRef = useRef(null);
  const productsRef = useRef(null);
  const artworkRef = useRef(null);
  const t = translations[lang];
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });

  useEffect(() => {
    // Simuleer loading time
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2500);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePos({ x: e.clientX, y: e.clientY });
    };

    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('scroll', handleScroll);

    setDimensions({ width: window.innerWidth, height: window.innerHeight });

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const featuredProducts = products.slice(0, 3);
  const featuredArtworks = artworks.slice(0, 3);

  return (
    <>
      {/* Loading Screen with Logo Animation */}
      {isLoading && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-white overflow-hidden">
          {/* Animated gradient background */}
          <div className="absolute inset-0 bg-gradient-to-br from-pink-100 via-purple-100 to-blue-100" />
          
          {/* Content */}
          <div className="relative z-10 text-center">
            {/* Rotating Logo Animation */}
            <div className="mb-12 flex justify-center">
              <div 
                className="h-40 md:h-56 w-40 md:w-56 flex items-center justify-center"
                style={{
                  animation: 'logo-spin 2.5s cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards',
                }}
              >
                <img 
                  src="/images/logoD.png"
                  alt="ADSEUM Loading"
                  className="h-full w-full object-contain"
                  style={{
                    filter: 'drop-shadow(0 10px 30px rgba(138, 43, 226, 0.4))',
                  }}
                />
              </div>
            </div>

            {/* Loading Text */}
            <h1 className="text-4xl md:text-5xl font-black mb-6 bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 bg-clip-text text-transparent animate-pulse">
              ADSEUM
            </h1>

            {/* Animated loading bar */}
            <div className="w-64 md:w-80 h-2 bg-gray-200 rounded-full overflow-hidden mx-auto">
              <div 
                className="h-full bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 rounded-full"
                style={{
                  animation: 'loading-bar 2.5s ease-in-out infinite',
                }}
              />
            </div>

            {/* Loading dots */}
            <div className="flex justify-center gap-2 mt-8">
              {[0, 1, 2].map((i) => (
                <div
                  key={i}
                  className="w-3 h-3 rounded-full bg-gradient-to-r from-pink-500 to-purple-500"
                  style={{
                    animation: `dot-bounce 1.4s infinite`,
                    animationDelay: `${i * 0.2}s`,
                  }}
                />
              ))}
            </div>
          </div>

          {/* Style tag removed - merged with main style tag at bottom */}
        </div>
      )}

      <Header lang={lang} setLang={setLang} />
      
      {/* Animated Background Blobs */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
        <div 
          className="absolute w-96 h-96 bg-linear-to-br from-pink-400 to-pink-600 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob"
          style={{
            left: `${20 + scrollY * 0.05}%`,
            top: `${10 + Math.sin(scrollY * 0.002) * 10}%`,
          }}
        />
        <div 
          className="absolute w-96 h-96 bg-linear-to-br from-purple-400 to-purple-600 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob animation-delay-2000"
          style={{
            right: `${15 + scrollY * 0.03}%`,
            top: `${30 + Math.cos(scrollY * 0.003) * 15}%`,
          }}
        />
        <div 
          className="absolute w-96 h-96 bg-linear-to-br from-blue-400 to-blue-600 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob animation-delay-4000"
          style={{
            left: `${40 + scrollY * 0.04}%`,
            bottom: `${20 + Math.sin(scrollY * 0.0025) * 12}%`,
          }}
        />
        <div 
          className="absolute w-96 h-96 bg-linear-to-br from-yellow-400 to-orange-500 rounded-full mix-blend-multiply filter blur-3xl opacity-60 animate-blob animation-delay-3000"
          style={{
            right: `${30 + scrollY * 0.06}%`,
            bottom: `${10 + Math.cos(scrollY * 0.0035) * 18}%`,
          }}
        />
        <div 
          className="absolute w-96 h-96 bg-linear-to-br from-green-400 to-teal-500 rounded-full mix-blend-multiply filter blur-3xl opacity-60 animate-blob animation-delay-1000"
          style={{
            left: `${60 + scrollY * 0.02}%`,
            top: `${50 + Math.sin(scrollY * 0.004) * 20}%`,
          }}
        />
      </div>

      <main className="relative z-10">
        {/* Hero Section - Scroll Animated */}
        <section 
          ref={heroRef}
          className="min-h-screen flex items-center justify-center pt-20 relative overflow-hidden"
        >
          <div 
            className="container mx-auto px-4 text-center"
            style={{
              transform: `translateY(${scrollY * 0.5}px) scale(${1 - scrollY * 0.0005})`,
              opacity: 1 - scrollY * 0.002,
            }}
          >
            {/* Logo with Animation */}
            <div className="mb-12 relative flex justify-center group">
              <div className="relative">
                <img 
                  src="/images/logoD.png"
                  alt="ADSEUM Logo"
                  className="h-48 md:h-80 object-contain animate-logo-entrance animate-logo-glow animate-logo-rotate"
                  style={{
                    transformStyle: 'preserve-3d',
                  }}
                />
                {/* Glow background effect */}
                <div className="absolute inset-0 blur-3xl opacity-20 group-hover:opacity-40 transition-opacity duration-500" 
                  style={{
                    background: 'radial-gradient(circle, rgba(255, 20, 147, 0.6), rgba(138, 43, 226, 0.4))',
                  }}
                />
              </div>
            </div>

            {/* 3D Rotating Hearts */}
            <div className="flex justify-center gap-4 mb-8">
              {['❤️', '🧡', '💛', '💚', '💙', '💜'].map((emoji, i) => (
                <div
                  key={i}
                  className="text-6xl animate-spin-slow"
                  style={{
                    animationDelay: `${i * 0.2}s`,
                    transform: `translateY(${Math.sin(scrollY * 0.01 + i) * 20}px) 
                               rotateY(${scrollY * 0.5 + i * 60}deg)`,
                  }}
                >
                  {emoji}
                </div>
              ))}
            </div>

            <p 
              className="text-2xl md:text-4xl font-light mb-12 text-gray-800"
              style={{
                transform: `translateY(${scrollY * 0.3}px)`,
              }}
            >
              {t.hero.subtitle}
            </p>

            {/* Morphing CTA Button */}
            <Link href="/shop">
              <button 
                className="group relative px-12 py-6 text-2xl font-bold text-white overflow-hidden rounded-full"
                style={{
                  background: 'linear-gradient(135deg, #e40303, #ff8c00, #ffed00, #008026, #24408e, #732982)',
                  backgroundSize: '400% 400%',
                  animation: 'gradient-shift 8s ease infinite',
                }}
              >
                <span className="relative z-10 flex items-center gap-3">
                  ✨ {t.hero.cta}
                  <svg 
                    className="w-8 h-8 transform group-hover:translate-x-2 transition-transform" 
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M13 7l5 5m0 0l-5 5m5-5H6"/>
                  </svg>
                </span>
              </button>
            </Link>

            {/* Scroll Indicator */}
            <div 
              className="absolute bottom-12 left-1/2 transform -translate-x-1/2"
              style={{
                opacity: 1 - scrollY * 0.005,
              }}
            >
              <div className="animate-bounce">
                <div className="w-8 h-12 rounded-full border-4 border-purple-500 flex items-start justify-center p-2">
                  <div className="w-2 h-2 bg-purple-500 rounded-full animate-pulse" />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Products Section - Stagger Reveal */}
        <section ref={productsRef} className="py-32 relative">
          <div className="container mx-auto px-4">
            <div 
              className="text-center mb-20"
              style={{
                transform: `translateY(${Math.max(0, 300 - scrollY * 0.5)}px)`,
                opacity: Math.min(1, scrollY / 500),
              }}
            >
              <h2 className="text-6xl md:text-7xl font-black mb-6">
                <span className="bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 bg-clip-text text-transparent">
                  {lang === 'nl' ? 'SHOP' : 'SHOP'}
                </span>
              </h2>
              <p className="text-2xl text-gray-700">{t.shop.description}</p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              {featuredProducts.map((product, i) => (
                <div
                  key={product.id}
                  className="group relative"
                  style={{
                    transform: `translateY(${Math.max(0, 200 - (scrollY - 400) * 0.5 - i * 50)}px) 
                               rotateY(${(mousePos.x - dimensions.width / 2) * 0.01}deg)`,
                    opacity: Math.min(1, (scrollY - 300) / 300),
                    transformStyle: 'preserve-3d',
                  }}
                >
                  <div className="relative overflow-hidden rounded-3xl bg-white shadow-2xl transform transition-all duration-500 group-hover:scale-105 group-hover:shadow-purple-500/50">
                    <div className="absolute inset-0 bg-gradient-to-br from-pink-500/20 via-purple-500/20 to-blue-500/20 opacity-0 group-hover:opacity-100 transition-opacity" />
                    
                    <div className="relative h-80 overflow-hidden">
                      <img 
                        src={product.images[0]}
                        alt={product.name[lang]}
                        className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
                        onError={(e) => {
                          e.target.src = `https://via.placeholder.com/400x600/${['FF69B4', '9D4EDD', '4EA8DE'][i]}/FFFFFF?text=${encodeURIComponent(product.name.en)}`;
                        }}
                      />
                    </div>

                    <div className="p-6">
                      <h3 className="text-2xl font-bold mb-2 bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent">
                        {product.name[lang]}
                      </h3>
                      <p className="text-gray-600 mb-4">{product.description[lang]}</p>
                      <div className="flex items-center justify-between">
                        <span className="text-3xl font-black text-purple-600">
                          €{product.price.toFixed(2)}
                        </span>
                        <button className="px-6 py-3 bg-gradient-to-r from-pink-500 to-purple-600 text-white rounded-full font-bold transform hover:scale-110 transition-transform">
                          {t.shop.addToCart}
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Artwork Section - Parallax Gallery */}
        <section ref={artworkRef} className="py-32 relative bg-gradient-to-b from-transparent via-purple-50 to-transparent">
          <div className="container mx-auto px-4">
            <div 
              className="text-center mb-20"
              style={{
                transform: `translateY(${Math.max(0, 500 - (scrollY - 800) * 0.5)}px)`,
                opacity: Math.min(1, (scrollY - 800) / 300),
              }}
            >
              <h2 className="text-6xl md:text-7xl font-black mb-6">
                <span className="bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 bg-clip-text text-transparent">
                  ARTWORK
                </span>
              </h2>
              <p className="text-2xl text-gray-700">{t.artwork.description}</p>
            </div>

            <div className="grid md:grid-cols-3 gap-12">
              {featuredArtworks.map((artwork, i) => (
                <div
                  key={artwork.id}
                  className="group cursor-pointer"
                  style={{
                    transform: `translateY(${Math.max(0, 300 - (scrollY - 1200) * 0.4 - i * 80)}px) 
                               scale(${Math.min(1, 0.8 + (scrollY - 1200) / 500)})`,
                    opacity: Math.min(1, (scrollY - 1000) / 400),
                  }}
                >
                  <div className="relative overflow-hidden rounded-3xl shadow-2xl transform transition-all duration-700 group-hover:scale-105 group-hover:rotate-2">
                    <div 
                      className="absolute inset-0 bg-gradient-to-br from-pink-500/40 to-purple-600/40 opacity-0 group-hover:opacity-100 transition-opacity z-10"
                      style={{
                        mixBlendMode: 'multiply',
                      }}
                    />
                    
                    <img 
                      src={artwork.image}
                      alt={artwork.title[lang]}
                      className="w-full h-[500px] object-cover transform group-hover:scale-110 transition-transform duration-1000"
                      onError={(e) => {
                        e.target.src = `https://via.placeholder.com/600x800/${['E40303', 'FF8C00', 'FFED00'][i]}/FFFFFF?text=Artwork`;
                      }}
                    />

                    <div className="absolute bottom-0 left-0 right-0 p-8 bg-gradient-to-t from-black/80 to-transparent transform translate-y-full group-hover:translate-y-0 transition-transform duration-500 z-20">
                      <h3 className="text-3xl font-bold text-white mb-2">
                        {artwork.title[lang]}
                      </h3>
                      <p className="text-white/80">{artwork.year}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Final CTA Section - Interactive */}
        <section className="py-40 relative overflow-hidden">
          <div 
            className="container mx-auto px-4 text-center"
            style={{
              transform: `translateY(${Math.max(0, 400 - (scrollY - 2000) * 0.6)}px)`,
              opacity: Math.min(1, (scrollY - 2000) / 400),
            }}
          >
            <h2 className="text-7xl md:text-8xl font-black mb-8">
              <span 
                className="inline-block"
                style={{
                  background: 'linear-gradient(135deg, #e40303, #ff8c00, #ffed00, #008026, #24408e, #732982)',
                  backgroundSize: '400% 400%',
                  animation: 'gradient-shift 10s ease infinite',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                }}
              >
                {lang === 'nl' ? 'KLAAR OM TE' : 'READY TO'}
              </span>
              <br />
              <span 
                className="inline-block"
                style={{
                  background: 'linear-gradient(135deg, #732982, #24408e, #008026, #ffed00, #ff8c00, #e40303)',
                  backgroundSize: '400% 400%',
                  animation: 'gradient-shift 10s ease infinite reverse',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                }}
              >
                {lang === 'nl' ? 'ONTDEKKEN?' : 'EXPLORE?'}
              </span>
            </h2>

            <div className="flex flex-col sm:flex-row gap-6 justify-center mt-12">
              <Link href="/shop">
                <button className="px-12 py-6 text-2xl font-bold bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 text-white rounded-full transform hover:scale-110 transition-all hover:shadow-2xl hover:shadow-purple-500/50">
                  🛍️ {lang === 'nl' ? 'Naar Shop' : 'Go to Shop'}
                </button>
              </Link>
              <Link href="/contact">
                <button className="px-12 py-6 text-2xl font-bold bg-white text-purple-600 rounded-full border-4 border-purple-500 transform hover:scale-110 transition-all hover:shadow-2xl hover:bg-purple-50">
                  💌 {lang === 'nl' ? 'Contact' : 'Contact'}
                </button>
              </Link>
            </div>
          </div>
        </section>
      </main>

      <Footer lang={lang} />

      <style jsx>{`
        @keyframes gradient-shift {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }

        @keyframes blob {
          0%, 100% { transform: translate(0, 0) scale(1); }
          25% { transform: translate(20px, -50px) scale(1.1); }
          50% { transform: translate(-20px, 20px) scale(0.9); }
          75% { transform: translate(50px, 50px) scale(1.05); }
        }

        @keyframes logo-spin {
          0% {
            transform: rotate(0deg) scale(1);
            opacity: 1;
          }
          60% {
            transform: rotate(360deg) scale(1.1);
            opacity: 1;
          }
          85% {
            transform: rotate(360deg) scale(1.05);
            opacity: 1;
          }
          100% {
            transform: rotate(360deg) scale(1);
            opacity: 1;
          }
        }

        @keyframes loading-bar {
          0% { width: 0%; }
          50% { width: 100%; }
          100% { width: 0%; }
        }

        @keyframes dot-bounce {
          0%, 100% { transform: translateY(0); opacity: 0.5; }
          50% { transform: translateY(-15px); opacity: 1; }
        }

        .animate-blob {
          animation: blob 20s infinite;
        }

        .animation-delay-1000 {
          animation-delay: 1s;
        }

        .animation-delay-2000 {
          animation-delay: 2s;
        }

        .animation-delay-3000 {
          animation-delay: 3s;
        }

        .animation-delay-4000 {
          animation-delay: 4s;
        }
      `}</style>
    </>
  );
}