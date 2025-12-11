'use client';

import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function ArtworkAdmin() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [artworks, setArtworks] = useState([]);
  const [editingArtwork, setEditingArtwork] = useState(null);
  const [showAddForm, setShowAddForm] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const loggedIn = localStorage.getItem('adminLoggedIn');
    if (loggedIn !== 'true') {
      router.push('/admin/login');
    } else {
      setIsLoggedIn(true);
      loadArtworks();
    }
  }, [router]);

  const loadArtworks = () => {
    const saved = localStorage.getItem('artworks');
    if (saved) {
      setArtworks(JSON.parse(saved));
    } else {
      const defaultArtworks = [
        {
          id: 1,
          title: { nl: 'Liefde is Liefde', en: 'Love is Love' },
          description: { nl: 'Viering van diversiteit', en: 'Celebration of diversity' },
          image: '/artwork/piece1.jpg',
          year: 2024,
          medium: { nl: 'Digitale kunst', en: 'Digital art' }
        },
        {
          id: 2,
          title: { nl: 'Regenboog Hart', en: 'Rainbow Heart' },
          description: { nl: 'Liefde in al zijn vormen', en: 'Love in all its forms' },
          image: '/artwork/piece2.jpg',
          year: 2024,
          medium: { nl: 'Mixed media', en: 'Mixed media' }
        }
      ];
      setArtworks(defaultArtworks);
      localStorage.setItem('artworks', JSON.stringify(defaultArtworks));
    }
  };

  const saveArtworks = async (updatedArtworks) => {
    // Save to localStorage
    localStorage.setItem('artworks', JSON.stringify(updatedArtworks));
    setArtworks(updatedArtworks);
    
    // Sync to backend
    try {
      await fetch('/api/artworks', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ artworks: updatedArtworks })
      });
      alert('Artworks bijgewerkt!');
    } catch (error) {
      console.error('Sync error:', error);
      alert('Data opgeslagen maar kan niet naar server synchroniseren');
    }
  };

  const handleDelete = (id) => {
    if (confirm('Weet je zeker dat je dit artwork wilt verwijderen?')) {
      const updated = artworks.filter(a => a.id !== id);
      saveArtworks(updated);
    }
  };

  const handleSave = (artwork) => {
    if (editingArtwork) {
      const updated = artworks.map(a => a.id === artwork.id ? artwork : a);
      saveArtworks(updated);
      setEditingArtwork(null);
    } else {
      const newArtwork = { ...artwork, id: Date.now() };
      saveArtworks([...artworks, newArtwork]);
      setShowAddForm(false);
    }
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
                <h1 className="text-2xl font-black gradient-text">Artwork Beheren</h1>
                <p className="text-sm text-gray-600">Voeg toe, bewerk of verwijder kunstwerken</p>
              </div>
            </div>
            <button
              onClick={() => setShowAddForm(true)}
              className="px-6 py-3 font-bold text-white rounded-full transform hover:scale-105 transition-all"
              style={{
                background: 'linear-gradient(135deg, #e40303, #ff8c00, #ffed00, #008026, #24408e, #732982)',
                backgroundSize: '400% 400%',
                animation: 'gradient-shift 8s ease infinite',
              }}
            >
              ➕ Nieuw Artwork
            </button>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-12">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {artworks.map((artwork) => (
            <div key={artwork.id} className="bg-white rounded-2xl shadow-xl overflow-hidden transform hover:scale-105 transition-all">
              <div className="h-64 bg-gradient-to-br from-blue-200 to-purple-200 flex items-center justify-center text-8xl">
                🎨
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold mb-2">{artwork.title.nl}</h3>
                <p className="text-gray-600 mb-2 text-sm">{artwork.description.nl}</p>
                <div className="flex items-center justify-between mb-4 text-sm text-gray-500">
                  <span>{artwork.medium.nl}</span>
                  <span className="font-bold">{artwork.year}</span>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => setEditingArtwork(artwork)}
                    className="flex-1 py-2 bg-blue-500 text-white rounded-lg font-bold hover:bg-blue-600"
                  >
                    ✏️ Bewerk
                  </button>
                  <button
                    onClick={() => handleDelete(artwork.id)}
                    className="flex-1 py-2 bg-red-500 text-white rounded-lg font-bold hover:bg-red-600"
                  >
                    🗑️ Verwijder
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {(showAddForm || editingArtwork) && (
          <ArtworkForm
            artwork={editingArtwork}
            onSave={handleSave}
            onCancel={() => {
              setShowAddForm(false);
              setEditingArtwork(null);
            }}
          />
        )}
      </main>
    </div>
  );
}

