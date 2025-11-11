import { FireIcon } from '@heroicons/react/24/outline';
import ProductsGrid from './ProductsGrid';

export default function TrendingSection({ products, loading, onToggleFavorite, isFavorite, colors }) {
  return (
    <div 
      className="relative overflow-hidden"
      style={{
        background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 50%, #334155 100%)'
      }}
    >
      {/* Círculos de color brillante */}
      <div 
        className="absolute top-0 right-0 w-96 h-96 rounded-full blur-3xl opacity-20"
        style={{ background: colors.primary.hex }}
      />
      <div 
        className="absolute bottom-0 left-0 w-96 h-96 rounded-full blur-3xl opacity-20"
        style={{ background: colors.secondary.hex }}
      />
      {/* Patrón de estrellas/puntos */}
      <div 
        className="absolute inset-0 opacity-10"
        style={{
          backgroundImage: `radial-gradient(${colors.secondary.hex} 2px, transparent 2px)`,
          backgroundSize: '50px 50px'
        }}
      />
      <div className="relative">
        <ProductsGrid 
          title="🔥 Productos en Tendencia"
          subtitle="Los más populares de la semana"
          icon={FireIcon}
          products={products}
          loading={loading}
          showFavorite={true}
          onToggleFavorite={onToggleFavorite}
          isFavorite={isFavorite}
          gradientColors="linear-gradient(135deg, #ef4444, #f97316)"
          darkMode={true}
        />
      </div>
    </div>
  );
}
