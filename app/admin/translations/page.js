'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { translations as defaultTranslations } from '@/lib/translations';

export default function TranslationsAdmin() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [translations, setTranslations] = useState(defaultTranslations);
  const [activeTab, setActiveTab] = useState('nav');
  const [saved, setSaved] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const loggedIn = localStorage.getItem('adminLoggedIn');
    if (loggedIn !== 'true') {
      router.push('/admin/login');
    } else {
      setIsLoggedIn(true);
      loadTranslations();
    }
  }, [router]);

  const loadTranslations = () => {
    const saved = localStorage.getItem('translations');
    if (saved) {
      setTranslations(JSON.parse(saved));
    }
  };

  const handleSave = () => {
    localStorage.setItem('translations', JSON.stringify(translations));
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
    
    // Update translations.js file (in een echte app zou dit via API gaan)
    alert('✅ Vertalingen opgeslagen! Herlaad de website om de wijzigingen te zien.');
  };

  const updateTranslation = (lang, section, key, value) => {
    setTranslations(prev => ({
      ...prev,
      [lang]: {
        ...prev[lang],
        [section]: {
          ...prev[lang][section],
          [key]: value
        }
      }
    }));
  };

  if (!isLoggedIn) return null;

  const tabs = [
    { key: 'nav', label: '🧭 Navigatie', icon: '🧭' },
    { key: 'hero', label: '🌟 Hero', icon: '🌟' },
    { key: 'shop', label: '🛍️ Shop', icon: '🛍️' },
    { key: 'artwork', label: '🎨 Artwork', icon: '🎨' },
    { key: 'contact', label: '📧 Contact', icon: '📧' },
    { key: 'footer', label: '📄 Footer', icon: '📄' }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50">
      <header className="bg-white/80 backdrop-blur-lg shadow-lg sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Link href="/admin/dashboard">
                <button className="text-3xl hover:scale-110 transition-transform">←</button>
              </Link>
              <div>
                <h1 className="text-2xl font-black gradient-text">Vertalingen Beheren</h1>
                <p className="text-sm text-gray-600">Pas teksten aan in NL en EN</p>
              </div>
            </div>
            <button
              onClick={handleSave}
              className="px-6 py-3 font-bold text-white rounded-full transform hover:scale-105 transition-all"
              style={{
                background: saved 
                  ? 'linear-gradient(135deg, #10b981, #059669)' 
                  : 'linear-gradient(135deg, #e40303, #ff8c00, #ffed00, #008026, #24408e, #732982)',
                backgroundSize: '400% 400%',
                animation: 'gradient-shift 8s ease infinite',
              }}
            >
              {saved ? '✓ Opgeslagen!' : '💾 Opslaan'}
            </button>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-12">
        {/* Tabs */}
        <div className="flex flex-wrap gap-2 mb-8">
          {tabs.map((tab) => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              className={`px-6 py-3 rounded-full font-bold transition-all ${
                activeTab === tab.key
                  ? 'bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 text-white shadow-lg scale-105'
                  : 'bg-white text-gray-700 hover:bg-gray-100 shadow'
              }`}
            >
              {tab.icon} {tab.label}
            </button>
          ))}
        </div>

        {/* Translation Forms */}
        <div className="grid lg:grid-cols-2 gap-8">
          {/* Nederlands */}
          <div className="bg-white rounded-3xl shadow-xl p-8">
            <div className="flex items-center gap-3 mb-6">
              <div className="text-4xl">🇳🇱</div>
              <div>
                <h2 className="text-3xl font-black text-orange-600">Nederlands</h2>
                <p className="text-sm text-gray-600">NL vertalingen</p>
              </div>
            </div>

            <div className="space-y-4">
              {translations.nl[activeTab] && Object.entries(translations.nl[activeTab]).map(([key, value]) => (
                <div key={key}>
                  <label className="block font-bold text-gray-700 mb-2 text-sm uppercase">
                    {key}
                  </label>
                  {typeof value === 'string' && value.length > 50 ? (
                    <textarea
                      value={value}
                      onChange={(e) => updateTranslation('nl', activeTab, key, e.target.value)}
                      className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:border-orange-500 focus:outline-none resize-none"
                      rows="3"
                    />
                  ) : (
                    <input
                      type="text"
                      value={value}
                      onChange={(e) => updateTranslation('nl', activeTab, key, e.target.value)}
                      className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:border-orange-500 focus:outline-none"
                    />
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Engels */}
          <div className="bg-white rounded-3xl shadow-xl p-8">
            <div className="flex items-center gap-3 mb-6">
              <div className="text-4xl">🇬🇧</div>
              <div>
                <h2 className="text-3xl font-black text-blue-600">English</h2>
                <p className="text-sm text-gray-600">EN translations</p>
              </div>
            </div>

            <div className="space-y-4">
              {translations.en[activeTab] && Object.entries(translations.en[activeTab]).map(([key, value]) => (
                <div key={key}>
                  <label className="block font-bold text-gray-700 mb-2 text-sm uppercase">
                    {key}
                  </label>
                  {typeof value === 'string' && value.length > 50 ? (
                    <textarea
                      value={value}
                      onChange={(e) => updateTranslation('en', activeTab, key, e.target.value)}
                      className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:border-blue-500 focus:outline-none resize-none"
                      rows="3"
                    />
                  ) : (
                    <input
                      type="text"
                      value={value}
                      onChange={(e) => updateTranslation('en', activeTab, key, e.target.value)}
                      className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:border-blue-500 focus:outline-none"
                    />
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Help Section */}
        <div className="mt-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-3xl p-8 text-white">
          <div className="flex items-start gap-6">
            <div className="text-6xl">📝</div>
            <div>
              <h3 className="text-2xl font-black mb-3">Tips voor Vertalingen</h3>
              <ul className="space-y-2 text-sm">
                <li>✅ Houd vertalingen kort en krachtig</li>
                <li>✅ Gebruik dezelfde toon in beide talen</li>
                <li>✅ Test altijd hoe de tekst eruit ziet op de website</li>
                <li>✅ Denk aan mobiele weergave (kortere teksten)</li>
                <li>✅ Gebruik emoji's voor extra impact! 🎨✨</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Save Button (Bottom) */}
        <div className="mt-8 text-center">
          <button
            onClick={handleSave}
            className="px-16 py-6 text-2xl font-black text-white rounded-2xl transform hover:scale-105 transition-all shadow-2xl"
            style={{
              background: 'linear-gradient(135deg, #e40303, #ff8c00, #ffed00, #008026, #24408e, #732982)',
              backgroundSize: '400% 400%',
              animation: 'gradient-shift 8s ease infinite',
            }}
          >
            💾 Alle Wijzigingen Opslaan
          </button>
        </div>
      </main>
    </div>
  );
}