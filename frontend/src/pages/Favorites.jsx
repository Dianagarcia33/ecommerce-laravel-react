import { Link } from 'react-router-dom'
import { useFavorites } from '../context/FavoritesContext'
import { useCart } from '../context/CartContext'
import { useToast } from '../context/ToastContext'
import { useSiteConfig } from '../hooks/useSiteConfig'
import {
  HeartIcon,
  ShoppingCartIcon,
  TrashIcon,
  ArrowRightIcon,
  SparklesIcon
} from '@heroicons/react/24/outline'
import { HeartIcon as HeartIconSolid } from '@heroicons/react/24/solid'

export default function Favorites() {
  const { favorites, loading, toggleFavorite, favoriteCount } = useFavorites()
  const { addToCart } = useCart()
  const { showToast } = useToast()
  const config = useSiteConfig()
  const { theme } = config
  const { colors } = theme

  const handleAddToCart = (product) => {
    addToCart(product)
  }

  const handleRemoveFavorite = async (productId) => {
    const result = await toggleFavorite(productId)
    
    if (result.success && !result.isFavorite) {
      showToast('Producto eliminado de favoritos', 'favorite-removed')
    } else if (result.error) {
      showToast('Error al eliminar favorito', 'warning')
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
              <div key={i} className="bg-white rounded-2xl shadow-md overflow-hidden animate-pulse">
                <div className="w-full h-56 bg-gray-200"></div>
                <div className="p-5 space-y-3">
                  <div className="h-5 bg-gray-200 rounded w-4/5"></div>
                  <div className="h-3 bg-gray-200 rounded w-full"></div>
                  <div className="h-8 bg-gray-200 rounded w-20"></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* Hero Header */}
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

      {/* Contenido */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {favorites.length === 0 ? (
          // Estado vacío
          <div className="text-center py-20">
            <div className="bg-white rounded-3xl shadow-xl p-12 max-w-md mx-auto">
              <HeartIcon className="w-24 h-24 mx-auto text-gray-300 mb-6" />
              <h2 className="text-2xl font-bold text-gray-900 mb-3">
                No tienes favoritos aún
              </h2>
              <p className="text-gray-600 mb-8">
                Explora nuestro catálogo y guarda tus productos favoritos para encontrarlos fácilmente después
              </p>
              <Link
                to="/products"
                className="inline-flex items-center gap-2 px-8 py-4 rounded-full font-bold text-white shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all"
                style={{ background: `linear-gradient(135deg, ${colors.primary.hex}, ${colors.secondary.hex})` }}
              >
                <SparklesIcon className="w-6 h-6" />
                Explorar Productos
                <ArrowRightIcon className="w-5 h-5" />
              </Link>
            </div>
          </div>
        ) : (
          // Grid de productos favoritos
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {favorites.map((product) => (
              <div
                key={product.id}
                className="group bg-white rounded-2xl shadow-md hover:shadow-2xl transition-all duration-300 overflow-hidden transform hover:-translate-y-2"
              >
                {/* Imagen del producto */}
                <div className="relative overflow-hidden bg-gray-100">
                  <Link to={`/product/${product.id}/parallax`}>
                    <img
                      src={product.images?.[0]?.image_url || 'https://via.placeholder.com/400'}
                      alt={product.name}
                      className="w-full h-56 object-cover transform group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                  </Link>

                  {/* Botón eliminar favorito */}
                  <button
                    onClick={() => handleRemoveFavorite(product.id)}
                    className="absolute top-3 right-3 w-10 h-10 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center shadow-lg hover:bg-red-500 hover:text-white transition-all z-10 group/btn"
                    title="Eliminar de favoritos"
                  >
                    <HeartIconSolid className="w-6 h-6 text-red-500 group-hover/btn:text-white" />
                  </button>

                  {/* Badge de stock */}
                  {product.stock < 10 && product.stock > 0 && (
                    <div className="absolute top-3 left-3 bg-yellow-400 text-gray-900 text-xs font-bold px-3 py-1 rounded-full shadow-lg">
                      ¡Últimas {product.stock}!
                    </div>
                  )}
                  {product.stock === 0 && (
                    <div className="absolute top-3 left-3 bg-red-500 text-white text-xs font-bold px-3 py-1 rounded-full shadow-lg">
                      Agotado
                    </div>
                  )}
                </div>

                {/* Contenido */}
                <div className="p-5">
                  <Link to={`/product/${product.id}/parallax`}>
                    <h3 className="text-lg font-bold text-gray-900 mb-2 hover:text-opacity-80 transition-colors line-clamp-2 min-h-[56px]">
                      {product.name}
                    </h3>
                  </Link>

                  <p className="text-gray-600 text-sm mb-4 line-clamp-2 min-h-[40px]">
                    {product.description}
                  </p>

                  {/* Precio y botón */}
                  <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                    <div>
                      <span 
                        className="text-2xl font-extrabold"
                        style={{ color: colors.primary.hex }}
                      >
                        ${parseFloat(product.price).toFixed(2)}
                      </span>
                    </div>
                    <button
                      onClick={() => handleAddToCart(product)}
                      disabled={product.stock === 0}
                      className={`flex items-center gap-2 px-4 py-2 rounded-full font-bold transition-all duration-300 transform hover:scale-105 shadow-md ${
                        product.stock === 0
                          ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                          : 'text-white hover:shadow-lg'
                      }`}
                      style={product.stock > 0 ? { 
                        background: colors.secondary.hex
                      } : {}}
                    >
                      <ShoppingCartIcon className="w-5 h-5" />
                      <span className="hidden sm:inline">Agregar</span>
                    </button>
                  </div>
                </div>
              </div>
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
  )
}
