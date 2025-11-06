import { Link } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { 
  ShoppingBagIcon, 
  TruckIcon, 
  ShieldCheckIcon, 
  SparklesIcon,
  ArrowRightIcon,
  BoltIcon,
  FireIcon,
  TagIcon,
  StarIcon
} from '@heroicons/react/24/outline'
import { useSiteConfig } from '../hooks/useSiteConfig'
import productService from '../services/productService'

export default function Home() {
  const [scrollY, setScrollY] = useState(0)
  const [featuredProducts, setFeaturedProducts] = useState([])
  const [loading, setLoading] = useState(true)
  
  const config = useSiteConfig()
  const { home, business, theme } = config
  const { colors } = theme

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY)
    window.addEventListener('scroll', handleScroll)
    fetchProducts()
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const fetchProducts = async () => {
    try {
      const response = await productService.getAll()
      setFeaturedProducts(response.data.slice(0, 6))
    } catch (error) {
      console.error('Error al cargar productos:', error)
    } finally {
      setLoading(false)
    }
  }

  const features = [
    {
      icon: TruckIcon,
      title: 'Envío Rápido',
      description: 'Entrega en 24-48 horas',
      gradient: 'from-blue-500 to-blue-600'
    },
    {
      icon: ShieldCheckIcon,
      title: 'Compra Segura',
      description: '100% protegido',
      gradient: 'from-green-500 to-green-600'
    },
    {
      icon: TagIcon,
      title: 'Mejores Precios',
      description: 'Ofertas increíbles',
      gradient: 'from-orange-500 to-orange-600'
    }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* Hero Section - Moderno y Dinámico */}
      <section className="relative min-h-[90vh] flex items-center overflow-hidden">
        {/* Fondo animado con burbujas */}
        <div className="absolute inset-0 overflow-hidden">
          <div 
            className="absolute top-20 left-10 w-72 h-72 rounded-full blur-3xl opacity-20 animate-pulse"
            style={{ 
              background: `radial-gradient(circle, ${colors.primary.hex}, transparent)`,
              animationDuration: '3s'
            }}
          />
          <div 
            className="absolute bottom-20 right-10 w-96 h-96 rounded-full blur-3xl opacity-20 animate-pulse"
            style={{ 
              background: `radial-gradient(circle, ${colors.secondary.hex}, transparent)`,
              animationDuration: '4s',
              animationDelay: '1s'
            }}
          />
          <div 
            className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full blur-3xl opacity-10"
            style={{ 
              background: `radial-gradient(circle, ${colors.primary.hex}, ${colors.secondary.hex})`,
            }}
          />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Contenido Principal */}
            <div className="space-y-8 text-center lg:text-left">
              {/* Badge */}
              <div 
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold shadow-lg animate-bounce"
                style={{ 
                  background: `linear-gradient(135deg, ${colors.secondary.hex}, ${colors.secondary.dark})`,
                  color: '#1f2937'
                }}
              >
                <SparklesIcon className="w-5 h-5" />
                {home.hero.badge || 'Nueva Colección 2025'}
              </div>

              {/* Título Principal */}
              <h1 className="text-5xl lg:text-7xl font-black leading-tight">
                <span 
                  className="block bg-gradient-to-r bg-clip-text text-transparent animate-pulse"
                  style={{ 
                    backgroundImage: `linear-gradient(135deg, ${colors.primary.hex}, ${colors.secondary.hex})`
                  }}
                >
                  {business.name}
                </span>
                <span className="block text-gray-900 mt-2">
                  {home.hero.subtitle || 'Tu Destino de Compras'}
                </span>
              </h1>

              {/* Descripción */}
              <p className="text-xl text-gray-600 leading-relaxed max-w-xl">
                {home.hero.description || 'Descubre productos extraordinarios con ofertas increíbles. Calidad garantizada y envío express.'}
              </p>

              {/* Botones */}
              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <Link
                  to="/products"
                  className="group relative px-8 py-4 rounded-full font-bold text-white overflow-hidden shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all"
                  style={{ 
                    background: `linear-gradient(135deg, ${colors.primary.hex}, ${colors.primary.dark})`
                  }}
                >
                  <span className="relative z-10 flex items-center justify-center gap-2">
                    <ShoppingBagIcon className="w-6 h-6" />
                    Ver Productos
                    <ArrowRightIcon className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </span>
                  <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-20 transition-opacity" />
                </Link>

                <Link
                  to="/products"
                  className="px-8 py-4 rounded-full font-bold border-2 hover:shadow-xl transform hover:scale-105 transition-all flex items-center justify-center gap-2"
                  style={{ 
                    borderColor: colors.primary.hex,
                    color: colors.primary.hex
                  }}
                >
                  <FireIcon className="w-6 h-6" />
                  Ver Ofertas
                </Link>
              </div>

              {/* Stats rápidos */}
              <div className="flex flex-wrap gap-6 justify-center lg:justify-start pt-8">
                {home.stats?.map((stat, index) => (
                  <div key={index} className="text-center">
                    <div 
                      className="text-3xl font-black"
                      style={{ color: index % 2 === 0 ? colors.primary.hex : colors.secondary.hex }}
                    >
                      {stat.number}
                    </div>
                    <div className="text-sm text-gray-600 font-medium">{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Imagen/Ilustración */}
            <div className="relative lg:block">
              <div className="relative z-10">
                {/* Grid de productos destacados mini */}
                <div className="grid grid-cols-2 gap-4">
                  {[1, 2, 3, 4].map((item, index) => (
                    <div
                      key={item}
                      className="aspect-square rounded-3xl shadow-2xl transform hover:scale-105 transition-all duration-300"
                      style={{ 
                        background: `linear-gradient(135deg, ${
                          index % 2 === 0 ? colors.primary.hex : colors.secondary.hex
                        }20, ${
                          index % 2 === 0 ? colors.secondary.hex : colors.primary.hex
                        }40)`,
                        animationDelay: `${index * 0.1}s`
                      }}
                    >
                      <div className="w-full h-full flex items-center justify-center">
                        <ShoppingBagIcon 
                          className="w-20 h-20 opacity-30"
                          style={{ color: index % 2 === 0 ? colors.primary.hex : colors.secondary.hex }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Elementos flotantes decorativos */}
              <div 
                className="absolute -top-6 -right-6 w-24 h-24 rounded-full shadow-xl flex items-center justify-center animate-bounce"
                style={{ 
                  background: colors.secondary.hex,
                  animationDuration: '2s'
                }}
              >
                <TagIcon className="w-12 h-12 text-gray-900" />
              </div>
              <div 
                className="absolute -bottom-6 -left-6 w-32 h-32 rounded-full shadow-xl flex items-center justify-center animate-pulse"
                style={{ 
                  background: colors.primary.hex,
                }}
              >
                <SparklesIcon className="w-16 h-16 text-white" />
              </div>
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 animate-bounce">
          <div 
            className="w-6 h-10 border-2 rounded-full flex items-start justify-center p-2"
            style={{ borderColor: colors.primary.hex }}
          >
            <div 
              className="w-1.5 h-3 rounded-full animate-pulse"
              style={{ background: colors.primary.hex }}
            />
          </div>
        </div>
      </section>

      {/* Features Bar - Compacta y moderna */}
      <section className="py-8 border-y border-gray-100 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="flex items-center gap-4 group cursor-pointer">
                <div 
                  className={`w-14 h-14 rounded-xl bg-gradient-to-br ${feature.gradient} flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform`}
                >
                  <feature.icon className="w-7 h-7 text-white" />
                </div>
                <div>
                  <h3 className="font-bold text-gray-900">{feature.title}</h3>
                  <p className="text-sm text-gray-600">{feature.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Productos Destacados */}
      <section className="py-20 bg-gradient-to-b from-white to-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header de sección */}
          <div className="text-center mb-16 space-y-4">
            <div 
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-bold"
              style={{ 
                background: `${colors.primary.hex}10`,
                color: colors.primary.hex
              }}
            >
              <BoltIcon className="w-5 h-5" />
              Productos Destacados
            </div>
            <h2 className="text-4xl lg:text-5xl font-black text-gray-900">
              Descubre Nuestros
              <span 
                className="block bg-gradient-to-r bg-clip-text text-transparent"
                style={{ 
                  backgroundImage: `linear-gradient(135deg, ${colors.primary.hex}, ${colors.secondary.hex})`
                }}
              >
                Mejores Productos
              </span>
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Selección exclusiva de productos de alta calidad con las mejores ofertas
            </p>
          </div>

          {/* Grid de productos */}
          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <div key={i} className="animate-pulse">
                  <div className="bg-gray-200 aspect-square rounded-3xl mb-4" />
                  <div className="h-4 bg-gray-200 rounded w-3/4 mb-2" />
                  <div className="h-4 bg-gray-200 rounded w-1/2" />
                </div>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {featuredProducts.map((product, index) => (
                <Link
                  key={product.id}
                  to={`/products`}
                  className="group"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div className="relative overflow-hidden rounded-3xl bg-white shadow-lg hover:shadow-2xl transition-all duration-300 transform group-hover:-translate-y-2">
                    {/* Imagen del producto */}
                    <div className="aspect-square overflow-hidden bg-gray-50">
                      <img
                        src={product.images?.[0] 
                          ? `http://localhost:8000/storage/${product.images[0].image_path}`
                          : 'https://via.placeholder.com/400'
                        }
                        alt={product.name}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                    </div>

                    {/* Badge de nuevo/oferta */}
                    {index < 3 && (
                      <div 
                        className="absolute top-4 right-4 px-3 py-1 rounded-full text-xs font-bold text-white shadow-lg"
                        style={{ background: colors.secondary.hex }}
                      >
                        NUEVO
                      </div>
                    )}

                    {/* Contenido */}
                    <div className="p-6 space-y-3">
                      <h3 className="font-bold text-lg text-gray-900 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r transition-all"
                        style={{ 
                          backgroundImage: `linear-gradient(135deg, ${colors.primary.hex}, ${colors.secondary.hex})`
                        }}
                      >
                        {product.name}
                      </h3>
                      
                      <div className="flex items-center justify-between">
                        <div>
                          <div 
                            className="text-2xl font-black"
                            style={{ color: colors.primary.hex }}
                          >
                            ${parseFloat(product.price).toFixed(2)}
                          </div>
                          {product.stock < 10 && product.stock > 0 && (
                            <div className="text-xs text-orange-600 font-medium">
                              ¡Solo {product.stock} disponibles!
                            </div>
                          )}
                        </div>
                        
                        <button 
                          className="w-12 h-12 rounded-full shadow-lg flex items-center justify-center group-hover:scale-110 transition-transform"
                          style={{ background: colors.primary.hex }}
                        >
                          <ShoppingBagIcon className="w-6 h-6 text-white" />
                        </button>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}

          {/* Ver todos los productos */}
          <div className="text-center mt-12">
            <Link
              to="/products"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-full font-bold text-white shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all"
              style={{ 
                background: `linear-gradient(135deg, ${colors.primary.hex}, ${colors.secondary.hex})`
              }}
            >
              Ver Todos los Productos
              <ArrowRightIcon className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Section - Moderna */}
      <section 
        className="relative py-24 overflow-hidden"
        style={{ 
          background: `linear-gradient(135deg, ${colors.primary.dark}, ${colors.primary.hex}, ${colors.secondary.hex})`
        }}
      >
        {/* Elementos decorativos */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-96 h-96 rounded-full bg-white blur-3xl" />
          <div className="absolute bottom-0 right-0 w-96 h-96 rounded-full bg-white blur-3xl" />
        </div>

        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-8">
          <h2 className="text-4xl lg:text-5xl font-black text-white leading-tight">
            ¿Listo para encontrar lo que buscas?
          </h2>
          <p className="text-xl text-white/90 max-w-2xl mx-auto">
            Únete a miles de clientes satisfechos. Descubre ofertas exclusivas y productos de calidad.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link
              to="/products"
              className="px-8 py-4 bg-white rounded-full font-bold shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all flex items-center gap-2"
              style={{ color: colors.primary.hex }}
            >
              <ShoppingBagIcon className="w-6 h-6" />
              Explorar Catálogo
            </Link>
            <Link
              to="/products"
              className="px-8 py-4 bg-white/10 backdrop-blur-sm border-2 border-white text-white rounded-full font-bold hover:bg-white/20 transition-all"
            >
              Ver Ofertas Especiales
            </Link>
          </div>

          {/* Trust badges */}
          <div className="flex flex-wrap gap-6 justify-center pt-8">
            {['Compra Segura', 'Envío Gratis', 'Garantía Total'].map((badge, index) => (
              <div key={index} className="flex items-center gap-2 text-white/90">
                <ShieldCheckIcon className="w-5 h-5" />
                <span className="font-medium">{badge}</span>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
