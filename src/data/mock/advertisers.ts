import { Advertiser } from '../../types';

export const mockAdvertisers: Advertiser[] = [
  {
    id: '1',
    name: 'João Silva Imóveis',
    type: 'corretor',
    bio: 'Corretor de imóveis há 10 anos em Icó e região. Especialista em financiamento pelo Minha Casa Minha Vida.',
    phone: '88921465929',
    email: 'joao@dommus.com',
    creci: '12345-CE',
    createdAt: '2020-01-01'
  },
  {
    id: '2',
    name: 'Imobiliária Lar Feliz',
    type: 'imobiliaria',
    bio: 'Imobiliária tradicional de Icó desde 1995. Oferecemos os melhores imóveis da região com atendimento personalizado.',
    phone: '88912345678',
    email: 'contato@larfeliz.com',
    creci: '54321-CE',
    createdAt: '2018-05-15'
  },
  {
    id: '3',
    name: 'Hospedagens do Sertão',
    type: 'pousada',
    bio: 'Oferecemos as melhores opções de hospedagem em Icó. Pousadas, hotéis e chácaras para todos os gostos.',
    phone: '88987654321',
    email: 'hospedagem@sertao.com',
    createdAt: '2019-03-20'
  }
];
