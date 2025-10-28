import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';

export default function Orders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate('/login');
      return;
    }
    
    fetchOrders();
  }, [user]);

  const fetchOrders = async () => {
    try {
      const response = await api.get('/orders');
      setOrders(response.data);
    } catch (error) {
      console.error('Error al cargar órdenes:', error);
    } finally {
      setLoading(false);
    }
  };

  const getStatusColor = (status) => {
    const colors = {
      pending: 'bg-yellow-100 text-yellow-800',
      processing: 'bg-blue-100 text-blue-800',
      completed: 'bg-green-100 text-green-800',
      cancelled: 'bg-red-100 text-red-800'
    };
    return colors[status] || 'bg-gray-100 text-gray-800';
  };

  const getStatusText = (status) => {
    const texts = {
      pending: 'Pendiente',
      processing: 'Procesando',
      completed: 'Completada',
      cancelled: 'Cancelada'
    };
    return texts[status] || status;
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-xl">Cargando órdenes...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">
          {user?.role === 'admin' ? 'Todas las Órdenes' : 'Mis Órdenes'}
        </h1>

        {orders.length === 0 ? (
          <div className="bg-white rounded-lg shadow-md p-8 text-center">
            <p className="text-gray-600 text-lg">No hay órdenes aún</p>
          </div>
        ) : (
          <div className="space-y-6">
            {orders.map((order) => (
              <div key={order.id} className="bg-white rounded-lg shadow-md p-6">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h2 className="text-xl font-semibold">Orden #{order.id}</h2>
                    <p className="text-gray-600">
                      {new Date(order.created_at).toLocaleDateString('es-ES', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric',
                        hour: '2-digit',
                        minute: '2-digit'
                      })}
                    </p>
                    {user?.role === 'admin' && (
                      <p className="text-gray-600 mt-1">
                        Cliente: {order.customer_name} ({order.customer_email})
                      </p>
                    )}
                  </div>
                  <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(order.status)}`}>
                    {getStatusText(order.status)}
                  </span>
                </div>

                <div className="border-t pt-4 space-y-3">
                  {order.items?.map((item) => (
                    <div key={item.id} className="flex items-center gap-4">
                      <img
                        src={item.product?.image}
                        alt={item.product?.name}
                        className="w-16 h-16 object-cover rounded"
                      />
                      <div className="flex-1">
                        <h3 className="font-medium">{item.product?.name}</h3>
                        <p className="text-gray-600">
                          ${item.price} x {item.quantity}
                        </p>
                      </div>
                      <p className="font-semibold">
                        ${(item.price * item.quantity).toFixed(2)}
                      </p>
                    </div>
                  ))}
                </div>

                <div className="border-t mt-4 pt-4">
                  <div className="flex justify-between">
                    <span className="font-semibold">Dirección de envío:</span>
                    <span className="text-gray-600">{order.shipping_address}</span>
                  </div>
                  {order.notes && (
                    <div className="flex justify-between mt-2">
                      <span className="font-semibold">Notas:</span>
                      <span className="text-gray-600">{order.notes}</span>
                    </div>
                  )}
                  <div className="flex justify-between mt-4 text-xl">
                    <span className="font-bold">Total:</span>
                    <span className="font-bold text-indigo-600">${order.total}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
