import { useState, useEffect, FormEvent, ChangeEvent } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ArrowLeft, Save, Loader2, X, Image as ImageIcon, Check } from 'lucide-react';
import { propertyApi, propertyImageApi, Property } from '../services/api';

export default function EditProperty() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [property, setProperty] = useState<Property | null>(null);
  const [imageFiles, setImageFiles] = useState<File[]>([]);
  const [newImagePreviews, setNewImagePreviews] = useState<string[]>([]);

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    type: 'house',
    transaction_type: 'sale',
    price: '',
    area: '',
    bedrooms: '',
    bathrooms: '',
    parking_spaces: '',
    street: '',
    number: '',
    neighborhood: '',
    city: 'Icó',
    state: 'CE',
    zip_code: '63430-000',
    features: [] as string[],
    accepts_financing: false,
    status: 'available',
  });

  useEffect(() => {
    const loadProperty = async () => {
      if (!id) return;

      try {
        const data = await propertyApi.get(parseInt(id));
        setProperty(data);
        setFormData({
          title: data.title,
          description: data.description,
          type: data.type,
          transaction_type: data.transaction_type,
          price: String(data.price),
          area: String(data.area),
          bedrooms: String(data.bedrooms),
          bathrooms: String(data.bathrooms),
          parking_spaces: String(data.parking_spaces),
          street: data.street,
          number: data.number || '',
          neighborhood: data.neighborhood,
          city: data.city,
          state: data.state,
          zip_code: data.zip_code,
          features: data.features || [],
          accepts_financing: data.accepts_financing,
          status: data.status,
        });
      } catch (error) {
        console.error('Erro ao carregar imóvel:', error);
        alert('Imóvel não encontrado');
        navigate('/dashboard');
      } finally {
        setIsLoading(false);
      }
    };

    loadProperty();
  }, [id, navigate]);

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

    const maxSize = 2 * 1024 * 1024;
    const maxFiles = 10;
    const currentCount = (property?.images?.length || 0) + newImagePreviews.length;

    if (currentCount + files.length > maxFiles) {
      alert(`Você pode ter no máximo ${maxFiles} fotos`);
      return;
    }

    Array.from(files).forEach(file => {
      if (file.size > maxSize) {
        alert(`A foto "${file.name}" é muito grande. Máximo 2MB.`);
        return;
      }

      setImageFiles(prev => [...prev, file]);

      const reader = new FileReader();
      reader.onloadend = () => {
        setNewImagePreviews(prev => [...prev, reader.result as string]);
      };
      reader.readAsDataURL(file);
    });

    e.target.value = '';
  };

  const handleRemoveNewImage = (index: number) => {
    setNewImagePreviews(prev => prev.filter((_, i) => i !== index));
    setImageFiles(prev => prev.filter((_, i) => i !== index));
  };

  const handleDeleteExistingImage = async (imageId: number) => {
    if (!property || !confirm('Excluir esta imagem?')) return;

    try {
      await propertyImageApi.delete(property.id, imageId);
      setProperty(prev => prev ? {
        ...prev,
        images: prev.images?.filter(img => img.id !== imageId)
      } : null);
    } catch (error: any) {
      alert(error.message || 'Erro ao excluir imagem');
    }
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!id) return;

    setIsSaving(true);

    try {
      // Atualiza os dados do imóvel
      await propertyApi.update(parseInt(id), {
        title: formData.title,
        description: formData.description,
        type: formData.type,
        transaction_type: formData.transaction_type,
        price: parseFloat(formData.price),
        area: parseFloat(formData.area),
        bedrooms: parseInt(formData.bedrooms) || 0,
        bathrooms: parseInt(formData.bathrooms) || 0,
        parking_spaces: parseInt(formData.parking_spaces) || 0,
        street: formData.street,
        number: formData.number,
        neighborhood: formData.neighborhood,
        city: formData.city,
        state: formData.state,
        zip_code: formData.zip_code,
        features: formData.features,
        accepts_financing: formData.accepts_financing,
      });

      // Upload de novas imagens
      if (imageFiles.length > 0) {
        await propertyImageApi.upload(parseInt(id), imageFiles);
      }

      alert('Imóvel atualizado com sucesso!');
      navigate('/dashboard');
    } catch (error: any) {
      console.error('Erro ao atualizar:', error);
      alert(error.message || 'Erro ao atualizar imóvel');
    } finally {
      setIsSaving(false);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-neutral-50 flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-brand-600" />
      </div>
    );
  }

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
          <h1 className="text-3xl font-display font-bold text-neutral-900 mb-8">
            Editar Imóvel
          </h1>

          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Informações Básicas */}
            <div className="bg-white rounded-card shadow-card p-6">
              <h2 className="text-xl font-semibold text-neutral-900 mb-6">Informações Básicas</h2>
              
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-neutral-700 mb-2">Título</label>
                  <input
                    type="text"
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    className="w-full px-4 py-3 border border-neutral-300 rounded-input focus:ring-2 focus:ring-brand-500"
                    required
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-neutral-700 mb-2">Tipo</label>
                    <select
                      value={formData.type}
                      onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                      className="w-full px-4 py-3 border border-neutral-300 rounded-input focus:ring-2 focus:ring-brand-500"
                    >
                      <option value="house">Casa</option>
                      <option value="apartment">Apartamento</option>
                      <option value="land">Terreno</option>
                      <option value="commercial">Comercial</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-neutral-700 mb-2">Transação</label>
                    <select
                      value={formData.transaction_type}
                      onChange={(e) => setFormData({ ...formData, transaction_type: e.target.value })}
                      className="w-full px-4 py-3 border border-neutral-300 rounded-input focus:ring-2 focus:ring-brand-500"
                    >
                      <option value="sale">Venda</option>
                      <option value="rent">Aluguel</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-neutral-700 mb-2">Preço (R$)</label>
                    <input
                      type="number"
                      value={formData.price}
                      onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                      className="w-full px-4 py-3 border border-neutral-300 rounded-input focus:ring-2 focus:ring-brand-500"
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
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-neutral-700 mb-2">Status</label>
                    <select
                      value={formData.status}
                      onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                      className="w-full px-4 py-3 border border-neutral-300 rounded-input focus:ring-2 focus:ring-brand-500"
                    >
                      <option value="available">Disponível</option>
                      <option value="reserved">Reservado</option>
                      <option value="sold">Vendido</option>
                      <option value="rented">Alugado</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-neutral-700 mb-2">Quartos</label>
                    <input
                      type="number"
                      value={formData.bedrooms}
                      onChange={(e) => setFormData({ ...formData, bedrooms: e.target.value })}
                      className="w-full px-4 py-3 border border-neutral-300 rounded-input focus:ring-2 focus:ring-brand-500"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-neutral-700 mb-2">Banheiros</label>
                    <input
                      type="number"
                      value={formData.bathrooms}
                      onChange={(e) => setFormData({ ...formData, bathrooms: e.target.value })}
                      className="w-full px-4 py-3 border border-neutral-300 rounded-input focus:ring-2 focus:ring-brand-500"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-neutral-700 mb-2">Vagas</label>
                    <input
                      type="number"
                      value={formData.parking_spaces}
                      onChange={(e) => setFormData({ ...formData, parking_spaces: e.target.value })}
                      className="w-full px-4 py-3 border border-neutral-300 rounded-input focus:ring-2 focus:ring-brand-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-neutral-700 mb-2">Descrição</label>
                  <textarea
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    rows={4}
                    className="w-full px-4 py-3 border border-neutral-300 rounded-input focus:ring-2 focus:ring-brand-500"
                    required
                  />
                </div>
              </div>
            </div>

            {/* Localização */}
            <div className="bg-white rounded-card shadow-card p-6">
              <h2 className="text-xl font-semibold text-neutral-900 mb-6">Localização</h2>
              
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-neutral-700 mb-2">Rua</label>
                    <input
                      type="text"
                      value={formData.street}
                      onChange={(e) => setFormData({ ...formData, street: e.target.value })}
                      className="w-full px-4 py-3 border border-neutral-300 rounded-input focus:ring-2 focus:ring-brand-500"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-neutral-700 mb-2">Número</label>
                    <input
                      type="text"
                      value={formData.number}
                      onChange={(e) => setFormData({ ...formData, number: e.target.value })}
                      className="w-full px-4 py-3 border border-neutral-300 rounded-input focus:ring-2 focus:ring-brand-500"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-neutral-700 mb-2">Bairro</label>
                    <input
                      type="text"
                      value={formData.neighborhood}
                      onChange={(e) => setFormData({ ...formData, neighborhood: e.target.value })}
                      className="w-full px-4 py-3 border border-neutral-300 rounded-input focus:ring-2 focus:ring-brand-500"
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
            </div>

            {/* Características */}
            <div className="bg-white rounded-card shadow-card p-6">
              <h2 className="text-xl font-semibold text-neutral-900 mb-6">Características</h2>
              
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mb-6">
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

              <div>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formData.accepts_financing}
                    onChange={(e) => setFormData({ ...formData, accepts_financing: e.target.checked })}
                    className="w-4 h-4 text-brand-600 focus:ring-brand-500 rounded"
                  />
                  <span className="text-sm font-medium text-neutral-700">Aceita financiamento / MCMV</span>
                </label>
              </div>
            </div>

            {/* Fotos */}
            <div className="bg-white rounded-card shadow-card p-6">
              <h2 className="text-xl font-semibold text-neutral-900 mb-6">Fotos</h2>
              
              {/* Fotos existentes */}
              {property?.images && property.images.length > 0 && (
                <div className="mb-6">
                  <p className="text-sm font-medium text-neutral-700 mb-3">Fotos atuais</p>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {property.images.map((image) => (
                      <div key={image.id} className="relative group">
                        <img
                          src={`http://localhost:8000${image.url}`}
                          alt="Foto do imóvel"
                          className="w-full h-32 object-cover rounded-lg"
                        />
                        <button
                          type="button"
                          onClick={() => handleDeleteExistingImage(image.id)}
                          className="absolute -top-2 -right-2 w-7 h-7 bg-red-500 hover:bg-red-600 text-white rounded-full flex items-center justify-center shadow-lg"
                        >
                          <X className="w-4 h-4" />
                        </button>
                        {image.is_primary && (
                          <div className="absolute bottom-2 left-2 px-2 py-1 bg-brand-600 text-white text-xs font-medium rounded">
                            Principal
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Novas fotos */}
              {newImagePreviews.length > 0 && (
                <div className="mb-6">
                  <p className="text-sm font-medium text-neutral-700 mb-3">Novas fotos</p>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {newImagePreviews.map((preview, index) => (
                      <div key={index} className="relative">
                        <img
                          src={preview}
                          alt={`Nova foto ${index + 1}`}
                          className="w-full h-32 object-cover rounded-lg border-2 border-brand-300"
                        />
                        <button
                          type="button"
                          onClick={() => handleRemoveNewImage(index)}
                          className="absolute -top-2 -right-2 w-7 h-7 bg-red-500 hover:bg-red-600 text-white rounded-full flex items-center justify-center shadow-lg"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Upload */}
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
                    Clique para adicionar mais fotos
                  </p>
                  <p className="text-xs text-neutral-500">
                    PNG, JPG ou WEBP (máx. 2MB cada)
                  </p>
                </label>
              </div>
            </div>

            {/* Botões */}
            <div className="flex justify-end gap-4">
              <button
                type="button"
                onClick={() => navigate('/dashboard')}
                className="px-6 py-3 border border-neutral-300 text-neutral-700 rounded-button font-medium hover:bg-neutral-50 transition-colors"
              >
                Cancelar
              </button>
              <button
                type="submit"
                disabled={isSaving}
                className="px-6 py-3 bg-brand-600 hover:bg-brand-700 text-white rounded-button font-medium transition-colors flex items-center gap-2 disabled:bg-brand-400"
              >
                {isSaving ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    Salvando...
                  </>
                ) : (
                  <>
                    <Save className="w-5 h-5" />
                    Salvar Alterações
                  </>
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}