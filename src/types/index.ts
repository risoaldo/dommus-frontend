export interface Property {
  id: string;
  title: string;
  type: 'casa' | 'apartamento' | 'terreno' | 'comercial';
  transactionType: 'venda' | 'aluguel';
  price: number;
  address: string;
  neighborhood: string;
  city: string;
  state: string;
  bedrooms?: number;
  bathrooms?: number;
  area: number;
  images: string[];
  description: string;
  features: string[];
  advertiserId: string;
  acceptsMCMV: boolean;
  mcmvInfo?: {
    track: '1' | '2' | '3';
    maxValue: number;
    downPayment: number;
    requiredDocuments: string[];
  };
  createdAt: string;
}

export interface Hosting {
  id: string;
  title: string;
  type: 'pousada' | 'hotel' | 'chacara' | 'quarto';
  pricePerNight: number;
  address: string;
  neighborhood: string;
  city: string;
  state: string;
  capacity: number;
  bedrooms?: number;
  bathrooms?: number;
  images: string[];
  description: string;
  amenities: string[];
  advertiserId: string;
  createdAt: string;
}

export interface Advertiser {
  id: string;
  name: string;
  type: 'corretor' | 'imobiliaria' | 'pousada' | 'hotel';
  avatar?: string;
  bio: string;
  phone: string;
  email: string;
  creci?: string;
  createdAt: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  advertiserId?: string;
}
