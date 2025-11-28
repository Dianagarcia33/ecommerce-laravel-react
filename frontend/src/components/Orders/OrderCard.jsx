import { useSiteConfig } from '../../hooks/useSiteConfig';
import { getStatusColor, getStatusText, getStatusIcon } from './orderUtils';

export default function OrderCard({ order, user }) {
  const config = useSiteConfig();
  const { theme } = config;
  const { colors } = theme;
  const statusColors = getStatusColor(order.status);

  return (
    <div className="group bg-white rounded-2xl shadow-md hover:shadow-2xl transition-all duration-300 overflow-hidden border border-gray-100">
      {/* Header */}
      <div
        className={`${statusColors.bg} ${statusColors.border} border-b-2 p-6`}
      >
        <div className="flex justify-between items-start">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <h2 className="text-2xl font-bold text-gray-900">
                {config.orders.orderNumber}{order.id}
              </h2>
              <span className={`px-3 py-1 rounded-full text-sm font-bold border-2 ${statusColors.badge} ${statusColors.text}`}>
                {getStatusIcon(order.status)} {getStatusText(order.status, config)}
              </span>
            </div>
            <p className="text-gray-600 font-medium">
              📅 {new Date(order.created_at).toLocaleDateString('es-ES', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
                hour: '2-digit',
                minute: '2-digit'
              })}
            </p>
            {user?.role === 'admin' && (
              <p className="text-gray-700 mt-2 font-semibold">
                {config.orders.customerLabel} {order.customer_name}
                <span className="text-gray-500 ml-2">({order.customer_email})</span>
              </p>
            )}
          </div>
        </div>
      </div>

      {/* Items */}
      <div className="p-6">
        <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
          🛍️ Productos
        </h3>
        <div className="space-y-4">
          {order.items?.map((item) => (
            <div 
              key={item.id} 
              className="flex items-center gap-4 p-3 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors"
            >
              <img
                src={item.product?.image || 'https://via.placeholder.com/100'}
                alt={item.product?.name}
                className="w-20 h-20 object-cover rounded-lg shadow-md"
              />
              <div className="flex-1">
                <h4 className="font-bold text-gray-900">{item.product?.name}</h4>
                <p className="text-gray-600">
                  <span className="font-semibold" style={{ color: colors.primary.hex }}>
                    ${item.price}
                  </span> x {item.quantity}
                </p>
              </div>
              <p className="text-xl font-extrabold" style={{ color: colors.secondary.hex }}>
                ${(item.price * item.quantity).toFixed(2)}
              </p>
            </div>
          ))}
        </div>

        {/* Details */}
        <div className="mt-6 pt-6 border-t-2 border-gray-100 space-y-3">
          <div className="flex items-start gap-2">
            <span className="font-bold text-gray-700 min-w-[140px]">{config.orders.shippingLabel}</span>
            <span className="text-gray-600 flex-1">{order.shipping_address}</span>
          </div>
          {order.notes && (
            <div className="flex items-start gap-2">
              <span className="font-bold text-gray-700 min-w-[140px]">{config.orders.notesLabel}</span>
              <span className="text-gray-600 flex-1">{order.notes}</span>
            </div>
          )}
        </div>

        {/* Total */}
        <div
          className="mt-6 pt-6 border-t-2 flex justify-between items-center rounded-xl p-4"
          style={{
            background: `linear-gradient(135deg, ${colors.primary.hex}15, ${colors.secondary.hex}15)`,
            borderColor: colors.primary.hex
          }}
        >
          <span className="text-2xl font-extrabold text-gray-900">{config.orders.totalLabel}</span>
          <span
            className="text-4xl font-extrabold"
            style={{
              background: `linear-gradient(135deg, ${colors.primary.hex}, ${colors.secondary.hex})`,
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent'
            }}
          >
            ${order.total}
          </span>
        </div>
      </div>
    </div>
  );
}
