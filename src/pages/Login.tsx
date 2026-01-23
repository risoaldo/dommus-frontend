import { useState, FormEvent } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Mail, Lock, Home, Loader2 } from 'lucide-react';
import { authApi } from '../services/api';

export default function Login() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      // Chama a API do Laravel
      await authApi.login({
        email: formData.email,
        password: formData.password,
      });
console.log('Login OK, redirecionando...');
      // Redirecionar para dashboard após sucesso
       navigate('/dashboard');
    

    } catch (err) {
    setError(err instanceof Error ? err.message : 'Erro ao fazer login. Tente novamente.');
    setIsLoading(false);
  }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-brand-600 via-brand-700 to-brand-800 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Logo/Brand */}
        <Link to="/" className="flex items-center justify-center gap-2 mb-8">
          <div className="w-12 h-12 bg-white rounded-lg flex items-center justify-center">
            <Home className="w-7 h-7 text-brand-600" />
          </div>
          <span className="text-3xl font-display font-bold text-white">
            
          </span>
        </Link>

        {/* Card de Login */}
        <div className="bg-white rounded-2xl shadow-2xl p-8">
          <h1 className="text-2xl font-display font-bold text-neutral-900 mb-2">
            Bem-vindo de volta
          </h1>
          <p className="text-neutral-600 mb-6">
            Entre na sua conta para gerenciar seus anúncios
          </p>

          {error && (
            <div className="mb-4 p-3 bg-error-50 border border-error-200 text-error-700 rounded-lg text-sm">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-neutral-700 mb-2">
                E-mail
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-neutral-400" />
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  required
                  disabled={isLoading}
                  className="w-full pl-10 pr-4 py-3 border border-neutral-300 rounded-input focus:ring-2 focus:ring-brand-500 focus:border-transparent disabled:bg-neutral-100 disabled:cursor-not-allowed"
                  placeholder="seu@email.com"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-neutral-700 mb-2">
                Senha
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-neutral-400" />
                <input
                  type="password"
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  required
                  disabled={isLoading}
                  className="w-full pl-10 pr-4 py-3 border border-neutral-300 rounded-input focus:ring-2 focus:ring-brand-500 focus:border-transparent disabled:bg-neutral-100 disabled:cursor-not-allowed"
                  placeholder="••••••••"
                />
              </div>
            </div>

            <div className="flex items-center justify-between">
              <label className="flex items-center">
                <input
                  type="checkbox"
                  className="w-4 h-4 text-brand-600 border-neutral-300 rounded focus:ring-brand-500"
                />
                <span className="ml-2 text-sm text-neutral-600">Lembrar-me</span>
              </label>
              <Link to="/esqueci-senha" className="text-sm text-brand-600 hover:text-brand-700">
                Esqueceu a senha?
              </Link>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-3 bg-brand-600 hover:bg-brand-700 text-white font-semibold rounded-button transition-colors shadow-button disabled:bg-brand-400 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {isLoading ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  Entrando...
                </>
              ) : (
                'Entrar'
              )}
            </button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-neutral-600 text-sm">
              Não tem uma conta?{' '}
              <Link to="/register" className="text-brand-600 hover:text-brand-700 font-semibold">
                Cadastre-se
              </Link>
            </p>
          </div>
        </div>

        <div className="mt-6 text-center">
          <Link to="/" className="text-white/80 hover:text-white text-sm">
            ← Voltar para o site
          </Link>
        </div>
      </div>
    </div>
  );
}