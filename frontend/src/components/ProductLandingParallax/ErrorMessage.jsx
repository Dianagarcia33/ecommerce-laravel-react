import { useNavigate } from 'react-router-dom'

export default function ErrorMessage() {
  const navigate = useNavigate()

  return (
    <div className="min-h-screen flex items-center justify-center bg-white">
      <div className="text-center">
        <h2 className="text-3xl font-bold text-gray-900 mb-4">Producto no encontrado</h2>
        <button
          onClick={() => navigate('/products')}
          className="px-6 py-3 bg-gradient-to-r from-cyan-500 to-teal-500 text-white font-bold rounded-xl hover:shadow-xl transition-all"
        >
          Ver todos los productos
        </button>
      </div>
    </div>
  )
}
