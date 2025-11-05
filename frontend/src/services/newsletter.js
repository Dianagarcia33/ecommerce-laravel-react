import api from './api';

const newsletterService = {
  // Newsletter Management (Admin)
  getSubscribers: async (params = {}) => {
    const response = await api.get('/newsletter', { params });
    return response.data;
  },

  getStats: async () => {
    const response = await api.get('/newsletter/stats');
    return response.data;
  },

  sendNewsletter: async (newsletterData) => {
    const response = await api.post('/newsletter/send', newsletterData);
    return response.data;
  },

  sendTestEmail: async (testData) => {
    const response = await api.post('/newsletter/send-test', testData);
    return response.data;
  },

  deleteSubscriber: async (id) => {
    const response = await api.delete(`/newsletter/${id}`);
    return response.data;
  },

  activateSubscriber: async (id) => {
    const response = await api.patch(`/newsletter/${id}/activate`);
    return response.data;
  },

  // Public Endpoints
  subscribe: async (email, name = '') => {
    const response = await api.post('/newsletter/subscribe', { email, name });
    return response.data;
  },

  unsubscribe: async (token) => {
    const response = await api.post(`/newsletter/unsubscribe/${token}`);
    return response.data;
  },
};

export default newsletterService;
