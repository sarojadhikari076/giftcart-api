import { Prisma, PrismaClient } from '@prisma/client';
import { hashSync } from 'bcrypt';
import slugify from 'slugify';

const prisma = new PrismaClient();

const admin: Prisma.UserCreateInput = {
  email: 'sarojadhikari076@gmail.com',
  name: 'Saroj Adhikari',
  address: '11 Devonshire Road, London',
  password: hashSync('password', 10),
  dateOfBirth: '1990-09-25T00:00:00Z',
  gender: 'Male',
  phone: '0123456789',
  role: 'ADMIN',
};

const categories: Prisma.CategoryCreateInput[] = [
  {
    name: 'Electronics',
    description: 'Electronic items',
    tags: { set: ['electronics', 'gadgets'] },
  },
  {
    name: 'Clothing',
    description: 'Clothing items',
    tags: { set: ['clothing', 'fashion'] },
  },
  {
    name: 'Electronics',
    description:
      'High-quality electronic devices including smartphones, laptops, and accessories.',
    tags: {
      set: [
        'electronics',
        'gadgets',
        'tech',
        'devices',
        'smartphones',
        'laptops',
        'accessories',
        'wearables',
        'innovation',
        'technology',
      ],
    },
  },
  {
    name: 'Clothing',
    description:
      'Fashionable apparel for men, women, and children, featuring a wide range of styles.',
    tags: {
      set: [
        'clothing',
        'fashion',
        'apparel',
        'style',
        'casual',
        'formal',
        'menswear',
        'womenswear',
        'children',
      ],
    },
  },
  {
    name: 'Home Appliances',
    description:
      'Essential appliances for modern homes, improving comfort and convenience.',
    tags: {
      set: [
        'appliances',
        'home',
        'kitchen',
        'electronics',
        'gadgets',
        'energy-efficient',
        'smart-home',
        'comfort',
        'living',
        'domestic',
      ],
    },
  },
  {
    name: 'Books',
    description:
      'A curated collection of books across various genres for all readers.',
    tags: {
      set: [
        'books',
        'literature',
        'novels',
        'non-fiction',
        'fiction',
        'reading',
        'educational',
        'academic',
        'biography',
        'bestsellers',
      ],
    },
  },
  {
    name: 'Beauty and Personal Care',
    description:
      'Premium beauty products and personal care essentials for daily grooming.',
    tags: {
      set: [
        'beauty',
        'personal care',
        'skincare',
        'makeup',
        'haircare',
        'grooming',
        'hygiene',
        'cosmetics',
        'fragrance',
        'wellness',
      ],
    },
  },
  {
    name: 'Sports Equipment',
    description:
      'Top-quality equipment for a variety of sports and outdoor activities.',
    tags: {
      set: [
        'sports',
        'equipment',
        'fitness',
        'outdoors',
        'athletics',
        'gear',
        'exercise',
        'team sports',
        'training',
        'performance',
      ],
    },
  },
  {
    name: 'Toys and Games',
    description: 'Fun and educational toys and games for children of all ages.',
    tags: {
      set: [
        'toys',
        'games',
        'children',
        'educational',
        'puzzles',
        'action figures',
        'board games',
        'outdoor',
        'playtime',
        'fun',
      ],
    },
  },
  {
    name: 'Furniture',
    description:
      'Stylish and durable furniture for every room in your home or office.',
    tags: {
      set: [
        'furniture',
        'home',
        'office',
        'living room',
        'bedroom',
        'durable',
        'stylish',
        'wooden',
        'comfort',
        'interior',
      ],
    },
  },
  {
    name: 'Groceries',
    description:
      'Fresh, high-quality food products for your daily cooking and consumption.',
    tags: {
      set: [
        'groceries',
        'food',
        'fresh',
        'organic',
        'vegetables',
        'fruits',
        'daily essentials',
        'cooking',
        'baking',
        'pantry',
      ],
    },
  },
  {
    name: 'Automotive',
    description:
      'Automobile parts, accessories, and tools for vehicle maintenance and enhancement.',
    tags: {
      set: [
        'automotive',
        'cars',
        'motorbikes',
        'accessories',
        'maintenance',
        'parts',
        'tools',
        'upgrades',
        'safety',
        'performance',
      ],
    },
  },
  {
    name: 'Jewellery',
    description:
      'Exquisite jewellery pieces for all occasions, crafted from the finest materials.',
    tags: {
      set: [
        'jewellery',
        'accessories',
        'fashion',
        'gold',
        'silver',
        'diamonds',
        'rings',
        'bracelets',
        'necklaces',
        'luxury',
      ],
    },
  },
  {
    name: 'Health and Wellness',
    description:
      'Products focused on promoting a healthy lifestyle and overall wellness.',
    tags: {
      set: [
        'health',
        'wellness',
        'fitness',
        'vitamins',
        'supplements',
        'nutrition',
        'exercise',
        'self-care',
        'mental health',
        'lifestyle',
      ],
    },
  },
  {
    name: 'Footwear',
    description:
      'Comfortable and stylish shoes for all types of activities and events.',
    tags: {
      set: [
        'footwear',
        'shoes',
        'boots',
        'sandals',
        'sneakers',
        'comfort',
        'fashion',
        'men',
        'women',
        'children',
      ],
    },
  },
  {
    name: 'Pet Supplies',
    description:
      'Everything you need to care for your pets, from food to accessories.',
    tags: {
      set: [
        'pets',
        'supplies',
        'food',
        'toys',
        'grooming',
        'accessories',
        'health',
        'dogs',
        'cats',
        'fish',
      ],
    },
  },
  {
    name: 'Musical Instruments',
    description:
      'A wide range of musical instruments for beginners and professionals alike.',
    tags: {
      set: [
        'music',
        'instruments',
        'guitars',
        'pianos',
        'drums',
        'bands',
        'performance',
        'sound',
        'practice',
        'professional',
      ],
    },
  },
  {
    name: 'Stationery and Office Supplies',
    description:
      'Essential stationery and office supplies for work, school, or personal projects.',
    tags: {
      set: [
        'stationery',
        'office',
        'supplies',
        'paper',
        'pens',
        'notebooks',
        'organisation',
        'folders',
        'files',
        'writing',
      ],
    },
  },
  {
    name: 'Baby Products',
    description:
      'Safe and high-quality products for babies, including clothing, toys, and accessories.',
    tags: {
      set: [
        'baby',
        'products',
        'clothing',
        'accessories',
        'toys',
        'health',
        'safety',
        'care',
        'newborn',
        'parenting',
      ],
    },
  },
  {
    name: 'Art and Craft',
    description:
      'Supplies and materials for artists and hobbyists for various creative projects.',
    tags: {
      set: [
        'art',
        'craft',
        'creativity',
        'materials',
        'paint',
        'drawing',
        'sculpting',
        'hobby',
        'projects',
        'DIY',
      ],
    },
  },
  {
    name: 'Garden and Outdoor',
    description:
      'Everything you need for gardening and outdoor activities, from plants to furniture.',
    tags: {
      set: [
        'garden',
        'outdoor',
        'plants',
        'furniture',
        'tools',
        'landscaping',
        'decor',
        'patio',
        'lawn',
        'barbecue',
      ],
    },
  },
  {
    name: 'Kitchenware',
    description:
      'A variety of essential and modern kitchen tools and utensils for everyday cooking.',
    tags: {
      set: [
        'kitchenware',
        'utensils',
        'cooking',
        'baking',
        'appliances',
        'cutlery',
        'cookware',
        'gadgets',
        'kitchen tools',
        'modern',
      ],
    },
  },
  {
    name: 'Travel and Luggage',
    description:
      'Durable and stylish travel gear including luggage, backpacks, and travel accessories.',
    tags: {
      set: [
        'travel',
        'luggage',
        'backpacks',
        'bags',
        'suitcases',
        'gear',
        'adventure',
        'holiday',
        'packing',
        'durable',
      ],
    },
  },
];

