'use client';

import { useState } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { translations } from '@/lib/translations';

export default function About() {
  const [lang, setLang] = useState('nl');
  const t = translations[lang];

  return (
    <>
      <Header lang={lang} setLang={setLang} />
      
      <main className="relative">
        {/* Hero Section */}
        <section className="min-h-[60vh] flex items-center justify-center pt-32 pb-20 relative overflow-hidden bg-gradient-to-br from-pink-50 via-purple-50 to-blue-50">
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <div className="absolute top-20 right-10 w-72 h-72 bg-pink-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-float" />
            <div className="absolute bottom-20 left-10 w-72 h-72 bg-purple-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-float animation-delay-2000" />
          </div>

          <div className="container mx-auto px-4 text-center relative z-10">
            <h1 className="text-7xl md:text-8xl font-black mb-6 gradient-text">
              OVER ONS
            </h1>
            <p className="text-2xl md:text-3xl text-gray-700 max-w-2xl mx-auto font-light">
              {lang === 'nl' 
                ? 'Ontdek het verhaal achter ADseum' 
                : 'Discover the story behind ADseum'}
            </p>
          </div>
        </section>

        {/* Content Sections */}
        <section className="py-20 relative">
          <div className="container mx-auto px-4 max-w-4xl">
            {/* WIE ZIJN WE Section */}
            <div className="mb-20">
              <div className="flex items-center gap-4 mb-10">
                <div className="w-2 h-16 bg-gradient-to-b from-pink-500 to-purple-500 rounded-full" />
                <h2 className="text-5xl md:text-6xl font-black gradient-text">
                  {lang === 'nl' ? 'WIE ZIJN WE' : 'WHO ARE WE'}
                </h2>
              </div>

              <div className="space-y-6 text-lg leading-relaxed text-gray-700">
                <p className="text-xl font-semibold text-purple-900">
                  {lang === 'nl'
                    ? 'Onze stichting ADseum komt voort uit de stichting "Homo webmuseum".'
                    : 'Our foundation ADseum originates from the "Homo webmuseum" foundation.'}
                </p>

                <p>
                  {lang === 'nl'
                    ? 'Deze is in 2005 opgericht o.a. door Ad Schuring en Martin van der Lugt. Ad had tm 2024 een dagelijks blog waarin alle facetten van met name de gay cultuur belicht werden; kunst, muziek, toneel, exposities, film, boeken, politiek en protest.'
                    : 'This was founded in 2005 by, among others, Ad Schuring and Martin van der Lugt. Ad maintained a daily blog until 2024 that highlighted all facets of gay culture in particular; art, music, theater, exhibitions, film, books, politics and protest.'}
                </p>

                <p>
                  {lang === 'nl'
                    ? 'Tevens beheerde hij het Homo webmuseum waar gay / queer kunstenaars van vroeger en nu, visueel te vinden waren. Wij hopen in 2026 dit virtuele museum in een nieuwe vorm opnieuw te heropenen.'
                    : 'He also managed the Homo webmuseum where gay/queer artists from past and present could be found visually. We hope to reopen this virtual museum in a new form in 2026.'}
                </p>

                <div className="bg-purple-50 border-l-4 border-purple-500 p-6 rounded my-8">
                  <p className="text-lg font-bold text-purple-900 mb-3">
                    {lang === 'nl' ? '💜 Onze Herdenking' : '💜 Our Memorial'}
                  </p>
                  <p>
                    {lang === 'nl'
                      ? 'In 2024 is de naam, door het overlijden van Ad Schuring, veranderd in ADseum, dit ter nagedachtenis aan onze oprichter. Met een nieuw, fris en enthousiast bestuur gaan wij verder de toekomst in.'
                      : 'In 2024, the name was changed to ADseum following the death of Ad Schuring, in honor of our founder. With a new, fresh and enthusiastic board, we continue into the future.'}
                  </p>
                </div>

                <p>
                  {lang === 'nl'
                    ? 'Het bestuur is ervaren op het gebied van beeldende kunst in de ruimste zin van het woord en dan met name de Gay- Queer cultuur. Tevens beheren wij een aantal nalatenschappen van overleden homo kunstenaars en proberen deze aan de vergetelheid te onttrekken.'
                    : 'The board is experienced in the field of visual arts in the broadest sense of the word, particularly in Gay-Queer culture. We also manage several legacies of deceased gay artists and try to rescue them from oblivion.'}
                </p>

                <p>
                  {lang === 'nl'
                    ? 'De stichting onderhoudt nauwe banden met het IHLIA in Amsterdam en de Tom of Finland Foundation in L A en is regelmatig aanwezig op hun TOF Art Fair.'
                    : 'The foundation maintains close ties with the IHLIA in Amsterdam and the Tom of Finland Foundation in LA and regularly attends their TOF Art Fair.'}
                </p>

                <div className="bg-gradient-to-r from-pink-100 to-purple-100 p-6 rounded-2xl">
                  <p className="text-xl font-bold text-gray-800">
                    {lang === 'nl'
                      ? '🌈 ADseum is een non profit organisatie, alle steun is welkom'
                      : '🌈 ADseum is a non-profit organization, all support is welcome'}
                  </p>
                </div>
              </div>
            </div>

            {/* WAT DOEN WE Section */}
            <div className="my-20">
              <div className="flex items-center gap-4 mb-10">
                <div className="w-2 h-16 bg-gradient-to-b from-blue-500 to-pink-500 rounded-full" />
                <h2 className="text-5xl md:text-6xl font-black gradient-text">
                  {lang === 'nl' ? 'WAT DOEN WE' : 'WHAT DO WE DO'}
                </h2>
              </div>

              <div className="space-y-6 text-lg leading-relaxed text-gray-700">
                <p className="text-xl font-semibold text-purple-900">
                  {lang === 'nl'
                    ? 'De stichting heeft ten doel: het bevorderen van Homocultuur, in het bijzonder door het stimuleren, ondersteunen en zichtbaar maken van de erotische kunst, beeldende kunst en de Gay / Queer cultuur in al haar uitingsvormen.'
                    : 'The foundation aims to: promote homo culture, in particular by stimulating, supporting and making visible erotic art, visual art and gay/queer culture in all its manifestations.'}
                </p>

                <p>
                  {lang === 'nl'
                    ? 'Wij trachten dit doel onder meer te verwezenlijken door:'
                    : 'We aim to achieve this goal through:'}
                </p>

                <div className="space-y-4">
                  {/* Activity 1 */}
                  <div className="bg-white border-2 border-purple-200 rounded-2xl p-6 hover:shadow-xl transition-all hover:border-purple-400">
                    <div className="flex items-start gap-4">
                      <span className="text-4xl">🎭</span>
                      <div>
                        <h3 className="text-xl font-bold text-purple-900 mb-2">
                          {lang === 'nl' 
                            ? 'Culturele Manifestaties' 
                            : 'Cultural Events'}
                        </h3>
                        <p className="text-gray-700">
                          {lang === 'nl'
                            ? 'Het organiseren en/of ondersteunen van festivals, tentoonstellingen, lezingen en andere culturele manifestaties.'
                            : 'Organizing and/or supporting festivals, exhibitions, lectures and other cultural events.'}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Activity 2 */}
                  <div className="bg-white border-2 border-pink-200 rounded-2xl p-6 hover:shadow-xl transition-all hover:border-pink-400">
                    <div className="flex items-start gap-4">
                      <span className="text-4xl">📚</span>
                      <div>
                        <h3 className="text-xl font-bold text-purple-900 mb-2">
                          {lang === 'nl' 
                            ? 'Publicaties & Uitgaven' 
                            : 'Publications & Editions'}
                        </h3>
                        <p className="text-gray-700">
                          {lang === 'nl'
                            ? 'Het uitgeven van boeken en publicaties op papier en middels andere communicatieve uitingen.'
                            : 'Publishing books and publications on paper and through other forms of communication.'}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Activity 3 */}
                  <div className="bg-white border-2 border-blue-200 rounded-2xl p-6 hover:shadow-xl transition-all hover:border-blue-400">
                    <div className="flex items-start gap-4">
                      <span className="text-4xl">🤝</span>
                      <div>
                        <h3 className="text-xl font-bold text-purple-900 mb-2">
                          {lang === 'nl' 
                            ? 'Samenwerking' 
                            : 'Collaboration'}
                        </h3>
                        <p className="text-gray-700">
                          {lang === 'nl'
                            ? 'Het samenwerken met organisaties en instellingen die een vergelijkbaar of aanvullend doel nastreven.'
                            : 'Collaborating with organizations and institutions that pursue similar or complementary goals.'}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Activity 4 */}
                  <div className="bg-white border-2 border-green-200 rounded-2xl p-6 hover:shadow-xl transition-all hover:border-green-400">
                    <div className="flex items-start gap-4">
                      <span className="text-4xl">🎨</span>
                      <div>
                        <h3 className="text-xl font-bold text-purple-900 mb-2">
                          {lang === 'nl' 
                            ? 'Kunstenaarsnalaten' 
                            : 'Artist Legacies'}
                        </h3>
                        <p className="text-gray-700">
                          {lang === 'nl'
                            ? 'Het verwerven, beheren en openen van de artistieke nalatenschappen van homo-kunstenaars.'
                            : 'Acquiring, managing and opening the artistic legacies of gay artists.'}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* CTA Section */}
            <div className="mt-20 bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 rounded-3xl p-12 text-center text-white">
              <h3 className="text-3xl md:text-4xl font-black mb-4">
                {lang === 'nl'
                  ? '💜 Wil je ons steunen?'
                  : '💜 Do you want to support us?'}
              </h3>
              <p className="text-lg mb-8 text-white/90">
                {lang === 'nl'
                  ? 'ADseum is een non-profit organisatie en jouw steun is van onschatbare waarde.'
                  : 'ADseum is a non-profit organization and your support is invaluable.'}
              </p>
              <button className="px-8 py-4 bg-white text-purple-600 rounded-full font-bold text-lg hover:scale-105 transition-transform hover:shadow-2xl">
                {lang === 'nl' ? '✉️ Contact opnemen' : '✉️ Get in Touch'}
              </button>
            </div>
          </div>
        </section>
      </main>

      <Footer lang={lang} />

      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-20px); }
        }

        .animate-float {
          animation: float 6s ease-in-out infinite;
        }

        .animation-delay-2000 {
          animation-delay: 2s;
        }
      `}</style>
    </>
  );
}
