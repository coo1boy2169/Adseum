'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function ImagesAdmin() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [uploadedImages, setUploadedImages] = useState([]);
  const [copiedUrl, setCopiedUrl] = useState('');
  const router = useRouter();

  useEffect(() => {
    const loggedIn = localStorage.getItem('adminLoggedIn');
    if (loggedIn !== 'true') {
      router.push('/admin/login');
    } else {
      setIsLoggedIn(true);
      loadImages();
    }
  }, [router]);

  const loadImages = () => {
    const saved = localStorage.getItem('uploadedImages');
    if (saved) {
      setUploadedImages(JSON.parse(saved));
    }
  };

  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files);
    
    files.forEach(file => {
      const reader = new FileReader();
      reader.onload = (event) => {
        const newImage = {
          id: Date.now() + Math.random(),
          name: file.name,
          url: event.target.result, // Base64 data URL
          uploadDate: new Date().toISOString()
        };

        const updated = [...uploadedImages, newImage];
        setUploadedImages(updated);
        localStorage.setItem('uploadedImages', JSON.stringify(updated));
      };
      reader.readAsDataURL(file);
    });
  };

  const handleDelete = (id) => {
    if (confirm('Weet je zeker dat je deze afbeelding wilt verwijderen?')) {
      const updated = uploadedImages.filter(img => img.id !== id);
      setUploadedImages(updated);
      localStorage.setItem('uploadedImages', JSON.stringify(updated));
    }
  };

  const copyToClipboard = (url) => {
    navigator.clipboard.writeText(url);
    setCopiedUrl(url);
    setTimeout(() => setCopiedUrl(''), 2000);
  };

  if (!isLoggedIn) return null;

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
                <h1 className="text-2xl font-black gradient-text">Afbeeldingen Beheren</h1>
                <p className="text-sm text-gray-600">Upload en organiseer je afbeeldingen</p>
              </div>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-12">
        {/* Upload Section */}
        <div className="bg-white rounded-3xl shadow-xl p-12 mb-12 text-center">
          <div className="text-8xl mb-6">📸</div>
          <h2 className="text-4xl font-black gradient-text mb-4">Upload Afbeeldingen</h2>
          <p className="text-gray-600 mb-8">
            Sleep je afbeeldingen hier of klik om te uploaden
          </p>

          <label className="relative inline-block cursor-pointer">
            <input
              type="file"
              accept="image/*"
              multiple
              onChange={handleImageUpload}
              className="hidden"
            />
            <div 
              className="px-12 py-6 text-2xl font-bold text-white rounded-2xl transform hover:scale-105 transition-all"
              style={{
                background: 'linear-gradient(135deg, #e40303, #ff8c00, #ffed00, #008026, #24408e, #732982)',
                backgroundSize: '400% 400%',
                animation: 'gradient-shift 8s ease infinite',
              }}
            >
              📁 Selecteer Afbeeldingen
            </div>
          </label>

          <div className="mt-8 p-6 bg-yellow-50 border-2 border-yellow-300 rounded-2xl text-left">
            <h3 className="font-bold text-yellow-800 mb-2 flex items-center gap-2">
              <span className="text-2xl">💡</span>
              Hoe te gebruiken:
            </h3>
            <ol className="space-y-2 text-sm text-yellow-700">
              <li>1️⃣ Upload je afbeelding hier</li>
              <li>2️⃣ Klik op "Kopieer URL" bij de afbeelding</li>
              <li>3️⃣ Plak de URL in het Product of Artwork formulier</li>
              <li>4️⃣ De afbeelding wordt automatisch getoond op je website!</li>
            </ol>
          </div>
        </div>

        {/* Images Grid */}
        {uploadedImages.length > 0 ? (
          <div>
            <h2 className="text-3xl font-black gradient-text mb-8">
              Geüploade Afbeeldingen ({uploadedImages.length})
            </h2>
            <div className="grid md:grid-cols-3 lg:grid-cols-4 gap-6">
              {uploadedImages.map((image) => (
                <div key={image.id} className="bg-white rounded-2xl shadow-xl overflow-hidden transform hover:scale-105 transition-all">
                  <div className="aspect-square bg-gray-100">
                    <img
                      src={image.url}
                      alt={image.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="p-4">
                    <p className="text-sm font-semibold text-gray-700 truncate mb-2">
                      {image.name}
                    </p>
                    <div className="flex gap-2">
                      <button
                        onClick={() => copyToClipboard(image.url)}
                        className="flex-1 py-2 bg-blue-500 text-white rounded-lg text-sm font-bold hover:bg-blue-600 transition-colors"
                      >
                        {copiedUrl === image.url ? '✓ Gekopieerd!' : '📋 Kopieer URL'}
                      </button>
                      <button
                        onClick={() => handleDelete(image.id)}
                        className="px-3 py-2 bg-red-500 text-white rounded-lg text-sm font-bold hover:bg-red-600"
                      >
                        🗑️
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div className="text-center py-20 bg-white rounded-3xl">
            <div className="text-9xl mb-4">🖼️</div>
            <p className="text-2xl text-gray-600">
              Nog geen afbeeldingen geüpload
            </p>
            <p className="text-gray-500">
              Upload je eerste afbeelding om te beginnen!
            </p>
          </div>
        )}

        {/* Info Box */}
        <div className="mt-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-3xl p-8 text-white">
          <h3 className="text-2xl font-black mb-4">ℹ️ Belangrijk!</h3>
          <div className="space-y-2 text-sm">
            <p>• Afbeeldingen worden opgeslagen in je browser (localStorage)</p>
            <p>• Voor een productie website, gebruik een echte bestandsserver</p>
            <p>• Ondersteunde formaten: JPG, PNG, GIF, WebP</p>
            <p>• Aanbevolen: Optimaliseer afbeeldingen voor web (max 1MB)</p>
          </div>
        </div>
      </main>
    </div>
  );
}