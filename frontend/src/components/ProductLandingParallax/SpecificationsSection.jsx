export default function SpecificationsSection({ product, images, scrollY, reviewsStats }) {
  const specs = [
    { label: 'Categoría', value: product.category?.name || 'General' },
    { label: 'Disponibilidad', value: product.stock > 0 ? `${product.stock} unidades` : 'Agotado' },
    { label: 'SKU', value: `PRD-${product.id.toString().padStart(6, '0')}` },
    { label: 'Rating', value: reviewsStats.average_rating > 0 ? `${reviewsStats.average_rating}/5.0 ⭐` : 'Sin reseñas' }
  ]

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden">
      {/* Parallax Background */}
      <div 
        className="absolute inset-0 z-0"
        style={{
          transform: `translateY(${(scrollY - 3400) * 0.3}px)`
        }}
      >
        <img
          src={images[0]}
          alt="Background"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/80"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center mb-20">
          <h2 className="text-6xl lg:text-7xl font-bold text-white mb-8">Especificaciones Técnicas</h2>
          <p className="text-2xl text-white/80 max-w-3xl mx-auto">Todo lo que necesitas saber en un solo vistazo</p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {specs.map((spec, index) => (
            <div
              key={index}
              className="p-8 bg-white/10 backdrop-blur-xl rounded-3xl border border-white/20"
              style={{
                transform: `translateY(${Math.max(0, 50 - (scrollY - 3400) * 0.1)}px)`,
                opacity: Math.min(1, (scrollY - 3200) / 300)
              }}
            >
              <p className="text-white/70 text-lg mb-3 font-medium">{spec.label}</p>
              <p className="text-3xl font-bold text-white">{spec.value}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
