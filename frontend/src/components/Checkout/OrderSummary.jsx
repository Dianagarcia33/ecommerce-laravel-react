import TrustBadges from './TrustBadges';

export default function OrderSummary({ cart, total }) {
  return (
    <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100 sticky top-24">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 bg-gradient-to-br from-lime-400 to-green-500 rounded-xl flex items-center justify-center">
          <svg className="w-6 h-6 text-gray-900" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
          </svg>
        </div>
        <h2 className="text-2xl font-bold text-gray-900">Resumen de la Orden</h2>
      </div>
      
      <div className="space-y-4 mb-6">
        {cart.map((item) => (
          <div key={item.id} className="flex items-center gap-4 pb-4 border-b border-gray-100 hover:bg-gray-50 rounded-lg transition-colors p-3">
            <img
              src={
                  item.images?.[0]?.image_url?.replace(
                    'http://localhost:8000/products/',
                    'http://localhost:8000/storage/products/'
                  ) || 'https://placehold.co/300x300?text=Sin+imagen'
                }
              alt={item.name}
              className="w-20 h-20 object-cover rounded-xl shadow-md"
            />
            <div className="flex-1">
              <h3 className="font-bold text-gray-900 mb-1 line-clamp-1">{item.name}</h3>
              <p className="text-sm text-gray-600">
                <span className="font-semibold text-cyan-600">${item.price}</span> x {item.quantity}
              </p>
            </div>
            <p className="text-xl font-bold bg-gradient-to-r from-cyan-500 to-teal-600 bg-clip-text text-transparent">
              ${(item.price * item.quantity).toFixed(2)}
            </p>
          </div>
        ))}
      </div>

      {/* Trust Badges */}
      <TrustBadges />

      <div className="pt-6 border-t-2 border-gray-200">
        <div className="flex justify-between items-center">
          <span className="text-xl font-bold text-gray-900">Total:</span>
          <span className="text-3xl font-extrabold bg-gradient-to-r from-cyan-500 to-teal-600 bg-clip-text text-transparent">
            ${total.toFixed(2)}
          </span>
        </div>
        <p className="text-sm text-gray-500 mt-2 text-center">Incluye impuestos y gastos de envío</p>
      </div>
    </div>
  );
}
