import { Link } from 'react-router-dom';
import { ArrowRightIcon, ShieldCheckIcon, TruckIcon, CheckBadgeIcon } from '@heroicons/react/24/outline';
import { useSiteConfig } from '../../hooks/useSiteConfig';

export default function CTASection() {
  const config = useSiteConfig();
  const { home, theme } = config;
  const { colors } = theme;

  const badgeIcons = {
    0: ShieldCheckIcon,
    1: TruckIcon,
    2: CheckBadgeIcon,
  };

  return (
    <section
      className="relative py-20 overflow-hidden"
      style={{
        background: `linear-gradient(135deg, ${colors.primary.hex}, ${colors.primary.dark})`
      }}
    >
      {/* Elementos decorativos de fondo */}
      <div className="absolute inset-0">
        <div className="absolute top-0 right-0 w-96 h-96 bg-white rounded-full opacity-10 blur-3xl animate-pulse" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-white rounded-full opacity-10 blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
      </div>

      {/* Patrón de puntos */}
      <div
        className="absolute inset-0 opacity-20"
        style={{
          backgroundImage: 'radial-gradient(rgba(255, 255, 255, 0.3) 1px, transparent 1px)',
          backgroundSize: '30px 30px'
        }}
      />

      <div className="relative w-full px-8 sm:px-12 lg:px-16 xl:px-24">
        <div className="max-w-4xl mx-auto text-center">
          {/* Título */}
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-black text-white mb-6">
            {home.cta.title}
          </h2>

          {/* Subtítulo */}
          <p className="text-lg md:text-xl text-white/90 mb-8 max-w-2xl mx-auto">
            {home.cta.subtitle}
          </p>

          {/* Badges */}
          <div className="flex flex-wrap items-center justify-center gap-4 mb-10">
            {home.cta.badges.map((badge, index) => {
              const IconComponent = badgeIcons[index] || ShieldCheckIcon;
              return (
                <div
                  key={index}
                  className="inline-flex items-center gap-2 px-6 py-3 bg-white/20 backdrop-blur-sm rounded-full border-2 border-white/30 text-white font-bold shadow-lg"
                >
                  <IconComponent className="w-5 h-5" />
                  {badge}
                </div>
              );
            })}
          </div>

          {/* Botones */}
          <div className="flex flex-wrap items-center justify-center gap-4">
            <Link
              to="/products"
              className="group inline-flex items-center gap-3 px-10 py-5 bg-white text-gray-900 rounded-full font-bold shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105"
            >
              {home.cta.primaryButton}
              <ArrowRightIcon className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>

            <Link
              to="/products"
              className="inline-flex items-center gap-3 px-10 py-5 bg-white/20 backdrop-blur-sm text-white border-2 border-white/50 rounded-full font-bold shadow-lg hover:shadow-xl hover:bg-white/30 transition-all duration-300 hover:scale-105"
            >
              {home.cta.secondaryButton}
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
