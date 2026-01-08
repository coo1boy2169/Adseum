import './globals.css'
import { CartProvider } from '@/components/CartProvider'



export const metadata = {
  title: {
    default: 'ADSEUM — Pride Art & Shop',
    template: '%s | ADSEUM',
  },
  description:
    'ADSEUM — Pride artwork en producten die diversiteit vieren. Ontdek LGBTQ+ kunst, limited prints en merch.',
  keywords: ['pride', 'art', 'artwork', 'LGBTQ+', 'kunst', 'webshop', 'gayart', 'queerart'],
  openGraph: {
    title: 'ADSEUM — Pride Art & Shop',
    description:
      'ADSEUM — Pride artwork en producten die diversiteit vieren. Ontdek LGBTQ+ kunst, limited prints en merch.',
    url: 'https://example.com',
    siteName: 'ADSEUM',
    images: [
      {
        url: '/images/portrait.avif',
        width: 1200,
        height: 630,
        alt: 'ADSEUM Pride Art',
      },
    ],
    locale: 'nl_NL',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'ADSEUM — Pride Art & Shop',
    description:
      'ADSEUM — Pride artwork en producten die diversiteit vieren.',
    images: ['/images/portrait.avif'],
    site: '@your_twitter_handle',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
    },
  },
  alternates: {
    canonical: 'https://example.com',
  },
  manifest: '/site.webmanifest',
}

export default function RootLayout({ children }) {
  return (
    <html lang="nl">
      <body>
        <CartProvider>{children}</CartProvider>
      </body>
    </html>
  )
}