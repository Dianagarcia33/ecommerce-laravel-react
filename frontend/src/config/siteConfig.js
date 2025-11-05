// 🎨 CONFIGURACIÓN CENTRALIZADA DEL SITIO
// Aquí puedes personalizar todos los aspectos visuales y textos del sitio

const defaultConfig = {
  // ============================================
  // 🏢 INFORMACIÓN DE LA EMPRESA
  // ============================================
  business: {
    name: 'TiendaOnline',
    slogan: 'Tu tienda favorita',
    description: 'Tu destino de compras online con los mejores productos y ofertas del mercado.',
    email: 'info@tienda.com',
    phone: '+1 234 567 890',
    address: '123 Calle Principal, Ciudad',
    
    // Redes sociales
    social: {
      facebook: '#',
      twitter: '#',
      instagram: '#',
      linkedin: '#',
    }
  },

  // ============================================
  // 🎨 TEMA Y COLORES
  // ============================================
  theme: {
    // Colores primarios (formato Tailwind + hex)
    colors: {
      primary: {
        from: 'cyan-400',    // Color principal degradado inicio
        to: 'cyan-600',      // Color principal degradado fin
        text: 'cyan-600',    // Color de texto principal
        hover: 'cyan-500',   // Color hover
        hex: '#22d3ee',      // Valor hexadecimal principal
        light: '#22d3ee',    // Hex claro
        dark: '#0891b2',     // Hex oscuro
      },
      secondary: {
        from: 'lime-400',    // Color secundario degradado inicio
        to: 'green-500',     // Color secundario degradado fin
        text: 'lime-600',    // Color de texto secundario
        hover: 'lime-500',   // Color hover
        hex: '#a3e635',      // Valor hexadecimal principal
        light: '#a3e635',    // Hex claro
        dark: '#65a30d',     // Hex oscuro
      },
      accent: {
        from: 'teal-400',
        to: 'teal-600',
        hex: '#2dd4bf',
      },
      background: {
        dark: 'slate-900',   // Fondo oscuro
        light: 'gray-50',    // Fondo claro
      }
    },

    // Esquema de colores preestablecidos (para cambio rápido)
    presets: {
      default: {
        primary: { from: 'cyan-400', to: 'cyan-600', text: 'cyan-600' },
        secondary: { from: 'lime-400', to: 'green-500', text: 'lime-600' },
      },
      purple: {
        primary: { from: 'purple-400', to: 'purple-600', text: 'purple-600' },
        secondary: { from: 'pink-400', to: 'pink-600', text: 'pink-600' },
      },
      blue: {
        primary: { from: 'blue-400', to: 'blue-600', text: 'blue-600' },
        secondary: { from: 'indigo-400', to: 'indigo-600', text: 'indigo-600' },
      },
      orange: {
        primary: { from: 'orange-400', to: 'orange-600', text: 'orange-600' },
        secondary: { from: 'amber-400', to: 'amber-600', text: 'amber-600' },
      },
      green: {
        primary: { from: 'emerald-400', to: 'emerald-600', text: 'emerald-600' },
        secondary: { from: 'teal-400', to: 'teal-600', text: 'teal-600' },
      },
      red: {
        primary: { from: 'rose-400', to: 'rose-600', text: 'rose-600' },
        secondary: { from: 'red-400', to: 'red-600', text: 'red-600' },
      }
    }
  },

  // ============================================
  // 📝 TEXTOS DEL HOME (Landing Page)
  // ============================================
  home: {
    hero: {
      badge: 'Nueva Colección 2025',
      title: 'TiendaOnline',
      subtitle: 'Descubre productos extraordinarios con ofertas increíbles.',
      description: 'Tu destino de compras favorito',
      primaryButton: 'Ver Productos',
      secondaryButton: 'Ver Ofertas',
    },

    stats: [
      { number: '10K+', label: 'Productos' },
      { number: '50K+', label: 'Clientes Felices' },
      { number: '99.9%', label: 'Satisfacción' },
      { number: '24/7', label: 'Soporte' }
    ],

    features: {
      title: '¿Por qué elegirnos?',
      subtitle: 'Ofrecemos la mejor experiencia de compra con beneficios exclusivos',
      items: [
        {
          title: 'Calidad Garantizada',
          description: 'Productos verificados y de la más alta calidad',
        },
        {
          title: 'Envío Rápido',
          description: 'Entrega express en 24-48 horas',
        },
        {
          title: 'Pago Seguro',
          description: 'Transacciones 100% protegidas',
        },
        {
          title: 'Ofertas Especiales',
          description: 'Descuentos y promociones exclusivas',
        }
      ]
    },

    cta: {
      title: '¿Listo para empezar tu experiencia de compra?',
      subtitle: 'Explora miles de productos con ofertas especiales y envío gratis',
      primaryButton: 'Explorar Catálogo',
      secondaryButton: 'Ver Destacados',
      badges: [
        'Compra Segura',
        'Envío Gratis',
        'Garantía Total'
      ]
    }
  },

  // ============================================
  // 🛍️ TEXTOS DE PRODUCTOS
  // ============================================
  products: {
    hero: {
      badge: 'Catálogo Completo',
      title: 'Nuestros Productos',
      subtitle: 'Descubre nuestra selección exclusiva de productos de alta calidad',
    },
    searchPlaceholder: 'Buscar productos...',
    filterLabel: 'Filtrar:',
    allLabel: 'Todos',
    noResultsTitle: 'No se encontraron productos',
    loadingText: 'Cargando productos...',
    addToCartButton: 'Agregar',
    lowStockBadge: '¡Últimas {stock}!',
    outOfStockBadge: 'Agotado',
  },

  // ============================================
  // 🛒 TEXTOS DEL CARRITO
  // ============================================
  cart: {
    title: 'Carrito de Compras',
    subtitle: 'Revisa tus productos antes de finalizar la compra',
    emptyTitle: 'Tu carrito está vacío',
    emptySubtitle: 'Agrega algunos productos para comenzar a comprar',
    emptyButton: 'Explorar Productos',
    summaryTitle: 'Resumen del Pedido',
    subtotalLabel: 'Subtotal:',
    shippingLabel: 'Envío:',
    freeShipping: '¡Gratis!',
    totalLabel: 'Total:',
    checkoutButton: 'Proceder al Pago',
    continueButton: 'Continuar Comprando',
    removeButton: 'Eliminar',
    shippingThreshold: 50, // Monto mínimo para envío gratis
    shippingCost: 5, // Costo de envío
    freeShippingMessage: 'Agrega ${amount} más para envío gratis',
  },

  // ============================================
  // 💳 TEXTOS DEL CHECKOUT
  // ============================================
  checkout: {
    title: 'Finalizar Compra',
    subtitle: 'Completa tu orden y recibe tus productos',
    formTitle: 'Datos de Envío',
    summaryTitle: 'Resumen de la Orden',
    nameLabel: 'Nombre Completo',
    emailLabel: 'Email',
    phoneLabel: 'Teléfono',
    addressLabel: 'Dirección de Envío',
    notesLabel: 'Notas (Opcional)',
    namePlaceholder: 'Juan Pérez',
    emailPlaceholder: 'juan@email.com',
    phonePlaceholder: '+1 234 567 890',
    addressPlaceholder: 'Calle Principal 123, Apartamento 4B, Ciudad',
    notesPlaceholder: 'Instrucciones especiales de entrega...',
    submitButton: 'Confirmar Orden',
    processingButton: 'Procesando...',
    successMessage: '¡Orden creada exitosamente!',
    trustBadges: [
      'Compra Segura',
      'Envío Rápido',
      'Mejor Precio',
      'Garantizado'
    ]
  },

  // ============================================
  // 📦 TEXTOS DE ÓRDENES
  // ============================================
  orders: {
    title: 'Mis Órdenes',
    adminTitle: 'Todas las Órdenes',
    emptyMessage: 'No hay órdenes aún',
    orderNumber: 'Orden #',
    customerLabel: 'Cliente:',
    shippingLabel: 'Dirección de envío:',
    notesLabel: 'Notas:',
    totalLabel: 'Total:',
    statusLabels: {
      pending: 'Pendiente',
      processing: 'Procesando',
      completed: 'Completada',
      cancelled: 'Cancelada'
    }
  },

  // ============================================
  // 🔐 TEXTOS DE AUTENTICACIÓN
  // ============================================
  auth: {
    login: {
      title: 'Iniciar Sesión',
      subtitle: 'Accede a tu cuenta para continuar',
      emailLabel: 'Email',
      passwordLabel: 'Contraseña',
      submitButton: 'Ingresar',
      registerLink: '¿No tienes cuenta? Regístrate',
    },
    register: {
      title: 'Crear Cuenta',
      subtitle: 'Únete y comienza a comprar',
      nameLabel: 'Nombre Completo',
      emailLabel: 'Email',
      passwordLabel: 'Contraseña',
      confirmPasswordLabel: 'Confirmar Contraseña',
      submitButton: 'Registrarse',
      loginLink: '¿Ya tienes cuenta? Inicia sesión',
    }
  },

  // ============================================
  // 🎯 NAVEGACIÓN
  // ============================================
  navigation: {
    home: 'Inicio',
    products: 'Productos',
    cart: 'Carrito',
    orders: 'Órdenes',
    admin: 'Admin',
    login: 'Ingresar',
    register: 'Registrarse',
    logout: 'Salir',
    greeting: 'Hola,',
  },

  // ============================================
  // 📱 FOOTER
  // ============================================
  footer: {
    description: 'Tu destino de compras online con los mejores productos y ofertas del mercado. Calidad garantizada.',
    quickLinksTitle: 'Enlaces Rápidos',
    informationTitle: 'Información',
    contactTitle: 'Contacto',
    copyright: '© 2025 {businessName}. Todos los derechos reservados.',
    links: {
      about: 'Sobre Nosotros',
      terms: 'Términos y Condiciones',
      privacy: 'Política de Privacidad',
      cookies: 'Cookies',
    }
  },

  // ============================================
  // ⚙️ CONFIGURACIONES GENERALES
  // ============================================
  settings: {
    currency: '$',
    language: 'es',
    dateFormat: 'es-ES',
    itemsPerPage: 12,
    maxCartItems: 99,
    
    // Características habilitadas/deshabilitadas
    features: {
      reviews: false,
      wishlist: false,
      compareProducts: false,
      socialSharing: true,
      newsletter: false,
      livechat: false,
    }
  },

  // ============================================
  // 🎨 LOGOS Y RECURSOS
  // ============================================
  assets: {
    logo: '/src/assets/logos/logo.png',
    favicon: '/favicon.ico',
    defaultProductImage: 'https://via.placeholder.com/300',
    defaultUserAvatar: 'https://via.placeholder.com/100',
    logoSize: 56,          // Altura del logo en píxeles (default: 56px = h-14)
    logoShadow: {
      blur: 'sm',        // none, sm, md, lg, xl
      opacity: 30,       // 0-100
    }
  }
};

// Función para cargar configuración desde localStorage o usar la por defecto
const loadConfig = () => {
  try {
    const savedConfig = localStorage.getItem('siteConfig');
    if (savedConfig) {
      const parsed = JSON.parse(savedConfig);
      // Merge con defaultConfig para asegurar que existan todas las propiedades
      return { ...defaultConfig, ...parsed };
    }
  } catch (error) {
    console.error('Error al cargar configuración:', error);
  }
  return defaultConfig;
};

// Exportar la configuración actual
export const siteConfig = loadConfig();

// Exportar también la configuración por defecto por si se necesita
export { defaultConfig };

export default siteConfig;
