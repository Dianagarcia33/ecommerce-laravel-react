import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';
import {
  LoadingSpinner,
  OrdersHeader,
  EmptyOrders,
  OrderCard
} from '../components/Orders';

export default function Orders() {
  const [orders, setOrders] = useState([]);
  const [loadingOrders, setLoadingOrders] = useState(true);
  const { user, loading: authLoading } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (authLoading) return;
    
    if (!user) {
      navigate('/login');
      return;
    }
    
    fetchOrders();
  }, [user, authLoading, navigate]);

  const fetchOrders = async () => {
    try {
      const response = await api.get('/orders');
      setOrders(response.data);
    } catch (error) {
      console.error('Error al cargar órdenes:', error);
    } finally {
      setLoadingOrders(false);
    }
  };

  if (authLoading) {
    return <LoadingSpinner message="Verificando sesión..." />;
  }

  if (loadingOrders) {
    return <LoadingSpinner message="Cargando órdenes..." />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      <OrdersHeader user={user} ordersCount={orders.length} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {orders.length === 0 ? (
          <EmptyOrders />
        ) : (
          <div className="grid grid-cols-1 gap-8">
            {orders.map((order) => (
              <OrderCard key={order.id} order={order} user={user} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
