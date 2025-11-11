import { Link } from 'react-router-dom';
import { useFavorites } from '../context/FavoritesContext';
import { useCart } from '../context/CartContext';
import { useToast } from '../context/ToastContext';
import { useSiteConfig } from '../hooks/useSiteConfig';
import { ArrowRightIcon } from '@heroicons/react/24/outline';
import {
  LoadingSkeleton,
  FavoritesHeader,
  EmptyFavorites,
  FavoriteProductCard
} from '../components/Favorites';

export default function Favorites() {
  const { favorites, loading, toggleFavorite, favoriteCount } = useFavorites();
  const { addToCart } = useCart();
  const { showToast } = useToast();
  const config = useSiteConfig();
  const { theme } = config;
  const { colors } = theme;

  const handleAddToCart = (product) => {
    addToCart(product);
  };

  const handleRemoveFavorite = async (productId) => {
    const result = await toggleFavorite(productId);
    
    if (result.success && !result.isFavorite) {
      showToast('Producto eliminado de favoritos', 'favorite-removed');
    } else if (result.error) {
      showToast('Error al eliminar favorito', 'warning');
    }
  };

  if (loading) {
    return <LoadingSkeleton />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* Hero Header */}
      <FavoritesHeader favoriteCount={favoriteCount} colors={colors} />

      {/* Contenido */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {favorites.length === 0 ? (
          <EmptyFavorites colors={colors} />
        ) : (
          // Grid de productos favoritos
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {favorites.map((product) => (
              <FavoriteProductCard
                key={product.id}
                product={product}
                colors={colors}
                onRemoveFavorite={handleRemoveFavorite}
                onAddToCart={handleAddToCart}
              />
            ))}
          </div>
        )}

        {/* Link para seguir comprando */}
        {favorites.length > 0 && (
          <div className="text-center mt-12">
            <Link
              to="/products"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-full font-bold border-2 hover:shadow-xl transform hover:scale-105 transition-all"
              style={{ 
                borderColor: colors.primary.hex,
                color: colors.primary.hex
              }}
            >
              Seguir Explorando
              <ArrowRightIcon className="w-5 h-5" />
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
