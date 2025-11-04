import { PencilIcon, TrashIcon } from '@heroicons/react/24/outline';
import { getStockStatusClass, formatPrice } from '../../../utils/product.utils';

/**
 * Product row component for the products table
 */
export default function ProductRow({ product, onEdit, onDelete, isLoading }) {
  return (
    <tr className="hover:bg-gray-50 transition">
      <td className="px-6 py-4 whitespace-nowrap">
        <img 
          src={product.image || 'https://via.placeholder.com/50'} 
          alt={product.name} 
          className="h-12 w-12 object-cover rounded-lg shadow-sm" 
        />
      </td>
      <td className="px-6 py-4 whitespace-nowrap">
        <div className="text-sm font-medium text-gray-900">{product.name}</div>
      </td>
      <td className="px-6 py-4 whitespace-nowrap">
        <span className="px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full bg-cyan-100 text-cyan-800">
          {product.category?.name || 'Sin categoría'}
        </span>
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
        {formatPrice(product.price)}
      </td>
      <td className="px-6 py-4 whitespace-nowrap">
        <span className={`px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${getStockStatusClass(product.stock)}`}>
          {product.stock} unidades
        </span>
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
        {product.images?.length || 0} imágenes
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
        <button
          onClick={() => onEdit(product)}
          disabled={isLoading}
          className="text-cyan-600 hover:text-cyan-900 mr-4 disabled:opacity-50 transition"
          title="Editar producto"
        >
          <PencilIcon className="h-5 w-5" />
        </button>
        <button
          onClick={() => onDelete(product.id)}
          disabled={isLoading}
          className="text-red-600 hover:text-red-900 disabled:opacity-50 transition"
          title="Eliminar producto"
        >
          <TrashIcon className="h-5 w-5" />
        </button>
      </td>
    </tr>
  );
}
