import { ShoppingCartIcon } from '@heroicons/react/24/outline'

export default function MobileCTA({ product, onBuyNow }) {
  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white/95 backdrop-blur-xl border-t border-gray-200 shadow-2xl z-40 lg:hidden">
      <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between gap-4">
        <div className="flex-shrink-0">
          <p className="text-2xl font-bold bg-gradient-to-r from-cyan-600 to-teal-600 bg-clip-text text-transparent">
            ${parseFloat(product.price).toFixed(2)}
          </p>
          <p className="text-xs text-gray-400">Stock: {product.stock}</p>
        </div>
        <button
          onClick={onBuyNow}
          disabled={product.stock === 0}
          className="flex-1 px-8 py-4 bg-gradient-to-r from-lime-400 to-green-500 text-gray-900 font-extrabold text-lg rounded-2xl hover:shadow-[0_10px_40px_rgba(132,204,22,0.4)] transition-all disabled:opacity-50 flex items-center justify-center gap-2"
        >
          <ShoppingCartIcon className="w-5 h-5" />
          Comprar
        </button>
      </div>
    </div>
  )
}
