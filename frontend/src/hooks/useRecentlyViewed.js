import { useState, useEffect } from 'react'

const STORAGE_KEY = 'recentlyViewedProducts'
const MAX_ITEMS = 20 // Máximo de productos a guardar

/**
 * Hook para gestionar productos recientemente vistos
 * Almacena en localStorage para persistir sin necesidad de sesión
 */
export function useRecentlyViewed() {
  const [recentlyViewed, setRecentlyViewed] = useState([])

  // Cargar productos vistos al montar
  useEffect(() => {
    loadRecentlyViewed()
  }, [])

  // Cargar desde localStorage
  const loadRecentlyViewed = () => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY)
      if (stored) {
        const parsed = JSON.parse(stored)
        setRecentlyViewed(parsed)
      }
    } catch (error) {
      console.error('Error loading recently viewed products:', error)
    }
  }

  // Agregar producto visto
  const addRecentlyViewed = (product) => {
    try {
      // Crear objeto simplificado del producto
      const productData = {
        id: product.id,
        name: product.name,
        slug: product.slug,
        price: product.price,
        image: product.images?.[0]?.image_url || product.image_url,
        viewedAt: new Date().toISOString()
      }

      // Obtener lista actual
      const stored = localStorage.getItem(STORAGE_KEY)
      let viewedList = stored ? JSON.parse(stored) : []

      // Eliminar el producto si ya existe (para moverlo al inicio)
      viewedList = viewedList.filter(item => item.id !== product.id)

      // Agregar al inicio
      viewedList.unshift(productData)

      // Limitar a MAX_ITEMS
      if (viewedList.length > MAX_ITEMS) {
        viewedList = viewedList.slice(0, MAX_ITEMS)
      }

      // Guardar
      localStorage.setItem(STORAGE_KEY, JSON.stringify(viewedList))
      setRecentlyViewed(viewedList)
    } catch (error) {
      console.error('Error saving recently viewed product:', error)
    }
  }

  // Limpiar historial
  const clearRecentlyViewed = () => {
    try {
      localStorage.removeItem(STORAGE_KEY)
      setRecentlyViewed([])
    } catch (error) {
      console.error('Error clearing recently viewed products:', error)
    }
  }

  // Eliminar un producto específico
  const removeRecentlyViewed = (productId) => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY)
      if (stored) {
        let viewedList = JSON.parse(stored)
        viewedList = viewedList.filter(item => item.id !== productId)
        localStorage.setItem(STORAGE_KEY, JSON.stringify(viewedList))
        setRecentlyViewed(viewedList)
      }
    } catch (error) {
      console.error('Error removing recently viewed product:', error)
    }
  }

  return {
    recentlyViewed,
    addRecentlyViewed,
    clearRecentlyViewed,
    removeRecentlyViewed
  }
}
