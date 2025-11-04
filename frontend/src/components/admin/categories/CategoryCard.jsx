import { PencilIcon, TrashIcon } from '@heroicons/react/24/outline';

/**
 * Category card component
 */
export default function CategoryCard({ category, onEdit, onDelete, isLoading }) {
  return (
    <div className="bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 p-6 transform hover:-translate-y-1">
      <div className="mb-4">
        <h3 className="text-xl font-semibold text-gray-900 mb-2">{category.name}</h3>
        <p className="text-gray-600 text-sm line-clamp-2">{category.description || 'Sin descripción'}</p>
      </div>
      
      <div className="flex items-center justify-between mb-4">
        <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-cyan-100 text-cyan-800">
          {category.products_count || 0} producto{category.products_count !== 1 ? 's' : ''}
        </span>
      </div>

      <div className="flex gap-2">
        <button
          onClick={() => onEdit(category)}
          disabled={isLoading}
          className="flex-1 flex items-center justify-center gap-2 px-4 py-2 rounded-lg font-medium text-sm transition-all duration-300 transform hover:scale-105 bg-gradient-to-r from-cyan-400 to-cyan-600 text-white shadow-md hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed active:scale-95"
        >
          <PencilIcon className="h-4 w-4" />
          Editar
        </button>
        <button
          onClick={() => onDelete(category.id)}
          disabled={isLoading}
          className="flex-1 flex items-center justify-center gap-2 px-4 py-2 rounded-lg font-medium text-sm transition-all duration-300 transform hover:scale-105 bg-gradient-to-r from-red-400 to-red-600 text-white shadow-md hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed active:scale-95"
        >
          <TrashIcon className="h-4 w-4" />
          Eliminar
        </button>
      </div>
    </div>
  );
}
