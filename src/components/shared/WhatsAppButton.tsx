import { MessageCircle } from 'lucide-react';
import { getWhatsAppLink } from '../../lib/utils';

interface WhatsAppButtonProps {
  phone: string;
  message: string;
}

export function WhatsAppButton({ phone, message }: WhatsAppButtonProps) {
  return (
    <a
      href={getWhatsAppLink(phone, message)}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-50 flex items-center gap-2 px-6 py-4 bg-green-500 hover:bg-green-600 text-white rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 font-medium"
    >
      <MessageCircle className="w-5 h-5" />
      <span className="hidden sm:inline">Falar no WhatsApp</span>
    </a>
  );
}
