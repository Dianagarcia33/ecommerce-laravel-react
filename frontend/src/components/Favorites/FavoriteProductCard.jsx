import { Link } from 'react-router-dom';
import { ShoppingCartIcon } from '@heroicons/react/24/outline';
import { HeartIcon as HeartIconSolid } from '@heroicons/react/24/solid';

export default function FavoriteProductCard({ product, colors, onRemoveFavorite, onAddToCart }) {
  return (
    <div
      className="group bg-white rounded-2xl shadow-md hover:shadow-2xl transition-all duration-300 overflow-hidden transform hover:-translate-y-2"
    >
      {/* Imagen del producto */}
      <div className="relative overflow-hidden bg-gray-100">
        <Link to={`/product/${product.id}/parallax`}>
          <img
            src={product.images?.[0]?.image_url || 'https://via.placeholder.com/400'}
            alt={product.name}
            className="w-full h-56 object-cover transform group-hover:scale-110 transition-transform duration-500"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
        </Link>

        {/* Botón eliminar favorito */}
        <button
          onClick={() => onRemoveFavorite(product.id)}
          className="absolute top-3 right-3 w-10 h-10 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center shadow-lg hover:bg-red-500 hover:text-white transition-all z-10 group/btn"
          title="Eliminar de favoritos"
        >
          <HeartIconSolid className="w-6 h-6 text-red-500 group-hover/btn:text-white" />
        </button>

        {/* Badge de stock */}
        {product.stock < 10 && product.stock > 0 && (
          <div className="absolute top-3 left-3 bg-yellow-400 text-gray-900 text-xs font-bold px-3 py-1 rounded-full shadow-lg">
            ¡Últimas {product.stock}!
          </div>
        )}
        {product.stock === 0 && (
          <div className="absolute top-3 left-3 bg-red-500 text-white text-xs font-bold px-3 py-1 rounded-full shadow-lg">
            Agotado
          </div>
        )}
      </div>

      {/* Contenido */}
      <div className="p-5">
        <Link to={`/product/${product.id}/parallax`}>
          <h3 className="text-lg font-bold text-gray-900 mb-2 hover:text-opacity-80 transition-colors line-clamp-2 min-h-[56px]">
            {product.name}
          </h3>
        </Link>

        <p className="text-gray-600 text-sm mb-4 line-clamp-2 min-h-[40px]">
          {product.description}
        </p>

        {/* Precio y botón */}
        <div className="flex items-center justify-between pt-4 border-t border-gray-100">
          <div>
            <span 
              className="text-2xl font-extrabold"
              style={{ color: colors.primary.hex }}
            >
              ${parseFloat(product.price).toFixed(2)}
            </span>
          </div>
          <button
            onClick={() => onAddToCart(product)}
            disabled={product.stock === 0}
            className={`flex items-center gap-2 px-4 py-2 rounded-full font-bold transition-all duration-300 transform hover:scale-105 shadow-md ${
              product.stock === 0
                ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                : 'text-white hover:shadow-lg'
            }`}
            style={product.stock > 0 ? { 
              background: colors.secondary.hex
            } : {}}
          >
            <ShoppingCartIcon className="w-5 h-5" />
            <span className="hidden sm:inline">Agregar</span>
          </button>
        </div>
      </div>
    </div>
  );
}
