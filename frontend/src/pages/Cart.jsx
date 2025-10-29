import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';
import { TrashIcon } from '@heroicons/react/24/outline';
import { useEffect } from 'react';

export default function Cart() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const { cart, updateQuantity, removeFromCart, getTotal } = useCart();

  useEffect(() => {
    if (!user) {
      navigate('/login');
    }
  }, [user, navigate]);

  if (!user) {
    return null;
  }

  if (cart.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="inline-flex items-center justify-center w-24 h-24 bg-gradient-to-br from-cyan-100 to-teal-100 rounded-full mb-6">
              <svg
                className="w-12 h-12 text-cyan-600"
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
            </div>
            <h2 className="text-3xl font-bold text-gray-900 mb-3">
              Tu carrito está vacío
            </h2>
            <p className="text-gray-600 mb-8 text-lg">
              Agrega algunos productos para comenzar a comprar
            </p>
            <Link 
              to="/products" 
              className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-cyan-400 to-cyan-600 text-gray-900 font-bold rounded-full shadow-lg hover:from-cyan-300 hover:to-cyan-500 transition-all duration-300 hover:scale-105"
            >
              Explorar Productos
            </Link>
          </div>
        </div>
      </div>
    );
  }

  const total = getTotal();
  const shipping = total >= 50 ? 0 : 5;
  const finalTotal = total + shipping;

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-2">Carrito de Compras</h1>
          <p className="text-gray-600">Revisa tus productos antes de finalizar la compra</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-4">
            {cart.map((item, index) => (
              <div 
                key={item.id} 
                className="bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 p-6 border border-gray-100"
                style={{ 
                  animation: `fadeInUp 0.5s ease-out ${index * 0.1}s backwards`
                }}
              >
                <div className="flex flex-col sm:flex-row items-center gap-6">
                  {/* Image */}
                  <div className="relative group">
                    <img 
                      src={item.image || 'https://via.placeholder.com/150'} 
                      alt={item.name} 
                      className="w-32 h-32 object-cover rounded-xl group-hover:scale-105 transition-transform duration-300" 
                    />
                  </div>

                  {/* Info */}
                  <div className="flex-1 text-center sm:text-left">
                    <Link 
                      to={`/products/${item.id}`} 
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
            ))}
          </div>

          {/* Order Summary */}
          <div>
            <div className="bg-white rounded-2xl shadow-xl p-8 sticky top-24 border border-gray-100">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Resumen del Pedido</h2>
              
              <div className="space-y-4 mb-6">
                <div className="flex justify-between text-gray-600">
                  <span>Subtotal:</span>
                  <span className="font-semibold text-gray-900">${total.toFixed(2)}</span>
                </div>
                
                <div className="flex justify-between text-gray-600">
                  <span>Envío:</span>
                  <span className="font-semibold text-gray-900">
                    {shipping === 0 ? (
                      <span className="text-green-600 font-bold">¡Gratis!</span>
                    ) : (
                      `$${shipping.toFixed(2)}`
                    )}
                  </span>
                </div>
                
                {total < 50 && (
                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
                    <p className="text-sm text-blue-700 font-medium">
                      💡 Agrega <span className="font-bold">${(50 - total).toFixed(2)}</span> más para envío gratis
                    </p>
                  </div>
                )}
                
                <div className="border-t-2 border-gray-200 pt-4">
                  <div className="flex justify-between items-center">
                    <span className="text-xl font-bold text-gray-900">Total:</span>
                    <span className="text-3xl font-extrabold bg-gradient-to-r from-cyan-500 to-teal-600 bg-clip-text text-transparent">
                      ${finalTotal.toFixed(2)}
                    </span>
                  </div>
                </div>
              </div>

              <div className="space-y-3">
                <Link 
                  to="/checkout" 
                  className="block w-full bg-gradient-to-r from-lime-400 to-green-500 text-gray-900 py-4 rounded-full hover:from-lime-300 hover:to-green-400 text-center font-bold shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
                >
                  Proceder al Pago
                </Link>
                
                <Link 
                  to="/products" 
                  className="block w-full bg-gray-100 text-gray-700 py-4 rounded-full hover:bg-gray-200 text-center font-bold transition-all duration-300"
                >
                  Continuar Comprando
                </Link>
              </div>

              {/* Trust Badges */}
              <div className="mt-6 pt-6 border-t border-gray-200">
                <div className="space-y-3 text-sm text-gray-600">
                  <div className="flex items-center gap-2">
                    <svg className="w-5 h-5 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"/>
                    </svg>
                    <span>Pago seguro garantizado</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <svg className="w-5 h-5 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"/>
                    </svg>
                    <span>Devolución en 30 días</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <svg className="w-5 h-5 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"/>
                    </svg>
                    <span>Soporte 24/7</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  );
}
