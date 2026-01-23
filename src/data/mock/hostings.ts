import { Hosting } from '../../types';

export const mockHostings: Hosting[] = [
  {
    id: '1',
    title: 'Pousada Villa Icó',
    type: 'pousada',
    pricePerNight: 100,
    address: 'Rua das Palmeiras, 789',
    neighborhood: 'Centro',
    city: 'Icó',
    state: 'CE',
    capacity: 4,
    bedrooms: 2,
    bathrooms: 1,
    images: [
      'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1582719508461-905c673771fd?w=800&auto=format&fit=crop'
    ],
    description: 'Pousada aconchegante no coração de Icó. Ambiente familiar e acolhedor.',
    amenities: ['Wi-Fi gratuito', 'Café da manhã incluso', 'Ar-condicionado', 'TV a cabo', 'Estacionamento'],
    advertiserId: '3',
    createdAt: '2024-01-10'
  },
  {
    id: '2',
    title: 'Chácara Recanto Verde',
    type: 'chacara',
    pricePerNight: 250,
    address: 'Zona Rural - Km 5',
    neighborhood: 'Lima Campos',
    city: 'Icó',
    state: 'CE',
    capacity: 10,
    bedrooms: 4,
    bathrooms: 3,
    images: [
      'https://images.unsplash.com/photo-1510798831971-661eb04b3739?w=800&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1600011689032-8b628b8a8747?w=800&auto=format&fit=crop'
    ],
    description: 'Chácara ampla ideal para eventos, confraternizações e lazer em família.',
    amenities: ['Piscina', 'Churrasqueira', 'Campo de futebol', 'Salão de festas', 'Cozinha completa', 'Quartos com ar'],
    advertiserId: '3',
    createdAt: '2024-01-12'
  },
  {
    id: '3',
    title: 'Quarto Confortável - Centro',
    type: 'quarto',
    pricePerNight: 50,
    address: 'Rua do Comércio, 456',
    neighborhood: 'Centro',
    city: 'Icó',
    state: 'CE',
    capacity: 2,
    bedrooms: 1,
    bathrooms: 1,
    images: [
      'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?w=800&auto=format&fit=crop'
    ],
    description: 'Quarto privativo em residência, ideal para viajantes que buscam economia.',
    amenities: ['Wi-Fi', 'Ar-condicionado', 'Roupa de cama', 'Banheiro privativo'],
    advertiserId: '3',
    createdAt: '2024-01-18'
  },
  {
    id: '4',
    title: 'Hotel Sertão Palace',
    type: 'hotel',
    pricePerNight: 150,
    address: 'Avenida Principal, 234',
    neighborhood: 'Centro',
    city: 'Icó',
    state: 'CE',
    capacity: 3,
    bedrooms: 1,
    bathrooms: 1,
    images: [
      'https://images.unsplash.com/photo-1611892440504-42a792e24d32?w=800&auto=format&fit=crop'
    ],
    description: 'Hotel tradicional de Icó, com atendimento de excelência e localização central.',
    amenities: ['Recepção 24h', 'Café da manhã', 'Wi-Fi', 'TV Smart', 'Ar-condicionado', 'Frigobar'],
    advertiserId: '3',
    createdAt: '2024-01-25'
  },
  {
    id: '5',
    title: 'Chácara Vista Alegre',
    type: 'chacara',
    pricePerNight: 300,
    address: 'Sítio Vista Alegre',
    neighborhood: 'Zona Rural',
    city: 'Icó',
    state: 'CE',
    capacity: 15,
    bedrooms: 5,
    bathrooms: 4,
    images: [
      'https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=800&auto=format&fit=crop'
    ],
    description: 'Chácara de alto padrão com vista panorâmica e infraestrutura completa.',
    amenities: ['Piscina aquecida', '2 Churrasqueiras', 'Sauna', 'Campo', 'Playground', 'Lago'],
    advertiserId: '3',
    createdAt: '2024-02-05'
  }
];
