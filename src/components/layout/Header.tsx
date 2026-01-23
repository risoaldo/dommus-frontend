import { Link } from 'react-router-dom';
import { Home, Building2, Hotel, User } from 'lucide-react';

export function Header() {
  return (
    <header className="sticky top-0 z-50 bg-white border-b border-neutral-200 shadow-sm">
      <div className="container-app">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2">
            <div className="w-10 h-10 bg-gradient-to-br from-brand-500 to-brand-700 rounded-lg flex items-center justify-center">
              <Home className="w-6 h-6 text-white" />
            </div>
            <span className="text-2xl font-display font-bold bg-gradient-to-r from-brand-600 to-brand-800 bg-clip-text text-transparent">
              Dommus
            </span>
          </Link>

          {/* Navegação Desktop */}
          <nav className="hidden md:flex items-center gap-8">
            <Link 
              to="/imoveis" 
              className="flex items-center gap-2 text-neutral-700 hover:text-brand-600 transition-colors font-medium"
            >
              <Building2 className="w-4 h-4" />
              Imóveis
            </Link>
            <Link 
              to="/hospedagem" 
              className="flex items-center gap-2 text-neutral-700 hover:text-brand-600 transition-colors font-medium"
            >
              <Hotel className="w-4 h-4" />
              Hospedagem
            </Link>
            <Link 
              to="/login" 
              className="flex items-center gap-2 px-4 py-2 bg-brand-600 text-white rounded-button hover:bg-brand-700 transition-colors font-medium shadow-button"
            >
              <User className="w-4 h-4" />
              Entrar
            </Link>
          </nav>

          {/* Navegação Mobile */}
          <nav className="md:hidden flex items-center gap-4">
            <Link to="/imoveis" className="text-neutral-700 hover:text-brand-600">
              <Building2 className="w-5 h-5" />
            </Link>
            <Link to="/hospedagem" className="text-neutral-700 hover:text-brand-600">
              <Hotel className="w-5 h-5" />
            </Link>
            <Link to="/login" className="text-neutral-700 hover:text-brand-600">
              <User className="w-5 h-5" />
            </Link>
          </nav>
        </div>
      </div>
    </header>
  );
}
