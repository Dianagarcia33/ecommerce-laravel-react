import { Link } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { 
  ShoppingBagIcon, 
  SparklesIcon,
  ArrowRightIcon,
  TagIcon,
  TruckIcon,
  ShieldCheckIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  HeartIcon
} from '@heroicons/react/24/outline'
import { HeartIcon as HeartSolid } from '@heroicons/react/24/solid'
import { useSiteConfig } from '../../hooks/useSiteConfig'
import { useFavorites } from '../../context/FavoritesContext'

export default function HeroSection({ 
  featuredProducts,
  loading
}) {
  const config = useSiteConfig()
  const { home, business, theme } = config
  const { colors } = theme
  const { toggleFavorite, isFavorite } = useFavorites()
  
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isAutoPlaying, setIsAutoPlaying] = useState(true)

  // Auto-play: cambiar productos cada 4 segundos
  useEffect(() => {
    if (!isAutoPlaying || loading || featuredProducts.length === 0) return
    
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % Math.max(1, Math.floor(featuredProducts.length / 4)))
    }, 4000)
    
    return () => clearInterval(interval)
  }, [isAutoPlaying, loading, featuredProducts.length])

  // Obtener los productos actuales del carrusel (4 productos por vista)
  const getDisplayedProducts = () => {
    if (featuredProducts.length === 0) return []
    const startIdx = currentIndex * 4
    return featuredProducts.slice(startIdx, startIdx + 4).concat(
      featuredProducts.slice(0, Math.max(0, 4 - (featuredProducts.length - startIdx)))
    ).slice(0, 4)
  }

  const displayedProducts = getDisplayedProducts()
  const totalSlides = Math.max(1, Math.ceil(featuredProducts.length / 4))

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % totalSlides)
    setIsAutoPlaying(false)
  }

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + totalSlides) % totalSlides)
    setIsAutoPlaying(false)
  }

  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-slate-900 via-cyan-900 to-teal-900">
      {/* Fondo animado igual que el login */}
      <div className="absolute inset-0">
        {/* Círculos animados con blur */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-lime-400 rounded-full opacity-15 blur-3xl animate-pulse"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-cyan-400 rounded-full opacity-15 blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-teal-400 rounded-full opacity-10 blur-3xl animate-pulse" style={{ animationDelay: '2s' }}></div>
      </div>

      {/* Iconos flotantes decorativos */}
      <div className="absolute inset-0 pointer-events-none">
        <ShoppingBagIcon className="absolute top-20 left-10 w-12 h-12 text-cyan-300 opacity-20 animate-float" />
        <SparklesIcon className="absolute top-40 right-20 w-16 h-16 text-lime-300 opacity-20 animate-float" style={{ animationDelay: '1s' }} />
        <TagIcon className="absolute bottom-32 left-1/4 w-14 h-14 text-orange-300 opacity-20 animate-float" style={{ animationDelay: '2s' }} />
        <ShieldCheckIcon className="absolute bottom-40 right-1/3 w-12 h-12 text-cyan-300 opacity-20 animate-float" style={{ animationDelay: '1.5s' }} />
      </div>

      <div className="relative w-full px-8 sm:px-12 lg:px-16 xl:px-24 py-20 lg:py-32">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          
          {/* COLUMNA IZQUIERDA - Contenido de texto */}
          <div className="space-y-8 text-left order-2 lg:order-1">
            
            {/* Badge con estilo premium */}
            <div className="flex justify-start">
              <div 
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full border-2 text-sm font-bold shadow-lg transform hover:scale-105 transition-all cursor-default bg-white"
                style={{
                  borderColor: colors.primary.hex,
                  color: colors.primary.hex
                }}
              >
                <SparklesIcon className="w-5 h-5" />
                {home.hero.badge}
              </div>
            </div>

            {/* Título principal con gradiente */}
            <div className="space-y-4">
              <h1 className="text-5xl sm:text-6xl lg:text-7xl font-black leading-tight">
                <span className="block text-white">
                  {home.hero.title.split(' ').slice(0, 2).join(' ')}
                </span>
                <span 
                  className="block bg-gradient-to-r bg-clip-text text-transparent mt-2"
                  style={{
                    backgroundImage: `linear-gradient(135deg, ${colors.secondary.hex}, #fef08a)`
                  }}
                >
                  {home.hero.title.split(' ').slice(2).join(' ')}
                </span>
              </h1>
              
              <p className="text-xl lg:text-2xl text-gray-200 font-normal max-w-xl leading-relaxed">
                {home.hero.subtitle}
              </p>
            </div>

            {/* Features con diseño horizontal - DISTINTIVO */}
            <div className="space-y-3 py-4">
              <div className="flex items-center gap-3">
                <div 
                  className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 shadow-lg"
                  style={{ background: `linear-gradient(135deg, ${colors.primary.hex}, ${colors.primary.dark})` }}
                >
                  <TruckIcon className="w-6 h-6 text-white" />
                </div>
                <div>
                  <p className="font-bold text-white text-base">Envío Express Gratis</p>
                  <p className="text-sm text-gray-300">Entregas en 24-48 horas</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div 
                  className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 shadow-lg"
                  style={{ background: `linear-gradient(135deg, ${colors.secondary.hex}, ${colors.secondary.dark})` }}
                >
                  <ShieldCheckIcon className="w-6 h-6 text-white" />
                </div>
                <div>
                  <p className="font-bold text-white text-base">Compra 100% Segura</p>
                  <p className="text-sm text-gray-300">Protección total garantizada</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div 
                  className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 shadow-lg"
                  style={{ background: `linear-gradient(135deg, ${colors.primary.hex}, ${colors.secondary.hex})` }}
                >
                  <TagIcon className="w-6 h-6 text-white" />
                </div>
                <div>
                  <p className="font-bold text-white text-base">Mejor Precio del Mercado</p>
                  <p className="text-sm text-gray-300">Ofertas exclusivas diarias</p>
                </div>
              </div>
            </div>

            {/* Botones de acción */}
            <div className="flex flex-wrap gap-4 pt-6">
              <Link 
                to="/products"
                className="group relative px-10 py-5 rounded-2xl font-bold text-white shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105 overflow-hidden text-lg"
                style={{ background: `linear-gradient(135deg, ${colors.primary.hex}, ${colors.primary.dark})` }}
              >
                <span className="relative z-10 flex items-center gap-3">
                  <ShoppingBagIcon className="w-6 h-6" />
                  {home.hero.buttonText}
                  <ArrowRightIcon className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/30 to-white/0 -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
              </Link>

              <Link 
                to="/products"
                className="px-10 py-5 rounded-2xl font-bold border-2 bg-white hover:bg-gray-50 transition-all duration-300 hover:scale-105 shadow-md hover:shadow-lg text-lg"
                style={{ 
                  borderColor: colors.primary.hex,
                  color: colors.primary.hex
                }}
              >
                Ver Catálogo
              </Link>
            </div>
          </div>

          {/* COLUMNA DERECHA - Galería de productos con carrusel */}
          <div className="space-y-6 order-1 lg:order-2 relative">
            
            {loading ? (
              <div className="space-y-4">
                <div className="aspect-[4/3] rounded-3xl bg-gray-200 animate-pulse" />
                <div className="grid grid-cols-3 gap-4">
                  {[1, 2, 3].map((item) => (
                    <div key={item} className="aspect-square rounded-2xl bg-gray-200 animate-pulse" />
                  ))}
                </div>
              </div>
            ) : displayedProducts.length > 0 ? (
              <div className="relative">
                {/* Layout: Producto grande a la izquierda, productos pequeños en columna a la derecha */}
                <div className="flex gap-4">
                  {/* Producto principal (grande) - LADO IZQUIERDO */}
                  <div className="relative group overflow-hidden rounded-3xl flex-[2]">
                    {/* Badge flotante de destacado */}
                    <div 
                      className="absolute -top-3 -left-3 z-20 px-4 py-2 rounded-full font-bold text-white shadow-xl text-sm"
                      style={{ background: `linear-gradient(135deg, ${colors.secondary.hex}, ${colors.secondary.dark})` }}
                    >
                      ⭐ Destacado
                    </div>

                    <Link 
                      to={`/product/${displayedProducts[0].id}/parallax`}
                      className="block aspect-[4/3] overflow-hidden shadow-2xl hover:shadow-3xl transition-all duration-300 ring-4 ring-white"
                    >
                      <img
                        src={displayedProducts[0].images?.[0]?.image_url || '/placeholder-product.jpg'}
                        alt={displayedProducts[0].name}
                        className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    </Link>
                    
                    {/* Favorito en producto principal */}
                    <button
                      onClick={() => toggleFavorite(displayedProducts[0].id)}
                      className="absolute top-4 right-4 z-10 p-3 rounded-full bg-white shadow-xl transition-all hover:scale-110"
                    >
                      {isFavorite(displayedProducts[0].id) ? (
                        <HeartSolid className="w-6 h-6 text-red-500" />
                      ) : (
                        <HeartIcon className="w-6 h-6 text-gray-700" />
                      )}
                    </button>

                    {/* Precio destacado */}
                    <div 
                      className="absolute bottom-4 left-4 z-10 px-6 py-3 rounded-2xl font-black text-white shadow-xl text-2xl"
                      style={{ background: `linear-gradient(135deg, ${colors.primary.hex}, ${colors.primary.dark})` }}
                    >
                      ${displayedProducts[0].price}
                    </div>

                    {/* Info del producto principal - aparece en hover */}
                    <div className="absolute inset-x-0 bottom-0 p-6 text-white transform translate-y-full group-hover:translate-y-0 transition-transform duration-300 bg-gradient-to-t from-black via-black/90 to-transparent">
                      <h3 className="font-bold text-2xl mb-2">{displayedProducts[0].name}</h3>
                      <p className="text-sm text-gray-200 line-clamp-2">
                        {displayedProducts[0].description || 'Producto de alta calidad con garantía'}
                      </p>
                    </div>
                  </div>

                  {/* Productos pequeños (columna vertical) - LADO DERECHO */}
                  {displayedProducts.length > 1 && (
                    <div className="flex flex-col gap-4 flex-1">
                      {displayedProducts.slice(1, 4).map((product) => (
                        <Link
                          key={product.id}
                          to={`/product/${product.id}/parallax`}
                          className="group relative aspect-[4/3] rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all ring-2 ring-white"
                        >
                          <img
                            src={product.images?.[0]?.image_url || '/placeholder-product.jpg'}
                            alt={product.name}
                            className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity">
                            <div className="absolute bottom-0 left-0 right-0 p-3">
                              <p className="text-white text-xs font-bold truncate mb-1">{product.name}</p>
                              <p 
                                className="text-sm font-black"
                                style={{ color: colors.primary.hex }}
                              >
                                ${product.price}
                              </p>
                            </div>
                          </div>
                        </Link>
                      ))}
                    </div>
                  )}
                </div>

                {/* Controles del carrusel - ESTILO PREMIUM */}
                {totalSlides > 1 && (
                  <>
                    <button
                      onClick={prevSlide}
                      className="absolute left-4 top-1/3 -translate-y-1/2 p-4 rounded-full bg-white shadow-2xl transition-all hover:scale-110 z-10 hover:bg-gray-50"
                      style={{ color: colors.primary.hex }}
                    >
                      <ChevronLeftIcon className="w-6 h-6 font-bold" />
                    </button>
                    <button
                      onClick={nextSlide}
                      className="absolute right-4 top-1/3 -translate-y-1/2 p-4 rounded-full bg-white shadow-2xl transition-all hover:scale-110 z-10 hover:bg-gray-50"
                      style={{ color: colors.primary.hex }}
                    >
                      <ChevronRightIcon className="w-6 h-6 font-bold" />
                    </button>

                    {/* Indicadores de slide - MÁS GRANDES */}
                    <div className="flex justify-center gap-3 mt-6">
                      {Array.from({ length: totalSlides }).map((_, idx) => (
                        <button
                          key={idx}
                          onClick={() => {
                            setCurrentIndex(idx)
                            setIsAutoPlaying(false)
                          }}
                          className={`h-2.5 rounded-full transition-all shadow-md ${
                            idx === currentIndex ? 'w-12' : 'w-2.5'
                          }`}
                          style={{
                            backgroundColor: idx === currentIndex ? colors.primary.hex : '#d1d5db'
                          }}
                        />
                      ))}
                    </div>
                  </>
                )}
              </div>
            ) : null}
          </div>
        </div>
      </div>

      {/* Indicador de scroll - VISIBLE */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce hidden lg:block">
        <div className="flex flex-col items-center gap-2" style={{ color: colors.primary.hex }}>
          <span className="text-sm font-semibold">Descubre más</span>
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </div>
      </div>
    </section>
  )
}
