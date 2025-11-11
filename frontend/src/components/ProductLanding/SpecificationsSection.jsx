export default function SpecificationsSection({ product }) {
  const specs = [
    { label: 'Categoría', value: product.category?.name || 'General' },
    { label: 'Disponibilidad', value: product.stock > 0 ? `${product.stock} unidades` : 'Agotado' },
    { label: 'SKU', value: `PRD-${product.id.toString().padStart(6, '0')}` },
    { label: 'Estado', value: product.stock > 0 ? 'En Stock' : 'Sin Stock' },
  ]

  return (
    <section className="relative py-32 bg-gradient-to-b from-white to-gray-50/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Title - Large & Bold */}
        <div className="text-center mb-20">
          <h2 className="text-5xl lg:text-6xl font-bold text-gray-900 mb-6">Especificaciones</h2>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">Todo lo que necesitas saber sobre este producto</p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {specs.map((spec, index) => (
            <div
              key={index}
              className="p-8 bg-white/60 backdrop-blur-sm rounded-3xl border border-gray-100 hover:shadow-2xl hover:scale-105 transition-all duration-300"
            >
              <p className="text-sm font-semibold text-gray-600 mb-2">{spec.label}</p>
              <p className="text-2xl font-bold text-gray-900">{spec.value}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
