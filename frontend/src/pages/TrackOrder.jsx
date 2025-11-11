import { useState } from 'react'
import { TruckIcon, ClockIcon, CheckCircleIcon, XCircleIcon } from '@heroicons/react/24/outline'
import api from '../services/api'
import {
  PageHeader,
  TrackingInput,
  ErrorMessage,
  SearchButton,
  OrderHeader,
  ShippingInfo,
  ProductsList,
  OrderTotal
} from '../components/TrackOrder'

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
        <PageHeader />

        {/* Formulario de búsqueda */}
        <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100 mb-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            <TrackingInput
              label="Código de Rastreo"
              type="text"
              value={formData.token}
              onChange={(e) => setFormData({ ...formData, token: e.target.value })}
              placeholder="Ingresa tu código de rastreo"
              helperText="Este código te fue enviado por email al realizar tu compra"
              required
            />

            <TrackingInput
              label="Email"
              type="email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              placeholder="email@ejemplo.com"
              required
            />

            <ErrorMessage message={error} />
            <SearchButton loading={loading} />
          </form>
        </div>

        {/* Resultado */}
        {order && (
          <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
            <OrderHeader order={order} statusInfo={getStatusInfo(order.status)} />
            <ShippingInfo order={order} />
            <ProductsList items={order.items} />
            <OrderTotal total={order.total} />
          </div>
        )}
      </div>
    </div>
  )
}
