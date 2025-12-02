'use client';

import { useState, useEffect } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { products } from '@/data/products';
import { translations } from '@/lib/translations';

export default function ShopPage() {
  const [lang, setLang] = useState('nl');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [scrollY, setScrollY] = useState(0);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [hoveredProduct, setHoveredProduct] = useState(null);
  const t = translations[lang];

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    const handleMouseMove = (e) => setMousePos({ x: e.clientX, y: e.clientY });

    window.addEventListener('scroll', handleScroll);
    window.addEventListener('mousemove', handleMouseMove);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  const filteredProducts = selectedCategory === 'all' 
    ? products 
    : products.filter(p => p.category === selectedCategory);

  const categories = ['all', ...new Set(products.map(p => p.category))];

  return (
    <>
      <Header lang={lang} setLang={setLang} />
      
      {/* Animated Blob Background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
        {[...Array(6)].map((_, i) => (
          <div
            key={i}
            className="absolute w-96 h-96 rounded-full mix-blend-multiply filter blur-3xl opacity-60 animate-blob"
            style={{
              background: `radial-gradient(circle, 
                hsl(${i * 60}, 80%, 60%), 
                hsl(${i * 60 + 30}, 70%, 70%))`,
              left: `${(i * 15) % 80}%`,
              top: `${(i * 25) % 80}%`,
              animationDelay: `${i * 0.7}s`,
              animationDuration: `${20 + i * 2}s`,
            }}
          />
        ))}
      </div>

      <main className="pt-24 min-h-screen relative z-10">
        {/* Hero Section with Scroll Animation */}
        <section className="relative py-32 overflow-hidden">
          <div 
            className="container mx-auto px-4 text-center"
            style={{
              transform: `translateY(${scrollY * 0.3}px)`,
              opacity: 1 - scrollY * 0.002,
            }}
          >
            <h1 className="text-8xl md:text-9xl font-black mb-6 leading-none">
              {'SHOP'.split('').map((letter, i) => (
                <span
                  key={i}
                  className="inline-block animate-float hover-glow cursor-pointer"
                  style={{
                    animationDelay: `${i * 0.1}s`,
                    background: `linear-gradient(135deg, 
                      hsl(${(i * 90) % 360}, 80%, 60%), 
                      hsl(${(i * 90 + 60) % 360}, 80%, 70%))`,
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    backgroundClip: 'text',
                    transform: `translateY(${Math.sin(scrollY * 0.01 + i) * 20}px) 
                               rotateZ(${Math.sin(scrollY * 0.005 + i) * 10}deg)`,
                  }}
                >
                  {letter}
                </span>
              ))}
            </h1>

            <p 
              className="text-3xl font-light text-gray-700 mb-8"
              style={{
                transform: `translateY(${scrollY * 0.2}px)`,
              }}
            >
              {t.shop.description}
            </p>

            {/* Animated Icons */}
            <div className="flex justify-center gap-8 text-6xl">
              {['🌈', '✨', '🎨', '💝'].map((emoji, i) => (
                <div
                  key={i}
                  className="animate-bounce"
                  style={{
                    animationDelay: `${i * 0.2}s`,
                    animationDuration: '2s',
                  }}
                >
                  {emoji}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Category Filter with Morphing Background */}
        <div className="container mx-auto px-4 mb-16">
          <div 
            className="flex flex-wrap justify-center gap-4"
            style={{
              transform: `translateY(${Math.max(0, 100 - scrollY * 0.2)}px)`,
            }}
          >
            {categories.map((category, i) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className="relative px-8 py-4 text-xl font-bold rounded-full overflow-hidden transform transition-all duration-500 hover:scale-110 group"
                style={{
                  background: selectedCategory === category
                    ? 'linear-gradient(135deg, #e40303, #ff8c00, #ffed00, #008026, #24408e, #732982)'
                    : 'white',
                  backgroundSize: '400% 400%',
                  animation: selectedCategory === category ? 'gradient-shift 8s ease infinite' : 'none',
                  color: selectedCategory === category ? 'white' : '#6B46C1',
                  boxShadow: selectedCategory === category 
                    ? '0 10px 40px rgba(148, 0, 211, 0.5)' 
                    : '0 4px 20px rgba(0, 0, 0, 0.1)',
                  animationDelay: `${i * 0.1}s`,
                }}
              >
                <span className="relative z-10">
                  {category === 'all' 
                    ? (lang === 'nl' ? '✨ Alles' : '✨ All')
                    : `${['🎨', '📚', '🛍️'][i % 3]} ${category.charAt(0).toUpperCase() + category.slice(1)}`}
                </span>
                
                {selectedCategory !== category && (
                  <div 
                    className="absolute inset-0 bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 opacity-0 group-hover:opacity-20 transition-opacity"
                    style={{
                      backgroundSize: '400% 400%',
                      animation: 'gradient-shift 8s ease infinite',
                    }}
                  />
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Products Grid with Stagger Animation */}
        <div className="container mx-auto px-4 pb-32">
          {filteredProducts.length > 0 ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-12">
              {filteredProducts.map((product, i) => (
                <div
                  key={product.id}
                  className="group relative"
                  onMouseEnter={() => setHoveredProduct(product.id)}
                  onMouseLeave={() => setHoveredProduct(null)}
                  style={{
                    transform: `translateY(${Math.max(0, 200 - (scrollY - 400) * 0.5 - i * 30)}px) 
                               rotateY(${hoveredProduct === product.id ? 10 : 0}deg)
                               scale(${hoveredProduct === product.id ? 1.05 : 1})`,
                    opacity: Math.min(1, (scrollY - 200 + i * 50) / 300),
                    transformStyle: 'preserve-3d',
                    transition: 'all 0.5s cubic-bezier(0.34, 1.56, 0.64, 1)',
                  }}
                >
                  {/* Card Container */}
                  <div className="relative overflow-hidden rounded-3xl bg-white shadow-2xl">
                    {/* Animated Border */}
                    <div 
                      className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-10"
                      style={{
                        background: 'linear-gradient(135deg, #e40303, #ff8c00, #ffed00, #008026, #24408e, #732982)',
                        backgroundSize: '400% 400%',
                        animation: 'gradient-shift 8s ease infinite',
                        padding: '4px',
                        borderRadius: '1.5rem',
                        WebkitMask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
                        WebkitMaskComposite: 'xor',
                        maskComposite: 'exclude',
                      }}
                    />

                    {/* Glowing Overlay */}
                    <div 
                      className="absolute inset-0 bg-gradient-to-br from-pink-500/20 via-purple-500/20 to-blue-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-0"
                      style={{
                        backgroundSize: '400% 400%',
                        animation: 'gradient-shift 10s ease infinite',
                      }}
                    />

                    {/* Image Section */}
                    <div className="relative h-96 overflow-hidden">
                      <img 
                        src={product.images[0]}
                        alt={product.name[lang]}
                        className="w-full h-full object-cover transform group-hover:scale-125 group-hover:rotate-3 transition-all duration-1000"
                        onError={(e) => {
                          const colors = ['FF1493', '9D4EDD', '4EA8DE', 'FFD700', '00CED1', 'FF69B4'];
                          e.target.src = `https://via.placeholder.com/600x800/${colors[i % colors.length]}/FFFFFF?text=${encodeURIComponent(product.name.en)}`;
                        }}
                      />

                      {/* Floating Price Tag */}
                      <div 
                        className="absolute top-4 right-4 px-6 py-3 rounded-full font-black text-2xl text-white transform group-hover:scale-110 group-hover:rotate-12 transition-all duration-500"
                        style={{
                          background: 'linear-gradient(135deg, #e40303, #ff8c00)',
                          boxShadow: '0 8px 30px rgba(228, 3, 3, 0.5)',
                        }}
                      >
                        €{product.price.toFixed(2)}
                      </div>

                      {/* Category Badge */}
                      <div 
                        className="absolute bottom-4 left-4 px-4 py-2 rounded-full backdrop-blur-xl font-bold text-white text-sm transform group-hover:translate-x-2 transition-transform"
                        style={{
                          background: 'rgba(255, 255, 255, 0.2)',
                          border: '2px solid rgba(255, 255, 255, 0.3)',
                        }}
                      >
                        {product.category}
                      </div>
                    </div>

                    {/* Content Section */}
                    <div className="p-8 relative z-10">
                      <h3 
                        className="text-3xl font-black mb-3 group-hover:text-transparent group-hover:bg-clip-text transition-all"
                        style={{
                          background: hoveredProduct === product.id 
                            ? 'linear-gradient(135deg, #e40303, #ff8c00, #ffed00, #008026, #24408e, #732982)'
                            : 'none',
                          backgroundSize: '400% 400%',
                          animation: hoveredProduct === product.id ? 'gradient-shift 8s ease infinite' : 'none',
                          WebkitBackgroundClip: hoveredProduct === product.id ? 'text' : 'unset',
                          WebkitTextFillColor: hoveredProduct === product.id ? 'transparent' : 'inherit',
                          backgroundClip: hoveredProduct === product.id ? 'text' : 'unset',
                        }}
                      >
                        {product.name[lang]}
                      </h3>

                      <p className="text-gray-600 mb-6 line-clamp-2">
                        {product.description[lang]}
                      </p>

                      {/* Add to Cart Button */}
                      <button 
                        className="w-full py-4 text-xl font-bold text-white rounded-full transform transition-all duration-500 group-hover:shadow-2xl relative overflow-hidden"
                        style={{
                          background: 'linear-gradient(135deg, #e40303, #ff8c00, #ffed00, #008026, #24408e, #732982)',
                          backgroundSize: '400% 400%',
                          animation: 'gradient-shift 8s ease infinite',
                        }}
                      >
                        <span className="relative z-10 flex items-center justify-center gap-2">
                          🛒 {t.shop.addToCart}
                        </span>
                      </button>

                      {/* Multiple Images Indicator */}
                      {product.images.length > 1 && (
                        <div className="flex justify-center gap-2 mt-4">
                          {product.images.map((_, idx) => (
                            <div
                              key={idx}
                              className="w-2 h-2 rounded-full bg-gradient-to-r from-pink-500 to-purple-500 animate-pulse"
                              style={{ animationDelay: `${idx * 0.2}s` }}
                            />
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div 
              className="text-center py-32"
              style={{
                transform: `translateY(${Math.max(0, 100 - scrollY * 0.3)}px)`,
              }}
            >
              <div className="text-9xl mb-8 animate-bounce">🔍</div>
              <p className="text-3xl font-bold gradient-text">
                {lang === 'nl' 
                  ? 'Geen producten gevonden' 
                  : 'No products found'}
              </p>
            </div>
          )}
        </div>

        {/* CTA Section */}
        <section 
          className="py-40 relative overflow-hidden"
          style={{
            transform: `translateY(${Math.max(0, 300 - (scrollY - 1200) * 0.4)}px)`,
            opacity: Math.min(1, (scrollY - 1000) / 400),
          }}
        >
          <div className="container mx-auto px-4 text-center">
            <div 
              className="relative inline-block p-12 rounded-3xl"
              style={{
                background: 'linear-gradient(135deg, rgba(228, 3, 3, 0.1), rgba(255, 140, 0, 0.1), rgba(255, 237, 0, 0.1), rgba(0, 128, 38, 0.1), rgba(36, 64, 142, 0.1), rgba(115, 41, 130, 0.1))',
                backdropFilter: 'blur(20px)',
              }}
            >
              <h2 className="text-6xl font-black gradient-text mb-6">
                {lang === 'nl' ? 'Vragen? Neem Contact Op!' : 'Questions? Get in Touch!'}
              </h2>
              <a href="/contact">
                <button 
                  className="px-12 py-6 text-2xl font-bold text-white rounded-full transform hover:scale-110 transition-all"
                  style={{
                    background: 'linear-gradient(135deg, #e40303, #ff8c00, #ffed00, #008026, #24408e, #732982)',
                    backgroundSize: '400% 400%',
                    animation: 'gradient-shift 8s ease infinite',
                    boxShadow: '0 15px 50px rgba(148, 0, 211, 0.5)',
                  }}
                >
                  💌 {lang === 'nl' ? 'Contact' : 'Contact'}
                </button>
              </a>
            </div>
          </div>
        </section>
      </main>

      <Footer lang={lang} />
    </>
  );
}