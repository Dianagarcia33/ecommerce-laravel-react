import { PlusIcon } from '@heroicons/react/24/outline';

/**
 * Empty state component for categories list
 */
export default function CategoryEmptyState({ onCreateCategory }) {
  return (
    <div className="bg-white rounded-xl shadow-md p-12 text-center">
      <svg
        className="mx-auto h-16 w-16 text-gray-400 mb-4"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z"
        />
      </svg>
      <h3 className="text-xl font-semibold text-gray-900 mb-2">
        No hay categorías registradas
      </h3>
      <p className="text-gray-500 mb-6">
        Comienza creando tu primera categoría para organizar tus productos
      </p>
      <button
        onClick={onCreateCategory}
        className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-cyan-400 to-cyan-600 text-white rounded-lg hover:shadow-lg transition-all transform hover:scale-105"
      >
        <PlusIcon className="h-5 w-5" />
        Crear Primera Categoría
      </button>
    </div>
  );
}
