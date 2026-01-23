import { useState, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { SlidersHorizontal } from 'lucide-react';
import { Layout } from '../components/layout/Layout';
import { PropertyCard } from '../components/cards/PropertyCard';
import { mockProperties } from '../data/mock';

export default function Properties() {
  const [searchParams] = useSearchParams();
  const [selectedType, setSelectedType] = useState(searchParams.get('type') || 'all');
  const [selectedNeighborhood, setSelectedNeighborhood] = useState('all');
  const [selectedTransaction, setSelectedTransaction] = useState('all');
  const [onlyMCMV, setOnlyMCMV] = useState(searchParams.get('mcmv') === 'true');

  // Extrair bairros únicos dinamicamente
  const neighborhoods = useMemo(() => {
    const unique = [...new Set(mockProperties.map(p => p.neighborhood))];
    return unique.sort();
  }, []);

  // Filtrar imóveis
  const filteredProperties = useMemo(() => {
    return mockProperties.filter(property => {
      if (selectedType !== 'all' && property.type !== selectedType) return false;
      if (selectedNeighborhood !== 'all' && property.neighborhood !== selectedNeighborhood) return false;
      if (selectedTransaction !== 'all' && property.transactionType !== selectedTransaction) return false;
      if (onlyMCMV && !property.acceptsMCMV) return false;
      return true;
    });
  }, [selectedType, selectedNeighborhood, selectedTransaction, onlyMCMV]);

  return (
    <Layout>
      <div className="bg-neutral-50 min-h-screen">
        {/* Header */}
        <div className="bg-white border-b border-neutral-200">
          <div className="container-app py-8">
            <h1 className="text-3xl md:text-4xl font-display font-bold text-neutral-900 mb-2">
              Imóveis em Icó
            </h1>
            <p className="text-neutral-600">
              {filteredProperties.length} {filteredProperties.length === 1 ? 'imóvel encontrado' : 'imóveis encontrados'}
            </p>
          </div>
        </div>

        <div className="container-app py-8">
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Filtros Sidebar */}
            <aside className="lg:w-72 flex-shrink-0">
              <div className="bg-white rounded-card shadow-card p-6 sticky top-20">
                <div className="flex items-center gap-2 mb-6">
                  <SlidersHorizontal className="w-5 h-5 text-brand-600" />
                  <h2 className="font-semibold text-lg">Filtros</h2>
                </div>

                {/* Tipo de Transação */}
                <div className="mb-6">
                  <label className="block text-sm font-medium text-neutral-700 mb-3">
                    Tipo de Transação
                  </label>
                  <div className="space-y-2">
                    {['all', 'venda', 'aluguel'].map((type) => (
                      <label key={type} className="flex items-center gap-2 cursor-pointer">
                        <input
                          type="radio"
                          name="transaction"
                          value={type}
                          checked={selectedTransaction === type}
                          onChange={(e) => setSelectedTransaction(e.target.value)}
                          className="w-4 h-4 text-brand-600 focus:ring-brand-500"
                        />
                        <span className="text-sm text-neutral-700">
                          {type === 'all' ? 'Todos' : type.charAt(0).toUpperCase() + type.slice(1)}
                        </span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Tipo de Imóvel */}
                <div className="mb-6">
                  <label className="block text-sm font-medium text-neutral-700 mb-3">
                    Tipo de Imóvel
                  </label>
                  <select
                    value={selectedType}
                    onChange={(e) => setSelectedType(e.target.value)}
                    className="w-full px-3 py-2 border border-neutral-300 rounded-input focus:ring-2 focus:ring-brand-500 focus:border-transparent text-sm"
                  >
                    <option value="all">Todos os tipos</option>
                    <option value="casa">Casa</option>
                    <option value="apartamento">Apartamento</option>
                    <option value="terreno">Terreno</option>
                    <option value="comercial">Comercial</option>
                  </select>
                </div>

                {/* Bairro */}
                <div className="mb-6">
                  <label className="block text-sm font-medium text-neutral-700 mb-3">
                    Bairro
                  </label>
                  <select
                    value={selectedNeighborhood}
                    onChange={(e) => setSelectedNeighborhood(e.target.value)}
                    className="w-full px-3 py-2 border border-neutral-300 rounded-input focus:ring-2 focus:ring-brand-500 focus:border-transparent text-sm"
                  >
                    <option value="all">Todos os bairros</option>
                    {neighborhoods.map((neighborhood) => (
                      <option key={neighborhood} value={neighborhood}>
                        {neighborhood}
                      </option>
                    ))}
                  </select>
                </div>

                {/* MCMV */}
                <div className="pt-6 border-t border-neutral-200">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={onlyMCMV}
                      onChange={(e) => setOnlyMCMV(e.target.checked)}
                      className="w-4 h-4 text-brand-600 focus:ring-brand-500 rounded"
                    />
                    <span className="text-sm font-medium text-neutral-700">
                      Apenas Minha Casa Minha Vida
                    </span>
                  </label>
                </div>
              </div>
            </aside>

            {/* Grid de Imóveis */}
            <div className="flex-1">
              {filteredProperties.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                  {filteredProperties.map((property) => (
                    <PropertyCard key={property.id} property={property} />
                  ))}
                </div>
              ) : (
                <div className="bg-white rounded-card shadow-card p-12 text-center">
                  <p className="text-neutral-600 text-lg mb-2">Nenhum imóvel encontrado</p>
                  <p className="text-neutral-500 text-sm">
                    Tente ajustar os filtros para ver mais resultados
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
