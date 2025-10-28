import { useState, useEffect } from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom'
import { useCart } from '../context/CartContext'
import { useAuth } from '../context/AuthContext'
import api from '../services/api'

export default function ProductDetail() {
  const { id } = useParams()
  const navigate = useNavigate()
  const { addToCart } = useCart()
  const { user } = useAuth()
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
      alert('Debes iniciar sesión para agregar productos al carrito')
      navigate('/login')
      return
    }
    
    addToCart(product, quantity)
    alert('Producto agregado al carrito')
  }

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <p className="text-center text-gray-500">Cargando producto...</p>
      </div>
    )
  }

  if (error || !product) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <p className="text-center text-red-500">{error || 'Producto no encontrado'}</p>
        <div className="text-center mt-4">
          <Link to="/products" className="btn btn-primary">
            Volver a Productos
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Breadcrumb */}
      <nav className="mb-8">
        <ol className="flex space-x-2 text-sm text-gray-500">
          <li><Link to="/" className="hover:text-primary-600">Inicio</Link></li>
          <li>/</li>
          <li><Link to="/products" className="hover:text-primary-600">Productos</Link></li>
          <li>/</li>
          <li className="text-gray-900">{product.name}</li>
        </ol>
      </nav>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        {/* Imagen del producto */}
        <div>
          <img
            src={product.image || 'https://via.placeholder.com/600'}
            alt={product.name}
            className="w-full rounded-lg shadow-lg"
          />
        </div>

        {/* Información del producto */}
        <div>
          <h1 className="text-4xl font-bold mb-4">{product.name}</h1>
          
          {product.category && (
            <p className="text-gray-600 mb-4">
              Categoría: <span className="font-medium">{product.category.name}</span>
            </p>
          )}

          <div className="mb-6">
            <span className="text-4xl font-bold text-primary-600">
              ${product.price}
            </span>
            {product.sale_price && (
              <span className="text-2xl text-gray-400 line-through ml-4">
                ${product.sale_price}
              </span>
            )}
          </div>

          <p className="text-gray-700 mb-6 leading-relaxed">
            {product.description}
          </p>

          <div className="mb-6">
            <p className="text-sm text-gray-600 mb-2">
              Stock disponible: <span className="font-semibold">{product.stock} unidades</span>
            </p>
          </div>

          {/* Selector de cantidad */}
          <div className="mb-6">
            <label htmlFor="quantity" className="block text-sm font-medium text-gray-700 mb-2">
              Cantidad:
            </label>
            <div className="flex items-center space-x-4">
              <button
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                className="px-4 py-2 bg-gray-200 rounded-lg hover:bg-gray-300"
              >
                -
              </button>
              <input
                id="quantity"
                type="number"
                min="1"
                max={product.stock}
                value={quantity}
                onChange={(e) => setQuantity(parseInt(e.target.value) || 1)}
                className="w-20 text-center input"
              />
              <button
                onClick={() => setQuantity(Math.min(product.stock, quantity + 1))}
                className="px-4 py-2 bg-gray-200 rounded-lg hover:bg-gray-300"
              >
                +
              </button>
            </div>
          </div>

          {/* Botones de acción */}
          <div className="space-y-4">
            <button
              onClick={handleAddToCart}
              disabled={product.stock === 0}
              className="w-full btn btn-primary text-lg py-3"
            >
              {product.stock === 0 ? 'Sin Stock' : 'Agregar al Carrito'}
            </button>
            <Link to="/products" className="block w-full btn btn-secondary text-center">
              Seguir Comprando
            </Link>
          </div>

          {/* Información adicional */}
          <div className="mt-8 border-t pt-6">
            <h3 className="font-semibold mb-4">Información Adicional</h3>
            <ul className="space-y-2 text-gray-600">
              <li>✓ Envío gratis en compras superiores a $50</li>
              <li>✓ Garantía de satisfacción</li>
              <li>✓ Devoluciones dentro de 30 días</li>
              <li>✓ Pago seguro</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}
