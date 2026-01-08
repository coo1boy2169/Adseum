"use client";

import React, { createContext, useContext, useEffect, useState } from 'react';

const CartContext = createContext(null);

export function CartProvider({ children }) {
  const [cart, setCart] = useState([]);

  // Persist cart in localStorage
  useEffect(() => {
    try {
      const stored = localStorage.getItem('adseum_cart');
      if (stored) setCart(JSON.parse(stored));
    } catch (e) {
      console.error('Failed to read cart from storage', e);
    }
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem('adseum_cart', JSON.stringify(cart));
    } catch (e) {
      console.error('Failed to write cart to storage', e);
    }
  }, [cart]);

  const addToCart = (product) => {
    setCart((prev) => {
      const existing = prev.find((p) => p.id === product.id);
      if (existing) {
        return prev.map((p) => p.id === product.id ? { ...p, quantity: p.quantity + 1 } : p);
      }
      return [...prev, { ...product, quantity: 1 }];
    });
  };

  const removeFromCart = (productId) => {
    setCart((prev) => prev.filter((p) => p.id !== productId));
  };

  const clearCart = () => setCart([]);

  const updateQuantity = (productId, quantity) => {
    setCart((prev) => {
      if (quantity <= 0) return prev.filter((p) => p.id !== productId);
      return prev.map((p) => p.id === productId ? { ...p, quantity } : p);
    });
  };

  const cartCount = cart.reduce((s, p) => s + (p.quantity || 0), 0);

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart, clearCart, updateQuantity, cartCount }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error('useCart must be used within a CartProvider');
  return ctx;
}
