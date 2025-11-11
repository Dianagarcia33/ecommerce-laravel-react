import { Link } from 'react-router-dom'
import { ExclamationTriangleIcon } from '@heroicons/react/24/outline'

export default function ErrorMessage({ error }) {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="text-center">
        <div className="inline-flex items-center justify-center w-20 h-20 mb-6 rounded-full bg-red-100">
          <ExclamationTriangleIcon className="w-10 h-10 text-red-600" />
        </div>
        <h2 className="text-2xl font-bold text-gray-900 mb-4">
          {error || 'Producto no encontrado'}
        </h2>
        <p className="text-gray-600 mb-8">
          Lo sentimos, no pudimos cargar la información del producto.
        </p>
        <Link
          to="/products"
          className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-primary-600 to-primary-700 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300"
        >
          Volver a Productos
        </Link>
      </div>
    </div>
  )
}
