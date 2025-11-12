import { useState, useCallback } from 'react';

const API_BASE_URL = 'http://localhost:8000/api';

/**
 * Custom hook for managing categories CRUD operations
 */
export const useCategoriesManager = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchCategories = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await fetch(`${API_BASE_URL}/categories`);
      
      if (!response.ok) {
        throw new Error('Error al cargar categorías');
      }
      
      const data = await response.json();
      setCategories(data);
    } catch (error) {
      console.error('Error al cargar categorías:', error);
      setError(error.message || 'Error al cargar categorías');
      throw error;
    } finally {
      setLoading(false);
    }
  }, []);

  const createCategory = useCallback(async (formData) => {
    const token = localStorage.getItem('token');

    try {
      setLoading(true);

      const data = new FormData();
      data.append('name', formData.name);
      data.append('description', formData.description || '');
      if (formData.image instanceof File){
        data.append('image', formData.image);
      }

      const response = await fetch(`${API_BASE_URL}/categories`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Accept': 'application/json'
        },
        body: data,
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.message || 'Error al crear la categoría');
      }

      await fetchCategories();
    } catch (error) {
      console.error('Error al crear categoría:', error);
      throw error;
    } finally {
      setLoading(false);
    }
  }, [fetchCategories]);

  const updateCategory = useCallback(async (id, formData) => {
    const token = localStorage.getItem('token');

    try {
      setLoading(true);
      // Usar FormData aquí
      const data = new FormData();
      data.append('name', formData.name);
      data.append('description', formData.description || '');
      if (formData.image instanceof File){
        data.append('image', formData.image);
      }

      // Método PUT usando FormData con _method
      data.append('_method', 'PUT');

      const response = await fetch(`${API_BASE_URL}/categories/${id}`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Accept': 'application/json'
        },
        body: data,
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.message || 'Error al actualizar la categoría');
      }

      await fetchCategories();
    } catch (error) {
      console.error('Error al actualizar categoría:', error);
      throw error;
    } finally {
      setLoading(false);
    }
  }, [fetchCategories]);

  const deleteCategory = useCallback(async (id) => {
    const token = localStorage.getItem('token');

    try {
      setLoading(true);
      const response = await fetch(`${API_BASE_URL}/categories/${id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Accept': 'application/json'
        }
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.message || 'Error al eliminar la categoría');
      }

      await fetchCategories();
    } catch (error) {
      console.error('Error al eliminar categoría:', error);
      throw error;
    } finally {
      setLoading(false);
    }
  }, [fetchCategories]);

  return {
    categories,
    loading,
    error,
    fetchCategories,
    createCategory,
    updateCategory,
    deleteCategory
  };
};
