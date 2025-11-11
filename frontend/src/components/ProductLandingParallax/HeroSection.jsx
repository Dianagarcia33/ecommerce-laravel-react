import { ArrowRightIcon, ChevronDownIcon } from '@heroicons/react/24/outline'

export default function HeroSection({ product, images, scrollY, onBuyNow, onAddToCart }) {
  return (
    <section className="relative h-screen flex items-center justify-center overflow-hidden">
      {/* Parallax Background Image */}
      <div 
        className="absolute inset-0 z-0"
        style={{
          transform: `translateY(${scrollY * 0.5}px)`,
          transition: 'transform 0.1s ease-out'
        }}
      >
        <img
          src={images[0]}
          alt={product.name}
          className="w-full h-full object-cover scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/70"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 text-center px-4 max-w-5xl mx-auto">
        <div 
          className="transform transition-all duration-700"
          style={{
            transform: `translateY(${scrollY * 0.3}px)`,
            opacity: Math.max(0, 1 - scrollY / 500)
          }}
        >
          <h1 className="text-7xl lg:text-8xl xl:text-9xl font-extrabold text-white mb-8 tracking-tight leading-none">
            {product.name}
          </h1>
          <p className="text-2xl lg:text-3xl text-white/90 mb-12 font-light max-w-3xl mx-auto">
            {product.description}
          </p>
          
          {/* Price */}
          <div className="mb-12">
            <span className="text-6xl lg:text-7xl font-extrabold text-white">
              ${parseFloat(product.price).toFixed(2)}
            </span>
          </div>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <button
              onClick={onBuyNow}
              disabled={product.stock === 0}
              className="group px-12 py-6 bg-gradient-to-r from-lime-400 to-green-500 text-gray-900 font-extrabold text-2xl rounded-2xl hover:shadow-[0_20px_80px_rgba(132,204,22,0.6)] hover:scale-105 transition-all disabled:opacity-50 flex items-center gap-3"
            >
              Comprar Ahora
              <ArrowRightIcon className="w-7 h-7 group-hover:translate-x-2 transition-transform" />
            </button>
            <button
              onClick={onAddToCart}
              disabled={product.stock === 0}
              className="px-12 py-6 bg-white/20 backdrop-blur-sm text-white font-bold text-2xl rounded-2xl border-2 border-white/50 hover:bg-white/30 hover:border-white transition-all"
            >
              Agregar al Carrito
            </button>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce z-10">
        <ChevronDownIcon className="w-12 h-12 text-white/70" />
      </div>
    </section>
  )
}
