import { useParams, Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { MapPin, Building2, Phone, Award, Calendar, ArrowLeft, User } from 'lucide-react';
import { Layout } from '../components/layout/Layout';
import { PropertyCard } from '../components/cards/PropertyCard';
import { profileApi, PublicProfile } from '../services/api';
import { WhatsAppButton } from '../components/shared/WhatsAppButton';

// Função para converter imóvel da API para o formato do mock
function apiPropertyToMock(property: any) {
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

  return {
    id: `api-${property.id}`,
    title: property.title,
    type: typeMap[property.type] || property.type,
    transactionType: transactionMap[property.transaction_type] || property.transaction_type,
    price: property.price,
    address: property.street,
    neighborhood: property.neighborhood,
    city: property.city,
    state: property.state,
    bedrooms: property.bedrooms,
    bathrooms: property.bathrooms,
    area: property.area,
    description: property.description,
    features: property.features || [],
    images: property.images && property.images.length > 0 
      ? property.images.map((img: any) => `http://localhost:8000${img.url}`) 
      : ['/placeholder-property.jpg'],
    acceptsMCMV: property.accepts_financing,
    advertiserId: String(property.user_id),
    createdAt: property.created_at,
  };
}

export default function ProfilePage() {
  const { username } = useParams();
  const [profile, setProfile] = useState<PublicProfile | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadProfile = async () => {
      if (!username) return;

      try {
        const data = await profileApi.get(username);
        setProfile(data);
      } catch (err: any) {
        setError(err.message || 'Perfil não encontrado');
      } finally {
        setIsLoading(false);
      }
    };

    loadProfile();
  }, [username]);

  if (isLoading) {
    return (
      <Layout>
        <div className="min-h-screen flex items-center justify-center">
          <p className="text-neutral-600">Carregando perfil...</p>
        </div>
      </Layout>
    );
  }

  if (error || !profile) {
    return (
      <Layout>
        <div className="min-h-screen flex flex-col items-center justify-center">
          <p className="text-neutral-600 mb-4">{error || 'Perfil não encontrado'}</p>
          <Link to="/" className="text-brand-600 hover:text-brand-700 font-medium">
            Voltar para a página inicial
          </Link>
        </div>
      </Layout>
    );
  }

  const memberSince = new Date(profile.created_at).toLocaleDateString('pt-BR', {
    month: 'long',
    year: 'numeric',
  });

  const properties = profile.properties?.map(apiPropertyToMock) || [];

  return (
    <Layout>
      <div className="bg-neutral-50 min-h-screen">
        {/* Header */}
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

        {/* Perfil */}
        <div className="bg-gradient-to-br from-brand-600 via-brand-700 to-brand-800 text-white">
          <div className="container-app py-12">
            <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
              {/* Avatar */}
              <div className="w-32 h-32 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center border-4 border-white/30">
                {profile.avatar ? (
                  <img 
                    src={profile.avatar} 
                    alt={profile.name}
                    className="w-full h-full object-cover rounded-full"
                  />
                ) : (
                  <User className="w-16 h-16 text-white" />
                )}
              </div>

              {/* Informações */}
              <div className="text-center md:text-left flex-1">
                <h1 className="text-3xl font-display font-bold mb-1">
                  {profile.name}
                </h1>
                <p className="text-brand-200 text-lg mb-4">@{profile.username}</p>
                
                {profile.bio && (
                  <p className="text-white/90 mb-4 max-w-2xl">{profile.bio}</p>
                )}

                <div className="flex flex-wrap justify-center md:justify-start gap-4 text-sm">
                  {profile.creci && (
                    <div className="flex items-center gap-1.5 text-white/80">
                      <Award className="w-4 h-4" />
                      CRECI: {profile.creci}
                    </div>
                  )}
                  <div className="flex items-center gap-1.5 text-white/80">
                    <Building2 className="w-4 h-4" />
                    {profile.properties_count} {profile.properties_count === 1 ? 'imóvel' : 'imóveis'}
                  </div>
                  <div className="flex items-center gap-1.5 text-white/80">
                    <Calendar className="w-4 h-4" />
                    Membro desde {memberSince}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Imóveis */}
        <div className="container-app py-12">
          <h2 className="text-2xl font-display font-bold text-neutral-900 mb-6">
            Imóveis de {profile.name}
          </h2>

          {properties.length === 0 ? (
            <div className="text-center py-12 bg-white rounded-card shadow-card">
              <Building2 className="w-16 h-16 text-neutral-300 mx-auto mb-4" />
              <p className="text-neutral-600">Nenhum imóvel cadastrado ainda</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {properties.map((property) => (
                <PropertyCard key={property.id} property={property} />
              ))}
            </div>
          )}
        </div>
      </div>

      {/* WhatsApp Button */}
      {profile.phone && (
        <WhatsAppButton 
          phone={profile.phone} 
          message={`Olá ${profile.name}! Vi seu perfil no Dommus e gostaria de mais informações.`}
        />
      )}
    </Layout>
  );
}