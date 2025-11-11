import { Link } from 'react-router-dom';
import { TrashIcon } from '@heroicons/react/24/outline';

export default function CartItem({ item, index, updateQuantity, removeFromCart }) {
  return (
    <div 
      className="bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 p-6 border border-gray-100"
      style={{ 
        animation: `fadeInUp 0.5s ease-out ${index * 0.1}s backwards`
      }}
    >
      <div className="flex flex-col sm:flex-row items-center gap-6">
        {/* Image */}
        <div className="relative group">
          <img 
            src={
              item.images?.[0]?.image_url?.replace(
                'http://localhost:8000/products/',
                'http://localhost:8000/storage/products/'
              ) || 'https://placehold.co/300x300?text=Sin+imagen'
            }
            alt={item.name} 
            className="w-32 h-32 object-cover rounded-xl group-hover:scale-105 transition-transform duration-300" 
          />
        </div>

        {/* Info */}
        <div className="flex-1 text-center sm:text-left">
          <Link 
            to={`/product/${item.id}/parallax`} 
            className="text-xl font-bold text-gray-900 hover:text-cyan-600 transition-colors block mb-2"
          >
            {item.name}
          </Link>
          <p className="text-2xl font-bold bg-gradient-to-r from-cyan-500 to-teal-600 bg-clip-text text-transparent">
            ${item.price}
          </p>
        </div>

        {/* Quantity Controls */}
        <div className="flex items-center gap-3 bg-gray-50 rounded-full px-4 py-2">
          <button 
            onClick={() => updateQuantity(item.id, item.quantity - 1)} 
            className="w-8 h-8 flex items-center justify-center bg-white border-2 border-gray-200 rounded-full hover:border-cyan-400 hover:text-cyan-600 transition-all font-bold"
          >
            -
          </button>
          <span className="w-12 text-center font-bold text-gray-900">{item.quantity}</span>
          <button 
            onClick={() => updateQuantity(item.id, item.quantity + 1)} 
            className="w-8 h-8 flex items-center justify-center bg-white border-2 border-gray-200 rounded-full hover:border-cyan-400 hover:text-cyan-600 transition-all font-bold"
          >
            +
          </button>
        </div>

        {/* Subtotal & Remove */}
        <div className="text-center sm:text-right">
          <p className="text-2xl font-bold text-gray-900 mb-3">
            ${(item.price * item.quantity).toFixed(2)}
          </p>
          <button 
            onClick={() => removeFromCart(item.id)} 
            className="inline-flex items-center gap-2 px-4 py-2 text-red-600 hover:bg-red-50 rounded-lg transition-all font-medium"
          >
            <TrashIcon className="h-5 w-5" />
            <span>Eliminar</span>
          </button>
        </div>
      </div>
    </div>
  );
}
