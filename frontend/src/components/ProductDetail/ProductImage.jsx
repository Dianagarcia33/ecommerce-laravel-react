import { useState } from 'react'
import { PhotoIcon } from '@heroicons/react/24/outline'

export default function ProductImage({ product }) {
  const [imageLoaded, setImageLoaded] = useState(false)
  const [imageError, setImageError] = useState(false)

  return (
    <div className="relative group">
      <div className="relative overflow-hidden rounded-2xl shadow-2xl bg-white">
        {!imageLoaded && !imageError && (
          <div className="absolute inset-0 flex items-center justify-center bg-gray-100">
            <div className="animate-pulse flex flex-col items-center">
              <PhotoIcon className="w-16 h-16 text-gray-400" />
              <p className="text-sm text-gray-500 mt-2">Cargando imagen...</p>
            </div>
          </div>
        )}
        
        <img
          src={imageError ? 'https://via.placeholder.com/600' : (product.image || 'https://via.placeholder.com/600')}
          alt={product.name}
          className={`w-full h-auto object-cover transition-all duration-500 ${
            imageLoaded ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
          }`}
          onLoad={() => setImageLoaded(true)}
          onError={() => {
            setImageError(true)
            setImageLoaded(true)
          }}
        />
        
        {/* Overlay gradient on hover */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      </div>

      {/* Badge for stock status */}
      {product.stock === 0 && (
        <div className="absolute top-4 right-4 bg-red-500 text-white px-4 py-2 rounded-full font-semibold text-sm shadow-lg">
          Sin Stock
        </div>
      )}
      
      {product.stock > 0 && product.stock <= 10 && (
        <div className="absolute top-4 right-4 bg-orange-500 text-white px-4 py-2 rounded-full font-semibold text-sm shadow-lg">
          ¡Últimas {product.stock} unidades!
        </div>
      )}
    </div>
  )
}
