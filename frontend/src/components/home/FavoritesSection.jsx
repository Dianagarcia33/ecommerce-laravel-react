import { HeartIcon } from '@heroicons/react/24/outline';
import ProductsGrid from './ProductsGrid';

export default function FavoritesSection({ favorites, onToggleFavorite, isFavorite, colors }) {
  if (favorites.length === 0) return null;

  return (
    <div 
      className="relative"
      style={{
        background: 'linear-gradient(135deg, #e0f2fe, #ecfccb)'
      }}
    >
      {/* Patrón de cuadrícula */}
      <div 
        className="absolute inset-0 opacity-10"
        style={{
          backgroundImage: `linear-gradient(${colors.primary.hex} 1px, transparent 1px), linear-gradient(90deg, ${colors.primary.hex} 1px, transparent 1px)`,
          backgroundSize: '50px 50px'
        }}
      />
      <div className="relative">
        <ProductsGrid 
          title="❤️ Tus Favoritos"
          subtitle="Productos que te encantan"
          icon={HeartIcon}
          products={favorites}
          loading={false}
          showFavorite={true}
          onToggleFavorite={onToggleFavorite}
          isFavorite={isFavorite}
        />
      </div>
    </div>
  );
}
