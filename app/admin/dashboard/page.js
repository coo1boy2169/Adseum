'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function AdminDashboard() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const router = useRouter();

  useEffect(() => {
    // Check if admin is logged in
    const loggedIn = localStorage.getItem('adminLoggedIn');
    if (loggedIn !== 'true') {
      router.push('/admin/login');
    } else {
      setIsLoggedIn(true);
    }
  }, [router]);

  const handleLogout = () => {
    localStorage.removeItem('adminLoggedIn');
    localStorage.removeItem('adminLoginTime');
    router.push('/admin/login');
  };

  if (!isLoggedIn) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-2xl font-bold">Loading...</div>
      </div>
    );
  }

  const menuItems = [
    {
      title: 'Producten Beheren',
      description: 'Producten toevoegen, bewerken of verwijderen',
      icon: '🛍️',
      href: '/admin/products',
      color: 'from-pink-500 to-rose-500'
    },
    {
      title: 'Artwork Beheren',
      description: 'Kunstwerken toevoegen, bewerken of verwijderen',
      icon: '🎨',
      href: '/admin/artwork',
      color: 'from-purple-500 to-indigo-500'
    },
    {
      title: 'Afbeeldingen Upload',
      description: 'Upload en beheer afbeeldingen',
      icon: '📸',
      href: '/admin/images',
      color: 'from-blue-500 to-cyan-500'
    },
    {
      title: 'Vertalingen',
      description: 'Teksten aanpassen in NL en EN',
      icon: '🌐',
      href: '/admin/translations',
      color: 'from-green-500 to-emerald-500'
    },
    {
      title: 'Contact Info',
      description: 'Email, telefoon en social media links',
      icon: '📞',
      href: '/admin/contact',
      color: 'from-yellow-500 to-orange-500'
    },
    {
      title: 'Website Bekijken',
      description: 'Ga naar de live website',
      icon: '🌈',
      href: '/',
      color: 'from-violet-500 to-purple-500'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-lg shadow-lg sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div 
                className="w-12 h-12 rounded-full flex items-center justify-center"
                style={{
                  background: 'linear-gradient(135deg, #e40303, #ff8c00, #ffed00, #008026, #24408e, #732982)',
                  backgroundSize: '400% 400%',
                  animation: 'gradient-shift 8s ease infinite',
                }}
              >
                <span className="text-2xl">⚡</span>
              </div>
              <div>
                <h1 className="text-2xl font-black gradient-text">Adseum CMS</h1>
                <p className="text-sm text-gray-600">Admin Dashboard</p>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <div className="text-right hidden sm:block">
                <p className="text-sm font-semibold text-gray-700">Welkom, Admin! 👋</p>
                <p className="text-xs text-gray-500">Beheer je website hier</p>
              </div>
              <button
                onClick={handleLogout}
                className="px-6 py-2 bg-red-500 text-white rounded-full font-bold hover:bg-red-600 transition-colors"
              >
                Uitloggen 🚪
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-12">
        {/* Welcome Banner */}
        <div 
          className="relative overflow-hidden rounded-3xl p-12 mb-12 text-center"
          style={{
            background: 'linear-gradient(135deg, rgba(228, 3, 3, 0.1), rgba(255, 140, 0, 0.1), rgba(255, 237, 0, 0.1), rgba(0, 128, 38, 0.1), rgba(36, 64, 142, 0.1), rgba(115, 41, 130, 0.1))',
            backdropFilter: 'blur(20px)',
          }}
        >
          <h2 className="text-5xl font-black gradient-text mb-4">
            Content Management Systeem
          </h2>
          <p className="text-xl text-gray-700">
            Beheer eenvoudig alle content van je Adseum website! 🌈✨
          </p>
        </div>

        {/* Menu Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {menuItems.map((item, index) => (
            <Link
              key={index}
              href={item.href}
              className="group relative"
              style={{
                animation: `slideInUp 0.6s ease ${index * 0.1}s both`,
              }}
            >
              <div className="bg-white rounded-3xl shadow-xl p-8 transform transition-all duration-500 hover:scale-105 hover:shadow-2xl relative overflow-hidden">
                {/* Animated Background */}
                <div 
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity"
                  style={{
                    background: `linear-gradient(135deg, ${item.color.split(' ')[0].replace('from-', '')}, ${item.color.split(' ')[1].replace('to-', '')})`,
                    backgroundSize: '400% 400%',
                    animation: 'gradient-shift 8s ease infinite',
                    opacity: 0.1,
                  }}
                />

                {/* Icon */}
                <div 
                  className="text-7xl mb-6 transform group-hover:scale-110 group-hover:rotate-12 transition-all inline-block"
                >
                  {item.icon}
                </div>

                {/* Content */}
                <div className="relative z-10">
                  <h3 className="text-2xl font-black text-gray-900 mb-3 group-hover:gradient-text transition-all">
                    {item.title}
                  </h3>
                  <p className="text-gray-600">
                    {item.description}
                  </p>
                </div>

                {/* Arrow */}
                <div className="absolute bottom-8 right-8 transform group-hover:translate-x-2 transition-transform">
                  <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"/>
                  </svg>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* Quick Stats */}
        <div className="mt-12 grid md:grid-cols-3 gap-6">
          <div className="bg-white rounded-2xl p-6 shadow-lg">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 font-semibold">Totaal Producten</p>
                <p className="text-4xl font-black gradient-text">4</p>
              </div>
              <div className="text-5xl">📦</div>
            </div>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-lg">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 font-semibold">Artwork Items</p>
                <p className="text-4xl font-black gradient-text">6</p>
              </div>
              <div className="text-5xl">🖼️</div>
            </div>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-lg">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 font-semibold">Talen</p>
                <p className="text-4xl font-black gradient-text">2</p>
              </div>
              <div className="text-5xl">🌍</div>
            </div>
          </div>
        </div>

        {/* Help Section */}
        <div className="mt-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-3xl p-8 text-white">
          <div className="flex items-start gap-6">
            <div className="text-6xl">💡</div>
            <div>
              <h3 className="text-2xl font-black mb-2">Hulp Nodig?</h3>
              <p className="text-lg mb-4">
                Klik op een van de opties hierboven om te beginnen met het bewerken van je website content.
                Alle wijzigingen worden automatisch opgeslagen!
              </p>
              <ul className="space-y-2 text-sm">
                <li>✅ Producten: Voeg nieuwe producten toe met afbeeldingen en prijzen</li>
                <li>✅ Artwork: Beheer je kunstwerk galerij</li>
                <li>✅ Afbeeldingen: Upload en organiseer alle media</li>
                <li>✅ Vertalingen: Pas teksten aan in Nederlands en Engels</li>
              </ul>
            </div>
          </div>
        </div>
      </main>

      <style jsx>{`
        @keyframes slideInUp {
          from {
            opacity: 0;
            transform: translateY(50px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  );
}