import { useState, useEffect } from 'react'
import { useCart } from '../context/CartContext'
import { useFavorites } from '../context/FavoritesContext'
import { useToast } from '../context/ToastContext'
import api from '../services/api'
import {
  HeroHeader,
  SearchBar,
  CategoryFilter,
  LoadingSkeleton,
  ErrorMessage,
  EmptyState,
  ProductGrid
} from '../components/Products'



export default function Products() {
  const [products, setProducts] = useState([])
  const [categories, setCategories] = useState([])
  const [selectedCategory, setSelectedCategory] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [searchTerm, setSearchTerm] = useState('')
  const { addToCart } = useCart()
  const { toggleFavorite, isFavorite } = useFavorites()
  const { showToast } = useToast()

  useEffect(() => {
    fetchCategories()
    fetchProducts()
  }, [selectedCategory])

  const fetchCategories = async () => {
    try {
      const response = await api.get('/categories')
      setCategories(response.data)
    } catch (err) {
      console.error('Error al cargar categorías:', err)
    }
  }

  const fetchProducts = async () => {
    try {
      setLoading(true)
      const url = selectedCategory
        ? `/products?category=${selectedCategory}`
        : '/products'
      const response = await api.get(url)
      setProducts(response.data)
    } catch (err) {
      setError('Error al cargar productos')
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  const handleAddToCart = (product) => {
    addToCart(product)
    showToast('Producto agregado al carrito', 'success')
  }

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

  const filteredProducts = products.filter(product =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      <HeroHeader />

      <div className="w-full px-8 sm:px-12 lg:px-16 xl:px-24 py-12">
        {/* Barra de búsqueda y filtros */}
        <div className="mb-8 space-y-4">
          <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
          <CategoryFilter
            categories={categories}
            selectedCategory={selectedCategory}
            setSelectedCategory={setSelectedCategory}
          />
        </div>

        {/* Contenido */}
        {loading ? (
          <LoadingSkeleton />
        ) : error ? (
          <ErrorMessage message={error} />
        ) : filteredProducts.length === 0 ? (
          <EmptyState />
        ) : (
          <ProductGrid
            products={filteredProducts}
            onAddToCart={handleAddToCart}
            onToggleFavorite={handleToggleFavorite}
            isFavorite={isFavorite}
          />
        )}
      </div>

      <style>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        @keyframes shimmer {
          0% {
            background-position: -200% 0;
          }
          100% {
            background-position: 200% 0;
          }
        }
        
        .animate-shimmer {
          animation: shimmer 2s infinite linear;
        }
      `}</style>
    </div>
  )
}
