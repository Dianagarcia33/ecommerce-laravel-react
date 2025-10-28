import { Link } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { 
  ShoppingBagIcon, 
  TruckIcon, 
  ShieldCheckIcon, 
  SparklesIcon,
  CreditCardIcon,
  StarIcon,
  ArrowRightIcon,
  BoltIcon,
  GiftIcon,
  TagIcon
} from '@heroicons/react/24/outline'

export default function Home() {
  const [scrollY, setScrollY] = useState(0)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    setIsVisible(true)
    const handleScroll = () => setScrollY(window.scrollY)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const features = [
    {
      icon: ShieldCheckIcon,
      title: 'Calidad Garantizada',
      description: 'Productos verificados y de la más alta calidad',
      color: 'from-blue-500 to-cyan-500',
      delay: '0'
    },
    {
      icon: TruckIcon,
      title: 'Envío Rápido',
      description: 'Entrega express en 24-48 horas',
      color: 'from-purple-500 to-pink-500',
      delay: '100'
    },
    {
      icon: CreditCardIcon,
      title: 'Pago Seguro',
      description: 'Transacciones 100% protegidas',
      color: 'from-orange-500 to-red-500',
      delay: '200'
    },
    {
      icon: GiftIcon,
      title: 'Ofertas Especiales',
      description: 'Descuentos y promociones exclusivas',
      color: 'from-green-500 to-emerald-500',
      delay: '300'
    }
  ]

  const stats = [
    { number: '10K+', label: 'Productos', icon: ShoppingBagIcon },
    { number: '50K+', label: 'Clientes Felices', icon: StarIcon },
    { number: '99.9%', label: 'Satisfacción', icon: SparklesIcon },
    { number: '24/7', label: 'Soporte', icon: BoltIcon }
  ]

  return (
    <div className="overflow-hidden">
      {/* Hero Section - Animated */}
      <section className="relative min-h-screen flex items-center bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 text-white overflow-hidden">
        {/* Animated Background Elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-500 rounded-full opacity-10 blur-3xl animate-pulse"></div>
          <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-cyan-500 rounded-full opacity-10 blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-blue-400 rounded-full opacity-5 blur-3xl animate-pulse" style={{ animationDelay: '2s' }}></div>
        </div>

        {/* Floating Icons */}
        <div className="absolute inset-0 pointer-events-none">
          <ShoppingBagIcon className="absolute top-20 left-10 w-12 h-12 text-blue-300 opacity-10 animate-float" />
          <TagIcon className="absolute top-40 right-20 w-16 h-16 text-cyan-300 opacity-10 animate-float" style={{ animationDelay: '1s' }} />
          <GiftIcon className="absolute bottom-32 left-1/4 w-14 h-14 text-blue-300 opacity-10 animate-float" style={{ animationDelay: '2s' }} />
          <SparklesIcon className="absolute bottom-20 right-1/3 w-10 h-10 text-cyan-300 opacity-15 animate-float" style={{ animationDelay: '1.5s' }} />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32 z-10">
          <div className={`text-center transform transition-all duration-1000 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
            <div className="inline-flex items-center bg-gradient-to-r from-blue-500 to-cyan-500 backdrop-blur-sm rounded-full px-6 py-2 mb-8 shadow-lg">
              <SparklesIcon className="w-5 h-5 mr-2 text-white" />
              <span className="text-sm font-bold text-white">Nueva Colección 2025</span>
            </div>
            
            <h1 className="text-6xl md:text-7xl lg:text-8xl font-extrabold mb-6 leading-tight">
              <span className="block text-white drop-shadow-2xl">
                TiendaOnline
              </span>
            </h1>
            
            <p className="text-xl md:text-2xl mb-12 text-gray-200 max-w-3xl mx-auto font-light drop-shadow-lg">
              Descubre productos extraordinarios con ofertas increíbles.
              <br />
              <span className="font-bold text-cyan-400">Tu destino de compras favorito</span>
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Link 
                to="/products" 
                className="group relative inline-flex items-center px-8 py-4 bg-gradient-to-r from-blue-600 to-cyan-600 text-white font-bold rounded-full shadow-2xl hover:from-blue-500 hover:to-cyan-500 transition-all duration-300 hover:scale-105"
              >
                <span className="relative z-10 flex items-center">
                  Ver Productos
                  <ArrowRightIcon className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                </span>
              </Link>
              
              <Link 
                to="/products" 
                className="inline-flex items-center px-8 py-4 bg-white text-blue-600 font-bold rounded-full hover:bg-gray-100 transition-all duration-300 hover:scale-105 shadow-xl"
              >
                <TagIcon className="w-5 h-5 mr-2" />
                Ver Ofertas
              </Link>
            </div>

            {/* Scroll Indicator */}
            <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 animate-bounce">
              <div className="w-6 h-10 border-2 border-cyan-400 rounded-full p-1">
                <div className="w-1.5 h-3 bg-cyan-400 rounded-full mx-auto animate-pulse"></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="relative -mt-20 z-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-3xl shadow-2xl p-8 grid grid-cols-2 md:grid-cols-4 gap-6 border border-gray-100">
            {stats.map((stat, index) => (
              <div 
                key={index}
                className="text-center transform hover:scale-110 transition-transform duration-300"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <stat.icon className="w-8 h-8 mx-auto mb-2 text-blue-600" />
                <div className="text-3xl font-bold text-gray-900 mb-1">{stat.number}</div>
                <div className="text-sm text-gray-600">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section - Enhanced */}
      <section className="py-24 bg-gradient-to-b from-white to-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              ¿Por qué elegirnos?
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Ofrecemos la mejor experiencia de compra con beneficios exclusivos
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div
                key={index}
                className="group relative bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2"
                style={{ 
                  animationDelay: `${feature.delay}ms`,
                  animation: isVisible ? 'slideUp 0.6s ease-out forwards' : 'none'
                }}
              >
                {/* Gradient Background on Hover */}
                <div className={`absolute inset-0 bg-gradient-to-br ${feature.color} opacity-0 group-hover:opacity-10 rounded-2xl transition-opacity duration-300`}></div>
                
                {/* Icon */}
                <div className={`relative mb-6 w-16 h-16 mx-auto bg-gradient-to-br ${feature.color} rounded-2xl flex items-center justify-center transform group-hover:rotate-6 group-hover:scale-110 transition-all duration-300 shadow-lg`}>
                  <feature.icon className="w-8 h-8 text-white" />
                </div>
                
                {/* Content */}
                <h3 className="text-xl font-bold text-gray-900 mb-3 text-center">
                  {feature.title}
                </h3>
                <p className="text-gray-600 text-center leading-relaxed">
                  {feature.description}
                </p>

                {/* Decorative Corner */}
                <div className="absolute top-4 right-4 w-2 h-2 bg-primary-400 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"></div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section - Enhanced */}
      <section className="relative py-24 bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 text-white overflow-hidden">
        {/* Animated Background */}
        <div className="absolute inset-0">
          <div className="absolute top-0 left-0 w-full h-full bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxwYXRoIGQ9Ik0zNiAxOGMzLjMxNCAwIDYgMi42ODYgNiA2cy0yLjY4NiA2LTYgNi02LTIuNjg2LTYtNiAyLjY4Ni02IDYtNiIgc3Ryb2tlPSJyZ2JhKDI1NSwgMjU1LCAyNTUsIDAuMSkiLz48L2c+PC9zdmc+')] opacity-20"></div>
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center z-10">
          <div className="max-w-3xl mx-auto">
            <BoltIcon className="w-16 h-16 mx-auto mb-6 text-cyan-400 animate-pulse" />
            
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-white drop-shadow-xl">
              ¿Listo para empezar tu experiencia de compra?
            </h2>
            
            <p className="text-xl md:text-2xl text-gray-300 mb-10 font-light drop-shadow-lg">
              Explora miles de productos con ofertas especiales y envío gratis
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link 
                to="/products" 
                className="group inline-flex items-center justify-center px-8 py-4 bg-gradient-to-r from-blue-600 to-cyan-600 text-white font-bold rounded-full shadow-xl hover:from-blue-500 hover:to-cyan-500 transition-all duration-300 hover:scale-105"
              >
                Explorar Catálogo
                <ShoppingBagIcon className="w-5 h-5 ml-2 group-hover:rotate-12 transition-transform" />
              </Link>
              
              <Link 
                to="/products" 
                className="inline-flex items-center justify-center px-8 py-4 bg-white text-blue-600 font-bold rounded-full hover:bg-gray-100 transition-all duration-300 hover:scale-105 shadow-xl"
              >
                <StarIcon className="w-5 h-5 mr-2" />
                Ver Destacados
              </Link>
            </div>

            {/* Trust Badges */}
            <div className="mt-12 flex flex-wrap justify-center gap-6 text-sm text-white font-medium">
              <div className="flex items-center bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full border border-white/20">
                <ShieldCheckIcon className="w-5 h-5 mr-2 text-cyan-400" />
                Compra Segura
              </div>
              <div className="flex items-center bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full border border-white/20">
                <TruckIcon className="w-5 h-5 mr-2 text-cyan-400" />
                Envío Gratis
              </div>
              <div className="flex items-center bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full border border-white/20">
                <StarIcon className="w-5 h-5 mr-2 text-cyan-400" />
                Garantía Total
              </div>
            </div>
          </div>
        </div>
      </section>

      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-20px); }
        }
        
        @keyframes gradient {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }
        
        @keyframes slideUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        .animate-float {
          animation: float 3s ease-in-out infinite;
        }
        
        .animate-gradient {
          background-size: 200% auto;
          animation: gradient 3s linear infinite;
        }
      `}</style>
    </div>
  )
}
