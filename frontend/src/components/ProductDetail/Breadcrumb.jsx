import { Link } from 'react-router-dom'
import { ChevronRightIcon } from '@heroicons/react/24/outline'

export default function Breadcrumb({ productName }) {
  return (
    <nav className="mb-8">
      <ol className="flex items-center space-x-2 text-sm">
        <li>
          <Link
            to="/"
            className="text-gray-500 hover:text-primary-600 transition-colors duration-200 font-medium"
          >
            Inicio
          </Link>
        </li>
        <li>
          <ChevronRightIcon className="w-4 h-4 text-gray-400" />
        </li>
        <li>
          <Link
            to="/products"
            className="text-gray-500 hover:text-primary-600 transition-colors duration-200 font-medium"
          >
            Productos
          </Link>
        </li>
        <li>
          <ChevronRightIcon className="w-4 h-4 text-gray-400" />
        </li>
        <li className="text-gray-900 font-semibold truncate max-w-xs">
          {productName}
        </li>
      </ol>
    </nav>
  )
}
