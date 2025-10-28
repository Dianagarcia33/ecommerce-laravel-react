import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';
import { TrashIcon } from '@heroicons/react/24/outline';

export default function Cart() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const { cart, updateQuantity, removeFromCart, getTotal } = useCart();

  if (!user) {
    navigate('/login');
    return null;
  }

  if (cart.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center">
          <svg
            className="mx-auto h-24 w-24 text-gray-400"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
            />
          </svg>
          <h2 className="text-2xl font-bold text-gray-900 mt-4 mb-2">
            Tu carrito está vacío
          </h2>
          <p className="text-gray-600 mb-8">
            Agrega algunos productos para comenzar a comprar
          </p>
          <Link to="/products" className="inline-block bg-indigo-600 text-white px-6 py-3 rounded-lg hover:bg-indigo-700">
            Explorar Productos
          </Link>
        </div>
      </div>
    );
  }

  const total = getTotal();
  const shipping = total >= 50 ? 0 : 5;
  const finalTotal = total + shipping;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-4xl font-bold mb-8">Carrito de Compras</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-4">
          {cart.map((item) => (
            <div key={item.id} className="bg-white rounded-lg shadow-md p-4 flex items-center gap-4">
              <img src={item.image} alt={item.name} className="w-24 h-24 object-cover rounded-lg" />
              <div className="flex-1">
                <Link to={`/products/${item.id}`} className="text-lg font-semibold hover:text-indigo-600">
                  {item.name}
                </Link>
                <p className="text-gray-600">${item.price}</p>
              </div>
              <div className="flex items-center gap-2">
                <button onClick={() => updateQuantity(item.id, item.quantity - 1)} className="px-3 py-1 bg-gray-200 rounded hover:bg-gray-300">
                  -
                </button>
                <span className="w-12 text-center font-semibold">{item.quantity}</span>
                <button onClick={() => updateQuantity(item.id, item.quantity + 1)} className="px-3 py-1 bg-gray-200 rounded hover:bg-gray-300">
                  +
                </button>
              </div>
              <div className="text-right">
                <p className="text-lg font-bold">${(item.price * item.quantity).toFixed(2)}</p>
                <button onClick={() => removeFromCart(item.id)} className="text-red-600 hover:text-red-700 text-sm flex items-center gap-1 mt-2">
                  <TrashIcon className="h-4 w-4" />
                  Eliminar
                </button>
              </div>
            </div>
          ))}
        </div>

        <div>
          <div className="bg-white rounded-lg shadow-md p-6 sticky top-24">
            <h2 className="text-2xl font-bold mb-6">Resumen del Pedido</h2>
            <div className="space-y-3 mb-6">
              <div className="flex justify-between">
                <span>Subtotal:</span>
                <span className="font-semibold">${total.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span>Envío:</span>
                <span className="font-semibold">{shipping === 0 ? 'Gratis' : `$${shipping.toFixed(2)}`}</span>
              </div>
              {total < 50 && (
                <p className="text-sm text-gray-600">💡 Agrega ${(50 - total).toFixed(2)} más para envío gratis</p>
              )}
              <div className="border-t pt-3">
                <div className="flex justify-between text-xl font-bold">
                  <span>Total:</span>
                  <span className="text-indigo-600">${finalTotal.toFixed(2)}</span>
                </div>
              </div>
            </div>
            <Link to="/checkout" className="block w-full bg-indigo-600 text-white py-3 rounded-lg hover:bg-indigo-700 text-center mb-4">
              Proceder al Pago
            </Link>
            <Link to="/products" className="block w-full bg-gray-200 text-gray-700 py-3 rounded-lg hover:bg-gray-300 text-center">
              Continuar Comprando
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