function ArtworkForm({ artwork, onSave, onCancel }) {
  const [formData, setFormData] = useState(artwork || {
    title: { nl: '', en: '' },
    description: { nl: '', en: '' },
    image: '',
    year: new Date().getFullYear(),
    medium: { nl: '', en: '' }
  });
  const [isDragging, setIsDragging] = useState(false);
  const [uploading, setUploading] = useState(false);
  const fileInputRef = useRef(null);

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleFileUpload = async (files) => {
    setUploading(true);
    const file = files[0];

    if (!file.type.startsWith('image/')) {
      alert('Alleen afbeeldingen zijn toegestaan');
      setUploading(false);
      return;
    }

    try {
      const formDataToSend = new FormData();
      formDataToSend.append('file', file);

      const response = await fetch('/api/upload', {
        method: 'POST',
        body: formDataToSend
      });

      const data = await response.json();

      if (data.success) {
        setFormData({ ...formData, image: data.url });
        alert('Afbeelding succesvol geüpload!');
      } else {
        alert('Upload mislukt: ' + data.error);
      }
    } catch (error) {
      console.error('Upload error:', error);
      alert('Uploadfout: ' + error.message);
    } finally {
      setUploading(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    const files = e.dataTransfer.files;
    if (files.length > 0) {
      handleFileUpload(files);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData);
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl shadow-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 bg-white border-b p-6 flex items-center justify-between">
          <h2 className="text-3xl font-black gradient-text">
            {artwork ? '✏️ Artwork Bewerken' : '➕ Nieuw Artwork'}
          </h2>
          <button onClick={onCancel} className="text-4xl hover:scale-110 transition-transform">×</button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          <div>
            <label className="block font-bold text-gray-700 mb-2">Titel (NL)</label>
            <input
              type="text"
              value={formData.title.nl}
              onChange={(e) => setFormData({ ...formData, title: { ...formData.title, nl: e.target.value }})}
              className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:border-purple-500 focus:outline-none"
              required
            />
          </div>

          <div>
            <label className="block font-bold text-gray-700 mb-2">Titel (EN)</label>
            <input
              type="text"
              value={formData.title.en}
              onChange={(e) => setFormData({ ...formData, title: { ...formData.title, en: e.target.value }})}
              className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:border-purple-500 focus:outline-none"
              required
            />
          </div>

          <div>
            <label className="block font-bold text-gray-700 mb-2">Beschrijving (NL)</label>
            <textarea
              value={formData.description.nl}
              onChange={(e) => setFormData({ ...formData, description: { ...formData.description, nl: e.target.value }})}
              className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:border-purple-500 focus:outline-none"
              rows="3"
              required
            />
          </div>

          <div>
            <label className="block font-bold text-gray-700 mb-2">Beschrijving (EN)</label>
            <textarea
              value={formData.description.en}
              onChange={(e) => setFormData({ ...formData, description: { ...formData.description, en: e.target.value }})}
              className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:border-purple-500 focus:outline-none"
              rows="3"
              required
            />
          </div>

          <div>
            <label className="block font-bold text-gray-700 mb-2">Medium (NL)</label>
            <input
              type="text"
              value={formData.medium.nl}
              onChange={(e) => setFormData({ ...formData, medium: { ...formData.medium, nl: e.target.value }})}
              className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:border-purple-500 focus:outline-none"
              placeholder="Digitale kunst, Acryl, etc."
              required
            />
          </div>

          <div>
            <label className="block font-bold text-gray-700 mb-2">Medium (EN)</label>
            <input
              type="text"
              value={formData.medium.en}
              onChange={(e) => setFormData({ ...formData, medium: { ...formData.medium, en: e.target.value }})}
              className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:border-purple-500 focus:outline-none"
              placeholder="Digital art, Acrylic, etc."
              required
            />
          </div>

          <div>
            <label className="block font-bold text-gray-700 mb-2">Jaar</label>
            <input
              type="number"
              value={formData.year}
              onChange={(e) => setFormData({ ...formData, year: parseInt(e.target.value) })}
              className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:border-purple-500 focus:outline-none"
              min="1900"
              max="2100"
              required
            />
          </div>

          {/* Drag & Drop Upload */}
          <div>
            <label className="block font-bold text-gray-700 mb-2">📸 Afbeelding Uploaden</label>
            <div
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
              onClick={() => fileInputRef.current?.click()}
              className={`w-full p-8 border-4 border-dashed rounded-2xl cursor-pointer transition-all ${
                isDragging
                  ? 'border-purple-500 bg-purple-50 scale-105'
                  : 'border-gray-300 bg-gray-50 hover:border-purple-400'
              }`}
            >
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={(e) => {
                  if (e.target.files) {
                    handleFileUpload(e.target.files);
                  }
                }}
                className="hidden"
              />
              <div className="text-center">
                <div className="text-4xl mb-2">📁</div>
                <p className="font-bold text-gray-700 mb-1">
                  {uploading ? '⏳ Bezig met uploaden...' : 'Sleep afbeelding hier of klik'}
                </p>
                <p className="text-sm text-gray-500">PNG, JPG, WEBP (max 10MB)</p>
                {formData.image && (
                  <div className="mt-4 p-4 bg-green-50 rounded-lg border-2 border-green-300">
                    <p className="text-sm text-green-700 font-bold">✅ Afbeelding geselecteerd:</p>
                    <p className="text-xs text-green-600 break-all">{formData.image}</p>
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className="flex gap-4 pt-4">
            <button
              type="submit"
              className="flex-1 py-4 text-lg font-bold text-white rounded-xl disabled:opacity-50"
              style={{
                background: 'linear-gradient(135deg, #e40303, #ff8c00, #ffed00, #008026, #24408e, #732982)',
                backgroundSize: '400% 400%',
                animation: 'gradient-shift 8s ease infinite',
              }}
              disabled={uploading}
            >
              💾 Opslaan
            </button>
            <button
              type="button"
              onClick={onCancel}
              className="flex-1 py-4 text-lg font-bold bg-gray-300 text-gray-700 rounded-xl hover:bg-gray-400"
              disabled={uploading}
            >
              ❌ Annuleren
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}