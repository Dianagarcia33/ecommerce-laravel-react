import { Link } from 'react-router-dom';
import { ShoppingBagIcon, SparklesIcon, ArrowRightIcon } from '@heroicons/react/24/outline';
import { useSiteConfig } from '../../hooks/useSiteConfig';

export default function EmptyOrders() {
  const config = useSiteConfig();
  const { theme } = config;
  const { colors } = theme;

  return (
    <div className="text-center py-20">
      <div className="bg-white rounded-3xl shadow-xl p-12 max-w-md mx-auto">
        <ShoppingBagIcon className="w-24 h-24 mx-auto text-gray-300 mb-6" />
        <h2 className="text-2xl font-bold text-gray-900 mb-3">
          {config.orders.emptyTitle}
        </h2>
        <p className="text-gray-600 mb-8">
          {config.orders.emptySubtitle}
        </p>
        <Link
          to="/products"
          className="inline-flex items-center gap-2 px-8 py-4 rounded-full font-bold text-white shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all"
          style={{ background: `linear-gradient(135deg, ${colors.primary.hex}, ${colors.secondary.hex})` }}
        >
          <SparklesIcon className="w-6 h-6" />
          {config.orders.emptyButton}
          <ArrowRightIcon className="w-5 h-5" />
        </Link>
      </div>
    </div>
  );
}
