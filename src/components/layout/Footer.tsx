import { MapPin, Phone, Mail } from 'lucide-react';
import { Link } from 'react-router-dom';

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-neutral-900 text-white mt-16">
      <div className="container-app py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Sobre */}
          <div>
            <h3 className="text-lg font-display font-bold mb-4">Dommus</h3>
            <p className="text-sm text-neutral-400 leading-relaxed">
              Plataforma que conecta corretores, imobiliárias e hospedagens com clientes em Icó e região.
            </p>
          </div>

          {/* Links Rápidos */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Links Rápidos</h4>
            <ul className="space-y-2">
              <li>
                <Link to="/imoveis" className="text-sm text-neutral-400 hover:text-brand-400 transition-colors">
                  Imóveis
                </Link>
              </li>
              <li>
                <Link to="/hospedagem" className="text-sm text-neutral-400 hover:text-brand-400 transition-colors">
                  Hospedagem
                </Link>
              </li>
              <li>
                <Link to="/sobre" className="text-sm text-neutral-400 hover:text-brand-400 transition-colors">
                  Sobre Nós
                </Link>
              </li>
              <li>
                <Link to="/contato" className="text-sm text-neutral-400 hover:text-brand-400 transition-colors">
                  Contato
                </Link>
              </li>
              <li>
                <Link to="/login" className="text-sm text-neutral-400 hover:text-brand-400 transition-colors">
                  Anunciar
                </Link>
              </li>
            </ul>
          </div>

          {/* Contato */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Contato</h4>
            <ul className="space-y-3">
              <li className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-brand-500 flex-shrink-0" />
                <span className="text-sm text-neutral-400">Icó, Ceará</span>
              </li>
              <li className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-brand-500 flex-shrink-0" />
                <a 
                  href="tel:+5588921465929" 
                  className="text-sm text-neutral-400 hover:text-brand-400 transition-colors"
                >
                  (88) 92146-5929
                </a>
              </li>
              <li className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-brand-500 flex-shrink-0" />
                <a 
                  href="mailto:contato@dommus.com.br" 
                  className="text-sm text-neutral-400 hover:text-brand-400 transition-colors"
                >
                  contato@dommus.com.br
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-neutral-800 mt-8 pt-8 text-center">
          <p className="text-sm text-neutral-500">
            © {currentYear} Dommus. Todos os direitos reservados.
          </p>
        </div>
      </div>
    </footer>
  );
}
