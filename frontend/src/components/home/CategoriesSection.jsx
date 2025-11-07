import { Link } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { 
  ComputerDesktopIcon,
  DevicePhoneMobileIcon,
  HomeIcon as HomeIconOutline,
  GiftIcon,
  ArrowRightIcon,
  ShoppingBagIcon,
  SparklesIcon,
  CubeIcon,
  BookOpenIcon,
  MusicalNoteIcon,
  PaintBrushIcon,
  WrenchScrewdriverIcon,
  HeartIcon,
  CakeIcon,
  TrophyIcon,
  ChevronLeftIcon,
  ChevronRightIcon
} from '@heroicons/react/24/outline'
import { useSiteConfig } from '../../hooks/useSiteConfig'

// Mapeo de iconos por categoría
const getIconForCategory = (categoryName) => {
  const name = categoryName.toLowerCase()
  
  if (name.includes('electr') || name.includes('tecnolog')) return ComputerDesktopIcon
  if (name.includes('móvil') || name.includes('celular') || name.includes('teléfono')) return DevicePhoneMobileIcon
  if (name.includes('hogar') || name.includes('casa')) return HomeIconOutline
  if (name.includes('regalo') || name.includes('gift')) return GiftIcon
  if (name.includes('deporte') || name.includes('fitness')) return TrophyIcon
  if (name.includes('música') || name.includes('audio')) return MusicalNoteIcon
  if (name.includes('arte') || name.includes('manualidad')) return PaintBrushIcon
  if (name.includes('herramienta') || name.includes('tool')) return WrenchScrewdriverIcon
  if (name.includes('libro') || name.includes('lectura')) return BookOpenIcon
  if (name.includes('salud') || name.includes('belleza')) return HeartIcon
  if (name.includes('comida') || name.includes('alimento')) return CakeIcon
  if (name.includes('juguete') || name.includes('niño')) return CubeIcon
  if (name.includes('moda') || name.includes('ropa')) return SparklesIcon
  
  // Icono por defecto
  return ShoppingBagIcon
}

// Colores para cada categoría (rotación)
const colorGradients = [
  'from-blue-500 to-cyan-500',
  'from-purple-500 to-pink-500',
  'from-green-500 to-emerald-500',
  'from-orange-500 to-red-500',
  'from-indigo-500 to-purple-500',
  'from-rose-500 to-pink-500',
  'from-teal-500 to-cyan-500',
  'from-amber-500 to-orange-500',
]

