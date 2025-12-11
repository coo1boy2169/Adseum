'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function AdminLogin() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleLogin = (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    // Simuleer login delay voor realistische ervaring
    setTimeout(() => {
      if (username === 'admin' && password === 'admin') {
        // Sla login status op
        localStorage.setItem('adminLoggedIn', 'true');
        localStorage.setItem('adminLoginTime', Date.now().toString());
        
        // Redirect naar admin dashboard
        router.push('/admin/dashboard');
      } else {
        setError('Verkeerde gebruikersnaam of wachtwoord!');
        setLoading(false);
      }
    }, 1000);
  };

  return (
    <div className="min-h-screen flex items-center justify-center relative overflow-hidden">
      {/* Animated Background */}
      <div className="fixed inset-0 z-0">
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

      {/* Login Card */}
      <div className="relative z-10 w-full max-w-md px-4">
        <div 
          className="bg-white/90 backdrop-blur-xl rounded-3xl shadow-2xl p-12 relative overflow-hidden"
          style={{
            animation: 'scaleIn 0.6s cubic-bezier(0.34, 1.56, 0.64, 1)',
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

          {/* Logo/Title */}
          <div className="text-center mb-8">
            <div className="inline-block p-4 rounded-full mb-4" 
              style={{
                background: 'linear-gradient(135deg, #e40303, #ff8c00, #ffed00, #008026, #24408e, #732982)',
                backgroundSize: '400% 400%',
                animation: 'gradient-shift 8s ease infinite',
              }}
            >
              <span className="text-5xl">🔐</span>
            </div>
            <h1 className="text-4xl font-black gradient-text mb-2">
              Admin Login
            </h1>
            <p className="text-gray-600">Adseum CMS Dashboard</p>
          </div>

          {/* Login Form */}
          <form onSubmit={handleLogin} className="space-y-6">
            {/* Username */}
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">
                Gebruikersnaam
              </label>
              <div className="relative">
                <input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:border-purple-500 focus:outline-none transition-all"
                  placeholder="admin"
                  required
                />
                <span className="absolute right-4 top-3 text-2xl">👤</span>
              </div>
            </div>

            {/* Password */}
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">
                Wachtwoord
              </label>
              <div className="relative">
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:border-purple-500 focus:outline-none transition-all"
                  placeholder="••••••••"
                  required
                />
                <span className="absolute right-4 top-3 text-2xl">🔒</span>
              </div>
            </div>

            {/* Error Message */}
            {error && (
              <div 
                className="bg-red-100 border-2 border-red-500 text-red-700 px-4 py-3 rounded-xl flex items-center gap-2"
                style={{
                  animation: 'shake 0.5s ease',
                }}
              >
                <span className="text-2xl">⚠️</span>
                <span className="font-semibold">{error}</span>
              </div>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full py-4 text-lg font-bold text-white rounded-xl transform transition-all duration-300 hover:scale-105 relative overflow-hidden disabled:opacity-50 disabled:cursor-not-allowed"
              style={{
                background: 'linear-gradient(135deg, #e40303, #ff8c00, #ffed00, #008026, #24408e, #732982)',
                backgroundSize: '400% 400%',
                animation: 'gradient-shift 8s ease infinite',
                boxShadow: '0 10px 40px rgba(148, 0, 211, 0.4)',
              }}
            >
              {loading ? (
                <span className="flex items-center justify-center gap-2">
                  <div className="w-5 h-5 border-3 border-white border-t-transparent rounded-full animate-spin" />
                  Inloggen...
                </span>
              ) : (
                'Inloggen 🚀'
              )}
            </button>
          </form>

          {/* Helper Text */}
          <div className="mt-6 text-center text-sm text-gray-500">
            <p>🔒 Standaard login:</p>
            <p className="font-mono bg-gray-100 rounded px-2 py-1 inline-block mt-1">
              admin / admin
            </p>
          </div>
        </div>

        {/* Back to Website */}
        <div className="text-center mt-6">
          <a 
            href="/"
            className="text-white font-semibold hover:underline flex items-center justify-center gap-2"
          >
            ← Terug naar website
          </a>
        </div>
      </div>

      <style jsx>{`
        @keyframes scaleIn {
          from {
            opacity: 0;
            transform: scale(0.8);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }

        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          25% { transform: translateX(-10px); }
          75% { transform: translateX(10px); }
        }
      `}</style>
    </div>
  );
}