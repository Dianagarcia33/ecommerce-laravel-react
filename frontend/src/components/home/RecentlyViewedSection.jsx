import { Link } from 'react-router-dom'
import { ClockIcon, XMarkIcon } from '@heroicons/react/24/outline'
import { useSiteConfig } from '../../hooks/useSiteConfig'
import { useRecentlyViewed } from '../../hooks/useRecentlyViewed'

export default function RecentlyViewedSection() {
  const config = useSiteConfig()
  const { theme } = config
  const { colors } = theme
  const { recentlyViewed, removeRecentlyViewed } = useRecentlyViewed()

  // No mostrar si no hay productos
  if (!recentlyViewed || recentlyViewed.length === 0) {
    return null
  }

  const formatPrice = (price) => {
    return new Intl.NumberFormat('es-CO', {
      style: 'currency',
      currency: 'COP',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(price)
  }

  return (
    <section className="py-12 relative overflow-hidden">
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div 
              className="w-10 h-10 rounded-full flex items-center justify-center shadow-lg"
              style={{ background: `linear-gradient(135deg, ${colors.primary.hex}, ${colors.secondary.hex})` }}
            >
              <ClockIcon className="w-5 h-5 text-white" />
            </div>
            <div>
              <h2 className="text-2xl lg:text-3xl font-black text-gray-900">
                Vistos recientemente
              </h2>
              <p className="text-sm text-gray-500">
                {recentlyViewed.length} {recentlyViewed.length === 1 ? 'producto' : 'productos'}
              </p>
            </div>
          </div>
        </div>

        {/* Products Horizontal Scroll */}
        <div className="overflow-x-auto hide-scrollbar">
          <div className="flex gap-4 pb-4">
            {recentlyViewed.map((product) => (
              <div 
                key={product.id} 
                className="flex-shrink-0 w-48 group relative"
              >
                {/* Remove button */}
                <button
                  onClick={(e) => {
                    e.preventDefault()
                    removeRecentlyViewed(product.id)
                  }}
                  className="absolute top-2 right-2 z-10 w-6 h-6 bg-white rounded-full shadow-lg flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity hover:bg-red-50"
                  title="Eliminar del historial"
                >
                  <XMarkIcon className="w-4 h-4 text-red-500" />
                </button>

                {/* Product Card */}
                <Link 
                  to={`/product/${product.id}/parallax`}
                  className="block bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden"
                >
                  {/* Image */}
                  <div className="aspect-square bg-gray-100 overflow-hidden">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      loading="lazy"
                    />
                  </div>

                  {/* Info */}
                  <div className="p-3">
                    <h3 className="text-sm font-bold text-gray-900 line-clamp-2 mb-1 group-hover:text-cyan-600 transition-colors">
                      {product.name}
                    </h3>
                    <p className="text-lg font-black text-cyan-600">
                      {formatPrice(product.price)}
                    </p>
                  </div>
                </Link>
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
      `}</style>
    </section>
  )
}
