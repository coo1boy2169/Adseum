'use client';

import { useState } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ProductCard from '@/components/ProductCard';
import { products } from '@/data/products';
import { translations } from '@/lib/translations';

export default function ShopPage() {
  const [lang, setLang] = useState('nl');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const t = translations[lang];

  // Filter producten op categorie
  const filteredProducts = selectedCategory === 'all' 
    ? products 
    : products.filter(p => p.category === selectedCategory);

  const categories = ['all', ...new Set(products.map(p => p.category))];

  return (
    <>
      <Header lang={lang} setLang={setLang} />
      
      <main className="pt-24 min-h-screen">
        {/* Hero Banner */}
        <section className="relative bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 py-20 mb-12">
          <div className="container mx-auto px-4 text-center text-white">
            <h1 className="text-5xl md:text-6xl font-bold mb-4">
              {t.shop.title}
            </h1>
            <p className="text-xl md:text-2xl">
              {t.shop.description}
            </p>
          </div>
        </section>

        <div className="container mx-auto px-4 pb-20">
          {/* Category Filter */}
          <div className="mb-12">
            <div className="flex flex-wrap justify-center gap-4">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-6 py-3 rounded-full font-semibold transition-all ${
                    selectedCategory === category
                      ? 'bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 text-white shadow-lg scale-105'
                      : 'bg-white text-gray-700 hover:bg-gray-100 shadow'
                  }`}
                >
                  {category === 'all' 
                    ? (lang === 'nl' ? 'Alles' : 'All')
                    : category.charAt(0).toUpperCase() + category.slice(1)}
                </button>
              ))}
            </div>
          </div>

          {/* Products Grid */}
          {filteredProducts.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredProducts.map((product) => (
                <ProductCard key={product.id} product={product} lang={lang} />
              ))}
            </div>
            
          ) : (
            <div className="text-center py-20">
              <div className="text-6xl mb-4">🔍</div>
              <p className="text-xl text-gray-600">
                {lang === 'nl' 
                  ? 'Geen producten gevonden in deze categorie' 
                  : 'No products found in this category'}
              </p>
            </div>
          )}
        </div>
      </main>

      <Footer lang={lang} />
    </>
  );
}