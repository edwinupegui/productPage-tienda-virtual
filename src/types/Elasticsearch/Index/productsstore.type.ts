export interface ProductsStoreIndex {
  categories: categories[];
  cities: cities[];
  id: number;
  sellerId: number;
  name: string;
  description: string;
  modification: Date;
  isActive: boolean;
  slug: string;
  image: string;
  totalProducts: number;
  store: store;
}

export interface store {
  categories: categories[];
  cities: cities[];
  id: number;
  sellerId: number;
  name: string;
  description: string;
  modification: Date;
  isActive: boolean;
  slug: string;
  image: string;
  totalProducts: number;
}

export interface categories {
  id: number;
  name: string;
  slug: string;
}

export interface cities {
  cityId: number;
  city: string;
}
