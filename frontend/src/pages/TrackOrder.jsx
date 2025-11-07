import { useState } from 'react'
import { MagnifyingGlassIcon, TruckIcon, ClockIcon, CheckCircleIcon, XCircleIcon } from '@heroicons/react/24/outline'
import api from '../services/api'

export default function TrackOrder() {
  const [formData, setFormData] = useState({
    token: '',
    email: ''
  })
  const [order, setOrder] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setLoading(true)
    setOrder(null)

    try {
      const response = await api.post('/orders/track', formData)
      setOrder(response.data.order)
    } catch (err) {
      setError(err.response?.data?.message || 'Error al rastrear la orden')
    } finally {
      setLoading(false)
    }
  }

  const getStatusInfo = (status) => {
    const statusMap = {
      pending: {
        label: 'Pendiente',
        color: 'text-yellow-600',
        bg: 'bg-yellow-100',
        icon: ClockIcon
      },
      processing: {
        label: 'En Proceso',
        color: 'text-blue-600',
        bg: 'bg-blue-100',
        icon: TruckIcon
      },
      completed: {
        label: 'Completada',
        color: 'text-green-600',
        bg: 'bg-green-100',
        icon: CheckCircleIcon
      },
      cancelled: {
        label: 'Cancelada',
        color: 'text-red-600',
        bg: 'bg-red-100',
        icon: XCircleIcon
      }
    }
    return statusMap[status] || statusMap.pending
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-extrabold bg-gradient-to-r from-cyan-500 to-teal-600 bg-clip-text text-transparent mb-3">
            Rastrear Pedido
          </h1>
          <p className="text-gray-600 text-lg">Consulta el estado de tu orden</p>
        </div>

        {/* Formulario de búsqueda */}
        <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100 mb-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">
                Código de Rastreo
              </label>
              <input
                type="text"
                required
                value={formData.token}
                onChange={(e) => setFormData({ ...formData, token: e.target.value })}
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-cyan-400 focus:ring-4 focus:ring-cyan-100 transition-all outline-none"
                placeholder="Ingresa tu código de rastreo"
              />
              <p className="text-sm text-gray-500 mt-2">
                Este código te fue enviado por email al realizar tu compra
              </p>
            </div>

            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">
                Email
              </label>
              <input
                type="email"
                required
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-cyan-400 focus:ring-4 focus:ring-cyan-100 transition-all outline-none"
                placeholder="email@ejemplo.com"
              />
            </div>

            {error && (
              <div className="bg-red-50 border-2 border-red-200 text-red-700 px-4 py-3 rounded-xl flex items-start">
                <svg className="w-5 h-5 mr-2 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd"/>
                </svg>
                <span>{error}</span>
              </div>
            )}

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
          </form>
        </div>

        {/* Resultado */}
        {order && (
          <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
            <div className="flex items-center justify-between mb-6 pb-6 border-b border-gray-200">
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-1">
                  Orden #{order.id}
                </h2>
                <p className="text-gray-600">
                  {new Date(order.created_at).toLocaleDateString('es-ES', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                  })}
                </p>
              </div>
              {(() => {
                const statusInfo = getStatusInfo(order.status)
                const Icon = statusInfo.icon
                return (
                  <div className={`${statusInfo.bg} ${statusInfo.color} px-6 py-3 rounded-full font-bold flex items-center gap-2`}>
                    <Icon className="w-5 h-5" />
                    {statusInfo.label}
                  </div>
                )
              })()}
            </div>

            {/* Información del cliente */}
            <div className="mb-6">
              <h3 className="font-bold text-gray-900 mb-3 text-lg">Datos de Envío</h3>
              <div className="bg-gray-50 rounded-xl p-4 space-y-2">
                <p className="text-gray-700"><span className="font-semibold">Nombre:</span> {order.customer_name}</p>
                <p className="text-gray-700"><span className="font-semibold">Email:</span> {order.customer_email}</p>
                {order.customer_phone && (
                  <p className="text-gray-700"><span className="font-semibold">Teléfono:</span> {order.customer_phone}</p>
                )}
                <p className="text-gray-700"><span className="font-semibold">Dirección:</span> {order.shipping_address}</p>
              </div>
            </div>

            {/* Productos */}
            <div>
              <h3 className="font-bold text-gray-900 mb-3 text-lg">Productos</h3>
              <div className="space-y-3">
                {order.items?.map((item) => (
                  <div key={item.id} className="flex items-center gap-4 bg-gray-50 rounded-xl p-4">
                    <img
                      src={item.product?.images?.[0]?.image_url?.replace('http://localhost:8000/products/', 'http://localhost:8000/storage/products/') || 'https://placehold.co/100x100?text=Producto'}
                      alt={item.product?.name}
                      className="w-16 h-16 object-cover rounded-lg"
                    />
                    <div className="flex-1">
                      <h4 className="font-semibold text-gray-900">{item.product?.name}</h4>
                      <p className="text-sm text-gray-600">Cantidad: {item.quantity}</p>
                    </div>
                    <div className="text-right">
                      <p className="font-bold text-cyan-600">${item.price}</p>
                      <p className="text-sm text-gray-500">c/u</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Total */}
            <div className="mt-6 pt-6 border-t border-gray-200">
              <div className="flex justify-between items-center">
                <span className="text-xl font-bold text-gray-900">Total</span>
                <span className="text-3xl font-extrabold bg-gradient-to-r from-cyan-500 to-teal-600 bg-clip-text text-transparent">
                  ${order.total}
                </span>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
