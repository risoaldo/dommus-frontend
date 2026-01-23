import { useState, FormEvent } from 'react';
import { Layout } from '../components/layout/Layout';
import { Mail, Phone, MapPin, Send, MessageCircle } from 'lucide-react';

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    // Aqui você enviaria para o backend
    console.log('Mensagem enviada:', formData);
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setFormData({ name: '', email: '', phone: '', subject: '', message: '' });
    }, 3000);
  };

  return (
    <Layout>
      <div className="bg-neutral-50 min-h-screen">
        {/* Hero */}
        <div className="bg-gradient-to-br from-brand-600 to-brand-800 text-white">
          <div className="container-app py-16 md:py-24">
            <h1 className="text-4xl md:text-5xl font-display font-bold mb-4">
              Entre em Contato
            </h1>
            <p className="text-xl text-white/90 max-w-2xl">
              Estamos aqui para ajudar. Envie sua mensagem e responderemos em breve!
            </p>
          </div>
        </div>

        {/* Conteúdo */}
        <div className="container-app py-16">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Informações de Contato */}
            <div className="lg:col-span-1 space-y-6">
              <div className="bg-white rounded-card shadow-card p-6">
                <h2 className="text-xl font-semibold text-neutral-900 mb-6">Informações de Contato</h2>
                
                <div className="space-y-4">
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 bg-brand-100 rounded-lg flex items-center justify-center flex-shrink-0">
                      <Phone className="w-5 h-5 text-brand-600" />
                    </div>
                    <div>
                      <p className="text-sm text-neutral-600 mb-1">Telefone/WhatsApp</p>
                      <a 
                        href="tel:+5588921465929"
                        className="text-neutral-900 hover:text-brand-600 font-medium"
                      >
                        (88) 92146-5929
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 bg-brand-100 rounded-lg flex items-center justify-center flex-shrink-0">
                      <Mail className="w-5 h-5 text-brand-600" />
                    </div>
                    <div>
                      <p className="text-sm text-neutral-600 mb-1">E-mail</p>
                      <a 
                        href="mailto:contato@dommus.com.br"
                        className="text-neutral-900 hover:text-brand-600 font-medium break-all"
                      >
                        contato@dommus.com.br
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 bg-brand-100 rounded-lg flex items-center justify-center flex-shrink-0">
                      <MapPin className="w-5 h-5 text-brand-600" />
                    </div>
                    <div>
                      <p className="text-sm text-neutral-600 mb-1">Localização</p>
                      <p className="text-neutral-900 font-medium">
                        Icó, Ceará<br />
                        Brasil
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-brand-50 border border-brand-200 rounded-card p-6">
                <div className="flex items-center gap-3 mb-4">
                  <MessageCircle className="w-6 h-6 text-brand-600" />
                  <h3 className="font-semibold text-brand-900">WhatsApp</h3>
                </div>
                <p className="text-sm text-brand-800 mb-4">
                  Prefere falar pelo WhatsApp? Clique no botão abaixo para iniciar uma conversa.
                </p>
                <a
                  href="https://wa.me/5588921465929?text=Olá! Gostaria de mais informações sobre o Dommus."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-green-500 hover:bg-green-600 text-white rounded-button font-medium transition-colors"
                >
                  <MessageCircle className="w-5 h-5" />
                  Abrir WhatsApp
                </a>
              </div>
            </div>

            {/* Formulário */}
            <div className="lg:col-span-2">
              <div className="bg-white rounded-card shadow-card p-8">
                <h2 className="text-2xl font-semibold text-neutral-900 mb-6">Envie sua Mensagem</h2>

                {submitted && (
                  <div className="mb-6 p-4 bg-success-50 border border-success-200 text-success-800 rounded-lg flex items-center gap-2">
                    <Send className="w-5 h-5" />
                    Mensagem enviada com sucesso! Entraremos em contato em breve.
                  </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-neutral-700 mb-2">
                        Nome Completo
                      </label>
                      <input
                        type="text"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        required
                        className="w-full px-4 py-3 border border-neutral-300 rounded-input focus:ring-2 focus:ring-brand-500 focus:border-transparent"
                        placeholder="João Silva"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-neutral-700 mb-2">
                        E-mail
                      </label>
                      <input
                        type="email"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        required
                        className="w-full px-4 py-3 border border-neutral-300 rounded-input focus:ring-2 focus:ring-brand-500 focus:border-transparent"
                        placeholder="seu@email.com"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-neutral-700 mb-2">
                        Telefone
                      </label>
                      <input
                        type="tel"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        className="w-full px-4 py-3 border border-neutral-300 rounded-input focus:ring-2 focus:ring-brand-500 focus:border-transparent"
                        placeholder="(88) 99999-9999"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-neutral-700 mb-2">
                        Assunto
                      </label>
                      <select
                        value={formData.subject}
                        onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                        required
                        className="w-full px-4 py-3 border border-neutral-300 rounded-input focus:ring-2 focus:ring-brand-500 focus:border-transparent"
                      >
                        <option value="">Selecione...</option>
                        <option value="duvida">Dúvida</option>
                        <option value="suporte">Suporte</option>
                        <option value="anunciar">Quero Anunciar</option>
                        <option value="parceria">Parceria</option>
                        <option value="outro">Outro</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-neutral-700 mb-2">
                      Mensagem
                    </label>
                    <textarea
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      required
                      rows={6}
                      className="w-full px-4 py-3 border border-neutral-300 rounded-input focus:ring-2 focus:ring-brand-500 focus:border-transparent"
                      placeholder="Digite sua mensagem..."
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full md:w-auto px-8 py-3 bg-brand-600 hover:bg-brand-700 text-white rounded-button font-semibold transition-colors shadow-button flex items-center justify-center gap-2"
                  >
                    <Send className="w-5 h-5" />
                    Enviar Mensagem
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
