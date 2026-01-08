"use client";

import { useState } from 'react';
import { useCart } from '@/components/CartProvider';
import { useRouter } from 'next/navigation';

export default function AddButton({ product, t }) {
  const { addToCart } = useCart();
  const router = useRouter();
  const [added, setAdded] = useState(false);
  const [showToast, setShowToast] = useState(false);

  const handle = () => {
    addToCart(product);
    setAdded(true);
    setShowToast(true);

    // hide added state after brief time
    setTimeout(() => setAdded(false), 1500);

    // hide toast after a bit and navigate to cart
    setTimeout(() => {
      setShowToast(false);
      router.push('/cart');
    }, 900);
  };

  return (
    <>
      <button
        type="button"
        onClick={(e) => { e.stopPropagation(); handle(); }}
        style={{ position: 'relative', zIndex: 9999, pointerEvents: 'auto', cursor: 'pointer' }}
        className={`px-6 py-3 rounded-full font-bold transform transition-transform cursor-pointer ${added ? 'bg-green-500 text-white' : 'bg-gradient-to-r from-pink-500 to-purple-600 text-white'}`}
        aria-label={t && t.shop ? (t.shop.addToCart ?? 'Voeg toe') : 'Voeg toe'}
      >
        {added ? (t && t.shop ? (t.shop.added ?? 'Toegevoegd') : '✓ Toegevoegd') : (t && t.shop ? t.shop.addToCart : 'Voeg toe')}
      </button>

      {showToast && (
        <div className="fixed top-6 right-6 z-50 bg-white/90 backdrop-blur-md border border-gray-200 shadow-lg rounded-lg px-4 py-3 animate-fade-in">
          <div className="font-semibold">{t && t.shop ? t.shop.addToCart : 'In winkelwagen'}</div>
          <div className="text-sm text-gray-600">{product.name?.nl || product.name?.en} {t && t.shop ? (t.shop.added ?? 'toegevoegd') : 'toegevoegd'}</div>
        </div>
      )}
    </>
  );
}
