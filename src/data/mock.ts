import { Artisan, Product, Category } from '../types';

export const mockCategories: Category[] = [
  { id: 'c1', name: 'Textile', slug: 'textile', imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/e/e9/Banarasi_Silk_Saree.jpg' },
  { id: 'c2', name: 'Pottery', slug: 'pottery', imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/0/04/India_pottery.jpg' },
  { id: 'c3', name: 'Wood', slug: 'wood', imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/1/17/Bamboo_Basket.jpg' },
  { id: 'c4', name: 'Bamboo', slug: 'bamboo', imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/1/17/Bamboo_Basket.jpg' },
  { id: 'c5', name: 'Jewellery', slug: 'jewellery', imageUrl: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&q=80&w=400' },
  { id: 'c6', name: 'Home Decor', slug: 'home-decor', imageUrl: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&q=80&w=400' },
];

export const mockArtisans: Artisan[] = [
  {
    id: 'a1',
    name: 'Ramesh Kumawat',
    mobile: '+91 9876543210',
    craftType: 'Terracotta Pottery',
    state: 'Rajasthan',
    district: 'Udaipur',
    about: 'I have been crafting traditional terracotta pottery for over 20 years, a skill passed down through three generations.',
    profileImage: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=200',
    isVerified: true,
    joinedAt: '2023-01-15T00:00:00.000Z',
    stats: { totalProducts: 12, published: 10, drafts: 2, enquiries: 45 }
  },
  {
    id: 'a2',
    name: 'Savitri Devi',
    mobile: '+91 9876543211',
    craftType: 'Handwoven Saree',
    state: 'Uttar Pradesh',
    district: 'Varanasi',
    about: 'Creating intricate Banarasi sarees with pure silk and zari work.',
    profileImage: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=200',
    isVerified: true,
    joinedAt: '2023-03-20T00:00:00.000Z',
    stats: { totalProducts: 5, published: 5, drafts: 0, enquiries: 120 }
  },
  {
    id: 'a3',
    name: 'Manish Bamboo Crafts',
    mobile: '+91 9876543212',
    craftType: 'Bamboo Weaving',
    state: 'Assam',
    district: 'Guwahati',
    about: 'Sustainable and durable bamboo baskets and home decor.',
    profileImage: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=200',
    isVerified: false,
    joinedAt: '2024-01-10T00:00:00.000Z',
    stats: { totalProducts: 8, published: 6, drafts: 2, enquiries: 15 }
  }
];

export const mockProducts: Product[] = [
  {
    id: 'p1',
    artisanId: 'a1',
    title: 'Handcrafted Terracotta Diya Set',
    category: 'Pottery',
    priceMin: 250,
    priceMax: 350,
    descriptionEn: 'A set of 5 beautifully handcrafted terracotta diyas perfect for festivals and home decor. Made from natural clay.',
    descriptionHi: 'त्योहारों और घर की सजावट के लिए 5 खूबसूरती से हस्तनिर्मित टेराकोटा दीयों का एक सेट। प्राकृतिक मिट्टी से बना है।',
    imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/0/04/India_pottery.jpg',
    status: 'published',
    craftType: 'Terracotta',
    location: 'Udaipur, Rajasthan',
    createdAt: '2023-10-01T12:00:00.000Z'
  },
  {
    id: 'p2',
    artisanId: 'a2',
    title: 'Pure Silk Banarasi Saree',
    category: 'Textile',
    priceMin: 5000,
    priceMax: 8500,
    descriptionEn: 'Authentic Banarasi silk saree with intricate golden zari borders. Handwoven over 15 days.',
    descriptionHi: 'जटिल सुनहरे ज़री बॉर्डर वाली प्रामाणिक बनारसी सिल्क साड़ी। 15 दिनों में हथकरघा पर बुनी गई।',
    imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/e/e9/Banarasi_Silk_Saree.jpg',
    status: 'published',
    craftType: 'Handloom',
    location: 'Varanasi, Uttar Pradesh',
    createdAt: '2023-11-15T12:00:00.000Z'
  },
  {
    id: 'p3',
    artisanId: 'a3',
    title: 'Traditional Bamboo Storage Basket',
    category: 'Bamboo',
    priceMin: 450,
    priceMax: 600,
    descriptionEn: 'Eco-friendly and highly durable bamboo basket for multi-purpose storage.',
    descriptionHi: 'बहुउद्देश्यीय भंडारण के लिए पर्यावरण के अनुकूल और अत्यधिक टिकाऊ बांस की टोकरी।',
    imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/1/17/Bamboo_Basket.jpg',
    status: 'published',
    craftType: 'Bamboo Weaving',
    location: 'Guwahati, Assam',
    createdAt: '2024-02-10T12:00:00.000Z'
  },
  {
    id: 'p4',
    artisanId: 'a1',
    title: 'Clay Matka (Water Cooler)',
    category: 'Pottery',
    priceMin: 300,
    priceMax: 450,
    descriptionEn: 'Traditional clay pot that keeps water naturally cool during summer. Healthy and eco-friendly.',
    descriptionHi: 'पारंपरिक मिट्टी का बर्तन जो गर्मियों में पानी को प्राकृतिक रूप से ठंडा रखता है। स्वस्थ और पर्यावरण के अनुकूल।',
    imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/0/04/India_pottery.jpg',
    status: 'draft',
    craftType: 'Terracotta',
    location: 'Udaipur, Rajasthan',
    createdAt: '2024-03-05T12:00:00.000Z'
  }
];
