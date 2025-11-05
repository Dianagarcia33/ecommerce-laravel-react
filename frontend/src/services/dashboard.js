import axios from 'axios';

const API_URL = 'http://localhost:8000/api';

const getAuthHeaders = () => {
  const token = localStorage.getItem('token');
  return {
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
  };
};

export const dashboardService = {
  /**
   * Get general statistics
   */
  getStats: async () => {
    try {
      const response = await axios.get(`${API_URL}/dashboard/stats`, getAuthHeaders());
      return response.data;
    } catch (error) {
      console.error('Error fetching dashboard stats:', error);
      throw error;
    }
  },

  /**
   * Get sales chart data
   * @param {number} days - Number of days to fetch (default: 7)
   */
  getSalesChart: async (days = 7) => {
    try {
      const response = await axios.get(`${API_URL}/dashboard/sales-chart?days=${days}`, getAuthHeaders());
      return response.data;
    } catch (error) {
      console.error('Error fetching sales chart:', error);
      throw error;
    }
  },

  /**
   * Get top selling products
   * @param {number} limit - Number of products to fetch (default: 5)
   */
  getTopProducts: async (limit = 5) => {
    try {
      const response = await axios.get(`${API_URL}/dashboard/top-products?limit=${limit}`, getAuthHeaders());
      return response.data;
    } catch (error) {
      console.error('Error fetching top products:', error);
      throw error;
    }
  },

  /**
   * Get recent orders
   * @param {number} limit - Number of orders to fetch (default: 5)
   */
  getRecentOrders: async (limit = 5) => {
    try {
      const response = await axios.get(`${API_URL}/dashboard/recent-orders?limit=${limit}`, getAuthHeaders());
      return response.data;
    } catch (error) {
      console.error('Error fetching recent orders:', error);
      throw error;
    }
  },

  /**
   * Get low stock products
   * @param {number} threshold - Stock threshold (default: 10)
   * @param {number} limit - Number of products to fetch (default: 5)
   */
  getLowStock: async (threshold = 10, limit = 5) => {
    try {
      const response = await axios.get(
        `${API_URL}/dashboard/low-stock?threshold=${threshold}&limit=${limit}`,
        getAuthHeaders()
      );
      return response.data;
    } catch (error) {
      console.error('Error fetching low stock products:', error);
      throw error;
    }
  },
};

export default dashboardService;
