import { useSiteConfig } from '../../hooks/useSiteConfig';

export default function StatsSection() {
  const config = useSiteConfig();
  const { home, theme } = config;
  const { colors } = theme;

  return (
    <section className="py-16 relative overflow-hidden bg-white">
      {/* Elementos decorativos de fondo */}
      <div className="absolute inset-0 opacity-5">
        <div
          className="absolute top-0 right-1/4 w-96 h-96 rounded-full blur-3xl"
          style={{ backgroundColor: colors.primary.hex }}
        />
        <div
          className="absolute bottom-0 left-1/4 w-96 h-96 rounded-full blur-3xl"
          style={{ backgroundColor: colors.secondary.hex }}
        />
      </div>

      <div className="relative w-full px-8 sm:px-12 lg:px-16 xl:px-24">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12">
          {home.stats.map((stat, index) => (
            <div
              key={index}
              className="group text-center transform hover:scale-110 transition-all duration-300"
            >
              {/* Número */}
              <div
                className="text-4xl md:text-5xl lg:text-6xl font-black mb-2 bg-gradient-to-br bg-clip-text text-transparent"
                style={{
                  backgroundImage: `linear-gradient(135deg, ${colors.primary.hex}, ${colors.secondary.hex})`
                }}
              >
                {stat.number}
              </div>

              {/* Label */}
              <div className="text-sm md:text-base font-semibold text-gray-600 uppercase tracking-wider">
                {stat.label}
              </div>

              {/* Decoración inferior */}
              <div className="mt-4 h-1 w-12 mx-auto rounded-full transition-all duration-300 group-hover:w-20"
                style={{
                  backgroundColor: index % 2 === 0 ? colors.primary.hex : colors.secondary.hex
                }}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
