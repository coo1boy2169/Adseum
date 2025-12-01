'use client';

import { useState } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ImageGallery from '@/components/ImageGallery';
import { artworks } from '@/data/artwork';
import { translations } from '@/lib/translations';

export default function ArtworkPage() {
  const [lang, setLang] = useState('nl');
  const t = translations[lang];

  return (
    <>
      <Header lang={lang} setLang={setLang} />
      
      <main className="pt-24 min-h-screen">
        {/* Hero Banner */}
        <section className="relative bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 py-20 mb-12">
          <div className="container mx-20 px-4 text-center text-white">
            <h1 className="text-5xl md:text-6xl font-bold mb-4">
              {t.artwork.title}
            </h1>
            <p className="text-xl md:text-2xl">
              {t.artwork.description}
            </p>
          </div>
        </section>

        <div className="container mx-auto px-4 pb-20">
          {/* Info Section */}
          <div className="max-w-3xl mx-auto text-center mb-16">
            <p className="text-lg text-gray-700 leading-relaxed">
              {lang === 'nl'
                ? 'Elk kunstwerk vertelt een verhaal van liefde, acceptatie en trots. Klik op een afbeelding voor meer details en informatie over beschikbaarheid.'
                : 'Each artwork tells a story of love, acceptance and pride. Click on an image for more details and availability information.'}
            </p>
          </div>

          {/* Gallery */}
          <ImageGallery artworks={artworks} lang={lang} />

     
        </div>
      </main>

      <Footer lang={lang} />
    </>
  );
}