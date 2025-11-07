import { useState } from 'react'
import { StarIcon } from '@heroicons/react/24/solid'
import { StarIcon as StarOutlineIcon } from '@heroicons/react/24/outline'
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
  const [hoveredRating, setHoveredRating] = useState(0)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState(false)

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
      const response = await api.post(`/products/${productId}/reviews`, formData)
      setSuccess(true)
      setFormData({ rating: 0, title: '', comment: '' })
      
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
