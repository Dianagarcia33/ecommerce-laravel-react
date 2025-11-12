import { useState, useEffect } from 'react'
import { 
  ShoppingBagIcon, 
  MagnifyingGlassIcon,
  FunnelIcon,
  CheckCircleIcon,
  ClockIcon,
  XCircleIcon,
  TruckIcon,
  EyeIcon,
  ChevronLeftIcon,
  ChevronRightIcon
} from '@heroicons/react/24/outline'
import api from '../../services/api'

export default function OrdersManager() {
  const [orders, setOrders] = useState([])
  const [filteredOrders, setFilteredOrders] = useState([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [statusFilter, setStatusFilter] = useState('all')
  const [selectedOrder, setSelectedOrder] = useState(null)
  const [showModal, setShowModal] = useState(false)
  const [updating, setUpdating] = useState(false)
  const [currentPage, setCurrentPage] = useState(1)
  const [ordersPerPage] = useState(10)

  useEffect(() => {
    fetchOrders()
  }, [])

  useEffect(() => {
    filterOrders()
    setCurrentPage(1) // Reset a la primera página cuando cambian los filtros
  }, [orders, searchTerm, statusFilter])

  const fetchOrders = async () => {
    try {
      const response = await api.get('/orders')
      setOrders(response.data)
      setLoading(false)
    } catch (error) {
      console.error('Error fetching orders:', error)
      setLoading(false)
    }
  }

  const filterOrders = () => {
    let filtered = [...orders]

    // Filtrar por búsqueda
    if (searchTerm) {
      filtered = filtered.filter(order => 
        order.customer_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        order.customer_email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        order.id.toString().includes(searchTerm)
      )
    }

    // Filtrar por estado
    if (statusFilter !== 'all') {
      filtered = filtered.filter(order => order.status === statusFilter)
    }

    setFilteredOrders(filtered)
  }

  const updateOrderStatus = async (orderId, newStatus) => {
    setUpdating(true)
    try {
      await api.put(`/orders/${orderId}/status`, { status: newStatus })
      
      // Actualizar en el estado local
      setOrders(orders.map(order => 
        order.id === orderId ? { ...order, status: newStatus } : order
      ))

      if (selectedOrder?.id === orderId) {
        setSelectedOrder({ ...selectedOrder, status: newStatus })
      }

      alert('Estado actualizado correctamente')
    } catch (error) {
      console.error('Error updating status:', error)
      alert('Error al actualizar el estado')
    } finally {
      setUpdating(false)
    }
  }

  const getStatusBadge = (status) => {
    const badges = {
      pending: { 
        color: 'bg-yellow-100 text-yellow-800 border-yellow-200', 
        icon: ClockIcon,
        text: 'Pendiente' 
      },
      processing: { 
        color: 'bg-blue-100 text-blue-800 border-blue-200', 
        icon: TruckIcon,
        text: 'Procesando' 
      },
      completed: { 
        color: 'bg-green-100 text-green-800 border-green-200', 
        icon: CheckCircleIcon,
        text: 'Completada' 
      },
      cancelled: { 
        color: 'bg-red-100 text-red-800 border-red-200', 
        icon: XCircleIcon,
        text: 'Cancelada' 
      }
    }

    const badge = badges[status] || badges.pending
    const Icon = badge.icon

    return (
      <span className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-semibold border ${badge.color}`}>
        <Icon className="w-4 h-4" />
        {badge.text}
      </span>
    )
  }

  const openOrderModal = (order) => {
    setSelectedOrder(order)
    setShowModal(true)
  }

  // Paginación
  const indexOfLastOrder = currentPage * ordersPerPage
  const indexOfFirstOrder = indexOfLastOrder - ordersPerPage
  const currentOrders = filteredOrders.slice(indexOfFirstOrder, indexOfLastOrder)
  const totalPages = Math.ceil(filteredOrders.length / ordersPerPage)

  const paginate = (pageNumber) => setCurrentPage(pageNumber)

  const goToPreviousPage = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1)
  }

  const goToNextPage = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1)
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-b-4 border-blue-500"></div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-3">
            <ShoppingBagIcon className="w-8 h-8 text-blue-600" />
            Gestión de Órdenes
          </h1>
          <p className="text-gray-600 mt-2">
            Administra y actualiza el estado de todas las órdenes
          </p>
        </div>

        {/* Filtros */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Búsqueda */}
            <div className="relative">
              <MagnifyingGlassIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Buscar por cliente, email o #orden..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            {/* Filtro de estado */}
            <div className="relative">
              <FunnelIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent appearance-none cursor-pointer"
              >
                <option value="all">Todos los estados</option>
                <option value="pending">Pendiente</option>
                <option value="processing">Procesando</option>
                <option value="completed">Completada</option>
                <option value="cancelled">Cancelada</option>
              </select>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
            <div className="text-center p-4 bg-yellow-50 rounded-lg border border-yellow-200">
              <p className="text-2xl font-bold text-yellow-800">
                {orders.filter(o => o.status === 'pending').length}
              </p>
              <p className="text-xs text-yellow-600 mt-1">Pendientes</p>
            </div>
            <div className="text-center p-4 bg-blue-50 rounded-lg border border-blue-200">
              <p className="text-2xl font-bold text-blue-800">
                {orders.filter(o => o.status === 'processing').length}
              </p>
              <p className="text-xs text-blue-600 mt-1">Procesando</p>
            </div>
            <div className="text-center p-4 bg-green-50 rounded-lg border border-green-200">
              <p className="text-2xl font-bold text-green-800">
                {orders.filter(o => o.status === 'completed').length}
              </p>
              <p className="text-xs text-green-600 mt-1">Completadas</p>
            </div>
            <div className="text-center p-4 bg-red-50 rounded-lg border border-red-200">
              <p className="text-2xl font-bold text-red-800">
                {orders.filter(o => o.status === 'cancelled').length}
              </p>
              <p className="text-xs text-red-600 mt-1">Canceladas</p>
            </div>
          </div>
        </div>

        {/* Tabla de órdenes */}
        <div className="bg-white rounded-lg shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Orden
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Cliente
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Total
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Estado
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Fecha
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Acciones
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredOrders.length === 0 ? (
                  <tr>
                    <td colSpan="6" className="px-6 py-12 text-center text-gray-500">
                      No se encontraron órdenes
                    </td>
                  </tr>
                ) : (
                  currentOrders.map((order) => (
                    <tr key={order.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="font-mono text-sm font-semibold text-gray-900">
                          #{order.id}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div>
                          <p className="text-sm font-medium text-gray-900">
                            {order.customer_name}
                          </p>
                          <p className="text-xs text-gray-500">
                            {order.customer_email}
                          </p>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="text-sm font-bold text-gray-900">
                          ${parseFloat(order.total).toFixed(2)}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {getStatusBadge(order.status)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {new Date(order.created_at).toLocaleDateString('es-ES')}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <button
                          onClick={() => openOrderModal(order)}
                          className="text-cyan-600 hover:text-cyan-900 transition"
                          title="Ver detalles"
                        >
                          <EyeIcon className="h-5 w-5" />
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>

          {/* Paginador */}
          {filteredOrders.length > 0 && (
            <div className="px-6 py-4 bg-gray-50 border-t border-gray-200 flex items-center justify-between">
              <div className="flex-1 flex justify-between sm:hidden">
                <button
                  onClick={goToPreviousPage}
                  disabled={currentPage === 1}
                  className="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Anterior
                </button>
                <button
                  onClick={goToNextPage}
                  disabled={currentPage === totalPages}
                  className="ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Siguiente
                </button>
              </div>
              <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
                <div>
                  <p className="text-sm text-gray-700">
                    Mostrando{' '}
                    <span className="font-medium">{indexOfFirstOrder + 1}</span>
                    {' '}-{' '}
                    <span className="font-medium">
                      {Math.min(indexOfLastOrder, filteredOrders.length)}
                    </span>
                    {' '}de{' '}
                    <span className="font-medium">{filteredOrders.length}</span>
                    {' '}resultados
                  </p>
                </div>
                <div>
                  <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px" aria-label="Pagination">
                    <button
                      onClick={goToPreviousPage}
                      disabled={currentPage === 1}
                      className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      <span className="sr-only">Anterior</span>
                      <ChevronLeftIcon className="h-5 w-5" aria-hidden="true" />
                    </button>
                    
                    {/* Páginas */}
                    {[...Array(totalPages)].map((_, index) => {
                      const pageNumber = index + 1
                      // Mostrar solo algunas páginas alrededor de la actual
                      if (
                        pageNumber === 1 ||
                        pageNumber === totalPages ||
                        (pageNumber >= currentPage - 1 && pageNumber <= currentPage + 1)
                      ) {
                        return (
                          <button
                            key={pageNumber}
                            onClick={() => paginate(pageNumber)}
                            className={`relative inline-flex items-center px-4 py-2 border text-sm font-medium ${
                              currentPage === pageNumber
                                ? 'z-10 bg-blue-600 border-blue-600 text-white'
                                : 'bg-white border-gray-300 text-gray-500 hover:bg-gray-50'
                            }`}
                          >
                            {pageNumber}
                          </button>
                        )
                      } else if (
                        pageNumber === currentPage - 2 ||
                        pageNumber === currentPage + 2
                      ) {
                        return (
                          <span
                            key={pageNumber}
                            className="relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-700"
                          >
                            ...
                          </span>
                        )
                      }
                      return null
                    })}
                    
                    <button
                      onClick={goToNextPage}
                      disabled={currentPage === totalPages}
                      className="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      <span className="sr-only">Siguiente</span>
                      <ChevronRightIcon className="h-5 w-5" aria-hidden="true" />
                    </button>
                  </nav>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Modal de detalles */}
      {showModal && selectedOrder && (
        <div 
          className="fixed inset-0 bg-gradient-to-br from-gray-900/80 via-gray-800/90 to-gray-900/80 backdrop-blur-sm flex items-center justify-center z-50 p-4 animate-fadeIn"
          onClick={() => setShowModal(false)}
        >
          <div 
            className="bg-white rounded-xl sm:rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl animate-scaleIn transform transition-all"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="p-4 sm:p-6 md:p-8">
              {/* Header del modal */}
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h2 className="text-2xl font-bold text-gray-900">
                    Orden #{selectedOrder.id}
                  </h2>
                  <p className="text-sm text-gray-600 mt-1">
                    Detalles y gestión de la orden
                  </p>
                </div>
                <button
                  onClick={() => setShowModal(false)}
                  className="text-gray-400 hover:text-gray-600 transition-colors rounded-full p-2 hover:bg-gray-100"
                >
                  <XCircleIcon className="w-6 h-6" />
                </button>
              </div>

              {/* Información del cliente */}
              <div className="mb-6 p-4 bg-gray-50 rounded-lg">
                <h3 className="font-semibold text-gray-900 mb-3">Información del Cliente</h3>
                <div className="space-y-2 text-sm">
                  <p><span className="font-medium">Nombre:</span> {selectedOrder.customer_name}</p>
                  <p><span className="font-medium">Email:</span> {selectedOrder.customer_email}</p>
                  {selectedOrder.customer_phone && (
                    <p><span className="font-medium">Teléfono:</span> {selectedOrder.customer_phone}</p>
                  )}
                  <p><span className="font-medium">Dirección:</span> {selectedOrder.shipping_address}</p>
                  {selectedOrder.notes && (
                    <p><span className="font-medium">Notas:</span> {selectedOrder.notes}</p>
                  )}
                </div>
              </div>

              {/* Productos */}
              <div className="mb-6">
                <h3 className="font-semibold text-gray-900 mb-3">Productos</h3>
                <div className="space-y-3">
                  {selectedOrder.items?.map((item) => (
                    <div key={item.id} className="flex items-center gap-4 p-3 bg-gray-50 rounded-lg">
                      <img
                        src={item.product?.images?.[0]?.image_url || '/placeholder.jpg'}
                        alt={item.product?.name}
                        className="w-16 h-16 object-cover rounded-lg"
                      />
                      <div className="flex-1">
                        <p className="font-medium text-gray-900">{item.product?.name}</p>
                        <p className="text-sm text-gray-500">Cantidad: {item.quantity}</p>
                      </div>
                      <p className="font-bold text-gray-900">
                        ${(parseFloat(item.price) * item.quantity).toFixed(2)}
                      </p>
                    </div>
                  ))}
                </div>
                <div className="mt-4 pt-4 border-t border-gray-200">
                  <div className="flex justify-between text-lg font-bold">
                    <span>Total:</span>
                    <span>${parseFloat(selectedOrder.total).toFixed(2)}</span>
                  </div>
                </div>
              </div>

              {/* Cambiar estado */}
              <div className="mb-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
                <h3 className="font-semibold text-gray-900 mb-3">Cambiar Estado de la Orden</h3>
                <div className="grid grid-cols-2 gap-3">
                  <button
                    onClick={() => updateOrderStatus(selectedOrder.id, 'pending')}
                    disabled={updating || selectedOrder.status === 'pending'}
                    className="px-4 py-2 bg-yellow-100 text-yellow-800 rounded-lg hover:bg-yellow-200 disabled:opacity-50 disabled:cursor-not-allowed font-semibold border border-yellow-200"
                  >
                    Pendiente
                  </button>
                  <button
                    onClick={() => updateOrderStatus(selectedOrder.id, 'processing')}
                    disabled={updating || selectedOrder.status === 'processing'}
                    className="px-4 py-2 bg-blue-100 text-blue-800 rounded-lg hover:bg-blue-200 disabled:opacity-50 disabled:cursor-not-allowed font-semibold border border-blue-200"
                  >
                    Procesando
                  </button>
                  <button
                    onClick={() => updateOrderStatus(selectedOrder.id, 'completed')}
                    disabled={updating || selectedOrder.status === 'completed'}
                    className="px-4 py-2 bg-green-100 text-green-800 rounded-lg hover:bg-green-200 disabled:opacity-50 disabled:cursor-not-allowed font-semibold border border-green-200"
                  >
                    Completada
                  </button>
                  <button
                    onClick={() => updateOrderStatus(selectedOrder.id, 'cancelled')}
                    disabled={updating || selectedOrder.status === 'cancelled'}
                    className="px-4 py-2 bg-red-100 text-red-800 rounded-lg hover:bg-red-200 disabled:opacity-50 disabled:cursor-not-allowed font-semibold border border-red-200"
                  >
                    Cancelada
                  </button>
                </div>
                <p className="text-xs text-gray-600 mt-3">
                  Estado actual: {getStatusBadge(selectedOrder.status)}
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
