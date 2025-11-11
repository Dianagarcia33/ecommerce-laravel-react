import { useNavigate } from 'react-router-dom'

export default function ErrorMessage() {
  const navigate = useNavigate()

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 via-gray-50 to-slate-100">
      <div className="text-center">
        <div className="w-24 h-24 bg-gradient-to-br from-red-100 to-red-200 rounded-full flex items-center justify-center mx-auto mb-6">
          <svg className="w-12 h-12 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </div>
        <h2 className="text-3xl font-bold text-gray-900 mb-4">Producto no encontrado</h2>
        <p className="text-gray-600 mb-8">El producto que buscas no está disponible</p>
        <button
          onClick={() => navigate('/products')}
          className="px-8 py-4 bg-gradient-to-r from-cyan-500 to-cyan-600 text-white font-bold rounded-xl hover:shadow-lg transition-all"
        >
          Ver Todos los Productos
        </button>
      </div>
    </div>
  )
}
