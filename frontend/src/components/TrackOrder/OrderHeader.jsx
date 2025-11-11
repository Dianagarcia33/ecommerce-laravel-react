export default function OrderHeader({ order, statusInfo }) {
  const Icon = statusInfo.icon

  return (
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
      <div className={`${statusInfo.bg} ${statusInfo.color} px-6 py-3 rounded-full font-bold flex items-center gap-2`}>
        <Icon className="w-5 h-5" />
        {statusInfo.label}
      </div>
    </div>
  )
}
