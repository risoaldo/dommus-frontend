import { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Home, Building2, Hotel, LogOut, Plus, Eye } from 'lucide-react';

export default function Dashboard() {
  const navigate = useNavigate();
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    // Verificar se está logado
    const userData = localStorage.getItem('dommus_current_user');
    if (!userData) {
      navigate('/login');
      return;
    }
    setUser(JSON.parse(userData));
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('dommus_current_user');
    navigate('/');
  };

  if (!user) {
    return null;
  }

  return (
    <div className="min-h-screen bg-neutral-50">
      {/* Header do Dashboard */}
      <header className="bg-white border-b border-neutral-200 shadow-sm">
        <div className="container-app">
          <div className="flex items-center justify-between h-16">
            <Link to="/" className="flex items-center gap-2">
              <div className="w-10 h-10 bg-gradient-to-br from-brand-500 to-brand-700 rounded-lg flex items-center justify-center">
                <Home className="w-6 h-6 text-white" />
              </div>
              <span className="text-2xl font-display font-bold bg-gradient-to-r from-brand-600 to-brand-800 bg-clip-text text-transparent">
                Dommus
              </span>
            </Link>

            <div className="flex items-center gap-4">
              <span className="text-sm text-neutral-600 hidden sm:inline">
                Olá, <span className="font-semibold text-neutral-900">{user.name}</span>
              </span>
              <button
                onClick={handleLogout}
                className="flex items-center gap-2 px-4 py-2 text-neutral-700 hover:text-brand-600 transition-colors"
              >
                <LogOut className="w-4 h-4" />
                <span className="hidden sm:inline">Sair</span>
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Conteúdo */}
      <div className="container-app py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-display font-bold text-neutral-900 mb-2">
            Dashboard
          </h1>
          <p className="text-neutral-600">
            Gerencie seus anúncios e acompanhe o desempenho
          </p>
        </div>

        {/* Cards de Estatísticas */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-card shadow-card p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-brand-100 rounded-lg flex items-center justify-center">
                <Building2 className="w-6 h-6 text-brand-600" />
              </div>
              <span className="text-3xl font-display font-bold text-neutral-900">0</span>
            </div>
            <h3 className="text-neutral-600 font-medium">Imóveis Ativos</h3>
          </div>

          <div className="bg-white rounded-card shadow-card p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-success-100 rounded-lg flex items-center justify-center">
                <Hotel className="w-6 h-6 text-success-600" />
              </div>
              <span className="text-3xl font-display font-bold text-neutral-900">0</span>
            </div>
            <h3 className="text-neutral-600 font-medium">Hospedagens Ativas</h3>
          </div>

          <div className="bg-white rounded-card shadow-card p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-neutral-100 rounded-lg flex items-center justify-center">
                <Eye className="w-6 h-6 text-neutral-600" />
              </div>
              <span className="text-3xl font-display font-bold text-neutral-900">0</span>
            </div>
            <h3 className="text-neutral-600 font-medium">Visualizações</h3>
          </div>
        </div>

        {/* Ações Rápidas */}
        <div className="bg-white rounded-card shadow-card p-6 mb-8">
          <h2 className="text-xl font-semibold text-neutral-900 mb-4">Ações Rápidas</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Link 
              to="/dashboard/novo-imovel"
              className="flex items-center gap-3 p-4 border-2 border-brand-600 rounded-lg hover:bg-brand-50 transition-colors"
            >
              <div className="w-10 h-10 bg-brand-600 rounded-lg flex items-center justify-center flex-shrink-0">
                <Plus className="w-5 h-5 text-white" />
              </div>
              <div className="text-left">
                <p className="font-semibold text-neutral-900">Anunciar Imóvel</p>
                <p className="text-sm text-neutral-600">Cadastre um novo imóvel</p>
              </div>
            </Link>

            <button className="flex items-center gap-3 p-4 border-2 border-neutral-300 rounded-lg hover:bg-neutral-50 transition-colors">
              <div className="w-10 h-10 bg-neutral-600 rounded-lg flex items-center justify-center flex-shrink-0">
                <Plus className="w-5 h-5 text-white" />
              </div>
              <div className="text-left">
                <p className="font-semibold text-neutral-900">Anunciar Hospedagem</p>
                <p className="text-sm text-neutral-600">Cadastre uma nova hospedagem</p>
              </div>
            </button>
          </div>
        </div>

        {/* Lista de Anúncios */}
        <div className="bg-white rounded-card shadow-card p-6">
          <h2 className="text-xl font-semibold text-neutral-900 mb-4">Meus Anúncios</h2>
          <div className="text-center py-12">
            <Building2 className="w-16 h-16 text-neutral-300 mx-auto mb-4" />
            <p className="text-neutral-600 text-lg mb-2">Nenhum anúncio cadastrado</p>
            <p className="text-neutral-500 text-sm mb-6">
              Comece cadastrando seu primeiro imóvel ou hospedagem
            </p>
            <Link
              to="/dashboard/novo-imovel"
              className="px-6 py-3 bg-brand-600 hover:bg-brand-700 text-white rounded-button font-medium transition-colors inline-flex items-center gap-2"
            >
              <Plus className="w-5 h-5" />
              Criar primeiro anúncio
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
