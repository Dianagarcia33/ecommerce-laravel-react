import { useNavigate } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { StarIcon as StarSolidIcon, ShoppingBagIcon } from '@heroicons/react/24/solid'
import ReviewsCarousel from '../reviews/ReviewsCarousel'
import ReviewForm from '../reviews/ReviewForm'
import api from '../../services/api'

export default function ReviewsSection({ 
  user, 
  productId, 
  reviews, 
  reviewsStats, 
  loadingReviews, 
  onReviewSubmitted 
}) {
  const navigate = useNavigate()
  const [canReview, setCanReview] = useState(null)
  const [reviewMessage, setReviewMessage] = useState('')
  const [checkingPermission, setCheckingPermission] = useState(false)

  useEffect(() => {
    if (user) {
      checkReviewPermission()
    }
  }, [user, productId])

  const checkReviewPermission = async () => {
    setCheckingPermission(true)
    try {
      const response = await api.get(`/products/${productId}/reviews/can-review`)
      setCanReview(response.data.can_review)
      setReviewMessage(response.data.message)
    } catch (error) {
      console.error('Error checking review permission:', error)
      setCanReview(false)
      setReviewMessage('Error al verificar permisos')
    } finally {
      setCheckingPermission(false)
    }
  }

  return (
    <section className="py-20 bg-gradient-to-br from-gray-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Reviews Carousel */}
        <div className="mb-16">
          {loadingReviews ? (
            <div className="text-center py-12">
              <div className="inline-block animate-spin rounded-full h-12 w-12 border-t-4 border-b-4 border-cyan-500"></div>
            </div>
          ) : (
            <ReviewsCarousel 
              reviews={reviews}
              averageRating={reviewsStats.average_rating}
              totalReviews={reviewsStats.total_reviews}
            />
          )}
        </div>

        {/* Review Form */}
        {user ? (
          checkingPermission ? (
            <div className="bg-gradient-to-br from-gray-50 to-white rounded-2xl p-12 text-center border border-gray-100">
              <div className="inline-block animate-spin rounded-full h-8 w-8 border-t-4 border-b-4 border-cyan-500 mb-4"></div>
              <p className="text-gray-600">Verificando permisos...</p>
            </div>
          ) : canReview === true ? (
            <ReviewForm 
              productId={productId}
              onReviewSubmitted={onReviewSubmitted}
            />
          ) : canReview === false ? (
            <div className="bg-gradient-to-br from-orange-50 to-amber-50 rounded-2xl p-12 text-center border border-orange-200">
              <ShoppingBagIcon className="w-16 h-16 mx-auto text-orange-500 mb-4" />
              <h3 className="text-2xl font-bold text-gray-900 mb-3">
                Compra este producto primero
              </h3>
              <p className="text-gray-700 mb-6 max-w-md mx-auto">
                {reviewMessage}
              </p>
              <button
                onClick={() => navigate('/products')}
                className="px-8 py-4 bg-gradient-to-r from-orange-500 to-amber-500 text-white font-bold rounded-xl hover:shadow-xl transform hover:scale-105 transition-all"
              >
                Ver Productos
              </button>
            </div>
          ) : null
        ) : (
          <div className="bg-gradient-to-br from-cyan-50 to-teal-50 rounded-2xl p-12 text-center border border-cyan-100">
            <StarSolidIcon className="w-16 h-16 mx-auto text-cyan-500 mb-4" />
            <h3 className="text-2xl font-bold text-gray-900 mb-3">
              ¿Ya compraste este producto?
            </h3>
            <p className="text-gray-600 mb-6 max-w-md mx-auto">
              Inicia sesión para dejar tu reseña y ayudar a otros clientes
            </p>
            <button
              onClick={() => navigate('/login')}
              className="px-8 py-4 bg-gradient-to-r from-cyan-500 to-teal-500 text-white font-bold rounded-xl hover:shadow-xl transform hover:scale-105 transition-all"
            >
              Iniciar Sesión
            </button>
          </div>
        )}
      </div>
    </section>
  )
}