export default function CategoriesSection({ categories = [], loading = false }) {
  const config = useSiteConfig()
  const { theme } = config
  const { colors } = theme

  const [currentIndex, setCurrentIndex] = useState(0)
  const [isAutoPlaying, setIsAutoPlaying] = useState(true)
  
  // Número de categorías visibles por slide (4 en desktop, 2 en mobile)
  const categoriesPerSlide = 8
  const totalSlides = Math.max(1, Math.ceil(categories.length / categoriesPerSlide))
  
  // Auto-play: cambiar cada 5 segundos
  useEffect(() => {
    if (!isAutoPlaying || loading || categories.length <= categoriesPerSlide) return
    
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % totalSlides)
    }, 5000)
    
    return () => clearInterval(interval)
  }, [isAutoPlaying, loading, categories.length, totalSlides, categoriesPerSlide])

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % totalSlides)
    setIsAutoPlaying(false)
  }

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + totalSlides) % totalSlides)
    setIsAutoPlaying(false)
  }

  // Obtener categorías del slide actual
  const getDisplayedCategories = () => {
    if (categories.length === 0) return []
    const startIdx = currentIndex * categoriesPerSlide
    return categories.slice(startIdx, startIdx + categoriesPerSlide)
  }

  const displayedCategories = getDisplayedCategories()

  return (
    <section className="py-16" style={{ background: 'transparent' }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl lg:text-4xl font-black text-gray-900 mb-4">
            Explora por{' '}
            <span 
              className="bg-gradient-to-r bg-clip-text text-transparent"
              style={{ 
                backgroundImage: `linear-gradient(135deg, ${colors.primary.hex}, ${colors.secondary.hex})`
              }}
            >
              Categorías
            </span>
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Encuentra exactamente lo que buscas navegando por nuestras categorías especializadas
          </p>
        </div>

        {loading ? (
          // Skeleton loading
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
              <div key={i} className="rounded-2xl p-8 bg-gray-100 animate-pulse">
                <div className="w-16 h-16 mx-auto rounded-2xl bg-gray-200 mb-4" />
                <div className="h-4 bg-gray-200 rounded mx-auto w-24 mb-2" />
                <div className="h-3 bg-gray-200 rounded mx-auto w-16" />
              </div>
            ))}
          </div>
        ) : displayedCategories.length > 0 ? (
          <div className="relative">
            {/* Grid de categorías */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {displayedCategories.map((category, index) => {
                const Icon = getIconForCategory(category.name)
                const colorGradient = colorGradients[index % colorGradients.length]
                
                return (
                  <Link
                    key={category.id}
                    to={`/products?category=${category.id}`}
                    className="group relative overflow-hidden rounded-2xl p-8 bg-white border-2 border-gray-100 hover:border-transparent hover:shadow-2xl transition-all duration-300"
                  >
                    <div className={`absolute inset-0 bg-gradient-to-br ${colorGradient} opacity-0 group-hover:opacity-10 transition-opacity`} />
                    <div className="relative z-10 text-center space-y-4">
                      <div className={`w-16 h-16 mx-auto rounded-2xl bg-gradient-to-br ${colorGradient} flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform`}>
                        <Icon className="w-8 h-8 text-white" />
                      </div>
                      <div>
                        <h3 className="font-bold text-gray-900 mb-1">{category.name}</h3>
                        <p className="text-sm text-gray-500">
                          {category.products_count || 0} producto{category.products_count !== 1 ? 's' : ''}
                        </p>
                      </div>
                      <div className="flex items-center justify-center gap-2 text-sm font-semibold opacity-0 group-hover:opacity-100 transition-opacity" style={{ color: colors.primary.hex }}>
                        Ver todo
                        <ArrowRightIcon className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                      </div>
                    </div>
                  </Link>
                )
              })}
            </div>

            {/* Controles del carrusel - Solo si hay más de 8 categorías */}
            {categories.length > categoriesPerSlide && (
              <>
                {/* Botones de navegación */}
                <button
                  onClick={prevSlide}
                  className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 lg:-translate-x-6 w-12 h-12 rounded-full flex items-center justify-center transition-all hover:scale-110 shadow-xl z-10"
                  style={{ background: colors.primary.hex }}
                  aria-label="Categorías anteriores"
                >
                  <ChevronLeftIcon className="w-6 h-6 text-white" />
                </button>

                <button
                  onClick={nextSlide}
                  className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 lg:translate-x-6 w-12 h-12 rounded-full flex items-center justify-center transition-all hover:scale-110 shadow-xl z-10"
                  style={{ background: colors.primary.hex }}
                  aria-label="Categorías siguientes"
                >
                  <ChevronRightIcon className="w-6 h-6 text-white" />
                </button>

                {/* Indicadores de slides */}
                <div className="flex items-center justify-center gap-2 mt-8">
                  {Array.from({ length: totalSlides }).map((_, idx) => (
                    <button
                      key={idx}
                      onClick={() => {
                        setCurrentIndex(idx)
                        setIsAutoPlaying(false)
                      }}
                      className="transition-all rounded-full"
                      style={{
                        width: currentIndex === idx ? '32px' : '8px',
                        height: '8px',
                        background: currentIndex === idx ? colors.primary.hex : '#d1d5db'
                      }}
                      aria-label={`Ir a grupo ${idx + 1}`}
                    />
                  ))}
                </div>

                {/* Botón para reanudar auto-play */}
                {!isAutoPlaying && (
                  <div className="text-center mt-4">
                    <button
                      onClick={() => setIsAutoPlaying(true)}
                      className="inline-flex items-center gap-2 text-xs text-gray-500 hover:text-gray-700 transition-colors"
                    >
                      <SparklesIcon className="w-4 h-4" />
                      Reanudar rotación automática
                    </button>
                  </div>
                )}
              </>
            )}
          </div>
        ) : (
          // Sin categorías
          <div className="text-center py-12">
            <ShoppingBagIcon className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <p className="text-gray-500">No hay categorías disponibles</p>
          </div>
        )}
      </div>
    </section>
  )
}
