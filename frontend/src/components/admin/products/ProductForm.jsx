import { useState, useEffect } from 'react';
import ImageUploader from './ImageUploader';
import { PRODUCT_CONFIG } from '../../../constants/product.constants';

/**
 * Product form modal component
 */
export default function ProductForm({ 
  isOpen, 
  onClose, 
  onSubmit, 
  initialData, 
  categories, 
  isEditing = false 
}) {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    stock: '',
    category_id: '',
    images: [],
    imagePreviews: [],
    existingImages: [],
    deletedImageIds: [] // IDs de imágenes existentes que se eliminaron
  });

  const [errors, setErrors] = useState({});

  // Actualizar formData cuando cambia initialData
  useEffect(() => {
    if (initialData) {
      setFormData({
        name: initialData.name || '',
        description: initialData.description || '',
        price: initialData.price || '',
        stock: initialData.stock || '',
        category_id: initialData.category_id || '',
        images: initialData.images || [],
        imagePreviews: initialData.imagePreviews || [],
        existingImages: initialData.existingImages || [],
        deletedImageIds: []
      });
    } else {
      // Resetear el formulario cuando no hay initialData
      setFormData({
        name: '',
        description: '',
        price: '',
        stock: '',
        category_id: '',
        images: [],
        imagePreviews: [],
        existingImages: [],
        deletedImageIds: []
      });
    }
  }, [initialData, isOpen]);

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    // Clear error for this field
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: null }));
    }
  };

  const handleImageChange = ({ images, imagePreviews, deletedExistingIndex }) => {
    if (deletedExistingIndex !== undefined) {
      // Se eliminó una imagen existente
      const deletedImage = formData.existingImages[deletedExistingIndex];
      if (deletedImage && deletedImage.id) {
        setFormData(prev => ({
          ...prev,
          existingImages: prev.existingImages.filter((_, i) => i !== deletedExistingIndex),
          imagePreviews: prev.imagePreviews.filter((_, i) => i !== deletedExistingIndex),
          deletedImageIds: [...prev.deletedImageIds, deletedImage.id]
        }));
      }
    } else {
      // Se agregaron nuevas imágenes
      setFormData(prev => ({ 
        ...prev, 
        images, 
        imagePreviews: [
          ...prev.imagePreviews.slice(0, prev.existingImages.length), // Mantener previews de existentes
          ...imagePreviews.slice(prev.existingImages.length) // Agregar nuevos previews
        ]
      }));
    }
    
    if (errors.images) {
      setErrors(prev => ({ ...prev, images: null }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.name?.trim()) {
      newErrors.name = 'El nombre es requerido';
    }

    if (!formData.description?.trim()) {
      newErrors.description = 'La descripción es requerida';
    }

    if (!formData.category_id) {
      newErrors.category_id = 'La categoría es requerida';
    }

    if (!formData.price || parseFloat(formData.price) <= 0) {
      newErrors.price = 'El precio debe ser mayor a 0';
    }

    if (!formData.stock || parseInt(formData.stock) < 0) {
      newErrors.stock = 'El stock no puede ser negativo';
    }

    // Validar imágenes: si es nuevo producto, requiere imágenes
    // Si es edición y no hay nuevas imágenes, pero hay existentes, está ok
    const totalImages = (formData.images?.length || 0) + (formData.existingImages?.length || 0);
    if (totalImages < PRODUCT_CONFIG.MIN_IMAGES) {
      newErrors.images = `Debes tener al menos ${PRODUCT_CONFIG.MIN_IMAGES} imágenes`;
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (validateForm()) {
      console.log('Submitting form data:', {
        ...formData,
        existingImagesCount: formData.existingImages.length,
        newImagesCount: formData.images.length,
        deletedImageIds: formData.deletedImageIds
      }); // Debug
      onSubmit(formData);
    }
  };

  if (!isOpen) return null;

  return (
    <div 
      className="fixed inset-0 bg-gradient-to-br from-gray-900/80 via-gray-800/90 to-gray-900/80 backdrop-blur-sm flex items-center justify-center z-50 p-4 animate-fadeIn"
      onClick={onClose}
    >
      <div 
        className="bg-white rounded-xl sm:rounded-2xl p-4 sm:p-6 md:p-8 max-w-md md:max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl animate-scaleIn transform transition-all scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100 hover:shadow-3xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header con botón de cierre */}
        <div className="flex items-center justify-between mb-4 sm:mb-6">
          <h2 className="text-xl sm:text-2xl font-bold text-gray-900">
            {isEditing ? 'Editar Producto' : 'Nuevo Producto'}
          </h2>
          <button
            type="button"
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors rounded-full p-2 hover:bg-gray-100"
            aria-label="Cerrar modal"
          >
            <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        <form onSubmit={handleSubmit}>
          {/* Grid Layout para mejor uso del espacio */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            {/* Nombre */}
            <div className="md:col-span-2">
              <label className="block text-gray-700 text-sm font-medium mb-2">Nombre</label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => handleInputChange('name', e.target.value)}
                className={`w-full px-3 sm:px-4 py-2 sm:py-3 border-2 rounded-lg sm:rounded-xl focus:border-cyan-400 focus:ring-2 focus:ring-cyan-200 transition-all outline-none text-sm sm:text-base ${
                  errors.name ? 'border-red-300' : 'border-gray-200'
                }`}
                placeholder="Ej: Laptop HP Pavilion"
                required
              />
              {errors.name && (
                <p className="text-red-500 text-xs sm:text-sm mt-1">{errors.name}</p>
              )}
            </div>

            {/* Categoría */}
            <div className="md:col-span-2">
              <label className="block text-gray-700 text-sm font-medium mb-2">Categoría</label>
              <select
                value={formData.category_id}
                onChange={(e) => handleInputChange('category_id', e.target.value)}
                className={`w-full px-3 sm:px-4 py-2 sm:py-3 border-2 rounded-lg sm:rounded-xl focus:border-cyan-400 focus:ring-2 focus:ring-cyan-200 transition-all outline-none text-sm sm:text-base ${
                  errors.category_id ? 'border-red-300' : 'border-gray-200'
                }`}
                required
              >
                <option value="">Seleccionar categoría</option>
                {categories.map((cat) => (
                  <option key={cat.id} value={cat.id}>{cat.name}</option>
                ))}
              </select>
              {errors.category_id && (
                <p className="text-red-500 text-xs sm:text-sm mt-1">{errors.category_id}</p>
              )}
            </div>

            {/* Precio y Stock en grid en desktop */}
            {/* Precio */}
            <div>
              <label className="block text-gray-700 text-sm font-medium mb-2">Precio</label>
              <input
                type="number"
                step="0.01"
                value={formData.price}
                onChange={(e) => handleInputChange('price', e.target.value)}
                className={`w-full px-3 sm:px-4 py-2 sm:py-3 border-2 rounded-lg sm:rounded-xl focus:border-cyan-400 focus:ring-2 focus:ring-cyan-200 transition-all outline-none text-sm sm:text-base ${
                  errors.price ? 'border-red-300' : 'border-gray-200'
                }`}
                placeholder="0.00"
                required
              />
              {errors.price && (
                <p className="text-red-500 text-xs sm:text-sm mt-1">{errors.price}</p>
              )}
            </div>

            {/* Stock */}
            <div>
              <label className="block text-gray-700 text-sm font-medium mb-2">Cantidad</label>
              <input
                type="number"
                step="1"
                value={formData.stock}
                onChange={(e) => handleInputChange('stock', e.target.value)}
                className={`w-full px-3 sm:px-4 py-2 sm:py-3 border-2 rounded-lg sm:rounded-xl focus:border-cyan-400 focus:ring-2 focus:ring-cyan-200 transition-all outline-none text-sm sm:text-base ${
                  errors.stock ? 'border-red-300' : 'border-gray-200'
                }`}
                placeholder="0"
                required
              />
              {errors.stock && (
                <p className="text-red-500 text-xs sm:text-sm mt-1">{errors.stock}</p>
              )}
            </div>

            {/* Descripción */}
            <div className="md:col-span-2">
              <label className="block text-gray-700 text-sm font-medium mb-2">Descripción</label>
              <textarea
                value={formData.description}
                onChange={(e) => handleInputChange('description', e.target.value)}
                className={`w-full px-3 sm:px-4 py-2 sm:py-3 border-2 rounded-lg sm:rounded-xl focus:border-cyan-400 focus:ring-2 focus:ring-cyan-200 transition-all outline-none text-sm sm:text-base resize-none ${
                  errors.description ? 'border-red-300' : 'border-gray-200'
                }`}
                rows="3"
                placeholder="Describe el producto..."
                required
              />
              {errors.description && (
                <p className="text-red-500 text-xs sm:text-sm mt-1">{errors.description}</p>
              )}
            </div>
          </div>

          {/* Image Uploader */}
          <ImageUploader
            images={formData.images}
            imagePreviews={formData.imagePreviews}
            onChange={handleImageChange}
            existingImagesCount={formData.existingImages.length}
          />
          {errors.images && (
            <p className="text-red-500 text-sm mt-1">{errors.images}</p>
          )}

          {/* Botones - Stack vertical en móvil, horizontal en desktop */}
          <div className="flex flex-col-reverse sm:flex-row gap-3 sm:gap-4 mt-6">
            <button
              type="button"
              onClick={onClose}
              className="w-full sm:flex-1 px-4 sm:px-5 py-2.5 sm:py-3 rounded-lg sm:rounded-full font-medium text-sm sm:text-base transition-all duration-300 transform hover:scale-105 bg-white text-gray-700 border-2 border-gray-300 hover:border-cyan-400 hover:text-cyan-600 active:scale-95"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="w-full sm:flex-1 px-4 sm:px-5 py-2.5 sm:py-3 rounded-lg sm:rounded-full font-medium text-sm sm:text-base transition-all duration-300 transform hover:scale-105 bg-gradient-to-r from-cyan-400 to-cyan-600 text-white shadow-lg hover:shadow-xl active:scale-95"
            >
              {isEditing ? 'Actualizar Producto' : 'Crear Producto'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
