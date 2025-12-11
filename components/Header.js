'use client';

import Link from 'next/link';
import { useState } from 'react';
import LanguageSwitcher from './LanguageSwitcher';
import { translations } from '@/lib/translations';

export default function Header({ lang, setLang }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const t = translations[lang];

  return (
     <header className="bg-white/80 backdrop-blur-lg shadow-lg">
  <nav className="container mx-auto px-4 py-4">
    <div className="flex items-center justify-between">
      {/* Logo */}
      <Link href="/" className="flex items-center space-x-3 group">
        <img src="/images/logoA.png" alt="Adseum Logo" className="w-50 h-30" />
      </Link>

      {/* Desktop Navigation */}
      <div className="hidden md:flex items-center space-x-8">
        <Link 
          href="/" 
          className="text-gray-700 hover:text-purple-600 font-semibold transition-colors"
        >
          {t.nav.home}
        </Link>
        <Link 
          href="/shop" 
          className="text-gray-700 hover:text-purple-600 font-semibold transition-colors"
        >
          {t.nav.shop}
        </Link>
        <Link 
          href="/artwork" 
          className="text-gray-700 hover:text-purple-600 font-semibold transition-colors"
        >
          {t.nav.artwork}
        </Link>
        <Link 
          href="/about" 
          className="text-gray-700 hover:text-purple-600 font-semibold transition-colors"
        >
          {lang === 'nl' ? 'Over Ons' : 'About'}
        </Link>
        <Link 
          href="/contact" 
          className="text-gray-700 hover:text-purple-600 font-semibold transition-colors"
        >
          {t.nav.contact}
        </Link>
        <LanguageSwitcher lang={lang} setLang={setLang} />
      </div>

      {/* Mobile Menu Button */}
      <button
        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        className="md:hidden p-2 rounded-lg hover:bg-gray-100"
      >
        <svg
          className="w-6 h-6"
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          {mobileMenuOpen ? (
            <path d="M6 18L18 6M6 6l12 12" />
          ) : (
            <path d="M4 6h16M4 12h16M4 18h16" />
          )}
        </svg>
      </button>
    </div>

    {/* Mobile Menu */}
    {mobileMenuOpen && (
      <div className="md:hidden mt-4 pb-4 space-y-3">
        <Link 
          href="/" 
          className="block text-gray-700 hover:text-purple-600 font-semibold py-2"
          onClick={() => setMobileMenuOpen(false)}
        >
          {t.nav.home}
        </Link>
        <Link 
          href="/shop" 
          className="block text-gray-700 hover:text-purple-600 font-semibold py-2"
          onClick={() => setMobileMenuOpen(false)}
        >
          {t.nav.shop}
        </Link>
        <Link 
          href="/artwork" 
          className="block text-gray-700 hover:text-purple-600 font-semibold py-2"
          onClick={() => setMobileMenuOpen(false)}
        >
          {t.nav.artwork}
        </Link>
        <Link 
          href="/about" 
          className="block text-gray-700 hover:text-purple-600 font-semibold py-2"
          onClick={() => setMobileMenuOpen(false)}
        >
          {lang === 'nl' ? 'Over Ons' : 'About'}
        </Link>
        <Link 
          href="/contact" 
          className="block text-gray-700 hover:text-purple-600 font-semibold py-2"
          onClick={() => setMobileMenuOpen(false)}
        >
          {t.nav.contact}
        </Link>
        <div className="pt-2">
          <LanguageSwitcher lang={lang} setLang={setLang} />
        </div>
      </div>
    )}
  </nav>
</header>

  );
}