const products: Prisma.ProductCreateInput[] = [
  {
    name: 'Laptop',
    shortDescription: 'A powerful laptop for personal and professional use.',
    longDescription:
      'This high-performance laptop features the latest processor, a full HD display, and ample storage for both work and entertainment. Ideal for students, professionals, and gamers alike.',
    price: 1200,
    availableQuantity: 15,
    averageRating: 4.6,
    category: {
      connect: { id: 1 },
    },
    reviewCount: 25,
    slug: 'laptop-2',
    thumbnail:
      'https://res.cloudinary.com/sliceup/image/upload/v1727023560/products/svekc8ujhzt8yvwhppdi.jpg',
    unit: 'pcs',
    tags: { set: ['laptop', 'electronics', 'tech', 'gadgets', 'computers'] },
  },
  {
    name: 'Smartphone',
    shortDescription: 'A sleek and powerful smartphone.',
    longDescription:
      'This smartphone comes with an advanced camera system, high-speed processor, and long-lasting battery, perfect for staying connected and capturing every moment.',
    price: 800,
    availableQuantity: 30,
    averageRating: 4.7,
    category: {
      connect: { id: 1 },
    },
    reviewCount: 40,
    slug: 'smartphone',
    thumbnail:
      'https://res.cloudinary.com/sliceup/image/upload/v1727023602/products/vx6n9fuxvmtr0eisyfjk.jpg',
    unit: 'pcs',
    tags: {
      set: [
        'smartphone',
        'electronics',
        'mobile',
        'gadgets',
        'tech',
        'communication',
      ],
    },
  },
  {
    name: 'Wireless Headphones',
    shortDescription:
      'Comfortable wireless headphones with superior sound quality.',
    longDescription:
      'These wireless headphones deliver crystal-clear audio with active noise cancellation. They offer a comfortable fit and up to 30 hours of battery life, making them perfect for long listening sessions.',
    price: 200,
    availableQuantity: 50,
    averageRating: 4.8,
    category: {
      connect: { id: 1 },
    },
    reviewCount: 60,
    slug: 'wireless-headphones',
    thumbnail:
      'https://res.cloudinary.com/sliceup/image/upload/v1727023643/products/ck3bvkyiqojswkdnxbrk.jpg',
    unit: 'pcs',
    tags: {
      set: ['headphones', 'wireless', 'electronics', 'audio', 'music', 'tech'],
    },
  },
  {
    name: 'Smartwatch',
    shortDescription: 'A feature-rich smartwatch with health tracking.',
    longDescription:
      'This smartwatch helps you stay connected and healthy, featuring heart rate monitoring, step tracking, notifications, and more. It’s waterproof and boasts a sleek design, making it perfect for daily use.',
    price: 250,
    availableQuantity: 20,
    averageRating: 4.4,
    category: {
      connect: { id: 1 },
    },
    reviewCount: 35,
    slug: 'smartwatch',
    thumbnail:
      'https://res.cloudinary.com/sliceup/image/upload/v1727023685/products/wbwb3kiqnju0yvxo1ero.jpg',
    unit: 'pcs',
    tags: {
      set: [
        'smartwatch',
        'electronics',
        'wearables',
        'health',
        'tech',
        'gadgets',
      ],
    },
  },
  {
    name: 'Bluetooth Speaker',
    shortDescription:
      'Portable Bluetooth speaker with deep bass and waterproof design.',
    longDescription:
      'This Bluetooth speaker offers immersive sound with deep bass and crisp highs. It’s portable, waterproof, and perfect for outdoor use, with a long battery life of up to 24 hours.',
    price: 150,
    availableQuantity: 35,
    averageRating: 4.5,
    category: {
      connect: { id: 1 },
    },
    reviewCount: 50,
    slug: 'bluetooth-speaker-2',
    thumbnail:
      'https://res.cloudinary.com/sliceup/image/upload/v1727023709/products/pgxbdgo83kzridqrlpri.jpg',
    unit: 'pcs',
    tags: {
      set: [
        'speaker',
        'bluetooth',
        'electronics',
        'audio',
        'tech',
        'music',
        'outdoor',
      ],
    },
  },
  {
    name: 'T-Shirt',
    shortDescription: 'Comfortable cotton t-shirt for casual wear.',
    longDescription:
      'This 100% cotton t-shirt offers a comfortable fit and comes in a variety of colours. It’s perfect for casual outings and everyday wear, and pairs well with jeans or shorts.',
    price: 20,
    availableQuantity: 100,
    averageRating: 4.3,
    category: {
      connect: { id: 2 },
    },
    reviewCount: 20,
    slug: 't-shirt',
    thumbnail:
      'https://res.cloudinary.com/sliceup/image/upload/v1727023743/products/zh7znqxf0pf4pqyl7frj.jpg',
    unit: 'pcs',
    tags: {
      set: ['t-shirt', 'clothing', 'fashion', 'casual', 'cotton', 'apparel'],
    },
  },
  {
    name: 'Jeans',
    shortDescription: 'Stylish denim jeans with a comfortable fit.',
    longDescription:
      'These denim jeans are made from high-quality materials for a comfortable and durable fit. Available in multiple shades, they are perfect for both casual and semi-formal wear.',
    price: 50,
    availableQuantity: 75,
    averageRating: 4.5,
    category: {
      connect: { id: 2 },
    },
    reviewCount: 30,
    slug: 'jeans',
    thumbnail:
      'https://res.cloudinary.com/sliceup/image/upload/v1727023777/products/ybynlbufcb4shwekhjha.jpg',
    unit: 'pcs',
    tags: {
      set: ['jeans', 'clothing', 'fashion', 'denim', 'apparel', 'casual'],
    },
  },
  {
    name: 'Jacket',
    shortDescription: 'A stylish and warm jacket for colder weather.',
    longDescription:
      'This insulated jacket is designed for warmth and style. Made from high-quality materials, it features a modern design that is perfect for both casual and outdoor wear.',
    price: 120,
    availableQuantity: 40,
    averageRating: 4.6,
    category: {
      connect: { id: 2 },
    },
    reviewCount: 45,
    slug: 'jacket',
    thumbnail:
      'https://res.cloudinary.com/sliceup/image/upload/v1727023817/products/emsvhpuc8pleyq7kebz8.jpg',
    unit: 'pcs',
    tags: {
      set: [
        'jacket',
        'clothing',
        'fashion',
        'outerwear',
        'apparel',
        'winter',
        'casual',
      ],
    },
  },
  {
    name: 'Sneakers',
    shortDescription: 'Comfortable sneakers for everyday wear.',
    longDescription:
      'These sneakers offer a perfect blend of comfort and style, ideal for daily use. They feature a durable design, breathable materials, and are available in various colours.',
    price: 80,
    availableQuantity: 60,
    averageRating: 4.7,
    category: {
      connect: { id: 2 },
    },
    reviewCount: 50,
    slug: 'sneakers',
    thumbnail:
      'https://res.cloudinary.com/sliceup/image/upload/v1727023857/products/bikkyy06oxntildpeqq2.jpg',
    unit: 'pairs',
    tags: {
      set: [
        'sneakers',
        'footwear',
        'clothing',
        'fashion',
        'shoes',
        'comfort',
        'casual',
      ],
    },
  },
  {
    name: 'Dress',
    shortDescription: 'Elegant dress for formal and casual events.',
    longDescription:
      'This dress is designed to offer elegance and comfort, suitable for both formal events and casual outings. It features a flattering cut and is available in multiple colours and sizes.',
    price: 100,
    availableQuantity: 25,
    averageRating: 4.4,
    category: {
      connect: { id: 2 },
    },
    reviewCount: 40,
    slug: 'dress',
    thumbnail:
      'https://res.cloudinary.com/sliceup/image/upload/v1727023894/products/olr7hdbnvtnd7forjsz6.jpg',
    unit: 'pcs',
    tags: {
      set: [
        'dress',
        'clothing',
        'fashion',
        'apparel',
        'formal',
        'elegant',
        'casual',
      ],
    },
  },
  {
    name: 'Refrigerator',
    shortDescription: 'Energy-efficient refrigerator with a large capacity.',
    longDescription:
      'This refrigerator offers a large storage capacity, advanced cooling technology, and energy-saving features. It’s designed to keep your food fresh while reducing energy consumption.',
    price: 600,
    availableQuantity: 10,
    averageRating: 4.5,
    category: {
      connect: { id: 3 },
    },
    reviewCount: 20,
    slug: 'refrigerator',
    thumbnail:
      'https://res.cloudinary.com/sliceup/image/upload/v1727023917/products/e7nip3h5jkeoshgho04g.jpg',
    unit: 'pcs',
    tags: {
      set: [
        'refrigerator',
        'appliances',
        'home',
        'kitchen',
        'electronics',
        'energy-efficient',
        'food storage',
      ],
    },
  },
  {
    name: 'Washing Machine',
    shortDescription:
      'High-efficiency washing machine with multiple wash cycles.',
    longDescription:
      'This washing machine features a variety of wash cycles to suit different fabrics and loads. It’s energy-efficient, quiet, and offers a large capacity for handling all your laundry needs.',
    price: 500,
    availableQuantity: 15,
    averageRating: 4.6,
    category: {
      connect: { id: 3 },
    },
    reviewCount: 30,
    slug: 'washing-machine',
    thumbnail:
      'https://res.cloudinary.com/sliceup/image/upload/v1727023967/products/oxcyavjv9aytiwykfjk2.jpg',
    unit: 'pcs',
    tags: {
      set: [
        'washing machine',
        'appliances',
        'home',
        'laundry',
        'energy-efficient',
        'electronics',
        'cleaning',
      ],
    },
  },
  {
    name: 'Microwave Oven',
    shortDescription: 'Compact microwave oven with advanced cooking features.',
    longDescription:
      'This microwave oven offers quick and even cooking with advanced settings for defrosting, reheating, and baking. Its compact size makes it a perfect addition to any kitchen.',
    price: 120,
    availableQuantity: 25,
    averageRating: 4.4,
    category: { connect: { id: 3 } },
    reviewCount: 25,
    slug: 'microwave-oven',
    thumbnail:
      'https://res.cloudinary.com/sliceup/image/upload/v1727024012/products/ru0ociaoatn58fyvbb8c.jpg',
    unit: 'pcs',
    tags: {
      set: [
        'microwave',
        'appliances',
        'kitchen',
        'electronics',
        'cooking',
        'home',
        'compact',
      ],
    },
  },
  {
    name: 'Air Purifier',
    shortDescription: 'Air purifier with HEPA filter for cleaner air.',
    longDescription:
      'This air purifier features a HEPA filter that effectively removes allergens and pollutants from the air. It’s designed to improve indoor air quality and is perfect for homes with pets or allergies.',
    price: 180,
    availableQuantity: 20,
    averageRating: 4.7,
    category: { connect: { id: 3 } },
    reviewCount: 15,
    slug: 'air-purifier',
    thumbnail:
      'https://res.cloudinary.com/sliceup/image/upload/v1727024033/products/zs3dneol1ygs68shb6a1.jpg',
    unit: 'pcs',
    tags: {
      set: [
        'air purifier',
        'appliances',
        'home',
        'electronics',
        'air quality',
        'health',
        'clean',
      ],
    },
  },
  {
    name: 'Coffee Maker',
    shortDescription:
      'Programmable coffee maker with multiple brewing options.',
    longDescription:
      'This coffee maker offers programmable settings, multiple brewing options, and a built-in grinder. It’s perfect for brewing fresh coffee in the morning or at any time of the day.',
    price: 90,
    availableQuantity: 30,
    averageRating: 4.5,
    category: { connect: { id: 3 } },
    reviewCount: 40,
    slug: 'coffee-maker',
    thumbnail:
      'https://res.cloudinary.com/sliceup/image/upload/v1727024068/products/pw9srk2uhyhmrsfk9itl.jpg',
    unit: 'pcs',
    tags: {
      set: [
        'coffee maker',
        'appliances',
        'kitchen',
        'home',
        'electronics',
        'brewing',
        'coffee',
      ],
    },
  },
  {
    name: 'Science Fiction Novel',
    shortDescription:
      'An engaging science fiction novel exploring futuristic concepts.',
    longDescription:
      'This science fiction novel delves into futuristic concepts and imaginative scenarios. It offers an engaging storyline, well-developed characters, and thought-provoking themes, perfect for fans of the genre.',
    price: 15,
    availableQuantity: 50,
    averageRating: 4.8,
    category: { connect: { id: 4 } },
    reviewCount: 55,
    slug: 'science-fiction-novel',
    thumbnail:
      'https://res.cloudinary.com/sliceup/image/upload/v1727024102/products/p5jjkwpd7iydfp9mzod7.jpg',
    unit: 'pcs',
    tags: {
      set: [
        'novel',
        'science fiction',
        'books',
        'reading',
        'fiction',
        'imagination',
        'literature',
      ],
    },
  },
  {
    name: 'Biography',
    shortDescription: 'An inspiring biography of a historical figure.',
    longDescription:
      'This biography provides an in-depth look into the life and achievements of a historical figure. It offers insights into their personal and professional journey, making it an inspiring read for those interested in history and personal stories.',
    price: 20,
    availableQuantity: 40,
    averageRating: 4.6,
    category: { connect: { id: 4 } },
    reviewCount: 30,
    slug: 'biography',
    thumbnail:
      'https://res.cloudinary.com/sliceup/image/upload/v1727024129/products/a9otlpunpfhknn7znlaa.jpg',
    unit: 'pcs',
    tags: {
      set: [
        'biography',
        'books',
        'non-fiction',
        'history',
        'inspiration',
        'literature',
        'reading',
      ],
    },
  },
  {
    name: 'Cookbook',
    shortDescription: 'A cookbook with diverse recipes for all occasions.',
    longDescription:
      'This cookbook features a collection of diverse recipes, from quick weeknight dinners to elaborate dishes for special occasions. It includes step-by-step instructions and beautiful photographs to inspire your culinary adventures.',
    price: 25,
    availableQuantity: 60,
    averageRating: 4.7,
    category: { connect: { id: 4 } },
    reviewCount: 35,
    slug: 'cookbook',
    thumbnail:
      'https://res.cloudinary.com/sliceup/image/upload/v1727024156/products/pqbxlgarsf79jiq5glcx.jpg',
    unit: 'pcs',
    tags: {
      set: [
        'cookbook',
        'recipes',
        'books',
        'cooking',
        'food',
        'culinary',
        'kitchen',
      ],
    },
  },
  {
    name: 'Travel Guide',
    shortDescription: 'A comprehensive travel guide for popular destinations.',
    longDescription:
      'This travel guide provides detailed information about popular destinations, including tips on sightseeing, dining, and accommodations. It’s an essential companion for anyone planning a trip or looking to explore new places.',
    price: 18,
    availableQuantity: 45,
    averageRating: 4.4,
    category: { connect: { id: 4 } },
    reviewCount: 25,
    slug: 'travel-guide',
    thumbnail:
      'https://res.cloudinary.com/sliceup/image/upload/v1727024180/products/d9hc9puhbtx1jn4tw0md.jpg',
    unit: 'pcs',
    tags: {
      set: [
        'travel',
        'guide',
        'books',
        'exploration',
        'destinations',
        'reading',
        'adventure',
      ],
    },
  },
  {
    name: 'Self-Help Book',
    shortDescription: 'A motivational book for personal development.',
    longDescription:
      'This self-help book offers motivational insights and practical advice for personal development. It covers various topics such as goal-setting, overcoming challenges, and achieving success, making it a valuable read for anyone seeking personal growth.',
    price: 22,
    availableQuantity: 55,
    averageRating: 4.6,
    category: { connect: { id: 4 } },
    reviewCount: 40,
    slug: 'self-help-book',
    thumbnail:
      'https://res.cloudinary.com/sliceup/image/upload/v1727024213/products/egqwqxb5pl0slwbadhqj.jpg',
    unit: 'pcs',
    tags: {
      set: [
        'self-help',
        'books',
        'personal development',
        'motivation',
        'reading',
        'inspiration',
        'growth',
      ],
    },
  },
  {
    name: 'Tablet',
    shortDescription: 'Versatile tablet for work and entertainment.',
    longDescription:
      'This versatile tablet features a high-resolution display, powerful processor, and long battery life. It’s perfect for both work and play, whether you’re browsing the web, watching videos, or taking notes.',
    price: 300,
    availableQuantity: 20,
    averageRating: 4.5,
    category: {
      connect: { id: 1 },
    },
    reviewCount: 15,
    slug: 'tablet',
    thumbnail:
      'https://res.cloudinary.com/sliceup/image/upload/v1727024244/products/bjuoud42qawaiuwcwgll.jpg',
    unit: 'pcs',
    tags: {
      set: [
        'tablet',
        'electronics',
        'tech',
        'gadgets',
        'mobile',
        'devices',
        'entertainment',
      ],
    },
  },
  {
    name: 'Digital Camera',
    shortDescription:
      'High-resolution digital camera for photography enthusiasts.',
    longDescription:
      'This digital camera offers high-resolution image capture, various shooting modes, and advanced features for photography enthusiasts. It’s perfect for capturing high-quality photos and videos with ease.',
    price: 750,
    availableQuantity: 12,
    averageRating: 4.7,
    category: {
      connect: { id: 1 },
    },
    reviewCount: 20,
    slug: 'digital-camera',
    thumbnail:
      'https://res.cloudinary.com/sliceup/image/upload/v1727024269/products/l4rypdmkvpzmxgucltbr.jpg',
    unit: 'pcs',
    tags: {
      set: [
        'camera',
        'electronics',
        'photography',
        'tech',
        'gadgets',
        'high-resolution',
        'videos',
      ],
    },
  },
  {
    name: 'Smart Home Hub',
    shortDescription: 'Smart home hub for controlling your smart devices.',
    longDescription:
      'This smart home hub allows you to control all your smart devices from a single platform. It supports various protocols and integrates with multiple devices, making home automation easy and efficient.',
    price: 150,
    availableQuantity: 25,
    averageRating: 4.6,
    category: {
      connect: { id: 1 },
    },
    reviewCount: 10,
    slug: 'smart-home-hub',
    thumbnail:
      'https://res.cloudinary.com/sliceup/image/upload/v1727024298/products/twgxnfvom40iqgyzjxna.png',
    unit: 'pcs',
    tags: {
      set: [
        'smart home',
        'hub',
        'electronics',
        'automation',
        'tech',
        'gadgets',
        'home',
      ],
    },
  },
  {
    name: 'External Hard Drive',
    shortDescription: 'Reliable external hard drive for data storage.',
    longDescription:
      'This external hard drive offers reliable and ample storage for your data. It features fast transfer speeds and a compact design, making it perfect for backing up important files and documents.',
    price: 120,
    availableQuantity: 40,
    averageRating: 4.4,
    category: {
      connect: { id: 1 },
    },
    reviewCount: 30,
    slug: 'external-hard-drive',
    thumbnail:
      'https://res.cloudinary.com/sliceup/image/upload/v1727024324/products/jehpc8vu28wqsbqqfmht.jpg',
    unit: 'pcs',
    tags: {
      set: [
        'hard drive',
        'storage',
        'electronics',
        'tech',
        'gadgets',
        'data backup',
        'computers',
      ],
    },
  },
  {
    name: 'Home Security Camera',
    shortDescription:
      'Wireless home security camera for monitoring your property.',
    longDescription:
      'This wireless home security camera offers real-time monitoring, motion detection, and high-definition video quality. It’s easy to install and ideal for keeping an eye on your property from anywhere.',
    price: 180,
    availableQuantity: 18,
    averageRating: 4.8,
    category: {
      connect: { id: 1 },
    },
    reviewCount: 25,
    slug: 'home-security-camera',
    thumbnail:
      'https://res.cloudinary.com/sliceup/image/upload/v1727024397/products/ex4p0s3lrtntjkpvymbu.jpg',
    unit: 'pcs',
    tags: {
      set: [
        'security camera',
        'electronics',
        'home',
        'tech',
        'gadgets',
        'monitoring',
        'surveillance',
      ],
    },
  },
  {
    name: 'Sweater',
    shortDescription: 'Warm and cozy sweater for cold weather.',
    longDescription:
      'This sweater is made from soft, warm materials, perfect for keeping you cozy during cold weather. It features a classic design and is available in various sizes and colours.',
    price: 55,
    availableQuantity: 45,
    averageRating: 4.5,
    category: {
      connect: { id: 2 },
    },
    reviewCount: 25,
    slug: 'sweater',
    thumbnail:
      'https://res.cloudinary.com/sliceup/image/upload/v1727024423/products/vbmg0kog2yocfsuocbe3.jpg',
    unit: 'pcs',
    tags: {
      set: [
        'sweater',
        'clothing',
        'fashion',
        'winter',
        'apparel',
        'cozy',
        'warm',
      ],
    },
  },
  {
    name: 'Blazer',
    shortDescription: 'Elegant blazer suitable for formal occasions.',
    longDescription:
      'This elegant blazer is perfect for formal events and professional settings. It features a tailored fit, high-quality fabric, and a sophisticated design that adds a touch of class to any outfit.',
    price: 150,
    availableQuantity: 30,
    averageRating: 4.6,
    category: {
      connect: { id: 2 },
    },
    reviewCount: 20,
    slug: 'blazer',
    thumbnail:
      'https://res.cloudinary.com/sliceup/image/upload/v1727024465/products/u2spqvskqhnys9u3kgcw.jpg',
    unit: 'pcs',
    tags: {
      set: [
        'blazer',
        'clothing',
        'fashion',
        'formal',
        'apparel',
        'professional',
        'elegant',
      ],
    },
  },
  {
    name: 'Skirt',
    shortDescription: 'Fashionable skirt for various occasions.',
    longDescription:
      'This skirt features a stylish design that is suitable for various occasions, from casual to semi-formal events. It’s made from high-quality materials and is available in different lengths and colours.',
    price: 45,
    availableQuantity: 40,
    averageRating: 4.4,
    category: {
      connect: { id: 2 },
    },
    reviewCount: 25,
    slug: 'skirt',
    thumbnail:
      'https://res.cloudinary.com/sliceup/image/upload/v1727024495/products/nye6zfzs50yz7c1hrfcw.jpg',
    unit: 'pcs',
    tags: {
      set: [
        'skirt',
        'clothing',
        'fashion',
        'apparel',
        'casual',
        'versatile',
        'trendy',
      ],
    },
  },
  {
    name: 'Shorts',
    shortDescription: 'Comfortable shorts for warm weather.',
    longDescription:
      'These shorts are perfect for warm weather and casual outings. Made from lightweight and breathable materials, they offer comfort and style for everyday wear.',
    price: 30,
    availableQuantity: 50,
    averageRating: 4.3,
    category: {
      connect: { id: 2 },
    },
    reviewCount: 30,
    slug: 'shorts',
    thumbnail:
      'https://res.cloudinary.com/sliceup/image/upload/v1727024518/products/kmvkmia4srpmtxlvzukp.jpg',
    unit: 'pcs',
    tags: {
      set: [
        'shorts',
        'clothing',
        'fashion',
        'summer',
        'apparel',
        'comfortable',
        'casual',
      ],
    },
  },
  {
    name: 'Cardigan',
    shortDescription: 'Soft and stylish cardigan for layering.',
    longDescription:
      'This cardigan is perfect for layering over your favourite outfits. It’s made from soft, comfortable material and features a stylish design, making it a versatile addition to your wardrobe.',
    price: 65,
    availableQuantity: 35,
    averageRating: 4.5,
    category: {
      connect: { id: 2 },
    },
    reviewCount: 15,
    slug: 'cardigan',
    thumbnail:
      'https://res.cloudinary.com/sliceup/image/upload/v1727024544/products/uhf9jtwqswtby8e0izke.jpg',
    unit: 'pcs',
    tags: {
      set: [
        'cardigan',
        'clothing',
        'fashion',
        'layering',
        'apparel',
        'soft',
        'comfortable',
      ],
    },
  },
  {
    name: 'Toaster',
    shortDescription: 'Compact toaster with multiple browning settings.',
    longDescription:
      'This compact toaster features multiple browning settings and is perfect for making toast to your desired crispness. It’s easy to clean and fits well in any kitchen.',
    price: 50,
    availableQuantity: 28,
    averageRating: 4.3,
    category: {
      connect: { id: 3 },
    },
    reviewCount: 20,
    slug: 'toaster',
    thumbnail:
      'https://res.cloudinary.com/sliceup/image/upload/v1727024566/products/uopkquf4w9ypubmddfpo.jpg',
    unit: 'pcs',
    tags: {
      set: [
        'toaster',
        'appliances',
        'kitchen',
        'home',
        'electronics',
        'breakfast',
        'compact',
      ],
    },
  },
  {
    name: 'Blender',
    shortDescription: 'High-speed blender for smoothies and more.',
    longDescription:
      'This high-speed blender is perfect for making smoothies, soups, and sauces. It features powerful blades and multiple speed settings, ensuring smooth and consistent results every time.',
    price: 90,
    availableQuantity: 22,
    averageRating: 4.6,
    category: {
      connect: { id: 3 },
    },
    reviewCount: 25,
    slug: 'blender',
    thumbnail:
      'https://res.cloudinary.com/sliceup/image/upload/v1727024602/products/rv2hiz0fxp9i2lu43djr.jpg',
    unit: 'pcs',
    tags: {
      set: [
        'blender',
        'appliances',
        'kitchen',
        'home',
        'electronics',
        'smoothies',
        'cooking',
      ],
    },
  },
  {
    name: 'Electric Kettle',
    shortDescription: 'Fast boiling electric kettle with automatic shut-off.',
    longDescription:
      'This electric kettle boils water quickly and features an automatic shut-off for safety. It’s perfect for making tea, coffee, or instant soups, and its sleek design fits well in any kitchen.',
    price: 40,
    availableQuantity: 33,
    averageRating: 4.4,
    category: {
      connect: { id: 3 },
    },
    reviewCount: 18,
    slug: 'electric-kettle',
    thumbnail:
      'https://res.cloudinary.com/sliceup/image/upload/v1727024634/products/rhbjyynjxpwlv1vzbcdb.jpg',
    unit: 'pcs',
    tags: {
      set: [
        'electric kettle',
        'appliances',
        'kitchen',
        'home',
        'electronics',
        'boiling',
        'fast',
      ],
    },
  },
  {
    name: 'Dishwasher',
    shortDescription: 'Efficient dishwasher with multiple cleaning cycles.',
    longDescription:
      'This dishwasher offers multiple cleaning cycles and efficient performance. It’s designed to handle large loads and ensure your dishes come out sparkling clean with minimal effort.',
    price: 600,
    availableQuantity: 10,
    averageRating: 4.7,
    category: {
      connect: { id: 3 },
    },
    reviewCount: 12,
    slug: 'dishwasher',
    thumbnail:
      'https://res.cloudinary.com/sliceup/image/upload/v1727024657/products/uoa78hxj8y0k8ea7e62m.jpg',
    unit: 'pcs',
    tags: {
      set: [
        'dishwasher',
        'appliances',
        'kitchen',
        'home',
        'electronics',
        'cleaning',
        'efficient',
      ],
    },
  },
  {
    name: 'Washing Machine',
    shortDescription: 'Front-loading washing machine with energy efficiency.',
    longDescription:
      'This front-loading washing machine offers energy efficiency and a range of washing programs. It’s designed to handle large loads and provide thorough cleaning while conserving water and energy.',
    price: 800,
    availableQuantity: 8,
    averageRating: 4.8,
    category: {
      connect: { id: 3 },
    },
    reviewCount: 14,
    slug: 'washing-machine',
    thumbnail:
      'https://res.cloudinary.com/sliceup/image/upload/v1727024684/products/f4mcsxq1a3fs1re5b92t.jpg',
    unit: 'pcs',
    tags: {
      set: [
        'washing machine',
        'appliances',
        'home',
        'electronics',
        'cleaning',
        'energy efficient',
        'laundry',
      ],
    },
  },
  {
    name: 'Mystery Thriller',
    shortDescription: 'A gripping mystery thriller with unexpected twists.',
    longDescription:
      'This mystery thriller offers a gripping storyline filled with unexpected twists and turns. It keeps readers on the edge of their seats as they try to solve the mystery alongside the characters.',
    price: 18,
    availableQuantity: 40,
    averageRating: 4.7,
    category: {
      connect: { id: 4 },
    },
    reviewCount: 20,
    slug: 'mystery-thriller',
    thumbnail:
      'https://res.cloudinary.com/sliceup/image/upload/v1727024715/products/mcz4udt1m6hkpsnfthdc.jpg',
    unit: 'pcs',
    tags: {
      set: [
        'mystery',
        'thriller',
        'books',
        'reading',
        'fiction',
        'suspense',
        'novel',
      ],
    },
  },
  {
    name: 'Fantasy Epic',
    shortDescription: 'An epic fantasy novel with an immersive world.',
    longDescription:
      'This epic fantasy novel features a richly immersive world and an engaging plot. It offers a captivating story with well-developed characters and intricate lore, perfect for fans of the genre.',
    price: 22,
    availableQuantity: 35,
    averageRating: 4.6,
    category: {
      connect: { id: 4 },
    },
    reviewCount: 25,
    slug: 'fantasy-epic',
    thumbnail:
      'https://res.cloudinary.com/sliceup/image/upload/v1727024750/products/qytmb21cdcvcmakgjwzv.jpg',
    unit: 'pcs',
    tags: {
      set: [
        'fantasy',
        'epic',
        'books',
        'reading',
        'fiction',
        'world-building',
        'novel',
      ],
    },
  },
  {
    name: 'Historical Fiction',
    shortDescription: 'Historical fiction novel set in a significant era.',
    longDescription:
      'This historical fiction novel is set in a significant era and offers a detailed portrayal of historical events. It provides an engaging narrative and rich historical context, appealing to readers interested in history.',
    price: 20,
    availableQuantity: 50,
    averageRating: 4.5,
    category: {
      connect: { id: 4 },
    },
    reviewCount: 30,
    slug: 'historical-fiction',
    thumbnail:
      'https://res.cloudinary.com/sliceup/image/upload/v1727024779/products/ocw06v4zlvuqxedd3j0i.jpg',
    unit: 'pcs',
    tags: {
      set: [
        'historical fiction',
        'books',
        'reading',
        'history',
        'fiction',
        'novel',
        'literature',
      ],
    },
  },
  {
    name: 'Poetry Collection',
    shortDescription: 'A collection of modern and classic poetry.',
    longDescription:
      'This poetry collection features a selection of modern and classic poems. It offers a diverse range of themes and styles, providing readers with a rich experience of poetic expression.',
    price: 12,
    availableQuantity: 60,
    averageRating: 4.8,
    category: {
      connect: { id: 4 },
    },
    reviewCount: 40,
    slug: 'poetry-collection',
    thumbnail:
      'https://res.cloudinary.com/sliceup/image/upload/v1727024806/products/ohfhfv7halmc83uo4y76.jpg',
    unit: 'pcs',
    tags: {
      set: [
        'poetry',
        'books',
        'reading',
        'modern',
        'classic',
        'collection',
        'literature',
      ],
    },
  },
  {
    name: 'Graphic Novel',
    shortDescription:
      'A visually stunning graphic novel with a compelling story.',
    longDescription:
      'This graphic novel combines stunning visuals with a compelling story. It offers a unique reading experience with its combination of artwork and narrative, appealing to fans of the genre.',
    price: 25,
    availableQuantity: 28,
    averageRating: 4.6,
    category: {
      connect: { id: 4 },
    },
    reviewCount: 20,
    slug: 'graphic-novel',
    thumbnail:
      'https://res.cloudinary.com/sliceup/image/upload/v1727024831/products/icrjnynm1pdtha5fys6g.jpg',
    unit: 'pcs',
    tags: {
      set: [
        'graphic novel',
        'books',
        'reading',
        'visuals',
        'story',
        'comics',
        'literature',
      ],
    },
  },
  {
    name: 'Smartwatch',
    shortDescription: 'Feature-packed smartwatch with health tracking.',
    longDescription:
      'This smartwatch offers a range of features including health tracking, notifications, and fitness monitoring. It’s designed to help you stay connected and manage your health conveniently.',
    price: 220,
    availableQuantity: 15,
    averageRating: 4.6,
    category: {
      connect: { id: 1 },
    },
    reviewCount: 18,
    slug: 'smartwatch-1',
    thumbnail:
      'https://res.cloudinary.com/sliceup/image/upload/v1727024854/products/owxqhpvcixwyarglemuu.jpg',
    unit: 'pcs',
    tags: {
      set: [
        'smartwatch',
        'electronics',
        'tech',
        'gadgets',
        'health',
        'fitness',
        'wearable',
      ],
    },
  },
  {
    name: 'Gaming Console',
    shortDescription: 'Latest gaming console with high performance.',
    longDescription:
      'This latest gaming console features high performance and supports a wide range of games. It provides an immersive gaming experience with advanced graphics and smooth gameplay.',
    price: 400,
    availableQuantity: 10,
    averageRating: 4.7,
    category: {
      connect: { id: 1 },
    },
    reviewCount: 22,
    slug: 'gaming-console',
    thumbnail:
      'https://res.cloudinary.com/sliceup/image/upload/v1727024875/products/sfp7q8x15h2mcte9kt0j.webp',
    unit: 'pcs',
    tags: {
      set: [
        'gaming console',
        'electronics',
        'tech',
        'gaming',
        'gadgets',
        'high performance',
        'entertainment',
      ],
    },
  },
  {
    name: 'Bluetooth Speaker',
    shortDescription: 'Portable Bluetooth speaker with high-quality sound.',
    longDescription:
      'This portable Bluetooth speaker delivers high-quality sound and is perfect for on-the-go listening. It features a long battery life and robust build, making it ideal for any environment.',
    price: 70,
    availableQuantity: 30,
    averageRating: 4.4,
    category: {
      connect: { id: 1 },
    },
    reviewCount: 25,
    slug: 'bluetooth-speaker',
    thumbnail:
      'https://res.cloudinary.com/sliceup/image/upload/v1727024915/products/rebttihzbbisj6gamtd9.jpg',
    unit: 'pcs',
    tags: {
      set: [
        'bluetooth speaker',
        'electronics',
        'tech',
        'gadgets',
        'audio',
        'portable',
        'sound',
      ],
    },
  },
  {
    name: 'VR Headset',
    shortDescription:
      'Immersive VR headset for an enhanced virtual experience.',
    longDescription:
      'This VR headset offers an immersive virtual reality experience with high-resolution visuals and accurate motion tracking. It’s designed for both gaming and educational applications.',
    price: 350,
    availableQuantity: 8,
    averageRating: 4.8,
    category: {
      connect: { id: 1 },
    },
    reviewCount: 12,
    slug: 'vr-headset',
    thumbnail:
      'https://res.cloudinary.com/sliceup/image/upload/v1727024948/products/i3f3zyzolmc0ona8qpnf.jpg',
    unit: 'pcs',
    tags: {
      set: [
        'VR headset',
        'electronics',
        'tech',
        'gaming',
        'virtual reality',
        'gadgets',
        'immersive',
      ],
    },
  },
  {
    name: 'Digital Frame',
    shortDescription:
      'High-resolution digital photo frame with Wi-Fi connectivity.',
    longDescription:
      'This digital photo frame displays high-resolution images and comes with Wi-Fi connectivity for easy photo sharing. It’s perfect for showcasing your favourite memories in a modern way.',
    price: 120,
    availableQuantity: 20,
    averageRating: 4.5,
    category: {
      connect: { id: 1 },
    },
    reviewCount: 15,
    slug: 'digital-frame',
    thumbnail:
      'https://res.cloudinary.com/sliceup/image/upload/v1727024978/products/qq9pgo5ltf7nihx86heg.jpg',
    unit: 'pcs',
    tags: {
      set: [
        'digital frame',
        'electronics',
        'tech',
        'gadgets',
        'photo frame',
        'Wi-Fi',
        'display',
      ],
    },
  },
  {
    name: 'Jacket',
    shortDescription: 'Stylish jacket for all seasons.',
    longDescription:
      'This stylish jacket is suitable for all seasons and features a versatile design that complements various outfits. It’s made from durable materials and is available in different sizes and colours.',
    price: 85,
    availableQuantity: 25,
    averageRating: 4.4,
    category: {
      connect: { id: 2 },
    },
    reviewCount: 20,
    slug: 'jacket',
    thumbnail:
      'https://res.cloudinary.com/sliceup/image/upload/v1727025003/products/kpqkne5lp9icn82ys99d.jpg',
    unit: 'pcs',
    tags: {
      set: [
        'jacket',
        'clothing',
        'fashion',
        'apparel',
        'versatile',
        'stylish',
        'all seasons',
      ],
    },
  },
  {
    name: 'Dress',
    shortDescription: 'Elegant dress for special occasions.',
    longDescription:
      'This elegant dress is designed for special occasions and features a flattering fit and sophisticated design. It’s made from high-quality fabric and is available in various colours and sizes.',
    price: 100,
    availableQuantity: 18,
    averageRating: 4.7,
    category: {
      connect: { id: 2 },
    },
    reviewCount: 15,
    slug: 'dress',
    thumbnail:
      'https://res.cloudinary.com/sliceup/image/upload/v1727025031/products/s3afzraozaqievvm9acp.jpg',
    unit: 'pcs',
    tags: {
      set: [
        'dress',
        'clothing',
        'fashion',
        'apparel',
        'elegant',
        'special occasions',
        'sophisticated',
      ],
    },
  },
  {
    name: 'T-Shirt',
    shortDescription: 'Comfortable t-shirt for everyday wear.',
    longDescription:
      'This comfortable t-shirt is perfect for everyday wear. It’s made from soft, breathable fabric and features a classic design that pairs well with various outfits.',
    price: 25,
    availableQuantity: 50,
    averageRating: 4.3,
    category: {
      connect: { id: 2 },
    },
    reviewCount: 30,
    slug: 't-shirt',
    thumbnail:
      'https://res.cloudinary.com/sliceup/image/upload/v1727025069/products/hxvhzeb4ej1h8r7tic18.jpg',
    unit: 'pcs',
    tags: {
      set: [
        't-shirt',
        'clothing',
        'fashion',
        'apparel',
        'comfortable',
        'casual',
        'everyday',
      ],
    },
  },
  {
    name: 'Hoodie',
    shortDescription: 'Warm hoodie with a relaxed fit.',
    longDescription:
      'This warm hoodie features a relaxed fit and is perfect for casual wear. Made from soft and cosy material, it’s ideal for layering and provides comfort and style during colder months.',
    price: 70,
    availableQuantity: 30,
    averageRating: 4.6,
    category: {
      connect: { id: 2 },
    },
    reviewCount: 20,
    slug: 'hoodie',
    thumbnail:
      'https://res.cloudinary.com/sliceup/image/upload/v1727025094/products/bkfou7gk4c9lxiga1pbc.jpg',
    unit: 'pcs',
    tags: {
      set: [
        'hoodie',
        'clothing',
        'fashion',
        'apparel',
        'warm',
        'casual',
        'comfortable',
      ],
    },
  },
  {
    name: 'Scarf',
    shortDescription: 'Stylish scarf to complement any outfit.',
    longDescription:
      'This stylish scarf adds a touch of elegance to any outfit. Made from high-quality materials, it provides warmth and can be worn in various ways to enhance your look.',
    price: 30,
    availableQuantity: 40,
    averageRating: 4.5,
    category: {
      connect: { id: 2 },
    },
    reviewCount: 25,
    slug: 'scarf',
    thumbnail:
      'https://res.cloudinary.com/sliceup/image/upload/v1727025115/products/lahsoykzxprtkyzccaon.jpg',
    unit: 'pcs',
    tags: {
      set: [
        'scarf',
        'clothing',
        'fashion',
        'apparel',
        'stylish',
        'warm',
        'accessory',
      ],
    },
  },
  {
    name: 'Air Purifier',
    shortDescription: 'Advanced air purifier for a healthier home environment.',
    longDescription:
      'This advanced air purifier helps remove pollutants and allergens from the air, providing a healthier home environment. It features multiple filtration stages and is ideal for improving indoor air quality.',
    price: 250,
    availableQuantity: 12,
    averageRating: 4.7,
    category: {
      connect: { id: 3 },
    },
    reviewCount: 14,
    slug: 'air-purifier',
    thumbnail:
      'https://res.cloudinary.com/sliceup/image/upload/v1727025143/products/ee4a1mdgtf9xtdyryirf.jpg',
    unit: 'pcs',
    tags: {
      set: [
        'air purifier',
        'appliances',
        'home',
        'electronics',
        'health',
        'air quality',
        'filter',
      ],
    },
  },
  {
    name: 'Coffee Maker',
    shortDescription: 'Programmable coffee maker with multiple brew options.',
    longDescription:
      'This programmable coffee maker allows you to choose from multiple brew options and features a built-in timer for convenience. It’s perfect for coffee lovers who enjoy a fresh cup every morning.',
    price: 80,
    availableQuantity: 20,
    averageRating: 4.5,
    category: {
      connect: { id: 3 },
    },
    reviewCount: 18,
    slug: 'coffee-maker',
    thumbnail:
      'https://res.cloudinary.com/sliceup/image/upload/v1727025174/products/uglnojei1de56f1oiiil.jpg',
    unit: 'pcs',
    tags: {
      set: [
        'coffee maker',
        'appliances',
        'kitchen',
        'home',
        'electronics',
        'brew',
        'coffee',
      ],
    },
  },
  {
    name: 'Microwave Oven',
    shortDescription: 'Compact microwave oven with quick cooking features.',
    longDescription:
      'This compact microwave oven offers quick cooking and reheating with easy-to-use features. It’s perfect for busy kitchens and comes with preset programmes for various types of food.',
    price: 60,
    availableQuantity: 25,
    averageRating: 4.4,
    category: {
      connect: { id: 3 },
    },
    reviewCount: 22,
    slug: 'microwave-oven',
    thumbnail:
      'https://res.cloudinary.com/sliceup/image/upload/v1727025202/products/lzv9ehqitw3mkhw8psjv.jpg',
    unit: 'pcs',
    tags: {
      set: [
        'microwave oven',
        'appliances',
        'kitchen',
        'home',
        'electronics',
        'cooking',
        'compact',
      ],
    },
  },
  {
    name: 'Toaster',
    shortDescription: 'Two-slice toaster with adjustable browning settings.',
    longDescription:
      'This two-slice toaster features adjustable browning settings and a sleek design. It’s ideal for making perfect toast every time and fits well in any kitchen.',
    price: 40,
    availableQuantity: 40,
    averageRating: 4.3,
    category: {
      connect: { id: 3 },
    },
    reviewCount: 28,
    slug: 'toaster',
    thumbnail:
      'https://res.cloudinary.com/sliceup/image/upload/v1727025230/products/fqt9x7iwg44k6sfgnsoc.jpg',
    unit: 'pcs',
    tags: {
      set: [
        'toaster',
        'appliances',
        'kitchen',
        'home',
        'electronics',
        'browning',
        'breakfast',
      ],
    },
  },
  {
    name: 'Blender',
    shortDescription: 'Powerful blender for smoothies and soups.',
    longDescription:
      'This powerful blender is designed for making smoothies, soups, and other blended recipes. It features multiple speed settings and a durable build for reliable performance.',
    price: 90,
    availableQuantity: 15,
    averageRating: 4.6,
    category: {
      connect: { id: 3 },
    },
    reviewCount: 16,
    slug: 'blender',
    thumbnail:
      'https://res.cloudinary.com/sliceup/image/upload/v1727025254/products/djly6jzzj4ik7eswel4a.jpg',
    unit: 'pcs',
    tags: {
      set: [
        'blender',
        'appliances',
        'kitchen',
        'home',
        'electronics',
        'smoothies',
        'powerful',
      ],
    },
  },
  {
    name: 'Science Fiction Novel',
    shortDescription: 'Futuristic novel exploring new worlds and technologies.',
    longDescription:
      'This science fiction novel explores futuristic worlds and advanced technologies. It features imaginative storytelling and complex characters, offering a captivating read for fans of the genre.',
    price: 24,
    availableQuantity: 28,
    averageRating: 4.6,
    category: {
      connect: { id: 4 },
    },
    reviewCount: 20,
    slug: 'science-fiction-novel',
    thumbnail:
      'https://res.cloudinary.com/sliceup/image/upload/v1727025279/products/ghkjibggcjn38uyyjlev.jpg',
    unit: 'pcs',
    tags: {
      set: [
        'science fiction',
        'books',
        'reading',
        'futuristic',
        'technology',
        'fiction',
        'novel',
      ],
    },
  },
  {
    name: 'Self-Help Book',
    shortDescription: 'Inspirational book with practical advice.',
    longDescription:
      'This self-help book offers practical advice and inspiration for personal growth. It covers various topics related to self-improvement and provides actionable steps to enhance your life.',
    price: 15,
    availableQuantity: 45,
    averageRating: 4.7,
    category: {
      connect: { id: 4 },
    },
    reviewCount: 30,
    slug: 'self-help-book',
    thumbnail:
      'https://res.cloudinary.com/sliceup/image/upload/v1727025306/products/houoewiwmemfub3xqpca.png',
    unit: 'pcs',
    tags: {
      set: [
        'self-help',
        'books',
        'reading',
        'inspiration',
        'personal growth',
        'advice',
        'non-fiction',
      ],
    },
  },
  {
    name: 'Cookbook',
    shortDescription: 'Collection of recipes for gourmet cooking.',
    longDescription:
      'This cookbook features a collection of gourmet recipes, including detailed instructions and tips for preparing delicious dishes. It’s perfect for cooking enthusiasts and those looking to expand their culinary skills.',
    price: 30,
    availableQuantity: 20,
    averageRating: 4.8,
    category: {
      connect: { id: 4 },
    },
    reviewCount: 22,
    slug: 'cookbook',
    thumbnail:
      'https://res.cloudinary.com/sliceup/image/upload/v1727025329/products/omsvi4zfxjndiavifj5o.jpg',
    unit: 'pcs',
    tags: {
      set: [
        'cookbook',
        'books',
        'reading',
        'recipes',
        'gourmet',
        'cooking',
        'culinary',
      ],
    },
  },
  {
    name: 'Biography',
    shortDescription: 'Inspirational biography of a famous personality.',
    longDescription:
      'This biography offers an inspiring look into the life of a famous personality. It provides an in-depth account of their achievements, struggles, and the impact they’ve made in their field.',
    price: 18,
    availableQuantity: 50,
    averageRating: 4.5,
    category: {
      connect: { id: 4 },
    },
    reviewCount: 25,
    slug: 'biography',
    thumbnail:
      'https://res.cloudinary.com/sliceup/image/upload/v1727025350/products/zi2zh4qs3qxizyjhmcrt.jpg',
    unit: 'pcs',
    tags: {
      set: [
        'biography',
        'books',
        'reading',
        'inspirational',
        'non-fiction',
        'life story',
        'famous',
      ],
    },
  },
  {
    name: 'Cookbook',
    shortDescription: 'Comprehensive cookbook with diverse recipes.',
    longDescription:
      'This comprehensive cookbook covers a wide range of recipes from various cuisines. It includes detailed instructions and beautiful photography to guide you through each dish.',
    price: 35,
    availableQuantity: 15,
    averageRating: 4.9,
    category: {
      connect: { id: 4 },
    },
    reviewCount: 12,
    slug: 'comprehensive-cookbook',
    thumbnail:
      'https://res.cloudinary.com/sliceup/image/upload/v1727025372/products/oe51lqalhoxjqxm4v0ys.png',
    unit: 'pcs',
    tags: {
      set: [
        'cookbook',
        'books',
        'cooking',
        'recipes',
        'diverse',
        'culinary',
        'photography',
      ],
    },
  },
];

