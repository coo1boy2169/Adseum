"use client";

import { useEffect, useState } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { useCart } from '@/components/CartProvider';
import { translations } from '@/lib/translations';
import Link from 'next/link';

export default function CartPage() {
  const [lang, setLang] = useState('nl');
  const t = translations[lang];
  const { cart, removeFromCart, updateQuantity, clearCart } = useCart();

  const total = cart.reduce((s, p) => s + (p.price || 0) * (p.quantity || 1), 0);

  return (
    <>
      <Header lang={lang} setLang={setLang} />

      <main className="container mx-auto px-4 py-24">
        <h1 className="text-5xl font-black mb-8">{lang === 'nl' ? 'Winkelwagen' : 'Cart'}</h1>

        {cart.length === 0 ? (
          <div className="text-center py-24">
            <p className="text-2xl mb-6">{lang === 'nl' ? 'Je winkelwagen is leeg' : 'Your cart is empty'}</p>
            <Link href="/shop">
              <button className="px-8 py-4 bg-gradient-to-r from-pink-500 to-purple-600 text-white rounded-full">{lang === 'nl' ? 'Ga naar Webshop' : 'Go to Shop'}</button>
            </Link>
          </div>
        ) : (
          <div className="grid md:grid-cols-3 gap-8">
            <div className="md:col-span-2 space-y-6">
              {cart.map((item) => (
                <div key={item.id} className="flex items-center gap-6 bg-white rounded-2xl p-4 shadow">
                  <img src={item.images?.[0] || '/images/placeholder.png'} alt={item.name?.nl || item.name?.en} className="w-32 h-32 object-cover rounded-lg" />
                  <div className="flex-1">
                    <h3 className="text-2xl font-bold">{item.name?.nl || item.name?.en}</h3>
                    <p className="text-gray-600">€{(item.price || 0).toFixed(2)}</p>
                    <div className="mt-4 flex items-center gap-2">
                      <button onClick={() => updateQuantity(item.id, (item.quantity || 1) - 1)} className="px-3 py-1 bg-gray-100 rounded">-</button>
                      <div className="px-4">{item.quantity || 1}</div>
                      <button onClick={() => updateQuantity(item.id, (item.quantity || 1) + 1)} className="px-3 py-1 bg-gray-100 rounded">+</button>
                      <button onClick={() => removeFromCart(item.id)} className="ml-4 px-3 py-1 bg-red-500 text-white rounded">{lang === 'nl' ? 'Verwijder' : 'Remove'}</button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <aside className="bg-white rounded-2xl p-6 shadow">
              <h4 className="text-xl font-bold mb-4">{lang === 'nl' ? 'Samenvatting' : 'Summary'}</h4>
              <div className="flex items-center justify-between mb-2">
                <span>Aantal</span>
                <span>{cart.reduce((s, p) => s + (p.quantity || 1), 0)}</span>
              </div>
              <div className="flex items-center justify-between font-black text-2xl mb-6">
                <span>{lang === 'nl' ? 'Totaal' : 'Total'}</span>
                <span>€{total.toFixed(2)}</span>
              </div>

              <button className="w-full px-6 py-3 bg-gradient-to-r from-pink-500 to-purple-600 text-white rounded-full mb-3">{lang === 'nl' ? 'Afrekenen' : 'Checkout'}</button>
              <button onClick={() => clearCart()} className="w-full px-6 py-3 bg-gray-100 rounded">{lang === 'nl' ? 'Winkelwagen leegmaken' : 'Clear Cart'}</button>
            </aside>
          </div>
        )}
      </main>

      <Footer lang={lang} />
    </>
  );
}
