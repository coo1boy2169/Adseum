'use client';

import Link from 'next/link';
import { translations } from '@/lib/translations';

export default function Hero({ lang }) {
  const t = translations[lang];

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
      {/* Animated Background */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-pink-300 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-float"></div>
        <div className="absolute top-1/3 right-1/4 w-96 h-96 bg-purple-300 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-float" style={{ animationDelay: '2s' }}></div>
        <div className="absolute bottom-1/4 left-1/3 w-96 h-96 bg-blue-300 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-float" style={{ animationDelay: '4s' }}></div>
      </div>

      <div className="container mx-auto px-4 text-center relative z-10">
        {/* Main Content */}
        <div className="max-w-4xl mx-auto">
          {/* Pride Hearts Animation */}
          <div className="mb-8 flex justify-center space-x-2">
            {['❤️', '🧡', '💛', '💚', '💙', '💜'].map((heart, i) => (
              <span 
                key={i}
                className="text-4xl md:text-6xl animate-float"
                style={{ animationDelay: `${i * 0.5}s` }}
              >
                {heart}
              </span>
            ))}
          </div>

          <h1 className="text-5xl md:text-7xl font-bold mb-6 gradient-text">
            {t.hero.title}
          </h1>
          
          <p className="text-xl md:text-2xl text-gray-700 mb-8 font-light">
            {t.hero.subtitle}
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link href="/shop">
              <button className="btn-pride text-lg">
                {t.hero.cta}
              </button>
            </Link>
            <Link href="/artwork">
              <button className="bg-white text-purple-600 font-bold py-3 px-8 rounded-full border-4 border-purple-500 transform transition-all duration-300 hover:scale-105 hover:shadow-xl active:scale-95">
                {t.nav.artwork}
              </button>
            </Link>
          </div>

          {/* Featured Badge */}
          <div className="mt-12 inline-block bg-white/80 backdrop-blur-sm rounded-full px-6 py-3 shadow-lg">
            <p className="text-gray-700 font-semibold">
              ✨ {lang === 'nl' ? 'Nieuw: Unieke Pride Collectie 2024' : 'New: Unique Pride Collection 2024'}
            </p>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <svg 
            className="w-8 h-8 text-purple-600" 
            fill="none" 
            strokeLinecap="round" 
            strokeLinejoin="round" 
            strokeWidth="2" 
            viewBox="0 0 24 24" 
            stroke="currentColor"
          >
            <path d="M19 14l-7 7m0 0l-7-7m7 7V3"></path>
          </svg>
        </div>
      </div>
    </section>
  );
}