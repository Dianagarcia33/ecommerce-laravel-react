import { Link } from 'react-router-dom'
import { ShoppingBagIcon, HeartIcon } from '@heroicons/react/24/outline'
import { HeartIcon as HeartIconSolid } from '@heroicons/react/24/solid'
import { useSiteConfig } from '../../hooks/useSiteConfig'

export default function ProductCard({ product, showFavorite = false, onToggleFavorite, isFavorite }) {
  const config = useSiteConfig()
  const { theme } = config
  const { colors } = theme

  return (
    <Link to={`/product/${product.id}/parallax`} className="group relative block">
      <div className="relative overflow-hidden rounded-3xl bg-white shadow-lg hover:shadow-2xl transition-all duration-300 transform group-hover:-translate-y-2">
        {/* Imagen del producto */}
        <div className="aspect-square overflow-hidden bg-gray-50 relative">
          <img
            src={product.images?.[0]?.image_url || 'https://via.placeholder.com/400'}
            alt={product.name}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
          />
          
          {/* Botón de favorito */}
          {showFavorite && onToggleFavorite && (
            <button
              onClick={async (e) => {
                e.preventDefault()
                await onToggleFavorite(product.id)
              }}
              className="absolute top-4 right-4 w-10 h-10 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center shadow-lg hover:scale-110 transition-transform z-10"
            >
              {isFavorite ? (
                <HeartIconSolid className="w-6 h-6 text-red-500" />
              ) : (
                <HeartIcon className="w-6 h-6 text-gray-600" />
              )}
            </button>
          )}
        </div>

        {/* Badge de nuevo */}
        {product.stock > 0 && (
          <div 
            className="absolute top-4 left-4 px-3 py-1 rounded-full text-xs font-bold text-white shadow-lg"
            style={{ background: colors.secondary.hex }}
          >
            NUEVO
          </div>
        )}

        {/* Contenido */}
        <div className="p-6 space-y-3">
          <h3 className="font-bold text-lg text-gray-900 transition-all line-clamp-2">
            {product.name}
          </h3>
          
          <div className="flex items-center justify-between">
            <div>
              <div 
                className="text-2xl font-black"
                style={{ color: colors.primary.hex }}
              >
                ${parseFloat(product.price).toFixed(2)}
              </div>
              {product.stock < 10 && product.stock > 0 && (
                <div className="text-xs text-orange-600 font-medium">
                  ¡Solo {product.stock} disponibles!
                </div>
              )}
            </div>
            
            <button 
              className="w-12 h-12 rounded-full shadow-lg flex items-center justify-center group-hover:scale-110 transition-transform"
              style={{ background: colors.primary.hex }}
            >
              <ShoppingBagIcon className="w-6 h-6 text-white" />
            </button>
          </div>
        </div>
      </div>
    </Link>
  )
}
