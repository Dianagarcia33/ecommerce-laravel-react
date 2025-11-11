import { useSiteConfig } from '../../hooks/useSiteConfig'
import { TagIcon } from '@heroicons/react/24/outline'

export default function ProductInfo({ product }) {
  const { colors } = useSiteConfig()

  return (
    <div>
      <h1 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
        {product.name}
      </h1>
      
      {product.category && (
        <div className="inline-flex items-center gap-2 px-4 py-2 bg-gray-100 rounded-full mb-6">
          <TagIcon className="w-4 h-4 text-gray-600" />
          <span className="text-gray-700 font-medium">
            {product.category.name}
          </span>
        </div>
      )}

      <div className="mb-8">
        <div className="flex items-baseline gap-4">
          <span
            className="text-5xl font-bold"
            style={{ color: colors.primary.hex }}
          >
            ${product.price}
          </span>
          {product.sale_price && (
            <span className="text-2xl text-gray-400 line-through">
              ${product.sale_price}
            </span>
          )}
        </div>
      </div>

      <div className="bg-gradient-to-br from-gray-50 to-white p-6 rounded-2xl shadow-md mb-8">
        <h3 className="text-lg font-semibold text-gray-900 mb-3">Descripción</h3>
        <p className="text-gray-700 leading-relaxed">
          {product.description || 'No hay descripción disponible para este producto.'}
        </p>
      </div>

      <div className="flex items-center gap-3 mb-8">
        <div className="flex-1 bg-gradient-to-r from-blue-50 to-indigo-50 p-4 rounded-xl border border-blue-200">
          <p className="text-sm text-gray-600 mb-1">Stock disponible</p>
          <p className="text-2xl font-bold text-gray-900">
            {product.stock} <span className="text-base font-normal text-gray-600">unidades</span>
          </p>
        </div>
      </div>
    </div>
  )
}
