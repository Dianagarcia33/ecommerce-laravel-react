import { useNavigate } from 'react-router-dom'
import { StarIcon as StarSolidIcon } from '@heroicons/react/24/solid'
import ReviewsCarousel from '../reviews/ReviewsCarousel'
import ReviewForm from '../reviews/ReviewForm'

export default function ReviewsSection({ 
  user, 
  productId, 
  reviews, 
  reviewsStats, 
  loadingReviews, 
  onReviewSubmitted 
}) {
  const navigate = useNavigate()

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
          <ReviewForm 
            productId={productId}
            onReviewSubmitted={onReviewSubmitted}
          />
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
