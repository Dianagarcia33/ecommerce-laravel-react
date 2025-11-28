import { Link } from 'react-router-dom';
import { ShoppingCartIcon } from '@heroicons/react/24/outline';
import { useSiteConfig } from '../../hooks/useSiteConfig';

export default function EmptyCart() {
  const { theme, cart } = useSiteConfig();
  const { colors } = theme;

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 px-4">
      <div className="bg-white p-8 rounded-3xl shadow-xl text-center max-w-md w-full transform hover:scale-105 transition-transform duration-300">
        <div
          className="w-24 h-24 mx-auto mb-6 rounded-full flex items-center justify-center bg-gray-50"
        >
          <ShoppingCartIcon className="w-12 h-12 text-gray-400" />
        </div>
        <h2 className="text-3xl font-bold text-gray-900 mb-2">{cart.emptyTitle}</h2>
        <p className="text-gray-500 mb-8">{cart.emptySubtitle}</p>
        <Link
          to="/products"
          className="inline-flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-full text-white shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
          style={{
            background: `linear-gradient(to right, ${colors.primary.hex}, ${colors.primary.dark})`
          }}
        >
          {cart.emptyButton}
        </Link>
      </div>
    </div>
  );
}
