'use client';

import { useState } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { translations } from '@/lib/translations';

export default function ContactPage() {
  const [lang, setLang] = useState('nl');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [submitted, setSubmitted] = useState(false);
  const t = translations[lang];

  const handleSubmit = (e) => {
    e.preventDefault();
    // Hier kan later echte form submission logica komen
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setFormData({ name: '', email: '', message: '' });
    }, 3000);
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <>
      <Header lang={lang} setLang={setLang} />
      
      <main className="pt-24 min-h-screen">
        {/* Hero Banner */}
        <section className="relative bg-gradient-to-r from-purple-500 via-pink-500 to-blue-500 py-20 mb-12">
          <div className="container mx-auto px-4 text-center text-white">
            <h1 className="text-5xl md:text-6xl font-bold mb-4">
              {t.contact.title}
            </h1>
            <p className="text-xl md:text-2xl">
              {t.contact.description}
            </p>
          </div>
        </section>

        <div className="container mx-auto px-4 pb-20">
          <div className="grid md:grid-cols-2 gap-12 max-w-6xl mx-auto">
            {/* Contact Form */}
            <div className="bg-white rounded-2xl shadow-xl p-8 pride-border">
              <h2 className="text-3xl font-bold gradient-text mb-6">
                {lang === 'nl' ? 'Stuur een bericht' : 'Send a message'}
              </h2>

              {submitted ? (
                <div className="bg-green-100 border-4 border-green-500 rounded-xl p-8 text-center">
                  <div className="text-5xl mb-4">✓</div>
                  <p className="text-2xl font-bold text-green-800">
                    {lang === 'nl' ? 'Bericht verzonden!' : 'Message sent!'}
                  </p>
                  <p className="text-gray-700 mt-2">
                    {lang === 'nl' 
                      ? 'We nemen zo snel mogelijk contact met je op.' 
                      : 'We will get back to you as soon as possible.'}
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <label className="block text-gray-700 font-semibold mb-2">
                      {t.contact.name}
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-purple-500 focus:outline-none transition-colors"
                      placeholder={lang === 'nl' ? 'Jouw naam' : 'Your name'}
                    />
                  </div>

                  <div>
                    <label className="block text-gray-700 font-semibold mb-2">
                      {t.contact.email}
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-purple-500 focus:outline-none transition-colors"
                      placeholder={lang === 'nl' ? 'jouw@email.com' : 'your@email.com'}
                    />
                  </div>

                  <div>
                    <label className="block text-gray-700 font-semibold mb-2">
                      {t.contact.message}
                    </label>
                    <textarea
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      required
                      rows="6"
                      className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-purple-500 focus:outline-none transition-colors resize-none"
                      placeholder={lang === 'nl' ? 'Jouw bericht...' : 'Your message...'}
                    ></textarea>
                  </div>

                  <button type="submit" className="w-full btn-pride">
                    {t.contact.send} ✉️
                  </button>
                </form>
              )}
            </div>

            {/* Contact Info */}
            <div className="space-y-8">
              <div className="bg-white rounded-2xl shadow-xl p-8 pride-border">
                <h2 className="text-3xl font-bold gradient-text mb-6">
                  {t.contact.info}
                </h2>
                
                <div className="space-y-6">
                  {/* Email */}
                  <div className="flex items-start space-x-4">
                    <div className="bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 p-3 rounded-lg">
                      <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/>
                      </svg>
                    </div>
                    <div>
                      <h3 className="font-bold text-lg text-gray-900">Email</h3>
                      <a href="mailto:info@possum.com" className="text-purple-600 hover:text-purple-800">
                        info@possum.com
                      </a>
                    </div>
                  </div>

                  {/* Phone */}
                  <div className="flex items-start space-x-4">
                    <div className="bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 p-3 rounded-lg">
                      <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"/>
                      </svg>
                    </div>
                    <div>
                      <h3 className="font-bold text-lg text-gray-900">
                        {lang === 'nl' ? 'Telefoon' : 'Phone'}
                      </h3>
                      <a href="tel:+31612345678" className="text-purple-600 hover:text-purple-800">
                        +31 6 12345678
                      </a>
                    </div>
                  </div>

                  {/* Social Media */}
                  <div className="flex items-start space-x-4">
                    <div className="bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 p-3 rounded-lg">
                      <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                      </svg>
                    </div>
                    <div>
                      <h3 className="font-bold text-lg text-gray-900">Social Media</h3>
                      <p className="text-purple-600">@PossumArt</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Opening Hours / Additional Info */}
              <div className="bg-gradient-to-br from-pink-100 to-purple-100 rounded-2xl p-8">
                <h3 className="text-2xl font-bold gradient-text mb-4">
                  {lang === 'nl' ? 'Responstijd' : 'Response Time'}
                </h3>
                <p className="text-gray-700">
                  {lang === 'nl' 
                    ? 'Wij proberen binnen 24 uur te reageren op alle berichten. Voor dringende vragen kun je ook bellen!'
                    : 'We try to respond to all messages within 24 hours. For urgent questions, you can also call!'}
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer lang={lang} />
    </>
  );
}