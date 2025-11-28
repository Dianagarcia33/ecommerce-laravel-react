import { ShoppingBagIcon } from '@heroicons/react/24/outline';
import { useSiteConfig } from '../../hooks/useSiteConfig';

export default function LoginHeader() {
  const config = useSiteConfig();

  return (
    <div className="text-center mb-8">
      <div className="inline-flex items-center justify-center bg-gradient-to-r from-cyan-400 to-cyan-600 p-4 rounded-2xl shadow-2xl mb-4">
        <ShoppingBagIcon className="h-12 w-12 text-white" />
      </div>
      <h2 className="text-4xl font-extrabold text-white mb-2">{config.auth.login.title}</h2>
      <p className="text-gray-300">{config.auth.login.subtitle}</p>
    </div>
  );
}
