import { CheckCircleIcon } from '@heroicons/react/24/outline'

export default function FeatureSection({ 
  feature, 
  scrollY, 
  scrollOffset, 
  reversed = false,
  backgroundColor = 'bg-white'
}) {
  return (
    <section className={`relative min-h-screen flex items-center overflow-hidden ${backgroundColor}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Text Content */}
          <div 
            className={`space-y-8 ${reversed ? 'order-2 lg:order-2' : 'order-2 lg:order-1'}`}
            style={{
              transform: `translateX(${Math.max(0, (scrollY - scrollOffset) * (reversed ? 0.1 : -0.1))}px)`,
              opacity: Math.min(1, (scrollY - (scrollOffset - 200)) / 300)
            }}
          >
            <div className={`inline-flex items-center gap-2 px-4 py-2 ${feature.badgeColor} rounded-full`}>
              <feature.icon className={`w-6 h-6 ${feature.iconColor}`} />
              <span className={`${feature.textColor} font-bold`}>{feature.badgeText}</span>
            </div>
            <h2 className="text-6xl lg:text-7xl font-bold text-gray-900 leading-tight">
              {feature.title}
            </h2>
            <p className="text-2xl text-gray-600 leading-relaxed">
              {feature.description}
            </p>
            <div className="flex items-center gap-6 pt-8">
              <CheckCircleIcon className={`w-8 h-8 ${feature.checkColor} flex-shrink-0`} />
              <span className="text-xl text-gray-700">{feature.benefit1}</span>
            </div>
            <div className="flex items-center gap-6">
              <CheckCircleIcon className={`w-8 h-8 ${feature.checkColor} flex-shrink-0`} />
              <span className="text-xl text-gray-700">{feature.benefit2}</span>
            </div>
          </div>

          {/* Parallax Image */}
          <div 
            className={`relative ${reversed ? 'order-1 lg:order-1' : 'order-1 lg:order-2'}`}
            style={{
              transform: `translateY(${Math.max(0, (scrollY - scrollOffset) * 0.15)}px)`
            }}
          >
            <div className="relative rounded-3xl overflow-hidden shadow-2xl">
              <img
                src={feature.image}
                alt={feature.title}
                className="w-full h-[600px] object-cover"
              />
              <div className={`absolute inset-0 ${feature.gradientOverlay}`}></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
