import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import api from '../services/api'

export default function Products() {
  const [products, setProducts] = useState([])
  const [categories, setCategories] = useState([])
  const [selectedCategory, setSelectedCategory] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    fetchCategories()
    fetchProducts()
  }, [selectedCategory])

  const fetchCategories = async () => {
    try {
      const response = await api.get('/categories')
      setCategories(response.data)
    } catch (err) {
      console.error('Error al cargar categorías:', err)
    }
  }

  const fetchProducts = async () => {
    try {
      setLoading(true)
      const url = selectedCategory 
        ? `/products?category=${selectedCategory}`
        : '/products'
      const response = await api.get(url)
      setProducts(response.data)
    } catch (err) {
      setError('Error al cargar productos')
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  const addToCart = async (productId) => {
    try {
      await api.post('/cart', { product_id: productId, quantity: 1 })
      alert('Producto agregado al carrito')
    } catch (err) {
      console.error('Error al agregar al carrito:', err)
      alert('Error al agregar al carrito. ¿Has iniciado sesión?')
    }
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-4xl font-bold mb-8">Nuestros Productos</h1>

      {/* Filtros por categoría */}
      <div className="mb-8">
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => setSelectedCategory(null)}
            className={`px-4 py-2 rounded-lg ${
              !selectedCategory
                ? 'bg-primary-600 text-white'
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
          >
            Todos
          </button>
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setSelectedCategory(category.id)}
              className={`px-4 py-2 rounded-lg ${
                selectedCategory === category.id
                  ? 'bg-primary-600 text-white'
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
            >
              {category.name}
            </button>
          ))}
        </div>
      </div>

      {/* Grid de productos */}
      {loading ? (
        <div className="text-center py-12">
          <p className="text-gray-500">Cargando productos...</p>
        </div>
      ) : error ? (
        <div className="text-center py-12">
          <p className="text-red-500">{error}</p>
        </div>
      ) : products.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-gray-500">No hay productos disponibles</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {products.map((product) => (
            <div key={product.id} className="card hover:shadow-lg transition-shadow">
              <div className="aspect-w-1 aspect-h-1 mb-4">
                <img
                  src={product.image || 'https://via.placeholder.com/300'}
                  alt={product.name}
                  className="w-full h-48 object-cover rounded-lg"
                />
              </div>
              <Link to={`/products/${product.id}`}>
                <h3 className="text-lg font-semibold mb-2 hover:text-primary-600">
                  {product.name}
                </h3>
              </Link>
              <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                {product.description}
              </p>
              <div className="flex justify-between items-center">
                <span className="text-2xl font-bold text-primary-600">
                  ${product.price}
                </span>
                <button
                  onClick={() => addToCart(product.id)}
                  className="btn btn-primary"
                >
                  Agregar
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
