# 🏡 Dommus - Plataforma Digital de Imóveis e Hospedagens

<div align="center">

![Dommus](https://img.shields.io/badge/Dommus-Platform-FF6B35?style=for-the-badge)
![React](https://img.shields.io/badge/React-18-61DAFB?style=for-the-badge&logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?style=for-the-badge&logo=typescript)
![Tailwind](https://img.shields.io/badge/Tailwind-3-38B2AC?style=for-the-badge&logo=tailwind-css)

**Conectando corretores, imobiliárias e hospedagens em Icó, Ceará**

[📱 Demo](#) • [📖 Documentação](#funcionalidades) • [🚀 Deploy](#instalação-e-execução)

</div>

---

## 📋 Sobre o Projeto

**Dommus** (do latim *domus* = casa) é uma plataforma B2B digital que conecta profissionais do mercado imobiliário e de hospedagem com consumidores finais em Icó, Ceará. A plataforma oferece planos de assinatura mensais para corretores, agências imobiliárias e estabelecimentos de hospedagem (pousadas, hotéis, fazendas).

### 🎯 Objetivo

Facilitar a divulgação e comercialização de imóveis e hospedagens na região de Icó/CE, oferecendo uma interface moderna, intuitiva e otimizada para dispositivos móveis, com suporte ao programa governamental **Minha Casa Minha Vida**.

---

## ✨ Funcionalidades

### 🏠 Para Usuários

- ✅ **Listagem de Imóveis**: Navegue por casas, apartamentos, terrenos e mais
- ✅ **Listagem de Hospedagens**: Explore pousadas, hotéis e fazendas
- ✅ **Filtros Avançados**: Por tipo, preço, quartos, banheiros, bairros e mais
- ✅ **Suporte MCMV**: Filtro específico para imóveis do programa Minha Casa Minha Vida
- ✅ **Integração WhatsApp**: Contato direto com anunciantes
- ✅ **Interface Responsiva**: Mobile-first para experiência otimizada em qualquer dispositivo

### 👤 Para Anunciantes

- ✅ **Dashboard Completo**: Gerencie todos os seus anúncios em um só lugar
- ✅ **Cadastro Simplificado**: Wizard multi-etapas para cadastro de propriedades
- ✅ **Formulário MCMV Estruturado**: Campos específicos para financiamento governamental
- ✅ **Upload de Imagens**: Galeria de fotos para cada propriedade
- ✅ **Estatísticas**: Acompanhe visualizações e desempenho dos anúncios
- ✅ **Autenticação Segura**: Sistema de login com JWT

---

## 🛠️ Stack Tecnológica

### Frontend

```json
{
  "framework": "React 18",
  "language": "TypeScript",
  "build": "Vite",
  "styling": "Tailwind CSS",
  "routing": "React Router DOM",
  "icons": "Lucide React",
  "package_manager": "pnpm"
}
```

### Backend (Repositório separado)

- **Runtime**: Bun
- **Framework**: Hono
- **Database**: PostgreSQL
- **ORM**: Drizzle ORM
- **Auth**: JWT
- **Storage**: Local filesystem
- **Docs**: Swagger

---

## 🚀 Instalação e Execução

### Pré-requisitos

- Node.js 18+ ou Bun
- pnpm (recomendado) ou npm

### Passo a Passo

1. **Clone o repositório**

```bash
git clone https://github.com/risoaldo/dommus-frontend.git
cd dommus-frontend
```

2. **Instale as dependências**

```bash
# Com pnpm (recomendado)
pnpm install

# Ou com npm
npm install
```

3. **Execute em desenvolvimento**

```bash
# Com pnpm
pnpm dev

# Ou com npm
npm run dev
```

4. **Acesse a aplicação**

Abra [http://localhost:5173/dommus/](http://localhost:5173/dommus/) no navegador

### Build para Produção

```bash
# Com pnpm
pnpm build

# Ou com npm
npm run build
```

Os arquivos otimizados estarão na pasta `dist/`

---

## 📁 Estrutura do Projeto

```
dommus-frontend/
├── src/
│   ├── components/        # Componentes reutilizáveis
│   │   ├── PropertyCard.tsx
│   │   ├── HostingCard.tsx
│   │   └── FilterBar.tsx
│   ├── pages/             # Páginas da aplicação
│   │   ├── Home.tsx
│   │   ├── Imoveis.tsx
│   │   ├── Hospedagens.tsx
│   │   ├── Login.tsx
│   │   ├── Register.tsx
│   │   └── Dashboard.tsx
│   ├── contexts/          # Context API
│   ├── types/             # TypeScript types
│   ├── utils/             # Funções utilitárias
│   ├── App.tsx            # Componente principal
│   ├── main.tsx           # Entry point
│   └── index.css          # Estilos globais
├── public/                # Arquivos estáticos
├── .htaccess              # Config Apache (Hostinger)
├── vite.config.ts         # Configuração Vite
├── tailwind.config.js     # Configuração Tailwind
├── tsconfig.json          # Configuração TypeScript
└── package.json           # Dependências
```

---

## 🎨 Design System

### Cores Principais

```css
/* Brand Colors */
--brand-500: #FF6B35;  /* Laranja principal */
--brand-600: #FF5722;
--brand-700: #E64A19;

/* Neutral Colors */
--neutral-50: #FAFAFA;
--neutral-900: #1A1A1A;

/* Success */
--success-600: #10B981;
```

### Typography

- **Display**: Inter (títulos e headings)
- **Body**: System fonts (texto corrido)

### Border Radius

- Cards: `12px`
- Buttons: `8px`
- Inputs: `8px`

---

## 🌐 Deploy

### Hostinger

A aplicação está configurada para deploy em subdirectory `/dommus/` na Hostinger.

**Arquivos importantes:**

- `.htaccess`: Configuração de rotas e MIME types
- `vite.config.ts`: Base path configurado como `/dommus/`

**Passos para deploy:**

1. Execute o build: `pnpm build`
2. Faça upload dos arquivos da pasta `dist/` para `/public_html/dommus/`
3. Certifique-se que o `.htaccess` está presente
4. Acesse: `https://seudominio.com.br/dommus/`

---

## 📱 Integração WhatsApp

O sistema utiliza a API de links do WhatsApp para contato direto:

```typescript
const whatsappNumber = "5588921465929"; // (88) 92146-5929
const message = encodeURIComponent(`Olá! Tenho interesse no imóvel: ${title}...`);
const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${message}`;
```

---

## 🔐 Autenticação

O sistema utiliza JWT (JSON Web Tokens) para autenticação:

- **Login**: Credenciais → JWT Token → LocalStorage
- **Proteção de Rotas**: Verificação de token antes de acessar dashboard
- **Logout**: Remoção do token do LocalStorage

---

## 🏗️ Roadmap

### ✅ Fase 1 - MVP (Concluído)
- [x] Interface de listagens
- [x] Sistema de filtros
- [x] Autenticação
- [x] Dashboard básico
- [x] Deploy em produção

### 🚧 Fase 2 - Melhorias (Em desenvolvimento)
- [ ] Integração completa com backend
- [ ] Upload real de imagens
- [ ] Sistema de favoritos
- [ ] Notificações por email
- [ ] Painel de analytics

### 🔮 Fase 3 - Futuro
- [ ] App mobile (React Native)
- [ ] Chat integrado
- [ ] Sistema de avaliações
- [ ] Tour virtual 360°
- [ ] Integração com redes sociais

---

## 🤝 Contribuindo

Contribuições são bem-vindas! Para contribuir:

1. Fork o projeto
2. Crie uma branch para sua feature (`git checkout -b feature/NovaFuncionalidade`)
3. Commit suas mudanças (`git commit -m 'Adiciona nova funcionalidade'`)
4. Push para a branch (`git push origin feature/NovaFuncionalidade`)
5. Abra um Pull Request

---

## 📄 Licença

Este projeto está sob a licença MIT. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.

---

## 👨‍💻 Autor

**Risoaldo**
- GitHub: [@risoaldo](https://github.com/risoaldo)
- Email: [contato disponível no perfil]

---

## 📞 Suporte

Para suporte, entre em contato via WhatsApp: **(88) 92146-5929**

---

## 🙏 Agradecimentos

- Comunidade React
- Tailwind CSS
- Lucide Icons
- Icó, Ceará - nossa cidade inspiradora

---

<div align="center">

**Feito com ❤️ em Icó, Ceará**

[⬆ Voltar ao topo](#-dommus---plataforma-digital-de-imóveis-e-hospedagens)

</div>
