import { useParams, Navigate } from 'react-router-dom';
import { Phone, Mail, User, Building2 } from 'lucide-react';
import { Layout } from '../components/layout/Layout';
import { PropertyCard } from '../components/cards/PropertyCard';
import { HostingCard } from '../components/cards/HostingCard';
import { mockAdvertisers, mockProperties, mockHostings } from '../data/mock';

export default function AdvertiserProfile() {
  const { id } = useParams();
  const advertiser = mockAdvertisers.find(a => a.id === id);
  
  if (!advertiser) {
    return <Navigate to="/" replace />;
  }

  const advertiserProperties = mockProperties.filter(p => p.advertiserId === id);
  const advertiserHostings = mockHostings.filter(h => h.advertiserId === id);

  const getTypeLabel = (type: string) => {
    const labels = {
      corretor: 'Corretor de Imóveis',
      imobiliaria: 'Imobiliária',
      pousada: 'Pousada',
      hotel: 'Hotel'
    };
    return labels[type as keyof typeof labels] || type;
  };

  return (
    <Layout>
      <div className="bg-neutral-50 min-h-screen">
        {/* Header do Perfil */}
        <div className="bg-gradient-to-br from-brand-600 to-brand-800 text-white">
          <div className="container-app py-12">
            <div className="flex items-start gap-6">
              <div className="w-24 h-24 bg-white rounded-full flex items-center justify-center flex-shrink-0">
                <User className="w-12 h-12 text-brand-600" />
              </div>
              <div className="flex-1">
                <h1 className="text-3xl md:text-4xl font-display font-bold mb-2">
                  {advertiser.name}
                </h1>
                <p className="text-xl text-white/90 mb-4">
                  {getTypeLabel(advertiser.type)}
                </p>
                {advertiser.creci && (
                  <p className="text-white/80">CRECI: {advertiser.creci}</p>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Conteúdo */}
        <div className="container-app py-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Coluna Principal */}
            <div className="lg:col-span-2 space-y-8">
              {/* Sobre */}
              <div className="bg-white rounded-card shadow-card p-6">
                <h2 className="text-2xl font-semibold text-neutral-900 mb-4">Sobre</h2>
                <p className="text-neutral-700 leading-relaxed">{advertiser.bio}</p>
              </div>

              {/* Imóveis */}
              {advertiserProperties.length > 0 && (
                <div>
                  <h2 className="text-2xl font-semibold text-neutral-900 mb-6">
                    Imóveis ({advertiserProperties.length})
                  </h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {advertiserProperties.map((property) => (
                      <PropertyCard key={property.id} property={property} />
                    ))}
                  </div>
                </div>
              )}

              {/* Hospedagens */}
              {advertiserHostings.length > 0 && (
                <div>
                  <h2 className="text-2xl font-semibold text-neutral-900 mb-6">
                    Hospedagens ({advertiserHostings.length})
                  </h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {advertiserHostings.map((hosting) => (
                      <HostingCard key={hosting.id} hosting={hosting} />
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Sidebar de Contato */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-card shadow-card p-6 sticky top-24">
                <h3 className="text-xl font-semibold text-neutral-900 mb-4">Contato</h3>
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <Phone className="w-5 h-5 text-brand-600 flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="text-sm text-neutral-600 mb-1">Telefone</p>
                      <a 
                        href={`tel:+55${advertiser.phone}`}
                        className="text-neutral-900 hover:text-brand-600 font-medium"
                      >
                        ({advertiser.phone.slice(0, 2)}) {advertiser.phone.slice(2, 7)}-{advertiser.phone.slice(7)}
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <Mail className="w-5 h-5 text-brand-600 flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="text-sm text-neutral-600 mb-1">E-mail</p>
                      <a 
                        href={`mailto:${advertiser.email}`}
                        className="text-neutral-900 hover:text-brand-600 font-medium break-all"
                      >
                        {advertiser.email}
                      </a>
                    </div>
                  </div>

                  <div className="pt-4 border-t border-neutral-200">
                    <a
                      href={`https://wa.me/55${advertiser.phone}?text=${encodeURIComponent(`Olá! Vi seu perfil no Dommus e gostaria de mais informações.`)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-green-500 hover:bg-green-600 text-white rounded-button font-medium transition-colors"
                    >
                      <Building2 className="w-5 h-5" />
                      Falar no WhatsApp
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
