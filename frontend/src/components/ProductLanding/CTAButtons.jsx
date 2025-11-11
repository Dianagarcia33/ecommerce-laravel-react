import { ShoppingCartIcon } from '@heroicons/react/24/outline'

export default function CTAButtons({ product, onBuyNow, onAddToCart }) {
  return (
    <div className="space-y-4 pt-6">
      {/* Primary CTA - HUGE and Bold */}
      <button
        onClick={onBuyNow}
        disabled={product.stock === 0}
        className="w-full px-10 py-6 bg-gradient-to-r from-lime-400 via-lime-500 to-green-500 text-gray-900 font-extrabold text-2xl rounded-2xl hover:shadow-[0_20px_60px_rgba(132,204,22,0.4)] hover:scale-[1.02] transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-3"
      >
        {product.stock === 0 ? 'Agotado' : (
          <>
            <ShoppingCartIcon className="w-7 h-7" />
            Comprar Ahora
          </>
        )}
      </button>
      
      {/* Secondary CTA - Subtle */}
      <button
        onClick={onAddToCart}
        disabled={product.stock === 0}
        className="w-full px-8 py-5 bg-white/80 backdrop-blur-sm text-gray-700 font-bold text-xl rounded-2xl border-2 border-gray-200 hover:border-cyan-400 hover:bg-white hover:shadow-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed"
      >
        Agregar al Carrito
      </button>
    </div>
  )
}
