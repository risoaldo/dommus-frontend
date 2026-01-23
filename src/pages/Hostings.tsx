import { useState, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { SlidersHorizontal } from 'lucide-react';
import { Layout } from '../components/layout/Layout';
import { HostingCard } from '../components/cards/HostingCard';
import { mockHostings } from '../data/mock';

export default function Hostings() {
  const [searchParams] = useSearchParams();
  const [selectedType, setSelectedType] = useState(searchParams.get('type') || 'all');
  const [selectedNeighborhood, setSelectedNeighborhood] = useState('all');
  const [maxPrice, setMaxPrice] = useState<number>(1000);

  // Extrair bairros únicos dinamicamente
  const neighborhoods = useMemo(() => {
    const unique = [...new Set(mockHostings.map(h => h.neighborhood))];
    return unique.sort();
  }, []);

  // Filtrar hospedagens
  const filteredHostings = useMemo(() => {
    return mockHostings.filter(hosting => {
      if (selectedType !== 'all' && hosting.type !== selectedType) return false;
      if (selectedNeighborhood !== 'all' && hosting.neighborhood !== selectedNeighborhood) return false;
      if (hosting.pricePerNight > maxPrice) return false;
      return true;
    });
  }, [selectedType, selectedNeighborhood, maxPrice]);

  return (
    <Layout>
      <div className="bg-neutral-50 min-h-screen">
        {/* Header */}
        <div className="bg-white border-b border-neutral-200">
          <div className="container-app py-8">
            <h1 className="text-3xl md:text-4xl font-display font-bold text-neutral-900 mb-2">
              Hospedagens em Icó
            </h1>
            <p className="text-neutral-600">
              {filteredHostings.length} {filteredHostings.length === 1 ? 'hospedagem encontrada' : 'hospedagens encontradas'}
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

                {/* Tipo de Hospedagem */}
                <div className="mb-6">
                  <label className="block text-sm font-medium text-neutral-700 mb-3">
                    Tipo de Hospedagem
                  </label>
                  <select
                    value={selectedType}
                    onChange={(e) => setSelectedType(e.target.value)}
                    className="w-full px-3 py-2 border border-neutral-300 rounded-input focus:ring-2 focus:ring-brand-500 focus:border-transparent text-sm"
                  >
                    <option value="all">Todos os tipos</option>
                    <option value="pousada">Pousada</option>
                    <option value="hotel">Hotel</option>
                    <option value="chacara">Chácara</option>
                    <option value="quarto">Quarto</option>
                  </select>
                </div>

                {/* Bairro */}
                <div className="mb-6">
                  <label className="block text-sm font-medium text-neutral-700 mb-3">
                    Bairro/Região
                  </label>
                  <select
                    value={selectedNeighborhood}
                    onChange={(e) => setSelectedNeighborhood(e.target.value)}
                    className="w-full px-3 py-2 border border-neutral-300 rounded-input focus:ring-2 focus:ring-brand-500 focus:border-transparent text-sm"
                  >
                    <option value="all">Todas as regiões</option>
                    {neighborhoods.map((neighborhood) => (
                      <option key={neighborhood} value={neighborhood}>
                        {neighborhood}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Preço Máximo */}
                <div className="mb-6">
                  <label className="block text-sm font-medium text-neutral-700 mb-3">
                    Preço máximo por noite
                  </label>
                  <input
                    type="range"
                    min="50"
                    max="500"
                    step="50"
                    value={maxPrice}
                    onChange={(e) => setMaxPrice(Number(e.target.value))}
                    className="w-full"
                  />
                  <div className="flex justify-between items-center mt-2">
                    <span className="text-sm text-neutral-600">R$ 50</span>
                    <span className="text-sm font-semibold text-brand-600">
                      R$ {maxPrice}
                    </span>
                    <span className="text-sm text-neutral-600">R$ 500</span>
                  </div>
                </div>
              </div>
            </aside>

            {/* Grid de Hospedagens */}
            <div className="flex-1">
              {filteredHostings.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                  {filteredHostings.map((hosting) => (
                    <HostingCard key={hosting.id} hosting={hosting} />
                  ))}
                </div>
              ) : (
                <div className="bg-white rounded-card shadow-card p-12 text-center">
                  <p className="text-neutral-600 text-lg mb-2">Nenhuma hospedagem encontrada</p>
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
