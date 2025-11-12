import { useState, useEffect, useRef } from 'react'
import { StarIcon, ChevronLeftIcon, ChevronRightIcon, CheckBadgeIcon } from '@heroicons/react/24/solid'
import { StarIcon as StarOutlineIcon } from '@heroicons/react/24/outline'
import { useSiteConfig } from '../../hooks/useSiteConfig'

export default function ReviewsCarousel({ reviews, averageRating, totalReviews }) {
  const config = useSiteConfig()
  const { theme } = config
  const { colors } = theme
  const scrollContainerRef = useRef(null)
  const [canScrollLeft, setCanScrollLeft] = useState(false)
  const [canScrollRight, setCanScrollRight] = useState(true)
  const [isAutoScrolling, setIsAutoScrolling] = useState(true)

  // Auto scroll
  useEffect(() => {
    if (!isAutoScrolling || !reviews || reviews.length === 0 || !scrollContainerRef.current) return

    const interval = setInterval(() => {
      const container = scrollContainerRef.current
      if (!container) return

      const maxScroll = container.scrollWidth - container.clientWidth
      const currentScroll = container.scrollLeft

      if (currentScroll >= maxScroll - 10) {
        // Si llegó al final, volver al inicio
        container.scrollTo({ left: 0, behavior: 'smooth' })
      } else {
        // Scroll gradual
        container.scrollBy({ left: 400, behavior: 'smooth' })
      }
    }, 4000) // Cambiar cada 4 segundos

    return () => clearInterval(interval)
  }, [isAutoScrolling, reviews])

  // Detectar posición del scroll
  useEffect(() => {
    const container = scrollContainerRef.current
    if (!container) return

    const handleScroll = () => {
      setCanScrollLeft(container.scrollLeft > 0)
      setCanScrollRight(
        container.scrollLeft < container.scrollWidth - container.clientWidth - 10
      )
    }

    container.addEventListener('scroll', handleScroll)
    handleScroll()

    return () => container.removeEventListener('scroll', handleScroll)
  }, [reviews])

  const scroll = (direction) => {
    const container = scrollContainerRef.current
    if (!container) return

    setIsAutoScrolling(false) // Pausar auto-scroll al usar botones
    
    const maxScroll = container.scrollWidth - container.clientWidth
    const currentScroll = container.scrollLeft
    const scrollAmount = 400

    if (direction === 'right') {
      // Si está al final o muy cerca, volver al inicio
      if (currentScroll >= maxScroll - 10) {
        container.scrollTo({ left: 0, behavior: 'smooth' })
      } else {
        container.scrollBy({ left: scrollAmount, behavior: 'smooth' })
      }
    } else {
      // Si está al inicio, ir al final
      if (currentScroll <= 10) {
        container.scrollTo({ left: maxScroll, behavior: 'smooth' })
      } else {
        container.scrollBy({ left: -scrollAmount, behavior: 'smooth' })
      }
    }

    // Reanudar auto-scroll después de 5 segundos
    setTimeout(() => setIsAutoScrolling(true), 5000)
  }

  const renderStars = (rating) => {
    return (
      <div className="flex gap-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <StarIcon
            key={star}
            className={`w-5 h-5 ${
              star <= rating ? 'text-yellow-400' : 'text-gray-300'
            }`}
          />
        ))}
      </div>
    )
  }

  if (!reviews || reviews.length === 0) {
    return (
      <div className="text-center py-12">
        <StarOutlineIcon className="w-16 h-16 mx-auto text-gray-300 mb-4" />
        <p className="text-gray-500 text-lg">Aún no hay reseñas para este producto</p>
        <p className="text-gray-400 text-sm mt-2">¡Sé el primero en dejar tu opinión!</p>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Header con rating promedio */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 pb-6 border-b border-gray-200">
        <div>
          <h3 className="text-2xl font-bold text-gray-900 mb-2">
            Opiniones de Clientes
          </h3>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <span className="text-4xl font-black" style={{ color: colors.primary.hex }}>
                {averageRating || 0}
              </span>
              <div>
                {renderStars(Math.round(averageRating || 0))}
                <p className="text-sm text-gray-500 mt-1">
                  {totalReviews} {totalReviews === 1 ? 'reseña' : 'reseñas'}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Carousel de reseñas */}
      <div className="relative">
        {/* Botón Izquierda */}
        {canScrollLeft && (
          <button
            onClick={() => scroll('left')}
            className="absolute left-0 top-1/2 -translate-y-1/2 z-10 w-12 h-12 bg-white rounded-full shadow-xl flex items-center justify-center hover:scale-110 transition-transform group"
            style={{ marginLeft: '-24px' }}
          >
            <ChevronLeftIcon className="w-6 h-6 text-gray-700 group-hover:text-cyan-600" />
          </button>
        )}

        {/* Botón Derecha */}
        {canScrollRight && (
          <button
            onClick={() => scroll('right')}
            className="absolute right-0 top-1/2 -translate-y-1/2 z-10 w-12 h-12 bg-white rounded-full shadow-xl flex items-center justify-center hover:scale-110 transition-transform group"
            style={{ marginRight: '-24px' }}
          >
            <ChevronRightIcon className="w-6 h-6 text-gray-700 group-hover:text-cyan-600" />
          </button>
        )}

        {/* Contenedor Scroll */}
        <div
          ref={scrollContainerRef}
          className="overflow-x-auto hide-scrollbar scroll-smooth"
          onMouseEnter={() => setIsAutoScrolling(false)}
          onMouseLeave={() => setIsAutoScrolling(true)}
        >
          <div className="flex gap-6 pb-4">
            {reviews.map((review) => (
              <div
                key={review.id}
                className="flex-shrink-0 w-96 bg-white rounded-2xl shadow-lg p-6 border border-gray-100 hover:shadow-xl transition-shadow"
              >
                {/* Header de la reseña */}
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      {renderStars(review.rating)}
                      {review.verified_purchase && (
                        <div className="flex items-center gap-1 text-green-600">
                          <CheckBadgeIcon className="w-5 h-5" />
                          <span className="text-xs font-semibold">Verificado</span>
                        </div>
                      )}
                    </div>
                    {review.title && (
                      <h4 className="font-bold text-gray-900 text-lg mb-2">
                        {review.title}
                      </h4>
                    )}
                  </div>
                </div>

                {/* Comentario */}
                <p className="text-gray-700 leading-relaxed mb-4 line-clamp-6">
                  {review.comment}
                </p>

                {/* Imágenes de la reseña */}
                {review.images && review.images.length > 0 && (
                  <div className="grid grid-cols-3 gap-2 mb-4">
                    {review.images.map((imageUrl, index) => (
                      <img
                        key={index}
                        src={`${import.meta.env.VITE_API_BASE_URL}${imageUrl}`}
                        alt={`Imagen ${index + 1} de la reseña`}
                        className="w-full aspect-square object-cover rounded-lg border border-gray-200 hover:scale-105 transition-transform cursor-pointer"
                        onClick={() => window.open(`${import.meta.env.VITE_API_BASE_URL}${imageUrl}`, '_blank')}
                      />
                    ))}
                  </div>
                )}

                {/* Footer */}
                <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                  <div>
                    <p className="font-semibold text-gray-900">{review.user_name}</p>
                    <p className="text-sm text-gray-500">{review.created_at_diff}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <style jsx>{`
        .hide-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .hide-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        .line-clamp-6 {
          display: -webkit-box;
          -webkit-line-clamp: 6;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
      `}</style>
    </div>
  )
}
