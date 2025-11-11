import { useState } from 'react'
import { CheckCircleIcon, StarIcon } from '@heroicons/react/24/outline'

export default function TabsSection({ product }) {
  const [activeTab, setActiveTab] = useState('description')

  const specs = [
    { label: 'Categoría', value: product.category?.name || 'General' },
    { label: 'Disponibilidad', value: product.stock > 0 ? `${product.stock} unidades` : 'Agotado' },
    { label: 'SKU', value: `PRD-${product.id.toString().padStart(6, '0')}` },
    { label: 'Estado', value: product.stock > 0 ? 'En Stock' : 'Sin Stock' },
  ]

  return (
    <section className="relative py-32 bg-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Tabs - Clean & Modern */}
        <div className="flex gap-2 mb-16 justify-center">
          {['description', 'specs', 'reviews'].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-8 py-4 font-bold text-lg transition-all duration-300 rounded-2xl ${
                activeTab === tab
                  ? 'bg-gradient-to-r from-cyan-500 to-teal-500 text-white shadow-xl scale-105'
                  : 'bg-gray-100 text-gray-500 hover:bg-gray-200 hover:text-gray-700'
              }`}
            >
              {tab === 'description' && 'Descripción'}
              {tab === 'specs' && 'Especificaciones'}
              {tab === 'reviews' && 'Reseñas'}
            </button>
          ))}
        </div>

        {/* Tab Content - Large Typography & Airy */}
        <div className="max-w-4xl mx-auto">
          {activeTab === 'description' && (
            <div className="text-gray-600 leading-loose space-y-8">
              <p className="text-2xl font-light text-gray-800">{product.description}</p>
              <p className="text-lg">
                Este producto ha sido cuidadosamente seleccionado para ofrecerte la mejor calidad y durabilidad. 
                Fabricado con materiales premium y diseñado pensando en tu comodidad.
              </p>
              <ul className="space-y-5">
                <li className="flex items-start gap-4">
                  <div className="w-8 h-8 bg-gradient-to-br from-cyan-400 to-teal-500 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <CheckCircleIcon className="w-5 h-5 text-white" />
                  </div>
                  <span className="text-lg">Materiales de alta calidad certificados</span>
                </li>
                <li className="flex items-start gap-4">
                  <div className="w-8 h-8 bg-gradient-to-br from-cyan-400 to-teal-500 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <CheckCircleIcon className="w-5 h-5 text-white" />
                  </div>
                  <span className="text-lg">Garantía extendida de 2 años</span>
                </li>
                <li className="flex items-start gap-4">
                  <div className="w-8 h-8 bg-gradient-to-br from-cyan-400 to-teal-500 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <CheckCircleIcon className="w-5 h-5 text-white" />
                  </div>
                  <span className="text-lg">Envío gratuito en compras mayores a $50</span>
                </li>
              </ul>
            </div>
          )}
          {activeTab === 'specs' && (
            <div className="grid gap-4">
              {specs.map((spec, index) => (
                <div key={index} className="flex justify-between p-4 bg-white rounded-xl border border-gray-200">
                  <span className="font-semibold text-gray-700">{spec.label}:</span>
                  <span className="text-gray-900">{spec.value}</span>
                </div>
              ))}
            </div>
          )}
          {activeTab === 'reviews' && (
            <div className="space-y-8">
              <div className="text-center py-20">
                <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <StarIcon className="w-10 h-10 text-gray-300" />
                </div>
                <p className="text-xl text-gray-400 mb-8">Aún no hay reseñas para este producto</p>
                <button className="px-10 py-4 bg-gradient-to-r from-cyan-500 to-teal-500 text-white font-bold text-lg rounded-2xl hover:shadow-2xl hover:scale-105 transition-all">
                  Sé el primero en opinar
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  )
}
