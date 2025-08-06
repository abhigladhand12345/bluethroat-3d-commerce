import { Product } from '@/contexts/CartContext';

export const products: Product[] = [
  {
    id: '1',
    name: 'AeroMax Pro Headphones',
    price: 299.99,
    image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500&h=500&fit=crop',
    category: 'audio',
    description: 'Premium wireless headphones with noise cancellation and superior sound quality.',
    rating: 4.8,
    inStock: true
  },
  {
    id: '2',
    name: 'QuantumSync Smartwatch',
    price: 399.99,
    image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500&h=500&fit=crop',
    category: 'wearables',
    description: 'Advanced smartwatch with health monitoring and seamless connectivity.',
    rating: 4.7,
    inStock: true
  },
  {
    id: '3',
    name: 'NexusPort USB-C Hub',
    price: 89.99,
    image: 'https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=500&h=500&fit=crop',
    category: 'accessories',
    description: 'Ultra-compact hub with multiple ports for modern connectivity needs.',
    rating: 4.6,
    inStock: true
  },
  {
    id: '4',
    name: 'VelocityPad Gaming Mouse',
    price: 79.99,
    image: 'https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=500&h=500&fit=crop',
    category: 'gaming',
    description: 'High-precision gaming mouse with customizable RGB lighting.',
    rating: 4.9,
    inStock: true
  },
  {
    id: '5',
    name: 'CrystalView 4K Monitor',
    price: 599.99,
    image: 'https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?w=500&h=500&fit=crop',
    category: 'displays',
    description: '32-inch 4K monitor with HDR support and ultra-thin bezels.',
    rating: 4.8,
    inStock: true
  },
  {
    id: '6',
    name: 'TurboCharge Wireless Pad',
    price: 49.99,
    image: 'https://images.unsplash.com/photo-1586953208448-b95a79798f07?w=500&h=500&fit=crop',
    category: 'accessories',
    description: 'Fast wireless charging pad compatible with all Qi-enabled devices.',
    rating: 4.5,
    inStock: true
  },
  {
    id: '7',
    name: 'FlexCam Pro Webcam',
    price: 149.99,
    image: 'https://images.unsplash.com/photo-1587826080692-6a4b8d7e8fbc?w=500&h=500&fit=crop',
    category: 'audio',
    description: '4K webcam with auto-focus and professional lighting optimization.',
    rating: 4.7,
    inStock: true
  },
  {
    id: '8',
    name: 'PowerCore Ultra Battery',
    price: 129.99,
    image: 'https://images.unsplash.com/photo-1609592817859-8026e3a1b5ee?w=500&h=500&fit=crop',
    category: 'accessories',
    description: 'High-capacity portable battery with fast charging technology.',
    rating: 4.6,
    inStock: true
  },
  {
    id: '9',
    name: 'StormKey Mechanical Keyboard',
    price: 189.99,
    image: 'https://images.unsplash.com/photo-1541140532154-b024d705b90a?w=500&h=500&fit=crop',
    category: 'gaming',
    description: 'Premium mechanical keyboard with tactile switches and RGB backlighting.',
    rating: 4.9,
    inStock: true
  },
  {
    id: '10',
    name: 'AirPods Pro Max',
    price: 549.99,
    image: 'https://images.unsplash.com/photo-1572569511254-d8f925fe2cbb?w=500&h=500&fit=crop',
    category: 'audio',
    description: 'Professional-grade wireless earbuds with adaptive transparency.',
    rating: 4.8,
    inStock: true
  },
  {
    id: '11',
    name: 'EliteDesk Standing Desk',
    price: 799.99,
    image: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=500&h=500&fit=crop',
    category: 'furniture',
    description: 'Electric height-adjustable desk with memory presets and cable management.',
    rating: 4.7,
    inStock: true
  },
  {
    id: '12',
    name: 'ZenLight Desk Lamp',
    price: 119.99,
    image: 'https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=500&h=500&fit=crop',
    category: 'furniture',
    description: 'Smart LED desk lamp with wireless charging base and app control.',
    rating: 4.5,
    inStock: true
  }
];

export const categories = [
  'all',
  'audio',
  'wearables',
  'accessories',
  'gaming',
  'displays',
  'furniture'
];