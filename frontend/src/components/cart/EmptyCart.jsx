import { Link } from 'react-router-dom';

export default function EmptyCart() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <div className="inline-flex items-center justify-center w-24 h-24 bg-gradient-to-br from-cyan-100 to-teal-100 rounded-full mb-6">
            <svg
              className="w-12 h-12 text-cyan-600"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
              />
            </svg>
          </div>
          <h2 className="text-3xl font-bold text-gray-900 mb-3">
            Tu carrito está vacío
          </h2>
          <p className="text-gray-600 mb-8 text-lg">
            Agrega algunos productos para comenzar a comprar
          </p>
          <Link 
            to="/products" 
            className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-cyan-400 to-cyan-600 text-gray-900 font-bold rounded-full shadow-lg hover:from-cyan-300 hover:to-cyan-500 transition-all duration-300 hover:scale-105"
          >
            Explorar Productos
          </Link>
        </div>
      </div>
    </div>
  );
}
