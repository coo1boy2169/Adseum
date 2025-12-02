'use client';

import { useState, useEffect } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { translations } from '@/lib/translations';

export default function ContactPage() {
  const [lang, setLang] = useState('nl');
  const [scrollY, setScrollY] = useState(0);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [submitted, setSubmitted] = useState(false);
  const [focusedField, setFocusedField] = useState(null);
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

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setFormData({ name: '', email: '', message: '' });
    }, 4000);
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <>
      <Header lang={lang} setLang={setLang} />
      
      {/* Animated Background Particles */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute rounded-full"
            style={{
              width: `${Math.random() * 100 + 50}px`,
              height: `${Math.random() * 100 + 50}px`,
              background: `radial-gradient(circle, 
                hsl(${i * 18}, 80%, 70%), 
                hsl(${i * 18 + 60}, 70%, 60%))`,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              opacity: 0.3,
              filter: 'blur(40px)',
              animation: `float ${15 + Math.random() * 10}s ease-in-out infinite`,
              animationDelay: `${Math.random() * 5}s`,
            }}
          />
        ))}
      </div>

      <main className="pt-24 min-h-screen relative z-10">
        {/* Hero Section */}
        <section className="relative py-32 overflow-hidden">
          <div 
            className="container mx-auto px-4 text-center"
            style={{
              transform: `translateY(${scrollY * 0.3}px)`,
              opacity: 1 - scrollY * 0.002,
            }}
          >
            <h1 className="text-8xl md:text-9xl font-black mb-8">
              {'CONTACT'.split('').map((letter, i) => (
                <span
                  key={i}
                  className="inline-block"
                  style={{
                    animation: 'float 3s ease-in-out infinite, rainbow-text 8s linear infinite',
                    animationDelay: `${i * 0.15}s`,
                    transform: `
                      translateY(${Math.sin(scrollY * 0.01 + i) * 25}px)
                      rotateZ(${Math.sin(scrollY * 0.008 + i) * 12}deg)
                    `,
                    textShadow: `
                      0 0 30px hsl(${(i * 60) % 360}, 80%, 60%),
                      0 0 60px hsl(${(i * 60) % 360}, 80%, 60%)
                    `,
                  }}
                >
                  {letter}
                </span>
              ))}
            </h1>

            <p 
              className="text-3xl font-light text-gray-700 mb-12"
              style={{
                transform: `translateY(${scrollY * 0.2}px)`,
              }}
            >
              {t.contact.description}
            </p>

            {/* Emoji Line */}
            <div className="flex justify-center gap-8 text-6xl">
              {['💌', '✨', '🌈', '💝'].map((emoji, i) => (
                <div
                  key={i}
                  className="animate-bounce"
                  style={{
                    animationDelay: `${i * 0.2}s`,
                    animationDuration: '2.5s',
                    transform: `scale(${1 + Math.sin(scrollY * 0.02 + i) * 0.2})`,
                  }}
                >
                  {emoji}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Contact Form & Info Section */}
        <div className="container mx-auto px-4 pb-32">
          <div className="grid lg:grid-cols-2 gap-16 max-w-7xl mx-auto">
            {/* Contact Form */}
            <div
              style={{
                transform: `translateY(${Math.max(0, 200 - (scrollY - 400) * 0.6)}px) 
                           rotateY(${(mousePos.x - window.innerWidth / 2) * 0.01}deg)`,
                opacity: Math.min(1, (scrollY - 200) / 300),
                transformStyle: 'preserve-3d',
              }}
            >
              <div 
                className="relative p-12 rounded-3xl shadow-2xl overflow-hidden"
                style={{
                  background: 'rgba(255, 255, 255, 0.9)',
                  backdropFilter: 'blur(20px)',
                }}
              >
                {/* Animated Border */}
                <div 
                  className="absolute -inset-1 rounded-3xl blur-xl opacity-75"
                  style={{
                    background: 'linear-gradient(135deg, #e40303, #ff8c00, #ffed00, #008026, #24408e, #732982)',
                    backgroundSize: '400% 400%',
                    animation: 'gradient-shift 8s ease infinite',
                    zIndex: -1,
                  }}
                />

                <h2 
                  className="text-5xl font-black mb-8 gradient-text"
                  style={{
                    animation: 'slideInLeft 0.6s ease',
                  }}
                >
                  {lang === 'nl' ? 'Stuur Bericht' : 'Send Message'}
                </h2>

                {submitted ? (
                  <div 
                    className="text-center py-20"
                    style={{
                      animation: 'scaleIn 0.6s cubic-bezier(0.34, 1.56, 0.64, 1)',
                    }}
                  >
                    <div 
                      className="text-9xl mb-6 animate-bounce"
                      style={{
                        filter: 'drop-shadow(0 0 30px rgba(255, 215, 0, 0.8))',
                      }}
                    >
                      ✓
                    </div>
                    <p className="text-4xl font-black gradient-text mb-4">
                      {lang === 'nl' ? 'Verstuurd!' : 'Sent!'}
                    </p>
                    <p className="text-xl text-gray-600">
                      {lang === 'nl' 
                        ? 'We nemen zo snel mogelijk contact op!' 
                        : "We'll get back to you ASAP!"}
                    </p>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-8">
                    {/* Name Field */}
                    <div className="relative">
                      <label className="block text-xl font-bold text-gray-800 mb-3">
                        {t.contact.name}
                      </label>
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        onFocus={() => setFocusedField('name')}
                        onBlur={() => setFocusedField(null)}
                        required
                        className="w-full px-6 py-4 text-lg border-4 rounded-2xl transition-all duration-300 focus:outline-none"
                        placeholder={lang === 'nl' ? 'Jouw naam...' : 'Your name...'}
                        style={{
                          borderColor: focusedField === 'name' ? '#9D4EDD' : '#E5E7EB',
                          transform: focusedField === 'name' ? 'scale(1.02)' : 'scale(1)',
                          boxShadow: focusedField === 'name' 
                            ? '0 10px 40px rgba(157, 78, 221, 0.3)' 
                            : '0 4px 10px rgba(0, 0, 0, 0.1)',
                        }}
                      />
                      {focusedField === 'name' && (
                        <div 
                          className="absolute -top-2 -right-2 text-4xl animate-spin-slow"
                          style={{ animation: 'spin-slow 3s linear infinite' }}
                        >
                          ✨
                        </div>
                      )}
                    </div>

                    {/* Email Field */}
                    <div className="relative">
                      <label className="block text-xl font-bold text-gray-800 mb-3">
                        {t.contact.email}
                      </label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        onFocus={() => setFocusedField('email')}
                        onBlur={() => setFocusedField(null)}
                        required
                        className="w-full px-6 py-4 text-lg border-4 rounded-2xl transition-all duration-300 focus:outline-none"
                        placeholder={lang === 'nl' ? 'jouw@email.com' : 'your@email.com'}
                        style={{
                          borderColor: focusedField === 'email' ? '#4EA8DE' : '#E5E7EB',
                          transform: focusedField === 'email' ? 'scale(1.02)' : 'scale(1)',
                          boxShadow: focusedField === 'email' 
                            ? '0 10px 40px rgba(78, 168, 222, 0.3)' 
                            : '0 4px 10px rgba(0, 0, 0, 0.1)',
                        }}
                      />
                      {focusedField === 'email' && (
                        <div 
                          className="absolute -top-2 -right-2 text-4xl animate-bounce"
                        >
                          💌
                        </div>
                      )}
                    </div>

                    {/* Message Field */}
                    <div className="relative">
                      <label className="block text-xl font-bold text-gray-800 mb-3">
                        {t.contact.message}
                      </label>
                      <textarea
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        onFocus={() => setFocusedField('message')}
                        onBlur={() => setFocusedField(null)}
                        required
                        rows="6"
                        className="w-full px-6 py-4 text-lg border-4 rounded-2xl transition-all duration-300 focus:outline-none resize-none"
                        placeholder={lang === 'nl' ? 'Jouw bericht...' : 'Your message...'}
                        style={{
                          borderColor: focusedField === 'message' ? '#FF69B4' : '#E5E7EB',
                          transform: focusedField === 'message' ? 'scale(1.02)' : 'scale(1)',
                          boxShadow: focusedField === 'message' 
                            ? '0 10px 40px rgba(255, 105, 180, 0.3)' 
                            : '0 4px 10px rgba(0, 0, 0, 0.1)',
                        }}
                      />
                      {focusedField === 'message' && (
                        <div 
                          className="absolute -top-2 -right-2 text-4xl"
                          style={{
                            animation: 'float 2s ease-in-out infinite',
                          }}
                        >
                          🌈
                        </div>
                      )}
                    </div>

                    {/* Submit Button */}
                    <button 
                      type="submit"
                      className="w-full py-6 text-2xl font-black text-white rounded-2xl transform transition-all duration-500 hover:scale-105 relative overflow-hidden group"
                      style={{
                        background: 'linear-gradient(135deg, #e40303, #ff8c00, #ffed00, #008026, #24408e, #732982)',
                        backgroundSize: '400% 400%',
                        animation: 'gradient-shift 8s ease infinite',
                        boxShadow: '0 15px 50px rgba(148, 0, 211, 0.5)',
                      }}
                    >
                      <span className="relative z-10 flex items-center justify-center gap-3">
                        {t.contact.send}
                        <svg 
                          className="w-8 h-8 transform group-hover:translate-x-2 transition-transform" 
                          fill="none" 
                          stroke="currentColor" 
                          viewBox="0 0 24 24"
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M14 5l7 7m0 0l-7 7m7-7H3"/>
                        </svg>
                      </span>
                    </button>
                  </form>
                )}
              </div>
            </div>

            {/* Contact Info Cards */}
            <div 
              className="space-y-8"
              style={{
                transform: `translateY(${Math.max(0, 300 - (scrollY - 400) * 0.6)}px)`,
                opacity: Math.min(1, (scrollY - 300) / 300),
              }}
            >
              {/* Email Card */}
              <div 
                className="group relative p-8 rounded-3xl shadow-xl transform transition-all duration-500 hover:scale-105 cursor-pointer"
                style={{
                  background: 'rgba(255, 255, 255, 0.9)',
                  backdropFilter: 'blur(20px)',
                }}
              >
                <div 
                  className="absolute -inset-0.5 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity blur-xl"
                  style={{
                    background: 'linear-gradient(135deg, #e40303, #ff8c00)',
                    backgroundSize: '400% 400%',
                    animation: 'gradient-shift 8s ease infinite',
                  }}
                />
                <div className="relative flex items-start gap-6">
                  <div 
                    className="text-5xl p-4 rounded-2xl transform group-hover:scale-110 group-hover:rotate-12 transition-all"
                    style={{
                      background: 'linear-gradient(135deg, #e40303, #ff8c00)',
                      boxShadow: '0 8px 30px rgba(228, 3, 3, 0.4)',
                    }}
                  >
                    📧
                  </div>
                  <div>
                    <h3 className="text-3xl font-black text-gray-900 mb-2">Email</h3>
                    <a 
                      href="mailto:info@padseum.com" 
                      className="text-2xl font-bold gradient-text hover:underline"
                    >
                      info@adseum.com
                    </a>
                  </div>
                </div>
              </div>

              {/* Phone Card */}
              <div 
                className="group relative p-8 rounded-3xl shadow-xl transform transition-all duration-500 hover:scale-105 cursor-pointer"
                style={{
                  background: 'rgba(255, 255, 255, 0.9)',
                  backdropFilter: 'blur(20px)',
                  animationDelay: '0.1s',
                }}
              >
                <div 
                  className="absolute -inset-0.5 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity blur-xl"
                  style={{
                    background: 'linear-gradient(135deg, #ffed00, #008026)',
                    backgroundSize: '400% 400%',
                    animation: 'gradient-shift 8s ease infinite',
                  }}
                />
                <div className="relative flex items-start gap-6">
                  <div 
                    className="text-5xl p-4 rounded-2xl transform group-hover:scale-110 group-hover:rotate-12 transition-all"
                    style={{
                      background: 'linear-gradient(135deg, #ffed00, #008026)',
                      boxShadow: '0 8px 30px rgba(255, 237, 0, 0.4)',
                    }}
                  >
                    📞
                  </div>
                  <div>
                    <h3 className="text-3xl font-black text-gray-900 mb-2">
                      {lang === 'nl' ? 'Telefoon' : 'Phone'}
                    </h3>
                    <a 
                      href="tel:+31612345678" 
                      className="text-2xl font-bold gradient-text hover:underline"
                    >
                      +31 6 12345678
                    </a>
                  </div>
                </div>
              </div>

              {/* Social Media Card */}
              <div 
                className="group relative p-8 rounded-3xl shadow-xl transform transition-all duration-500 hover:scale-105 cursor-pointer"
                style={{
                  background: 'rgba(255, 255, 255, 0.9)',
                  backdropFilter: 'blur(20px)',
                  animationDelay: '0.2s',
                }}
              >
                <div 
                  className="absolute -inset-0.5 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity blur-xl"
                  style={{
                    background: 'linear-gradient(135deg, #24408e, #732982)',
                    backgroundSize: '400% 400%',
                    animation: 'gradient-shift 8s ease infinite',
                  }}
                />
                <div className="relative">
                  <div 
                    className="text-5xl mb-4 inline-block p-4 rounded-2xl transform group-hover:scale-110 group-hover:rotate-12 transition-all"
                    style={{
                      background: 'linear-gradient(135deg, #24408e, #732982)',
                      boxShadow: '0 8px 30px rgba(115, 41, 130, 0.4)',
                    }}
                  >
                    🌐
                  </div>
                  <h3 className="text-3xl font-black text-gray-900 mb-4">Social Media</h3>
                  <div className="flex gap-4">
                    {['📷', '👍', '🐦'].map((emoji, i) => (
                      <div
                        key={i}
                        className="text-4xl transform hover:scale-125 transition-transform cursor-pointer"
                        style={{
                          filter: 'drop-shadow(0 4px 10px rgba(0, 0, 0, 0.2))',
                        }}
                      >
                        {emoji}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer lang={lang} />

      <style jsx>{`
        @keyframes slideInLeft {
          from {
            opacity: 0;
            transform: translateX(-50px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        @keyframes scaleIn {
          from {
            opacity: 0;
            transform: scale(0.5);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }
      `}</style>
    </>
  );
}