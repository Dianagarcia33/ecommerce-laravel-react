import { MagnifyingGlassIcon } from '@heroicons/react/24/outline'
import { useSiteConfig } from '../../hooks/useSiteConfig'

export default function SearchBar({ searchTerm, setSearchTerm }) {
  const { theme, products } = useSiteConfig()
  const { colors } = theme

  return (
    <div className="relative max-w-xl mx-auto">
      <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
        <MagnifyingGlassIcon className="h-5 w-5 text-gray-400" />
      </div>
      <input
        type="text"
        placeholder={products.searchPlaceholder}
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="w-full pl-12 pr-4 py-3 border-2 border-gray-200 rounded-xl transition-all outline-none"
        style={{
          '--focus-border': colors.primary.hex,
          '--focus-ring': `${colors.primary.hex}40`
        }}
        onFocus={(e) => {
          e.target.style.borderColor = colors.primary.hex
          e.target.style.boxShadow = `0 0 0 3px ${colors.primary.hex}40`
        }}
        onBlur={(e) => {
          e.target.style.borderColor = '#e5e7eb'
          e.target.style.boxShadow = 'none'
        }}
      />
    </div>
  )
}
