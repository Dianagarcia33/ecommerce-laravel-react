import { Link } from 'react-router-dom'
import { ShoppingCartIcon, HeartIcon } from '@heroicons/react/24/outline'
import { HeartIcon as HeartIconSolid } from '@heroicons/react/24/solid'
import { useSiteConfig } from '../../hooks/useSiteConfig'

export default function ProductCard({ 
  product, 
  index, 
  onAddToCart, 
  onToggleFavorite, 
  isFavorite 
}) {
  const { theme } = useSiteConfig()
  const { colors } = theme

  return (
    <div
      className="group bg-white rounded-2xl shadow-md hover:shadow-2xl transition-all duration-300 overflow-hidden transform hover:-translate-y-2"
      style={{
        animation: `fadeInUp 0.5s ease-out ${index * 0.1}s backwards`
      }}
    >
      {/* Imagen del producto */}
      <div className="relative overflow-hidden bg-gray-100">
        <Link to={`/product/${product.id}/parallax`}>
          <img
            src={
              product.images?.[0]?.image_url?.replace(
                'http://localhost:8000/products/',
                'http://localhost:8000/storage/products/'
              ) || 'https://placehold.co/300x300?text=Sin+imagen'
            }
            alt={product.name}
            className="w-full h-56 object-cover transform group-hover:scale-110 transition-transform duration-500"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
        </Link>

        {/* Botón de favorito */}
        <button
          onClick={(e) => {
            e.stopPropagation()
            onToggleFavorite(product.id)
          }}
          className="absolute top-3 left-3 p-2 bg-white/90 backdrop-blur-sm rounded-full shadow-lg hover:bg-white transition-all duration-300 transform hover:scale-110 z-10"
        >
          {isFavorite(product.id) ? (
            <HeartIconSolid className="w-5 h-5 text-red-500" />
          ) : (
            <HeartIcon className="w-5 h-5 text-gray-700" />
          )}
        </button>

        {/* Badge de stock */}
        {product.stock < 10 && product.stock > 0 && (
          <div className="absolute top-3 right-3 bg-yellow-400 text-gray-900 text-xs font-bold px-3 py-1 rounded-full shadow-lg">
            ¡Últimas {product.stock}!
          </div>
        )}
        {product.stock === 0 && (
          <div className="absolute top-3 right-3 bg-red-500 text-white text-xs font-bold px-3 py-1 rounded-full shadow-lg">
            Agotado
          </div>
        )}
      </div>

      {/* Contenido */}
      <div className="p-5">
        <Link to={`/product/${product.id}/parallax`}>
          <h3 
            className="text-lg font-bold text-gray-900 mb-2 transition-colors line-clamp-2 min-h-[56px]"
            onMouseEnter={(e) => e.target.style.color = colors.primary.hex}
            onMouseLeave={(e) => e.target.style.color = '#111827'}
          >
            {product.name}
          </h3>
        </Link>

        <p className="text-gray-600 text-sm mb-4 line-clamp-2 min-h-[40px]">
          {product.description}
        </p>

        {/* Precio y botón */}
        <div className="flex items-center justify-between pt-4 border-t border-gray-100">
          <div>
            <span 
              className="text-3xl font-extrabold"
              style={{ 
                background: `linear-gradient(to right, ${colors.primary.hex}, ${colors.primary.dark})`,
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text'
              }}
            >
              ${product.price}
            </span>
          </div>
          <button
            onClick={() => onAddToCart(product)}
            disabled={product.stock === 0}
            className={`flex items-center gap-1 px-4 py-2 rounded-full font-bold transition-all duration-300 transform hover:scale-105 shadow-md ${
              product.stock === 0
                ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                : 'text-white hover:shadow-lg'
            }`}
            style={product.stock > 0 ? { 
              background: `linear-gradient(to right, ${colors.secondary.hex}, ${colors.secondary.dark})`
            } : {}}
            onMouseEnter={(e) => {
              if (product.stock > 0) {
                e.target.style.opacity = '0.9'
              }
            }}
            onMouseLeave={(e) => {
              if (product.stock > 0) {
                e.target.style.opacity = '1'
              }
            }}
          >
            <ShoppingCartIcon className="w-5 h-5" />
            <span className="hidden sm:inline">Agregar</span>
          </button>
        </div>
      </div>
    </div>
  )
}
