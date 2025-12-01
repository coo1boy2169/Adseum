// Product data - Taco kan dit later makkelijk aanpassen
export const products = [
  {
    id: 1,
    name: {
      nl: 'Pride Hart Boek',
      en: 'Pride Heart Book'
    },
    description: {
      nl: 'Een prachtig geïllustreerd boek over liefde en acceptatie',
      en: 'A beautifully illustrated book about love and acceptance'
    },
    price: 24.99,
    images: [
      '/images/pride.jpg',
      '/images/achterkant.jpg',
    ],
    category: 'books'
  },
  {
    id: 2,
    name: {
      nl: 'Rainbow Art Print',
      en: 'Rainbow Art Print'
    },
    description: {
      nl: 'Exclusieve art print op hoogwaardig papier',
      en: 'Exclusive art print on high-quality paper'
    },
    price: 34.99,
    images: [
      '/images/kunstvoor.webp',
    ],
    category: 'prints'
  },
  {
    id: 3,
    name: {
      nl: 'Pride Sticker Set',
      en: 'Pride Sticker Set'
    },
    description: {
      nl: 'Set van 10 unieke Pride stickers',
      en: 'Set of 10 unique Pride stickers'
    },
    price: 9.99,
    images: [
      '/images/sticker.png'
    ],
    category: 'merchandise'
  }
  
];

// Voor later: eenvoudige winkelwagen functionaliteit
export const cartUtils = {
  addToCart: (product) => {
    const cart = JSON.parse(localStorage.getItem('cart') || '[]');
    cart.push(product);
    localStorage.setItem('cart', JSON.stringify(cart));
    return cart;
  },
  
  getCart: () => {
    return JSON.parse(localStorage.getItem('cart') || '[]');
  },
  
  clearCart: () => {
    localStorage.setItem('cart', '[]');
  }
};