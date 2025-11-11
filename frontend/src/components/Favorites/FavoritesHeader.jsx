import { HeartIcon as HeartIconSolid } from '@heroicons/react/24/solid';

export default function FavoritesHeader({ favoriteCount, colors }) {
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

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="flex items-center justify-center gap-3 mb-4">
          <HeartIconSolid 
            className="w-12 h-12"
            style={{ color: colors.secondary.hex }}
          />
          <h1 className="text-5xl md:text-6xl font-extrabold drop-shadow-2xl">
            Mis Favoritos
          </h1>
        </div>
        <p className="text-xl text-gray-300 max-w-2xl mx-auto">
          {favoriteCount > 0 
            ? `Tienes ${favoriteCount} producto${favoriteCount !== 1 ? 's' : ''} guardado${favoriteCount !== 1 ? 's' : ''}`
            : 'Aún no tienes productos favoritos'
          }
        </p>
      </div>
    </section>
  );
}
