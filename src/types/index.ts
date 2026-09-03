export type UserRole = 'artisan' | 'buyer' | 'admin';

export interface Artisan {
  id: string;
  name: string;
  mobile: string;
  craftType: string;
  state: string;
  district: string;
  about: string;
  profileImage: string;
  isVerified: boolean;
  joinedAt: string;
  stats: {
    totalProducts: number;
    published: number;
    drafts: number;
    enquiries: number;
  };
}

export interface Product {
  id: string;
  artisanId: string;
  title: string;
  category: string;
  priceMin: number;
  priceMax: number;
  descriptionEn: string;
  descriptionHi: string;
  imageUrl: string;
  status: 'published' | 'draft';
  craftType: string;
  location: string;
  createdAt: string;
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  imageUrl: string;
}
