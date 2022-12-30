export interface Product {
  id: number;
  title: string;
  description: string;
  price: number;
  discountPercentage: number;
  rating: number;
  stock: number;
  brand: string;
  category: string;
  thumbnail: string;
  images: string[];
}

export interface Data {
  products: Product[];
  total: number;
  skip: number;
  limit: number;
}

export enum Location {
  category = 'categories',
  brand = 'brands',
  detail = 'product-details',
  sort = 'sort',
  search = 'search',
  littleBig = 'big',
  cart = 'cart',
  main = '/',
}

export interface KeyCategory {
  category: string;
  selected: boolean;
  flag: boolean;
}

export interface KeyBrand {
  brand: string;
  selected: boolean;
  flag: boolean;
}
