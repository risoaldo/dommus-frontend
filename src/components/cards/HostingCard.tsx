import { Link } from 'react-router-dom';
import { MapPin, Users, Bed, Bath, Sparkles } from 'lucide-react';
import { Hosting } from '../../types';
import { formatCurrency } from '../../lib/utils';

interface HostingCardProps {
  hosting: Hosting;
}

export function HostingCard({ hosting }: HostingCardProps) {
  const getTypeLabel = (type: string) => {
    const labels = {
      pousada: 'Pousada',
      hotel: 'Hotel',
      chacara: 'Chácara',
      quarto: 'Quarto'
    };
    return labels[type as keyof typeof labels] || type;
  };

  return (
    <Link to={`/hospedagem/${hosting.id}`}>
      <div className="group bg-white rounded-card overflow-hidden shadow-card hover:shadow-card-hover transition-all duration-300 hover:-translate-y-1">
        {/* Imagem */}
        <div className="relative h-48 overflow-hidden bg-neutral-200">
          <img 
            src={hosting.images[0]} 
            alt={hosting.title}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
          />
          
          {/* Badge de tipo */}
          <div className="absolute top-3 left-3">
            <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-white/95 backdrop-blur-sm rounded-badge text-xs font-medium text-neutral-700 shadow-sm">
              <Sparkles className="w-3.5 h-3.5" />
              {getTypeLabel(hosting.type)}
            </span>
          </div>
        </div>

        {/* Conteúdo */}
        <div className="p-4">
          {/* Título */}
          <h3 className="font-semibold text-lg text-neutral-900 mb-2 line-clamp-1 group-hover:text-brand-600 transition-colors">
            {hosting.title}
          </h3>

          {/* Localização */}
          <div className="flex items-center gap-1.5 text-neutral-600 mb-3">
            <MapPin className="w-4 h-4 flex-shrink-0" />
            <p className="text-sm line-clamp-1">
              {hosting.neighborhood}, {hosting.city}
            </p>
          </div>

          {/* Características */}
          <div className="flex items-center gap-4 mb-4 text-neutral-700">
            <div className="flex items-center gap-1.5">
              <Users className="w-4 h-4 text-brand-600" />
              <span className="text-sm font-medium">{hosting.capacity} pessoas</span>
            </div>
            {hosting.bedrooms && (
              <div className="flex items-center gap-1.5">
                <Bed className="w-4 h-4 text-brand-600" />
                <span className="text-sm font-medium">{hosting.bedrooms}</span>
              </div>
            )}
            {hosting.bathrooms && (
              <div className="flex items-center gap-1.5">
                <Bath className="w-4 h-4 text-brand-600" />
                <span className="text-sm font-medium">{hosting.bathrooms}</span>
              </div>
            )}
          </div>

          {/* Preço */}
          <div className="pt-3 border-t border-neutral-100">
            <p className="text-2xl font-bold text-brand-600 font-display">
              {formatCurrency(hosting.pricePerNight)}
              <span className="text-sm font-normal text-neutral-600">/noite</span>
            </p>
          </div>
        </div>
      </div>
    </Link>
  );
}
