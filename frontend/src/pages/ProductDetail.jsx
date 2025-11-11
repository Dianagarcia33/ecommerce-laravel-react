import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { useCart } from '../context/CartContext'
import { useAuth } from '../context/AuthContext'
import { useToast } from '../context/ToastContext'
import api from '../services/api'
import {
  LoadingSpinner,
  ErrorMessage,
  Breadcrumb,
  ProductImage,
  ProductInfo,
  QuantitySelector,
  ActionButtons,
  AdditionalInfo
} from '../components/ProductDetail'

export default function ProductDetail() {
  const { id } = useParams()
  const navigate = useNavigate()
  const { addToCart } = useCart()
  const { user } = useAuth()
  const { showToast } = useToast()
  const [product, setProduct] = useState(null)
  const [quantity, setQuantity] = useState(1)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    fetchProduct()
  }, [id])

  const fetchProduct = async () => {
    try {
      setLoading(true)
      const response = await api.get(`/products/${id}`)
      setProduct(response.data)
    } catch (err) {
      setError('Error al cargar el producto')
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  const handleAddToCart = () => {
    if (!user) {
      showToast('Debes iniciar sesión para agregar productos al carrito', 'warning')
      navigate('/login')
      return
    }
    
    addToCart(product, quantity)
    showToast(`${quantity} ${quantity > 1 ? 'productos agregados' : 'producto agregado'} al carrito`, 'success')
  }

  if (loading) return <LoadingSpinner />
  if (error || !product) return <ErrorMessage error={error} />

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Breadcrumb productName={product.name} />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <ProductImage product={product} />

          <div>
            <ProductInfo product={product} />
            <QuantitySelector
              quantity={quantity}
              setQuantity={setQuantity}
              maxStock={product.stock}
            />
            <ActionButtons
              product={product}
              quantity={quantity}
              onAddToCart={handleAddToCart}
            />
            <AdditionalInfo />
          </div>
        </div>
      </div>
    </div>
  )
}
