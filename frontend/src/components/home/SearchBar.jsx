import { Link } from 'react-router-dom'
import { MagnifyingGlassIcon, XMarkIcon } from '@heroicons/react/24/outline'
import { useSiteConfig } from '../../hooks/useSiteConfig'

export default function SearchBar({ 
  searchTerm, 
  setSearchTerm, 
  searchResults, 
  showSearchResults, 
  setShowSearchResults,
  searchRef 
}) {
  const config = useSiteConfig()
  const { theme } = config
  const { colors } = theme

  return (
    <div ref={searchRef} className="relative">
      <div className="relative">
        <div className="absolute inset-y-0 left-0 pl-5 flex items-center pointer-events-none">
          <MagnifyingGlassIcon className="h-6 w-6 text-gray-400" />
        </div>
        <input
          type="text"
          placeholder="¿Qué estás buscando hoy?"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full pl-14 pr-12 py-4 text-lg border-2 border-gray-200 rounded-2xl bg-white shadow-lg transition-all outline-none hover:border-gray-300 focus:border-transparent focus:ring-4"
          onFocus={(e) => {
            if (searchTerm) setShowSearchResults(true)
            e.target.style.boxShadow = `0 0 0 4px ${colors.primary.hex}40`
          }}
          onBlur={(e) => {
            setTimeout(() => {
              if (!searchRef.current?.contains(document.activeElement)) {
                e.target.style.boxShadow = ''
              }
            }, 200)
          }}
        />
        {searchTerm && (
          <button
            onClick={() => {
              setSearchTerm('')
              setShowSearchResults(false)
            }}
            className="absolute inset-y-0 right-0 pr-5 flex items-center text-gray-400 hover:text-gray-600 transition-colors"
          >
            <XMarkIcon className="h-6 w-6" />
          </button>
        )}
      </div>

      {/* Resultados del buscador */}
      {showSearchResults && searchResults.length > 0 && (
        <div className="absolute z-50 w-full mt-2 bg-white rounded-2xl shadow-2xl border border-gray-100 overflow-hidden">
          <div className="p-3 bg-gray-50 border-b border-gray-100">
            <p className="text-sm font-semibold text-gray-700">
              {searchResults.length} resultado{searchResults.length !== 1 ? 's' : ''} encontrado{searchResults.length !== 1 ? 's' : ''}
            </p>
          </div>
          <div className="max-h-96 overflow-y-auto">
            {searchResults.map((product) => (
              <Link
                key={product.id}
                to={`/products`}
                onClick={() => {
                  setShowSearchResults(false)
                  setSearchTerm('')
                }}
                className="flex items-center gap-4 p-4 hover:bg-gray-50 transition-colors border-b border-gray-100 last:border-b-0"
              >
                <img
                  src={product.images?.[0]?.image_url || 'https://via.placeholder.com/80'}
                  alt={product.name}
                  className="w-16 h-16 object-cover rounded-xl shadow-sm"
                />
                <div className="flex-1 min-w-0">
                  <h4 className="font-bold text-gray-900 truncate">
                    {product.name}
                  </h4>
                  <p className="text-sm text-gray-600 truncate">
                    {product.category?.name || 'Sin categoría'}
                  </p>
                </div>
                <div className="text-right">
                  <div 
                    className="text-xl font-black"
                    style={{ color: colors.primary.hex }}
                  >
                    ${parseFloat(product.price).toFixed(2)}
                  </div>
                  {product.stock < 10 && product.stock > 0 && (
                    <div className="text-xs text-orange-600 font-medium">
                      Solo {product.stock}
                    </div>
                  )}
                  {product.stock === 0 && (
                    <div className="text-xs text-red-600 font-medium">
                      Agotado
                    </div>
                  )}
                </div>
              </Link>
            ))}
          </div>
          <div className="p-3 bg-gray-50 border-t border-gray-100">
            <Link
              to="/products"
              onClick={() => {
                setShowSearchResults(false)
                setSearchTerm('')
              }}
              className="block text-center font-bold transition-colors"
              style={{ color: colors.primary.hex }}
            >
              Ver todos los productos →
            </Link>
          </div>
        </div>
      )}

      {/* Sin resultados */}
      {showSearchResults && searchTerm && searchResults.length === 0 && (
        <div className="absolute z-50 w-full mt-2 bg-white rounded-2xl shadow-2xl border border-gray-100 p-8 text-center">
          <MagnifyingGlassIcon className="w-12 h-12 text-gray-300 mx-auto mb-3" />
          <p className="text-gray-600 font-medium mb-2">
            No encontramos resultados para "{searchTerm}"
          </p>
          <p className="text-sm text-gray-500">
            Intenta con otras palabras clave o explora nuestro catálogo completo
          </p>
          <Link
            to="/products"
            onClick={() => {
              setShowSearchResults(false)
              setSearchTerm('')
            }}
            className="inline-block mt-4 px-6 py-2 rounded-full font-bold text-white shadow-lg hover:shadow-xl transform hover:scale-105 transition-all"
            style={{ background: colors.primary.hex }}
          >
            Ver todo el catálogo
          </Link>
        </div>
      )}
    </div>
  )
}
