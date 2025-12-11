'use client';

import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function ProductsAdmin() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [products, setProducts] = useState([]);
  const [editingProduct, setEditingProduct] = useState(null);
  const [showAddForm, setShowAddForm] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const loggedIn = localStorage.getItem('adminLoggedIn');
    if (loggedIn !== 'true') {
      router.push('/admin/login');
    } else {
      setIsLoggedIn(true);
      loadProducts();
    }
  }, [router]);

  const loadProducts = () => {
    const saved = localStorage.getItem('products');
    if (saved) {
      setProducts(JSON.parse(saved));
    } else {
      // Default producten
      const defaultProducts = [
        {
          id: 1,
          name: { nl: 'Pride Hart Boek', en: 'Pride Heart Book' },
          description: { nl: 'Een prachtig geïllustreerd boek', en: 'A beautifully illustrated book' },
          price: 24.99,
          images: ['/images/products/book1.jpg'],
          category: 'books'
        },
        {
          id: 2,
          name: { nl: 'Rainbow Art Print', en: 'Rainbow Art Print' },
          description: { nl: 'Exclusieve art print', en: 'Exclusive art print' },
          price: 34.99,
          images: ['/images/products/print1.jpg'],
          category: 'prints'
        }
      ];
      setProducts(defaultProducts);
      localStorage.setItem('products', JSON.stringify(defaultProducts));
    }
  };

  const saveProducts = async (updatedProducts) => {
    // Save to localStorage
    localStorage.setItem('products', JSON.stringify(updatedProducts));
    setProducts(updatedProducts);
    
    // Sync to backend
    try {
      await fetch('/api/products', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ products: updatedProducts })
      });
      alert('Producten bijgewerkt!');
    } catch (error) {
      console.error('Sync error:', error);
      alert('Data opgeslagen maar kan niet naar server synchroniseren');
    }
  };

  const handleDelete = (id) => {
    if (confirm('Weet je zeker dat je dit product wilt verwijderen?')) {
      const updated = products.filter(p => p.id !== id);
      saveProducts(updated);
    }
  };

  const handleSave = (product) => {
    if (editingProduct) {
      // Update bestaand product
      const updated = products.map(p => p.id === product.id ? product : p);
      saveProducts(updated);
      setEditingProduct(null);
    } else {
      // Nieuw product toevoegen
      const newProduct = { ...product, id: Date.now() };
      saveProducts([...products, newProduct]);
      setShowAddForm(false);
    }
  };

  if (!isLoggedIn) return null;

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-lg shadow-lg sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Link href="/admin/dashboard">
                <button className="text-3xl hover:scale-110 transition-transform">
                  ← 
                </button>
              </Link>
              <div>
                <h1 className="text-2xl font-black gradient-text">Producten Beheren</h1>
                <p className="text-sm text-gray-600">Voeg toe, bewerk of verwijder producten</p>
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
              ➕ Nieuw Product
            </button>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-12">
        {/* Products Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {products.map((product) => (
            <div key={product.id} className="bg-white rounded-2xl shadow-xl overflow-hidden transform hover:scale-105 transition-all">
              <div className="h-48 bg-gradient-to-br from-pink-200 to-purple-200 flex items-center justify-center text-6xl">
                🛍️
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold mb-2">{product.name.nl}</h3>
                <p className="text-gray-600 mb-4 text-sm">{product.description.nl}</p>
                <div className="flex items-center justify-between mb-4">
                  <span className="text-2xl font-black gradient-text">€{product.price}</span>
                  <span className="px-3 py-1 bg-purple-100 text-purple-800 rounded-full text-xs font-bold">
                    {product.category}
                  </span>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => setEditingProduct(product)}
                    className="flex-1 py-2 bg-blue-500 text-white rounded-lg font-bold hover:bg-blue-600"
                  >
                    ✏️ Bewerk
                  </button>
                  <button
                    onClick={() => handleDelete(product.id)}
                    className="flex-1 py-2 bg-red-500 text-white rounded-lg font-bold hover:bg-red-600"
                  >
                    🗑️ Verwijder
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Add/Edit Form Modal */}
        {(showAddForm || editingProduct) && (
          <ProductForm
            product={editingProduct}
            onSave={handleSave}
            onCancel={() => {
              setShowAddForm(false);
              setEditingProduct(null);
            }}
          />
        )}
      </main>
    </div>
  );
}

function ProductForm({ product, onSave, onCancel }) {
  const [formData, setFormData] = useState(product || {
    name: { nl: '', en: '' },
    description: { nl: '', en: '' },
    price: 0,
    images: [''],
    category: 'books'
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
        setFormData({ ...formData, images: [data.url] });
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
            {product ? '✏️ Product Bewerken' : '➕ Nieuw Product'}
          </h2>
          <button onClick={onCancel} className="text-4xl hover:scale-110 transition-transform">
            ×
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {/* Nederlandse Naam */}
          <div>
            <label className="block font-bold text-gray-700 mb-2">Product Naam (NL)</label>
            <input
              type="text"
              value={formData.name.nl}
              onChange={(e) => setFormData({
                ...formData,
                name: { ...formData.name, nl: e.target.value }
              })}
              className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:border-purple-500 focus:outline-none"
              required
            />
          </div>

          {/* Engelse Naam */}
          <div>
            <label className="block font-bold text-gray-700 mb-2">Product Naam (EN)</label>
            <input
              type="text"
              value={formData.name.en}
              onChange={(e) => setFormData({
                ...formData,
                name: { ...formData.name, en: e.target.value }
              })}
              className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:border-purple-500 focus:outline-none"
              required
            />
          </div>

          {/* Nederlandse Beschrijving */}
          <div>
            <label className="block font-bold text-gray-700 mb-2">Beschrijving (NL)</label>
            <textarea
              value={formData.description.nl}
              onChange={(e) => setFormData({
                ...formData,
                description: { ...formData.description, nl: e.target.value }
              })}
              className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:border-purple-500 focus:outline-none"
              rows="3"
              required
            />
          </div>

          {/* Engelse Beschrijving */}
          <div>
            <label className="block font-bold text-gray-700 mb-2">Beschrijving (EN)</label>
            <textarea
              value={formData.description.en}
              onChange={(e) => setFormData({
                ...formData,
                description: { ...formData.description, en: e.target.value }
              })}
              className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:border-purple-500 focus:outline-none"
              rows="3"
              required
            />
          </div>

          {/* Prijs */}
          <div>
            <label className="block font-bold text-gray-700 mb-2">Prijs (€)</label>
            <input
              type="number"
              step="0.01"
              value={formData.price}
              onChange={(e) => setFormData({ ...formData, price: parseFloat(e.target.value) })}
              className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:border-purple-500 focus:outline-none"
              required
            />
          </div>

          {/* Categorie */}
          <div>
            <label className="block font-bold text-gray-700 mb-2">Categorie</label>
            <select
              value={formData.category}
              onChange={(e) => setFormData({ ...formData, category: e.target.value })}
              className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:border-purple-500 focus:outline-none"
            >
              <option value="books">Books</option>
              <option value="prints">Prints</option>
              <option value="merchandise">Merchandise</option>
            </select>
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
                {formData.images[0] && (
                  <div className="mt-4 p-4 bg-green-50 rounded-lg border-2 border-green-300">
                    <p className="text-sm text-green-700 font-bold">✅ Afbeelding geselecteerd:</p>
                    <p className="text-xs text-green-600 break-all">{formData.images[0]}</p>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Buttons */}
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