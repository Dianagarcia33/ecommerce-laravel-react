import { useState, useEffect } from 'react'
import { defaultConfig } from '../config/siteConfig'

/**
 * Función auxiliar para hacer merge profundo de objetos
 */
const deepMerge = (target, source) => {
  const output = { ...target }
  
  if (isObject(target) && isObject(source)) {
    Object.keys(source).forEach(key => {
      if (isObject(source[key])) {
        if (!(key in target)) {
          output[key] = source[key]
        } else {
          output[key] = deepMerge(target[key], source[key])
        }
      } else {
        output[key] = source[key]
      }
    })
  }
  
  return output
}

const isObject = (item) => {
  return item && typeof item === 'object' && !Array.isArray(item)
}

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
        // Merge: defaultConfig primero, luego parsed para sobrescribir
        const merged = deepMerge(defaultConfig, parsed)
        console.log('Initial config loaded, navbar:', merged.theme?.navbar) // Debug
        return merged
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
          const merged = deepMerge(defaultConfig, parsed)
          console.log('Config updated, navbar:', merged.theme?.navbar) // Debug
          setConfig(merged)
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
