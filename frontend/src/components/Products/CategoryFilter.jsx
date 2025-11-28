import { FunnelIcon } from '@heroicons/react/24/outline'
import { useSiteConfig } from '../../hooks/useSiteConfig'

export default function CategoryFilter({ categories, selectedCategory, setSelectedCategory }) {
  const { theme, products } = useSiteConfig()
  const { colors } = theme

  return (
    <div className="flex items-center gap-3">
      <div className="flex items-center gap-2 text-gray-600 font-medium">
        <FunnelIcon className="w-5 h-5" />
        <span>{products.filterLabel}</span>
      </div>
      <div className="flex flex-wrap gap-2">
        <button
          onClick={() => setSelectedCategory(null)}
          className={`px-5 py-2 rounded-full font-medium transition-all duration-300 transform hover:scale-105 ${!selectedCategory
              ? 'text-white shadow-lg'
              : 'bg-white text-gray-700 border-2 border-gray-200'
            }`}
          style={!selectedCategory ? {
            background: `linear-gradient(to right, ${colors.primary.hex}, ${colors.primary.dark})`
          } : {}}
          onMouseEnter={(e) => {
            if (selectedCategory) {
              e.target.style.borderColor = colors.primary.hex
            }
          }}
          onMouseLeave={(e) => {
            if (selectedCategory) {
              e.target.style.borderColor = '#e5e7eb'
            }
          }}
        >
          {products.allLabel}
        </button>
        {categories.map((category) => (
          <button
            key={category.id}
            onClick={() => setSelectedCategory(category.id)}
            className={`px-5 py-2 rounded-full font-medium transition-all duration-300 transform hover:scale-105 ${selectedCategory === category.id
                ? 'text-white shadow-lg'
                : 'bg-white text-gray-700 border-2 border-gray-200'
              }`}
            style={selectedCategory === category.id ? {
              background: `linear-gradient(to right, ${colors.primary.hex}, ${colors.primary.dark})`
            } : {}}
            onMouseEnter={(e) => {
              if (selectedCategory !== category.id) {
                e.target.style.borderColor = colors.primary.hex
              }
            }}
            onMouseLeave={(e) => {
              if (selectedCategory !== category.id) {
                e.target.style.borderColor = '#e5e7eb'
              }
            }}
          >
            {category.name}
          </button>
        ))}
      </div>
    </div>
  )
}