const faqs = [
  {
    id: 1,
    question: 'What types of products do you offer?',
    answer:
      "At GiftCart, we take pride in offering a wide variety of products to suit different preferences and occasions. From thoughtful gifts, home essentials, and electronics to unique handmade items, our inventory is constantly updated to feature the latest trends and customer favourites. Whether you're shopping for a special occasion or your everyday needs, we have something for everyone.",
  },
  {
    id: 2,
    question: 'Are your products high-quality?',
    answer:
      "Yes, we are committed to providing only high-quality products. We work closely with trusted suppliers and independent artisans who adhere to strict quality standards. Whether you're buying an exclusive gift or a practical household item, you can trust that you're getting top-quality products that meet our rigorous criteria.",
  },
  {
    id: 3,
    question: 'Do you offer delivery services?',
    answer:
      'Yes, GiftCart offers reliable delivery services straight to your doorstep. Whether you’re in need of last-minute gifts or routine essentials, our delivery network ensures prompt service. We take special care to package and transport your products securely to maintain their quality during transit.',
  },
  {
    id: 4,
    question: 'Can I customise my order?',
    answer:
      "Absolutely! We understand the importance of personalization, especially when it comes to gifting. At GiftCart, you can customise select products to add a personal touch. Whether you're looking to engrave a name or add a special message, our customisation options allow you to create a unique experience tailored to your needs.",
  },
  {
    id: 5,
    question: 'Where do you source your products from?',
    answer:
      'At GiftCart, we partner with a variety of suppliers, from established brands to independent artisans, both locally and internationally. Our commitment to quality and sustainability means we prioritise suppliers who share our values. By supporting diverse sources, we ensure that our customers enjoy a wide range of high-quality, unique products.',
  },
  {
    id: 6,
    question: 'Do you offer any unique or exclusive items?',
    answer:
      "Yes, we offer a selection of exclusive and unique items that you won't find anywhere else. From limited-edition collections to one-of-a-kind handmade products, our inventory includes specialty items perfect for anyone seeking something out of the ordinary. Keep an eye on our seasonal collections for exclusive products.",
  },
  {
    id: 7,
    question: 'What are your policies on returns or exchanges?',
    answer:
      "Customer satisfaction is our priority at GiftCart. If you're not completely satisfied with your purchase, you can initiate a return or exchange within 14 days of receiving the product. Simply contact our support team, and they will guide you through the process. We aim to make every shopping experience with us positive and hassle-free.",
  },
  {
    id: 8,
    question: 'Do you offer bulk orders for events or businesses?',
    answer:
      'Yes, GiftCart caters to businesses and event planners by offering bulk orders for corporate gifting, events, or special occasions. We can work with you to customise your order based on your specific needs, ensuring that you receive your products in time for your event. Contact us for tailored solutions and bulk discounts.',
  },
  {
    id: 9,
    question: 'Are your packaging materials eco-friendly?',
    answer:
      'Yes, sustainability is a key value at GiftCart. We strive to use eco-friendly packaging materials made from recycled or biodegradable sources. By choosing eco-conscious packaging, we aim to reduce our environmental footprint and contribute to a greener planet.',
  },
  {
    id: 10,
    question: 'Do you offer a subscription service?',
    answer:
      "Yes, we offer a subscription service for customers who want to receive curated boxes of products on a regular basis. With our subscription service, you'll receive a selection of themed items each month, often featuring exclusive or limited-edition products. It's a great way to discover new products while enjoying savings and convenience.",
  },
  {
    id: 11,
    question: 'How can I contact customer support?',
    answer:
      "If you need assistance, our friendly customer support team is available to help. You can contact us via phone, email, or live chat on our website during business hours. Whether it's a question about your order or a product inquiry, we're here to provide timely and helpful solutions.",
  },
  {
    id: 12,
    question: 'Do you offer any recommendations or product guides?',
    answer:
      "Yes, we love to provide inspiration and guidance for our customers. On our website, you'll find product recommendations, gift guides, and reviews to help you choose the perfect item for any occasion. From holiday gifts to everyday essentials, our curated lists and tips make shopping at GiftCart enjoyable and stress-free.",
  },
];

const randomDigits = (length = 4) => Math.floor(Math.random() * 10 ** length);

const slugifiedProducts = products.map((product) => ({
  ...product,
  slug: slugify(product.name, { lower: true }) + '-' + randomDigits(),
}));

async function seedAdmin() {
  await prisma.user.create({
    data: admin,
  });
}

async function seedCategories() {
  for (const category of categories) {
    await prisma.category.create({
      data: category,
    });
  }
}

async function seedProducts() {
  for (const product of slugifiedProducts) {
    await prisma.product.create({
      data: product,
    });
  }
}

async function main() {
  // Delete existing data
  await prisma.product.deleteMany();
  await prisma.category.deleteMany();
  await prisma.user.deleteMany();
  await prisma.faq.deleteMany();

  await seedAdmin();
  await seedCategories();
  await seedProducts();
  await prisma.faq.createMany({
    data: faqs,
  });
}

main()
  .then(() => {
    console.log('Database seeding completed 🚀.');
    process.exit(0);
  })
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
