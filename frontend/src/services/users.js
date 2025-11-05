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

export const userService = {
  /**
   * Get all users with filters
   */
  getUsers: async (filters = {}) => {
    try {
      const params = new URLSearchParams();
      
      if (filters.role && filters.role !== 'all') params.append('role', filters.role);
      if (filters.status && filters.status !== 'all') params.append('status', filters.status);
      if (filters.search) params.append('search', filters.search);
      if (filters.sort_by) params.append('sort_by', filters.sort_by);
      if (filters.sort_order) params.append('sort_order', filters.sort_order);
      if (filters.per_page) params.append('per_page', filters.per_page);
      if (filters.page) params.append('page', filters.page);

      const response = await axios.get(`${API_URL}/users?${params}`, getAuthHeaders());
      return response.data;
    } catch (error) {
      console.error('Error fetching users:', error);
      throw error;
    }
  },

  /**
   * Get user by ID
   */
  getUser: async (id) => {
    try {
      const response = await axios.get(`${API_URL}/users/${id}`, getAuthHeaders());
      return response.data;
    } catch (error) {
      console.error('Error fetching user:', error);
      throw error;
    }
  },

  /**
   * Create new user
   */
  createUser: async (userData) => {
    try {
      const response = await axios.post(`${API_URL}/users`, userData, getAuthHeaders());
      return response.data;
    } catch (error) {
      console.error('Error creating user:', error);
      throw error;
    }
  },

  /**
   * Update user
   */
  updateUser: async (id, userData) => {
    try {
      const response = await axios.put(`${API_URL}/users/${id}`, userData, getAuthHeaders());
      return response.data;
    } catch (error) {
      console.error('Error updating user:', error);
      throw error;
    }
  },

  /**
   * Delete user
   */
  deleteUser: async (id) => {
    try {
      const response = await axios.delete(`${API_URL}/users/${id}`, getAuthHeaders());
      return response.data;
    } catch (error) {
      console.error('Error deleting user:', error);
      throw error;
    }
  },

  /**
   * Update user status
   */
  updateStatus: async (id, status) => {
    try {
      const response = await axios.patch(
        `${API_URL}/users/${id}/status`,
        { status },
        getAuthHeaders()
      );
      return response.data;
    } catch (error) {
      console.error('Error updating user status:', error);
      throw error;
    }
  },

  /**
   * Get user statistics
   */
  getStatistics: async () => {
    try {
      const response = await axios.get(`${API_URL}/users/statistics`, getAuthHeaders());
      return response.data;
    } catch (error) {
      console.error('Error fetching user statistics:', error);
      throw error;
    }
  },
};

export default userService;
