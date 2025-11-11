import { SparklesIcon } from '@heroicons/react/24/outline'
import { useSiteConfig } from '../../hooks/useSiteConfig'

export default function HeroHeader() {
  const { theme } = useSiteConfig()
  const { colors } = theme

  return (
    <section 
      className="relative text-white py-20 overflow-hidden"
      style={{ 
        background: `linear-gradient(135deg, #0f172a 0%, ${colors.primary.dark} 50%, ${colors.secondary.dark} 100%)`
      }}
    >
      <div className="absolute inset-0 opacity-15">
        <div 
          className="absolute top-0 right-0 w-96 h-96 rounded-full blur-3xl"
          style={{ backgroundColor: colors.secondary.hex }}
        ></div>
        <div 
          className="absolute bottom-0 left-0 w-96 h-96 rounded-full blur-3xl"
          style={{ backgroundColor: colors.primary.hex }}
        ></div>
      </div>

      <div className="relative w-full px-8 sm:px-12 lg:px-16 xl:px-24 text-center">
        <div 
          className="inline-flex items-center rounded-full px-4 py-2 mb-6 shadow-lg text-gray-900 font-bold"
          style={{ background: `linear-gradient(to right, ${colors.primary.hex}, ${colors.secondary.hex})` }}
        >
          <SparklesIcon className="w-5 h-5 mr-2" />
          <span className="text-sm">Catálogo Completo</span>
        </div>
        <h1 className="text-5xl md:text-6xl font-extrabold mb-4 drop-shadow-2xl">
          Nuestros Productos
        </h1>
        <p className="text-xl text-gray-300 max-w-2xl mx-auto">
          Descubre nuestra selección exclusiva de productos de alta calidad
        </p>
      </div>
    </section>
  )
}
