import api from './api';

const emailService = {
  // Email Templates
  getTemplates: async () => {
    const response = await api.get('/email-templates');
    return response.data;
  },

  getTemplate: async (id) => {
    const response = await api.get(`/email-templates/${id}`);
    return response.data;
  },

  createTemplate: async (templateData) => {
    const response = await api.post('/email-templates', templateData);
    return response.data;
  },

  updateTemplate: async (id, templateData) => {
    const response = await api.put(`/email-templates/${id}`, templateData);
    return response.data;
  },

  deleteTemplate: async (id) => {
    const response = await api.delete(`/email-templates/${id}`);
    return response.data;
  },

  previewTemplate: async (id, data) => {
    const response = await api.post(`/email-templates/${id}/preview`, { data });
    return response.data;
  },

  toggleTemplateStatus: async (id) => {
    const response = await api.patch(`/email-templates/${id}/toggle-status`);
    return response.data;
  },
};

export default emailService;
