import { useState, useEffect } from 'react'
import { defaultConfig } from '../config/siteConfig'

/**
 * Hook personalizado para usar la configuración del sitio
 * Se actualiza automáticamente cuando cambia el localStorage
 */
export const useSiteConfig = () => {
  const [config, setConfig] = useState(() => {
    try {
      const savedConfig = localStorage.getItem('siteConfig')
      if (savedConfig) {
        const parsed = JSON.parse(savedConfig)
        return { ...defaultConfig, ...parsed }
      }
    } catch (error) {
      console.error('Error al cargar configuración:', error)
    }
    return defaultConfig
  })

  useEffect(() => {
    // Función para actualizar la configuración
    const updateConfig = () => {
      try {
        const savedConfig = localStorage.getItem('siteConfig')
        if (savedConfig) {
          const parsed = JSON.parse(savedConfig)
          setConfig({ ...defaultConfig, ...parsed })
        } else {
          setConfig(defaultConfig)
        }
      } catch (error) {
        console.error('Error al actualizar configuración:', error)
      }
    }

    // Escuchar cambios en el storage
    window.addEventListener('storage', updateConfig)
    
    // Escuchar evento personalizado para cambios en la misma pestaña
    window.addEventListener('siteConfigUpdated', updateConfig)

    return () => {
      window.removeEventListener('storage', updateConfig)
      window.removeEventListener('siteConfigUpdated', updateConfig)
    }
  }, [])

  return config
}
