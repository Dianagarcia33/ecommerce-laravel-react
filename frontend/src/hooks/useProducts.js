import { useState, useCallback } from 'react';
import api from '../services/api';

const API_BASE_URL = 'http://localhost:8000/api';

/**
 * Custom hook for managing products CRUD operations
 */
export const useProducts = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchProducts = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await api.get('/products');
      setProducts(response.data);
    } catch (error) {
      console.error('Error al cargar productos:', error);
      setError('Error al cargar productos');
      throw error;
    } finally {
      setLoading(false);
    }
  }, []);

  const createProduct = useCallback(async (formData) => {
    const token = localStorage.getItem('token');
    const form = new FormData();

    // Append product fields
    Object.keys(formData).forEach(key => {
      if (key !== 'images' && key !== 'imagePreviews') {
        form.append(key, formData[key]);
      }
    });

    // Append images
    formData.images.forEach((img) => {
      form.append('images[]', img);
    });

    try {
      setLoading(true);
      const response = await fetch(`${API_BASE_URL}/products`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Accept': 'application/json',
        },
        body: form,
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Error al crear el producto');
      }

      await fetchProducts();
      return data;
    } catch (error) {
      console.error('Error al crear producto:', error);
      throw error;
    } finally {
      setLoading(false);
    }
  }, [fetchProducts]);

  const updateProduct = useCallback(async (id, formData) => {
    const token = localStorage.getItem('token');

    // Primero eliminar las imágenes marcadas para eliminar
    if (formData.deletedImageIds && formData.deletedImageIds.length > 0) {
      try {
        for (const imageId of formData.deletedImageIds) {
          await fetch(`${API_BASE_URL}/products/${id}/images/${imageId}`, {
            method: 'DELETE',
            headers: {
              'Authorization': `Bearer ${token}`,
              'Accept': 'application/json',
            }
          });
        }
      } catch (error) {
        console.error('Error al eliminar imágenes:', error);
      }
    }

    // Luego actualizar el producto y agregar nuevas imágenes si hay
    const form = new FormData();

    // Laravel requiere _method para simular PUT cuando se envían archivos
    form.append('_method', 'PUT');

    // Append product fields
    Object.keys(formData).forEach(key => {
      if (key !== 'images' && key !== 'imagePreviews' && key !== 'existingImages' && key !== 'deletedImageIds') {
        form.append(key, formData[key]);
      }
    });

    // Append new images (solo si hay nuevas imágenes)
    if (formData.images && formData.images.length > 0) {
      formData.images.forEach((img) => {
        form.append('images[]', img);
      });
    }

    try {
      setLoading(true);
      const response = await fetch(`${API_BASE_URL}/products/${id}`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Accept': 'application/json',
        },
        body: form,
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Error al actualizar el producto');
      }

      await fetchProducts();
      return data;
    } catch (error) {
      console.error('Error al actualizar producto:', error);
      throw error;
    } finally {
      setLoading(false);
    }
  }, [fetchProducts]);

  const deleteProduct = useCallback(async (id) => {
    const token = localStorage.getItem('token');

    try {
      setLoading(true);
      const response = await fetch(`${API_BASE_URL}/products/${id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Accept': 'application/json'
        }
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.message || 'Error al eliminar el producto');
      }

      await fetchProducts();
    } catch (error) {
      console.error('Error al eliminar producto:', error);
      throw error;
    } finally {
      setLoading(false);
    }
  }, [fetchProducts]);

  return {
    products,
    loading,
    error,
    fetchProducts,
    createProduct,
    updateProduct,
    deleteProduct
  };
};
