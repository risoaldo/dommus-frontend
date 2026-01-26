import { useParams, Link, Navigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { MapPin, Bed, Bath, Maximize2, Check, ArrowLeft, User } from 'lucide-react';
import { Layout } from '../components/layout/Layout';
import { ImageGallery } from '../components/shared/ImageGallery';
import { WhatsAppButton } from '../components/shared/WhatsAppButton';
import { mockProperties, mockAdvertisers } from '../data/mock';
import { propertyApi } from '../services/api';
import { formatCurrency } from '../lib/utils';

export default function PropertyDetails() {
  const { id } = useParams();
  const [property, setProperty] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    const loadProperty = async () => {
      if (!id) {
        setNotFound(true);
        setIsLoading(false);
        return;
      }

      // Verifica se é um imóvel da API (começa com "api-")
      if (id.startsWith('api-')) {
        try {
          const apiId = parseInt(id.replace('api-', ''));
          const data = await propertyApi.get(apiId);
          
          // Converte para o formato do mock
          const typeMap: Record<string, string> = {
            'house': 'casa',
            'apartment': 'apartamento',
            'land': 'terreno',
            'commercial': 'comercial',
            'farm': 'fazenda',
          };

          const transactionMap: Record<string, string> = {
            'sale': 'venda',
            'rent': 'aluguel',
            'both': 'venda',
          };

          setProperty({
            id: `api-${data.id}`,
            title: data.title,
            type: typeMap[data.type] || data.type,
            transactionType: transactionMap[data.transaction_type] || data.transaction_type,
            price: data.price,
            address: data.street,
            neighborhood: data.neighborhood,
            city: data.city,
            state: data.state,
            bedrooms: data.bedrooms,
            bathrooms: data.bathrooms,
            area: data.area,
            description: data.description,
            features: data.features || [],
            images: data.images && data.images.length > 0 
  ? data.images.map((img: any) => `http://localhost:8000${img.url}`) 
  : ['/placeholder-property.jpg'],
            acceptsMCMV: data.accepts_financing,
            advertiserId: String(data.user_id),
            user: data.user,
          });
        } catch (error) {
          console.error('Erro ao carregar imóvel:', error);
          setNotFound(true);
        }
      } else {
        // Busca nos dados mockados
        const mockProperty = mockProperties.find(p => p.id === id);
        if (mockProperty) {
          setProperty(mockProperty);
        } else {
          setNotFound(true);
        }
      }

      setIsLoading(false);
    };

    loadProperty();
  }, [id]);

  if (isLoading) {
    return (
      <Layout>
        <div className="min-h-screen flex items-center justify-center">
          <p className="text-neutral-600">Carregando...</p>
        </div>
      </Layout>
    );
  }

  if (notFound || !property) {
    return <Navigate to="/imoveis" replace />;
  }

  // Para imóveis da API, usa os dados do user retornado
  // Para mockados, busca no mockAdvertisers
  const advertiser = property.user 
    ? {
        id: property.user.id,
        name: property.user.name,
        phone: property.user.phone || '88992146929',
        type: 'corretor',
      }
    : mockAdvertisers.find(a => a.id === property.advertiserId);

  const whatsappMessage = `Olá! Tenho interesse no imóvel: ${property.title} - ${formatCurrency(property.price)}`;

  const getTypeLabel = (type: string) => {
    const labels: Record<string, string> = {
      casa: 'Casa',
      apartamento: 'Apartamento',
      terreno: 'Terreno',
      comercial: 'Comercial',
      fazenda: 'Fazenda',
    };
    return labels[type] || type;
  };

  return (
    <Layout>
      <div className="bg-neutral-50 min-h-screen">
        {/* Breadcrumb */}
        <div className="bg-white border-b border-neutral-200">
          <div className="container-app py-4">
            <Link 
              to="/imoveis"
              className="inline-flex items-center gap-2 text-brand-600 hover:text-brand-700 font-medium"
            >
              <ArrowLeft className="w-4 h-4" />
              Voltar para imóveis
            </Link>
          </div>
        </div>

        <div className="container-app py-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Coluna Principal */}
            <div className="lg:col-span-2 space-y-6">
              {/* Galeria */}
              <div className="bg-white rounded-card shadow-card p-6">
                <ImageGallery images={property.images} title={property.title} />
              </div>

              {/* Informações Principais */}
              <div className="bg-white rounded-card shadow-card p-6">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <div className="flex items-center gap-3 mb-3">
                      <span className="inline-block px-3 py-1 bg-brand-100 text-brand-700 text-sm font-medium rounded-badge">
                        {getTypeLabel(property.type)}
                      </span>
                      <span className="inline-block px-3 py-1 bg-neutral-100 text-neutral-700 text-sm font-medium rounded-badge uppercase">
                        {property.transactionType}
                      </span>
                      {property.acceptsMCMV && (
                        <span className="inline-block px-3 py-1 bg-success-500 text-white text-sm font-semibold rounded-badge">
                          MCMV
                        </span>
                      )}
                    </div>
                    <h1 className="text-3xl font-display font-bold text-neutral-900 mb-2">
                      {property.title}
                    </h1>
                    <div className="flex items-center gap-2 text-neutral-600">
                      <MapPin className="w-4 h-4" />
                      <p>{property.address}, {property.neighborhood} - {property.city}/{property.state}</p>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-6 py-4 border-y border-neutral-200 my-6">
                  {property.bedrooms > 0 && (
                    <div className="flex items-center gap-2">
                      <Bed className="w-5 h-5 text-brand-600" />
                      <div>
                        <p className="text-2xl font-bold text-neutral-900">{property.bedrooms}</p>
                        <p className="text-sm text-neutral-600">Quartos</p>
                      </div>
                    </div>
                  )}
                  {property.bathrooms > 0 && (
                    <div className="flex items-center gap-2">
                      <Bath className="w-5 h-5 text-brand-600" />
                      <div>
                        <p className="text-2xl font-bold text-neutral-900">{property.bathrooms}</p>
                        <p className="text-sm text-neutral-600">Banheiros</p>
                      </div>
                    </div>
                  )}
                  <div className="flex items-center gap-2">
                    <Maximize2 className="w-5 h-5 text-brand-600" />
                    <div>
                      <p className="text-2xl font-bold text-neutral-900">{property.area}</p>
                      <p className="text-sm text-neutral-600">m²</p>
                    </div>
                  </div>
                </div>

                <div>
                  <h2 className="text-xl font-semibold text-neutral-900 mb-3">Descrição</h2>
                  <p className="text-neutral-700 leading-relaxed">{property.description}</p>
                </div>

                {property.features && property.features.length > 0 && (
                  <div className="mt-6">
                    <h2 className="text-xl font-semibold text-neutral-900 mb-3">Características</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      {property.features.map((feature: string, index: number) => (
                        <div key={index} className="flex items-center gap-2">
                          <Check className="w-4 h-4 text-success-600 flex-shrink-0" />
                          <span className="text-neutral-700">{feature}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Seção MCMV */}
              {property.acceptsMCMV && property.mcmvInfo && (
                <div className="bg-success-50 border border-success-200 rounded-card shadow-card p-6">
                  <h2 className="text-xl font-semibold text-success-900 mb-4 flex items-center gap-2">
                    <Check className="w-5 h-5" />
                    Financiamento Minha Casa Minha Vida
                  </h2>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                    <div>
                      <p className="text-sm text-success-700 mb-1">Faixa</p>
                      <p className="text-2xl font-bold text-success-900">Faixa {property.mcmvInfo.track}</p>
                    </div>
                    <div>
                      <p className="text-sm text-success-700 mb-1">Valor Máximo</p>
                      <p className="text-2xl font-bold text-success-900">
                        {formatCurrency(property.mcmvInfo.maxValue)}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-success-700 mb-1">Entrada</p>
                      <p className="text-2xl font-bold text-success-900">
                        {formatCurrency(property.mcmvInfo.downPayment)}
                      </p>
                    </div>
                  </div>
                  {property.mcmvInfo.requiredDocuments && (
                    <div>
                      <p className="text-sm font-medium text-success-800 mb-2">Documentos Necessários:</p>
                      <ul className="space-y-1">
                        {property.mcmvInfo.requiredDocuments.map((doc: string, index: number) => (
                          <li key={index} className="flex items-center gap-2 text-success-700">
                            <Check className="w-4 h-4 flex-shrink-0" />
                            {doc}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1">
              <div className="sticky top-24 space-y-6">
                {/* Preço */}
                <div className="bg-white rounded-card shadow-card p-6">
                  <p className="text-sm text-neutral-600 mb-2">Valor do Imóvel</p>
                  <p className="text-4xl font-display font-bold text-brand-600 mb-1">
                    {formatCurrency(property.price)}
                  </p>
                  {property.transactionType === 'aluguel' && (
                    <p className="text-neutral-600">/mês</p>
                  )}
                </div>

                {/* Anunciante */}
{advertiser && (
  <div className="bg-white rounded-card shadow-card p-6">
    <h3 className="text-lg font-semibold text-neutral-900 mb-4">Anunciante</h3>
    <Link 
  to={`/corretor/${advertiser.name.replace(/\s+/g, '').replace(/^./, (c: string) => c.toLowerCase())}`}
      className="block hover:bg-neutral-50 p-4 -m-4 rounded-lg transition-colors"
    >
      <div className="flex items-center gap-3 mb-3">
        <div className="w-12 h-12 bg-brand-100 rounded-full flex items-center justify-center">
          <User className="w-6 h-6 text-brand-600" />
        </div>
        <div>
          <p className="font-semibold text-neutral-900">{advertiser.name}</p>
          <p className="text-sm text-brand-600">@{advertiser.name.replace(/\s+/g, '').replace(/^./, (c: string) => c.toLowerCase())}</p>
        </div>
      </div>
    </Link>
  </div>
)}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* WhatsApp Button */}
      {advertiser && (
        <WhatsAppButton 
          phone={advertiser.phone} 
          message={whatsappMessage}
        />
      )}
    </Layout>
  );
}