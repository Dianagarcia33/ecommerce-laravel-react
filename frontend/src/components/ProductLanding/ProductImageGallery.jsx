import { useState } from 'react'
import {
  ChevronLeftIcon,
  ChevronRightIcon,
  HeartIcon,
  ShareIcon
} from '@heroicons/react/24/outline'
import { HeartIcon as HeartSolidIcon } from '@heroicons/react/24/solid'

export default function ProductImageGallery({ product, images }) {
  const [selectedImage, setSelectedImage] = useState(0)
  const [isFavorite, setIsFavorite] = useState(false)

  return (
    <div className="space-y-8">
      {/* Main Image - Clean Floating Product */}
      <div className="relative group">
        {/* Subtle shadow for floating effect */}
        <div className="absolute inset-0 bg-gradient-to-br from-cyan-100/30 to-lime-100/30 rounded-3xl blur-2xl transform scale-95 opacity-60 group-hover:opacity-100 transition-opacity duration-500"></div>
        
        <div className="relative bg-gradient-to-br from-gray-50/50 to-white/50 backdrop-blur-sm rounded-3xl p-16 border border-gray-100/50 shadow-2xl">
          <img
            src={images[selectedImage] || 'https://via.placeholder.com/600x600?text=Producto'}
            alt={product.name}
            className="w-full h-auto object-contain drop-shadow-2xl transform group-hover:scale-105 transition-transform duration-700"
          />
          
          {/* Minimal Badges - Top Right */}
          <div className="absolute top-6 right-6 flex flex-col gap-2">
            {product.stock < 10 && product.stock > 0 && (
              <div className="px-4 py-2 bg-gradient-to-r from-orange-500 to-orange-600 text-white text-xs font-bold rounded-full shadow-lg backdrop-blur-sm">
                Solo {product.stock} disponibles
              </div>
            )}
            <div className="px-4 py-2 bg-gradient-to-r from-lime-400 to-lime-500 text-gray-900 text-xs font-bold rounded-full shadow-lg">
              20% OFF
            </div>
          </div>

          {/* Action Icons - Minimal */}
          <div className="absolute top-6 left-6 flex gap-2">
            <button
              onClick={() => setIsFavorite(!isFavorite)}
              className="w-10 h-10 bg-white/80 backdrop-blur-sm rounded-full shadow-lg flex items-center justify-center hover:scale-110 hover:bg-white transition-all"
            >
              {isFavorite ? (
                <HeartSolidIcon className="w-5 h-5 text-red-500" />
              ) : (
                <HeartIcon className="w-5 h-5 text-gray-500" />
              )}
            </button>
            <button className="w-10 h-10 bg-white/80 backdrop-blur-sm rounded-full shadow-lg flex items-center justify-center hover:scale-110 hover:bg-white transition-all">
              <ShareIcon className="w-5 h-5 text-gray-500" />
            </button>
          </div>

          {/* Navigation Arrows */}
          {images.length > 1 && (
            <>
              <button
                onClick={() => setSelectedImage((prev) => (prev > 0 ? prev - 1 : images.length - 1))}
                className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/90 rounded-full shadow-lg flex items-center justify-center hover:bg-white transition-all"
              >
                <ChevronLeftIcon className="w-6 h-6 text-gray-800" />
              </button>
              <button
                onClick={() => setSelectedImage((prev) => (prev < images.length - 1 ? prev + 1 : 0))}
                className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/90 rounded-full shadow-lg flex items-center justify-center hover:bg-white transition-all"
              >
                <ChevronRightIcon className="w-6 h-6 text-gray-800" />
              </button>
            </>
          )}
        </div>
      </div>

      {/* Thumbnail Gallery */}
      {images.length > 1 && (
        <div className="flex gap-4 justify-center">
          {images.map((img, index) => (
            <button
              key={index}
              onClick={() => setSelectedImage(index)}
              className={`relative w-24 h-24 rounded-xl overflow-hidden border-2 transition-all ${
                selectedImage === index
                  ? 'border-cyan-500 shadow-xl scale-110'
                  : 'border-gray-200 hover:border-cyan-300 opacity-60 hover:opacity-100'
              }`}
            >
              <img
                src={img || 'https://via.placeholder.com/100'}
                alt={`Vista ${index + 1}`}
                className="w-full h-full object-cover"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  )
}
