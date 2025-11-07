import { useEffect, useState } from 'react'
import { FireIcon, SparklesIcon, HeartIcon } from '@heroicons/react/24/outline'
import { useFavorites } from '../context/FavoritesContext'
import { useToast } from '../context/ToastContext'
import { useSiteConfig } from '../hooks/useSiteConfig'
import api from '../services/api'
import HeroSection from '../components/home/HeroSection'
import FeaturesBar from '../components/home/FeaturesBar'
import CategoriesSection from '../components/home/CategoriesSection'
import ProductsGrid from '../components/home/ProductsGrid'
import RecentlyViewedSection from '../components/home/RecentlyViewedSection'

export default function Home() {
  const [allProducts, setAllProducts] = useState([])
  const [categories, setCategories] = useState([])
  const [loading, setLoading] = useState(true)
  const [categoriesLoading, setCategoriesLoading] = useState(true)
  
  const { favorites, toggleFavorite, isFavorite } = useFavorites()
  const { showToast } = useToast()
  const config = useSiteConfig()
  const { theme } = config
  const { colors } = theme

  useEffect(() => {
    fetchProducts()
    fetchCategories()
  }, [])

  const fetchCategories = async () => {
    try {
      const response = await api.get('/categories')
      setCategories(response.data)
    } catch (error) {
      console.error('Error al cargar categorías:', error)
    } finally {
      setCategoriesLoading(false)
    }
  }

  const fetchProducts = async () => {
    try {
      const response = await api.get('/products')
      setAllProducts(response.data)
    } catch (error) {
      console.error('Error al cargar productos:', error)
    } finally {
      setLoading(false)
    }
  }

  // Dividir productos en diferentes secciones
  const featuredProducts = allProducts.slice(0, 6)
  const trendingProducts = allProducts.slice(3, 9)
  const newProducts = allProducts.slice(0, 8)

  // Función para manejar el toggle de favoritos con toasts
  const handleToggleFavorite = async (productId) => {
    const result = await toggleFavorite(productId)
    
    if (result.needsLogin) {
      showToast('Debes iniciar sesión para agregar favoritos', 'warning')
    } else if (result.success) {
      if (result.isFavorite) {
        showToast('¡Producto agregado a favoritos!', 'favorite-added')
      } else {
        showToast('Producto eliminado de favoritos', 'favorite-removed')
      }
    } else if (result.error) {
      showToast('Error al actualizar favorito', 'warning')
    }
  }

  return (
    <div className="min-h-screen" style={{ background: '#e0f2fe' }}>
      {/* Hero Section - Con su propio fondo integrado */}
      <HeroSection 
        featuredProducts={featuredProducts}
        loading={loading}
      />

      {/* Categories Section - Fondo suave */}
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
          <CategoriesSection categories={categories} loading={categoriesLoading} />
        </div>
      </div>

      {/* Trending Products - Fondo oscuro y llamativo */}
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
            products={trendingProducts}
            loading={loading}
            showFavorite={true}
            onToggleFavorite={handleToggleFavorite}
            isFavorite={isFavorite}
            gradientColors={`linear-gradient(135deg, #ef4444, #f97316)`}
            darkMode={true}
          />
        </div>
      </div>

      {/* New Products - Fondo blanco limpio con borde */}
      <div 
        className="relative bg-white py-12"
      >
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
            title="✨ Nuevos Productos"
            subtitle="Recién llegados a nuestra tienda"
            icon={SparklesIcon}
            products={newProducts}
            loading={loading}
            showFavorite={true}
            onToggleFavorite={handleToggleFavorite}
            isFavorite={isFavorite}
            gradientColors={`linear-gradient(135deg, ${colors.primary.hex}, ${colors.secondary.hex})`}
          />
        </div>
      </div>

      {/* Favorites Section - Fondo suave */}
      {favorites.length > 0 && (
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
              onToggleFavorite={handleToggleFavorite}
              isFavorite={isFavorite}
            />
          </div>
        </div>
      )}

      {/* Features Bar antes de Recently Viewed */}
      <FeaturesBar />

      {/* Recently Viewed Section - Sin fondo de color */}
      <RecentlyViewedSection />
    </div>
  )
}
