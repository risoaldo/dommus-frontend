import { useState, useMemo } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Search, Building2, Hotel, TrendingUp, CheckCircle } from 'lucide-react';
import { Layout } from '../components/layout/Layout';
import { PropertyCard } from '../components/cards/PropertyCard';
import { HostingCard } from '../components/cards/HostingCard';
import { mockProperties, mockHostings } from '../data/mock';

type SearchType = 'imoveis' | 'hospedagem';
type QuickFilter = 'all' | 'casa' | 'apartamento' | 'terreno' | 'mcmv';

export default function Home() {
  const [searchType, setSearchType] = useState<SearchType>('imoveis');
  const [searchQuery, setSearchQuery] = useState('');
  const [quickFilter, setQuickFilter] = useState<QuickFilter>('all');
  const navigate = useNavigate();

  // Filtrar imóveis com base no filtro rápido
  const filteredProperties = useMemo(() => {
    let filtered = mockProperties;

    if (quickFilter === 'casa') {
      filtered = filtered.filter(p => p.type === 'casa');
    } else if (quickFilter === 'apartamento') {
      filtered = filtered.filter(p => p.type === 'apartamento');
    } else if (quickFilter === 'terreno') {
      filtered = filtered.filter(p => p.type === 'terreno');
    } else if (quickFilter === 'mcmv') {
      filtered = filtered.filter(p => p.acceptsMCMV);
    }

    return filtered;
  }, [quickFilter]);

  const displayedProperties = quickFilter === 'all' 
    ? filteredProperties.slice(0, 3)
    : filteredProperties.slice(0, 6);

  const featuredHostings = mockHostings.slice(0, 3);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchType === 'imoveis') {
      navigate(`/imoveis?q=${encodeURIComponent(searchQuery)}`);
    } else {
      navigate(`/hospedagem?q=${encodeURIComponent(searchQuery)}`);
    }
  };

  return (
    <Layout>
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-brand-600 via-brand-700 to-brand-800 text-white overflow-hidden">
        <div className="absolute inset-0 bg-black/10" />
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxwYXRoIGQ9Ik0zNiAxOGMzLjMxNCAwIDYgMi42ODYgNiA2cy0yLjY4NiA2LTYgNi02LTIuNjg2LTYtNiAyLjY4Ni02IDYtNiIgc3Ryb2tlPSIjZmZmIiBzdHJva2Utb3BhY2l0eT0iLjA1Ii8+PC9nPjwvc3ZnPg==')] opacity-30" />
        
        <div className="container-app relative py-20 md:py-28">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold mb-6 leading-tight">
              Encontre seu próximo lar em <span className="text-brand-200">Icó</span>
            </h1>
            <p className="text-lg md:text-xl text-white/90 mb-10 leading-relaxed">
              Imóveis e hospedagens em um só lugar. Conectamos você ao melhor da região.
            </p>

            {/* Barra de Busca */}
            <div className="bg-white rounded-2xl shadow-2xl p-2">
              <form onSubmit={handleSearch} className="flex flex-col md:flex-row gap-2">
                {/* Tipo de Busca */}
                <div className="flex bg-neutral-100 rounded-xl p-1">
                  <button
                    type="button"
                    onClick={() => setSearchType('imoveis')}
                    className={`flex-1 flex items-center justify-center gap-2 px-4 py-3 rounded-lg text-sm font-medium transition-all ${
                      searchType === 'imoveis'
                        ? 'bg-white text-brand-600 shadow-sm'
                        : 'text-neutral-600 hover:text-neutral-900'
                    }`}
                  >
                    <Building2 className="w-4 h-4" />
                    Imóveis
                  </button>
                  <button
                    type="button"
                    onClick={() => setSearchType('hospedagem')}
                    className={`flex-1 flex items-center justify-center gap-2 px-4 py-3 rounded-lg text-sm font-medium transition-all ${
                      searchType === 'hospedagem'
                        ? 'bg-white text-brand-600 shadow-sm'
                        : 'text-neutral-600 hover:text-neutral-900'
                    }`}
                  >
                    <Hotel className="w-4 h-4" />
                    Hospedagem
                  </button>
                </div>

                {/* Input de Busca */}
                <div className="flex-1 flex gap-2">
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder={`Buscar ${searchType === 'imoveis' ? 'imóveis' : 'hospedagens'}...`}
                    className="flex-1 px-4 py-3 border-0 text-neutral-900 placeholder-neutral-400 focus:outline-none rounded-xl"
                  />
                  <button
                    type="submit"
                    className="px-6 py-3 bg-brand-600 text-white rounded-xl hover:bg-brand-700 transition-colors font-medium shadow-button flex items-center gap-2"
                  >
                    <Search className="w-5 h-5" />
                    <span className="hidden sm:inline">Buscar</span>
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Filtros Rápidos */}
      <section className="py-8 bg-white border-b border-neutral-200">
        <div className="container-app">
          <div className="flex flex-wrap gap-3 justify-center">
            <button
              onClick={() => setQuickFilter('all')}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                quickFilter === 'all'
                  ? 'bg-brand-600 text-white'
                  : 'bg-neutral-100 hover:bg-brand-50 hover:text-brand-600'
              }`}
            >
              Todos
            </button>
            <button
              onClick={() => setQuickFilter('casa')}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                quickFilter === 'casa'
                  ? 'bg-brand-600 text-white'
                  : 'bg-neutral-100 hover:bg-brand-50 hover:text-brand-600'
              }`}
            >
              Casas
            </button>
            <button
              onClick={() => setQuickFilter('apartamento')}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                quickFilter === 'apartamento'
                  ? 'bg-brand-600 text-white'
                  : 'bg-neutral-100 hover:bg-brand-50 hover:text-brand-600'
              }`}
            >
              Apartamentos
            </button>
            <button
              onClick={() => setQuickFilter('terreno')}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                quickFilter === 'terreno'
                  ? 'bg-brand-600 text-white'
                  : 'bg-neutral-100 hover:bg-brand-50 hover:text-brand-600'
              }`}
            >
              Terrenos
            </button>
            <button
              onClick={() => setQuickFilter('mcmv')}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors flex items-center gap-1.5 ${
                quickFilter === 'mcmv'
                  ? 'bg-success-600 text-white'
                  : 'bg-success-50 text-success-600 hover:bg-success-100'
              }`}
            >
              <CheckCircle className="w-4 h-4" />
              Minha Casa Minha Vida
            </button>
          </div>
        </div>
      </section>

      {/* Imóveis em Destaque */}
      <section className="container-app py-16">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-3xl font-display font-bold text-neutral-900 mb-2">
              {quickFilter === 'all' ? 'Imóveis em Destaque' : 
               quickFilter === 'casa' ? 'Casas' :
               quickFilter === 'apartamento' ? 'Apartamentos' :
               quickFilter === 'terreno' ? 'Terrenos' :
               'Imóveis MCMV'}
            </h2>
            <p className="text-neutral-600">
              {filteredProperties.length} {filteredProperties.length === 1 ? 'imóvel encontrado' : 'imóveis encontrados'}
            </p>
          </div>
          <Link
            to="/imoveis"
            className="hidden sm:flex items-center gap-2 text-brand-600 hover:text-brand-700 font-medium"
          >
            Ver todos
            <TrendingUp className="w-4 h-4" />
          </Link>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
          {displayedProperties.map((property) => (
            <PropertyCard key={property.id} property={property} />
          ))}
        </div>
        {filteredProperties.length === 0 && (
          <div className="text-center py-12">
            <p className="text-neutral-600">Nenhum imóvel encontrado nesta categoria</p>
          </div>
        )}
        <Link
          to="/imoveis"
          className="sm:hidden flex items-center justify-center gap-2 text-brand-600 hover:text-brand-700 font-medium"
        >
          Ver todos os imóveis
          <TrendingUp className="w-4 h-4" />
        </Link>
      </section>

      {/* Hospedagens em Destaque */}
      <section className="bg-neutral-50 py-16">
        <div className="container-app">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-3xl font-display font-bold text-neutral-900 mb-2">
                Hospedagens em Destaque
              </h2>
              <p className="text-neutral-600">As melhores opções para sua estadia</p>
            </div>
            <Link
              to="/hospedagem"
              className="hidden sm:flex items-center gap-2 text-brand-600 hover:text-brand-700 font-medium"
            >
              Ver todas
              <TrendingUp className="w-4 h-4" />
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
            {featuredHostings.map((hosting) => (
              <HostingCard key={hosting.id} hosting={hosting} />
            ))}
          </div>
          <Link
            to="/hospedagem"
            className="sm:hidden flex items-center justify-center gap-2 text-brand-600 hover:text-brand-700 font-medium"
          >
            Ver todas as hospedagens
            <TrendingUp className="w-4 h-4" />
          </Link>
        </div>
      </section>
    </Layout>
  );
}
