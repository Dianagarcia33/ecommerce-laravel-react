import { RocketLaunchIcon, TrophyIcon, TagIcon } from '@heroicons/react/24/outline'
import { useSiteConfig } from '../../hooks/useSiteConfig'

export default function FeaturesBar() {
  const config = useSiteConfig()
  const { theme } = config
  const { colors } = theme

  const features = [
    {
      icon: RocketLaunchIcon,
      title: 'Envío Express',
      description: '24-48 horas',
      color: colors.primary.hex
    },
    {
      icon: TrophyIcon,
      title: 'Calidad Premium',
      description: 'Garantía total',
      color: colors.secondary.hex
    },
    {
      icon: TagIcon,
      title: 'Mejores Precios',
      description: 'Ofertas diarias',
      color: colors.primary.dark
    }
  ]

  return (
    <section 
      className="py-16 relative overflow-hidden"
      style={{ 
        backgroundColor: '#0f172a' // Mismo color que el navbar
      }}
    >
      {/* Elementos decorativos de fondo */}
      <div className="absolute inset-0 opacity-10">
        <div 
          className="absolute top-0 left-1/4 w-96 h-96 rounded-full blur-3xl" 
          style={{ backgroundColor: colors.primary.hex }}
        />
        <div 
          className="absolute bottom-0 right-1/4 w-96 h-96 rounded-full blur-3xl"
          style={{ backgroundColor: colors.secondary.hex }}
        />
      </div>

      <div className="relative w-full px-8 sm:px-12 lg:px-16 xl:px-24">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <div 
              key={index} 
              className="group flex items-center gap-4 p-6 rounded-2xl bg-white/10 backdrop-blur-lg border border-white/20 hover:bg-white/20 hover:border-white/30 shadow-xl hover:shadow-2xl transition-all duration-300 relative overflow-hidden"
            >
              {/* Background animated gradient */}
              <div 
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                style={{
                  background: `linear-gradient(135deg, ${feature.color}30, ${feature.color}10)`
                }}
              />
              
              {/* Icon */}
              <div 
                className="relative flex-shrink-0 w-14 h-14 rounded-xl flex items-center justify-center shadow-lg group-hover:scale-110 group-hover:rotate-6 transition-all duration-300 bg-white/20 backdrop-blur-sm border border-white/30"
              >
                <feature.icon className="w-7 h-7 text-white" />
              </div>
              
              {/* Content */}
              <div className="relative flex-1">
                <h3 className="font-bold text-white text-lg mb-0.5 group-hover:translate-x-1 transition-transform">
                  {feature.title}
                </h3>
                <p className="text-sm text-gray-200 font-medium">
                  {feature.description}
                </p>
              </div>

              {/* Arrow indicator on hover */}
              <div 
                className="relative opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-x-2 group-hover:translate-x-0 text-white"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
