import { ShoppingBagIcon } from '@heroicons/react/24/solid';
import { useSiteConfig } from '../../hooks/useSiteConfig';

export default function OrdersHeader({ user, ordersCount }) {
  const config = useSiteConfig();
  const { theme } = config;
  const { colors } = theme;

  return (
    <section 
      className="relative text-white py-20 overflow-hidden"
      style={{ 
        background: `linear-gradient(135deg, #0f172a 0%, ${colors.primary.dark} 50%, ${colors.secondary.dark} 100%)`
      }}
    >
      <div className="absolute inset-0 opacity-15">
        <div 
          className="absolute top-0 right-0 w-96 h-96 rounded-full blur-3xl"
          style={{ backgroundColor: colors.secondary.hex }}
        ></div>
        <div 
          className="absolute bottom-0 left-0 w-96 h-96 rounded-full blur-3xl"
          style={{ backgroundColor: colors.primary.hex }}
        ></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="flex items-center justify-center gap-3 mb-4">
          <ShoppingBagIcon
            className="w-12 h-12"
            style={{ color: colors.secondary.hex }}
          />
          <h1 className="text-5xl md:text-6xl font-extrabold drop-shadow-2xl">
            {user?.role === 'admin' ? config.orders.adminTitle : config.orders.title}
          </h1>
        </div>
        <p className="text-xl text-gray-300 max-w-2xl mx-auto">
          {ordersCount > 0
            ? `${ordersCount} orden${ordersCount !== 1 ? 'es' : ''} registrada${ordersCount !== 1 ? 's' : ''}`
            : config.orders.emptyMessage
          }
        </p>
      </div>
    </section>
  );
}
