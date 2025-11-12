import { PencilIcon, TrashIcon } from '@heroicons/react/24/outline';
/**
 * Categories row component for the category table
 */
export default function CategoryRow({ category, onEdit, onDelete, isLoading }) {
    return (
        <tr className="hover:bg-gray-50 transition">
            <td className="px-6 py-4 whitespace-nowrap">
                <img
                    src={
                        category.image_url?.replace(
                            'http://localhost:8000/categories/',
                            'http://localhost:8000/storage/categories/'
                        ) || 'https://placehold.co/300x300?text=Sin+imagen'
                    }
                alt={category.name}
                className="h-12 w-12 object-cover rounded-lg shadow-sm"
            />
            </td>
            <td className="px-6 py-4 whitespace-nowrap">
                <div className="text-sm font-medium text-gray-900">{category.name}</div>
            </td>
            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {category.description || 'Sin descripción'}
            </td>
            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {category.products_count || 0} producto{category.products_count !== 1 ? 's' : ''}
            </td>
            <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                <button
                    onClick={() => onEdit(category)}
                    disabled={isLoading}
                    className="text-cyan-600 hover:text-cyan-900 mr-4 disabled:opacity-50 transition"
                    title="Editar categoría"
                >
                    <PencilIcon className="h-5 w-5" />
                </button>
                <button
                    onClick={() => onDelete(category.id)}
                    disabled={isLoading}
                    className="text-red-600 hover:text-red-900 disabled:opacity-50 transition"
                    title="Eliminar categoría"
                >
                    <TrashIcon className="h-5 w-5" />
                </button>
            </td>
        </tr>
    );
}