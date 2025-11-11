import { StarIcon } from '@heroicons/react/24/outline'

export default function ProductInfo({ product }) {
  return (
    <div className="space-y-6">
      <h1 className="text-6xl lg:text-7xl font-bold text-gray-900 leading-[1.1] tracking-tight">
        {product.name}
      </h1>
      
      {/* Rating - Subtle */}
      <div className="flex items-center gap-6">
        <div className="flex items-center gap-1">
          {[...Array(5)].map((_, i) => (
            <StarIcon key={i} className="w-6 h-6 fill-cyan-400 text-cyan-400" />
          ))}
        </div>
        <span className="text-gray-400 font-medium">4.8 · 124 reseñas</span>
      </div>

      {/* Description - Large & Airy */}
      <p className="text-xl text-gray-500 leading-relaxed max-w-xl">
        {product.description}
      </p>
    </div>
  )
}
