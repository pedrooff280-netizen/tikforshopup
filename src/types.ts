export interface Product {
  name: string;
  link: string;
  niche?: string;
  growth?: string;
  sold?: string;
  image?: string;
}

export interface Supplier {
  id: string;
  name: string;
  niche: string;
  location: string;
  phone: string;
  website: string | 'Sem Site';
  rating: number;
  tags: string[];
  lastActive: string;
  commission: string;
  products: Product[];
}
