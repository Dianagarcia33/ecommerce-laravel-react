export default function GallerySection({ product, images, scrollY }) {
  return (
    <section className="relative py-32 bg-gradient-to-b from-gray-50 to-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-20">
          <h2 className="text-6xl lg:text-7xl font-bold text-gray-900 mb-8">Galería de Producto</h2>
          <p className="text-2xl text-gray-600 max-w-3xl mx-auto">Mira cada detalle desde todos los ángulos</p>
        </div>

        {/* Horizontal Scroll Gallery */}
        <div className="flex gap-8 overflow-x-auto pb-8 snap-x snap-mandatory scrollbar-hide">
          {images.map((image, index) => (
            <div
              key={index}
              className="flex-shrink-0 w-[80vw] lg:w-[600px] snap-center"
              style={{
                transform: `translateX(${(scrollY - 4200) * 0.05 * (index + 1)}px)`
              }}
            >
              <div className="relative rounded-3xl overflow-hidden shadow-2xl h-[500px]">
                <img
                  src={image}
                  alt={`${product.name} - Vista ${index + 1}`}
                  className="w-full h-full object-cover hover:scale-110 transition-transform duration-700"
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
