import { Link, Outlet } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { useCart } from '../context/CartContext'
import { ShoppingCartIcon, UserIcon } from '@heroicons/react/24/outline'

export default function Layout() {
  const { user, logout } = useAuth()
  const { getItemCount } = useCart()

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-md sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <Link to="/" className="flex items-center space-x-2">
              <ShoppingCartIcon className="h-8 w-8 text-primary-600" />
              <span className="text-2xl font-bold text-gray-900">TiendaOnline</span>
            </Link>

            {/* Navigation */}
            <nav className="hidden md:flex space-x-8">
              <Link to="/" className="text-gray-700 hover:text-primary-600 font-medium">
                Inicio
              </Link>
              <Link to="/products" className="text-gray-700 hover:text-primary-600 font-medium">
                Productos
              </Link>
              {user && (
                <Link to="/admin" className="text-gray-700 hover:text-primary-600 font-medium">
                  Admin
                </Link>
              )}
            </nav>

            {/* User Actions */}
            <div className="flex items-center space-x-4">
              <Link to="/cart" className="relative">
                <ShoppingCartIcon className="h-6 w-6 text-gray-700 hover:text-primary-600" />
                {getItemCount() > 0 && (
                  <span className="absolute -top-2 -right-2 bg-primary-600 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                    {getItemCount()}
                  </span>
                )}
              </Link>

              {user ? (
                <div className="flex items-center space-x-3">
                  <span className="text-gray-700">Hola, {user.name}</span>
                  {user.role === 'admin' && (
                    <Link to="/admin" className="text-indigo-600 hover:text-indigo-700 font-medium">
                      Admin
                    </Link>
                  )}
                  <Link to="/orders" className="text-gray-700 hover:text-primary-600 font-medium">
                    Mis Órdenes
                  </Link>
                  <button onClick={logout} className="btn btn-secondary">
                    Salir
                  </button>
                </div>
              ) : (
                <div className="flex items-center space-x-2">
                  <Link to="/login" className="btn btn-primary">
                    Ingresar
                  </Link>
                  <Link to="/register" className="btn btn-secondary">
                    Registrarse
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main>
        <Outlet />
      </main>

      {/* Footer */}
      <footer className="bg-gray-900 text-white mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-lg font-bold mb-4">TiendaOnline</h3>
              <p className="text-gray-400">
                Tu tienda de confianza para productos de calidad
              </p>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4">Enlaces</h4>
              <ul className="space-y-2">
                <li><Link to="/" className="text-gray-400 hover:text-white">Inicio</Link></li>
                <li><Link to="/products" className="text-gray-400 hover:text-white">Productos</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4">Información</h4>
              <ul className="space-y-2">
                <li><a href="#" className="text-gray-400 hover:text-white">Sobre Nosotros</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white">Contacto</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4">Contacto</h4>
              <p className="text-gray-400">Email: info@tienda.com</p>
              <p className="text-gray-400">Tel: +1 234 567 890</p>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2025 TiendaOnline. Todos los derechos reservados.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
