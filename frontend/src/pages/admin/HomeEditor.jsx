import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'
import { useSiteConfig } from '../../hooks/useSiteConfig'
import { defaultConfig } from '../../config/siteConfig'
import {
  EyeIcon,
  PencilIcon,
  TrashIcon,
  PlusIcon,
  ArrowUpIcon,
  ArrowDownIcon,
  CheckIcon,
  XMarkIcon,
  Squares2X2Icon,
  PhotoIcon,
  SparklesIcon,
  ChartBarIcon,
  StarIcon,
  MegaphoneIcon,
  Cog6ToothIcon,
  ArrowPathIcon,
  DocumentTextIcon,
  PaintBrushIcon,
  EyeSlashIcon,
  BoltIcon,
  ShieldCheckIcon
} from '@heroicons/react/24/outline'

export default function HomeEditor() {
  const { user } = useAuth()
  const navigate = useNavigate()
  const config = useSiteConfig()
  const [initialConfig] = useState(config.home) // Guardar config inicial
  const [homeConfig, setHomeConfig] = useState(config.home)
  const [previewMode, setPreviewMode] = useState(false)
  const [editingSection, setEditingSection] = useState(null)
  const [hasChanges, setHasChanges] = useState(false)
  const [savedMessage, setSavedMessage] = useState('')

  useEffect(() => {
    if (!user || user.role !== 'admin') {
      navigate('/')
    }
  }, [user, navigate])

  useEffect(() => {
    const hasModifications = JSON.stringify(homeConfig) !== JSON.stringify(initialConfig)
    console.log('Detectando cambios:', hasModifications)
    console.log('Config actual:', homeConfig)
    console.log('Config inicial:', initialConfig)
    setHasChanges(hasModifications)
  }, [homeConfig, initialConfig])

  const [sectionVisibility, setSectionVisibility] = useState(() => {
    // Cargar desde localStorage o usar valores por defecto
    return config.sectionVisibility || {
      hero: true,
      stats: true,
      features: true,
      cta: true
    }
  })

  const sections = [
    {
      id: 'hero',
      name: 'Hero / Banner Principal',
      icon: SparklesIcon,
      description: 'Banner grande al inicio con título, subtítulo y botones',
      canHide: false // Hero siempre visible
    },
    {
      id: 'stats',
      name: 'Estadísticas',
      icon: ChartBarIcon,
      description: '4 números destacados (ej: 10K+ Productos)',
      canHide: true
    },
    {
      id: 'features',
      name: 'Características',
      icon: StarIcon,
      description: '4 características o beneficios de tu tienda',
      canHide: true
    },
    {
      id: 'cta',
      name: 'Llamada a la Acción (CTA)',
      icon: MegaphoneIcon,
      description: 'Sección final para motivar la compra',
      canHide: true
    }
  ]

  const toggleSectionVisibility = (sectionId) => {
    setSectionVisibility(prev => ({
      ...prev,
      [sectionId]: !prev[sectionId]
    }))
  }

  const handleSave = () => {
    try {
      const fullConfig = { 
        ...config, 
        home: homeConfig,
        sectionVisibility: sectionVisibility // Guardar visibilidad de secciones
      }
      localStorage.setItem('siteConfig', JSON.stringify(fullConfig))
      window.dispatchEvent(new Event('siteConfigUpdated'))
      
      setSavedMessage('¡Cambios guardados! Recargando...')
      setHasChanges(false)
      
      setTimeout(() => {
        window.location.reload()
      }, 1500)
    } catch (error) {
      console.error('Error al guardar:', error)
      alert('Error al guardar los cambios')
    }
  }

  const handleReset = () => {
    if (window.confirm('¿Restaurar valores por defecto del Home?')) {
      setHomeConfig(defaultConfig.home)
      setSavedMessage('Valores restaurados (no guardados aún)')
      setTimeout(() => setSavedMessage(''), 2000)
    }
  }

  const updateSection = (sectionId, path, value) => {
    setHomeConfig(prev => {
      // Deep clone para evitar mutación
      const newConfig = JSON.parse(JSON.stringify(prev))
      const keys = path.split('.')
      let current = newConfig[sectionId]
      
      for (let i = 0; i < keys.length - 1; i++) {
        current = current[keys[i]]
      }
      
      current[keys[keys.length - 1]] = value
      return newConfig
    })
  }

  const updateStatItem = (index, field, value) => {
    setHomeConfig(prev => ({
      ...prev,
      stats: prev.stats.map((stat, i) => 
        i === index ? { ...stat, [field]: value } : stat
      )
    }))
  }

  const updateFeatureItem = (index, field, value) => {
    setHomeConfig(prev => ({
      ...prev,
      features: {
        ...prev.features,
        items: prev.features.items.map((item, i) => 
          i === index ? { ...item, [field]: value } : item
        )
      }
    }))
  }

  const renderSectionEditor = (section) => {
    switch (section.id) {
      case 'hero':
        return <HeroEditor config={homeConfig.hero} updateSection={updateSection} />
      case 'stats':
        return <StatsEditor stats={homeConfig.stats} updateStatItem={updateStatItem} />
      case 'features':
        return <FeaturesEditor config={homeConfig.features} updateFeatureItem={updateFeatureItem} updateSection={updateSection} />
      case 'cta':
        return <CtaEditor config={homeConfig.cta} updateSection={updateSection} />
      default:
        return null
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 sticky top-0 z-50 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-4">
              <Squares2X2Icon className="w-8 h-8 text-indigo-600" />
              <div>
                <h1 className="text-xl font-bold text-gray-900">Editor del Home</h1>
                <p className="text-sm text-gray-500">Personaliza la página principal</p>
              </div>
            </div>

            <div className="flex items-center space-x-3">
              {hasChanges && (
                <span className="text-sm text-yellow-600 font-medium animate-pulse">
                  ● Cambios sin guardar
                </span>
              )}
              
              <button
                onClick={() => setPreviewMode(!previewMode)}
                className="flex items-center px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition"
              >
                <EyeIcon className="w-5 h-5 mr-2" />
                {previewMode ? 'Editor' : 'Vista Previa'}
              </button>

              <button
                onClick={handleReset}
                className="flex items-center px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition"
              >
                <ArrowPathIcon className="w-5 h-5 mr-2" />
                Restaurar
              </button>

              <button
                onClick={handleSave}
                disabled={!hasChanges}
                className={`flex items-center px-6 py-2 rounded-lg font-medium transition ${
                  hasChanges
                    ? 'bg-indigo-600 text-white hover:bg-indigo-700'
                    : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                }`}
              >
                <CheckIcon className="w-5 h-5 mr-2" />
                Guardar Cambios
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Mensaje de guardado */}
      {savedMessage && (
        <div className="fixed top-20 right-4 bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg z-50 animate-bounce">
          {savedMessage}
        </div>
      )}

      {/* Contenido principal */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {previewMode ? (
          <PreviewMode config={homeConfig} />
        ) : (
          <div className="space-y-6">
            {sections.map(section => (
              <SectionCard
                key={section.id}
                section={section}
                isEditing={editingSection === section.id}
                onEdit={() => setEditingSection(editingSection === section.id ? null : section.id)}
                isVisible={sectionVisibility[section.id]}
                onToggleVisibility={() => toggleSectionVisibility(section.id)}
              >
                {editingSection === section.id && renderSectionEditor(section)}
              </SectionCard>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

// Componente de tarjeta de sección
function SectionCard({ section, isEditing, onEdit, children, isVisible, onToggleVisibility }) {
  const Icon = section.icon

  return (
    <div className={`bg-white rounded-xl shadow-md overflow-hidden transition-all ${
      isEditing ? 'ring-2 ring-indigo-500' : ''
    } ${!isVisible ? 'opacity-60' : ''}`}>
      <div className="flex items-center justify-between p-6">
        <div 
          className="flex items-center space-x-4 cursor-pointer hover:bg-gray-50 flex-1 -m-6 p-6"
          onClick={onEdit}
        >
          <div className="bg-indigo-100 p-3 rounded-lg">
            <Icon className="w-6 h-6 text-indigo-600" />
          </div>
          <div className="flex-1">
            <div className="flex items-center space-x-2">
              <h3 className="text-lg font-bold text-gray-900">{section.name}</h3>
              {!isVisible && (
                <span className="text-xs bg-red-100 text-red-600 px-2 py-1 rounded-full">
                  Oculta
                </span>
              )}
            </div>
            <p className="text-sm text-gray-500">{section.description}</p>
          </div>
        </div>
        
        <div className="flex items-center space-x-2">
          {section.canHide && (
            <button
              onClick={(e) => {
                e.stopPropagation()
                onToggleVisibility()
              }}
              className={`p-2 rounded-lg transition ${
                isVisible 
                  ? 'text-gray-600 hover:bg-gray-100' 
                  : 'text-red-600 hover:bg-red-50'
              }`}
              title={isVisible ? 'Ocultar sección' : 'Mostrar sección'}
            >
              {isVisible ? (
                <EyeIcon className="w-5 h-5" />
              ) : (
                <EyeSlashIcon className="w-5 h-5" />
              )}
            </button>
          )}

          <button 
            onClick={onEdit}
            className="flex items-center text-indigo-600 font-medium hover:text-indigo-700 px-3 py-2 rounded-lg hover:bg-indigo-50"
          >
            {isEditing ? (
              <>
                <XMarkIcon className="w-5 h-5 mr-1" />
                Cerrar
              </>
            ) : (
              <>
                <PencilIcon className="w-5 h-5 mr-1" />
                Editar
              </>
            )}
          </button>
        </div>
      </div>

      {isEditing && (
        <div className="border-t border-gray-200 p-6 bg-gray-50">
          {children}
        </div>
      )}
    </div>
  )
}

// Editor del Hero - VERSIÓN COMPLETA
function HeroEditor({ config, updateSection }) {
  return (
    <div className="space-y-8">
      {/* Sección de Textos */}
      <div className="bg-white p-6 rounded-lg border-2 border-blue-200">
        <h4 className="text-lg font-bold text-gray-900 mb-4 flex items-center">
          <DocumentTextIcon className="w-5 h-5 mr-2 text-blue-600" />
          Textos
        </h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <InputField
            label="Badge Superior"
            value={config.badge}
            onChange={(e) => updateSection('hero', 'badge', e.target.value)}
            placeholder="🎉 Nueva Temporada 2025"
            helper="Texto pequeño que aparece arriba del título"
          />

          <InputField
            label="Título Principal"
            value={config.title}
            onChange={(e) => updateSection('hero', 'title', e.target.value)}
            placeholder="Tu Tienda Online Definitiva"
            helper="El título grande y destacado"
          />

          <TextareaField
            label="Subtítulo / Descripción"
            value={config.subtitle}
            onChange={(e) => updateSection('hero', 'subtitle', e.target.value)}
            placeholder="La mejor experiencia de compra online..."
            rows={3}
            helper="Descripción debajo del título"
          />
        </div>
      </div>

      {/* Sección de Botones */}
      <div className="bg-white p-6 rounded-lg border-2 border-green-200">
        <h4 className="text-lg font-bold text-gray-900 mb-4 flex items-center">
          <Cog6ToothIcon className="w-5 h-5 mr-2 text-green-600" />
          Botones de Acción
        </h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <InputField
              label="Texto del Botón Principal"
              value={config.primaryButton}
              onChange={(e) => updateSection('hero', 'primaryButton', e.target.value)}
              placeholder="Explorar Productos"
              helper="Botón principal (más visible)"
            />
            <InputField
              label="Enlace del Botón Principal"
              value={config.primaryButtonLink || '/products'}
              onChange={(e) => updateSection('hero', 'primaryButtonLink', e.target.value)}
              placeholder="/products"
              helper="Ruta a donde lleva el botón"
            />
          </div>

          <div>
            <InputField
              label="Texto del Botón Secundario"
              value={config.secondaryButton}
              onChange={(e) => updateSection('hero', 'secondaryButton', e.target.value)}
              placeholder="Ver Ofertas"
              helper="Botón secundario (menos visible)"
            />
            <InputField
              label="Enlace del Botón Secundario"
              value={config.secondaryButtonLink || '/products'}
              onChange={(e) => updateSection('hero', 'secondaryButtonLink', e.target.value)}
              placeholder="/products"
              helper="Ruta a donde lleva el botón"
            />
          </div>
        </div>
      </div>

      {/* Sección de Imagen de Fondo */}
      <div className="bg-white p-6 rounded-lg border-2 border-purple-200">
        <h4 className="text-lg font-bold text-gray-900 mb-4 flex items-center">
          <PhotoIcon className="w-5 h-5 mr-2 text-purple-600" />
          Imagen de Fondo (Opcional)
        </h4>
        <div className="space-y-4">
          <InputField
            label="URL de la Imagen"
            value={config.backgroundImage || ''}
            onChange={(e) => updateSection('hero', 'backgroundImage', e.target.value)}
            placeholder="https://ejemplo.com/imagen.jpg"
            helper="Deja vacío para usar colores de gradiente"
          />
          
          {config.backgroundImage && (
            <div className="relative">
              <img 
                src={config.backgroundImage} 
                alt="Vista previa" 
                className="w-full h-48 object-cover rounded-lg"
                onError={(e) => {
                  e.target.src = 'https://via.placeholder.com/800x400?text=Imagen+no+encontrada'
                }}
              />
              <button
                onClick={() => updateSection('hero', 'backgroundImage', '')}
                className="absolute top-2 right-2 bg-red-500 text-white p-2 rounded-full hover:bg-red-600"
              >
                <XMarkIcon className="w-4 h-4" />
              </button>
            </div>
          )}

          <div className="flex items-center space-x-2">
            <input
              type="checkbox"
              checked={config.showOverlay !== false}
              onChange={(e) => updateSection('hero', 'showOverlay', e.target.checked)}
              className="w-4 h-4 text-blue-600"
            />
            <label className="text-sm text-gray-700">
              Mostrar overlay oscuro sobre la imagen (mejora legibilidad del texto)
            </label>
          </div>
        </div>
      </div>

      {/* Sección de Estilo */}
      <div className="bg-white p-6 rounded-lg border-2 border-orange-200">
        <h4 className="text-lg font-bold text-gray-900 mb-4 flex items-center">
          <PaintBrushIcon className="w-5 h-5 mr-2 text-orange-600" />
          Estilo Visual
        </h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Alineación del Texto
            </label>
            <select
              value={config.textAlign || 'center'}
              onChange={(e) => updateSection('hero', 'textAlign', e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
            >
              <option value="left">Izquierda</option>
              <option value="center">Centro</option>
              <option value="right">Derecha</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Altura del Hero
            </label>
            <select
              value={config.height || 'normal'}
              onChange={(e) => updateSection('hero', 'height', e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
            >
              <option value="small">Pequeño (500px)</option>
              <option value="normal">Normal (700px)</option>
              <option value="large">Grande (pantalla completa)</option>
            </select>
          </div>

          <div className="md:col-span-2">
            <div className="flex items-center space-x-2">
              <input
                type="checkbox"
                checked={config.showAnimations !== false}
                onChange={(e) => updateSection('hero', 'showAnimations', e.target.checked)}
                className="w-4 h-4 text-blue-600"
              />
              <label className="text-sm text-gray-700">
                Activar animaciones (burbujas flotantes, fade-in, etc.)
              </label>
            </div>
          </div>

          <div className="md:col-span-2">
            <div className="flex items-center space-x-2">
              <input
                type="checkbox"
                checked={config.showScrollIndicator !== false}
                onChange={(e) => updateSection('hero', 'showScrollIndicator', e.target.checked)}
                className="w-4 h-4 text-blue-600"
              />
              <label className="text-sm text-gray-700">
                Mostrar indicador de scroll (flecha animada abajo)
              </label>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

// Agregar DocumentTextIcon y PaintBrushIcon a los imports si no están

// Editor de Estadísticas
function StatsEditor({ stats, updateStatItem }) {
  return (
    <div className="space-y-6">
      <p className="text-sm text-gray-600 mb-4">
        📊 4 números destacados que aparecen debajo del Hero en tarjetas con borde colorido
      </p>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {stats.map((stat, index) => (
          <div key={index} className="bg-gradient-to-br from-white to-gray-50 p-6 rounded-xl border-2 border-gray-200 shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <h4 className="font-bold text-gray-900 text-lg">📈 Estadística {index + 1}</h4>
              <span className="text-xs bg-blue-100 text-blue-600 px-2 py-1 rounded-full">
                Visible
              </span>
            </div>
            
            {/* Sección: Contenido */}
            <div className="bg-white p-4 rounded-lg border-2 border-blue-200 mb-4">
              <h5 className="text-sm font-bold text-blue-700 mb-3 flex items-center">
                <DocumentTextIcon className="w-4 h-4 mr-2" />
                Contenido
              </h5>
              
              <div className="space-y-3">
                <InputField
                  label="Número/Valor"
                  value={stat.number}
                  onChange={(e) => updateStatItem(index, 'number', e.target.value)}
                  placeholder="10K+ o 5.0★"
                  helper="Puede incluir símbolos, letras y números (ej: 99%, 5K+, #1)"
                />
                <InputField
                  label="Etiqueta Descriptiva"
                  value={stat.label}
                  onChange={(e) => updateStatItem(index, 'label', e.target.value)}
                  placeholder="Productos Disponibles"
                  helper="Breve descripción que aparece debajo del número"
                />
              </div>
            </div>

            {/* Sección: Estilo del Icono */}
            <div className="bg-white p-4 rounded-lg border-2 border-purple-200 mb-4">
              <h5 className="text-sm font-bold text-purple-700 mb-3 flex items-center">
                <SparklesIcon className="w-4 h-4 mr-2" />
                Icono
              </h5>
              
              <InputField
                label="Nombre del Icono (Heroicons)"
                value={stat.iconName || 'ShoppingBagIcon'}
                onChange={(e) => updateStatItem(index, 'iconName', e.target.value)}
                placeholder="ShoppingBagIcon, TruckIcon, StarIcon..."
                helper="Usa nombres de Heroicons (ShoppingBagIcon, UserGroupIcon, ChartBarIcon, etc.)"
              />
              
              <p className="text-xs text-purple-600 mt-2 bg-purple-50 p-2 rounded">
                💡 Iconos comunes: ShoppingBagIcon, TruckIcon, StarIcon, HeartIcon, UserGroupIcon, SparklesIcon, BoltIcon
              </p>
            </div>

            {/* Sección: Estilo Visual */}
            <div className="bg-white p-4 rounded-lg border-2 border-orange-200">
              <h5 className="text-sm font-bold text-orange-700 mb-3 flex items-center">
                <PaintBrushIcon className="w-4 h-4 mr-2" />
                Apariencia
              </h5>
              
              <div className="space-y-3">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Color del Gradiente
                  </label>
                  <select
                    value={stat.colorScheme || 'blue'}
                    onChange={(e) => updateStatItem(index, 'colorScheme', e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500"
                  >
                    <option value="blue">Azul (primario)</option>
                    <option value="green">Verde</option>
                    <option value="purple">Morado</option>
                    <option value="orange">Naranja</option>
                    <option value="pink">Rosa</option>
                    <option value="red">Rojo</option>
                  </select>
                  <p className="text-xs text-gray-500 mt-1">
                    Afecta el color del número en gradiente y el icono
                  </p>
                </div>

                <div className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    checked={stat.showAnimation !== false}
                    onChange={(e) => updateStatItem(index, 'showAnimation', e.target.checked)}
                    className="w-4 h-4 text-orange-600"
                  />
                  <label className="text-sm text-gray-700">
                    Activar efecto hover (escala al pasar el mouse)
                  </label>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Opciones Globales */}
      <div className="bg-gradient-to-r from-indigo-50 to-blue-50 p-6 rounded-xl border-2 border-indigo-200 mt-6">
        <h4 className="text-lg font-bold text-indigo-900 mb-4 flex items-center">
          <Cog6ToothIcon className="w-5 h-5 mr-2" />
          Opciones Globales de Estadísticas
        </h4>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Distribución en Pantalla
            </label>
            <select
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
              defaultValue="4"
            >
              <option value="2">2 columnas (móvil: 1)</option>
              <option value="4">4 columnas (móvil: 2)</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Estilo de Fondo
            </label>
            <select
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
              defaultValue="white"
            >
              <option value="white">Blanco sólido</option>
              <option value="gradient">Gradiente suave</option>
              <option value="transparent">Semi-transparente</option>
            </select>
          </div>
        </div>
        
        <p className="text-xs text-indigo-600 mt-3 bg-white p-2 rounded">
          ℹ️ Las opciones globales se aplicarán en una futura actualización
        </p>
      </div>
    </div>
  )
}

// Editor de Características
function FeaturesEditor({ config, updateFeatureItem, updateSection }) {
  return (
    <div className="space-y-6">
      {/* Encabezado de Sección */}
      <div className="bg-gradient-to-r from-purple-50 to-pink-50 p-6 rounded-xl border-2 border-purple-200">
        <h4 className="text-lg font-bold text-purple-900 mb-4 flex items-center">
          <DocumentTextIcon className="w-5 h-5 mr-2" />
          Encabezado de la Sección
        </h4>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <InputField
            label="Título Principal"
            value={config.title}
            onChange={(e) => updateSection('features', 'title', e.target.value)}
            placeholder="¿Por qué elegirnos?"
            helper="Título grande que aparece arriba de las características"
          />

          <TextareaField
            label="Subtítulo Descriptivo"
            value={config.subtitle}
            onChange={(e) => updateSection('features', 'subtitle', e.target.value)}
            placeholder="Ofrecemos la mejor experiencia de compra..."
            rows={2}
            helper="Texto complementario debajo del título"
          />
        </div>
      </div>

      <p className="text-sm text-gray-600 mb-4">
        ⭐ 4 características o beneficios principales de tu negocio (se muestran en tarjetas con iconos)
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {config.items.map((item, index) => (
          <div key={index} className="bg-gradient-to-br from-white to-gray-50 p-6 rounded-xl border-2 border-gray-200 shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <h4 className="font-bold text-gray-900 text-lg">✨ Característica {index + 1}</h4>
              <span className="text-xs bg-green-100 text-green-600 px-2 py-1 rounded-full">
                Activa
              </span>
            </div>
            
            {/* Sección: Contenido */}
            <div className="bg-white p-4 rounded-lg border-2 border-blue-200 mb-4">
              <h5 className="text-sm font-bold text-blue-700 mb-3 flex items-center">
                <DocumentTextIcon className="w-4 h-4 mr-2" />
                Textos
              </h5>
              
              <div className="space-y-3">
                <InputField
                  label="Título de la Característica"
                  value={item.title}
                  onChange={(e) => updateFeatureItem(index, 'title', e.target.value)}
                  placeholder="Calidad Garantizada"
                  helper="Nombre corto y descriptivo (ej: Envío Rápido, Pago Seguro)"
                />
                
                <TextareaField
                  label="Descripción Detallada"
                  value={item.description}
                  onChange={(e) => updateFeatureItem(index, 'description', e.target.value)}
                  placeholder="Todos nuestros productos pasan por rigurosos controles de calidad..."
                  rows={3}
                  helper="Explica el beneficio en más detalle (2-3 líneas)"
                />
              </div>
            </div>

            {/* Sección: Icono */}
            <div className="bg-white p-4 rounded-lg border-2 border-purple-200 mb-4">
              <h5 className="text-sm font-bold text-purple-700 mb-3 flex items-center">
                <SparklesIcon className="w-4 h-4 mr-2" />
                Icono Representativo
              </h5>
              
              <InputField
                label="Nombre del Icono (Heroicons)"
                value={item.iconName || 'ShieldCheckIcon'}
                onChange={(e) => updateFeatureItem(index, 'iconName', e.target.value)}
                placeholder="ShieldCheckIcon, TruckIcon, SparklesIcon..."
                helper="Nombre del icono de Heroicons que mejor represente esta característica"
              />
              
              <div className="mt-3 p-3 bg-purple-50 rounded-lg">
                <p className="text-xs text-purple-700 font-medium mb-2">💡 Iconos sugeridos por categoría:</p>
                <div className="text-xs text-purple-600 space-y-1">
                  <div><strong>Calidad:</strong> ShieldCheckIcon, StarIcon, SparklesIcon</div>
                  <div><strong>Envío:</strong> TruckIcon, RocketLaunchIcon, BoltIcon</div>
                  <div><strong>Seguridad:</strong> LockClosedIcon, ShieldCheckIcon, FingerPrintIcon</div>
                  <div><strong>Soporte:</strong> ChatBubbleLeftRightIcon, PhoneIcon, UserGroupIcon</div>
                  <div><strong>Precio:</strong> CurrencyDollarIcon, TagIcon, GiftIcon</div>
                </div>
              </div>
            </div>

            {/* Sección: Estilo Visual */}
            <div className="bg-white p-4 rounded-lg border-2 border-orange-200">
              <h5 className="text-sm font-bold text-orange-700 mb-3 flex items-center">
                <PaintBrushIcon className="w-4 h-4 mr-2" />
                Estilo Visual
              </h5>
              
              <div className="space-y-3">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Esquema de Color
                  </label>
                  <select
                    value={item.colorScheme || 'blue'}
                    onChange={(e) => updateFeatureItem(index, 'colorScheme', e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500"
                  >
                    <option value="blue">Azul</option>
                    <option value="green">Verde</option>
                    <option value="purple">Morado</option>
                    <option value="orange">Naranja</option>
                    <option value="pink">Rosa</option>
                    <option value="red">Rojo</option>
                    <option value="yellow">Amarillo</option>
                    <option value="indigo">Índigo</option>
                  </select>
                  <p className="text-xs text-gray-500 mt-1">
                    Define el color del fondo del icono y efectos hover
                  </p>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Animación de Entrada
                  </label>
                  <select
                    value={item.animation || 'slideUp'}
                    onChange={(e) => updateFeatureItem(index, 'animation', e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500"
                  >
                    <option value="slideUp">Deslizar desde abajo</option>
                    <option value="fadeIn">Aparecer gradualmente</option>
                    <option value="scaleIn">Crecer desde el centro</option>
                    <option value="none">Sin animación</option>
                  </select>
                </div>

                <div className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    checked={item.showHoverEffect !== false}
                    onChange={(e) => updateFeatureItem(index, 'showHoverEffect', e.target.checked)}
                    className="w-4 h-4 text-orange-600"
                  />
                  <label className="text-sm text-gray-700">
                    Efecto hover (elevar tarjeta y rotar icono)
                  </label>
                </div>

                <div className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    checked={item.visible !== false}
                    onChange={(e) => updateFeatureItem(index, 'visible', e.target.checked)}
                    className="w-4 h-4 text-orange-600"
                  />
                  <label className="text-sm text-gray-700">
                    Mostrar esta característica
                  </label>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Opciones de Layout */}
      <div className="bg-gradient-to-r from-indigo-50 to-blue-50 p-6 rounded-xl border-2 border-indigo-200 mt-6">
        <h4 className="text-lg font-bold text-indigo-900 mb-4 flex items-center">
          <Cog6ToothIcon className="w-5 h-5 mr-2" />
          Opciones de Diseño Global
        </h4>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Columnas en Desktop
            </label>
            <select
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
              defaultValue="4"
            >
              <option value="2">2 columnas</option>
              <option value="3">3 columnas</option>
              <option value="4">4 columnas</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Espaciado entre tarjetas
            </label>
            <select
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
              defaultValue="normal"
            >
              <option value="compact">Compacto</option>
              <option value="normal">Normal</option>
              <option value="spacious">Espacioso</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Color de fondo de sección
            </label>
            <select
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
              defaultValue="gradient"
            >
              <option value="white">Blanco</option>
              <option value="gray">Gris claro</option>
              <option value="gradient">Gradiente (blanco a gris)</option>
            </select>
          </div>
        </div>
        
        <p className="text-xs text-indigo-600 mt-3 bg-white p-2 rounded">
          ℹ️ Las opciones de diseño global se aplicarán en una futura actualización
        </p>
      </div>
    </div>
  )
}

// Editor de CTA (Call to Action)
function CtaEditor({ config, updateSection }) {
  return (
    <div className="space-y-6">
      <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mb-6">
        <div className="flex items-start">
          <MegaphoneIcon className="w-6 h-6 text-yellow-600 mr-3 flex-shrink-0 mt-0.5" />
          <div>
            <h4 className="text-sm font-bold text-yellow-800 mb-1">
              📢 Sección de Llamada a la Acción Final
            </h4>
            <p className="text-xs text-yellow-700">
              Esta sección aparece al final del Home con un fondo degradado colorido para motivar al usuario a explorar productos o realizar alguna acción.
            </p>
          </div>
        </div>
      </div>

      {/* Sección: Textos Principales */}
      <div className="bg-white p-6 rounded-lg border-2 border-blue-200">
        <h4 className="text-lg font-bold text-blue-700 mb-4 flex items-center">
          <DocumentTextIcon className="w-5 h-5 mr-2" />
          Textos de Impacto
        </h4>
        
        <div className="space-y-4">
          <InputField
            label="Título Principal (Grande y Llamativo)"
            value={config.title}
            onChange={(e) => updateSection('cta', 'title', e.target.value)}
            placeholder="¿Listo para empezar?"
            helper="Frase corta e impactante que motive la acción (ej: '¡Empieza Ya!', '¿Listo para Comprar?')"
          />

          <TextareaField
            label="Subtítulo / Descripción"
            value={config.subtitle}
            onChange={(e) => updateSection('cta', 'subtitle', e.target.value)}
            placeholder="Explora miles de productos y encuentra lo que necesitas..."
            rows={2}
            helper="Mensaje complementario más detallado que refuerce el título"
          />
        </div>
      </div>

      {/* Sección: Botones de Acción */}
      <div className="bg-white p-6 rounded-lg border-2 border-green-200">
        <h4 className="text-lg font-bold text-green-700 mb-4 flex items-center">
          <BoltIcon className="w-5 h-5 mr-2" />
          Botones de Acción
        </h4>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Botón Principal */}
          <div className="p-4 bg-green-50 rounded-lg">
            <h5 className="text-sm font-bold text-green-800 mb-3">🎯 Botón Principal (Destacado)</h5>
            
            <div className="space-y-3">
              <InputField
                label="Texto del Botón"
                value={config.primaryButton}
                onChange={(e) => updateSection('cta', 'primaryButton', e.target.value)}
                placeholder="Explorar Catálogo"
                helper="Acción principal (ej: 'Ver Productos', 'Ir a Tienda')"
              />

              <InputField
                label="Enlace / URL"
                value={config.primaryButtonLink || '/products'}
                onChange={(e) => updateSection('cta', 'primaryButtonLink', e.target.value)}
                placeholder="/products"
                helper="Ruta interna (ej: /products) o URL externa"
              />

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Icono del Botón
                </label>
                <select
                  value={config.primaryButtonIcon || 'ShoppingBagIcon'}
                  onChange={(e) => updateSection('cta', 'primaryButtonIcon', e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
                >
                  <option value="ShoppingBagIcon">🛍️ Bolsa de Compras</option>
                  <option value="ShoppingCartIcon">🛒 Carrito</option>
                  <option value="SparklesIcon">✨ Estrellas</option>
                  <option value="BoltIcon">⚡ Rayo</option>
                  <option value="RocketLaunchIcon">🚀 Cohete</option>
                  <option value="ArrowRightIcon">➡️ Flecha Derecha</option>
                </select>
              </div>
            </div>
          </div>

          {/* Botón Secundario */}
          <div className="p-4 bg-yellow-50 rounded-lg">
            <h5 className="text-sm font-bold text-yellow-800 mb-3">⭐ Botón Secundario (Alternativo)</h5>
            
            <div className="space-y-3">
              <InputField
                label="Texto del Botón"
                value={config.secondaryButton}
                onChange={(e) => updateSection('cta', 'secondaryButton', e.target.value)}
                placeholder="Ver Destacados"
                helper="Acción secundaria (ej: 'Ver Ofertas', 'Más Info')"
              />

              <InputField
                label="Enlace / URL"
                value={config.secondaryButtonLink || '/products'}
                onChange={(e) => updateSection('cta', 'secondaryButtonLink', e.target.value)}
                placeholder="/products?featured=true"
                helper="Ruta interna o URL externa para el botón secundario"
              />

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Icono del Botón
                </label>
                <select
                  value={config.secondaryButtonIcon || 'StarIcon'}
                  onChange={(e) => updateSection('cta', 'secondaryButtonIcon', e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500"
                >
                  <option value="StarIcon">⭐ Estrella</option>
                  <option value="FireIcon">🔥 Fuego</option>
                  <option value="GiftIcon">🎁 Regalo</option>
                  <option value="TagIcon">🏷️ Etiqueta</option>
                  <option value="HeartIcon">❤️ Corazón</option>
                  <option value="EyeIcon">👁️ Ojo</option>
                </select>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Sección: Badges de Confianza */}
      <div className="bg-white p-6 rounded-lg border-2 border-purple-200">
        <h4 className="text-lg font-bold text-purple-700 mb-4 flex items-center">
          <ShieldCheckIcon className="w-5 h-5 mr-2" />
          Badges de Confianza
        </h4>
        
        <p className="text-sm text-gray-600 mb-4">
          Pequeños indicadores que aparecen debajo de los botones para generar confianza
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <InputField
              label="Badge 1"
              value={config.badge1 || 'Compra Segura'}
              onChange={(e) => updateSection('cta', 'badge1', e.target.value)}
              placeholder="Compra Segura"
            />
          </div>

          <div>
            <InputField
              label="Badge 2"
              value={config.badge2 || 'Envío Gratis'}
              onChange={(e) => updateSection('cta', 'badge2', e.target.value)}
              placeholder="Envío Gratis"
            />
          </div>

          <div>
            <InputField
              label="Badge 3"
              value={config.badge3 || 'Garantía Total'}
              onChange={(e) => updateSection('cta', 'badge3', e.target.value)}
              placeholder="Garantía Total"
            />
          </div>
        </div>

        <div className="flex items-center space-x-2 mt-4">
          <input
            type="checkbox"
            checked={config.showBadges !== false}
            onChange={(e) => updateSection('cta', 'showBadges', e.target.checked)}
            className="w-4 h-4 text-purple-600"
          />
          <label className="text-sm text-gray-700">
            Mostrar badges de confianza
          </label>
        </div>
      </div>

      {/* Sección: Estilo Visual */}
      <div className="bg-white p-6 rounded-lg border-2 border-orange-200">
        <h4 className="text-lg font-bold text-orange-700 mb-4 flex items-center">
          <PaintBrushIcon className="w-5 h-5 mr-2" />
          Estilo Visual y Fondo
        </h4>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Tipo de Fondo
            </label>
            <select
              value={config.backgroundType || 'gradient'}
              onChange={(e) => updateSection('cta', 'backgroundType', e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500"
            >
              <option value="gradient">Gradiente de colores (automático)</option>
              <option value="image">Imagen de fondo</option>
              <option value="solid">Color sólido</option>
              <option value="pattern">Patrón decorativo</option>
            </select>
          </div>

          {config.backgroundType === 'image' && (
            <InputField
              label="URL de Imagen de Fondo"
              value={config.backgroundImage || ''}
              onChange={(e) => updateSection('cta', 'backgroundImage', e.target.value)}
              placeholder="https://ejemplo.com/imagen.jpg"
              helper="URL de la imagen para el fondo del CTA"
            />
          )}

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Altura de la Sección
            </label>
            <select
              value={config.height || 'normal'}
              onChange={(e) => updateSection('cta', 'height', e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500"
            >
              <option value="compact">Compacto (py-16)</option>
              <option value="normal">Normal (py-24)</option>
              <option value="large">Grande (py-32)</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Alineación del Texto
            </label>
            <select
              value={config.textAlign || 'center'}
              onChange={(e) => updateSection('cta', 'textAlign', e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500"
            >
              <option value="left">Izquierda</option>
              <option value="center">Centro</option>
              <option value="right">Derecha</option>
            </select>
          </div>
        </div>

        <div className="mt-4 space-y-3">
          <div className="flex items-center space-x-2">
            <input
              type="checkbox"
              checked={config.showIcon !== false}
              onChange={(e) => updateSection('cta', 'showIcon', e.target.checked)}
              className="w-4 h-4 text-orange-600"
            />
            <label className="text-sm text-gray-700">
              Mostrar icono animado arriba del título (rayo pulsante)
            </label>
          </div>

          <div className="flex items-center space-x-2">
            <input
              type="checkbox"
              checked={config.showPattern !== false}
              onChange={(e) => updateSection('cta', 'showPattern', e.target.checked)}
              className="w-4 h-4 text-orange-600"
            />
            <label className="text-sm text-gray-700">
              Mostrar patrón decorativo en el fondo
            </label>
          </div>

          <div className="flex items-center space-x-2">
            <input
              type="checkbox"
              checked={config.showAnimations !== false}
              onChange={(e) => updateSection('cta', 'showAnimations', e.target.checked)}
              className="w-4 h-4 text-orange-600"
            />
            <label className="text-sm text-gray-700">
              Activar animaciones de hover en botones (escala, rotación)
            </label>
          </div>
        </div>
      </div>

      {/* Nota Informativa */}
      <div className="bg-gradient-to-r from-indigo-50 to-blue-50 p-6 rounded-xl border-2 border-indigo-200">
        <div className="flex items-start">
          <PhotoIcon className="w-6 h-6 text-indigo-600 mr-3 flex-shrink-0 mt-0.5" />
          <div>
            <h4 className="text-sm font-bold text-indigo-800 mb-2">
              💡 Consejos para un CTA Efectivo
            </h4>
            <ul className="text-xs text-indigo-700 space-y-1">
              <li>• Usa verbos de acción directos: "Compra Ahora", "Descubre", "Empieza Ya"</li>
              <li>• Mantén el título corto y provocador (máximo 6-8 palabras)</li>
              <li>• El contraste del fondo ayuda a destacar esta sección</li>
              <li>• Los badges generan confianza y reducen fricción en la decisión</li>
              <li>• El botón principal debe llevar a tu acción más importante (ej: catálogo)</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}

// Componentes reutilizables
function InputField({ label, value, onChange, placeholder, type = 'text', helper }) {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-2">
        {label}
      </label>
      <input
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition"
      />
      {helper && (
        <p className="mt-1 text-xs text-gray-500">{helper}</p>
      )}
    </div>
  )
}

function TextareaField({ label, value, onChange, placeholder, rows = 3, helper }) {
  return (
    <div className="md:col-span-2">
      <label className="block text-sm font-medium text-gray-700 mb-2">
        {label}
      </label>
      <textarea
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        rows={rows}
        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition resize-none"
      />
      {helper && (
        <p className="mt-1 text-xs text-gray-500">{helper}</p>
      )}
    </div>
  )
}

// Vista previa
function PreviewMode({ config }) {
  return (
    <div className="bg-white rounded-xl shadow-lg p-8">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-gray-900 mb-4">Vista Previa</h2>
        <p className="text-gray-600">Así se verá tu Home con los cambios</p>
      </div>

      {/* Hero Preview */}
      <div className="mb-12 p-8 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-xl text-white">
        <div className="text-center">
          <span className="inline-block bg-white/20 px-4 py-2 rounded-full text-sm font-medium mb-4">
            {config.hero.badge}
          </span>
          <h1 className="text-4xl font-bold mb-4">{config.hero.title}</h1>
          <p className="text-lg mb-6 opacity-90">{config.hero.subtitle}</p>
          <div className="flex gap-4 justify-center">
            <button className="px-6 py-3 bg-white text-indigo-600 rounded-lg font-medium">
              {config.hero.primaryButton}
            </button>
            <button className="px-6 py-3 bg-white/20 text-white rounded-lg font-medium">
              {config.hero.secondaryButton}
            </button>
          </div>
        </div>
      </div>

      {/* Stats Preview */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
        {config.stats.map((stat, i) => (
          <div key={i} className="text-center p-4 bg-gray-50 rounded-lg">
            <div className="text-3xl font-bold text-indigo-600">{stat.number}</div>
            <div className="text-sm text-gray-600">{stat.label}</div>
          </div>
        ))}
      </div>

      {/* Features Preview */}
      <div className="mb-12">
        <h2 className="text-3xl font-bold text-center mb-4">{config.features.title}</h2>
        <p className="text-gray-600 text-center mb-8">{config.features.subtitle}</p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {config.features.items.map((item, i) => (
            <div key={i} className="p-6 bg-gray-50 rounded-lg">
              <h3 className="font-bold text-lg mb-2">{item.title}</h3>
              <p className="text-sm text-gray-600">{item.description}</p>
            </div>
          ))}
        </div>
      </div>

      {/* CTA Preview */}
      <div className="p-8 bg-gradient-to-r from-purple-500 to-pink-600 rounded-xl text-white text-center">
        <h2 className="text-3xl font-bold mb-4">{config.cta.title}</h2>
        <p className="text-lg mb-6 opacity-90">{config.cta.subtitle}</p>
        <div className="flex gap-4 justify-center">
          <button className="px-6 py-3 bg-white text-purple-600 rounded-lg font-medium">
            {config.cta.primaryButton}
          </button>
          <button className="px-6 py-3 bg-white/20 text-white rounded-lg font-medium">
            {config.cta.secondaryButton}
          </button>
        </div>
      </div>
    </div>
  )
}
