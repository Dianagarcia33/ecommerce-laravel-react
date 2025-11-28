import { SparklesIcon } from '@heroicons/react/24/outline';
import { useSiteConfig } from '../../hooks/useSiteConfig';
import ProductsGrid from './ProductsGrid';

export default function NewProductsSection({ products, loading, onToggleFavorite, isFavorite, colors }) {
  const config = useSiteConfig();
  return (
    <div className="relative bg-white py-12">
      {/* Borde superior decorativo con gradiente */}
      <div
        className="absolute top-0 left-0 right-0 h-1"
        style={{
          background: `linear-gradient(90deg, ${colors.primary.hex}, ${colors.secondary.hex}, ${colors.primary.hex})`
        }}
      />

      {/* Elementos decorativos sutiles */}
      <div className="absolute top-10 right-10 w-32 h-32 opacity-5">
        <SparklesIcon className="w-full h-full" style={{ color: colors.secondary.hex }} />
      </div>
      <div className="absolute bottom-10 left-10 w-32 h-32 opacity-5">
        <SparklesIcon className="w-full h-full" style={{ color: colors.primary.hex }} />
      </div>

      <div className="relative">
        <ProductsGrid
          title={config.home.sections.newProducts.title}
          subtitle={config.home.sections.newProducts.subtitle}
          icon={SparklesIcon}
          products={products}
          loading={loading}
          showFavorite={true}
          onToggleFavorite={onToggleFavorite}
          isFavorite={isFavorite}
          gradientColors={`linear-gradient(135deg, ${colors.primary.hex}, ${colors.secondary.hex})`}
        />
      </div>
    </div>
  );
}
