import { Link } from 'react-router-dom';
import { useSiteConfig } from '../../hooks/useSiteConfig';
import TrustBadges from './TrustBadges';

export default function OrderSummary({ total, user }) {
  const config = useSiteConfig();
  const { cart } = config;
  const shipping = total >= cart.shippingThreshold ? 0 : cart.shippingCost;
  const finalTotal = total + shipping;

  return (
    <div className="bg-white rounded-2xl shadow-xl p-8 sticky top-24 border border-gray-100">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">{cart.summaryTitle}</h2>

      <div className="space-y-4 mb-6">
        <div className="flex justify-between text-gray-600">
          <span>{cart.subtotalLabel}</span>
          <span className="font-semibold text-gray-900">${total.toFixed(2)}</span>
        </div>

        <div className="flex justify-between text-gray-600">
          <span>{cart.shippingLabel}</span>
          <span className="font-semibold text-gray-900">
            {shipping === 0 ? (
              <span className="text-green-600 font-bold">{cart.freeShipping}</span>
            ) : (
              `$${shipping.toFixed(2)}`
            )}
          </span>
        </div>

        {total < cart.shippingThreshold && (
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
            <p className="text-sm text-blue-700 font-medium">
              💡 {cart.freeShippingMessage.replace('${amount}', `$${(cart.shippingThreshold - total).toFixed(2)}`)}
            </p>
          </div>
        )}

        <div className="border-t-2 border-gray-200 pt-4">
          <div className="flex justify-between items-center">
            <span className="text-xl font-bold text-gray-900">{cart.totalLabel}</span>
            <span className="text-3xl font-extrabold bg-gradient-to-r from-cyan-500 to-teal-600 bg-clip-text text-transparent">
              ${finalTotal.toFixed(2)}
            </span>
          </div>
        </div>
      </div>

      <div className="space-y-3">
        {!user && (
          <div className="bg-blue-50 border-2 border-blue-200 rounded-xl p-4">
            <div className="flex items-start gap-2">
              <svg className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <div className="flex-1">
                <p className="text-sm font-semibold text-blue-900 mb-1">
                  Puedes comprar sin crear cuenta
                </p>
                <p className="text-xs text-blue-700">
                  O <Link to="/login" className="underline font-semibold hover:text-blue-900">inicia sesión</Link> si ya tienes una cuenta
                </p>
              </div>
            </div>
          </div>
        )}

        <Link
          to="/checkout"
          className="block w-full bg-gradient-to-r from-cyan-400 to-cyan-600 text-white py-4 rounded-full hover:from-cyan-500 hover:to-cyan-700 text-center font-bold shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
        >
          {cart.checkoutButton}
        </Link>

        <Link
          to="/products"
          className="block w-full py-4 bg-gradient-to-r rounded-full hover:scale-105 bg-white text-gray-900 border-2 border-gray-200 hover:border-cyan-300 text-center font-bold shadow-lg hover:shadow-xl transition-all duration-300"
        >
          {cart.continueButton}
        </Link>
      </div>

      <TrustBadges />
    </div>
  );
}
