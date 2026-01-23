// Configuração da API - Dommus Backend Laravel
const API_BASE_URL =  'http://localhost:8000/api';

// Tipos
export interface User {
  id: number;
  name: string;
  email: string;
  phone?: string;
  created_at?: string;
  updated_at?: string;
}

export interface AuthResponse {
  user: User;
  token: string;
  token_type: string;
}

export interface ApiError {
  message: string;
  errors?: Record<string, string[]>;
}

// Helper para fazer requisições
async function request<T>(
  endpoint: string,
  options: RequestInit = {}
): Promise<T> {
  const token = localStorage.getItem('dommus_token');

  const config: RequestInit = {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      ...(token && { Authorization: `Bearer ${token}` }),
      ...options.headers,
    },
  };

  const response = await fetch(`${API_BASE_URL}${endpoint}`, config);

  // Se não autorizado, limpa o token
  if (response.status === 401) {
    localStorage.removeItem('dommus_token');
    localStorage.removeItem('dommus_user');
    window.location.href = '/login';
    throw new Error('Sessão expirada. Faça login novamente.');
  }

  const data = await response.json();

  if (!response.ok) {
    // Formata erros de validação do Laravel
    if (data.errors) {
      const firstError = Object.values(data.errors)[0];
      throw new Error(Array.isArray(firstError) ? firstError[0] : String(firstError));
    }
    throw new Error(data.message || 'Erro na requisição');
  }

  return data;
}

// ============================================
// AUTH ENDPOINTS
// ============================================

export interface RegisterData {
  name: string;
  email: string;
  password: string;
  password_confirmation: string;
  phone?: string;
}

export interface LoginData {
  email: string;
  password: string;
}


export interface Property {
  id: number;
  user_id: number;
  title: string;
  description: string;
  type: 'house' | 'apartment' | 'land' | 'commercial' | 'farm' | 'inn' | 'hotel';
  transaction_type: 'sale' | 'rent' | 'both';
  price: number;
  rent_price?: number;
  area: number;
  bedrooms: number;
  bathrooms: number;
  parking_spaces: number;
  street: string;
  number?: string;
  neighborhood: string;
  city: string;
  state: string;
  zip_code: string;
  features?: string[];
  status: 'available' | 'reserved' | 'sold' | 'rented';
  is_featured: boolean;
  accepts_financing: boolean;
  views: number;
  created_at: string;
  updated_at: string;
  images?: PropertyImage[];
  user?: User;
}

export interface PropertyImage {
  id: number;
  property_id: number;
  path: string;
  is_featured: boolean;
  order: number;
}

export interface CreatePropertyData {
  title: string;
  description: string;
  type: string;
  transaction_type: string;
  price: number;
  rent_price?: number;
  area: number;
  bedrooms?: number;
  bathrooms?: number;
  parking_spaces?: number;
  street: string;
  number?: string;
  neighborhood: string;
  city?: string;
  state?: string;
  zip_code: string;
  features?: string[];
  accepts_financing?: boolean;
}

export interface PropertyListResponse {
  data: Property[];
  current_page: number;
  last_page: number;
  per_page: number;
  total: number;
}

export interface PropertyFilters {
  type?: string;
  transaction_type?: string;
  min_price?: string;
  max_price?: string;
  bedrooms?: string;
  neighborhood?: string;
}


export const authApi = {
  // Registrar novo usuário
  register: async (data: RegisterData): Promise<AuthResponse> => {
    const response = await request<AuthResponse>('/register', {
      method: 'POST',
      body: JSON.stringify(data),
    });

    // Salva token e usuário no localStorage
    localStorage.setItem('dommus_token', response.token);
    localStorage.setItem('dommus_user', JSON.stringify(response.user));

    return response;
  },

  // Login
  login: async (data: LoginData): Promise<AuthResponse> => {
    const response = await request<AuthResponse>('/login', {
      method: 'POST',
      body: JSON.stringify(data),
    });

    // Salva token e usuário no localStorage
    localStorage.setItem('dommus_token', response.token);
    localStorage.setItem('dommus_user', JSON.stringify(response.user));

    return response;
  },

  // Logout
  logout: async (): Promise<void> => {
    try {
      await request('/logout', { method: 'POST' });
    } finally {
      // Limpa localStorage mesmo se a API falhar
      localStorage.removeItem('dommus_token');
      localStorage.removeItem('dommus_user');
    }
  },

  // Buscar usuário autenticado
  me: async (): Promise<User> => {
    return request<User>('/user');
  },

  // Verificar se está autenticado
  isAuthenticated: (): boolean => {
    return !!localStorage.getItem('dommus_token');
  },

  // Pegar usuário do localStorage
  getUser: (): User | null => {
    const user = localStorage.getItem('dommus_user');
    return user ? JSON.parse(user) : null;
  },

  // Pegar token
  getToken: (): string | null => {
    return localStorage.getItem('dommus_token');
  },
};


export const propertyApi = {
  // Listar imóveis (público)
list: async (filters?: PropertyFilters): Promise<PropertyListResponse> => {
  let params = '';
  if (filters) {
    const cleanFilters: Record<string, string> = {};
    Object.entries(filters).forEach(([key, value]) => {
      if (value !== undefined) {
        cleanFilters[key] = value;
      }
    });
    params = '?' + new URLSearchParams(cleanFilters).toString();
  }
  return request<PropertyListResponse>(`/properties${params}`);
},

  // Buscar imóvel por ID (público)
  get: async (id: number): Promise<Property> => {
    return request<Property>(`/properties/${id}`);
  },

  // Criar imóvel (autenticado)
  create: async (data: CreatePropertyData): Promise<Property> => {
    return request<Property>('/properties', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  },

  // Atualizar imóvel (autenticado)
  update: async (id: number, data: Partial<CreatePropertyData>): Promise<Property> => {
    return request<Property>(`/properties/${id}`, {
      method: 'PUT',
      body: JSON.stringify(data),
    });
  },

  // Deletar imóvel (autenticado)
  delete: async (id: number): Promise<{ message: string }> => {
    return request<{ message: string }>(`/properties/${id}`, {
      method: 'DELETE',
    });
  },

  // Meus imóveis (autenticado)
  myProperties: async (): Promise<Property[]> => {
    return request<Property[]>('/my-properties');
  },
};

export default { auth: authApi, property: propertyApi };
