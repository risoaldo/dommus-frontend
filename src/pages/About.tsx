import { Layout } from '../components/layout/Layout';
import { Home, Users, Target, Award, Heart } from 'lucide-react';

export default function About() {
  return (
    <Layout>
      <div className="bg-neutral-50 min-h-screen">
        {/* Hero */}
        <div className="bg-gradient-to-br from-brand-600 to-brand-800 text-white">
          <div className="container-app py-16 md:py-24">
            <h1 className="text-4xl md:text-5xl font-display font-bold mb-4">
              Sobre o Dommus
            </h1>
            <p className="text-xl text-white/90 max-w-2xl">
              Conectando pessoas aos seus lares ideais em Icó e região
            </p>
          </div>
        </div>

        {/* Conteúdo */}
        <div className="container-app py-16">
          {/* Nossa História */}
          <div className="max-w-4xl mx-auto mb-16">
            <div className="bg-white rounded-card shadow-card p-8">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 bg-brand-100 rounded-lg flex items-center justify-center">
                  <Home className="w-6 h-6 text-brand-600" />
                </div>
                <h2 className="text-3xl font-display font-bold text-neutral-900">Nossa História</h2>
              </div>
              <div className="prose prose-lg max-w-none text-neutral-700 space-y-4">
                <p>
                  O <strong>Dommus</strong> nasceu do sonho de facilitar o acesso à moradia e hospedagem 
                  em Icó e região. Nosso nome vem do latim "domus", que significa casa, lar - 
                  o que representa perfeitamente nossa missão.
                </p>
                <p>
                  Somos uma plataforma digital que conecta corretores, imobiliárias e estabelecimentos 
                  de hospedagem com pessoas que buscam seu próximo lar ou uma estadia confortável 
                  em nossa cidade.
                </p>
                <p>
                  Com foco especial no programa <strong>Minha Casa Minha Vida</strong>, facilitamos 
                  o acesso ao sonho da casa própria para famílias de Icó.
                </p>
              </div>
            </div>
          </div>

          {/* Valores */}
          <div className="mb-16">
            <h2 className="text-3xl font-display font-bold text-neutral-900 text-center mb-12">
              Nossos Valores
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-white rounded-card shadow-card p-8 text-center">
                <div className="w-16 h-16 bg-brand-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Target className="w-8 h-8 text-brand-600" />
                </div>
                <h3 className="text-xl font-semibold text-neutral-900 mb-3">Transparência</h3>
                <p className="text-neutral-600">
                  Informações claras e honestas sobre todos os imóveis e hospedagens anunciados.
                </p>
              </div>

              <div className="bg-white rounded-card shadow-card p-8 text-center">
                <div className="w-16 h-16 bg-success-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Users className="w-8 h-8 text-success-600" />
                </div>
                <h3 className="text-xl font-semibold text-neutral-900 mb-3">Comunidade</h3>
                <p className="text-neutral-600">
                  Fortalecemos a economia local conectando pessoas da nossa região.
                </p>
              </div>

              <div className="bg-white rounded-card shadow-card p-8 text-center">
                <div className="w-16 h-16 bg-neutral-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Heart className="w-8 h-8 text-neutral-600" />
                </div>
                <h3 className="text-xl font-semibold text-neutral-900 mb-3">Compromisso</h3>
                <p className="text-neutral-600">
                  Dedicação em ajudar cada pessoa a encontrar o lar perfeito.
                </p>
              </div>
            </div>
          </div>

          {/* Diferenciais */}
          <div className="bg-brand-50 border border-brand-200 rounded-card p-8 md:p-12">
            <div className="max-w-3xl mx-auto">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 bg-brand-600 rounded-lg flex items-center justify-center">
                  <Award className="w-6 h-6 text-white" />
                </div>
                <h2 className="text-3xl font-display font-bold text-neutral-900">Por que escolher o Dommus?</h2>
              </div>
              <div className="space-y-4 text-neutral-700">
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 bg-brand-600 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-white text-sm font-bold">✓</span>
                  </div>
                  <p><strong>Foco Local:</strong> Especialistas no mercado imobiliário de Icó e região</p>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 bg-brand-600 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-white text-sm font-bold">✓</span>
                  </div>
                  <p><strong>Suporte MCMV:</strong> Facilitamos o acesso ao programa habitacional do governo</p>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 bg-brand-600 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-white text-sm font-bold">✓</span>
                  </div>
                  <p><strong>Plataforma Completa:</strong> Imóveis e hospedagens em um único lugar</p>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 bg-brand-600 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-white text-sm font-bold">✓</span>
                  </div>
                  <p><strong>Contato Direto:</strong> WhatsApp integrado para comunicação rápida</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
