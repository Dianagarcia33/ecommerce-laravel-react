import { Link, Outlet, useLocation, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { useCart } from '../context/CartContext'
import { useFavorites } from '../context/FavoritesContext'
import { useSiteConfig } from '../hooks/useSiteConfig'
import logoGlointPlace from '../assets/logos/logo.png';
import { useState, useEffect, useRef } from 'react'
import {
  ShoppingCartIcon,
  UserIcon,
  Bars3Icon,
  XMarkIcon,
  HomeIcon,
  ShoppingBagIcon,
  Cog6ToothIcon,
  ArrowRightOnRectangleIcon,
  UserPlusIcon,
  ClipboardDocumentListIcon,
  SparklesIcon,
  HeartIcon,
  MagnifyingGlassIcon
} from '@heroicons/react/24/outline'
import api from '../services/api'

export default function Layout() {
  const { user, logout } = useAuth()
  const { getItemCount } = useCart()
  const { favoriteCount } = useFavorites()
  const location = useLocation()
  const navigate = useNavigate()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [searchTerm, setSearchTerm] = useState('')
  const [searchResults, setSearchResults] = useState([])
  const [showSearchResults, setShowSearchResults] = useState(false)
  const [allProducts, setAllProducts] = useState([])
  const searchRef = useRef(null)
  
  // Obtener configuración del sitio (se actualiza automáticamente)
  const config = useSiteConfig()
  const { business, theme } = config
  const { colors } = theme
  
  // Configuración de navbar con valores por defecto
  const navbar = theme.navbar || {
    background: 'dark',
    backgroundColor: '#0f172a',
    textColor: '#ffffff',
    blur: true,
    shadow: 'medium',
    borderBottom: false
  }
  
  // Debug: ver configuración de navbar
  useEffect(() => {
    console.log('Layout - Navbar config:', navbar)
  }, [navbar])

  // Función para obtener las clases de fondo de la navbar
  const getNavbarBackgroundClasses = () => {
    const base = scrolled && navbar.blur ? 'backdrop-blur-lg' : ''
    
    switch (navbar.background) {
      case 'transparent':
        return `${base} bg-transparent`
      case 'primary':
        return `${base} ${scrolled ? 'bg-white/80' : ''}`
      case 'dark':
        return `${base} bg-slate-900 ${scrolled ? 'bg-slate-900/95' : ''}`
      case 'gradient':
        return `${base}`
      case 'white':
      default:
        return `${base} ${scrolled ? 'bg-white/80' : 'bg-white'}`
    }
  }

  // Función para obtener el estilo inline del fondo
  const getNavbarBackgroundStyle = () => {
    if (navbar.background === 'gradient') {
      return {
        background: scrolled && navbar.blur
          ? `linear-gradient(to right, ${colors.primary.hex}f0, ${colors.secondary.hex}f0)`
          : `linear-gradient(to right, ${colors.primary.hex}, ${colors.secondary.hex})`
      }
    }
    if (navbar.background === 'primary' && !scrolled) {
      return {
        background: `linear-gradient(to right, ${colors.primary.hex}, ${colors.primary.dark})`
      }
    }
    return {}
  }

  // Función para obtener las clases de sombra
  const getNavbarShadowClass = () => {
    if (!scrolled && navbar.shadow === 'none') return ''
    
    switch (navbar.shadow) {
      case 'none': return ''
      case 'small': return 'shadow'
      case 'large': return 'shadow-2xl'
      case 'medium':
      default: return 'shadow-lg'
    }
  }

  // Función para obtener el color del texto
  const getTextColorClass = () => {
    if (navbar.background === 'dark' || navbar.background === 'gradient') {
      return 'text-white'
    }
    
    switch (navbar.textColor) {
      case 'light': return 'text-white'
      case 'primary': return 'text-gray-800'
      case 'dark':
      default: return 'text-gray-700'
    }
  }

  const textColorClass = getTextColorClass()
  const isLightText = navbar.background === 'dark' || navbar.background === 'gradient' || navbar.textColor === 'light'

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20)
    }
    window.addEventListener('scroll', handleScroll)
    
    // Cargar productos para el buscador
    fetchProducts()
    
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

  // Búsqueda inteligente y robusta usando API con tags
  useEffect(() => {
    if (searchTerm.trim().length > 0) {
      // Debounce para evitar demasiadas peticiones
      const delaySearch = setTimeout(async () => {
        try {
          const response = await api.get('/search/products', {
            params: { q: searchTerm }
          })
          setSearchResults(response.data.slice(0, 8))
          setShowSearchResults(true)
        } catch (error) {
          console.error('Error en búsqueda:', error)
          // Fallback a búsqueda local si falla la API
          performLocalSearch()
        }
      }, 300) // Esperar 300ms después de que el usuario deje de escribir

      return () => clearTimeout(delaySearch)
    } else {
      setSearchResults([])
      setShowSearchResults(false)
    }
  }, [searchTerm])

  // Búsqueda local como fallback (mejorada con normalización y sinónimos)
  const performLocalSearch = () => {
    const normalizeText = (text) => {
      if (!text) return ''
      return text.toLowerCase()
        .normalize('NFD').replace(/[\u0300-\u036f]/g, '') // Quitar tildes
        .replace(/[^a-z0-9\s]/g, '') // Quitar caracteres especiales
        .replace(/\s+/g, ' ').trim() // Normalizar espacios
    }

    const searchLower = normalizeText(searchTerm)
    
    // Diccionario de sinónimos
    const synonyms = {
      'deportivo': ['deporte', 'sport', 'running', 'gym', 'fitness', 'atletico'],
      'casual': ['informal', 'comodo', 'diario'],
      'elegante': ['formal', 'fino', 'luxury', 'premium'],
      'economico': ['barato', 'oferta', 'descuento', 'rebaja'],
      'nuevo': ['novedad', 'reciente', 'new'],
      'verano': ['calor', 'playa', 'summer'],
      'invierno': ['frio', 'abrigado', 'winter'],
      'hombre': ['masculino', 'caballero', 'men'],
      'mujer': ['femenino', 'dama', 'women'],
      'negro': ['black', 'oscuro'],
      'blanco': ['white', 'claro'],
      'rojo': ['red'],
      'azul': ['blue', 'marino'],
      'verde': ['green'],
      'cuero': ['piel', 'leather'],
      'algodon': ['cotton'],
      'impermeable': ['waterproof'],
      'ligero': ['light', 'liviano']
    }

    // Expandir búsqueda con sinónimos
    const searchWords = searchLower.split(' ')
    let expandedTerms = [...searchWords]
    
    searchWords.forEach(word => {
      Object.entries(synonyms).forEach(([key, values]) => {
        if (word === key || values.includes(word)) {
          expandedTerms.push(key, ...values)
        }
      })
    })
    expandedTerms = [...new Set(expandedTerms)]

    const calculateSimilarity = (str1, str2) => {
      const longer = str1.length > str2.length ? str1 : str2
      const shorter = str1.length > str2.length ? str2 : str1
      if (longer.length === 0) return 1.0
      
      const editDistance = (s1, s2) => {
        const costs = []
        for (let i = 0; i <= s1.length; i++) {
          let lastValue = i
          for (let j = 0; j <= s2.length; j++) {
            if (i === 0) costs[j] = j
            else if (j > 0) {
              let newValue = costs[j - 1]
              if (s1.charAt(i - 1) !== s2.charAt(j - 1))
                newValue = Math.min(Math.min(newValue, lastValue), costs[j]) + 1
              costs[j - 1] = lastValue
              lastValue = newValue
            }
          }
          if (i > 0) costs[s2.length] = lastValue
        }
        return costs[s2.length]
      }
      
      const distance = editDistance(shorter, longer)
      return (longer.length - distance) / longer.length
    }
    
    const calculateRelevance = (product) => {
      let score = 0
      const productName = normalizeText(product.name)
      const productDesc = normalizeText(product.description || '')
      const categoryName = normalizeText(product.category?.name || '')
      const tags = product.tags?.map(t => normalizeText(t.name)) || []
      
      // Búsqueda exacta en nombre
      if (productName === searchLower) score += 100
      if (productName.startsWith(searchLower)) score += 80
      if (productName.includes(searchLower)) score += 50
      
      // Búsqueda en tags (alta prioridad)
      tags.forEach(tag => {
        if (tag === searchLower) score += 90
        if (tag.includes(searchLower)) score += 60
        
        // Búsqueda por palabras en tags
        searchWords.forEach(word => {
          if (word.length > 2 && tag.includes(word)) score += 40
        })
        
        // Búsqueda con sinónimos en tags
        expandedTerms.forEach(term => {
          if (term.length > 2 && tag.includes(term)) score += 35
        })
        
        // Similitud difusa en tags
        const tagSimilarity = calculateSimilarity(searchLower, tag)
        if (tagSimilarity > 0.7) score += tagSimilarity * 35
      })
      
      // Búsqueda por palabras individuales
      searchWords.forEach(word => {
        if (word.length > 2) {
          if (productName.includes(word)) score += 30
          if (productDesc.includes(word)) score += 15
          if (categoryName.includes(word)) score += 25
        }
      })
      
      // Búsqueda con términos expandidos (sinónimos)
      expandedTerms.forEach(term => {
        if (term.length > 2) {
          if (productName.includes(term)) score += 25
          if (productDesc.includes(term)) score += 12
          if (categoryName.includes(term)) score += 20
        }
      })
      
      // Categoría
      if (categoryName === searchLower) score += 70
      if (categoryName.includes(searchLower)) score += 35
      
      // Descripción
      if (productDesc.includes(searchLower)) score += 20
      
      // Búsqueda difusa en nombre
      const similarity = calculateSimilarity(searchLower, productName)
      if (similarity > 0.7) score += similarity * 40
      
      return score
    }
    
    const results = allProducts
      .map(product => ({
        ...product,
        relevance: calculateRelevance(product)
      }))
      .filter(product => product.relevance > 0)
      .sort((a, b) => b.relevance - a.relevance)
      .slice(0, 8)
    
    setSearchResults(results)
    setShowSearchResults(true)
  }

  const fetchProducts = async () => {
    try {
      const response = await api.get('/products')
      setAllProducts(response.data)
    } catch (error) {
      console.error('Error al cargar productos:', error)
    }
  }

  useEffect(() => {
    setMobileMenuOpen(false)
  }, [location])

  const isActive = (path) => location.pathname === path

  const navLinks = [
    { to: '/', label: 'Inicio', icon: HomeIcon },
    { to: '/products', label: 'Productos', icon: ShoppingBagIcon },
    ...(user?.role === 'admin' ? [{ to: '/admin', label: 'Admin', icon: Cog6ToothIcon }] : []),
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header con fondo animado igual que el login */}
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${navbar.borderBottom ? 'border-b border-white/10' : ''} bg-gradient-to-br from-slate-900 via-cyan-900 to-teal-900`}
        style={{
          backdropFilter: scrolled && navbar.blur ? 'blur(12px)' : 'none',
          boxShadow: scrolled ? '0 10px 30px rgba(0, 0, 0, 0.2)' : '0 4px 15px rgba(0, 0, 0, 0.1)'
        }}
      >
        {/* Fondo animado de la navbar */}
        <div className="absolute inset-0 pointer-events-none">
          {/* Círculos animados con blur */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-lime-400 rounded-full opacity-10 blur-3xl animate-pulse"></div>
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-cyan-400 rounded-full opacity-10 blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-48 h-48 bg-teal-400 rounded-full opacity-8 blur-3xl animate-pulse" style={{ animationDelay: '2s' }}></div>
        </div>
        
        {/* Iconos flotantes decorativos en navbar */}
        <div className="absolute inset-0 pointer-events-none opacity-20">
          <ShoppingBagIcon className="absolute top-4 left-20 w-8 h-8 text-cyan-300 opacity-30 animate-float" />
          <SparklesIcon className="absolute top-4 right-40 w-6 h-6 text-lime-300 opacity-30 animate-float" style={{ animationDelay: '1s' }} />
        </div>
        <div className="w-full px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-24">
            {/* Logo */}
            <Link to="/" className="flex items-center group">
              <div className="relative transition duration-300 transform group-hover:scale-105">
                {/* Resplandor sutil alrededor del logo */}
                <div 
                  className="absolute inset-0 rounded-xl blur-lg transition-opacity opacity-50 group-hover:opacity-70"
                  style={{ 
                    background: `radial-gradient(circle, ${colors.secondary.hex}40, transparent 70%)`,
                  }}
                ></div>

                <img
                  src={business.logo || logoGlointPlace}
                  alt={`Logo de ${business.name}`}
                  className="w-auto object-contain relative z-10"
                  style={{ 
                    height: `${config.assets?.logoSize || 56}px`,
                    filter: 'drop-shadow(0 4px 12px rgba(255, 255, 255, 0.3)) brightness(1.1)',
                  }}
                />
              </div>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center space-x-1">
              {navLinks.map((link) => (
                <Link
                  key={link.to}
                  to={link.to}
                  className={`relative px-4 py-2 rounded-lg font-medium transition-all duration-300 flex items-center space-x-2 group ${
                    isActive(link.to) ? 'text-white' : 'text-white/80 hover:text-white'
                  }`}
                >
                  <link.icon className="h-5 w-5" />
                  <span>{link.label}</span>
                  {isActive(link.to) && (
                    <span 
                      className="absolute bottom-0 left-0 right-0 h-0.5 rounded-full"
                      style={{ 
                        background: colors.secondary.hex,
                        boxShadow: `0 0 10px ${colors.secondary.hex}`
                      }}
                    ></span>
                  )}
                  <span 
                    className="absolute inset-0 rounded-lg scale-0 group-hover:scale-100 transition-transform duration-300 -z-10"
                    style={{ backgroundColor: 'rgba(255, 255, 255, 0.1)' }}
                  ></span>
                </Link>
              ))}
            </nav>

            {/* Search Bar - Desktop */}
            <div ref={searchRef} className="hidden lg:flex items-center flex-1 max-w-md mx-4 relative">
              <div className="relative w-full">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <MagnifyingGlassIcon className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="text"
                  placeholder="Buscar productos..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full text-white placeholder-gray-400 focus:outline-none focus:border-white/40 focus:bg-white/20 transition-all"
                  onFocus={() => {
                    if (searchTerm) setShowSearchResults(true)
                  }}
                />
                {searchTerm && (
                  <button
                    onClick={() => {
                      setSearchTerm('')
                      setShowSearchResults(false)
                    }}
                    className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-white transition-colors"
                  >
                    <XMarkIcon className="h-5 w-5" />
                  </button>
                )}
              </div>

              {/* Search Results Dropdown */}
              {showSearchResults && searchResults.length > 0 && (
                <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-xl shadow-2xl border border-gray-100 overflow-hidden z-[9999]">
                  <div className="p-2 bg-gray-50 border-b border-gray-100">
                    <p className="text-xs font-semibold text-gray-700">
                      {searchResults.length} resultado{searchResults.length !== 1 ? 's' : ''}
                    </p>
                  </div>
                  <div className="max-h-96 overflow-y-auto scrollbar-thin">
                    {searchResults.map((product) => (
                      <Link
                        key={product.id}
                        to={`/product/${product.id}/parallax`}
                        onClick={() => {
                          setShowSearchResults(false)
                          setSearchTerm('')
                          setMobileMenuOpen(false)
                        }}
                        className="flex items-start gap-3 p-3 hover:bg-gray-50 transition-colors border-b border-gray-100 last:border-b-0"
                      >
                        <img
                          src={product.images?.[0]?.image_url || 'https://via.placeholder.com/60'}
                          alt={product.name}
                          className="w-16 h-16 object-cover rounded-lg shadow-sm flex-shrink-0"
                        />
                        <div className="flex-1 min-w-0">
                          <h4 className="font-semibold text-gray-900 text-sm mb-1 line-clamp-2">
                            {product.name}
                          </h4>
                          <p className="text-xs text-gray-600 mb-2">
                            {product.category?.name || 'Sin categoría'}
                          </p>
                          {/* Mostrar tags si existen */}
                          {product.tags && product.tags.length > 0 && (
                            <div className="flex flex-wrap gap-1">
                              {product.tags.slice(0, 3).map((tag) => (
                                <span
                                  key={tag.id}
                                  className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-cyan-100 text-cyan-800"
                                >
                                  {tag.name}
                                </span>
                              ))}
                              {product.tags.length > 3 && (
                                <span className="text-xs text-gray-400">
                                  +{product.tags.length - 3}
                                </span>
                              )}
                            </div>
                          )}
                        </div>
                        <div className="text-right flex-shrink-0">
                          <div 
                            className="text-lg font-black"
                            style={{ color: colors.primary.hex }}
                          >
                            ${parseFloat(product.price).toFixed(2)}
                          </div>
                          {product.stock < 10 && product.stock > 0 && (
                            <div className="text-xs text-orange-600 font-medium">
                              {product.stock} unid.
                            </div>
                          )}
                        </div>
                      </Link>
                    ))}
                  </div>
                  <div className="p-2 bg-gray-50 border-t border-gray-100">
                    <Link
                      to="/products"
                      onClick={() => {
                        setShowSearchResults(false)
                        setSearchTerm('')
                      }}
                      className="block text-center text-sm font-bold transition-colors hover:underline"
                      style={{ color: colors.primary.hex }}
                    >
                      Ver todos los productos →
                    </Link>
                  </div>
                </div>
              )}

              {/* No Results */}
              {showSearchResults && searchTerm && searchResults.length === 0 && (
                <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-xl shadow-2xl border border-gray-100 p-6 text-center z-[9999]">
                  <MagnifyingGlassIcon className="w-10 h-10 text-gray-300 mx-auto mb-2" />
                  <p className="text-gray-600 font-medium text-sm mb-1">
                    No encontramos "{searchTerm}"
                  </p>
                  <p className="text-xs text-gray-500">
                    Intenta con otras palabras
                  </p>
                </div>
              )}
            </div>

            {/* User Actions */}
            <div className="flex items-center space-x-3">
              {/* Favorites */}
              {user && (
                <Link
                  to="/favorites"
                  className="relative group"
                >
                  <div 
                    className="relative p-2 rounded-full transition-colors"
                    style={{ 
                      '--hover-bg': `${colors.primary.hex}10`
                    }}
                    onMouseEnter={(e) => e.currentTarget.style.backgroundColor = `${colors.primary.hex}10`}
                    onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
                  >
                    <HeartIcon 
                      className="h-6 w-6 text-white transition-colors"
                    />
                    {favoriteCount > 0 && (
                      <span 
                        className="absolute -top-1 -right-1 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center animate-pulse shadow-lg"
                        style={{ 
                          background: colors.secondary.hex,
                          boxShadow: `0 0 15px ${colors.secondary.hex}`
                        }}
                      >
                        {favoriteCount}
                      </span>
                    )}
                  </div>
                </Link>
              )}
              
              {/* Cart */}
              <Link
                to="/cart"
                className="relative group"
              >
                <div 
                  className="relative p-2 rounded-full transition-colors"
                  style={{ 
                    '--hover-bg': `${colors.primary.hex}10`
                  }}
                  onMouseEnter={(e) => e.currentTarget.style.backgroundColor = `${colors.primary.hex}10`}
                  onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
                >
                  <ShoppingCartIcon 
                    className="h-6 w-6 text-white transition-colors"
                  />
                  {getItemCount() > 0 && (
                    <span 
                      className="absolute -top-1 -right-1 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center animate-pulse shadow-lg"
                      style={{ 
                        background: colors.secondary.hex,
                        boxShadow: `0 0 15px ${colors.secondary.hex}`
                      }}
                    >
                      {getItemCount()}
                    </span>
                  )}
                </div>
              </Link>

              {/* User Menu - Desktop */}
              {user ? (
                <div className="hidden md:flex items-center space-x-3">
                  <div className="flex items-center space-x-2 px-3 py-2 bg-white/10 backdrop-blur-sm rounded-full border border-white/20">
                    <div 
                      className="h-8 w-8 rounded-full flex items-center justify-center shadow-md"
                      style={{ background: colors.secondary.hex }}
                    >
                      <span className="text-gray-900 font-bold text-sm">{user.name.charAt(0).toUpperCase()}</span>
                    </div>
                    <span className="text-sm font-semibold text-white">Hola, {user.name.split(' ')[0]}</span>
                  </div>

                  <Link
                    to="/orders"
                    className="flex items-center space-x-1 px-4 py-2 text-white/80 hover:text-white hover:bg-white/10 rounded-lg transition-all border border-transparent hover:border-white/20"
                  >
                    <ClipboardDocumentListIcon className="h-5 w-5" />
                    <span className="text-sm font-medium">Órdenes</span>
                  </Link>

                  <button
                    onClick={logout}
                    className="flex items-center space-x-1 px-4 py-2 bg-red-500/90 text-white hover:bg-red-600 rounded-lg transition-all font-medium border border-red-400/50 hover:border-red-500 shadow-lg"
                  >
                    <ArrowRightOnRectangleIcon className="h-5 w-5" />
                    <span className="text-sm">Salir</span>
                  </button>
                </div>
              ) : (
                <div className="hidden md:flex items-center space-x-2">
                  <Link
                    to="/login"
                    className="flex items-center space-x-2 px-5 py-2.5 bg-white/10 backdrop-blur-sm border-2 border-white/30 text-white hover:bg-white/20 rounded-full transition-all font-semibold shadow-md hover:shadow-lg"
                  >
                    <UserIcon className="h-5 w-5" />
                    <span>Ingresar</span>
                  </Link>
                  <Link
                    to="/register"
                    className="flex items-center space-x-2 px-5 py-2.5 text-gray-900 hover:shadow-xl hover:scale-105 rounded-full transition-all font-semibold shadow-lg"
                    style={{ 
                      background: colors.secondary.hex,
                      boxShadow: `0 4px 15px ${colors.secondary.hex}40`
                    }}
                  >
                    <UserPlusIcon className="h-5 w-5" />
                    <span>Registrarse</span>
                  </Link>
                </div>
              )}

              {/* Mobile Menu Button */}
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="md:hidden p-2 rounded-lg hover:bg-white/10 transition-colors"
              >
                {mobileMenuOpen ? (
                  <XMarkIcon className="h-6 w-6 text-white" />
                ) : (
                  <Bars3Icon className="h-6 w-6 text-white" />
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        <div
          className={`md:hidden transition-all duration-300 ease-in-out overflow-hidden ${mobileMenuOpen ? 'max-h-screen opacity-100' : 'max-h-0 opacity-0'
            }`}
        >
          <div 
            className="px-4 pt-2 pb-6 space-y-2 border-t border-white/10"
            style={{ 
              background: `linear-gradient(to bottom, ${colors.primary.hex}, ${colors.primary.dark})`,
              backdropFilter: 'blur(12px)'
            }}
          >
            {navLinks.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                className={`flex items-center space-x-3 px-4 py-3 rounded-xl transition-all ${isActive(link.to)
                  ? 'bg-white/20 text-white shadow-lg border border-white/30'
                  : 'text-white/80 hover:bg-white/10 hover:text-white'
                  }`}
              >
                <link.icon className="h-5 w-5" />
                <span className="font-medium">{link.label}</span>
              </Link>
            ))}

            <div className="pt-4 border-t border-white/10">
              {user ? (
                <>
                  <div 
                    className="flex items-center space-x-3 px-4 py-3 rounded-xl mb-2 border"
                    style={{ 
                      background: 'rgba(255, 255, 255, 0.1)',
                      borderColor: 'rgba(255, 255, 255, 0.2)'
                    }}
                  >
                    <div 
                      className="h-10 w-10 rounded-full flex items-center justify-center shadow-md"
                      style={{ background: colors.secondary.hex }}
                    >
                      <span className="text-gray-900 font-bold">{user.name.charAt(0).toUpperCase()}</span>
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-white">{user.name}</p>
                      <p className="text-xs text-white/70">{user.email}</p>
                    </div>
                  </div>

                  <Link
                    to="/orders"
                    className="flex items-center space-x-3 px-4 py-3 text-white/80 hover:bg-white/10 hover:text-white rounded-xl transition-all"
                  >
                    <ClipboardDocumentListIcon className="h-5 w-5" />
                    <span className="font-medium">Mis Órdenes</span>
                  </Link>

                  <Link
                    to="/favorites"
                    className="flex items-center space-x-3 px-4 py-3 text-white/80 hover:bg-white/10 hover:text-white rounded-xl transition-all relative"
                  >
                    <HeartIcon className="h-5 w-5" />
                    <span className="font-medium">Mis Favoritos</span>
                    {favoriteCount > 0 && (
                      <span 
                        className="ml-auto text-white text-xs font-bold rounded-full h-6 w-6 flex items-center justify-center shadow-lg"
                        style={{ 
                          background: colors.secondary.hex,
                          boxShadow: `0 0 10px ${colors.secondary.hex}`
                        }}
                      >
                        {favoriteCount}
                      </span>
                    )}
                  </Link>

                  <button
                    onClick={logout}
                    className="w-full flex items-center space-x-3 px-4 py-3 bg-red-500/80 text-white hover:bg-red-600 rounded-xl transition-all font-medium mt-2 shadow-lg"
                  >
                    <ArrowRightOnRectangleIcon className="h-5 w-5" />
                    <span>Cerrar Sesión</span>
                  </button>
                </>
              ) : (
                <div className="space-y-2">
                  <Link
                    to="/login"
                    className="flex items-center justify-center space-x-2 w-full px-4 py-3 border-2 border-white/30 text-white hover:bg-white/10 rounded-xl transition-all font-semibold"
                  >
                    <UserIcon className="h-5 w-5" />
                    <span>Ingresar</span>
                  </Link>
                  <Link
                    to="/register"
                    className="flex items-center justify-center space-x-2 w-full px-4 py-3 text-gray-900 hover:shadow-xl rounded-xl transition-all font-semibold shadow-lg"
                    style={{ background: colors.secondary.hex }}
                  >
                    <UserPlusIcon className="h-5 w-5" />
                    <span>Registrarse</span>
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* Spacer for fixed header */}
      <div className="h-24"></div>

      {/* Main Content */}
      <main className="min-h-screen">
        <Outlet />
      </main>

      {/* Footer */}
      <footer className="relative bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white overflow-hidden">
        {/* Decorative Elements */}
        <div className="absolute inset-0 opacity-10">
          <div 
            className="absolute top-0 left-0 w-96 h-96 rounded-full blur-3xl"
            style={{ backgroundColor: colors.primary.hex }}
          ></div>
          <div 
            className="absolute bottom-0 right-0 w-96 h-96 rounded-full blur-3xl"
            style={{ backgroundColor: colors.secondary.hex }}
          ></div>
        </div>

        <div className="relative w-full px-4 sm:px-6 lg:px-8 py-16">
          {/* Main Footer Content */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
            {/* Brand Section */}
            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <div 
                  className="p-2.5 rounded-xl shadow-lg"
                  style={{ 
                    background: `linear-gradient(to bottom right, ${colors.primary.hex}, ${colors.primary.dark})`
                  }}
                >
                  <ShoppingCartIcon className="h-6 w-6 text-gray-900" />
                </div>
                <div>
                  <h3 className="text-xl font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                    {business.name}
                  </h3>
                  <p className="text-xs text-gray-400">{business.tagline}</p>
                </div>
              </div>
              <p className="text-gray-400 text-sm leading-relaxed">
                {business.description}
              </p>
              <div className="flex space-x-3">
                {business.socialMedia?.facebook && (
                  <a 
                    href={business.socialMedia.facebook} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center transition-all hover:scale-110"
                    style={{ '--hover-color': colors.primary.hex }}
                    onMouseEnter={(e) => e.currentTarget.style.backgroundColor = colors.primary.hex}
                    onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#1f2937'}
                  >
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" /></svg>
                  </a>
                )}
                {business.socialMedia?.twitter && (
                  <a 
                    href={business.socialMedia.twitter} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center transition-all hover:scale-110"
                    onMouseEnter={(e) => e.currentTarget.style.backgroundColor = colors.secondary.hex}
                    onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#1f2937'}
                  >
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z" /></svg>
                  </a>
                )}
                {business.socialMedia?.instagram && (
                  <a 
                    href={business.socialMedia.instagram} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center transition-all hover:scale-110"
                    onMouseEnter={(e) => e.currentTarget.style.backgroundColor = colors.primary.hex}
                    onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#1f2937'}
                  >
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0C8.74 0 8.333.015 7.053.072 5.775.132 4.905.333 4.14.63c-.789.306-1.459.717-2.126 1.384S.935 3.35.63 4.14C.333 4.905.131 5.775.072 7.053.012 8.333 0 8.74 0 12s.015 3.667.072 4.947c.06 1.277.261 2.148.558 2.913.306.788.717 1.459 1.384 2.126.667.666 1.336 1.079 2.126 1.384.766.296 1.636.499 2.913.558C8.333 23.988 8.74 24 12 24s3.667-.015 4.947-.072c1.277-.06 2.148-.262 2.913-.558.788-.306 1.459-.718 2.126-1.384.666-.667 1.079-1.335 1.384-2.126.296-.765.499-1.636.558-2.913.06-1.28.072-1.687.072-4.947s-.015-3.667-.072-4.947c-.06-1.277-.262-2.149-.558-2.913-.306-.789-.718-1.459-1.384-2.126C21.319 1.347 20.651.935 19.86.63c-.765-.297-1.636-.499-2.913-.558C15.667.012 15.26 0 12 0zm0 2.16c3.203 0 3.585.016 4.85.071 1.17.055 1.805.249 2.227.415.562.217.96.477 1.382.896.419.42.679.819.896 1.381.164.422.36 1.057.413 2.227.057 1.266.07 1.646.07 4.85s-.015 3.585-.074 4.85c-.061 1.17-.256 1.805-.421 2.227-.224.562-.479.96-.899 1.382-.419.419-.824.679-1.38.896-.42.164-1.065.36-2.235.413-1.274.057-1.649.07-4.859.07-3.211 0-3.586-.015-4.859-.074-1.171-.061-1.816-.256-2.236-.421-.569-.224-.96-.479-1.379-.899-.421-.419-.69-.824-.9-1.38-.165-.42-.359-1.065-.42-2.235-.045-1.26-.061-1.649-.061-4.844 0-3.196.016-3.586.061-4.861.061-1.17.255-1.814.42-2.234.21-.57.479-.96.9-1.381.419-.419.81-.689 1.379-.898.42-.166 1.051-.361 2.221-.421 1.275-.045 1.65-.06 4.859-.06l.045.03zm0 3.678c-3.405 0-6.162 2.76-6.162 6.162 0 3.405 2.76 6.162 6.162 6.162 3.405 0 6.162-2.76 6.162-6.162 0-3.405-2.76-6.162-6.162-6.162zM12 16c-2.21 0-4-1.79-4-4s1.79-4 4-4 4 1.79 4 4-1.79 4-4 4zm7.846-10.405c0 .795-.646 1.44-1.44 1.44-.795 0-1.44-.646-1.44-1.44 0-.794.646-1.439 1.44-1.439.793-.001 1.44.645 1.44 1.439z" /></svg>
                  </a>
                )}
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h4 className="text-lg font-bold mb-6 flex items-center">
                <span 
                  className="w-1 h-6 rounded-full mr-3"
                  style={{ 
                    background: `linear-gradient(to bottom, ${colors.primary.hex}, ${colors.primary.dark})`
                  }}
                ></span>
                Enlaces Rápidos
              </h4>
              <ul className="space-y-3">
                <li>
                  <Link to="/" className="text-gray-400 hover:text-white transition-colors flex items-center group">
                    <span 
                      className="w-0 group-hover:w-2 h-0.5 mr-0 group-hover:mr-2 transition-all"
                      style={{ backgroundColor: colors.primary.hex }}
                    ></span>
                    Inicio
                  </Link>
                </li>
                <li>
                  <Link to="/products" className="text-gray-400 hover:text-white transition-colors flex items-center group">
                    <span 
                      className="w-0 group-hover:w-2 h-0.5 mr-0 group-hover:mr-2 transition-all"
                      style={{ backgroundColor: colors.primary.hex }}
                    ></span>
                    Productos
                  </Link>
                </li>
                <li>
                  <Link to="/orders" className="text-gray-400 hover:text-white transition-colors flex items-center group">
                    <span 
                      className="w-0 group-hover:w-2 h-0.5 mr-0 group-hover:mr-2 transition-all"
                      style={{ backgroundColor: colors.primary.hex }}
                    ></span>
                    Mis Órdenes
                  </Link>
                </li>
                <li>
                  <Link to="/track-order" className="text-gray-400 hover:text-white transition-colors flex items-center group">
                    <span 
                      className="w-0 group-hover:w-2 h-0.5 mr-0 group-hover:mr-2 transition-all"
                      style={{ backgroundColor: colors.primary.hex }}
                    ></span>
                    Rastrear Pedido
                  </Link>
                </li>
              </ul>
            </div>

            {/* Information */}
            <div>
              <h4 className="text-lg font-bold mb-6 flex items-center">
                <span 
                  className="w-1 h-6 rounded-full mr-3"
                  style={{ 
                    background: `linear-gradient(to bottom, ${colors.secondary.hex}, ${colors.secondary.dark})`
                  }}
                ></span>
                Información
              </h4>
              <ul className="space-y-3">
                <li>
                  <a href="#" className="text-gray-400 hover:text-white transition-colors flex items-center group">
                    <span className="w-0 group-hover:w-2 h-0.5 bg-lime-400 mr-0 group-hover:mr-2 transition-all"></span>
                    Sobre Nosotros
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-400 hover:text-white transition-colors flex items-center group">
                    <span className="w-0 group-hover:w-2 h-0.5 bg-lime-400 mr-0 group-hover:mr-2 transition-all"></span>
                    Términos y Condiciones
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-400 hover:text-white transition-colors flex items-center group">
                    <span className="w-0 group-hover:w-2 h-0.5 bg-lime-400 mr-0 group-hover:mr-2 transition-all"></span>
                    Política de Privacidad
                  </a>
                </li>
              </ul>
            </div>

            {/* Contact */}
            <div>
              <h4 className="text-lg font-bold mb-6 flex items-center">
                <span className="w-1 h-6 bg-gradient-to-b from-orange-400 to-orange-600 rounded-full mr-3"></span>
                Contacto
              </h4>
              <ul className="space-y-4">
                <li className="flex items-start space-x-3 text-gray-400">
                  <svg className="w-5 h-5 text-cyan-400 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  <span className="text-sm">info@tienda.com</span>
                </li>
                <li className="flex items-start space-x-3 text-gray-400">
                  <svg className="w-5 h-5 text-lime-400 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                  <span className="text-sm">+1 234 567 890</span>
                </li>
                <li className="flex items-start space-x-3 text-gray-400">
                  <svg className="w-5 h-5 text-orange-400 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  <span className="text-sm">123 Calle Principal, Ciudad</span>
                </li>
              </ul>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="border-t border-gray-800 pt-8">
            <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
              <p className="text-gray-400 text-sm">
                &copy; 2025 <span className="text-white font-semibold">TiendaOnline</span>. Todos los derechos reservados.
              </p>
              <div className="flex items-center space-x-6 text-sm text-gray-400">
                <a href="#" className="hover:text-white transition-colors">Términos</a>
                <span className="text-gray-700">|</span>
                <a href="#" className="hover:text-white transition-colors">Privacidad</a>
                <span className="text-gray-700">|</span>
                <a href="#" className="hover:text-white transition-colors">Cookies</a>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
