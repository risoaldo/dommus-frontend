import { useState, useEffect, FormEvent, ChangeEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, ArrowRight, Check, Home, MapPin, FileText, Image as ImageIcon, X } from 'lucide-react';
import { propertyApi } from '../services/api';

type FormStep = 1 | 2 | 3 | 4;

interface PropertyForm {
  title: string;
  type: string;
  transactionType: string;
  price: string;
  address: string;
  neighborhood: string;
  city: string;
  state: string;
  bedrooms: string;
  bathrooms: string;
  area: string;
  description: string;
  features: string[];
  acceptsMCMV: boolean;
  mcmvTrack: string;
  mcmvMaxValue: string;
  mcmvDownPayment: string;
}

export default function NewProperty() {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState<FormStep>(1);
  const [imagePreview, setImagePreview] = useState<string[]>([]);  
  const [isLoading, setIsLoading] = useState(false);


  const [formData, setFormData] = useState<PropertyForm>({
    title: '',
    type: 'casa',
    transactionType: 'venda',
    price: '',
    address: '',
    neighborhood: '',
    city: 'Icó',
    state: 'CE',
    bedrooms: '',
    bathrooms: '',
    area: '',
    description: '',
    features: [],
    acceptsMCMV: false,
    mcmvTrack: '1',
    mcmvMaxValue: '',
    mcmvDownPayment: ''
  });

  useEffect(() => {
    // Verificar se está logado
const userData = localStorage.getItem('dommus_user');
    if (!userData) {
      navigate('/login');
    }
  }, [navigate]);

  const handleNext = () => {
    if (currentStep < 4) {
      setCurrentStep((currentStep + 1) as FormStep);
    }
  };

  const handlePrev = () => {
    if (currentStep > 1) {
      setCurrentStep((currentStep - 1) as FormStep);
    }
  };

  const handleFeatureToggle = (feature: string) => {
    setFormData(prev => ({
      ...prev,
      features: prev.features.includes(feature)
        ? prev.features.filter(f => f !== feature)
        : [...prev.features, feature]
    }));
  };

  
  const handleImageUpload = (e: ChangeEvent<HTMLInputElement>) => {
  const files = e.target.files;
  if (!files) return;

  const maxSize = 2 * 1024 * 1024; // 2MB
  const maxFiles = 10;

  if (imagePreview.length + files.length > maxFiles) {
    alert(`Você pode fazer upload de no máximo ${maxFiles} fotos`);
    return;
  }

  Array.from(files).forEach(file => {
    if (file.size > maxSize) {
      alert(`A foto "${file.name}" é muito grande. Máximo 2MB por foto.`);
      return;
    }

    if (!file.type.startsWith('image/')) {
      alert(`O arquivo "${file.name}" não é uma imagem válida.`);
      return;
    }

    const reader = new FileReader();
    reader.onloadend = () => {
      setImagePreview(prev => [...prev, reader.result as string]);
    };
    reader.readAsDataURL(file);
  });

  e.target.value = '';
};

const handleRemoveImage = (index: number) => {
  setImagePreview(prev => prev.filter((_, i) => i !== index));
};


const handleSubmit = async (e: FormEvent) => {
  e.preventDefault();

  if (imagePreview.length < 3) {
    alert('Adicione pelo menos 3 fotos do imóvel');
    setCurrentStep(3);
    return;
  }

  setIsLoading(true);

  try {
    const typeMap: Record<string, string> = {
      'casa': 'house',
      'apartamento': 'apartment',
      'terreno': 'land',
      'comercial': 'commercial',
    };

    const transactionMap: Record<string, string> = {
      'venda': 'sale',
      'aluguel': 'rent',
    };

    const propertyData = {
      title: formData.title,
      description: formData.description,
      type: typeMap[formData.type] || 'house',
      transaction_type: transactionMap[formData.transactionType] || 'sale',
      price: parseFloat(formData.price),
      area: parseFloat(formData.area),
      bedrooms: parseInt(formData.bedrooms) || 0,
      bathrooms: parseInt(formData.bathrooms) || 0,
      parking_spaces: 0,
      street: formData.address,
      neighborhood: formData.neighborhood,
      city: formData.city,
      state: formData.state,
      zip_code: '63430-000',
      features: formData.features,
      accepts_financing: formData.acceptsMCMV,
    };

    await propertyApi.create(propertyData);
    
    alert('Imóvel cadastrado com sucesso!');
    navigate('/dashboard');
  } catch (error: any) {
    console.error('Erro ao cadastrar:', error);
    alert(error.message || 'Erro ao cadastrar imóvel');
  } finally {
    setIsLoading(false);
  }
};


  const steps = [
    { number: 1, title: 'Tipo e Localização', icon: Home },
    { number: 2, title: 'Detalhes', icon: MapPin },
    { number: 3, title: 'Descrição', icon: FileText },
    { number: 4, title: 'Finalizar', icon: Check }
  ];

  return (
    <div className="min-h-screen bg-neutral-50">
      {/* Header */}
      <header className="bg-white border-b border-neutral-200 shadow-sm">
        <div className="container-app">
          <div className="flex items-center justify-between h-16">
            <button
              onClick={() => navigate('/dashboard')}
              className="flex items-center gap-2 text-neutral-700 hover:text-brand-600"
            >
              <ArrowLeft className="w-4 h-4" />
              Voltar ao Dashboard
            </button>
          </div>
        </div>
      </header>

      <div className="container-app py-8">
        <div className="max-w-4xl mx-auto">
          {/* Progress Steps */}
          <div className="mb-8">
            <div className="flex items-center justify-between">
              {steps.map((step, index) => {
                const Icon = step.icon;
                const isActive = currentStep === step.number;
                const isCompleted = currentStep > step.number;
                
                return (
                  <div key={step.number} className="flex items-center flex-1">
                    <div className="flex flex-col items-center flex-1">
                      <div
                        className={`w-12 h-12 rounded-full flex items-center justify-center ${
                          isCompleted
                            ? 'bg-success-600 text-white'
                            : isActive
                            ? 'bg-brand-600 text-white'
                            : 'bg-neutral-200 text-neutral-500'
                        }`}
                      >
                        {isCompleted ? <Check className="w-6 h-6" /> : <Icon className="w-6 h-6" />}
                      </div>
                      <p className={`text-xs mt-2 text-center ${isActive ? 'font-semibold text-brand-600' : 'text-neutral-600'}`}>
                        {step.title}
                      </p>
                    </div>
                    {index < steps.length - 1 && (
                      <div className={`h-1 flex-1 ${currentStep > step.number ? 'bg-success-600' : 'bg-neutral-200'}`} />
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="bg-white rounded-card shadow-card p-8">
            {/* Step 1: Tipo e Localização */}
            {currentStep === 1 && (
              <div className="space-y-6">
                <h2 className="text-2xl font-semibold text-neutral-900 mb-6">Tipo e Localização</h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-neutral-700 mb-2">Tipo de Imóvel</label>
                    <select
                      value={formData.type}
                      onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                      className="w-full px-4 py-3 border border-neutral-300 rounded-input focus:ring-2 focus:ring-brand-500"
                      required
                    >
                      <option value="casa">Casa</option>
                      <option value="apartamento">Apartamento</option>
                      <option value="terreno">Terreno</option>
                      <option value="comercial">Comercial</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-neutral-700 mb-2">Tipo de Transação</label>
                    <select
                      value={formData.transactionType}
                      onChange={(e) => setFormData({ ...formData, transactionType: e.target.value })}
                      className="w-full px-4 py-3 border border-neutral-300 rounded-input focus:ring-2 focus:ring-brand-500"
                      required
                    >
                      <option value="venda">Venda</option>
                      <option value="aluguel">Aluguel</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-neutral-700 mb-2">Endereço Completo</label>
                  <input
                    type="text"
                    value={formData.address}
                    onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                    className="w-full px-4 py-3 border border-neutral-300 rounded-input focus:ring-2 focus:ring-brand-500"
                    placeholder="Rua, número, complemento"
                    required
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-neutral-700 mb-2">Bairro</label>
                    <input
                      type="text"
                      value={formData.neighborhood}
                      onChange={(e) => setFormData({ ...formData, neighborhood: e.target.value })}
                      className="w-full px-4 py-3 border border-neutral-300 rounded-input focus:ring-2 focus:ring-brand-500"
                      placeholder="Centro"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-neutral-700 mb-2">Cidade</label>
                    <input
                      type="text"
                      value={formData.city}
                      onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                      className="w-full px-4 py-3 border border-neutral-300 rounded-input focus:ring-2 focus:ring-brand-500"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-neutral-700 mb-2">Estado</label>
                    <input
                      type="text"
                      value={formData.state}
                      onChange={(e) => setFormData({ ...formData, state: e.target.value })}
                      className="w-full px-4 py-3 border border-neutral-300 rounded-input focus:ring-2 focus:ring-brand-500"
                      maxLength={2}
                      required
                    />
                  </div>
                </div>
              </div>
            )}

            {/* Step 2: Detalhes */}
            {currentStep === 2 && (
              <div className="space-y-6">
                <h2 className="text-2xl font-semibold text-neutral-900 mb-6">Detalhes do Imóvel</h2>

                <div>
                  <label className="block text-sm font-medium text-neutral-700 mb-2">Título do Anúncio</label>
                  <input
                    type="text"
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    className="w-full px-4 py-3 border border-neutral-300 rounded-input focus:ring-2 focus:ring-brand-500"
                    placeholder="Ex: Casa Moderna no Centro"
                    required
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-neutral-700 mb-2">Preço (R$)</label>
                    <input
                      type="number"
                      value={formData.price}
                      onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                      className="w-full px-4 py-3 border border-neutral-300 rounded-input focus:ring-2 focus:ring-brand-500"
                      placeholder="150000"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-neutral-700 mb-2">Área (m²)</label>
                    <input
                      type="number"
                      value={formData.area}
                      onChange={(e) => setFormData({ ...formData, area: e.target.value })}
                      className="w-full px-4 py-3 border border-neutral-300 rounded-input focus:ring-2 focus:ring-brand-500"
                      placeholder="120"
                      required
                    />
                  </div>
                </div>

                {formData.type !== 'terreno' && (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-neutral-700 mb-2">Quartos</label>
                      <input
                        type="number"
                        value={formData.bedrooms}
                        onChange={(e) => setFormData({ ...formData, bedrooms: e.target.value })}
                        className="w-full px-4 py-3 border border-neutral-300 rounded-input focus:ring-2 focus:ring-brand-500"
                        placeholder="3"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-neutral-700 mb-2">Banheiros</label>
                      <input
                        type="number"
                        value={formData.bathrooms}
                        onChange={(e) => setFormData({ ...formData, bathrooms: e.target.value })}
                        className="w-full px-4 py-3 border border-neutral-300 rounded-input focus:ring-2 focus:ring-brand-500"
                        placeholder="2"
                      />
                    </div>
                  </div>
                )}

                <div>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={formData.acceptsMCMV}
                      onChange={(e) => setFormData({ ...formData, acceptsMCMV: e.target.checked })}
                      className="w-4 h-4 text-brand-600 focus:ring-brand-500 rounded"
                    />
                    <span className="text-sm font-medium text-neutral-700">
                      Aceita Minha Casa Minha Vida
                    </span>
                  </label>
                </div>

                {formData.acceptsMCMV && (
                  <div className="p-4 bg-success-50 border border-success-200 rounded-lg space-y-4">
                    <h3 className="font-semibold text-success-900">Informações MCMV</h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-success-900 mb-2">Faixa</label>
                        <select
                          value={formData.mcmvTrack}
                          onChange={(e) => setFormData({ ...formData, mcmvTrack: e.target.value })}
                          className="w-full px-4 py-2 border border-success-300 rounded-input focus:ring-2 focus:ring-success-500"
                        >
                          <option value="1">Faixa 1</option>
                          <option value="2">Faixa 2</option>
                          <option value="3">Faixa 3</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-success-900 mb-2">Valor Máximo</label>
                        <input
                          type="number"
                          value={formData.mcmvMaxValue}
                          onChange={(e) => setFormData({ ...formData, mcmvMaxValue: e.target.value })}
                          className="w-full px-4 py-2 border border-success-300 rounded-input focus:ring-2 focus:ring-success-500"
                          placeholder="264000"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-success-900 mb-2">Entrada</label>
                        <input
                          type="number"
                          value={formData.mcmvDownPayment}
                          onChange={(e) => setFormData({ ...formData, mcmvDownPayment: e.target.value })}
                          className="w-full px-4 py-2 border border-success-300 rounded-input focus:ring-2 focus:ring-success-500"
                          placeholder="16000"
                        />
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Step 3: Descrição */}
            {/* Step 3: Descrição e Fotos */}
{currentStep === 3 && (
  <div className="space-y-6">
    <h2 className="text-2xl font-semibold text-neutral-900 mb-6">Descrição e Fotos</h2>

    <div>
      <label className="block text-sm font-medium text-neutral-700 mb-2">Descrição do Imóvel</label>
      <textarea
        value={formData.description}
        onChange={(e) => setFormData({ ...formData, description: e.target.value })}
        className="w-full px-4 py-3 border border-neutral-300 rounded-input focus:ring-2 focus:ring-brand-500"
        rows={6}
        placeholder="Descreva as principais características do imóvel..."
        required
      />
    </div>

    <div>
      <label className="block text-sm font-medium text-neutral-700 mb-3">Características</label>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
        {['Garagem', 'Quintal', 'Piscina', 'Churrasqueira', 'Área de serviço', 'Varanda', 
          'Armários embutidos', 'Portão eletrônico', 'Interfone', 'Cerca elétrica'].map((feature) => (
          <label key={feature} className="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              checked={formData.features.includes(feature)}
              onChange={() => handleFeatureToggle(feature)}
              className="w-4 h-4 text-brand-600 focus:ring-brand-500 rounded"
            />
            <span className="text-sm text-neutral-700">{feature}</span>
          </label>
        ))}
      </div>
    </div>

    {/* Upload de Fotos */}
    <div>
      <label className="block text-sm font-medium text-neutral-700 mb-3">
        Fotos do Imóvel <span className="text-red-500">*</span>
        <span className="text-neutral-500 font-normal ml-2">(mínimo 3 fotos, máximo 10)</span>
      </label>
      
      {/* Preview das Imagens */}
      {imagePreview.length > 0 && (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
          {imagePreview.map((img, index) => (
            <div key={index} className="relative group">
              <img
                src={img}
                alt={`Preview ${index + 1}`}
                className="w-full h-32 object-cover rounded-lg border-2 border-neutral-200"
              />
              <button
                type="button"
                onClick={() => handleRemoveImage(index)}
                className="absolute -top-2 -right-2 w-7 h-7 bg-red-500 hover:bg-red-600 text-white rounded-full flex items-center justify-center shadow-lg transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
              {index === 0 && (
                <div className="absolute bottom-2 left-2 px-2 py-1 bg-brand-600 text-white text-xs font-medium rounded shadow">
                  Foto Principal
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      {/* Input de Upload */}
      {imagePreview.length < 10 && (
        <div className="border-2 border-dashed border-neutral-300 rounded-lg p-8 text-center hover:border-brand-400 transition-colors cursor-pointer bg-neutral-50 hover:bg-brand-50">
          <input
            type="file"
            id="imageUpload"
            multiple
            accept="image/*"
            onChange={handleImageUpload}
            className="hidden"
          />
          <label htmlFor="imageUpload" className="cursor-pointer">
            <ImageIcon className="w-12 h-12 text-neutral-400 mx-auto mb-3" />
            <p className="text-sm font-medium text-neutral-700 mb-1">
              Clique para fazer upload das fotos
            </p>
            <p className="text-xs text-neutral-500">
              PNG, JPG ou WEBP (máx. 2MB cada)
            </p>
          </label>
        </div>
      )}

      {/* Contador de fotos */}
      <div className="flex items-center justify-between mt-3">
        <p className={`text-sm ${imagePreview.length >= 3 ? 'text-success-600' : 'text-neutral-600'}`}>
          {imagePreview.length} {imagePreview.length === 1 ? 'foto adicionada' : 'fotos adicionadas'}
          {imagePreview.length < 3 && ` (faltam ${3 - imagePreview.length})`}
        </p>
        {imagePreview.length >= 3 && (
          <span className="text-xs text-success-600 font-medium flex items-center gap-1">
            <Check className="w-4 h-4" /> Mínimo atingido
          </span>
        )}
      </div>
    </div>
  </div>
)}

            {/* Step 4: Finalizar */}
            {/* {currentStep === 4 && (
              <div className="space-y-6">
                <h2 className="text-2xl font-semibold text-neutral-900 mb-6">Revisão do Anúncio</h2>

                <div className="space-y-4 bg-neutral-50 p-6 rounded-lg">
                  <div>
                    <p className="text-sm text-neutral-600">Título</p>
                    <p className="font-semibold text-neutral-900">{formData.title || '-'}</p>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm text-neutral-600">Tipo</p>
                      <p className="font-semibold text-neutral-900 capitalize">{formData.type}</p>
                    </div>
                    <div>
                      <p className="text-sm text-neutral-600">Transação</p>
                      <p className="font-semibold text-neutral-900 capitalize">{formData.transactionType}</p>
                    </div>
                  </div>
                  <div>
                    <p className="text-sm text-neutral-600">Endereço</p>
                    <p className="font-semibold text-neutral-900">
                      {formData.address}, {formData.neighborhood} - {formData.city}/{formData.state}
                    </p>
                  </div>
                  <div className="grid grid-cols-3 gap-4">
                    <div>
                      <p className="text-sm text-neutral-600">Preço</p>
                      <p className="font-semibold text-brand-600">R$ {Number(formData.price).toLocaleString('pt-BR')}</p>
                    </div>
                    <div>
                      <p className="text-sm text-neutral-600">Área</p>
                      <p className="font-semibold text-neutral-900">{formData.area} m²</p>
                    </div>
                    {formData.bedrooms && (
                      <div>
                        <p className="text-sm text-neutral-600">Quartos</p>
                        <p className="font-semibold text-neutral-900">{formData.bedrooms}</p>
                      </div>
                    )}
                  </div>
                  {formData.acceptsMCMV && (
                    <div className="pt-4 border-t border-neutral-200">
                      <p className="text-sm font-semibold text-success-600 mb-2">✓ Aceita Minha Casa Minha Vida</p>
                    </div>
                  )}
                </div>

                <div className="bg-brand-50 border border-brand-200 p-4 rounded-lg">
                  <p className="text-sm text-brand-800">
                    <strong>Importante:</strong> Após publicar, seu anúncio ficará disponível para visualização no site.
                    Você poderá editá-lo ou removê-lo a qualquer momento pelo Dashboard.
                  </p>
                </div>
              </div>
            )} */}

{currentStep === 4 && (
  <div className="space-y-6">
    <h2 className="text-2xl font-semibold text-neutral-900 mb-6">Revisão do Anúncio</h2>

    {/* Preview das Fotos */}
    {imagePreview.length > 0 && (
      <div className="bg-neutral-50 p-6 rounded-lg">
        <p className="text-sm font-medium text-neutral-700 mb-3">Fotos ({imagePreview.length})</p>
        <div className="grid grid-cols-3 md:grid-cols-5 gap-3">
          {imagePreview.map((img, index) => (
            <div key={index} className="relative">
              <img
                src={img}
                alt={`Foto ${index + 1}`}
                className="w-full h-20 object-cover rounded-lg"
              />
              {index === 0 && (
                <div className="absolute bottom-1 left-1 px-1.5 py-0.5 bg-brand-600 text-white text-xs rounded">
                  Principal
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    )}

    <div className="space-y-4 bg-neutral-50 p-6 rounded-lg">
      <div>
        <p className="text-sm text-neutral-600">Título</p>
        <p className="font-semibold text-neutral-900">{formData.title || '-'}</p>
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <p className="text-sm text-neutral-600">Tipo</p>
          <p className="font-semibold text-neutral-900 capitalize">{formData.type}</p>
        </div>
        <div>
          <p className="text-sm text-neutral-600">Transação</p>
          <p className="font-semibold text-neutral-900 capitalize">{formData.transactionType}</p>
        </div>
      </div>
      <div>
        <p className="text-sm text-neutral-600">Endereço</p>
        <p className="font-semibold text-neutral-900">
          {formData.address}, {formData.neighborhood} - {formData.city}/{formData.state}
        </p>
      </div>
      <div className="grid grid-cols-3 gap-4">
        <div>
          <p className="text-sm text-neutral-600">Preço</p>
          <p className="font-semibold text-brand-600">R$ {Number(formData.price).toLocaleString('pt-BR')}</p>
        </div>
        <div>
          <p className="text-sm text-neutral-600">Área</p>
          <p className="font-semibold text-neutral-900">{formData.area} m²</p>
        </div>
        {formData.bedrooms && (
          <div>
            <p className="text-sm text-neutral-600">Quartos</p>
            <p className="font-semibold text-neutral-900">{formData.bedrooms}</p>
          </div>
        )}
      </div>
      {formData.acceptsMCMV && (
        <div className="pt-4 border-t border-neutral-200">
          <p className="text-sm font-semibold text-success-600 mb-2">✓ Aceita Minha Casa Minha Vida</p>
        </div>
      )}
    </div>

    <div className="bg-brand-50 border border-brand-200 p-4 rounded-lg">
      <p className="text-sm text-brand-800">
        <strong>Importante:</strong> Após publicar, seu anúncio ficará disponível para visualização no site.
        Você poderá editá-lo ou removê-lo a qualquer momento pelo Dashboard.
      </p>
    </div>
  </div>
)}

            {/* Navigation Buttons */}
            <div className="flex justify-between items-center mt-8 pt-6 border-t border-neutral-200">
              <button
                type="button"
                onClick={handlePrev}
                disabled={currentStep === 1}
                className={`flex items-center gap-2 px-6 py-3 rounded-button font-medium transition-colors ${
                  currentStep === 1
                    ? 'bg-neutral-200 text-neutral-400 cursor-not-allowed'
                    : 'bg-neutral-600 hover:bg-neutral-700 text-white'
                }`}
              >
                <ArrowLeft className="w-4 h-4" />
                Voltar
              </button>

              {currentStep < 4 ? (
                <button
                  type="button"
                  onClick={handleNext}
                  className="flex items-center gap-2 px-6 py-3 bg-brand-600 hover:bg-brand-700 text-white rounded-button font-medium transition-colors"
                >
                  Próximo
                  <ArrowRight className="w-4 h-4" />
                </button>
              ) : (
                <button
                  type="submit"
                  className="flex items-center gap-2 px-6 py-3 bg-success-600 hover:bg-success-700 text-white rounded-button font-medium transition-colors"
                >
                  <Check className="w-4 h-4" />
                  Publicar Anúncio
                </button>
              )}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
