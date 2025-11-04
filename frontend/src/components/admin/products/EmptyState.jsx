import { PlusIcon } from '@heroicons/react/24/outline';

/**
 * Empty state component for products list
 */
export default function EmptyState({ onCreateProduct }) {
  return (
    <div className="text-center py-12">
      <p className="text-gray-500 text-lg mb-4">No hay productos registrados</p>
      <button
        onClick={onCreateProduct}
        className="px-6 py-3 bg-cyan-500 text-white rounded-lg hover:bg-cyan-600 transition"
      >
        Crear Primer Producto
      </button>
    </div>
  );
}
