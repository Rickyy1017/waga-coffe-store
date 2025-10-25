import type { Product } from "../types/shared";

export const products: Product[] = [
  {
    id: 'featured-coffee-bag-1',
    name: 'Premium Coffee Bag',
    priceUsd: 24.444,
    priceEth: '0.012',
    priceUsdc: '24.99',
    imageUrl: '/images/coffee bag.jpg',
    description: 'Premium single-origin coffee beans in an elegant bag. Perfect for coffee enthusiasts seeking exceptional quality and rich flavor profiles.',
    rating: 4.8,
    origin: 'Colombia',
    process: 'Washed',
    inventory: 15,
    badges: ['Bestseller', 'Organic']
  },
  {
    id: 'featured-coffee-bag-2',
    name: 'Artisan Coffee Blend',
    priceUsd: 19.99,
    priceEth: '0.009',
    priceUsdc: '19.99',
    imageUrl: '/images/coffe2.jpg',
    description: 'Carefully crafted artisan blend combining beans from multiple origins for a complex, balanced flavor experience.',
    rating: 4.6,
    origin: 'Ethiopia & Brazil',
    process: 'Natural & Washed',
    inventory: 22,
    badges: ['New']
  },
  {
    id: 'featured-coffee-bag-3',
    name: 'Special Reserve Blend',
    priceUsd: 29.99,
    priceEth: '0.015',
    priceUsdc: '29.99',
    imageUrl: '/images/coffee bag.jpg',
    description: 'Exclusive limited edition blend with rare beans from sustainable farms. A true connoisseur\'s choice.',
    rating: 4.9,
    origin: 'Costa Rica',
    process: 'Honey Process',
    inventory: 8,
    badges: ['Limited Edition', 'Premium']
  }
];
