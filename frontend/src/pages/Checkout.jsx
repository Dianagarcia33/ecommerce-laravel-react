import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { useSiteConfig } from '../hooks/useSiteConfig';
import api from '../services/api';
import { LoadingSpinner, ShippingForm, OrderSummary } from '../components/Checkout';

export default function Checkout() {
  const config = useSiteConfig();
  const navigate = useNavigate();
  const { cart, getTotal, clearCart } = useCart();
  const { user, loading: authLoading } = useAuth();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const [formData, setFormData] = useState({
    customer_name: user?.name || '',
    customer_email: user?.email || '',
    customer_phone: '',
    shipping_address: '',
    notes: ''
  });

  if (authLoading) {
    return <LoadingSpinner />;
  }

  if (cart.length === 0) {
    navigate('/cart');
    return null;
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const orderData = {
        ...formData,
        items: cart.map(item => ({
          product_id: item.id,
          quantity: item.quantity
        })),
        is_guest: !user
      };

      const endpoint = user ? '/orders' : '/orders/guest';
      const response = await api.post(endpoint, orderData);

      clearCart();

      if (!user && response.data.guest_token) {
        const message = config.checkout.guestSuccessMessage
          .replace('{token}', response.data.guest_token)
          .replace('{email}', formData.customer_email);
        alert(message);
        navigate('/');
      } else {
        alert(config.checkout.successMessage);
        navigate('/orders');
      }
    } catch (err) {
      setError(err.response?.data?.message || config.checkout.errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-extrabold bg-gradient-to-r from-cyan-500 to-teal-600 bg-clip-text text-transparent mb-3">
            {config.checkout.title}
          </h1>
          <p className="text-gray-600 text-lg">{config.checkout.subtitle}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Formulario */}
          <ShippingForm
            user={user}
            error={error}
            formData={formData}
            setFormData={setFormData}
            loading={loading}
            onSubmit={handleSubmit}
          />

          {/* Resumen */}
          <OrderSummary cart={cart} total={getTotal()} />
        </div>
      </div>
    </div>
  );
}
