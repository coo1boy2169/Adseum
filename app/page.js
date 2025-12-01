'use client';

import { useState } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Hero from '@/components/Hero';
import ProductCard from '@/components/ProductCard';
import { products } from '@/data/products';
import { artworks } from '@/data/artwork';
import Link from 'next/link';
import { translations } from '@/lib/translations';

export default function Home() {
  const [lang, setLang] = useState('nl');
  const t = translations[lang];

  // Toon alleen eerste 3 producten en artworks op homepage
  const featuredProducts = products.slice(0, 3);
  const featuredArtworks = artworks.slice(0, 3);

  return (
    <>
      <Header lang={lang} setLang={setLang} />
      
      <main>
        {/* Hero Section */}
        <Hero lang={lang} />

        {/* Featured Products Section */}
        <section className="container mx-auto px-4 py-20">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold gradient-text mb-4">
              {lang === 'nl' ? 'Uitgelichte Producten' : 'Featured Products'}
            </h2>
            <p className="text-xl text-gray-600">
              {lang === 'nl' ? 'Ontdek onze nieuwste collectie' : 'Discover our latest collection'}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-8">
            {featuredProducts.map((product) => (
              <ProductCard key={product.id} product={product} lang={lang} />
            ))}
          </div>

          <div className="text-center">
            <Link href="/shop">
              <button className="btn-pride">
                {lang === 'nl' ? 'Bekijk alle producten →' : 'View all products →'}
              </button>
            </Link>
          </div>
        </section>

        {/* Featured Artwork Section */}
        <section className="bg-white py-20">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-4xl md:text-5xl font-bold gradient-text mb-4">
                {lang === 'nl' ? 'Nieuwste Artwork' : 'Latest Artwork'}
              </h2>
              <p className="text-xl text-gray-600">
                {lang === 'nl' ? 'Bekijk de nieuwste creaties' : 'View the latest creations'}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
              {featuredArtworks.map((artwork) => (
                <div key={artwork.id} className="group cursor-pointer">
                  <div className="relative overflow-hidden rounded-2xl shadow-xl card-hover pride-border">
                    <img 
                      src={artwork.image}
                      alt={artwork.title[lang]}
                      className="w-full h-96 object-cover transform transition-transform duration-500 group-hover:scale-110"
                      onError={(e) => {
                        e.target.src = 'https://via.placeholder.com/600x800/8B5CF6/FFFFFF?text=Artwork';
                      }}
                    />
                    <div className="absolute inset-0 bg-linear-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                        <h3 className="text-2xl font-bold">{artwork.title[lang]}</h3>
                        <p className="text-sm mt-2">{artwork.year}</p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="text-center">
              <Link href="/artwork">
                <button className="btn-pride">
                  {lang === 'nl' ? 'Bekijk alle artwork →' : 'View all artwork →'}
                </button>
              </Link>
            </div>
          </div>
        </section>

        {/* About Section */}
        <section className="container mx-auto px-4 py-20">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-4xl md:text-5xl font-bold gradient-text mb-8">
              {lang === 'nl' ? 'Over Aduseum' : 'About Aduseum'}
            </h2>
            <p className="text-xl text-gray-700 leading-relaxed mb-8">
              {lang === 'nl' 
                ? 'Aduseum creëert kunst die inspireert, verbindt en de diversiteit van liefde viert. Elk kunstwerk en product is gemaakt met passie en toewijding aan inclusiviteit en expressie.'
                : 'Aduseum creates art that inspires, connects and celebrates the diversity of love. Each artwork and product is made with passion and dedication to inclusivity and expression.'}
            </p>
            <Link href="/contact">
              <button className="btn-pride">
                {lang === 'nl' ? 'Neem contact op' : 'Get in touch'}
              </button>
            </Link>
          </div>
        </section>
      </main>

      <Footer lang={lang} />
    </>
  );
}