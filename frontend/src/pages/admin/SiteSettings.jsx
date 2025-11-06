import { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { useSiteConfig } from '../../hooks/useSiteConfig';
import { defaultConfig } from '../../config/siteConfig';
import {
  PaintBrushIcon,
  DocumentTextIcon,
  BuildingStorefrontIcon,
  Cog6ToothIcon,
  PhotoIcon,
  CheckCircleIcon,
  ArrowPathIcon
} from '@heroicons/react/24/outline';

export default function SiteSettings() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const siteConfig = useSiteConfig(); // Usar hook para obtener config reactiva
  const [activeTab, setActiveTab] = useState('colors');
  
  // Asegurar que la configuración tenga todos los valores necesarios
  const ensureNavbarConfig = (cfg) => {
    if (!cfg.theme.navbar) {
      cfg.theme.navbar = {
        background: 'white',
        blur: true,
        shadow: 'medium',
        textColor: 'dark',
        borderBottom: false
      };
    }
    return cfg;
  };
  
  const [initialConfig] = useState(ensureNavbarConfig({ ...siteConfig })); // Guardar config inicial para comparar
  const [config, setConfig] = useState(ensureNavbarConfig({ ...siteConfig }));
  const [savedMessage, setSavedMessage] = useState('');
  const [hasChanges, setHasChanges] = useState(false);

  useEffect(() => {
    if (!user || user.role !== 'admin') {
      navigate('/');
    }
  }, [user, navigate]);

  // Detectar cambios en la configuración
  useEffect(() => {
    const hasModifications = JSON.stringify(config) !== JSON.stringify(initialConfig);
    setHasChanges(hasModifications);
    console.log('Has changes:', hasModifications); // Debug
  }, [config, initialConfig]);

  const handleSave = () => {
    try {
      // Guardar en localStorage
      localStorage.setItem('siteConfig', JSON.stringify(config));
      
      // Disparar evento personalizado para notificar cambios
      window.dispatchEvent(new Event('siteConfigUpdated'));
      
      // Mostrar mensaje de éxito
      setSavedMessage('¡Configuración guardada exitosamente!');
      setHasChanges(false);
      
      // Ocultar mensaje después de 2 segundos
      setTimeout(() => setSavedMessage(''), 2000);
      
      // Recargar la página para aplicar cambios en todos los componentes
      setTimeout(() => {
        window.location.reload();
      }, 1500);
    } catch (error) {
      console.error('Error al guardar configuración:', error);
      alert('Error al guardar la configuración. Por favor, intenta de nuevo.');
    }
  };

  const handleReset = () => {
    if (window.confirm('¿Estás seguro de restaurar la configuración por defecto? Se perderán todos los cambios.')) {
      try {
        localStorage.removeItem('siteConfig');
        setSavedMessage('Configuración restaurada. Recargando...');
        setTimeout(() => {
          window.location.reload();
        }, 1000);
      } catch (error) {
        console.error('Error al restaurar configuración:', error);
        alert('Error al restaurar la configuración. Por favor, intenta de nuevo.');
      }
    }
  };

  const updateConfig = (path, value) => {
    const keys = path.split('.');
    const newConfig = JSON.parse(JSON.stringify(config)); // Deep clone
    let current = newConfig;
    
    for (let i = 0; i < keys.length - 1; i++) {
      if (!current[keys[i]]) {
        current[keys[i]] = {};
      }
      current = current[keys[i]];
    }
    
    current[keys[keys.length - 1]] = value;
    console.log('Config updated:', path, '=', value); // Debug
    console.log('New navbar config:', newConfig.theme?.navbar); // Debug
    setConfig(newConfig);
  };

  const colorPresets = [
    { name: 'gloint', label: '✨ GLOINT - Azul Profundo y Verde', colors: ['blue', 'green'], description: '🎯 Optimizado para logo GLOINT (recomendado)' },
    { name: 'darkContrast', label: '🌙 Contraste Oscuro Elegante', colors: ['slate', 'cyan'], description: '⚫ Logo brillante sobre fondos oscuros' },
    { name: 'warmContrast', label: '🔥 Contraste Cálido Vibrante', colors: ['orange', 'purple'], description: '🌟 Hace explotar los colores fríos del logo' },
    { name: 'purple', label: '💜 Púrpura Elegante', colors: ['purple', 'pink'], description: '✨ Sofisticado, complementa el logo sin competir' },
  ];

  // Mapa de colores Tailwind a valores hex reales
  const tailwindToHex = {
    // Cyan
    'cyan-400': '#22d3ee',
    'cyan-500': '#06b6d4',
    'cyan-600': '#0891b2',
    'cyan-700': '#0e7490',
    // Lime
    'lime-400': '#a3e635',
    'lime-500': '#84cc16',
    'lime-600': '#65a30d',
    // Green
    'green-400': '#4ade80',
    'green-500': '#22c55e',
    'green-600': '#16a34a',
    // Purple
    'purple-400': '#c084fc',
    'purple-500': '#a855f7',
    'purple-600': '#9333ea',
    'purple-700': '#7e22ce',
    // Pink
    'pink-400': '#f472b6',
    'pink-500': '#ec4899',
    'pink-600': '#db2777',
    // Blue
    'blue-400': '#60a5fa',
    'blue-500': '#3b82f6',
    'blue-600': '#2563eb',
    'blue-700': '#1d4ed8',
    'blue-800': '#1e40af',
    // Indigo
    'indigo-400': '#818cf8',
    'indigo-500': '#6366f1',
    'indigo-600': '#4f46e5',
    // Orange
    'orange-400': '#fb923c',
    'orange-500': '#f97316',
    'orange-600': '#ea580c',
    // Amber
    'amber-400': '#fbbf24',
    'amber-500': '#f59e0b',
    'amber-600': '#d97706',
    // Emerald
    'emerald-400': '#34d399',
    'emerald-500': '#10b981',
    'emerald-600': '#059669',
    // Teal
    'teal-400': '#2dd4bf',
    'teal-500': '#14b8a6',
    'teal-600': '#0d9488',
    // Rose
    'rose-400': '#fb7185',
    'rose-500': '#f43f5e',
    'rose-600': '#e11d48',
    // Red
    'red-400': '#f87171',
    'red-500': '#ef4444',
    'red-600': '#dc2626',
    // Slate (para dark contrast)
    'slate-700': '#334155',
    'slate-800': '#1e293b',
    'slate-900': '#0f172a',
  };

  const applyPreset = (presetName) => {
    const preset = defaultConfig.theme.presets[presetName];
    if (preset) {
      const newConfig = JSON.parse(JSON.stringify(config)); // Deep clone
      
      // Aplicar preset con valores hex calculados
      newConfig.theme.colors.primary = {
        ...preset.primary,
        hex: tailwindToHex[preset.primary.from] || '#22d3ee',
        light: tailwindToHex[preset.primary.from] || '#22d3ee',
        dark: tailwindToHex[preset.primary.to] || '#0891b2',
      };
      
      newConfig.theme.colors.secondary = {
        ...preset.secondary,
        hex: tailwindToHex[preset.secondary.from] || '#a3e635',
        light: tailwindToHex[preset.secondary.from] || '#a3e635',
        dark: tailwindToHex[preset.secondary.to] || '#65a30d',
      };
      
      // Aplicar color de navbar específico del preset
      if (preset.navbar) {
        if (!newConfig.theme.navbar) {
          newConfig.theme.navbar = {};
        }
        newConfig.theme.navbar.backgroundColor = preset.navbar.background;
        newConfig.theme.navbar.textColor = preset.navbar.textColor;
      }
      
      setConfig(newConfig);
      
      // Mostrar mensaje de que se aplicó el preset
      setSavedMessage(`Preset "${presetName}" aplicado. Recuerda guardar los cambios.`);
      setTimeout(() => setSavedMessage(''), 3000);
    }
  };

  const tabs = [
    { id: 'colors', name: 'Colores y Tema', icon: PaintBrushIcon },
    { id: 'business', name: 'Información Empresa', icon: BuildingStorefrontIcon },
    { id: 'assets', name: 'Logo y Recursos', icon: PhotoIcon },
    { id: 'settings', name: 'Configuración', icon: Cog6ToothIcon },
  ];

  if (!user || user.role !== 'admin') {
    return null;
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            ⚙️ Configuración Global del Sitio
          </h1>
          <p className="text-gray-600 mb-4">
            Configura colores, información de empresa y ajustes generales
          </p>
          <div className="bg-blue-50 border-l-4 border-blue-400 p-4 rounded-r-lg">
            <div className="flex items-start">
              <DocumentTextIcon className="w-5 h-5 text-blue-600 mr-3 flex-shrink-0 mt-0.5" />
              <div className="text-sm text-blue-800">
                <strong>💡 Nota:</strong> Para editar los textos y contenido del Home (Hero, Stats, Features, CTA), 
                usa el <strong>Editor del Home</strong> disponible en el Dashboard.
              </div>
            </div>
          </div>
        </div>

        {/* Mensaje de guardado */}
        {savedMessage && (
          <div className="mb-6 bg-green-50 border-2 border-green-200 text-green-700 px-6 py-4 rounded-xl flex items-center justify-between animate-fade-in">
            <div className="flex items-center">
              <CheckCircleIcon className="w-6 h-6 mr-3" />
              <span className="font-medium">{savedMessage}</span>
            </div>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar con tabs */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl shadow-lg p-6 sticky top-24">
              <h2 className="text-lg font-bold text-gray-900 mb-4">Secciones</h2>
              <nav className="space-y-2">
                {tabs.map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
                      activeTab === tab.id
                        ? 'bg-gradient-to-r from-cyan-400 to-cyan-600 text-white shadow-lg'
                        : 'text-gray-700 hover:bg-gray-100'
                    }`}
                  >
                    <tab.icon className="w-5 h-5" />
                    <span className="font-medium text-sm">{tab.name}</span>
                  </button>
                ))}
              </nav>

              {/* Botones de acción */}
              <div className="mt-6 space-y-3 pt-6 border-t border-gray-200">
                {hasChanges && (
                  <div className="bg-yellow-50 border border-yellow-200 text-yellow-800 px-3 py-2 rounded-lg text-sm text-center">
                    ⚠️ Tienes cambios sin guardar
                  </div>
                )}
                
                <button
                  onClick={handleSave}
                  disabled={!hasChanges}
                  className={`w-full flex items-center justify-center gap-2 font-bold py-3 rounded-xl transition-all shadow-lg ${
                    hasChanges
                      ? 'bg-gradient-to-r from-lime-400 to-green-500 text-gray-900 hover:from-lime-300 hover:to-green-400 hover:shadow-xl'
                      : 'bg-gray-200 text-gray-500 cursor-not-allowed'
                  }`}
                >
                  <CheckCircleIcon className="w-5 h-5" />
                  {hasChanges ? 'Guardar Cambios' : 'Sin Cambios'}
                </button>
                
                <button
                  onClick={handleReset}
                  className="w-full flex items-center justify-center gap-2 bg-white border-2 border-gray-200 text-gray-700 font-medium py-3 rounded-xl hover:border-red-300 hover:text-red-600 transition-all"
                >
                  <ArrowPathIcon className="w-5 h-5" />
                  Restaurar
                </button>
              </div>
            </div>
          </div>

          {/* Contenido */}
          <div className="lg:col-span-3">
            <div className="bg-white rounded-2xl shadow-lg p-8">
              {/* TAB: Colores y Tema */}
              {activeTab === 'colors' && (
                <div className="space-y-8">
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900 mb-2">🎨 Colores y Tema</h2>
                    <p className="text-gray-600">Personaliza la paleta de colores y estilo de la navbar</p>
                  </div>

                  {/* Configuración de Navbar */}
                  <div className="bg-gradient-to-br from-blue-50 to-cyan-50 p-6 rounded-xl border-2 border-blue-200">
                    <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                      <span className="text-2xl">🎯</span>
                      Estilo de la Barra de Navegación
                    </h3>
                    <p className="text-sm text-gray-600 mb-6">
                      Personaliza el aspecto de la navbar para mejorar el contraste con tu logo
                    </p>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {/* Fondo de Navbar */}
                      <div>
                        <label className="block text-sm font-bold text-gray-700 mb-3">
                          Fondo de la Navbar
                        </label>
                        <div className="grid grid-cols-2 gap-2">
                          {[
                            { value: 'white', label: 'Blanco', color: '#ffffff', border: true },
                            { value: 'transparent', label: 'Transparente', gradient: 'linear-gradient(45deg, #f0f0f0 25%, transparent 25%, transparent 75%, #f0f0f0 75%)' },
                            { value: 'primary', label: 'Primario', useConfig: 'primary' },
                            { value: 'dark', label: 'Oscuro', color: '#0f172a' },
                            { value: 'gradient', label: 'Gradiente', useConfig: 'gradient' },
                          ].map((option) => (
                            <button
                              key={option.value}
                              onClick={() => updateConfig('theme.navbar.background', option.value)}
                              className={`flex flex-col items-center p-3 rounded-lg border-2 transition-all ${
                                config.theme.navbar?.background === option.value
                                  ? 'border-blue-500 bg-blue-50 shadow-md'
                                  : 'border-gray-300 hover:border-blue-300'
                              }`}
                            >
                              <div 
                                className="w-full h-12 rounded mb-2"
                                style={
                                  option.useConfig === 'primary' ? { background: `linear-gradient(to right, ${config.theme.colors.primary.hex}, ${config.theme.colors.primary.dark})` } :
                                  option.useConfig === 'gradient' ? { background: `linear-gradient(to right, ${config.theme.colors.primary.hex}, ${config.theme.colors.secondary.hex})` } :
                                  option.gradient ? { backgroundImage: option.gradient, backgroundSize: '20px 20px' } :
                                  { backgroundColor: option.color, border: option.border ? '1px solid #e5e7eb' : 'none' }
                                }
                              />
                              <span className="text-xs font-medium text-gray-700">{option.label}</span>
                            </button>
                          ))}
                        </div>
                      </div>

                      {/* Color de Texto */}
                      <div>
                        <label className="block text-sm font-bold text-gray-700 mb-3">
                          Color del Texto
                        </label>
                        <div className="grid grid-cols-3 gap-2">
                          {[
                            { value: 'dark', label: 'Oscuro', color: '#1f2937' },
                            { value: 'light', label: 'Claro', color: '#ffffff' },
                            { value: 'primary', label: 'Primario', useConfig: true },
                          ].map((option) => (
                            <button
                              key={option.value}
                              onClick={() => updateConfig('theme.navbar.textColor', option.value)}
                              className={`flex flex-col items-center p-3 rounded-lg border-2 transition-all ${
                                config.theme.navbar?.textColor === option.value
                                  ? 'border-blue-500 bg-blue-50 shadow-md'
                                  : 'border-gray-300 hover:border-blue-300'
                              }`}
                            >
                              <div 
                                className="w-full h-12 rounded mb-2 flex items-center justify-center"
                                style={{ 
                                  backgroundColor: option.value === 'light' ? '#1f2937' : '#f9fafb',
                                  color: option.useConfig ? config.theme.colors.primary.hex : option.color
                                }}
                              >
                                <span className="text-xl font-bold">Aa</span>
                              </div>
                              <span className="text-xs font-medium text-gray-700">{option.label}</span>
                            </button>
                          ))}
                        </div>
                      </div>

                      {/* Sombra */}
                      <div>
                        <label className="block text-sm font-bold text-gray-700 mb-3">
                          Sombra
                        </label>
                        <div className="grid grid-cols-4 gap-2">
                          {[
                            { value: 'none', label: 'Sin sombra' },
                            { value: 'small', label: 'Pequeña' },
                            { value: 'medium', label: 'Media' },
                            { value: 'large', label: 'Grande' },
                          ].map((option) => (
                            <button
                              key={option.value}
                              onClick={() => updateConfig('theme.navbar.shadow', option.value)}
                              className={`p-3 rounded-lg border-2 transition-all ${
                                config.theme.navbar?.shadow === option.value
                                  ? 'border-blue-500 bg-blue-50'
                                  : 'border-gray-300 hover:border-blue-300'
                              }`}
                            >
                              <span className="text-xs font-medium text-gray-700 block text-center">
                                {option.label}
                              </span>
                            </button>
                          ))}
                        </div>
                      </div>

                      {/* Opciones adicionales */}
                      <div>
                        <label className="block text-sm font-bold text-gray-700 mb-3">
                          Efectos Adicionales
                        </label>
                        <div className="space-y-2">
                          <label className="flex items-center gap-3 p-3 bg-white rounded-lg border border-gray-300 cursor-pointer hover:border-blue-300 transition-all">
                            <input
                              type="checkbox"
                              checked={config.theme.navbar?.blur || false}
                              onChange={(e) => updateConfig('theme.navbar.blur', e.target.checked)}
                              className="w-5 h-5 text-blue-600 rounded focus:ring-2 focus:ring-blue-500"
                            />
                            <div>
                              <span className="text-sm font-medium text-gray-900 block">Efecto Blur</span>
                              <span className="text-xs text-gray-600">Glassmorphism al hacer scroll</span>
                            </div>
                          </label>
                          <label className="flex items-center gap-3 p-3 bg-white rounded-lg border border-gray-300 cursor-pointer hover:border-blue-300 transition-all">
                            <input
                              type="checkbox"
                              checked={config.theme.navbar?.borderBottom || false}
                              onChange={(e) => updateConfig('theme.navbar.borderBottom', e.target.checked)}
                              className="w-5 h-5 text-blue-600 rounded focus:ring-2 focus:ring-blue-500"
                            />
                            <div>
                              <span className="text-sm font-medium text-gray-900 block">Borde Inferior</span>
                              <span className="text-xs text-gray-600">Línea separadora</span>
                            </div>
                          </label>
                        </div>
                      </div>
                    </div>

                    {/* Vista Previa de Navbar */}
                    <div className="mt-6">
                      <label className="block text-sm font-bold text-gray-700 mb-3">
                        Vista Previa
                      </label>
                      <div className="bg-white rounded-lg overflow-hidden border-2 border-gray-200">
                        <div 
                          className={`h-16 flex items-center justify-between px-6 ${config.theme.navbar?.borderBottom ? 'border-b border-gray-200' : ''}`}
                          style={{
                            background: config.theme.navbar?.background === 'white' ? '#ffffff' :
                                      config.theme.navbar?.background === 'dark' ? '#0f172a' :
                                      config.theme.navbar?.background === 'primary' ? `linear-gradient(to right, ${config.theme.colors.primary.hex}, ${config.theme.colors.primary.dark})` :
                                      config.theme.navbar?.background === 'gradient' ? `linear-gradient(to right, ${config.theme.colors.primary.hex}, ${config.theme.colors.secondary.hex})` :
                                      'transparent',
                            backdropFilter: config.theme.navbar?.blur ? 'blur(8px)' : 'none'
                          }}
                        >
                          <div 
                            className="font-bold text-lg"
                            style={{ 
                              color: config.theme.navbar?.background === 'dark' || config.theme.navbar?.background === 'gradient' || config.theme.navbar?.textColor === 'light' ? '#ffffff' :
                                     config.theme.navbar?.textColor === 'primary' ? config.theme.colors.primary.hex :
                                     '#1f2937'
                            }}
                          >
                            Logo
                          </div>
                          <div className="flex gap-4">
                            {['Inicio', 'Productos', 'Contacto'].map((item) => (
                              <span 
                                key={item}
                                className="text-sm font-medium"
                                style={{ 
                                  color: config.theme.navbar?.background === 'dark' || config.theme.navbar?.background === 'gradient' || config.theme.navbar?.textColor === 'light' ? '#ffffff' :
                                         config.theme.navbar?.textColor === 'primary' ? config.theme.colors.primary.hex :
                                         '#4b5563'
                                }}
                              >
                                {item}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Presets rápidos */}
                  <div>
                    <h3 className="text-lg font-bold text-gray-900 mb-4">Esquemas Predefinidos</h3>
                    <p className="text-sm text-gray-600 mb-4">
                      Selecciona un esquema de colores o personaliza manualmente más abajo
                    </p>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {colorPresets.map((preset) => {
                        const presetData = defaultConfig.theme.presets[preset.name];
                        const color1 = tailwindToHex[presetData.primary.from] || '#22d3ee';
                        const color2 = tailwindToHex[presetData.secondary.from] || '#a3e635';
                        const isActive = config.theme.colors.primary.from === presetData.primary.from;
                        
                        return (
                          <button
                            key={preset.name}
                            onClick={() => applyPreset(preset.name)}
                            className={`flex flex-col items-start p-4 border-2 rounded-xl transition-all group ${
                              isActive 
                                ? 'border-green-500 bg-green-50' 
                                : 'border-gray-200 hover:border-cyan-400 hover:shadow-lg'
                            }`}
                          >
                            <div className="flex items-center justify-between w-full mb-2">
                              <div className="flex items-center gap-3">
                                <div className="flex gap-1">
                                  <div
                                    className="w-10 h-10 rounded-lg group-hover:scale-110 transition-transform shadow-md"
                                    style={{ backgroundColor: color1 }}
                                  />
                                  <div
                                    className="w-10 h-10 rounded-lg group-hover:scale-110 transition-transform shadow-md"
                                    style={{ backgroundColor: color2 }}
                                  />
                                </div>
                                <span className="font-medium text-gray-900 text-left">{preset.label}</span>
                              </div>
                              {isActive && (
                                <CheckCircleIcon className="w-6 h-6 text-green-500 flex-shrink-0" />
                              )}
                            </div>
                            {preset.description && (
                              <p className="text-xs text-gray-600 mt-1 text-left ml-[68px]">
                                {preset.description}
                              </p>
                            )}
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Vista previa de colores */}
                  <div>
                    <h3 className="text-lg font-bold text-gray-900 mb-4">Vista Previa de Colores Actuales</h3>
                    <div className="bg-gray-50 p-6 rounded-xl border-2 border-gray-200">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                        {/* Color Primario */}
                        <div>
                          <label className="block text-sm font-bold text-gray-700 mb-3">
                            🎨 Color Primario
                          </label>
                          <div className="space-y-2">
                            <div 
                              className="h-20 rounded-xl shadow-md"
                              style={{ 
                                background: `linear-gradient(to right, ${tailwindToHex[config.theme.colors.primary.from] || '#22d3ee'}, ${tailwindToHex[config.theme.colors.primary.to] || '#0891b2'})`
                              }}
                            />
                            <div className="text-xs text-gray-600 font-mono bg-white px-2 py-1 rounded">
                              {config.theme.colors.primary.from} → {config.theme.colors.primary.to}
                            </div>
                          </div>
                        </div>

                        {/* Color Secundario */}
                        <div>
                          <label className="block text-sm font-bold text-gray-700 mb-3">
                            🎨 Color Secundario
                          </label>
                          <div className="space-y-2">
                            <div 
                              className="h-20 rounded-xl shadow-md"
                              style={{ 
                                background: `linear-gradient(to right, ${tailwindToHex[config.theme.colors.secondary.from] || '#a3e635'}, ${tailwindToHex[config.theme.colors.secondary.to] || '#65a30d'})`
                              }}
                            />
                            <div className="text-xs text-gray-600 font-mono bg-white px-2 py-1 rounded">
                              {config.theme.colors.secondary.from} → {config.theme.colors.secondary.to}
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Ejemplos de uso */}
                      <div>
                        <label className="block text-sm font-bold text-gray-700 mb-3">
                          Ejemplos de Elementos
                        </label>
                        <div className="flex flex-wrap gap-3">
                          <button 
                            className="px-6 py-3 rounded-full text-white font-bold shadow-lg hover:shadow-xl transition-all"
                            style={{ 
                              background: `linear-gradient(to right, ${tailwindToHex[config.theme.colors.primary.from] || '#22d3ee'}, ${tailwindToHex[config.theme.colors.primary.to] || '#0891b2'})`
                            }}
                          >
                            Botón Primario
                          </button>
                          <button 
                            className="px-6 py-3 rounded-full text-gray-900 font-bold shadow-lg hover:shadow-xl transition-all"
                            style={{ 
                              background: `linear-gradient(to right, ${tailwindToHex[config.theme.colors.secondary.from] || '#a3e635'}, ${tailwindToHex[config.theme.colors.secondary.to] || '#65a30d'})`
                            }}
                          >
                            Botón Secundario
                          </button>
                          <span 
                            className="px-4 py-2 rounded-full text-white font-medium shadow-md"
                            style={{ backgroundColor: tailwindToHex[config.theme.colors.primary.from] || '#22d3ee' }}
                          >
                            Badge
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* TAB: Información de la Empresa */}
              {activeTab === 'business' && (
                <div className="space-y-6">
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900 mb-2">🏢 Información de la Empresa</h2>
                    <p className="text-gray-600">Configura los datos de tu negocio</p>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-bold text-gray-700 mb-2">Nombre del Negocio</label>
                      <input
                        type="text"
                        value={config.business.name}
                        onChange={(e) => updateConfig('business.name', e.target.value)}
                        className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-cyan-400 focus:ring-4 focus:ring-cyan-100 transition-all outline-none"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-bold text-gray-700 mb-2">Slogan</label>
                      <input
                        type="text"
                        value={config.business.slogan}
                        onChange={(e) => updateConfig('business.slogan', e.target.value)}
                        className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-cyan-400 focus:ring-4 focus:ring-cyan-100 transition-all outline-none"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-bold text-gray-700 mb-2">Descripción</label>
                      <textarea
                        rows="3"
                        value={config.business.description}
                        onChange={(e) => updateConfig('business.description', e.target.value)}
                        className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-cyan-400 focus:ring-4 focus:ring-cyan-100 transition-all outline-none resize-none"
                      />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-bold text-gray-700 mb-2">Email</label>
                        <input
                          type="email"
                          value={config.business.email}
                          onChange={(e) => updateConfig('business.email', e.target.value)}
                          className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-cyan-400 focus:ring-4 focus:ring-cyan-100 transition-all outline-none"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-bold text-gray-700 mb-2">Teléfono</label>
                        <input
                          type="tel"
                          value={config.business.phone}
                          onChange={(e) => updateConfig('business.phone', e.target.value)}
                          className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-cyan-400 focus:ring-4 focus:ring-cyan-100 transition-all outline-none"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-bold text-gray-700 mb-2">Dirección</label>
                      <input
                        type="text"
                        value={config.business.address}
                        onChange={(e) => updateConfig('business.address', e.target.value)}
                        className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-cyan-400 focus:ring-4 focus:ring-cyan-100 transition-all outline-none"
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* TAB: Logo y Recursos */}
              {activeTab === 'assets' && (
                <div className="space-y-6">
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900 mb-2">🖼️ Logo y Recursos</h2>
                    <p className="text-gray-600">Gestiona las imágenes y recursos visuales</p>
                  </div>

                  <div className="bg-yellow-50 border-2 border-yellow-200 rounded-xl p-4">
                    <p className="text-yellow-800 font-medium">
                      💡 <strong>Tip:</strong> Para cambiar el logo, reemplaza el archivo en la carpeta{' '}
                      <code className="bg-yellow-100 px-2 py-1 rounded">frontend/src/assets/logos/logo.png</code>
                    </p>
                  </div>

                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2">Ruta del Logo</label>
                    <input
                      type="text"
                      value={config.assets.logo}
                      onChange={(e) => updateConfig('assets.logo', e.target.value)}
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-cyan-400 focus:ring-4 focus:ring-cyan-100 transition-all outline-none font-mono text-sm"
                    />
                  </div>

                  {/* Configuración de Tamaño del Logo */}
                  <div className="bg-gradient-to-r from-blue-50 to-cyan-50 rounded-xl p-6 border-2 border-blue-200 mb-6">
                    <h3 className="text-lg font-bold text-blue-900 mb-4">📏 Tamaño del Logo</h3>
                    <p className="text-sm text-blue-700 mb-4">
                      Ajusta el tamaño del logo en la barra de navegación
                    </p>

                    <div>
                      <label className="block text-sm font-bold text-gray-700 mb-2">
                        Altura del Logo: {config.assets?.logoSize || 56}px
                      </label>
                      <input
                        type="range"
                        min="32"
                        max="96"
                        step="4"
                        value={config.assets?.logoSize || 56}
                        onChange={(e) => updateConfig('assets.logoSize', parseInt(e.target.value))}
                        className="w-full h-3 bg-blue-200 rounded-lg appearance-none cursor-pointer"
                        style={{
                          background: `linear-gradient(to right, ${tailwindToHex[config.theme.colors.primary.from] || '#22d3ee'}, ${tailwindToHex[config.theme.colors.secondary.from] || '#a3e635'})`
                        }}
                      />
                      <div className="flex justify-between text-xs text-gray-500 mt-1">
                        <span>Pequeño (32px)</span>
                        <span>Normal (56px)</span>
                        <span>Grande (96px)</span>
                      </div>
                      
                      <div className="mt-4 grid grid-cols-3 gap-2">
                        <button
                          onClick={() => updateConfig('assets.logoSize', 40)}
                          className="px-3 py-2 bg-white border-2 border-gray-200 rounded-lg hover:border-blue-400 transition-all text-sm font-medium"
                        >
                          Pequeño (40px)
                        </button>
                        <button
                          onClick={() => updateConfig('assets.logoSize', 56)}
                          className="px-3 py-2 bg-white border-2 border-gray-200 rounded-lg hover:border-blue-400 transition-all text-sm font-medium"
                        >
                          Normal (56px)
                        </button>
                        <button
                          onClick={() => updateConfig('assets.logoSize', 72)}
                          className="px-3 py-2 bg-white border-2 border-gray-200 rounded-lg hover:border-blue-400 transition-all text-sm font-medium"
                        >
                          Grande (72px)
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Configuración de Sombra del Logo */}
                  <div className="bg-gray-50 rounded-xl p-6 border-2 border-gray-200">
                    <h3 className="text-lg font-bold text-gray-900 mb-4">✨ Sombra del Logo</h3>
                    <p className="text-sm text-gray-600 mb-4">
                      Personaliza el efecto de sombra del logo en la navegación
                    </p>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-bold text-gray-700 mb-2">
                          Intensidad del Difuminado
                        </label>
                        <select
                          value={config.assets?.logoShadow?.blur || 'sm'}
                          onChange={(e) => updateConfig('assets.logoShadow.blur', e.target.value)}
                          className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-cyan-400 focus:ring-4 focus:ring-cyan-100 transition-all outline-none"
                        >
                          <option value="none">Sin sombra</option>
                          <option value="sm">Suave (recomendado)</option>
                          <option value="md">Medio</option>
                          <option value="lg">Grande</option>
                          <option value="xl">Extra Grande</option>
                        </select>
                      </div>

                      <div>
                        <label className="block text-sm font-bold text-gray-700 mb-2">
                          Opacidad ({config.assets?.logoShadow?.opacity || 30}%)
                        </label>
                        <input
                          type="range"
                          min="0"
                          max="100"
                          step="5"
                          value={config.assets?.logoShadow?.opacity || 30}
                          onChange={(e) => updateConfig('assets.logoShadow.opacity', parseInt(e.target.value))}
                          className="w-full h-3 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                        />
                        <div className="flex justify-between text-xs text-gray-500 mt-1">
                          <span>Invisible</span>
                          <span>Sutil</span>
                          <span>Visible</span>
                        </div>
                      </div>
                    </div>

                    {/* Preview de logo completo */}
                    <div className="mt-6 bg-white p-6 rounded-xl border-2 border-gray-300">
                      <label className="block text-sm font-bold text-gray-700 mb-3">
                        👁️ Vista Previa del Logo (Tamaño y Sombra)
                      </label>
                      <p className="text-xs text-gray-500 mb-4">
                        Así se verá tu logo en la barra de navegación
                      </p>
                      <div className="flex justify-center items-center min-h-[120px] bg-gray-50 rounded-lg p-4">
                        <div className="relative">
                          {config.assets?.logoShadow?.blur !== 'none' && (
                            <div 
                              className={`absolute inset-0 rounded-xl blur-${config.assets?.logoShadow?.blur || 'sm'}`}
                              style={{ 
                                background: `linear-gradient(to right, ${tailwindToHex[config.theme.colors.primary.from] || '#22d3ee'}, ${tailwindToHex[config.theme.colors.secondary.from] || '#a3e635'})`,
                                opacity: (config.assets?.logoShadow?.opacity || 30) / 100,
                              }}
                            ></div>
                          )}
                          <div 
                            className="relative z-10 bg-white px-6 py-4 rounded-xl font-bold bg-gradient-to-r from-cyan-400 to-lime-400 bg-clip-text text-transparent flex items-center justify-center"
                            style={{ 
                              fontSize: `${(config.assets?.logoSize || 56) * 0.7}px`,
                              height: `${config.assets?.logoSize || 56}px`
                            }}
                          >
                            LOGO
                          </div>
                        </div>
                      </div>
                      <div className="mt-3 text-center">
                        <span className="inline-block bg-blue-100 text-blue-800 text-xs font-semibold px-3 py-1 rounded-full">
                          Altura: {config.assets?.logoSize || 56}px
                        </span>
                        {config.assets?.logoShadow?.blur !== 'none' && (
                          <span className="inline-block bg-purple-100 text-purple-800 text-xs font-semibold px-3 py-1 rounded-full ml-2">
                            Sombra: {config.assets?.logoShadow?.blur} / {config.assets?.logoShadow?.opacity}%
                          </span>
                        )}
                      </div>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2">Imagen por Defecto de Productos</label>
                    <input
                      type="text"
                      value={config.assets.defaultProductImage}
                      onChange={(e) => updateConfig('assets.defaultProductImage', e.target.value)}
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-cyan-400 focus:ring-4 focus:ring-cyan-100 transition-all outline-none font-mono text-sm"
                    />
                  </div>
                </div>
              )}

              {/* TAB: Configuración */}
              {activeTab === 'settings' && (
                <div className="space-y-6">
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900 mb-2">⚙️ Configuración General</h2>
                    <p className="text-gray-600">Ajustes del comportamiento del sitio</p>
                  </div>

                  <div className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-bold text-gray-700 mb-2">Moneda</label>
                        <input
                          type="text"
                          value={config.settings.currency}
                          onChange={(e) => updateConfig('settings.currency', e.target.value)}
                          className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-cyan-400 focus:ring-4 focus:ring-cyan-100 transition-all outline-none"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-bold text-gray-700 mb-2">Idioma</label>
                        <input
                          type="text"
                          value={config.settings.language}
                          onChange={(e) => updateConfig('settings.language', e.target.value)}
                          className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-cyan-400 focus:ring-4 focus:ring-cyan-100 transition-all outline-none"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-bold text-gray-700 mb-2">Monto Mínimo para Envío Gratis ($)</label>
                      <input
                        type="number"
                        value={config.cart.shippingThreshold}
                        onChange={(e) => updateConfig('cart.shippingThreshold', parseFloat(e.target.value))}
                        className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-cyan-400 focus:ring-4 focus:ring-cyan-100 transition-all outline-none"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-bold text-gray-700 mb-2">Costo de Envío ($)</label>
                      <input
                        type="number"
                        value={config.cart.shippingCost}
                        onChange={(e) => updateConfig('cart.shippingCost', parseFloat(e.target.value))}
                        className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-cyan-400 focus:ring-4 focus:ring-cyan-100 transition-all outline-none"
                      />
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
