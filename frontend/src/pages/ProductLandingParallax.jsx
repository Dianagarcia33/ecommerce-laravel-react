import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { useCart } from '../context/CartContext'
import { useRecentlyViewed } from '../hooks/useRecentlyViewed'
import { useAuth } from '../context/AuthContext'
import { 
  ShoppingCartIcon,
  StarIcon,
  CheckCircleIcon,
  TruckIcon,
  ShieldCheckIcon,
  SparklesIcon,
  ArrowRightIcon,
  ChevronDownIcon,
  ArrowUpIcon
} from '@heroicons/react/24/outline'
import { StarIcon as StarSolidIcon } from '@heroicons/react/24/solid'
import api from '../services/api'
import ReviewsCarousel from '../components/reviews/ReviewsCarousel'
import ReviewForm from '../components/reviews/ReviewForm'

export default function ProductLandingParallax() {
  const { id } = useParams()
  const navigate = useNavigate()
  const { addToCart } = useCart()
  const { addRecentlyViewed } = useRecentlyViewed()
  const { user } = useAuth()
  const [product, setProduct] = useState(null)
  const [loading, setLoading] = useState(true)
  const [quantity, setQuantity] = useState(1)
  const [scrollY, setScrollY] = useState(0)
  const [showNotification, setShowNotification] = useState(false)
  const [showScrollTop, setShowScrollTop] = useState(false)
  const [reviews, setReviews] = useState([])
  const [reviewsStats, setReviewsStats] = useState({
    average_rating: 0,
    total_reviews: 0
  })
  const [loadingReviews, setLoadingReviews] = useState(true)

  useEffect(() => {
    fetchProduct()
    fetchReviews()
    
    // Parallax scroll effect
    const handleScroll = () => {
      setScrollY(window.scrollY)
      // Show scroll to top button after scrolling 500px
      setShowScrollTop(window.scrollY > 500)
    }
    
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [id])

  const fetchProduct = async () => {
    try {
      const response = await api.get(`/products/${id}`)
      setProduct(response.data)
      
      // Guardar en historial de productos vistos
      addRecentlyViewed(response.data)
    } catch (error) {
      console.error('Error al cargar producto:', error)
    } finally {
      setLoading(false)
    }
  }

  const fetchReviews = async () => {
    try {
      const response = await api.get(`/products/${id}/reviews`)
      setReviews(response.data.reviews)
      setReviewsStats({
        average_rating: response.data.average_rating,
        total_reviews: response.data.total_reviews
      })
    } catch (error) {
      console.error('Error al cargar reseñas:', error)
    } finally {
      setLoadingReviews(false)
    }
  }

  const handleReviewSubmitted = (newReview) => {
    // Actualizar la lista de reseñas
    fetchReviews()
  }

  const handleAddToCart = () => {
    addToCart({ ...product, quantity })
    setShowNotification(true)
    setTimeout(() => setShowNotification(false), 3000)
  }

  const handleBuyNow = () => {
    addToCart({ ...product, quantity })
    navigate('/checkout')
  }

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    })
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-cyan-500 mb-4"></div>
          <p className="text-gray-600 text-lg">Cargando producto...</p>
        </div>
      </div>
    )
  }

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Producto no encontrado</h2>
          <button
            onClick={() => navigate('/products')}
            className="px-6 py-3 bg-gradient-to-r from-cyan-500 to-teal-500 text-white font-bold rounded-xl hover:shadow-xl transition-all"
          >
            Ver todos los productos
          </button>
        </div>
      </div>
    )
  }

  // Get product images
  const images = product.images && product.images.length > 0 
    ? product.images.map(img => img.image_url)
    : [product.image || 'https://via.placeholder.com/1920x1080?text=Producto']

  const features = [
    {
      title: 'Calidad Premium',
      description: 'Materiales de primera selección cuidadosamente elegidos para garantizar la máxima durabilidad y rendimiento.',
      icon: SparklesIcon,
      image: images[1] || images[0]
    },
    {
      title: 'Diseño Innovador',
      description: 'Cada detalle ha sido pensado para ofrecerte la mejor experiencia, combinando funcionalidad y estética.',
      icon: StarSolidIcon,
      image: images[2] || images[0]
    },
    {
      title: 'Tecnología Avanzada',
      description: 'Incorporamos las últimas innovaciones tecnológicas para llevarte al siguiente nivel.',
      icon: ShieldCheckIcon,
      image: images[3] || images[0]
    }
  ]

  return (
    <div className="bg-white">
      {/* Toast Notification */}
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

      {/* HERO 1: Main Product Hero - Full Screen */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        {/* Parallax Background Image */}
        <div 
          className="absolute inset-0 z-0"
          style={{
            transform: `translateY(${scrollY * 0.5}px)`,
            transition: 'transform 0.1s ease-out'
          }}
        >
          <img
            src={images[0]}
            alt={product.name}
            className="w-full h-full object-cover scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/70"></div>
        </div>

        {/* Content */}
        <div className="relative z-10 text-center px-4 max-w-5xl mx-auto">
          <div 
            className="transform transition-all duration-700"
            style={{
              transform: `translateY(${scrollY * 0.3}px)`,
              opacity: Math.max(0, 1 - scrollY / 500)
            }}
          >
            <h1 className="text-7xl lg:text-8xl xl:text-9xl font-extrabold text-white mb-8 tracking-tight leading-none">
              {product.name}
            </h1>
            <p className="text-2xl lg:text-3xl text-white/90 mb-12 font-light max-w-3xl mx-auto">
              {product.description}
            </p>
            
            {/* Price */}
            <div className="mb-12">
              <span className="text-6xl lg:text-7xl font-extrabold text-white">
                ${parseFloat(product.price).toFixed(2)}
              </span>
            </div>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <button
                onClick={handleBuyNow}
                disabled={product.stock === 0}
                className="group px-12 py-6 bg-gradient-to-r from-lime-400 to-green-500 text-gray-900 font-extrabold text-2xl rounded-2xl hover:shadow-[0_20px_80px_rgba(132,204,22,0.6)] hover:scale-105 transition-all disabled:opacity-50 flex items-center gap-3"
              >
                Comprar Ahora
                <ArrowRightIcon className="w-7 h-7 group-hover:translate-x-2 transition-transform" />
              </button>
              <button
                onClick={handleAddToCart}
                disabled={product.stock === 0}
                className="px-12 py-6 bg-white/20 backdrop-blur-sm text-white font-bold text-2xl rounded-2xl border-2 border-white/50 hover:bg-white/30 hover:border-white transition-all"
              >
                Agregar al Carrito
              </button>
            </div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce z-10">
          <ChevronDownIcon className="w-12 h-12 text-white/70" />
        </div>
      </section>

      {/* HERO 2: Feature Section 1 - Split Screen */}
      <section className="relative min-h-screen flex items-center overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Text Content */}
            <div 
              className="space-y-8 order-2 lg:order-1"
              style={{
                transform: `translateX(${Math.max(0, (scrollY - 800) * -0.1)}px)`,
                opacity: Math.min(1, (scrollY - 600) / 300)
              }}
            >
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-cyan-100 rounded-full">
                <SparklesIcon className="w-6 h-6 text-cyan-600" />
                <span className="text-cyan-900 font-bold">Feature Destacado</span>
              </div>
              <h2 className="text-6xl lg:text-7xl font-bold text-gray-900 leading-tight">
                {features[0].title}
              </h2>
              <p className="text-2xl text-gray-600 leading-relaxed">
                {features[0].description}
              </p>
              <div className="flex items-center gap-6 pt-8">
                <CheckCircleIcon className="w-8 h-8 text-cyan-500 flex-shrink-0" />
                <span className="text-xl text-gray-700">Garantía de por vida incluida</span>
              </div>
              <div className="flex items-center gap-6">
                <CheckCircleIcon className="w-8 h-8 text-cyan-500 flex-shrink-0" />
                <span className="text-xl text-gray-700">Materiales certificados internacionalmente</span>
              </div>
            </div>

            {/* Parallax Image */}
            <div 
              className="relative order-1 lg:order-2"
              style={{
                transform: `translateY(${Math.max(0, (scrollY - 800) * 0.15)}px)`
              }}
            >
              <div className="relative rounded-3xl overflow-hidden shadow-2xl">
                <img
                  src={features[0].image}
                  alt={features[0].title}
                  className="w-full h-[600px] object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-cyan-900/20 to-transparent"></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* HERO 3: Feature Section 2 - Split Screen (Reversed) */}
      <section className="relative min-h-screen flex items-center overflow-hidden bg-gradient-to-br from-gray-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Parallax Image */}
            <div 
              className="relative"
              style={{
                transform: `translateY(${Math.max(0, (scrollY - 1600) * 0.15)}px)`
              }}
            >
              <div className="relative rounded-3xl overflow-hidden shadow-2xl">
                <img
                  src={features[1].image}
                  alt={features[1].title}
                  className="w-full h-[600px] object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-lime-900/20 to-transparent"></div>
              </div>
            </div>

            {/* Text Content */}
            <div 
              className="space-y-8"
              style={{
                transform: `translateX(${Math.max(0, (scrollY - 1800) * 0.1)}px)`,
                opacity: Math.min(1, (scrollY - 1400) / 300)
              }}
            >
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-lime-100 rounded-full">
                <StarSolidIcon className="w-6 h-6 text-lime-600" />
                <span className="text-lime-900 font-bold">Diseño Excepcional</span>
              </div>
              <h2 className="text-6xl lg:text-7xl font-bold text-gray-900 leading-tight">
                {features[1].title}
              </h2>
              <p className="text-2xl text-gray-600 leading-relaxed">
                {features[1].description}
              </p>
              <div className="flex items-center gap-6 pt-8">
                <CheckCircleIcon className="w-8 h-8 text-lime-500 flex-shrink-0" />
                <span className="text-xl text-gray-700">Diseño galardonado internacionalmente</span>
              </div>
              <div className="flex items-center gap-6">
                <CheckCircleIcon className="w-8 h-8 text-lime-500 flex-shrink-0" />
                <span className="text-xl text-gray-700">Ergonomía estudiada científicamente</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* HERO 4: Feature Section 3 - Split Screen */}
      <section className="relative min-h-screen flex items-center overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Text Content */}
            <div 
              className="space-y-8 order-2 lg:order-1"
              style={{
                transform: `translateX(${Math.max(0, (scrollY - 2600) * -0.1)}px)`,
                opacity: Math.min(1, (scrollY - 2400) / 300)
              }}
            >
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-orange-100 rounded-full">
                <ShieldCheckIcon className="w-6 h-6 text-orange-600" />
                <span className="text-orange-900 font-bold">Innovación Tecnológica</span>
              </div>
              <h2 className="text-6xl lg:text-7xl font-bold text-gray-900 leading-tight">
                {features[2].title}
              </h2>
              <p className="text-2xl text-gray-600 leading-relaxed">
                {features[2].description}
              </p>
              <div className="flex items-center gap-6 pt-8">
                <CheckCircleIcon className="w-8 h-8 text-orange-500 flex-shrink-0" />
                <span className="text-xl text-gray-700">Última generación de componentes</span>
              </div>
              <div className="flex items-center gap-6">
                <CheckCircleIcon className="w-8 h-8 text-orange-500 flex-shrink-0" />
                <span className="text-xl text-gray-700">Actualizaciones automáticas gratuitas</span>
              </div>
            </div>

            {/* Parallax Image */}
            <div 
              className="relative order-1 lg:order-2"
              style={{
                transform: `translateY(${Math.max(0, (scrollY - 2600) * 0.15)}px)`
              }}
            >
              <div className="relative rounded-3xl overflow-hidden shadow-2xl">
                <img
                  src={features[2].image}
                  alt={features[2].title}
                  className="w-full h-[600px] object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-orange-900/20 to-transparent"></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* HERO 5: Specifications with Background */}
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
            {[
              { label: 'Categoría', value: product.category?.name || 'General' },
              { label: 'Disponibilidad', value: product.stock > 0 ? `${product.stock} unidades` : 'Agotado' },
              { label: 'SKU', value: `PRD-${product.id.toString().padStart(6, '0')}` },
              { label: 'Rating', value: reviewsStats.average_rating > 0 ? `${reviewsStats.average_rating}/5.0 ⭐` : 'Sin reseñas' }
            ].map((spec, index) => (
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

      {/* HERO 6: Gallery Section */}
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

      {/* HERO 7: Final CTA Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Animated Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-cyan-500 via-lime-400 to-green-500 opacity-90"></div>
        <div className="absolute inset-0">
          <div className="absolute top-0 left-0 w-96 h-96 bg-white/20 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-white/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
        </div>

        {/* Content */}
        <div className="relative z-10 text-center px-4 max-w-5xl mx-auto">
          <h2 className="text-7xl lg:text-8xl font-extrabold text-white mb-8 leading-none">
            ¿Listo para tenerlo?
          </h2>
          <p className="text-3xl text-white/90 mb-12 font-light">
            Únete a miles de clientes satisfechos
          </p>

          {/* Price & Stock */}
          <div className="mb-12">
            <span className="text-8xl font-extrabold text-white">
              ${parseFloat(product.price).toFixed(2)}
            </span>
            <p className="text-xl text-white/80 mt-4">
              {product.stock > 0 ? `${product.stock} unidades disponibles` : 'Agotado'}
            </p>
          </div>

          {/* Quantity Selector */}
          <div className="flex items-center justify-center gap-6 mb-12">
            <button
              onClick={() => setQuantity(Math.max(1, quantity - 1))}
              className="w-14 h-14 bg-white/20 backdrop-blur-sm hover:bg-white/30 rounded-2xl text-white text-2xl font-bold transition-all"
            >
              −
            </button>
            <span className="text-4xl font-bold text-white w-20 text-center">{quantity}</span>
            <button
              onClick={() => setQuantity(Math.min(product.stock, quantity + 1))}
              disabled={quantity >= product.stock}
              className="w-14 h-14 bg-white/20 backdrop-blur-sm hover:bg-white/30 rounded-2xl text-white text-2xl font-bold transition-all disabled:opacity-40"
            >
              +
            </button>
          </div>

          {/* Final CTAs */}
          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
            <button
              onClick={handleBuyNow}
              disabled={product.stock === 0}
              className="group px-16 py-8 bg-white text-gray-900 font-extrabold text-3xl rounded-3xl hover:shadow-[0_30px_100px_rgba(255,255,255,0.5)] hover:scale-105 transition-all disabled:opacity-50 flex items-center gap-4"
            >
              Comprar Ahora
              <ShoppingCartIcon className="w-8 h-8" />
            </button>
          </div>

          {/* Trust Badges */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-20 max-w-4xl mx-auto">
            {[
              { icon: TruckIcon, text: 'Envío Express' },
              { icon: ShieldCheckIcon, text: 'Compra Segura' },
              { icon: CheckCircleIcon, text: 'Garantía 2 años' },
              { icon: SparklesIcon, text: 'Calidad Premium' }
            ].map((badge, index) => (
              <div key={index} className="flex flex-col items-center gap-3 text-white">
                <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center">
                  <badge.icon className="w-8 h-8" />
                </div>
                <span className="font-bold text-lg">{badge.text}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Reviews Section */}
      <section className="py-20 bg-gradient-to-br from-gray-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Reviews Carousel */}
          <div className="mb-16">
            {loadingReviews ? (
              <div className="text-center py-12">
                <div className="inline-block animate-spin rounded-full h-12 w-12 border-t-4 border-b-4 border-cyan-500"></div>
              </div>
            ) : (
              <ReviewsCarousel 
                reviews={reviews}
                averageRating={reviewsStats.average_rating}
                totalReviews={reviewsStats.total_reviews}
              />
            )}
          </div>

          {/* Review Form */}
          {user ? (
            <ReviewForm 
              productId={id}
              onReviewSubmitted={handleReviewSubmitted}
            />
          ) : (
            <div className="bg-gradient-to-br from-cyan-50 to-teal-50 rounded-2xl p-12 text-center border border-cyan-100">
              <StarSolidIcon className="w-16 h-16 mx-auto text-cyan-500 mb-4" />
              <h3 className="text-2xl font-bold text-gray-900 mb-3">
                ¿Ya compraste este producto?
              </h3>
              <p className="text-gray-600 mb-6 max-w-md mx-auto">
                Inicia sesión para dejar tu reseña y ayudar a otros clientes
              </p>
              <button
                onClick={() => navigate('/login')}
                className="px-8 py-4 bg-gradient-to-r from-cyan-500 to-teal-500 text-white font-bold rounded-xl hover:shadow-xl transform hover:scale-105 transition-all"
              >
                Iniciar Sesión
              </button>
            </div>
          )}
        </div>
      </section>

      {/* Scroll to Top Button */}
      {showScrollTop && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-8 right-8 z-50 w-14 h-14 bg-gradient-to-r from-cyan-500 to-teal-500 text-white rounded-full shadow-2xl hover:shadow-[0_20px_60px_rgba(6,182,212,0.6)] hover:scale-110 transition-all duration-300 flex items-center justify-center group"
          aria-label="Volver arriba"
        >
          <ArrowUpIcon className="w-6 h-6 group-hover:-translate-y-1 transition-transform" />
        </button>
      )}

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
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </div>
  )
}
