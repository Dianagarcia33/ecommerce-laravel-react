import {
  ShoppingCartIcon,
  TruckIcon,
  ShieldCheckIcon,
  CheckCircleIcon,
  SparklesIcon
} from '@heroicons/react/24/outline'

export default function FinalCTASection({ product, quantity, setQuantity, onBuyNow }) {
  const trustBadges = [
    { icon: TruckIcon, text: 'Envío Express' },
    { icon: ShieldCheckIcon, text: 'Compra Segura' },
    { icon: CheckCircleIcon, text: 'Garantía 2 años' },
    { icon: SparklesIcon, text: 'Calidad Premium' }
  ]

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-cyan-500 via-lime-400 to-green-500 opacity-90"></div>
      <div className="absolute inset-0">
        <div className="absolute top-0 left-0 w-96 h-96 bg-white/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-white/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
      </div>

      {/* Content */}
      <div className="relative z-10 text-center px-4 max-w-5xl mx-auto">
        <h2 className="text-7xl lg:text-8xl font-extrabold text-white mb-8 leading-none">
          ¿Listo para tenerlo?
        </h2>
        <p className="text-3xl text-white/90 mb-12 font-light">
          Únete a miles de clientes satisfechos
        </p>

        {/* Price & Stock */}
        <div className="mb-12">
          <span className="text-8xl font-extrabold text-white">
            ${parseFloat(product.price).toFixed(2)}
          </span>
          <p className="text-xl text-white/80 mt-4">
            {product.stock > 0 ? `${product.stock} unidades disponibles` : 'Agotado'}
          </p>
        </div>

        {/* Quantity Selector */}
        <div className="flex items-center justify-center gap-6 mb-12">
          <button
            onClick={() => setQuantity(Math.max(1, quantity - 1))}
            className="w-14 h-14 bg-white/20 backdrop-blur-sm hover:bg-white/30 rounded-2xl text-white text-2xl font-bold transition-all"
          >
            −
          </button>
          <span className="text-4xl font-bold text-white w-20 text-center">{quantity}</span>
          <button
            onClick={() => setQuantity(Math.min(product.stock, quantity + 1))}
            disabled={quantity >= product.stock}
            className="w-14 h-14 bg-white/20 backdrop-blur-sm hover:bg-white/30 rounded-2xl text-white text-2xl font-bold transition-all disabled:opacity-40"
          >
            +
          </button>
        </div>

        {/* Final CTAs */}
        <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
          <button
            onClick={onBuyNow}
            disabled={product.stock === 0}
            className="group px-16 py-8 bg-white text-gray-900 font-extrabold text-3xl rounded-3xl hover:shadow-[0_30px_100px_rgba(255,255,255,0.5)] hover:scale-105 transition-all disabled:opacity-50 flex items-center gap-4"
          >
            Comprar Ahora
            <ShoppingCartIcon className="w-8 h-8" />
          </button>
        </div>

        {/* Trust Badges */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-20 max-w-4xl mx-auto">
          {trustBadges.map((badge, index) => (
            <div key={index} className="flex flex-col items-center gap-3 text-white">
              <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center">
                <badge.icon className="w-8 h-8" />
              </div>
              <span className="font-bold text-lg">{badge.text}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
