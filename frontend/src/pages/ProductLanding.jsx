import { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { useCart } from '../context/CartContext'
import api from '../services/api'
import {
  LoadingSpinner,
  ErrorMessage,
  BackgroundElements,
  NotificationToast,
  Breadcrumb,
  ProductImageGallery,
  ProductInfo,
  PriceSection,
  QuantitySelector,
  CTAButtons,
  TrustBadges,
  SpecificationsSection,
  TabsSection,
  MobileCTA
} from '../components/ProductLanding'

export default function ProductLanding() {
  const { id } = useParams()
  const navigate = useNavigate()
  const { addToCart } = useCart()
  const [product, setProduct] = useState(null)
  const [loading, setLoading] = useState(true)
  const [quantity, setQuantity] = useState(1)
  const [showNotification, setShowNotification] = useState(false)

  useEffect(() => {
    fetchProduct()
    window.scrollTo(0, 0)
  }, [id])

  const fetchProduct = async () => {
    try {
      const response = await api.get(`/products/${id}`)
      setProduct(response.data)
    } catch (error) {
      console.error('Error fetching product:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleAddToCart = () => {
    if (product) {
      addToCart(product, quantity)
      setShowNotification(true)
      setTimeout(() => setShowNotification(false), 3000)
    }
  }

  const handleBuyNow = () => {
    if (product) {
      addToCart(product, quantity)
      navigate('/checkout')
    }
  }

  // Usar imágenes de la base de datos o fallback a la imagen principal
  const images = product?.images && product.images.length > 0 
    ? product.images.map(img => img.image_url)
    : [product?.image || 'https://via.placeholder.com/800x800?text=Producto']

  if (loading) return <LoadingSpinner />
  if (!product) return <ErrorMessage />

  return (
    <div className="min-h-screen bg-white relative overflow-hidden">
      <BackgroundElements />
      <NotificationToast show={showNotification} product={product} quantity={quantity} />

      {/* Hero Section - Tech Product Landing Style */}
      <section className="relative">
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <Breadcrumb productName={product.name} />

          <div className="grid lg:grid-cols-2 gap-20 items-center">
            <ProductImageGallery product={product} images={images} />

            <div className="space-y-10">
              <ProductInfo product={product} />
              <PriceSection price={product.price} />
              <QuantitySelector
                quantity={quantity}
                setQuantity={setQuantity}
                stock={product.stock}
              />
              <CTAButtons
                product={product}
                onBuyNow={handleBuyNow}
                onAddToCart={handleAddToCart}
              />
              <TrustBadges />
            </div>
          </div>
        </div>
      </section>

      <SpecificationsSection product={product} />
      <TabsSection product={product} />
      <MobileCTA product={product} onBuyNow={handleBuyNow} />

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
  )
}
