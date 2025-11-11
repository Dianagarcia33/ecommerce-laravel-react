import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';
import EmptyCart from '../components/Cart/EmptyCart';
import CartItem from '../components/Cart/CartItem';
import OrderSummary from '../components/Cart/OrderSummary';

export default function Cart() {
  const { user } = useAuth();
  const { cart, updateQuantity, removeFromCart, getTotal } = useCart();

  if (cart.length === 0) {
    return <EmptyCart />;
  }

  const total = getTotal();

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
              <CartItem 
                key={item.id}
                item={item}
                index={index}
                updateQuantity={updateQuantity}
                removeFromCart={removeFromCart}
              />
            ))}
          </div>

          {/* Order Summary */}
          <div>
            <OrderSummary total={total} user={user} />
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
