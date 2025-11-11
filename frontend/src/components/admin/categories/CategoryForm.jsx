import { useState, useEffect } from 'react'
import { XMarkIcon, PlusIcon } from '@heroicons/react/24/outline'

/**
 * Category form modal component
 */
export default function CategoryForm({
  isOpen,
  onClose,
  onSubmit,
  initialData,
  isEditing = false
}) {
  // 🔹 Estado inicial seguro
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    image: null,
    imagePreview: null,
  })

  const [errors, setErrors] = useState({})

  // Cargar datos de la categoría cuando el modal se abre en modo edición
  useEffect(() => {
    if (initialData) {
      setFormData({
        name: initialData.name || '',
        description: initialData.description || '',
        image: null, // el archivo se carga solo si el usuario selecciona uno nuevo
        imagePreview: initialData.image_url || null// acepta ambos nombres
      })
    }
  }, [initialData, isOpen])

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }))
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: null }))
    }
  }

  const handleImageUpload = (e) => {
    const file = e.target.files[0]
    if (!file) return

    if (!file.type.startsWith('image/')) {
      setErrors(prev => ({ ...prev, image: 'El archivo debe ser una imagen válida.' }))
      return
    }

    const reader = new FileReader()
    reader.onloadend = () => {
      setFormData(prev => ({
        ...prev,
        image: file,
        imagePreview: reader.result,
      }))
    }
    reader.readAsDataURL(file)
  }

  const handleRemoveImage = () => {
    setFormData(prev => ({
      ...prev,
      image: null,
      imagePreview: null,
    }))
  }

  const validateForm = () => {
    const newErrors = {}

    if (!formData.name?.trim()) {
      newErrors.name = 'El nombre es requerido'
    }

    // Si no hay imagen cargada ni existente
    if (!formData.image && !formData.imagePreview) {
      newErrors.image = 'Debes subir una imagen para la categoría'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (validateForm()) {
      onSubmit(formData)
    }
  }

  if (!isOpen) return null

  return (
    <div
      className="fixed inset-0 bg-gradient-to-br from-gray-900/80 via-gray-800/90 to-gray-900/80 backdrop-blur-sm flex items-center justify-center z-50 p-4 animate-fadeIn"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-xl sm:rounded-2xl p-4 sm:p-6 md:p-8 max-w-md w-full max-h-[90vh] overflow-y-auto shadow-2xl animate-scaleIn transform transition-all scrollbar-thin hover:shadow-3xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between mb-4 sm:mb-6">
          <h2 className="text-xl sm:text-2xl font-bold text-gray-900">
            {isEditing ? 'Editar Categoría' : 'Nueva Categoría'}
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
          {/* Nombre */}
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-medium mb-2">Nombre</label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => handleInputChange('name', e.target.value)}
              className={`w-full px-3 sm:px-4 py-2 sm:py-3 border-2 rounded-lg sm:rounded-xl focus:border-cyan-400 focus:ring-2 focus:ring-cyan-200 transition-all outline-none text-sm sm:text-base ${errors.name ? 'border-red-300' : 'border-gray-200'
                }`}
              placeholder="Ej: Electrónica"
              required
            />
            {errors.name && <p className="text-red-500 text-xs sm:text-sm mt-1">{errors.name}</p>}
          </div>

          {/* Descripción */}
          <div className="mb-6">
            <label className="block text-gray-700 text-sm font-medium mb-2">
              Descripción <span className="text-gray-400 font-normal">(opcional)</span>
            </label>
            <textarea
              value={formData.description}
              onChange={(e) => handleInputChange('description', e.target.value)}
              className="w-full px-3 sm:px-4 py-2 sm:py-3 border-2 border-gray-200 rounded-lg sm:rounded-xl focus:border-cyan-400 focus:ring-2 focus:ring-cyan-200 transition-all outline-none text-sm sm:text-base resize-none"
              rows="3"
              placeholder="Describe la categoría..."
            />
          </div>

          {/* Imagen */}
          <div className="mb-6">
            <label className="block text-gray-700 text-sm font-medium mb-2">Imagen de la categoría</label>

            {formData.imagePreview ? (
              <div className="relative w-full h-48 rounded-xl overflow-hidden border-2 border-gray-200">
                <img
                  src={formData.imagePreview}
                  alt="Vista previa"
                  className="object-cover w-full h-full"
                />
                <button
                  type="button"
                  onClick={handleRemoveImage}
                  className="absolute top-2 right-2 bg-white text-gray-700 rounded-full p-2 shadow-md hover:bg-red-500 hover:text-white transition-all"
                  aria-label="Eliminar imagen"
                >
                  <XMarkIcon className="w-4 h-4" />
                </button>
              </div>
            ) : (
              <label className="flex flex-col items-center justify-center h-48 border-2 border-dashed border-gray-300 rounded-xl cursor-pointer bg-gray-50 hover:bg-gray-100 hover:border-cyan-400 transition-all">
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="hidden"
                />
                <PlusIcon className="w-8 h-8 text-gray-400" />
                <span className="text-sm text-gray-500 mt-2">
                  Cargar imagen
                </span>
              </label>
            )}

            {errors.image && <p className="text-red-500 text-xs mt-2">{errors.image}</p>}
          </div>

          {/* Botones */}
          <div className="flex flex-col-reverse sm:flex-row gap-3 sm:gap-4">
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
              {isEditing ? 'Actualizar Categoría' : 'Crear Categoría'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}