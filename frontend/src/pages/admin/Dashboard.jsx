import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { 
  ShoppingBagIcon, 
  TagIcon, 
  UserGroupIcon, 
  Cog6ToothIcon, 
  Squares2X2Icon, 
  SparklesIcon,
  PaintBrushIcon,
  ClipboardDocumentListIcon,
  ChartBarIcon,
  RocketLaunchIcon,
  ArrowTrendingUpIcon,
  ArrowTrendingDownIcon,
  ExclamationTriangleIcon,
  CurrencyDollarIcon,
  ArrowPathIcon,
  EnvelopeIcon,
  PaperAirplaneIcon
} from '@heroicons/react/24/outline';
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { useSiteConfig } from '../../hooks/useSiteConfig';
import { dashboardService } from '../../services/dashboard';

export default function Dashboard() {
  const config = useSiteConfig();
  const { theme } = config;
  const { colors } = theme;

  // Estados para las estadísticas
  const [stats, setStats] = useState(null);
  const [salesChart, setSalesChart] = useState([]);
  const [topProducts, setTopProducts] = useState([]);
  const [recentOrders, setRecentOrders] = useState([]);
  const [lowStock, setLowStock] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [lastUpdate, setLastUpdate] = useState(null);

  // Cargar datos al montar el componente
  useEffect(() => {
    loadDashboardData();
  }, []);

  const loadDashboardData = async () => {
    try {
      setLoading(true);
      setError(null);

      // Cargar todas las estadísticas en paralelo
      const [statsData, chartData, topProductsData, ordersData, stockData] = await Promise.all([
        dashboardService.getStats(),
        dashboardService.getSalesChart(7),
        dashboardService.getTopProducts(5),
        dashboardService.getRecentOrders(5),
        dashboardService.getLowStock(10, 5),
      ]);

      setStats(statsData);
      setSalesChart(chartData);
      setTopProducts(topProductsData);
      setRecentOrders(ordersData);
      setLowStock(stockData);
      setLastUpdate(new Date());
    } catch (err) {
      console.error('Error loading dashboard data:', err);
      setError('Error al cargar los datos del dashboard');
    } finally {
      setLoading(false);
    }
  };

  // Calcular porcentaje de cambio
  const calculateChange = (current, previous) => {
    if (!previous || previous === 0) return 0;
    return (((current - previous) / previous) * 100).toFixed(1);
  };

  // Formatear moneda
  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('es-MX', {
      style: 'currency',
      currency: 'MXN',
    }).format(amount || 0);
  };

  // Componente Skeleton para Stats
  const StatsSkeleton = () => (
    <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-4 shadow-lg border border-gray-100 animate-pulse">
      <div className="flex items-start justify-between mb-2">
        <div className="h-8 bg-gray-200 rounded w-16"></div>
        <div className="w-6 h-6 bg-gray-200 rounded"></div>
      </div>
      <div className="h-4 bg-gray-200 rounded w-20 mb-1"></div>
      <div className="h-3 bg-gray-200 rounded w-24"></div>
    </div>
  );

  // Componente Skeleton para Revenue Cards
  const RevenueCardSkeleton = ({ gradient = false }) => (
    <div className={`${gradient ? 'bg-gradient-to-br from-gray-200 to-gray-300' : 'bg-white'} rounded-2xl p-6 shadow-lg ${!gradient && 'border border-gray-100'} animate-pulse`}>
      <div className="flex items-center justify-between mb-2">
        <div className="h-4 bg-gray-300 rounded w-24"></div>
        <div className="w-6 h-6 bg-gray-300 rounded"></div>
      </div>
      <div className="h-8 bg-gray-300 rounded w-32 mb-1"></div>
      <div className="h-3 bg-gray-300 rounded w-40"></div>
    </div>
  );

  // Componente Skeleton para Charts
  const ChartSkeleton = () => (
    <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
      <div className="flex items-center mb-4 animate-pulse">
        <div className="w-6 h-6 bg-gray-200 rounded mr-2"></div>
        <div className="h-6 bg-gray-200 rounded w-48"></div>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Chart 1 - Line Chart Skeleton */}
        <div>
          <div className="h-4 bg-gray-200 rounded w-32 mb-3 animate-pulse"></div>
          <div className="space-y-2">
            <div className="h-64 bg-gradient-to-t from-gray-100 to-gray-50 rounded-lg p-4 relative overflow-hidden">
              {/* Grid lines */}
              <div className="absolute inset-0 flex flex-col justify-between p-4">
                {Array(5).fill(0).map((_, i) => (
                  <div key={i} className="border-t border-gray-200"></div>
                ))}
              </div>
              
              {/* Line chart simulation */}
              <svg className="w-full h-full opacity-30" viewBox="0 0 100 100" preserveAspectRatio="none">
                <polyline
                  points="0,60 14,40 28,55 42,30 56,45 70,35 84,40 100,25"
                  fill="none"
                  stroke={colors.primary.hex}
                  strokeWidth="2"
                  className="animate-pulse"
                />
              </svg>
              
              {/* X-axis labels */}
              <div className="absolute bottom-0 left-0 right-0 flex justify-between px-4 pb-2">
                {Array(7).fill(0).map((_, i) => (
                  <div key={i} className="h-2 bg-gray-200 rounded w-6 animate-pulse"></div>
                ))}
              </div>
            </div>
          </div>
        </div>
        
        {/* Chart 2 - Bar Chart Skeleton */}
        <div>
          <div className="h-4 bg-gray-200 rounded w-32 mb-3 animate-pulse"></div>
          <div className="space-y-2">
            <div className="h-64 bg-gradient-to-t from-gray-100 to-gray-50 rounded-lg flex items-end justify-around p-4 gap-2">
              {[60, 75, 50, 85, 65, 80, 70].map((height, i) => (
                <div 
                  key={i} 
                  className="bg-gradient-to-t from-gray-300 to-gray-200 rounded-t animate-pulse" 
                  style={{ 
                    height: `${height}%`, 
                    width: '12%',
                    animationDelay: `${i * 0.1}s`
                  }}
                ></div>
              ))}
            </div>
            {/* X-axis labels */}
            <div className="flex justify-between px-2">
              {Array(7).fill(0).map((_, i) => (
                <div 
                  key={i} 
                  className="h-2 bg-gray-200 rounded w-6 animate-pulse" 
                  style={{ animationDelay: `${i * 0.1}s` }}
                ></div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  // Componente Skeleton para Top Products
  const TopProductsSkeleton = () => (
    <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100 animate-pulse">
      <div className="flex items-center mb-4">
        <div className="w-5 h-5 bg-gray-200 rounded mr-2"></div>
        <div className="h-5 bg-gray-200 rounded w-40"></div>
      </div>
      <div className="space-y-3">
        {Array(5).fill(0).map((_, index) => (
          <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-xl">
            <div className="flex items-center gap-3 flex-1">
              <div className="w-8 h-8 bg-gray-200 rounded-lg"></div>
              <div className="flex-1 space-y-2">
                <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                <div className="h-3 bg-gray-200 rounded w-1/2"></div>
              </div>
            </div>
            <div className="space-y-1">
              <div className="h-4 bg-gray-200 rounded w-16"></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  // Componente Skeleton para Low Stock
  const LowStockSkeleton = () => (
    <div className="bg-white rounded-2xl p-6 shadow-lg border border-red-100 animate-pulse">
      <div className="flex items-center mb-4">
        <div className="w-5 h-5 bg-red-200 rounded mr-2"></div>
        <div className="h-5 bg-gray-200 rounded w-44"></div>
      </div>
      <div className="space-y-3">
        {Array(5).fill(0).map((_, index) => (
          <div key={index} className="flex items-center justify-between p-3 bg-red-50 rounded-xl border border-red-100">
            <div className="flex-1 space-y-2">
              <div className="h-4 bg-red-200 rounded w-2/3"></div>
              <div className="h-3 bg-red-200 rounded w-1/3"></div>
            </div>
            <div className="space-y-1 text-right">
              <div className="h-4 bg-red-200 rounded w-20"></div>
              <div className="h-3 bg-red-200 rounded w-16"></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const menuItems = [
    {
      id: 'home-editor',
      title: 'Editor del Home',
      description: 'Personaliza Hero, Stats, Features y CTA',
      icon: Squares2X2Icon,
      link: '/admin/home-editor',
      gradient: `linear-gradient(135deg, ${colors.primary.hex}, ${colors.secondary.hex})`,
      badge: 'CMS Visual',
      stats: '4 secciones',
      featured: true,
    },
    {
      id: 'settings',
      title: 'Configuración Global',
      description: 'Colores, logo, información de empresa',
      icon: PaintBrushIcon,
      link: '/admin/settings',
      gradient: 'linear-gradient(135deg, #8b5cf6, #ec4899)',
      badge: 'Personalizar',
      stats: 'Colores y más',
      featured: true,
    },
    {
      id: 'products',
      title: 'Productos',
      description: 'Gestionar catálogo de productos',
      icon: ShoppingBagIcon,
      link: '/admin/products',
      gradient: 'linear-gradient(135deg, #06b6d4, #3b82f6)',
      stats: 'Catálogo',
    },
    {
      id: 'categories',
      title: 'Categorías',
      description: 'Organizar productos por categorías',
      icon: TagIcon,
      link: '/admin/categories',
      gradient: 'linear-gradient(135deg, #10b981, #059669)',
      stats: 'Organización',
    },
    {
      id: 'orders',
      title: 'Órdenes',
      description: 'Ver todas las órdenes de clientes',
      icon: ClipboardDocumentListIcon,
      link: '/orders',
      gradient: 'linear-gradient(135deg, #f59e0b, #ea580c)',
      stats: 'Ventas',
    },
    {
      id: 'users',
      title: 'Usuarios',
      description: 'Gestionar usuarios del sistema',
      icon: UserGroupIcon,
      link: '/admin/users',
      gradient: 'linear-gradient(135deg, #64748b, #475569)',
      stats: 'Gestión',
    },
    // Temporalmente ocultos
    // {
    //   id: 'email-templates',
    //   title: 'Email Templates',
    //   description: 'Plantillas de correo personalizables',
    //   icon: EnvelopeIcon,
    //   link: '/admin/email-templates',
    //   gradient: 'linear-gradient(135deg, #06b6d4, #3b82f6)',
    //   stats: 'Correos',
    // },
    // {
    //   id: 'newsletter',
    //   title: 'Newsletter',
    //   description: 'Gestionar suscriptores y enviar boletines',
    //   icon: PaperAirplaneIcon,
    //   link: '/admin/newsletter',
    //   gradient: 'linear-gradient(135deg, #8b5cf6, #ec4899)',
    //   stats: 'Marketing',
    // },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-purple-50">
      {/* Header Section */}
      <div className="relative overflow-hidden">
        <div 
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: `radial-gradient(circle at 20% 50%, ${colors.primary.hex} 0%, transparent 50%),
                              radial-gradient(circle at 80% 80%, ${colors.secondary.hex} 0%, transparent 50%)`
          }}
        ></div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 pb-8">
          <div className="text-center mb-4">
            <div className="inline-flex items-center justify-center p-3 rounded-2xl mb-4"
              style={{ 
                background: `linear-gradient(135deg, ${colors.primary.hex}, ${colors.secondary.hex})`,
                boxShadow: `0 10px 40px -10px ${colors.primary.hex}50`
              }}
            >
              <RocketLaunchIcon className="w-8 h-8 text-white" />
            </div>
            
            <div className="flex items-center justify-center gap-4 mb-3">
              <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900">
                Panel de Administración
              </h1>
              <button
                onClick={loadDashboardData}
                disabled={loading}
                className={`p-2 rounded-xl bg-white shadow-lg border border-gray-200 hover:shadow-xl transition-all ${
                  loading ? 'opacity-50 cursor-not-allowed' : 'hover:scale-110'
                }`}
                title="Actualizar datos"
              >
                <ArrowPathIcon 
                  className={`w-6 h-6 text-gray-700 ${loading ? 'animate-spin' : ''}`}
                />
              </button>
            </div>
            
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Gestiona tu tienda online desde un solo lugar. Personaliza, configura y controla todo tu negocio.
            </p>
            
            {/* Última actualización */}
            {lastUpdate && !loading && (
              <div className="mt-3 text-xs text-gray-500">
                Última actualización: {lastUpdate.toLocaleTimeString('es-MX', { 
                  hour: '2-digit', 
                  minute: '2-digit',
                  second: '2-digit'
                })}
              </div>
            )}
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8">
            {loading ? (
              // Loading skeleton con forma correcta
              Array(4).fill(0).map((_, index) => (
                <StatsSkeleton key={index} />
              ))
            ) : stats ? (
              [
                { 
                  label: 'Productos', 
                  value: stats.products.total, 
                  color: colors.primary.hex,
                  icon: ShoppingBagIcon,
                  subtitle: `${stats.products.active} en stock`
                },
                { 
                  label: 'Categorías', 
                  value: stats.categories.total, 
                  color: colors.secondary.hex,
                  icon: TagIcon,
                  subtitle: `${stats.categories.withProducts} con productos`
                },
                { 
                  label: 'Órdenes', 
                  value: stats.orders.total, 
                  color: '#f59e0b',
                  icon: ClipboardDocumentListIcon,
                  subtitle: `${stats.orders.pending} pendientes`
                },
                { 
                  label: 'Usuarios', 
                  value: stats.users.total, 
                  color: '#8b5cf6',
                  icon: UserGroupIcon,
                  subtitle: `${stats.users.customers} clientes`
                },
              ].map((stat, index) => (
                <div key={index} className="bg-white/80 backdrop-blur-sm rounded-2xl p-4 shadow-lg border border-gray-100 hover:shadow-xl transition-shadow">
                  <div className="flex items-start justify-between mb-2">
                    <div className="text-3xl font-bold" style={{ color: stat.color }}>
                      {stat.value}
                    </div>
                    <stat.icon className="w-6 h-6 opacity-50" style={{ color: stat.color }} />
                  </div>
                  <div className="text-sm text-gray-900 font-medium mb-1">{stat.label}</div>
                  <div className="text-xs text-gray-500">{stat.subtitle}</div>
                </div>
              ))
            ) : error ? (
              // Error state
              <div className="col-span-2 md:col-span-4">
                <div className="bg-red-50 border-2 border-red-200 rounded-2xl p-6 text-center">
                  <ExclamationTriangleIcon className="w-12 h-12 text-red-500 mx-auto mb-3" />
                  <h3 className="text-lg font-bold text-red-900 mb-2">Error al cargar estadísticas</h3>
                  <p className="text-sm text-red-600 mb-4">{error}</p>
                  <button
                    onClick={loadDashboardData}
                    className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors font-medium"
                  >
                    Reintentar
                  </button>
                </div>
              </div>
            ) : null}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Revenue & Sales Section */}
        {loading ? (
          <div className="mb-8 grid grid-cols-1 lg:grid-cols-3 gap-6">
            <RevenueCardSkeleton gradient={true} />
            <RevenueCardSkeleton />
            <RevenueCardSkeleton />
          </div>
        ) : stats && (
          <div className="mb-8 grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Revenue Cards */}
            <div className="bg-gradient-to-br from-green-500 to-emerald-600 rounded-2xl p-6 text-white shadow-xl">
              <div className="flex items-center justify-between mb-2">
                <div className="text-sm font-medium opacity-90">Ingresos Totales</div>
                <CurrencyDollarIcon className="w-6 h-6 opacity-75" />
              </div>
              <div className="text-3xl font-bold mb-1">{formatCurrency(stats.revenue.total)}</div>
              <div className="text-sm opacity-75">Todas las ventas completadas</div>
            </div>

            <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
              <div className="flex items-center justify-between mb-2">
                <div className="text-sm font-medium text-gray-600">Este Mes</div>
                {stats.revenue.thisMonth > stats.revenue.lastMonth ? (
                  <ArrowTrendingUpIcon className="w-5 h-5 text-green-500" />
                ) : (
                  <ArrowTrendingDownIcon className="w-5 h-5 text-red-500" />
                )}
              </div>
              <div className="text-2xl font-bold text-gray-900 mb-1">
                {formatCurrency(stats.revenue.thisMonth)}
              </div>
              {stats.revenue.lastMonth > 0 && (
                <div className={`text-xs font-medium ${
                  stats.revenue.thisMonth > stats.revenue.lastMonth ? 'text-green-600' : 'text-red-600'
                }`}>
                  {stats.revenue.thisMonth > stats.revenue.lastMonth ? '↑' : '↓'} 
                  {Math.abs(calculateChange(stats.revenue.thisMonth, stats.revenue.lastMonth))}% vs mes anterior
                </div>
              )}
            </div>

            <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
              <div className="flex items-center justify-between mb-2">
                <div className="text-sm font-medium text-gray-600">Mes Anterior</div>
                <ChartBarIcon className="w-5 h-5 text-gray-400" />
              </div>
              <div className="text-2xl font-bold text-gray-900 mb-1">
                {formatCurrency(stats.revenue.lastMonth)}
              </div>
              <div className="text-xs text-gray-500">
                {stats.orders.completed} órdenes completadas
              </div>
            </div>
          </div>
        )}

        {/* Sales Chart */}
        {loading ? (
          <div className="mb-8">
            <ChartSkeleton />
          </div>
        ) : salesChart.length > 0 && (
          <div className="mb-8 bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
            <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
              <ChartBarIcon className="w-6 h-6 mr-2" style={{ color: colors.primary.hex }} />
              Ventas de los Últimos 7 Días
            </h3>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Line Chart - Revenue */}
              <div>
                <div className="text-sm font-medium text-gray-600 mb-3">Ingresos Diarios</div>
                <ResponsiveContainer width="100%" height={250}>
                  <LineChart data={salesChart}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                    <XAxis 
                      dataKey="dateFormatted" 
                      tick={{ fontSize: 12 }}
                      stroke="#9ca3af"
                    />
                    <YAxis 
                      tick={{ fontSize: 12 }}
                      stroke="#9ca3af"
                      tickFormatter={(value) => `$${value}`}
                    />
                    <Tooltip 
                      formatter={(value) => [formatCurrency(value), 'Ingresos']}
                      contentStyle={{ 
                        backgroundColor: 'white',
                        border: '1px solid #e5e7eb',
                        borderRadius: '8px',
                        boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                      }}
                    />
                    <Line 
                      type="monotone" 
                      dataKey="revenue" 
                      stroke={colors.primary.hex}
                      strokeWidth={3}
                      dot={{ fill: colors.primary.hex, r: 4 }}
                      activeDot={{ r: 6 }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>

              {/* Bar Chart - Orders */}
              <div>
                <div className="text-sm font-medium text-gray-600 mb-3">Órdenes Diarias</div>
                <ResponsiveContainer width="100%" height={250}>
                  <BarChart data={salesChart}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                    <XAxis 
                      dataKey="dateFormatted" 
                      tick={{ fontSize: 12 }}
                      stroke="#9ca3af"
                    />
                    <YAxis 
                      tick={{ fontSize: 12 }}
                      stroke="#9ca3af"
                    />
                    <Tooltip 
                      formatter={(value) => [value, 'Órdenes']}
                      contentStyle={{ 
                        backgroundColor: 'white',
                        border: '1px solid #e5e7eb',
                        borderRadius: '8px',
                        boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                      }}
                    />
                    <Bar 
                      dataKey="orders" 
                      fill={colors.secondary.hex}
                      radius={[8, 8, 0, 0]}
                    />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
        )}

        {/* Top Products & Alerts */}
        {loading ? (
          <div className="mb-8 grid grid-cols-1 lg:grid-cols-2 gap-6">
            <TopProductsSkeleton />
            <LowStockSkeleton />
          </div>
        ) : (topProducts.length > 0 || lowStock.length > 0) && (
          <div className="mb-8 grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Top Products */}
            {topProducts.length > 0 && (
              <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
                <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center">
                  <SparklesIcon className="w-5 h-5 mr-2" style={{ color: colors.primary.hex }} />
                  Productos Más Vendidos
                </h3>
                <div className="space-y-3">
                  {topProducts.map((product, index) => (
                    <div key={product.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors">
                      <div className="flex items-center gap-3 flex-1">
                        <div 
                          className="w-8 h-8 rounded-lg flex items-center justify-center font-bold text-white text-sm"
                          style={{ 
                            background: `linear-gradient(135deg, ${colors.primary.hex}, ${colors.secondary.hex})`
                          }}
                        >
                          {index + 1}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="font-medium text-gray-900 truncate">{product.name}</div>
                          <div className="text-xs text-gray-500">
                            {product.total_sold} vendidos · {formatCurrency(product.total_revenue)}
                          </div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-sm font-bold text-gray-900">
                          {formatCurrency(product.price)}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Low Stock Alert */}
            {lowStock.length > 0 && (
              <div className="bg-white rounded-2xl p-6 shadow-lg border border-red-100">
                <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center">
                  <ExclamationTriangleIcon className="w-5 h-5 mr-2 text-red-500" />
                  Productos con Bajo Stock
                </h3>
                <div className="space-y-3">
                  {lowStock.map((product) => (
                    <div key={product.id} className="flex items-center justify-between p-3 bg-red-50 rounded-xl border border-red-100">
                      <div className="flex-1 min-w-0">
                        <div className="font-medium text-gray-900 truncate">{product.name}</div>
                        <div className="text-xs text-gray-500">{formatCurrency(product.price)}</div>
                      </div>
                      <div className="text-right">
                        <div className={`text-sm font-bold ${
                          product.stock <= 3 ? 'text-red-600' : 'text-orange-600'
                        }`}>
                          {product.stock} unidades
                        </div>
                        <div className="text-xs text-gray-500">Reponer stock</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        {/* Featured Cards */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
            <SparklesIcon className="w-7 h-7 mr-2" style={{ color: colors.primary.hex }} />
            Destacados
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {menuItems.filter(item => item.featured).map((item) => (
              <Link
                key={item.id}
                to={item.link}
                className="group relative bg-white rounded-3xl p-8 shadow-xl hover:shadow-2xl transition-all duration-300 overflow-hidden border-2 border-gray-100 hover:border-transparent transform hover:-translate-y-2"
              >
                {/* Gradient Background on Hover */}
                <div 
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  style={{ background: item.gradient }}
                ></div>
                
                {/* Content */}
                <div className="relative z-10">
                  <div className="flex items-start justify-between mb-4">
                    <div 
                      className="p-4 rounded-2xl shadow-lg group-hover:scale-110 transition-transform duration-300"
                      style={{ background: item.gradient }}
                    >
                      <item.icon className="w-8 h-8 text-white" />
                    </div>
                    
                    <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-bold bg-gradient-to-r from-yellow-400 to-orange-500 text-white shadow-md">
                      {item.badge}
                    </span>
                  </div>
                  
                  <h3 className="text-2xl font-bold text-gray-900 mb-2 group-hover:text-white transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-gray-600 mb-4 group-hover:text-white/90 transition-colors">
                    {item.description}
                  </p>
                  
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-gray-500 group-hover:text-white/80 transition-colors">
                      {item.stats}
                    </span>
                    <span className="text-gray-900 group-hover:text-white font-semibold">
                      Acceder →
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* Other Options */}
        <div>
          <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
            <ChartBarIcon className="w-7 h-7 mr-2" style={{ color: colors.secondary.hex }} />
            Gestión
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {menuItems.filter(item => !item.featured).map((item) => (
              item.comingSoon ? (
                <div
                  key={item.id}
                  className="relative bg-white/50 backdrop-blur-sm rounded-2xl p-6 shadow-md border-2 border-dashed border-gray-300 cursor-not-allowed"
                >
                  <div className="absolute top-4 right-4">
                    <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-bold bg-gray-200 text-gray-600">
                      Próximamente
                    </span>
                  </div>
                  
                  <div 
                    className="w-14 h-14 rounded-xl flex items-center justify-center mb-4 opacity-50"
                    style={{ background: item.gradient }}
                  >
                    <item.icon className="w-7 h-7 text-white" />
                  </div>
                  
                  <h3 className="text-lg font-bold text-gray-400 mb-2">
                    {item.title}
                  </h3>
                  <p className="text-sm text-gray-400">
                    {item.description}
                  </p>
                </div>
              ) : (
                <Link
                  key={item.id}
                  to={item.link}
                  className="group relative bg-white rounded-2xl p-6 shadow-md hover:shadow-xl transition-all duration-300 border-2 border-gray-100 hover:border-transparent overflow-hidden transform hover:-translate-y-1"
                >
                  {/* Hover Background */}
                  <div 
                    className="absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity duration-300"
                    style={{ background: item.gradient }}
                  ></div>
                  
                  <div className="relative z-10">
                    <div 
                      className="w-14 h-14 rounded-xl flex items-center justify-center mb-4 shadow-md group-hover:scale-110 transition-transform duration-300"
                      style={{ background: item.gradient }}
                    >
                      <item.icon className="w-7 h-7 text-white" />
                    </div>
                    
                    <h3 className="text-lg font-bold text-gray-900 mb-2 group-hover:text-gray-900">
                      {item.title}
                    </h3>
                    <p className="text-sm text-gray-600 mb-3 group-hover:text-gray-700">
                      {item.description}
                    </p>
                    
                    <div className="text-xs font-semibold text-gray-500 group-hover:text-gray-700">
                      {item.stats}
                    </div>
                  </div>
                </Link>
              )
            ))}
          </div>
        </div>

        {/* Help Section */}
        <div className="mt-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-3xl p-8 text-white shadow-2xl">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="mb-4 md:mb-0">
              <h3 className="text-2xl font-bold mb-2">¿Necesitas ayuda?</h3>
              <p className="text-blue-100">
                Revisa nuestra documentación o contacta al soporte técnico
              </p>
            </div>
            <div className="flex gap-3">
              <button className="px-6 py-3 bg-white text-blue-600 font-bold rounded-xl hover:bg-blue-50 transition-colors shadow-lg">
                Ver Guías
              </button>
              <button className="px-6 py-3 bg-blue-700 text-white font-bold rounded-xl hover:bg-blue-800 transition-colors">
                Contactar Soporte
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
