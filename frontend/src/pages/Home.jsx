import { Link, useNavigate } from 'react-router-dom'
import { useEffect, useState, useRef } from 'react'
import { 
  ShoppingBagIcon, 
  TruckIcon, 
  ShieldCheckIcon, 
  SparklesIcon,
  ArrowRightIcon,
  BoltIcon,
  FireIcon,
  TagIcon,
  StarIcon,
  HeartIcon,
  ClockIcon,
  TrophyIcon,
  RocketLaunchIcon,
  GiftIcon,
  CubeIcon,
  DevicePhoneMobileIcon,
  ComputerDesktopIcon,
  HomeIcon as HomeIconOutline,
  MagnifyingGlassIcon,
  XMarkIcon
} from '@heroicons/react/24/outline'
import { HeartIcon as HeartIconSolid } from '@heroicons/react/24/solid'
import { useSiteConfig } from '../hooks/useSiteConfig'
import api from '../services/api'

export default function Home() {
  const [scrollY, setScrollY] = useState(0)
  const [allProducts, setAllProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [favorites, setFavorites] = useState([])
  const [searchTerm, setSearchTerm] = useState('')
  const [searchResults, setSearchResults] = useState([])
  const [showSearchResults, setShowSearchResults] = useState(false)
  const [categories, setCategories] = useState([])
  const searchRef = useRef(null)
  const navigate = useNavigate()
  
  const config = useSiteConfig()
  const { home, business, theme } = config
  const { colors } = theme

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY)
    window.addEventListener('scroll', handleScroll)
    fetchProducts()
    fetchCategories()
    
    // Click fuera del buscador para cerrar resultados
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setShowSearchResults(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    
    return () => {
      window.removeEventListener('scroll', handleScroll)
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])

  // Búsqueda inteligente con similitud
  useEffect(() => {
    if (searchTerm.trim().length > 0) {
      const searchLower = searchTerm.toLowerCase()
      const results = allProducts.filter(product => {
        const nameMatch = product.name.toLowerCase().includes(searchLower)
        const descMatch = product.description?.toLowerCase().includes(searchLower)
        const categoryMatch = product.category?.name?.toLowerCase().includes(searchLower)
        return nameMatch || descMatch || categoryMatch
      }).slice(0, 5) // Limitar a 5 resultados
      
      setSearchResults(results)
      setShowSearchResults(true)
    } else {
      setSearchResults([])
      setShowSearchResults(false)
    }
  }, [searchTerm, allProducts])

  const fetchCategories = async () => {
    try {
      const response = await api.get('/categories')
      setCategories(response.data)
    } catch (error) {
      console.error('Error al cargar categorías:', error)
    }
  }

  const fetchProducts = async () => {
    try {
      const response = await api.get('/products')
      setAllProducts(response.data)
      // Simular favoritos (primeros 4 productos)
      setFavorites(response.data.slice(0, 4).map(p => p.id))
    } catch (error) {
      console.error('Error al cargar productos:', error)
    } finally {
      setLoading(false)
    }
  }

  const toggleFavorite = (productId) => {
    setFavorites(prev => 
      prev.includes(productId) 
        ? prev.filter(id => id !== productId)
        : [...prev, productId]
    )
  }

  // Dividir productos en diferentes secciones
  const featuredProducts = allProducts.slice(0, 6)
  const trendingProducts = allProducts.slice(3, 7)
  const favoriteProducts = allProducts.filter(p => favorites.includes(p.id))
  const recentProducts = allProducts.slice(0, 4)

  const features = [
    {
      icon: TruckIcon,
      title: 'Envío Rápido',
      description: 'Entrega en 24-48 horas',
      gradient: 'from-blue-500 to-blue-600'
    },
    {
      icon: ShieldCheckIcon,
      title: 'Compra Segura',
      description: '100% protegido',
      gradient: 'from-green-500 to-green-600'
    },
    {
      icon: TagIcon,
      title: 'Mejores Precios',
      description: 'Ofertas increíbles',
      gradient: 'from-orange-500 to-orange-600'
    }
  ]

  const categoryIcons = [
    { icon: ComputerDesktopIcon, name: 'Electrónica', count: 24, color: 'from-blue-500 to-cyan-500' },
    { icon: DevicePhoneMobileIcon, name: 'Móviles', count: 18, color: 'from-purple-500 to-pink-500' },
    { icon: HomeIconOutline, name: 'Hogar', count: 32, color: 'from-green-500 to-emerald-500' },
    { icon: GiftIcon, name: 'Regalos', count: 15, color: 'from-orange-500 to-red-500' },
  ]

  // Componente reutilizable para productos
  const ProductCard = ({ product, showFavorite = false }) => (
    <div className="group relative">
      <div className="relative overflow-hidden rounded-3xl bg-white shadow-lg hover:shadow-2xl transition-all duration-300 transform group-hover:-translate-y-2">
        {/* Imagen del producto */}
        <div className="aspect-square overflow-hidden bg-gray-50 relative">
          <img
            src={product.images?.[0]?.image_url || 'https://via.placeholder.com/400'}
            alt={product.name}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
          />
          
          {/* Botón de favorito */}
          {showFavorite && (
            <button
              onClick={(e) => {
                e.preventDefault()
                toggleFavorite(product.id)
              }}
              className="absolute top-4 right-4 w-10 h-10 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center shadow-lg hover:scale-110 transition-transform z-10"
            >
              {favorites.includes(product.id) ? (
                <HeartIconSolid className="w-6 h-6 text-red-500" />
              ) : (
                <HeartIcon className="w-6 h-6 text-gray-600" />
              )}
            </button>
          )}
        </div>

        {/* Badge de nuevo */}
        {product.stock > 0 && (
          <div 
            className="absolute top-4 left-4 px-3 py-1 rounded-full text-xs font-bold text-white shadow-lg"
            style={{ background: colors.secondary.hex }}
          >
            NUEVO
          </div>
        )}

        {/* Contenido */}
        <div className="p-6 space-y-3">
          <h3 className="font-bold text-lg text-gray-900 transition-all line-clamp-2">
            {product.name}
          </h3>
          
          <div className="flex items-center justify-between">
            <div>
              <div 
                className="text-2xl font-black"
                style={{ color: colors.primary.hex }}
              >
                ${parseFloat(product.price).toFixed(2)}
              </div>
              {product.stock < 10 && product.stock > 0 && (
                <div className="text-xs text-orange-600 font-medium">
                  ¡Solo {product.stock} disponibles!
                </div>
              )}
            </div>
            
            <button 
              className="w-12 h-12 rounded-full shadow-lg flex items-center justify-center group-hover:scale-110 transition-transform"
              style={{ background: colors.primary.hex }}
            >
              <ShoppingBagIcon className="w-6 h-6 text-white" />
            </button>
          </div>
        </div>
      </div>
    </div>
  )

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* Hero Section - Moderno y Dinámico */}
      <section className="relative min-h-[90vh] flex items-center overflow-hidden">
        {/* Fondo animado con burbujas */}
        <div className="absolute inset-0 overflow-hidden">
          <div 
            className="absolute top-20 left-10 w-72 h-72 rounded-full blur-3xl opacity-20 animate-pulse"
            style={{ 
              background: `radial-gradient(circle, ${colors.primary.hex}, transparent)`,
              animationDuration: '3s'
            }}
          />
          <div 
            className="absolute bottom-20 right-10 w-96 h-96 rounded-full blur-3xl opacity-20 animate-pulse"
            style={{ 
              background: `radial-gradient(circle, ${colors.secondary.hex}, transparent)`,
              animationDuration: '4s',
              animationDelay: '1s'
            }}
          />
          <div 
            className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full blur-3xl opacity-10"
            style={{ 
              background: `radial-gradient(circle, ${colors.primary.hex}, ${colors.secondary.hex})`,
            }}
          />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Contenido Principal */}
            <div className="space-y-8 text-center lg:text-left">
              {/* Badge */}
              <div 
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold shadow-lg animate-bounce"
                style={{ 
                  background: `linear-gradient(135deg, ${colors.secondary.hex}, ${colors.secondary.dark})`,
                  color: '#1f2937'
                }}
              >
                <SparklesIcon className="w-5 h-5" />
                {home.hero.badge || 'Nueva Colección 2025'}
              </div>

              {/* Título Principal */}
              <h1 className="text-5xl lg:text-7xl font-black leading-tight">
                <span 
                  className="block bg-gradient-to-r bg-clip-text text-transparent animate-pulse"
                  style={{ 
                    backgroundImage: `linear-gradient(135deg, ${colors.primary.hex}, ${colors.secondary.hex})`
                  }}
                >
                  {business.name}
                </span>
                <span className="block text-gray-900 mt-2">
                  {home.hero.subtitle || 'Tu Destino de Compras'}
                </span>
              </h1>

              {/* Descripción */}
              <p className="text-xl text-gray-600 leading-relaxed max-w-xl">
                {home.hero.description || 'Descubre productos extraordinarios con ofertas increíbles. Calidad garantizada y envío express.'}
              </p>

              {/* Buscador Avanzado */}
              <div ref={searchRef} className="relative max-w-2xl mx-auto lg:mx-0">
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-5 flex items-center pointer-events-none">
                    <MagnifyingGlassIcon className="h-6 w-6 text-gray-400" />
                  </div>
                  <input
                    type="text"
                    placeholder="Busca por nombre, categoría o descripción..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    onFocus={() => searchTerm && setShowSearchResults(true)}
                    className="w-full pl-14 pr-12 py-4 text-lg border-2 border-gray-200 rounded-2xl bg-white/90 backdrop-blur-sm shadow-lg transition-all outline-none hover:border-gray-300 focus:border-transparent focus:ring-4"
                    style={{
                      '--focus-ring-color': `${colors.primary.hex}40`
                    }}
                    onFocus={(e) => {
                      e.target.style.boxShadow = `0 0 0 4px ${colors.primary.hex}40`
                    }}
                    onBlur={(e) => {
                      // Delay para permitir click en resultados
                      setTimeout(() => {
                        if (!searchRef.current?.contains(document.activeElement)) {
                          e.target.style.boxShadow = ''
                        }
                      }, 200)
                    }}
                  />
                  {searchTerm && (
                    <button
                      onClick={() => {
                        setSearchTerm('')
                        setShowSearchResults(false)
                      }}
                      className="absolute inset-y-0 right-0 pr-5 flex items-center text-gray-400 hover:text-gray-600 transition-colors"
                    >
                      <XMarkIcon className="h-6 w-6" />
                    </button>
                  )}
                </div>

                {/* Resultados del buscador */}
                {showSearchResults && searchResults.length > 0 && (
                  <div className="absolute z-50 w-full mt-2 bg-white rounded-2xl shadow-2xl border border-gray-100 overflow-hidden">
                    <div className="p-3 bg-gray-50 border-b border-gray-100">
                      <p className="text-sm font-semibold text-gray-700">
                        {searchResults.length} resultado{searchResults.length !== 1 ? 's' : ''} encontrado{searchResults.length !== 1 ? 's' : ''}
                      </p>
                    </div>
                    <div className="max-h-96 overflow-y-auto">
                      {searchResults.map((product) => (
                        <Link
                          key={product.id}
                          to={`/products`}
                          onClick={() => {
                            setShowSearchResults(false)
                            setSearchTerm('')
                          }}
                          className="flex items-center gap-4 p-4 hover:bg-gray-50 transition-colors border-b border-gray-100 last:border-b-0"
                        >
                          <img
                            src={product.images?.[0]?.image_url || 'https://via.placeholder.com/80'}
                            alt={product.name}
                            className="w-16 h-16 object-cover rounded-xl shadow-sm"
                          />
                          <div className="flex-1 min-w-0">
                            <h4 className="font-bold text-gray-900 truncate">
                              {product.name}
                            </h4>
                            <p className="text-sm text-gray-600 truncate">
                              {product.category?.name || 'Sin categoría'}
                            </p>
                          </div>
                          <div className="text-right">
                            <div 
                              className="text-xl font-black"
                              style={{ color: colors.primary.hex }}
                            >
                              ${parseFloat(product.price).toFixed(2)}
                            </div>
                            {product.stock < 10 && product.stock > 0 && (
                              <div className="text-xs text-orange-600 font-medium">
                                Solo {product.stock}
                              </div>
                            )}
                            {product.stock === 0 && (
                              <div className="text-xs text-red-600 font-medium">
                                Agotado
                              </div>
                            )}
                          </div>
                        </Link>
                      ))}
                    </div>
                    <div className="p-3 bg-gray-50 border-t border-gray-100">
                      <Link
                        to="/products"
                        onClick={() => {
                          setShowSearchResults(false)
                          setSearchTerm('')
                        }}
                        className="block text-center font-bold transition-colors"
                        style={{ color: colors.primary.hex }}
                      >
                        Ver todos los productos →
                      </Link>
                    </div>
                  </div>
                )}

                {/* Sin resultados */}
                {showSearchResults && searchTerm && searchResults.length === 0 && (
                  <div className="absolute z-50 w-full mt-2 bg-white rounded-2xl shadow-2xl border border-gray-100 p-8 text-center">
                    <MagnifyingGlassIcon className="w-12 h-12 text-gray-300 mx-auto mb-3" />
                    <p className="text-gray-600 font-medium mb-2">
                      No encontramos resultados para "{searchTerm}"
                    </p>
                    <p className="text-sm text-gray-500">
                      Intenta con otras palabras clave o explora nuestro catálogo completo
                    </p>
                    <Link
                      to="/products"
                      onClick={() => {
                        setShowSearchResults(false)
                        setSearchTerm('')
                      }}
                      className="inline-block mt-4 px-6 py-2 rounded-full font-bold text-white shadow-lg hover:shadow-xl transform hover:scale-105 transition-all"
                      style={{ background: colors.primary.hex }}
                    >
                      Ver todo el catálogo
                    </Link>
                  </div>
                )}
              </div>

              {/* Botones */}
              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <Link
                  to="/products"
                  className="group relative px-8 py-4 rounded-full font-bold text-white overflow-hidden shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all"
                  style={{ 
                    background: `linear-gradient(135deg, ${colors.primary.hex}, ${colors.primary.dark})`
                  }}
                >
                  <span className="relative z-10 flex items-center justify-center gap-2">
                    <ShoppingBagIcon className="w-6 h-6" />
                    Ver Productos
                    <ArrowRightIcon className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </span>
                  <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-20 transition-opacity" />
                </Link>

                <Link
                  to="/products"
                  className="px-8 py-4 rounded-full font-bold border-2 hover:shadow-xl transform hover:scale-105 transition-all flex items-center justify-center gap-2"
                  style={{ 
                    borderColor: colors.primary.hex,
                    color: colors.primary.hex
                  }}
                >
                  <FireIcon className="w-6 h-6" />
                  Ver Ofertas
                </Link>
              </div>

              {/* Stats rápidos */}
              <div className="flex flex-wrap gap-6 justify-center lg:justify-start pt-8">
                {home.stats?.map((stat, index) => (
                  <div key={index} className="text-center">
                    <div 
                      className="text-3xl font-black"
                      style={{ color: index % 2 === 0 ? colors.primary.hex : colors.secondary.hex }}
                    >
                      {stat.number}
                    </div>
                    <div className="text-sm text-gray-600 font-medium">{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Imagen/Ilustración */}
            <div className="relative lg:block">
              <div className="relative z-10">
                {/* Grid de productos destacados mini */}
                <div className="grid grid-cols-2 gap-4">
                  {loading ? (
                    // Skeleton loading
                    [1, 2, 3, 4].map((item) => (
                      <div
                        key={item}
                        className="aspect-square rounded-3xl bg-gray-200 animate-pulse"
                      />
                    ))
                  ) : (
                    // Productos reales
                    featuredProducts.slice(0, 4).map((product, index) => (
                      <Link
                        key={product.id}
                        to={`/products`}
                        className="group aspect-square rounded-3xl overflow-hidden shadow-2xl transform hover:scale-105 transition-all duration-300 relative"
                        style={{ 
                          animationDelay: `${index * 0.1}s`
                        }}
                      >
                        {/* Imagen del producto */}
                        <img
                          src={product.images?.[0]?.image_url || 'https://via.placeholder.com/400'}
                          alt={product.name}
                          className="w-full h-full object-cover"
                        />
                        
                        {/* Overlay con info en hover */}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4">
                          <h4 className="text-white font-bold text-sm line-clamp-2">
                            {product.name}
                          </h4>
                          <p 
                            className="text-lg font-black mt-1"
                            style={{ color: colors.secondary.hex }}
                          >
                            ${parseFloat(product.price).toFixed(2)}
                          </p>
                        </div>
                      </Link>
                    ))
                  )}
                </div>
              </div>

              {/* Elementos flotantes decorativos */}
              <div 
                className="absolute -top-6 -right-6 w-24 h-24 rounded-full shadow-xl flex items-center justify-center animate-bounce"
                style={{ 
                  background: colors.secondary.hex,
                  animationDuration: '2s'
                }}
              >
                <TagIcon className="w-12 h-12 text-gray-900" />
              </div>
              <div 
                className="absolute -bottom-6 -left-6 w-32 h-32 rounded-full shadow-xl flex items-center justify-center animate-pulse"
                style={{ 
                  background: colors.primary.hex,
                }}
              >
                <SparklesIcon className="w-16 h-16 text-white" />
              </div>
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 animate-bounce">
          <div 
            className="w-6 h-10 border-2 rounded-full flex items-start justify-center p-2"
            style={{ borderColor: colors.primary.hex }}
          >
            <div 
              className="w-1.5 h-3 rounded-full animate-pulse"
              style={{ background: colors.primary.hex }}
            />
          </div>
        </div>
      </section>

      {/* Features Bar - Compacta y moderna */}
      <section className="py-8 border-y border-gray-100 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="flex items-center gap-4 group cursor-pointer">
                <div 
                  className={`w-14 h-14 rounded-xl bg-gradient-to-br ${feature.gradient} flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform`}
                >
                  <feature.icon className="w-7 h-7 text-white" />
                </div>
                <div>
                  <h3 className="font-bold text-gray-900">{feature.title}</h3>
                  <p className="text-sm text-gray-600">{feature.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Categorías Destacadas */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-black text-gray-900 mb-4">
              Explora por Categoría
            </h2>
            <p className="text-gray-600">Encuentra exactamente lo que buscas</p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {categoryIcons.map((category, index) => (
              <Link
                key={index}
                to="/products"
                className="group relative overflow-hidden rounded-2xl p-8 bg-gradient-to-br hover:shadow-2xl transition-all duration-300 transform hover:scale-105"
                style={{
                  background: `linear-gradient(135deg, ${colors.primary.hex}10, ${colors.secondary.hex}10)`
                }}
              >
                <div className="flex flex-col items-center text-center space-y-4">
                  <div 
                    className={`w-20 h-20 rounded-2xl bg-gradient-to-br ${category.color} flex items-center justify-center shadow-xl group-hover:scale-110 transition-transform`}
                  >
                    <category.icon className="w-10 h-10 text-white" />
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-900 text-lg">{category.name}</h3>
                    <p className="text-sm text-gray-600">{category.count} productos</p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Banner de Oferta Especial */}
      <section className="py-4 bg-gradient-to-b from-white to-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div 
            className="relative overflow-hidden rounded-3xl p-12 shadow-2xl"
            style={{
              background: `linear-gradient(135deg, ${colors.primary.hex}, ${colors.primary.dark})`
            }}
          >
            <div className="relative z-10 grid md:grid-cols-2 gap-8 items-center">
              <div className="text-white space-y-4">
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/20 backdrop-blur-sm text-sm font-bold">
                  <BoltIcon className="w-5 h-5" />
                  Oferta Limitada
                </div>
                <h2 className="text-4xl lg:text-5xl font-black">
                  ¡Hasta 50% OFF!
                </h2>
                <p className="text-xl text-white/90">
                  En productos seleccionados. No te pierdas esta oportunidad única.
                </p>
                <div className="flex items-center gap-4 pt-4">
                  <div className="text-center">
                    <div className="text-3xl font-black">23</div>
                    <div className="text-sm text-white/70">Horas</div>
                  </div>
                  <div className="text-3xl">:</div>
                  <div className="text-center">
                    <div className="text-3xl font-black">45</div>
                    <div className="text-sm text-white/70">Minutos</div>
                  </div>
                  <div className="text-3xl">:</div>
                  <div className="text-center">
                    <div className="text-3xl font-black">12</div>
                    <div className="text-sm text-white/70">Segundos</div>
                  </div>
                </div>
                <Link
                  to="/products"
                  className="inline-flex items-center gap-2 px-8 py-4 rounded-full font-bold bg-white text-gray-900 shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all"
                >
                  Ver Ofertas
                  <ArrowRightIcon className="w-5 h-5" />
                </Link>
              </div>
              <div className="relative">
                <div className="absolute inset-0 bg-white/10 rounded-full blur-3xl" />
                <FireIcon className="w-64 h-64 text-white/20 mx-auto" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Productos Destacados */}
      <section className="py-20 bg-gradient-to-b from-white to-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header de sección */}
          <div className="text-center mb-16 space-y-4">
            <div 
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-bold"
              style={{ 
                background: `${colors.primary.hex}10`,
                color: colors.primary.hex
              }}
            >
              <BoltIcon className="w-5 h-5" />
              Productos Destacados
            </div>
            <h2 className="text-4xl lg:text-5xl font-black text-gray-900">
              Descubre Nuestros
              <span 
                className="block bg-gradient-to-r bg-clip-text text-transparent"
                style={{ 
                  backgroundImage: `linear-gradient(135deg, ${colors.primary.hex}, ${colors.secondary.hex})`
                }}
              >
                Mejores Productos
              </span>
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Selección exclusiva de productos de alta calidad con las mejores ofertas
            </p>
          </div>

          {/* Grid de productos */}
          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <div key={i} className="animate-pulse">
                  <div className="bg-gray-200 aspect-square rounded-3xl mb-4" />
                  <div className="h-4 bg-gray-200 rounded w-3/4 mb-2" />
                  <div className="h-4 bg-gray-200 rounded w-1/2" />
                </div>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {featuredProducts.map((product, index) => (
                <Link
                  key={product.id}
                  to={`/products`}
                  className="group"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div className="relative overflow-hidden rounded-3xl bg-white shadow-lg hover:shadow-2xl transition-all duration-300 transform group-hover:-translate-y-2">
                    {/* Imagen del producto */}
                    <div className="aspect-square overflow-hidden bg-gray-50">
                      <img
                        src={product.images?.[0]?.image_url || 'https://via.placeholder.com/400'}
                        alt={product.name}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                    </div>

                    {/* Badge de nuevo/oferta */}
                    {index < 3 && (
                      <div 
                        className="absolute top-4 right-4 px-3 py-1 rounded-full text-xs font-bold text-white shadow-lg"
                        style={{ background: colors.secondary.hex }}
                      >
                        NUEVO
                      </div>
                    )}

                    {/* Contenido */}
                    <div className="p-6 space-y-3">
                      <h3 className="font-bold text-lg text-gray-900 transition-all">
                        {product.name}
                      </h3>
                      
                      <div className="flex items-center justify-between">
                        <div>
                          <div 
                            className="text-2xl font-black"
                            style={{ color: colors.primary.hex }}
                          >
                            ${parseFloat(product.price).toFixed(2)}
                          </div>
                          {product.stock < 10 && product.stock > 0 && (
                            <div className="text-xs text-orange-600 font-medium">
                              ¡Solo {product.stock} disponibles!
                            </div>
                          )}
                        </div>
                        
                        <button 
                          className="w-12 h-12 rounded-full shadow-lg flex items-center justify-center group-hover:scale-110 transition-transform"
                          style={{ background: colors.primary.hex }}
                        >
                          <ShoppingBagIcon className="w-6 h-6 text-white" />
                        </button>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}

          {/* Ver todos los productos */}
          <div className="text-center mt-12">
            <Link
              to="/products"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-full font-bold text-white shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all"
              style={{ 
                background: `linear-gradient(135deg, ${colors.primary.hex}, ${colors.secondary.hex})`
              }}
            >
              Ver Todos los Productos
              <ArrowRightIcon className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Section - Moderna */}
      <section 
        className="relative py-24 overflow-hidden"
        style={{ 
          background: `linear-gradient(135deg, ${colors.primary.dark}, ${colors.primary.hex}, ${colors.secondary.hex})`
        }}
      >
        {/* Elementos decorativos */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-96 h-96 rounded-full bg-white blur-3xl" />
          <div className="absolute bottom-0 right-0 w-96 h-96 rounded-full bg-white blur-3xl" />
        </div>

        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-8">
          <h2 className="text-4xl lg:text-5xl font-black text-white leading-tight">
            ¿Listo para encontrar lo que buscas?
          </h2>
          <p className="text-xl text-white/90 max-w-2xl mx-auto">
            Únete a miles de clientes satisfechos. Descubre ofertas exclusivas y productos de calidad.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link
              to="/products"
              className="px-8 py-4 bg-white rounded-full font-bold shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all flex items-center gap-2"
              style={{ color: colors.primary.hex }}
            >
              <ShoppingBagIcon className="w-6 h-6" />
              Explorar Catálogo
            </Link>
            <Link
              to="/products"
              className="px-8 py-4 bg-white/10 backdrop-blur-sm border-2 border-white text-white rounded-full font-bold hover:bg-white/20 transition-all"
            >
              Ver Ofertas Especiales
            </Link>
          </div>

          {/* Trust badges */}
          <div className="flex flex-wrap gap-6 justify-center pt-8">
            {['Compra Segura', 'Envío Gratis', 'Garantía Total'].map((badge, index) => (
              <div key={index} className="flex items-center gap-2 text-white/90">
                <ShieldCheckIcon className="w-5 h-5" />
                <span className="font-medium">{badge}</span>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
