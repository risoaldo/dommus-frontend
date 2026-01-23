import { Property } from '../../types';

export const mockProperties: Property[] = [
  {
    id: '1',
    title: 'Casa Moderna no Centro',
    type: 'casa',
    transactionType: 'venda',
    price: 160000,
    address: 'Rua Principal, 123',
    neighborhood: 'Centro',
    city: 'Icó',
    state: 'CE',
    bedrooms: 3,
    bathrooms: 2,
    area: 120,
    images: [
      'https://images.unsplash.com/photo-1568605114967-8130f3a36994?w=800&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&auto=format&fit=crop'
    ],
    description: 'Linda casa moderna no coração de Icó, com acabamento de primeira qualidade, próxima a comércios e escolas.',
    features: ['Garagem para 2 carros', 'Quintal amplo', 'Portão eletrônico', 'Área de serviço', 'Cozinha planejada'],
    advertiserId: '1',
    acceptsMCMV: true,
    mcmvInfo: {
      track: '2',
      maxValue: 264000,
      downPayment: 16000,
      requiredDocuments: ['RG e CPF', 'Comprovante de renda', 'Comprovante de residência', 'Certidão de casamento']
    },
    createdAt: '2024-01-15'
  },
  {
    id: '2',
    title: 'Apartamento 2 Quartos - São José',
    type: 'apartamento',
    transactionType: 'aluguel',
    price: 400,
    address: 'Avenida Brasil, 456, Apto 302',
    neighborhood: 'São José',
    city: 'Icó',
    state: 'CE',
    bedrooms: 2,
    bathrooms: 1,
    area: 65,
    images: [
      'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800&auto=format&fit=crop'
    ],
    description: 'Apartamento bem localizado, próximo a comércio e escolas. Condomínio tranquilo.',
    features: ['Varanda', 'Armários embutidos', 'Box de vidro', 'Interfone'],
    advertiserId: '2',
    acceptsMCMV: false,
    createdAt: '2024-01-20'
  },
  {
    id: '3',
    title: 'Terreno 300m² - Malhada da Areia',
    type: 'terreno',
    transactionType: 'venda',
    price: 50000,
    address: 'Rua das Flores, s/n',
    neighborhood: 'Malhada da Areia',
    city: 'Icó',
    state: 'CE',
    area: 300,
    images: [
      'https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=800&auto=format&fit=crop'
    ],
    description: 'Terreno plano, ideal para construção residencial. Documentação em dia.',
    features: ['Documentação regular', 'Cercado', 'Esquina', 'Acesso pavimentado'],
    advertiserId: '1',
    acceptsMCMV: false,
    createdAt: '2024-02-01'
  },
  {
    id: '4',
    title: 'Casa de Luxo com Piscina',
    type: 'casa',
    transactionType: 'venda',
    price: 320000,
    address: 'Rua das Palmeiras, 789',
    neighborhood: 'Centro',
    city: 'Icó',
    state: 'CE',
    bedrooms: 4,
    bathrooms: 3,
    area: 180,
    images: [
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?w=800&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=800&auto=format&fit=crop'
    ],
    description: 'Casa ampla e luxuosa com área de lazer completa. Alto padrão de acabamento.',
    features: ['Piscina', 'Churrasqueira', 'Garagem para 3 carros', 'Área gourmet', 'Closet', 'Jardim'],
    advertiserId: '2',
    acceptsMCMV: false,
    createdAt: '2024-02-10'
  },
  {
    id: '5',
    title: 'Kitnet Mobiliada - Centro',
    type: 'apartamento',
    transactionType: 'aluguel',
    price: 300,
    address: 'Rua do Comércio, 234',
    neighborhood: 'Centro',
    city: 'Icó',
    state: 'CE',
    bedrooms: 1,
    bathrooms: 1,
    area: 30,
    images: [
      'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800&auto=format&fit=crop'
    ],
    description: 'Kitnet compacta e funcional, totalmente mobiliada. Ideal para estudantes ou profissionais.',
    features: ['Mobiliada', 'Wi-Fi incluso', 'Água inclusa', 'Próximo ao centro'],
    advertiserId: '1',
    acceptsMCMV: false,
    createdAt: '2024-02-15'
  },
  {
    id: '6',
    title: 'Casa 3 Quartos - Lima Campos',
    type: 'casa',
    transactionType: 'venda',
    price: 145000,
    address: 'Rua São Francisco, 567',
    neighborhood: 'Lima Campos',
    city: 'Icó',
    state: 'CE',
    bedrooms: 3,
    bathrooms: 2,
    area: 110,
    images: [
      'https://images.unsplash.com/photo-1570129477492-45c003edd2be?w=800&auto=format&fit=crop'
    ],
    description: 'Casa em bairro tranquilo, próxima a escolas e posto de saúde.',
    features: ['Garagem', 'Área de serviço', 'Quintal', 'Sala ampla'],
    advertiserId: '2',
    acceptsMCMV: true,
    mcmvInfo: {
      track: '1',
      maxValue: 164000,
      downPayment: 14500,
      requiredDocuments: ['RG e CPF', 'Comprovante de renda', 'Comprovante de residência']
    },
    createdAt: '2024-02-20'
  },
  {
    id: '7',
    title: 'Terreno Comercial - Av. Principal',
    type: 'comercial',
    transactionType: 'venda',
    price: 180000,
    address: 'Avenida Principal, 1000',
    neighborhood: 'Centro',
    city: 'Icó',
    state: 'CE',
    area: 400,
    images: [
      'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800&auto=format&fit=crop'
    ],
    description: 'Terreno comercial em localização privilegiada, na avenida principal de Icó.',
    features: ['Esquina', 'Alto fluxo', 'Documentado', 'Acesso duplo'],
    advertiserId: '1',
    acceptsMCMV: false,
    createdAt: '2024-02-25'
  },
  {
    id: '8',
    title: 'Casa 2 Quartos - São Sebastião',
    type: 'casa',
    transactionType: 'aluguel',
    price: 350,
    address: 'Rua das Acácias, 89',
    neighborhood: 'São Sebastião',
    city: 'Icó',
    state: 'CE',
    bedrooms: 2,
    bathrooms: 1,
    area: 80,
    images: [
      'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=800&auto=format&fit=crop'
    ],
    description: 'Casa simples e confortável em bairro residencial.',
    features: ['Garagem', 'Quintal pequeno', 'Portão', 'Varanda'],
    advertiserId: '2',
    acceptsMCMV: false,
    createdAt: '2024-03-01'
  }
];
