export default function ShippingInfo({ order }) {
  return (
    <div className="mb-6">
      <h3 className="font-bold text-gray-900 mb-3 text-lg">Datos de Envío</h3>
      <div className="bg-gray-50 rounded-xl p-4 space-y-2">
        <p className="text-gray-700">
          <span className="font-semibold">Nombre:</span> {order.customer_name}
        </p>
        <p className="text-gray-700">
          <span className="font-semibold">Email:</span> {order.customer_email}
        </p>
        {order.customer_phone && (
          <p className="text-gray-700">
            <span className="font-semibold">Teléfono:</span> {order.customer_phone}
          </p>
        )}
        <p className="text-gray-700">
          <span className="font-semibold">Dirección:</span> {order.shipping_address}
        </p>
      </div>
    </div>
  )
}
