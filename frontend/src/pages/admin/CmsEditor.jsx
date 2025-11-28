import { useState, useEffect } from 'react'
import { Tab } from '@headlessui/react'
import {
    GlobeAltIcon,
    HomeIcon,
    DocumentDuplicateIcon,
    SwatchIcon,
    PhotoIcon,
    MegaphoneIcon,
    ShoppingBagIcon,
    ShoppingCartIcon,
    CreditCardIcon,
    UserIcon
} from '@heroicons/react/24/outline'
import { useSiteConfig } from '../../hooks/useSiteConfig'
import SiteSettings from './SiteSettings'
import HomeEditor from './HomeEditor'

// Componente para el editor de la barra de anuncios
const AnnouncementEditor = ({ config, onChange }) => {
    return (
        <div className="space-y-6">
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                    <MegaphoneIcon className="w-5 h-5 text-green-500" />
                    Configuración de la Barra de Anuncios
                </h3>
                <p className="text-sm text-gray-600 mb-6">
                    La barra de anuncios aparece en la parte superior del sitio, encima del navbar.
                </p>
                <div className="grid gap-6">
                    <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                        <div>
                            <label className="block text-sm font-medium text-gray-900 mb-1">
                                Activar Barra de Anuncios
                            </label>
                            <p className="text-xs text-gray-500">
                                Mostrar u ocultar la barra de anuncios en todo el sitio
                            </p>
                        </div>
                        <label className="relative inline-flex items-center cursor-pointer">
                            <input
                                type="checkbox"
                                checked={config.announcement?.enabled || false}
                                onChange={(e) => onChange('announcement.enabled', e.target.checked)}
                                className="sr-only peer"
                            />
                            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                        </label>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Mensaje Principal
                        </label>
                        <input
                            type="text"
                            value={config.announcement?.message1 || ''}
                            onChange={(e) => onChange('announcement.message1', e.target.value)}
                            placeholder="Ej: Envíos a toda Colombia"
                            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                        />
                        <p className="text-xs text-gray-500 mt-1">
                            Aparece primero en la barra de anuncios
                        </p>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Mensaje Secundario (Opcional)
                        </label>
                        <input
                            type="text"
                            value={config.announcement?.message2 || ''}
                            onChange={(e) => onChange('announcement.message2', e.target.value)}
                            placeholder="Ej: Envío gratis en compras superiores a $50"
                            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                        />
                        <p className="text-xs text-gray-500 mt-1">
                            Mensaje adicional separado por un punto (•)
                        </p>
                    </div>

                    <div className="flex items-center gap-4">
                        <label className="flex items-center cursor-pointer">
                            <input
                                type="checkbox"
                                checked={config.announcement?.showIcon || false}
                                onChange={(e) => onChange('announcement.showIcon', e.target.checked)}
                                className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500"
                            />
                            <span className="ml-2 text-sm text-gray-700">Mostrar icono de camión</span>
                        </label>

                        <label className="flex items-center cursor-pointer">
                            <input
                                type="checkbox"
                                checked={config.announcement?.closeable || false}
                                onChange={(e) => onChange('announcement.closeable', e.target.checked)}
                                className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500"
                            />
                            <span className="ml-2 text-sm text-gray-700">Permitir cerrar</span>
                        </label>
                    </div>

                    <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                        <h4 className="text-sm font-bold text-blue-900 mb-2">Vista Previa:</h4>
                        <div
                            className="relative w-full text-white py-2.5 px-4 text-center text-sm font-medium rounded-lg"
                            style={{
                                background: `linear-gradient(90deg, ${config.theme?.colors?.primary?.hex || '#22d3ee'}, ${config.theme?.colors?.secondary?.hex || '#a3e635'})`
                            }}
                        >
                            <div className="flex items-center justify-center gap-4">
                                {config.announcement?.showIcon && (
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16V6a1 1 0 00-1-1H4a1 1 0 00-1 1v10a1 1 0 001 1h1m8-1a1 1 0 01-1 1H9m4-1V8a1 1 0 011-1h2.586a1 1 0 01.707.293l3.414 3.414a1 1 0 01.293.707V16a1 1 0 01-1 1h-1m-6-1a1 1 0 001 1h1M5 17a2 2 0 104 0m-4 0a2 2 0 114 0m6 0a2 2 0 104 0m-4 0a2 2 0 114 0" />
                                    </svg>
                                )}
                                <span>{config.announcement?.message1 || 'Tu mensaje aquí'}</span>
                                {config.announcement?.message2 && (
                                    <>
                                        <span className="text-white/60">•</span>
                                        <span>{config.announcement.message2}</span>
                                    </>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

// Componente para el editor de páginas
const PagesEditor = ({ config, onChange }) => {
    return (
        <div className="space-y-6">
            {/* Secciones del Home */}
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                    <HomeIcon className="w-5 h-5 text-purple-500" />
                    Secciones de la Página Principal
                </h3>
                <div className="grid gap-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Título - Productos en Tendencia</label>
                        <input
                            type="text"
                            value={config.home.sections.trending.title}
                            onChange={(e) => onChange('home.sections.trending.title', e.target.value)}
                            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Subtítulo - Productos en Tendencia</label>
                        <input
                            type="text"
                            value={config.home.sections.trending.subtitle}
                            onChange={(e) => onChange('home.sections.trending.subtitle', e.target.value)}
                            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Título - Nuevos Productos</label>
                        <input
                            type="text"
                            value={config.home.sections.newProducts.title}
                            onChange={(e) => onChange('home.sections.newProducts.title', e.target.value)}
                            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Título - Categorías</label>
                        <input
                            type="text"
                            value={config.home.sections.categories.title}
                            onChange={(e) => onChange('home.sections.categories.title', e.target.value)}
                            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                        />
                    </div>
                </div>
            </div>

            {/* Página de Productos */}
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                    <ShoppingBagIcon className="w-5 h-5 text-blue-500" />
                    Página de Productos
                </h3>
                <div className="grid gap-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Título del Banner</label>
                        <input
                            type="text"
                            value={config.products.hero.title}
                            onChange={(e) => onChange('products.hero.title', e.target.value)}
                            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Subtítulo</label>
                        <input
                            type="text"
                            value={config.products.hero.subtitle}
                            onChange={(e) => onChange('products.hero.subtitle', e.target.value)}
                            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Badge (Etiqueta)</label>
                        <input
                            type="text"
                            value={config.products.hero.badge}
                            onChange={(e) => onChange('products.hero.badge', e.target.value)}
                            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Placeholder del Buscador</label>
                        <input
                            type="text"
                            value={config.products.searchPlaceholder}
                            onChange={(e) => onChange('products.searchPlaceholder', e.target.value)}
                            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                        />
                    </div>
                </div>
            </div>

            {/* Carrito de Compras */}
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                    <ShoppingCartIcon className="w-5 h-5 text-green-500" />
                    Carrito de Compras
                </h3>
                <div className="grid gap-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Título Principal</label>
                        <input
                            type="text"
                            value={config.cart.title}
                            onChange={(e) => onChange('cart.title', e.target.value)}
                            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Subtítulo</label>
                        <input
                            type="text"
                            value={config.cart.subtitle}
                            onChange={(e) => onChange('cart.subtitle', e.target.value)}
                            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Mensaje Carrito Vacío</label>
                        <input
                            type="text"
                            value={config.cart.emptyTitle}
                            onChange={(e) => onChange('cart.emptyTitle', e.target.value)}
                            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Botón "Proceder al Pago"</label>
                        <input
                            type="text"
                            value={config.cart.checkoutButton}
                            onChange={(e) => onChange('cart.checkoutButton', e.target.value)}
                            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Botón "Continuar Comprando"</label>
                        <input
                            type="text"
                            value={config.cart.continueButton}
                            onChange={(e) => onChange('cart.continueButton', e.target.value)}
                            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                        />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default function CmsEditor() {
    const siteConfig = useSiteConfig()  // El hook retorna directamente el config
    const [config, setConfig] = useState(null)
    const [hasChanges, setHasChanges] = useState(false)
    const [saving, setSaving] = useState(false)

    useEffect(() => {
        if (siteConfig) {
            setConfig(JSON.parse(JSON.stringify(siteConfig)))
        }
    }, [siteConfig])

    const handleConfigChange = (path, value) => {
        setConfig(prev => {
            const newConfig = { ...prev }
            const keys = path.split('.')
            let current = newConfig
            for (let i = 0; i < keys.length - 1; i++) {
                current = current[keys[i]]
            }
            current[keys[keys.length - 1]] = value
            return newConfig
        })
        setHasChanges(true)
    }

    const handleSave = () => {
        setSaving(true)
        try {
            localStorage.setItem('siteConfig', JSON.stringify(config))
            window.dispatchEvent(new Event('siteConfigUpdated'))
            setTimeout(() => {
                setSaving(false)
                setHasChanges(false)
                window.location.reload()
            }, 1000)
        } catch (error) {
            console.error('Error saving config:', error)
            setSaving(false)
        }
    }

    if (!config) return <div>Cargando editor...</div>

    const tabs = [
        { name: 'Global', icon: GlobeAltIcon, component: <SiteSettings embedded={true} /> },
        { name: 'Anuncios', icon: MegaphoneIcon, component: <AnnouncementEditor config={config} onChange={handleConfigChange} /> },
        { name: 'Home', icon: HomeIcon, component: <HomeEditor embedded={true} /> },
        { name: 'Páginas', icon: DocumentDuplicateIcon, component: <PagesEditor config={config} onChange={handleConfigChange} /> },
    ]

    return (
        <div className="min-h-screen bg-gray-50 pb-20">
            {/* Header Flotante */}
            <div className="sticky top-0 z-40 bg-white/80 backdrop-blur-md border-b border-gray-200 shadow-sm">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
                    <h1 className="text-xl font-bold text-gray-900 flex items-center gap-2">
                        <SwatchIcon className="w-6 h-6 text-blue-600" />
                        Gestor de Diseño
                    </h1>

                    <div className="flex items-center gap-4">
                        {hasChanges && (
                            <span className="text-sm text-amber-600 font-medium animate-pulse">
                                ● Cambios sin guardar
                            </span>
                        )}
                        <button
                            onClick={handleSave}
                            disabled={!hasChanges || saving}
                            className={`px-6 py-2 rounded-full font-bold text-white transition-all transform hover:scale-105 ${hasChanges
                                ? 'bg-blue-600 hover:bg-blue-700 shadow-lg hover:shadow-blue-500/30'
                                : 'bg-gray-300 cursor-not-allowed'
                                }`}
                        >
                            {saving ? 'Guardando...' : 'Guardar Cambios'}
                        </button>
                    </div>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <Tab.Group>
                    <Tab.List className="flex space-x-1 rounded-xl bg-blue-900/20 p-1 mb-8">
                        {tabs.map((tab) => (
                            <Tab
                                key={tab.name}
                                className={({ selected }) =>
                                    `w-full rounded-lg py-2.5 text-sm font-medium leading-5 transition-all
                  ${selected
                                        ? 'bg-white text-blue-700 shadow ring-1 ring-black/5'
                                        : 'text-blue-600 hover:bg-white/[0.12] hover:text-blue-800'
                                    } flex items-center justify-center gap-2`
                                }
                            >
                                <tab.icon className="w-5 h-5" />
                                {tab.name}
                            </Tab>
                        ))}
                    </Tab.List>
                    <Tab.Panels>
                        {tabs.map((tab, idx) => (
                            <Tab.Panel
                                key={idx}
                                className="rounded-xl bg-white p-3 ring-white ring-opacity-60 ring-offset-2 ring-offset-blue-400 focus:outline-none focus:ring-2"
                            >
                                {tab.component}
                            </Tab.Panel>
                        ))}
                    </Tab.Panels>
                </Tab.Group>
            </div>
        </div>
    )
}
