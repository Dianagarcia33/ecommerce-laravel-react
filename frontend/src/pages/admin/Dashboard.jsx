import { Link } from 'react-router-dom';
import { ShoppingBagIcon, TagIcon, UserGroupIcon } from '@heroicons/react/24/outline';

export default function Dashboard() {
  return (
    <div className="min-h-screen bg-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Panel de Administración</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Gestión de Productos */}
          <Link
            to="/admin/products"
            className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow"
          >
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-xl font-semibold text-gray-900 mb-2">Productos</h2>
                <p className="text-gray-600">Gestionar productos</p>
              </div>
              <ShoppingBagIcon className="h-12 w-12 text-indigo-600" />
            </div>
          </Link>

          {/* Gestión de Categorías */}
          <Link
            to="/admin/categories"
            className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow"
          >
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-xl font-semibold text-gray-900 mb-2">Categorías</h2>
                <p className="text-gray-600">Gestionar categorías</p>
              </div>
              <TagIcon className="h-12 w-12 text-indigo-600" />
            </div>
          </Link>

          {/* Gestión de Usuarios */}
          <div className="bg-white rounded-lg shadow-md p-6 opacity-50 cursor-not-allowed">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-xl font-semibold text-gray-900 mb-2">Usuarios</h2>
                <p className="text-gray-600">Próximamente</p>
              </div>
              <UserGroupIcon className="h-12 w-12 text-gray-400" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
