'use client';

export default function LanguageSwitcher({ lang, setLang }) {
  return (
    <div className="flex items-center space-x-2 bg-gray-100 rounded-full p-1">
      <button
        onClick={() => setLang('nl')}
        className={`px-4 py-2 rounded-full font-semibold transition-all ${
          lang === 'nl'
            ? 'bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 text-white shadow-lg'
            : 'text-gray-600 hover:text-gray-900'
        }`}
      >
        NL
      </button>
      <button
        onClick={() => setLang('en')}
        className={`px-4 py-2 rounded-full font-semibold transition-all ${
          lang === 'en'
            ? 'bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 text-white shadow-lg'
            : 'text-gray-600 hover:text-gray-900'
        }`}
      >
        EN
      </button>
    </div>
  );
}