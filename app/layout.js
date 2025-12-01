import './globals.css'

export const metadata = {
  title: 'Aduseum - Pride Art & Shop',
  description: 'Kunst die inspireert, verbindt en viert. Pride artwork en producten.',
  keywords: 'pride, art, artwork, shop, LGBTQ+, kunst, webshop',
}

export default function RootLayout({ children }) {
  return (
    <html lang="nl">
      <body>{children}</body>
    </html>
  )
}