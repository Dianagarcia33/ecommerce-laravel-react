import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useCart } from '../context/CartContext'
import { 
  ShoppingCartIcon, 
  FunnelIcon, 
  MagnifyingGlassIcon,
  SparklesIcon,
  TagIcon
} from '@heroicons/react/24/outline'
import api from '../services/api'



export default function Products() {
  const [products, setProducts] = useState([])
  const [categories, setCategories] = useState([])
  const [selectedCategory, setSelectedCategory] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [searchTerm, setSearchTerm] = useState('')
  const { addToCart } = useCart()

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
    // Mostrar notificación visual
    const button = event.target
    button.innerHTML = '✓ Agregado'
    button.classList.add('bg-green-500')
    setTimeout(() => {
      button.innerHTML = '<svg class="w-5 h-5 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"></path></svg>Agregar'
      button.classList.remove('bg-green-500')
    }, 2000)
  }

  const filteredProducts = products.filter(product =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* Hero Header */}
      <section className="relative bg-gradient-to-br from-slate-900 via-cyan-900 to-teal-900 text-white py-20 overflow-hidden">
        <div className="absolute inset-0 opacity-15">
          <div className="absolute top-0 right-0 w-96 h-96 bg-lime-400 rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-cyan-400 rounded-full blur-3xl"></div>
        </div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center bg-gradient-to-r from-cyan-400 to-lime-400 rounded-full px-4 py-2 mb-6 shadow-lg text-gray-900 font-bold">
            <SparklesIcon className="w-5 h-5 mr-2" />
            <span className="text-sm">Catálogo Completo</span>
          </div>
          <h1 className="text-5xl md:text-6xl font-extrabold mb-4 drop-shadow-2xl">
            Nuestros Productos
          </h1>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Descubre nuestra selección exclusiva de productos de alta calidad
          </p>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Barra de búsqueda y filtros */}
        <div className="mb-8 space-y-4">
          {/* Búsqueda */}
          <div className="relative max-w-xl mx-auto">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <MagnifyingGlassIcon className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              placeholder="Buscar productos..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:border-cyan-400 focus:ring-2 focus:ring-cyan-200 transition-all outline-none"
            />
          </div>

          {/* Filtros por categoría */}
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2 text-gray-600 font-medium">
              <FunnelIcon className="w-5 h-5" />
              <span>Filtrar:</span>
            </div>
            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => setSelectedCategory(null)}
                className={`px-5 py-2 rounded-full font-medium transition-all duration-300 transform hover:scale-105 ${
                  !selectedCategory
                    ? 'bg-gradient-to-r from-cyan-400 to-cyan-600 text-gray-900 shadow-lg'
                    : 'bg-white text-gray-700 border-2 border-gray-200 hover:border-cyan-300'
                }`}
              >
                Todos
              </button>
              {categories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => setSelectedCategory(category.id)}
                  className={`px-5 py-2 rounded-full font-medium transition-all duration-300 transform hover:scale-105 ${
                    selectedCategory === category.id
                      ? 'bg-gradient-to-r from-cyan-400 to-cyan-600 text-gray-900 shadow-lg'
                      : 'bg-white text-gray-700 border-2 border-gray-200 hover:border-cyan-300'
                  }`}
                >
                  {category.name}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Grid de productos */}
        {loading ? (
          <div className="text-center py-20">
            <div className="inline-block animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-cyan-500"></div>
            <p className="text-gray-600 mt-4 font-medium">Cargando productos...</p>
          </div>
        ) : error ? (
          <div className="text-center py-20">
            <div className="bg-red-50 border-2 border-red-200 rounded-2xl p-8 max-w-md mx-auto">
              <p className="text-red-600 font-semibold">{error}</p>
            </div>
          </div>
        ) : filteredProducts.length === 0 ? (
          <div className="text-center py-20">
            <div className="bg-gray-50 border-2 border-gray-200 rounded-2xl p-12 max-w-md mx-auto">
              <TagIcon className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-600 text-lg font-medium">No se encontraron productos</p>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredProducts.map((product, index) => (
              <div 
                key={product.id} 
                className="group bg-white rounded-2xl shadow-md hover:shadow-2xl transition-all duration-300 overflow-hidden transform hover:-translate-y-2"
                style={{ 
                  animation: `fadeInUp 0.5s ease-out ${index * 0.1}s backwards`
                }}
              >
                {/* Imagen del producto */}
                <div className="relative overflow-hidden bg-gray-100">
                  <Link to={`/products/${product.id}`}>
                    <img
                      src={product.image || 'https://via.placeholder.com/300'}
                      alt={product.name}
                      className="w-full h-56 object-cover transform group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                  </Link>
                  
                  {/* Badge de stock */}
                  {product.stock < 10 && product.stock > 0 && (
                    <div className="absolute top-3 right-3 bg-yellow-400 text-gray-900 text-xs font-bold px-3 py-1 rounded-full shadow-lg">
                      ¡Últimas {product.stock}!
                    </div>
                  )}
                  {product.stock === 0 && (
                    <div className="absolute top-3 right-3 bg-red-500 text-white text-xs font-bold px-3 py-1 rounded-full shadow-lg">
                      Agotado
                    </div>
                  )}
                </div>

                {/* Contenido */}
                <div className="p-5">
                  <Link to={`/products/${product.id}`}>
                    <h3 className="text-lg font-bold text-gray-900 mb-2 group-hover:text-cyan-600 transition-colors line-clamp-2 min-h-[56px]">
                      {product.name}
                    </h3>
                  </Link>
                  
                  <p className="text-gray-600 text-sm mb-4 line-clamp-2 min-h-[40px]">
                    {product.description}
                  </p>
                  
                  {/* Precio y botón */}
                  <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                    <div>
                      <span className="text-3xl font-extrabold bg-gradient-to-r from-cyan-500 to-teal-600 bg-clip-text text-transparent">
                        ${product.price}
                      </span>
                    </div>
                    <button
                      onClick={() => handleAddToCart(product)}
                      disabled={product.stock === 0}
                      className={`flex items-center gap-1 px-4 py-2 rounded-full font-bold transition-all duration-300 transform hover:scale-105 shadow-md ${
                        product.stock === 0
                          ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                          : 'bg-gradient-to-r from-lime-400 to-green-500 text-gray-900 hover:shadow-lg hover:from-lime-300 hover:to-green-400'
                      }`}
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
      `}</style>
    </div>
  )
}
