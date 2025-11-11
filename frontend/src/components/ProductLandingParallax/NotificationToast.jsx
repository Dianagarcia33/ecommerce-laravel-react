import { CheckCircleIcon } from '@heroicons/react/24/outline'

export default function NotificationToast({ show, product, quantity }) {
  if (!show) return null

  return (
    <div className="fixed top-24 right-4 z-50 animate-slide-in-right">
      <div className="bg-white/95 backdrop-blur-xl rounded-2xl shadow-2xl p-4 flex items-center gap-3 border border-lime-400/20">
        <div className="w-10 h-10 bg-gradient-to-br from-lime-400 to-green-500 rounded-full flex items-center justify-center">
          <CheckCircleIcon className="w-6 h-6 text-white" />
        </div>
        <div>
          <p className="font-bold text-gray-900">¡Agregado al carrito!</p>
          <p className="text-sm text-gray-500">{quantity} x {product.name}</p>
        </div>
      </div>
    </div>
  )
}
