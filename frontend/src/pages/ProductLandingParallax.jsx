import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { useCart } from '../context/CartContext'
import { useRecentlyViewed } from '../hooks/useRecentlyViewed'
import { useAuth } from '../context/AuthContext'
import { 
  SparklesIcon,
  ShieldCheckIcon
} from '@heroicons/react/24/outline'
import { StarIcon as StarSolidIcon } from '@heroicons/react/24/solid'
import api from '../services/api'
import {
  LoadingSpinner,
  ErrorMessage,
  NotificationToast,
  HeroSection,
  FeatureSection,
  SpecificationsSection,
  GallerySection,
  FinalCTASection,
  ReviewsSection,
  ScrollToTopButton
} from '../components/ProductLandingParallax'

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

  if (loading) return <LoadingSpinner />
  if (!product) return <ErrorMessage />

  // Get product images
  const images = product.images && product.images.length > 0 
    ? product.images.map(img => img.image_url)
    : [product.image || 'https://via.placeholder.com/1920x1080?text=Producto']

  // Features configuration
  const features = [
    {
      title: 'Calidad Premium',
      description: 'Materiales de primera selección cuidadosamente elegidos para garantizar la máxima durabilidad y rendimiento.',
      icon: SparklesIcon,
      image: images[1] || images[0],
      badgeColor: 'bg-cyan-100',
      badgeText: 'Feature Destacado',
      iconColor: 'text-cyan-600',
      textColor: 'text-cyan-900',
      checkColor: 'text-cyan-500',
      gradientOverlay: 'bg-gradient-to-t from-cyan-900/20 to-transparent',
      benefit1: 'Garantía de por vida incluida',
      benefit2: 'Materiales certificados internacionalmente'
    },
    {
      title: 'Diseño Innovador',
      description: 'Cada detalle ha sido pensado para ofrecerte la mejor experiencia, combinando funcionalidad y estética.',
      icon: StarSolidIcon,
      image: images[2] || images[0],
      badgeColor: 'bg-lime-100',
      badgeText: 'Diseño Excepcional',
      iconColor: 'text-lime-600',
      textColor: 'text-lime-900',
      checkColor: 'text-lime-500',
      gradientOverlay: 'bg-gradient-to-t from-lime-900/20 to-transparent',
      benefit1: 'Diseño galardonado internacionalmente',
      benefit2: 'Ergonomía estudiada científicamente'
    },
    {
      title: 'Tecnología Avanzada',
      description: 'Incorporamos las últimas innovaciones tecnológicas para llevarte al siguiente nivel.',
      icon: ShieldCheckIcon,
      image: images[3] || images[0],
      badgeColor: 'bg-orange-100',
      badgeText: 'Innovación Tecnológica',
      iconColor: 'text-orange-600',
      textColor: 'text-orange-900',
      checkColor: 'text-orange-500',
      gradientOverlay: 'bg-gradient-to-t from-orange-900/20 to-transparent',
      benefit1: 'Última generación de componentes',
      benefit2: 'Actualizaciones automáticas gratuitas'
    }
  ]

  return (
    <div className="bg-white">
      <NotificationToast show={showNotification} product={product} quantity={quantity} />

      <HeroSection
        product={product}
        images={images}
        scrollY={scrollY}
        onBuyNow={handleBuyNow}
        onAddToCart={handleAddToCart}
      />

      <FeatureSection
        feature={features[0]}
        scrollY={scrollY}
        scrollOffset={800}
        reversed={false}
      />

      <FeatureSection
        feature={features[1]}
        scrollY={scrollY}
        scrollOffset={1600}
        reversed={true}
        backgroundColor="bg-gradient-to-br from-gray-50 to-white"
      />

      <FeatureSection
        feature={features[2]}
        scrollY={scrollY}
        scrollOffset={2600}
        reversed={false}
      />

      <SpecificationsSection
        product={product}
        images={images}
        scrollY={scrollY}
        reviewsStats={reviewsStats}
      />

      <GallerySection
        product={product}
        images={images}
        scrollY={scrollY}
      />

      <FinalCTASection
        product={product}
        quantity={quantity}
        setQuantity={setQuantity}
        onBuyNow={handleBuyNow}
      />

      <ReviewsSection
        user={user}
        productId={id}
        reviews={reviews}
        reviewsStats={reviewsStats}
        loadingReviews={loadingReviews}
        onReviewSubmitted={handleReviewSubmitted}
      />

      <ScrollToTopButton
        show={showScrollTop}
        onClick={scrollToTop}
      />

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
