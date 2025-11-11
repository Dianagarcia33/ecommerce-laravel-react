import { MagnifyingGlassIcon } from '@heroicons/react/24/outline'

export default function SearchButton({ loading }) {
  return (
    <button
      type="submit"
      disabled={loading}
      className="w-full bg-gradient-to-r from-cyan-500 to-teal-600 text-white font-bold py-4 px-6 rounded-xl hover:shadow-lg transform hover:scale-105 transition-all duration-200 disabled:opacity-50 disabled:transform-none flex items-center justify-center gap-2"
    >
      {loading ? (
        <>
          <div className="animate-spin rounded-full h-5 w-5 border-t-2 border-b-2 border-white"></div>
          Buscando...
        </>
      ) : (
        <>
          <MagnifyingGlassIcon className="w-5 h-5" />
          Rastrear Pedido
        </>
      )}
    </button>
  )
}
