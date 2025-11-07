import { Link } from 'react-router-dom'
import { ArrowRightIcon, FireIcon, SparklesIcon, HeartIcon, ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/outline'
import { useSiteConfig } from '../../hooks/useSiteConfig'
import ProductCard from './ProductCard'
import { useRef, useEffect, useState } from 'react'

export default function ProductsGrid({ 
  title, 
  subtitle, 
  icon: Icon = SparklesIcon,
  products, 
  loading,
  showFavorite = true,
  onToggleFavorite,
  isFavorite,
  gradientColors,
  darkMode = false
}) {
  const config = useSiteConfig()
  const { theme } = config
  const { colors } = theme
  const scrollContainerRef = useRef(null)
  const [canScrollLeft, setCanScrollLeft] = useState(false)
  const [canScrollRight, setCanScrollRight] = useState(true)
  const [isAutoScrolling, setIsAutoScrolling] = useState(true)

  const defaultGradient = `linear-gradient(135deg, ${colors.primary.hex}, ${colors.secondary.hex})`

  // Auto scroll
  useEffect(() => {
    if (!isAutoScrolling || loading || !scrollContainerRef.current) return

    const interval = setInterval(() => {
      const container = scrollContainerRef.current
      if (!container) return

      const maxScroll = container.scrollWidth - container.clientWidth
      const currentScroll = container.scrollLeft

      if (currentScroll >= maxScroll - 10) {
        // Si llegó al final, volver al inicio
        container.scrollTo({ left: 0, behavior: 'smooth' })
      } else {
        // Scroll gradual
        container.scrollBy({ left: 300, behavior: 'smooth' })
      }
    }, 3000) // Cambiar cada 3 segundos

    return () => clearInterval(interval)
  }, [isAutoScrolling, loading])

  // Detectar posición del scroll
  useEffect(() => {
    const container = scrollContainerRef.current
    if (!container) return

    const handleScroll = () => {
      setCanScrollLeft(container.scrollLeft > 0)
      setCanScrollRight(
        container.scrollLeft < container.scrollWidth - container.clientWidth - 10
      )
    }

    container.addEventListener('scroll', handleScroll)
    handleScroll() // Check inicial

    return () => container.removeEventListener('scroll', handleScroll)
  }, [products])

  const scroll = (direction) => {
    const container = scrollContainerRef.current
    if (!container) return

    setIsAutoScrolling(false) // Pausar auto-scroll al usar botones
    
    const maxScroll = container.scrollWidth - container.clientWidth
    const currentScroll = container.scrollLeft

    if (direction === 'right') {
      // Si está al final o muy cerca, volver al inicio
      if (currentScroll >= maxScroll - 10) {
        container.scrollTo({ left: 0, behavior: 'smooth' })
      } else {
        container.scrollBy({ left: 400, behavior: 'smooth' })
      }
    } else {
      // Si está al inicio, ir al final
      if (currentScroll <= 10) {
        container.scrollTo({ left: maxScroll, behavior: 'smooth' })
      } else {
        container.scrollBy({ left: -400, behavior: 'smooth' })
      }
    }

    // Reanudar auto-scroll después de 5 segundos
    setTimeout(() => setIsAutoScrolling(true), 5000)
  }

  return (
    <section className="py-12 relative overflow-hidden">
      {/* Background decorativo - Ya no blanco */}
      <div className="absolute inset-0" style={{ opacity: 0 }} />
      
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header con diseño magazine */}
        <div className="mb-8 relative">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4">
            {/* Lado izquierdo - Título */}
            <div className="space-y-2">
              <div className="flex items-center gap-3">
                <div 
                  className="w-10 h-10 rounded-full flex items-center justify-center shadow-xl animate-pulse"
                  style={{ background: gradientColors || defaultGradient }}
                >
                  <Icon className="w-5 h-5 text-white" />
                </div>
                <div className={`h-px flex-1 max-w-[100px] bg-gradient-to-r ${darkMode ? 'from-gray-600 to-transparent' : 'from-gray-300 to-transparent'}`} />
              </div>
              <h2 className={`text-3xl lg:text-4xl font-black leading-tight ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                {title}
              </h2>
              {subtitle && (
                <p className={`text-base font-medium max-w-2xl ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                  {subtitle}
                </p>
              )}
            </div>

            {/* Lado derecho - Ver todos (desktop) */}
            <Link
              to="/products"
              className="hidden md:inline-flex items-center gap-2 px-6 py-3 rounded-full font-bold text-white shadow-2xl hover:shadow-3xl transform hover:scale-105 hover:-translate-y-1 transition-all duration-300 group"
              style={{ background: gradientColors || defaultGradient }}
            >
              <span>Ver todos</span>
              <ArrowRightIcon className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
          
          {/* Línea decorativa */}
          <div 
            className="mt-6 h-1 rounded-full"
            style={{ 
              background: `linear-gradient(to right, ${colors.primary.hex}, ${colors.secondary.hex}, transparent)`,
              width: '200px'
            }}
          />
        </div>

        {/* Products Grid con estilo tarjetas elevadas */}
        <div className="relative">
          {/* Botón Izquierda */}
          {canScrollLeft && !loading && (
            <button
              onClick={() => scroll('left')}
              className="absolute left-0 top-1/2 -translate-y-1/2 z-10 w-12 h-12 bg-white rounded-full shadow-2xl flex items-center justify-center hover:scale-110 transition-transform group"
              style={{ marginLeft: '-24px' }}
            >
              <ChevronLeftIcon className="w-6 h-6 text-gray-700 group-hover:text-cyan-600" />
            </button>
          )}

          {/* Botón Derecha */}
          {canScrollRight && !loading && (
            <button
              onClick={() => scroll('right')}
              className="absolute right-0 top-1/2 -translate-y-1/2 z-10 w-12 h-12 bg-white rounded-full shadow-2xl flex items-center justify-center hover:scale-110 transition-transform group"
              style={{ marginRight: '-24px' }}
            >
              <ChevronRightIcon className="w-6 h-6 text-gray-700 group-hover:text-cyan-600" />
            </button>
          )}

          {/* Contenedor Scroll Horizontal */}
          <div
            ref={scrollContainerRef}
            className="overflow-x-auto hide-scrollbar scroll-smooth"
            onMouseEnter={() => setIsAutoScrolling(false)}
            onMouseLeave={() => setIsAutoScrolling(true)}
          >
            <div className="flex gap-6 pb-4">
              {loading ? (
                // Skeleton loading mejorado
                Array(6).fill(0).map((_, i) => (
                  <div key={i} className="flex-shrink-0 w-72 group">
                    <div className="bg-white rounded-3xl overflow-hidden shadow-lg">
                      <div className="aspect-square bg-gradient-to-br from-gray-200 to-gray-300 animate-pulse" />
                      <div className="p-5 space-y-3">
                        <div className="h-5 bg-gray-200 rounded-lg animate-pulse w-3/4" />
                        <div className="h-4 bg-gray-200 rounded-lg animate-pulse w-1/2" />
                        <div className="h-7 bg-gray-200 rounded-lg animate-pulse w-2/5" />
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                products.map((product, index) => (
                  <div
                    key={product.id}
                    className="flex-shrink-0 w-72 group animate-fadeIn"
                    style={{ animationDelay: `${index * 100}ms` }}
                  >
                    <ProductCard
                      product={product}
                      showFavorite={showFavorite}
                      onToggleFavorite={onToggleFavorite}
                      isFavorite={isFavorite}
                    />
                  </div>
                ))
              )}
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

        {/* Ver todos button (mobile) con estilo mejorado */}
        <div className="mt-8 text-center md:hidden">
          <Link
            to="/products"
            className="inline-flex items-center gap-3 px-8 py-4 rounded-full font-bold text-white shadow-2xl hover:shadow-3xl transform hover:scale-105 transition-all duration-300 group text-base"
            style={{ background: gradientColors || defaultGradient }}
          >
            <span>Ver todos los productos</span>
            <ArrowRightIcon className="w-5 h-5 group-hover:translate-x-2 transition-transform" />
          </Link>
        </div>

        {/* Contador de productos */}
        {!loading && products.length > 0 && (
          <div className="mt-6 text-center">
            <p className={`text-sm font-medium ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
              Mostrando {products.length} de muchos productos increíbles
            </p>
          </div>
        )}
      </div>

      {/* Elemento decorativo inferior */}
      <div 
        className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-64 h-64 rounded-full blur-3xl opacity-20 pointer-events-none"
        style={{ background: colors.secondary.hex }}
      />
    </section>
  )
}
