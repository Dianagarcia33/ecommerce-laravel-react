import { createContext, useContext, useState, useEffect } from 'react'
import api from '../services/api'
import { useAuth } from './AuthContext'

const FavoritesContext = createContext()

export const useFavorites = () => {
  const context = useContext(FavoritesContext)
  if (!context) {
    throw new Error('useFavorites must be used within FavoritesProvider')
  }
  return context
}

export const FavoritesProvider = ({ children }) => {
  const { user } = useAuth()
  const [favorites, setFavorites] = useState([])
  const [favoriteIds, setFavoriteIds] = useState(new Set())
  const [loading, setLoading] = useState(false)

  // Cargar favoritos cuando el usuario inicia sesión, limpiar cuando cierra sesión
  useEffect(() => {
    if (user) {
      loadFavorites()
    } else {
      // Si no hay usuario, limpiar favoritos
      clearFavorites()
    }
  }, [user])

  const loadFavorites = async () => {
    try {
      setLoading(true)
      const response = await api.get('/favorites')
      setFavorites(response.data)
      setFavoriteIds(new Set(response.data.map(p => p.id)))
    } catch (error) {
      console.error('Error al cargar favoritos:', error)
    } finally {
      setLoading(false)
    }
  }

  const toggleFavorite = async (productId) => {
    const token = localStorage.getItem('token')
    if (!token) {
      return { success: false, needsLogin: true }
    }

    try {
      const response = await api.post('/favorites/toggle', { product_id: productId })
      
      if (response.data.is_favorite) {
        // Agregado a favoritos
        setFavoriteIds(prev => new Set([...prev, productId]))
      } else {
        // Eliminado de favoritos
        setFavoriteIds(prev => {
          const newSet = new Set(prev)
          newSet.delete(productId)
          return newSet
        })
      }

      // Recargar la lista completa
      loadFavorites()

      return { 
        success: true, 
        isFavorite: response.data.is_favorite 
      }
    } catch (error) {
      console.error('Error al actualizar favorito:', error)
      return { success: false, error: error.message }
    }
  }

  const isFavorite = (productId) => {
    return favoriteIds.has(productId)
  }

  const clearFavorites = () => {
    setFavorites([])
    setFavoriteIds(new Set())
  }

  const value = {
    favorites,
    favoriteIds,
    loading,
    toggleFavorite,
    isFavorite,
    loadFavorites,
    clearFavorites,
    favoriteCount: favorites.length
  }

  return (
    <FavoritesContext.Provider value={value}>
      {children}
    </FavoritesContext.Provider>
  )
}
