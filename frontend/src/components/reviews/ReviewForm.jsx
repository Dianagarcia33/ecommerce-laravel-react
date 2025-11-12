import { useState } from 'react'
import { StarIcon } from '@heroicons/react/24/solid'
import { StarIcon as StarOutlineIcon, PhotoIcon, XMarkIcon } from '@heroicons/react/24/outline'
import { useSiteConfig } from '../../hooks/useSiteConfig'
import api from '../../services/api'

export default function ReviewForm({ productId, onReviewSubmitted }) {
  const config = useSiteConfig()
  const { theme } = config
  const { colors } = theme

  const [formData, setFormData] = useState({
    rating: 0,
    title: '',
    comment: ''
  })
  const [images, setImages] = useState([]) // Array de archivos de imagen
  const [imagePreviews, setImagePreviews] = useState([]) // Array de URLs de preview
  const [hoveredRating, setHoveredRating] = useState(0)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState(false)

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files)
    
    // Validar número máximo de imágenes
    if (images.length + files.length > 5) {
      setError('Puedes subir un máximo de 5 imágenes')
      return
    }

    // Validar tamaño de cada imagen (máximo 5MB)
    const maxSize = 5 * 1024 * 1024 // 5MB
    const invalidFiles = files.filter(file => file.size > maxSize)
    if (invalidFiles.length > 0) {
      setError('Cada imagen debe pesar menos de 5MB')
      return
    }

    // Crear previews
    const newPreviews = []
    files.forEach(file => {
      const reader = new FileReader()
      reader.onloadend = () => {
        newPreviews.push(reader.result)
        if (newPreviews.length === files.length) {
          setImagePreviews([...imagePreviews, ...newPreviews])
        }
      }
      reader.readAsDataURL(file)
    })

    setImages([...images, ...files])
    setError('')
  }

  const removeImage = (index) => {
    setImages(images.filter((_, i) => i !== index))
    setImagePreviews(imagePreviews.filter((_, i) => i !== index))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    if (formData.rating === 0) {
      setError('Por favor selecciona una calificación')
      setLoading(false)
      return
    }

    if (formData.comment.length < 10) {
      setError('El comentario debe tener al menos 10 caracteres')
      setLoading(false)
      return
    }

    try {
      // Crear FormData para enviar archivos
      const submitData = new FormData()
      submitData.append('rating', formData.rating)
      submitData.append('title', formData.title)
      submitData.append('comment', formData.comment)
      
      // Agregar imágenes
      images.forEach((image, index) => {
        submitData.append(`images[${index}]`, image)
      })

      const response = await api.post(`/products/${productId}/reviews`, submitData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      })
      
      setSuccess(true)
      setFormData({ rating: 0, title: '', comment: '' })
      setImages([])
      setImagePreviews([])
      
      if (onReviewSubmitted) {
        onReviewSubmitted(response.data.review)
      }

      setTimeout(() => setSuccess(false), 3000)
    } catch (err) {
      setError(err.response?.data?.message || 'Error al enviar la reseña')
    } finally {
      setLoading(false)
    }
  }

  const renderStars = () => {
    return (
      <div className="flex gap-2">
        {[1, 2, 3, 4, 5].map((star) => {
          const isActive = star <= (hoveredRating || formData.rating)
          return (
            <button
              key={star}
              type="button"
              onMouseEnter={() => setHoveredRating(star)}
              onMouseLeave={() => setHoveredRating(0)}
              onClick={() => setFormData({ ...formData, rating: star })}
              className="transition-transform hover:scale-110"
            >
              {isActive ? (
                <StarIcon className="w-10 h-10 text-yellow-400" />
              ) : (
                <StarOutlineIcon className="w-10 h-10 text-gray-300" />
              )}
            </button>
          )
        })}
      </div>
    )
  }

  return (
    <div className="bg-gradient-to-br from-gray-50 to-white rounded-2xl shadow-lg p-8 border border-gray-100">
      <h3 className="text-2xl font-bold text-gray-900 mb-6">
        Deja tu Opinión
      </h3>

      {success && (
        <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-xl">
          <p className="text-green-800 font-semibold">
            ✓ ¡Gracias por tu reseña!
          </p>
        </div>
      )}

      {error && (
        <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-xl">
          <p className="text-red-800">{error}</p>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Rating */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-3">
            Calificación *
          </label>
          {renderStars()}
          {formData.rating > 0 && (
            <p className="text-sm text-gray-600 mt-2">
              {formData.rating === 1 && 'Muy malo'}
              {formData.rating === 2 && 'Malo'}
              {formData.rating === 3 && 'Regular'}
              {formData.rating === 4 && 'Bueno'}
              {formData.rating === 5 && 'Excelente'}
            </p>
          )}
        </div>

        {/* Título */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Título (opcional)
          </label>
          <input
            type="text"
            value={formData.title}
            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
            placeholder="Resume tu experiencia"
            maxLength={255}
            className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:border-transparent transition-all"
            style={{ 
              focusRing: `2px solid ${colors.primary.hex}`
            }}
          />
        </div>

        {/* Comentario */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Comentario *
          </label>
          <textarea
            value={formData.comment}
            onChange={(e) => setFormData({ ...formData, comment: e.target.value })}
            placeholder="Cuéntanos más sobre tu experiencia con este producto (mínimo 10 caracteres)"
            rows={5}
            maxLength={1000}
            className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:border-transparent transition-all resize-none"
            style={{ 
              focusRing: `2px solid ${colors.primary.hex}`
            }}
            required
          />
          <p className="text-sm text-gray-500 mt-2">
            {formData.comment.length}/1000 caracteres
          </p>
        </div>

        {/* Subir imágenes */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Imágenes (opcional - máximo 5)
          </label>
          
          {/* Preview de imágenes */}
          {imagePreviews.length > 0 && (
            <div className="grid grid-cols-3 sm:grid-cols-5 gap-3 mb-4">
              {imagePreviews.map((preview, index) => (
                <div key={index} className="relative group aspect-square">
                  <img
                    src={preview}
                    alt={`Preview ${index + 1}`}
                    className="w-full h-full object-cover rounded-lg border-2 border-gray-200"
                  />
                  <button
                    type="button"
                    onClick={() => removeImage(index)}
                    className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity shadow-lg"
                  >
                    <XMarkIcon className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          )}

          {/* Botón para agregar imágenes */}
          {images.length < 5 && (
            <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-gray-300 rounded-xl cursor-pointer hover:border-gray-400 hover:bg-gray-50 transition-all">
              <PhotoIcon className="w-10 h-10 text-gray-400 mb-2" />
              <span className="text-sm text-gray-500">
                Haz clic para subir imágenes
              </span>
              <span className="text-xs text-gray-400 mt-1">
                JPEG, PNG o WebP (máx. 5MB cada una)
              </span>
              <input
                type="file"
                accept="image/jpeg,image/png,image/jpg,image/webp"
                multiple
                onChange={handleImageChange}
                className="hidden"
              />
            </label>
          )}
        </div>

        {/* Botón enviar */}
        <button
          type="submit"
          disabled={loading}
          className="w-full py-4 rounded-xl font-bold text-white shadow-lg hover:shadow-xl transform hover:scale-105 transition-all disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
          style={{
            background: `linear-gradient(135deg, ${colors.primary.hex}, ${colors.secondary.hex})`
          }}
        >
          {loading ? 'Enviando...' : 'Publicar Reseña'}
        </button>
      </form>
    </div>
  )
}
