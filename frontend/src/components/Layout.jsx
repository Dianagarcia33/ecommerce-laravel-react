import { Link, Outlet, useLocation } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { useCart } from '../context/CartContext'
import { useState, useEffect } from 'react'
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
  SparklesIcon
} from '@heroicons/react/24/outline'

export default function Layout() {
  const { user, logout } = useAuth()
  const { getItemCount } = useCart()
  const location = useLocation()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

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
      {/* Header */}
      <header 
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled 
            ? 'bg-white/80 backdrop-blur-lg shadow-lg' 
            : 'bg-white shadow-md'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            {/* Logo */}
            <Link to="/" className="flex items-center space-x-3 group">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-cyan-400 to-cyan-600 rounded-xl blur opacity-50 group-hover:opacity-75 transition-opacity"></div>
                <div className="relative bg-gradient-to-br from-cyan-400 to-cyan-600 p-2 rounded-xl transform group-hover:scale-110 transition-transform duration-300">
                  <ShoppingCartIcon className="h-7 w-7 text-gray-900" />
                </div>
              </div>
              <div className="flex flex-col">
                <span className="text-2xl font-extrabold bg-gradient-to-r from-cyan-500 to-teal-600 bg-clip-text text-transparent">
                  TiendaOnline
                </span>
                <span className="text-xs text-gray-500 font-medium -mt-1">Tu tienda favorita</span>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center space-x-1">
              {navLinks.map((link) => (
                <Link
                  key={link.to}
                  to={link.to}
                  className={`relative px-4 py-2 rounded-lg font-medium transition-all duration-300 flex items-center space-x-2 group ${
                    isActive(link.to)
                      ? 'text-cyan-600'
                      : 'text-gray-700 hover:text-cyan-600'
                  }`}
                >
                  <link.icon className="h-5 w-5" />
                  <span>{link.label}</span>
                  {isActive(link.to) && (
                    <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-cyan-500 to-teal-600 rounded-full"></span>
                  )}
                  <span className="absolute inset-0 bg-cyan-50 rounded-lg scale-0 group-hover:scale-100 transition-transform duration-300 -z-10"></span>
                </Link>
              ))}
            </nav>

            {/* User Actions */}
            <div className="flex items-center space-x-3">
              {/* Cart */}
              <Link 
                to="/cart" 
                className="relative group"
              >
                <div className="relative p-2 rounded-full hover:bg-cyan-50 transition-colors">
                  <ShoppingCartIcon className="h-6 w-6 text-gray-700 group-hover:text-cyan-600 transition-colors" />
                  {getItemCount() > 0 && (
                    <span className="absolute -top-1 -right-1 bg-gradient-to-r from-lime-400 to-green-500 text-gray-900 text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center animate-pulse shadow-lg">
                      {getItemCount()}
                    </span>
                  )}
                </div>
              </Link>

              {/* User Menu - Desktop */}
              {user ? (
                <div className="hidden md:flex items-center space-x-3">
                  <div className="flex items-center space-x-2 px-3 py-2 bg-gradient-to-r from-cyan-50 to-teal-50 rounded-full border border-cyan-200">
                    <div className="h-8 w-8 bg-gradient-to-br from-cyan-400 to-cyan-600 rounded-full flex items-center justify-center shadow-md">
                      <span className="text-gray-900 font-bold text-sm">{user.name.charAt(0).toUpperCase()}</span>
                    </div>
                    <span className="text-sm font-semibold text-gray-800">Hola, {user.name.split(' ')[0]}</span>
                  </div>
                  
                  <Link 
                    to="/orders" 
                    className="flex items-center space-x-1 px-4 py-2 text-gray-700 hover:text-cyan-600 hover:bg-cyan-50 rounded-lg transition-all border border-transparent hover:border-cyan-200"
                  >
                    <ClipboardDocumentListIcon className="h-5 w-5" />
                    <span className="text-sm font-medium">Órdenes</span>
                  </Link>
                  
                  <button 
                    onClick={logout} 
                    className="flex items-center space-x-1 px-4 py-2 bg-red-50 text-red-600 hover:bg-red-600 hover:text-white rounded-lg transition-all font-medium border border-red-200 hover:border-red-600"
                  >
                    <ArrowRightOnRectangleIcon className="h-5 w-5" />
                    <span className="text-sm">Salir</span>
                  </button>
                </div>
              ) : (
                <div className="hidden md:flex items-center space-x-2">
                  <Link 
                    to="/login" 
                    className="flex items-center space-x-2 px-5 py-2.5 bg-white border-2 border-cyan-500 text-cyan-600 hover:bg-cyan-50 rounded-full transition-all font-semibold shadow-sm hover:shadow-md"
                  >
                    <UserIcon className="h-5 w-5" />
                    <span>Ingresar</span>
                  </Link>
                  <Link 
                    to="/register" 
                    className="flex items-center space-x-2 px-5 py-2.5 bg-gradient-to-r from-cyan-400 to-cyan-600 text-gray-900 hover:from-cyan-300 hover:to-cyan-500 hover:shadow-lg hover:scale-105 rounded-full transition-all font-semibold shadow-md"
                  >
                    <UserPlusIcon className="h-5 w-5" />
                    <span>Registrarse</span>
                  </Link>
                </div>
              )}

              {/* Mobile Menu Button */}
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="md:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors"
              >
                {mobileMenuOpen ? (
                  <XMarkIcon className="h-6 w-6 text-gray-700" />
                ) : (
                  <Bars3Icon className="h-6 w-6 text-gray-700" />
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        <div
          className={`md:hidden transition-all duration-300 ease-in-out overflow-hidden ${
            mobileMenuOpen ? 'max-h-screen opacity-100' : 'max-h-0 opacity-0'
          }`}
        >
          <div className="px-4 pt-2 pb-6 space-y-2 bg-white/95 backdrop-blur-lg border-t border-gray-100">
            {navLinks.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                className={`flex items-center space-x-3 px-4 py-3 rounded-xl transition-all ${
                  isActive(link.to)
                    ? 'bg-gradient-to-r from-cyan-400 to-cyan-600 text-gray-900 shadow-lg'
                    : 'text-gray-700 hover:bg-cyan-50'
                }`}
              >
                <link.icon className="h-5 w-5" />
                <span className="font-medium">{link.label}</span>
              </Link>
            ))}

            <div className="pt-4 border-t border-gray-200">
              {user ? (
                <>
                  <div className="flex items-center space-x-3 px-4 py-3 bg-gradient-to-r from-cyan-50 to-teal-50 rounded-xl mb-2 border border-cyan-200">
                    <div className="h-10 w-10 bg-gradient-to-br from-cyan-400 to-cyan-600 rounded-full flex items-center justify-center shadow-md">
                      <span className="text-gray-900 font-bold">{user.name.charAt(0).toUpperCase()}</span>
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-gray-900">{user.name}</p>
                      <p className="text-xs text-gray-600">{user.email}</p>
                    </div>
                  </div>
                  
                  <Link
                    to="/orders"
                    className="flex items-center space-x-3 px-4 py-3 text-gray-700 hover:bg-cyan-50 hover:text-cyan-600 rounded-xl transition-all"
                  >
                    <ClipboardDocumentListIcon className="h-5 w-5" />
                    <span className="font-medium">Mis Órdenes</span>
                  </Link>
                  
                  <button
                    onClick={logout}
                    className="w-full flex items-center space-x-3 px-4 py-3 bg-red-50 text-red-600 hover:bg-red-100 rounded-xl transition-all font-medium mt-2"
                  >
                    <ArrowRightOnRectangleIcon className="h-5 w-5" />
                    <span>Cerrar Sesión</span>
                  </button>
                </>
              ) : (
                <div className="space-y-2">
                  <Link
                    to="/login"
                    className="flex items-center justify-center space-x-2 w-full px-4 py-3 border-2 border-cyan-500 text-cyan-600 hover:bg-cyan-50 rounded-xl transition-all font-semibold"
                  >
                    <UserIcon className="h-5 w-5" />
                    <span>Ingresar</span>
                  </Link>
                  <Link
                    to="/register"
                    className="flex items-center justify-center space-x-2 w-full px-4 py-3 bg-gradient-to-r from-cyan-400 to-cyan-600 text-gray-900 hover:shadow-lg rounded-xl transition-all font-semibold"
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
      <div className="h-20"></div>

      {/* Main Content */}
      <main className="min-h-screen">
        <Outlet />
      </main>

      {/* Footer */}
      <footer className="relative bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white overflow-hidden">
        {/* Decorative Elements */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-96 h-96 bg-cyan-500 rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-lime-500 rounded-full blur-3xl"></div>
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          {/* Main Footer Content */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
            {/* Brand Section */}
            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <div className="bg-gradient-to-br from-cyan-400 to-cyan-600 p-2.5 rounded-xl shadow-lg">
                  <ShoppingCartIcon className="h-6 w-6 text-gray-900" />
                </div>
                <div>
                  <h3 className="text-xl font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                    TiendaOnline
                  </h3>
                  <p className="text-xs text-gray-400">Tu tienda favorita</p>
                </div>
              </div>
              <p className="text-gray-400 text-sm leading-relaxed">
                Tu destino de compras online con los mejores productos y ofertas del mercado. Calidad garantizada.
              </p>
              <div className="flex space-x-3">
                <a href="#" className="w-10 h-10 bg-gray-800 hover:bg-cyan-500 rounded-full flex items-center justify-center transition-all hover:scale-110">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
                </a>
                <a href="#" className="w-10 h-10 bg-gray-800 hover:bg-lime-500 rounded-full flex items-center justify-center transition-all hover:scale-110">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/></svg>
                </a>
                <a href="#" className="w-10 h-10 bg-gray-800 hover:bg-orange-500 rounded-full flex items-center justify-center transition-all hover:scale-110">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0C8.74 0 8.333.015 7.053.072 5.775.132 4.905.333 4.14.63c-.789.306-1.459.717-2.126 1.384S.935 3.35.63 4.14C.333 4.905.131 5.775.072 7.053.012 8.333 0 8.74 0 12s.015 3.667.072 4.947c.06 1.277.261 2.148.558 2.913.306.788.717 1.459 1.384 2.126.667.666 1.336 1.079 2.126 1.384.766.296 1.636.499 2.913.558C8.333 23.988 8.74 24 12 24s3.667-.015 4.947-.072c1.277-.06 2.148-.262 2.913-.558.788-.306 1.459-.718 2.126-1.384.666-.667 1.079-1.335 1.384-2.126.296-.765.499-1.636.558-2.913.06-1.28.072-1.687.072-4.947s-.015-3.667-.072-4.947c-.06-1.277-.262-2.149-.558-2.913-.306-.789-.718-1.459-1.384-2.126C21.319 1.347 20.651.935 19.86.63c-.765-.297-1.636-.499-2.913-.558C15.667.012 15.26 0 12 0zm0 2.16c3.203 0 3.585.016 4.85.071 1.17.055 1.805.249 2.227.415.562.217.96.477 1.382.896.419.42.679.819.896 1.381.164.422.36 1.057.413 2.227.057 1.266.07 1.646.07 4.85s-.015 3.585-.074 4.85c-.061 1.17-.256 1.805-.421 2.227-.224.562-.479.96-.899 1.382-.419.419-.824.679-1.38.896-.42.164-1.065.36-2.235.413-1.274.057-1.649.07-4.859.07-3.211 0-3.586-.015-4.859-.074-1.171-.061-1.816-.256-2.236-.421-.569-.224-.96-.479-1.379-.899-.421-.419-.69-.824-.9-1.38-.165-.42-.359-1.065-.42-2.235-.045-1.26-.061-1.649-.061-4.844 0-3.196.016-3.586.061-4.861.061-1.17.255-1.814.42-2.234.21-.57.479-.96.9-1.381.419-.419.81-.689 1.379-.898.42-.166 1.051-.361 2.221-.421 1.275-.045 1.65-.06 4.859-.06l.045.03zm0 3.678c-3.405 0-6.162 2.76-6.162 6.162 0 3.405 2.76 6.162 6.162 6.162 3.405 0 6.162-2.76 6.162-6.162 0-3.405-2.76-6.162-6.162-6.162zM12 16c-2.21 0-4-1.79-4-4s1.79-4 4-4 4 1.79 4 4-1.79 4-4 4zm7.846-10.405c0 .795-.646 1.44-1.44 1.44-.795 0-1.44-.646-1.44-1.44 0-.794.646-1.439 1.44-1.439.793-.001 1.44.645 1.44 1.439z"/></svg>
                </a>
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h4 className="text-lg font-bold mb-6 flex items-center">
                <span className="w-1 h-6 bg-gradient-to-b from-cyan-400 to-cyan-600 rounded-full mr-3"></span>
                Enlaces Rápidos
              </h4>
              <ul className="space-y-3">
                <li>
                  <Link to="/" className="text-gray-400 hover:text-white transition-colors flex items-center group">
                    <span className="w-0 group-hover:w-2 h-0.5 bg-cyan-400 mr-0 group-hover:mr-2 transition-all"></span>
                    Inicio
                  </Link>
                </li>
                <li>
                  <Link to="/products" className="text-gray-400 hover:text-white transition-colors flex items-center group">
                    <span className="w-0 group-hover:w-2 h-0.5 bg-cyan-400 mr-0 group-hover:mr-2 transition-all"></span>
                    Productos
                  </Link>
                </li>
                <li>
                  <Link to="/orders" className="text-gray-400 hover:text-white transition-colors flex items-center group">
                    <span className="w-0 group-hover:w-2 h-0.5 bg-cyan-400 mr-0 group-hover:mr-2 transition-all"></span>
                    Mis Órdenes
                  </Link>
                </li>
              </ul>
            </div>

            {/* Information */}
            <div>
              <h4 className="text-lg font-bold mb-6 flex items-center">
                <span className="w-1 h-6 bg-gradient-to-b from-lime-400 to-green-500 rounded-full mr-3"></span>
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
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/>
                  </svg>
                  <span className="text-sm">info@tienda.com</span>
                </li>
                <li className="flex items-start space-x-3 text-gray-400">
                  <svg className="w-5 h-5 text-lime-400 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"/>
                  </svg>
                  <span className="text-sm">+1 234 567 890</span>
                </li>
                <li className="flex items-start space-x-3 text-gray-400">
                  <svg className="w-5 h-5 text-orange-400 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/>
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/>
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
