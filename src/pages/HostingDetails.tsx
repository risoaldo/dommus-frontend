import { useParams, Link, Navigate } from 'react-router-dom';
import { MapPin, Users, Bed, Bath, Check, ArrowLeft, User, Wifi, Coffee, Utensils } from 'lucide-react';
import { Layout } from '../components/layout/Layout';
import { ImageGallery } from '../components/shared/ImageGallery';
import { WhatsAppButton } from '../components/shared/WhatsAppButton';
import { mockHostings, mockAdvertisers } from '../data/mock';
import { formatCurrency } from '../lib/utils';

export default function HostingDetails() {
  const { id } = useParams();
  const hosting = mockHostings.find(h => h.id === id);
  
  if (!hosting) {
    return <Navigate to="/hospedagem" replace />;
  }

  const advertiser = mockAdvertisers.find(a => a.id === hosting.advertiserId);

  const whatsappMessage = `Olá! Tenho interesse na hospedagem: ${hosting.title} - ${formatCurrency(hosting.pricePerNight)}/noite`;

  const getTypeLabel = (type: string) => {
    const labels = {
      pousada: 'Pousada',
      hotel: 'Hotel',
      chacara: 'Chácara',
      quarto: 'Quarto'
    };
    return labels[type as keyof typeof labels] || type;
  };

  const getAmenityIcon = (amenity: string) => {
    if (amenity.toLowerCase().includes('wi-fi') || amenity.toLowerCase().includes('wifi')) {
      return <Wifi className="w-4 h-4" />;
    }
    if (amenity.toLowerCase().includes('café') || amenity.toLowerCase().includes('cafe')) {
      return <Coffee className="w-4 h-4" />;
    }
    if (amenity.toLowerCase().includes('cozinha') || amenity.toLowerCase().includes('refeição')) {
      return <Utensils className="w-4 h-4" />;
    }
    return <Check className="w-4 h-4" />;
  };

  return (
    <Layout>
      <div className="bg-neutral-50 min-h-screen">
        {/* Breadcrumb */}
        <div className="bg-white border-b border-neutral-200">
          <div className="container-app py-4">
            <Link 
              to="/hospedagem"
              className="inline-flex items-center gap-2 text-brand-600 hover:text-brand-700 font-medium"
            >
              <ArrowLeft className="w-4 h-4" />
              Voltar para hospedagens
            </Link>
          </div>
        </div>

        <div className="container-app py-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Coluna Principal */}
            <div className="lg:col-span-2 space-y-6">
              {/* Galeria */}
              <div className="bg-white rounded-card shadow-card p-6">
                <ImageGallery images={hosting.images} title={hosting.title} />
              </div>

              {/* Informações Principais */}
              <div className="bg-white rounded-card shadow-card p-6">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <div className="flex items-center gap-3 mb-3">
                      <span className="inline-block px-3 py-1 bg-brand-100 text-brand-700 text-sm font-medium rounded-badge">
                        {getTypeLabel(hosting.type)}
                      </span>
                    </div>
                    <h1 className="text-3xl font-display font-bold text-neutral-900 mb-2">
                      {hosting.title}
                    </h1>
                    <div className="flex items-center gap-2 text-neutral-600">
                      <MapPin className="w-4 h-4" />
                      <p>{hosting.address}, {hosting.neighborhood} - {hosting.city}/{hosting.state}</p>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-6 py-4 border-y border-neutral-200 my-6">
                  <div className="flex items-center gap-2">
                    <Users className="w-5 h-5 text-brand-600" />
                    <div>
                      <p className="text-2xl font-bold text-neutral-900">{hosting.capacity}</p>
                      <p className="text-sm text-neutral-600">Pessoas</p>
                    </div>
                  </div>
                  {hosting.bedrooms && (
                    <div className="flex items-center gap-2">
                      <Bed className="w-5 h-5 text-brand-600" />
                      <div>
                        <p className="text-2xl font-bold text-neutral-900">{hosting.bedrooms}</p>
                        <p className="text-sm text-neutral-600">Quartos</p>
                      </div>
                    </div>
                  )}
                  {hosting.bathrooms && (
                    <div className="flex items-center gap-2">
                      <Bath className="w-5 h-5 text-brand-600" />
                      <div>
                        <p className="text-2xl font-bold text-neutral-900">{hosting.bathrooms}</p>
                        <p className="text-sm text-neutral-600">Banheiros</p>
                      </div>
                    </div>
                  )}
                </div>

                <div>
                  <h2 className="text-xl font-semibold text-neutral-900 mb-3">Descrição</h2>
                  <p className="text-neutral-700 leading-relaxed">{hosting.description}</p>
                </div>

                {hosting.amenities.length > 0 && (
                  <div className="mt-6">
                    <h2 className="text-xl font-semibold text-neutral-900 mb-3">Comodidades</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      {hosting.amenities.map((amenity, index) => (
                        <div key={index} className="flex items-center gap-2">
                          <span className="text-success-600 flex-shrink-0">
                            {getAmenityIcon(amenity)}
                          </span>
                          <span className="text-neutral-700">{amenity}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1">
              <div className="sticky top-24 space-y-6">
                {/* Preço */}
                <div className="bg-white rounded-card shadow-card p-6">
                  <p className="text-sm text-neutral-600 mb-2">Preço por noite</p>
                  <p className="text-4xl font-display font-bold text-brand-600 mb-1">
                    {formatCurrency(hosting.pricePerNight)}
                  </p>
                  <p className="text-neutral-600">/noite</p>
                </div>

                {/* Anunciante */}
                {advertiser && (
                  <div className="bg-white rounded-card shadow-card p-6">
                    <h3 className="text-lg font-semibold text-neutral-900 mb-4">Anunciante</h3>
                    <Link 
                      to={`/anunciante/${advertiser.id}`}
                      className="block hover:bg-neutral-50 p-4 -m-4 rounded-lg transition-colors"
                    >
                      <div className="flex items-center gap-3 mb-3">
                        <div className="w-12 h-12 bg-brand-100 rounded-full flex items-center justify-center">
                          <User className="w-6 h-6 text-brand-600" />
                        </div>
                        <div>
                          <p className="font-semibold text-neutral-900">{advertiser.name}</p>
                          <p className="text-sm text-neutral-600 capitalize">{advertiser.type}</p>
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
