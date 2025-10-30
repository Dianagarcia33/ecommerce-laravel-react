import { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import api from '../services/api';
import {
  ShoppingCartIcon,
  TruckIcon,
  ShieldCheckIcon,
  ArrowPathIcon,
  StarIcon,
  HeartIcon,
  ShareIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  CheckCircleIcon,
  SparklesIcon
} from '@heroicons/react/24/outline';
import { HeartIcon as HeartSolidIcon } from '@heroicons/react/24/solid';

export default function ProductLanding() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState(0);
  const [showNotification, setShowNotification] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);
  const [activeTab, setActiveTab] = useState('description');

  useEffect(() => {
    fetchProduct();
    window.scrollTo(0, 0);
  }, [id]);

  const fetchProduct = async () => {
    try {
      const response = await api.get(`/products/${id}`);
      setProduct(response.data);
    } catch (error) {
      console.error('Error fetching product:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleAddToCart = () => {
    if (product) {
      addToCart(product, quantity);
      setShowNotification(true);
      setTimeout(() => setShowNotification(false), 3000);
    }
  };

  const handleBuyNow = () => {
    if (product) {
      addToCart(product, quantity);
      navigate('/checkout');
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 via-gray-50 to-slate-100">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-cyan-500 mb-4"></div>
          <p className="text-gray-600 font-medium">Cargando producto...</p>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 via-gray-50 to-slate-100">
        <div className="text-center">
          <div className="w-24 h-24 bg-gradient-to-br from-red-100 to-red-200 rounded-full flex items-center justify-center mx-auto mb-6">
            <svg className="w-12 h-12 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </div>
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Producto no encontrado</h2>
          <p className="text-gray-600 mb-8">El producto que buscas no está disponible</p>
          <button
            onClick={() => navigate('/products')}
            className="px-8 py-4 bg-gradient-to-r from-cyan-500 to-cyan-600 text-white font-bold rounded-xl hover:shadow-lg transition-all"
          >
            Ver Todos los Productos
          </button>
        </div>
      </div>
    );
  }

  const features = [
    { 
      icon: SparklesIcon, 
      title: 'Premium Quality', 
      description: 'Materiales de primera selección'
    },
    { 
      icon: TruckIcon, 
      title: 'Envío Express', 
      description: 'Entrega en 24-48 horas'
    },
    { 
      icon: ShieldCheckIcon, 
      title: 'Compra Segura', 
      description: 'Pago 100% protegido'
    },
    { 
      icon: ArrowPathIcon, 
      title: 'Devolución Gratis', 
      description: '30 días de garantía'
    },
  ];

  const specs = [
    { label: 'Categoría', value: product.category?.name || 'General' },
    { label: 'Disponibilidad', value: product.stock > 0 ? `${product.stock} unidades` : 'Agotado' },
    { label: 'SKU', value: `PRD-${product.id.toString().padStart(6, '0')}` },
    { label: 'Estado', value: product.stock > 0 ? 'En Stock' : 'Sin Stock' },
  ];

  // Usar imágenes de la base de datos o fallback a la imagen principal
  const images = product.images && product.images.length > 0 
    ? product.images.map(img => img.image_url)
    : [product.image || 'https://via.placeholder.com/800x800?text=Producto'];

  return (
    <div className="min-h-screen bg-white relative overflow-hidden">
      {/* Floating Background Elements - Subtle tech atmosphere */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-gradient-to-br from-cyan-400/8 to-transparent rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-gradient-to-tr from-lime-400/8 to-transparent rounded-full blur-3xl"></div>
        <div className="absolute top-1/3 right-1/4 w-[400px] h-[400px] bg-orange-400/5 rounded-full blur-3xl"></div>
      </div>

      {/* Notification Toast */}
      {showNotification && (
        <div className="fixed top-24 right-4 z-50 animate-slide-in-right">
          <div className="bg-white/95 backdrop-blur-xl rounded-2xl shadow-2xl p-4 flex items-center gap-3 border border-lime-400/20">
            <div className="w-10 h-10 bg-gradient-to-br from-lime-400 to-green-500 rounded-full flex items-center justify-center">
              <CheckCircleIcon className="w-6 h-6 text-white" />
            </div>
            <div>
              <p className="font-bold text-gray-900">¡Agregado al carrito!</p>
              <p className="text-sm text-gray-500">{quantity} x {product.name}</p>
            </div>
          </div>
        </div>
      )}

      {/* Hero Section - Tech Product Landing Style */}
      <section className="relative">
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Breadcrumb - Minimal */}
          <nav className="flex items-center gap-2 text-sm text-gray-400 mb-16">
            <Link to="/" className="hover:text-cyan-500 transition-colors">Inicio</Link>
            <span className="text-gray-300">/</span>
            <Link to="/products" className="hover:text-cyan-500 transition-colors">Productos</Link>
            <span className="text-gray-300">/</span>
            <span className="text-gray-700 font-medium truncate">{product.name}</span>
          </nav>

          <div className="grid lg:grid-cols-2 gap-20 items-center">
            {/* Left: Product Images - Floating Style */}
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
                </div>
              </div>

              {/* Thumbnail Gallery */}
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
            </div>

            {/* Right: Product Info - Large Typography & Clean Hierarchy */}
            <div className="space-y-10">
              {/* Product Name - HUGE Typography */}
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

              {/* Price Section - Clean & Bold */}
              <div className="space-y-3">
                <div className="flex items-baseline gap-4">
                  <span className="text-7xl font-extrabold bg-gradient-to-r from-cyan-500 via-cyan-600 to-teal-600 bg-clip-text text-transparent">
                    ${parseFloat(product.price).toFixed(2)}
                  </span>
                  <span className="text-3xl text-gray-300 line-through font-light">
                    ${(parseFloat(product.price) * 1.2).toFixed(2)}
                  </span>
                  <span className="px-3 py-1 bg-lime-400 text-gray-900 text-sm font-bold rounded-full">
                    -20%
                  </span>
                </div>
                <p className="text-sm text-gray-400">Precio incluye IVA</p>
              </div>

              {/* Quantity Selector - Minimal Clean */}
              <div className="flex items-center gap-8">
                <span className="text-gray-500 font-medium text-lg">Cantidad</span>
                <div className="flex items-center gap-5">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="w-12 h-12 flex items-center justify-center bg-gray-100 hover:bg-gray-200 rounded-xl transition-all text-xl font-bold text-gray-700"
                  >
                    −
                  </button>
                  <span className="w-16 text-center text-2xl font-bold text-gray-900">{quantity}</span>
                  <button
                    onClick={() => setQuantity(Math.min(product.stock, quantity + 1))}
                    disabled={quantity >= product.stock}
                    className="w-12 h-12 flex items-center justify-center bg-gray-100 hover:bg-gray-200 rounded-xl transition-all text-xl font-bold text-gray-700 disabled:opacity-40 disabled:cursor-not-allowed"
                  >
                    +
                  </button>
                </div>
                <span className="text-gray-400 text-sm ml-auto">
                  {product.stock} en stock
                </span>
              </div>

              {/* CTA Buttons - Conversion-first Design */}
              <div className="space-y-4 pt-6">
                {/* Primary CTA - HUGE and Bold */}
                <button
                  onClick={handleBuyNow}
                  disabled={product.stock === 0}
                  className="w-full px-10 py-6 bg-gradient-to-r from-lime-400 via-lime-500 to-green-500 text-gray-900 font-extrabold text-2xl rounded-2xl hover:shadow-[0_20px_60px_rgba(132,204,22,0.4)] hover:scale-[1.02] transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-3"
                >
                  {product.stock === 0 ? 'Agotado' : (
                    <>
                      <ShoppingCartIcon className="w-7 h-7" />
                      Comprar Ahora
                    </>
                  )}
                </button>
                
                {/* Secondary CTA - Subtle */}
                <button
                  onClick={handleAddToCart}
                  disabled={product.stock === 0}
                  className="w-full px-8 py-5 bg-white/80 backdrop-blur-sm text-gray-700 font-bold text-xl rounded-2xl border-2 border-gray-200 hover:border-cyan-400 hover:bg-white hover:shadow-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Agregar al Carrito
                </button>
              </div>

              {/* Trust Badges - Subtle & Clean */}
              <div className="grid grid-cols-2 gap-4 pt-8 border-t border-gray-100">
                {features.map((feature, index) => (
                  <div
                    key={index}
                    className="flex items-center gap-3"
                  >
                    <div className="w-10 h-10 bg-gradient-to-br from-cyan-50 to-lime-50 rounded-full flex items-center justify-center flex-shrink-0">
                      <feature.icon className="w-5 h-5 text-cyan-600" />
                    </div>
                    <div>
                      <p className="font-bold text-gray-900 text-sm">{feature.title}</p>
                      <p className="text-xs text-gray-400">{feature.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Specifications Section - Clean Sections */}
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

      {/* Description Tabs - Minimal Tech Style */}
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

      {/* Floating Mobile CTA - Clean & Modern */}
      <div className="fixed bottom-0 left-0 right-0 bg-white/95 backdrop-blur-xl border-t border-gray-200 shadow-2xl z-40 lg:hidden">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between gap-4">
          <div className="flex-shrink-0">
            <p className="text-2xl font-bold bg-gradient-to-r from-cyan-600 to-teal-600 bg-clip-text text-transparent">
              ${parseFloat(product.price).toFixed(2)}
            </p>
            <p className="text-xs text-gray-400">Stock: {product.stock}</p>
          </div>
          <button
            onClick={handleBuyNow}
            disabled={product.stock === 0}
            className="flex-1 px-8 py-4 bg-gradient-to-r from-lime-400 to-green-500 text-gray-900 font-extrabold text-lg rounded-2xl hover:shadow-[0_10px_40px_rgba(132,204,22,0.4)] transition-all disabled:opacity-50 flex items-center justify-center gap-2"
          >
            <ShoppingCartIcon className="w-5 h-5" />
            Comprar
          </button>
        </div>
      </div>

      <style>{`
        @keyframes slide-in-right {
          from {
            opacity: 0;
            transform: translateX(100%);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
        .animate-slide-in-right {
          animation: slide-in-right 0.3s ease-out;
        }
      `}</style>
    </div>
  );
}
