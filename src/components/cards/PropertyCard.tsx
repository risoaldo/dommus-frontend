import { Link } from 'react-router-dom';
import { MapPin, Bed, Bath, Maximize2, Tag } from 'lucide-react';
import { Property } from '../../types';
import { formatCurrency } from '../../lib/utils';

interface PropertyCardProps {
  property: Property;
}

export function PropertyCard({ property }: PropertyCardProps) {
    console.log('Card ID:', property.id); // Debug

  const getTypeLabel = (type: string) => {
    const labels = {
      casa: 'Casa',
      apartamento: 'Apartamento',
      terreno: 'Terreno',
      comercial: 'Comercial'
    };
    return labels[type as keyof typeof labels] || type;
  };

  return (
    <Link to={`/imovel/${property.id}`}>
      <div className="group bg-white rounded-card overflow-hidden shadow-card hover:shadow-card-hover transition-all duration-300 hover:-translate-y-1">
        {/* Imagem */}
        <div className="relative h-48 overflow-hidden bg-neutral-200">
           <img 
    src={property.images?.[0] || '/placeholder-property.jpg'} 
    alt={property.title}
    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
  />
          
          {/* Badge de tipo */}
          <div className="absolute top-3 left-3">
            <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-white/95 backdrop-blur-sm rounded-badge text-xs font-medium text-neutral-700 shadow-sm">
              <Tag className="w-3.5 h-3.5" />
              {getTypeLabel(property.type)}
            </span>
          </div>

          {/* Badge MCMV */}
          {property.acceptsMCMV && (
            <div className="absolute top-3 right-3">
              <span className="inline-block px-3 py-1.5 bg-success-500 text-white text-xs font-semibold rounded-badge shadow-sm">
                MCMV
              </span>
            </div>
          )}

          {/* Badge de transação */}
          <div className="absolute bottom-3 left-3">
            <span className="inline-block px-3 py-1.5 bg-brand-600 text-white text-xs font-bold uppercase rounded-badge shadow-sm">
              {property.transactionType}
            </span>
          </div>
        </div>

        {/* Conteúdo */}
        <div className="p-4">
          {/* Título */}
          <h3 className="font-semibold text-lg text-neutral-900 mb-2 line-clamp-1 group-hover:text-brand-600 transition-colors">
            {property.title}
          </h3>

          {/* Localização */}
          <div className="flex items-center gap-1.5 text-neutral-600 mb-3">
            <MapPin className="w-4 h-4 flex-shrink-0" />
            <p className="text-sm line-clamp-1">
              {property.neighborhood}, {property.city}
            </p>
          </div>

          {/* Características */}
          <div className="flex items-center gap-4 mb-4 text-neutral-700">
            {property.bedrooms && (
              <div className="flex items-center gap-1.5">
                <Bed className="w-4 h-4 text-brand-600" />
                <span className="text-sm font-medium">{property.bedrooms}</span>
              </div>
            )}
            {property.bathrooms && (
              <div className="flex items-center gap-1.5">
                <Bath className="w-4 h-4 text-brand-600" />
                <span className="text-sm font-medium">{property.bathrooms}</span>
              </div>
            )}
            <div className="flex items-center gap-1.5">
              <Maximize2 className="w-4 h-4 text-brand-600" />
              <span className="text-sm font-medium">{property.area}m²</span>
            </div>
          </div>

          {/* Preço */}
          <div className="pt-3 border-t border-neutral-100">
            <p className="text-2xl font-bold text-brand-600 font-display">
              {formatCurrency(property.price)}
              {property.transactionType === 'aluguel' && (
                <span className="text-sm font-normal text-neutral-600">/mês</span>
              )}
            </p>
          </div>
        </div>
      </div>
    </Link>
  );
}
