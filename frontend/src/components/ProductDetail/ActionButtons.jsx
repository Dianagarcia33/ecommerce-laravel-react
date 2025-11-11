import { Link } from 'react-router-dom'
import { ShoppingCartIcon, ArrowLeftIcon } from '@heroicons/react/24/outline'
import { useSiteConfig } from '../../hooks/useSiteConfig'

export default function ActionButtons({ product, quantity, onAddToCart }) {
  const { colors } = useSiteConfig()

  return (
    <div className="space-y-4">
      <button
        onClick={onAddToCart}
        disabled={product.stock === 0}
        className="w-full group relative overflow-hidden px-8 py-4 rounded-xl font-semibold text-lg shadow-lg hover:shadow-2xl disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 hover:scale-105 disabled:hover:scale-100"
        style={{
          background: product.stock === 0 
            ? '#9CA3AF' 
            : `linear-gradient(135deg, ${colors.primary.hex} 0%, ${colors.secondary.hex} 100%)`,
          color: '#FFFFFF'
        }}
      >
        <span className="relative z-10 flex items-center justify-center gap-2">
          <ShoppingCartIcon className="w-6 h-6" />
          {product.stock === 0 ? 'Sin Stock' : `Agregar ${quantity > 1 ? `${quantity} ` : ''}al Carrito`}
        </span>
        {product.stock > 0 && (
          <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-20 transition-opacity duration-300" />
        )}
      </button>
      
      <Link
        to="/products"
        className="flex items-center justify-center gap-2 w-full px-8 py-4 bg-white border-2 border-gray-300 text-gray-700 font-semibold text-lg rounded-xl shadow-md hover:shadow-lg hover:border-gray-400 hover:bg-gray-50 transition-all duration-300"
      >
        <ArrowLeftIcon className="w-5 h-5" />
        Seguir Comprando
      </Link>
    </div>
  )
}
