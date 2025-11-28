import CategoriesSection from './CategoriesSection';
import { useSiteConfig } from '../../hooks/useSiteConfig';

export default function CategoriesWrapper({ categories, loading, colors }) {
  const config = useSiteConfig();
  return (
    <div
      className="relative"
      style={{
        background: 'linear-gradient(180deg, #ecfeff 0%, #f0fdfa 50%, #f7fee7 100%)'
      }}
    >
      {/* Patrón de puntos sutil */}
      <div
        className="absolute inset-0 opacity-15"
        style={{
          backgroundImage: `radial-gradient(${colors.primary.hex} 1px, transparent 1px)`,
          backgroundSize: '20px 20px'
        }}
      />
      <div className="relative">
        <CategoriesSection categories={categories} loading={loading} />
      </div>
    </div>
  );
}
