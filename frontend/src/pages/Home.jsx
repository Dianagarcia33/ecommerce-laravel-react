import { useEffect, useState } from 'react';
import { useFavorites } from '../context/FavoritesContext';
import { useToast } from '../context/ToastContext';
import { useSiteConfig } from '../hooks/useSiteConfig';
import api from '../services/api';
import {
  HeroSection,
  FeaturesBar,
  CategoriesWrapper,
  TrendingSection,
  NewProductsSection,
  FavoritesSection,
  RecentlyViewedSection
} from '../components/home';

export default function Home() {
  const [allProducts, setAllProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [categoriesLoading, setCategoriesLoading] = useState(true);
  
  const { favorites, toggleFavorite, isFavorite } = useFavorites();
  const { showToast } = useToast();
  const config = useSiteConfig();
  const { theme } = config;
  const { colors } = theme;

  useEffect(() => {
    fetchProducts();
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const response = await api.get('/categories');
      setCategories(response.data);
    } catch (error) {
      console.error('Error al cargar categorías:', error);
    } finally {
      setCategoriesLoading(false);
    }
  };

  const fetchProducts = async () => {
    try {
      const response = await api.get('/products');
      setAllProducts(response.data);
    } catch (error) {
      console.error('Error al cargar productos:', error);
    } finally {
      setLoading(false);
    }
  };

  // Dividir productos en diferentes secciones
  const featuredProducts = allProducts.slice(0, 6);
  const trendingProducts = allProducts.slice(3, 9);
  const newProducts = allProducts.slice(0, 8);

  // Función para manejar el toggle de favoritos con toasts
  const handleToggleFavorite = async (productId) => {
    const result = await toggleFavorite(productId);
    
    if (result.needsLogin) {
      showToast('Debes iniciar sesión para agregar favoritos', 'warning');
    } else if (result.success) {
      if (result.isFavorite) {
        showToast('¡Producto agregado a favoritos!', 'favorite-added');
      } else {
        showToast('Producto eliminado de favoritos', 'favorite-removed');
      }
    } else if (result.error) {
      showToast('Error al actualizar favorito', 'warning');
    }
  };

  return (
    <div className="min-h-screen" style={{ background: '#e0f2fe' }}>
      {/* Hero Section */}
      <HeroSection 
        featuredProducts={featuredProducts}
        loading={loading}
      />

      {/* Categories Section */}
      <CategoriesWrapper 
        categories={categories} 
        loading={categoriesLoading}
        colors={colors}
      />

      {/* Trending Products */}
      <TrendingSection
        products={trendingProducts}
        loading={loading}
        onToggleFavorite={handleToggleFavorite}
        isFavorite={isFavorite}
        colors={colors}
      />

      {/* New Products */}
      <NewProductsSection
        products={newProducts}
        loading={loading}
        onToggleFavorite={handleToggleFavorite}
        isFavorite={isFavorite}
        colors={colors}
      />

      {/* Favorites Section */}
      <FavoritesSection
        favorites={favorites}
        onToggleFavorite={handleToggleFavorite}
        isFavorite={isFavorite}
        colors={colors}
      />

      {/* Features Bar */}
      <FeaturesBar />

      {/* Recently Viewed Section */}
      <RecentlyViewedSection />
    </div>
  );
}
