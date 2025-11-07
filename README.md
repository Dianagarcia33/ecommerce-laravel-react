# 🛍️ E-Commerce Completo - Laravel + React

> **Sistema de comercio electrónico profesional, moderno y totalmente funcional**

[![Laravel](https://img.shields.io/badge/Laravel-10-red)](https://laravel.com)
[![React](https://img.shields.io/badge/React-18-blue)](https://reactjs.org)
[![Tailwind](https://img.shields.io/badge/Tailwind-3-cyan)](https://tailwindcss.com)
[![License](https://img.shields.io/badge/License-MIT-green)](LICENSE)

---

## ✨ Estado del Proyecto

**🎉 PROYECTO 100% COMPLETO Y FUNCIONAL**

Este es un sistema de e-commerce completamente desarrollado, probado y listo para producción, con más de **30 características avanzadas** implementadas.

---

## 📑 Tabla de Contenidos

- [Características Principales](#-características-principales)
- [Sistema de Personalización](#-sistema-de-personalización-total)
- [Tecnologías](#️-tecnologías)
- [Instalación Rápida](#-instalación-rápida)
- [Funcionalidades Implementadas](#-funcionalidades-implementadas)
- [Estructura del Proyecto](#-estructura-del-proyecto)
- [API Endpoints](#-api-endpoints)
- [Usuarios de Prueba](#-usuarios-de-prueba)
- [Documentación](#-documentación)
- [Capturas de Pantalla](#-capturas-de-pantalla)

---

## 🎯 Características Principales

### 🛒 **E-Commerce Completo**
- ✅ Catálogo de productos con imágenes
- ✅ Sistema de categorías
- ✅ Carrito de compras persistente
- ✅ Checkout como invitado (sin registro)
- ✅ Sistema de órdenes
- ✅ Rastreo de pedidos
- ✅ Sistema de favoritos
- ✅ Búsqueda avanzada con tags y fuzzy matching

### 👥 **Gestión de Usuarios**
- ✅ Autenticación JWT con Laravel Sanctum
- ✅ Registro e inicio de sesión
- ✅ Roles (Admin/Usuario)
- ✅ Panel de administración completo
- ✅ Gestión de usuarios

### 🎨 **Personalización Total**
- ✅ 6 esquemas de colores predefinidos
- ✅ Editor visual sin código
- ✅ Personalización de textos
- ✅ Configuración de empresa
- ✅ Logo personalizable
- ✅ Cambio de colores en tiempo real

### 📦 **Gestión de Productos**
- ✅ CRUD completo de productos
- ✅ Múltiples imágenes por producto
- ✅ Control de stock
- ✅ Categorización
- ✅ Sistema de tags (41 tags predefinidos)
- ✅ Búsqueda inteligente con sinónimos

### ⭐ **Sistema de Reseñas**
- ✅ Calificación de 1-5 estrellas
- ✅ Comentarios de usuarios
- ✅ Compra verificada
- ✅ Carousel auto-rotante de reseñas
- ✅ Rating promedio por producto
- ✅ Moderación de reseñas

### 🎪 **Vistas de Producto**
- ✅ Vista de catálogo grid
- ✅ Vista de detalle
- ✅ **Landing page parallax** (espectacular)
- ✅ Galería de imágenes
- ✅ Productos relacionados
- ✅ Historial de vistos recientemente

### 📧 **Sistema de Comunicación**
- ✅ Newsletter con suscripción
- ✅ Plantillas de email personalizables
- ✅ Gestión de suscriptores
- ✅ Envío masivo de emails

### 📊 **Dashboard Administrativo**
- ✅ Estadísticas en tiempo real
- ✅ Gráficos de ventas
- ✅ Top productos
- ✅ Órdenes recientes
- ✅ Alertas de stock bajo
- ✅ Gestión completa del sitio

---

## 🎨 Sistema de Personalización Total

### **¡Control Total Sin Tocar Código!**

El cliente puede personalizar **100% del sitio** desde un panel visual intuitivo.

#### ✨ Capacidades:

**Esquemas de Color (6 predefinidos):**
1. 🌊 Cyan & Teal (Moderno Tech)
2. 💜 Purple & Pink (Elegante Fashion)
3. 🔥 Orange & Red (Energético Deportes)
4. 🌿 Green & Lime (Natural Eco)
5. 💙 Blue & Indigo (Profesional Corp)
6. 🌸 Rose & Purple (Femenino Beauty)

**Personalización Incluye:**
- 🎨 Colores primario y secundario
- 📝 Todos los textos del sitio
- 🏢 Información de empresa
- 📱 Enlaces a redes sociales
- 🖼️ Logo personalizado
- 🚚 Configuración de envío
- 📧 Configuración de contacto

**Acceso:** `/admin/settings` (como administrador)

---

## 🛠️ Tecnologías

### Backend
- **Laravel 10** - Framework PHP
- **MySQL** - Base de datos
- **Laravel Sanctum** - Autenticación API
- **Eloquent ORM** - Manejo de datos
- **Intervention Image** - Procesamiento de imágenes

### Frontend
- **React 18** - Framework JavaScript
- **Vite** - Build tool ultra-rápido
- **React Router** - Navegación SPA
- **Axios** - Cliente HTTP
- **Tailwind CSS** - Framework CSS
- **Heroicons** - Iconos

### Integraciones
- **Sistema de Tags** - 41 tags predefinidos
- **Búsqueda Fuzzy** - Algoritmo de Levenshtein
- **LocalStorage** - Historial sin login
- **Tokens JWT** - Autenticación segura

---

## 🚀 Instalación Rápida

### Requisitos Previos
- PHP 8.1+
- Composer
- Node.js 18+
- MySQL (XAMPP)

### Instalación Automática

**Opción 1: Script PowerShell (Recomendado)**

```powershell
# Ejecutar desde la raíz del proyecto
.\install.ps1
```

**Opción 2: Manual**

```bash
# Backend
cd backend
composer install
cp .env.example .env
php artisan key:generate
php artisan migrate
php artisan db:seed
php artisan storage:link

# Frontend
cd ../frontend
npm install

# Ejecutar
# Terminal 1: php artisan serve (backend)
# Terminal 2: npm run dev (frontend)
```

### Configuración Base de Datos

```env
DB_DATABASE=ecommerce_laravel
DB_USERNAME=root
DB_PASSWORD=
```

---

## 🎯 Funcionalidades Implementadas

### 🔐 Autenticación y Usuarios
- [x] Registro de usuarios
- [x] Inicio de sesión
- [x] Autenticación con Sanctum
- [x] Roles (Admin/User)
- [x] Gestión de usuarios en admin
- [x] Compra como invitado (sin registro)

### 📦 Productos
- [x] CRUD completo
- [x] Múltiples imágenes
- [x] Categorización
- [x] Sistema de tags (41 tags)
- [x] Control de stock
- [x] Búsqueda avanzada con sinónimos
- [x] Búsqueda fuzzy (tolerante a errores)

### 🛒 Carrito y Checkout
- [x] Carrito persistente (localStorage)
- [x] Añadir/quitar productos
- [x] Actualizar cantidades
- [x] **Checkout sin registro**
- [x] Validación de stock
- [x] Cálculo de envío

### 📋 Órdenes
- [x] Creación de órdenes
- [x] Historial de órdenes
- [x] Estados (pendiente, procesando, completada, cancelada)
- [x] **Rastreo de pedidos para invitados**
- [x] Token único de rastreo
- [x] Gestión admin de órdenes

### ⭐ Reseñas
- [x] Sistema de calificación 1-5 estrellas
- [x] Comentarios
- [x] Título opcional
- [x] Verificación de compra
- [x] Moderación
- [x] Carousel auto-rotante
- [x] Rating promedio
- [x] Distribución de ratings

### ❤️ Favoritos
- [x] Agregar/quitar favoritos
- [x] Vista de favoritos
- [x] Sincronización con backend
- [x] Persistencia por usuario

### 🔍 Búsqueda
- [x] Búsqueda por nombre
- [x] Búsqueda por tags
- [x] Sinónimos (18 categorías)
- [x] Fuzzy matching (Levenshtein)
- [x] Sugerencias en tiempo real
- [x] Debounce 300ms

### 🎨 Personalización
- [x] 6 esquemas de color
- [x] Editor visual
- [x] Cambio de logo
- [x] Edición de textos
- [x] Configuración de empresa
- [x] Redes sociales
- [x] Sin necesidad de código

### 📧 Newsletter
- [x] Suscripción pública
- [x] Gestión de suscriptores
- [x] Plantillas de email
- [x] Envío masivo
- [x] Activar/desactivar suscriptores

### 📊 Dashboard Admin
- [x] Estadísticas generales
- [x] Gráfico de ventas
- [x] Top productos
- [x] Órdenes recientes
- [x] Productos con stock bajo
- [x] Total usuarios

### 🎪 Vistas Especiales
- [x] Landing page parallax
- [x] Efectos de scroll
- [x] Galería de imágenes
- [x] Sección de características
- [x] FAQ
- [x] Testimonios (reseñas)

### 📱 UX/UI
- [x] Diseño responsive
- [x] Animaciones Tailwind
- [x] Loading states
- [x] Toast notifications
- [x] Skeleton loaders
- [x] Hover effects
- [x] Smooth scrolling

---

## 📁 Estructura del Proyecto

```
plantillaEcommerce/
├── backend/                          # Laravel 10 API
│   ├── app/
│   │   ├── Http/Controllers/
│   │   │   ├── Api/
│   │   │   │   ├── AuthController.php
│   │   │   │   ├── ProductController.php
│   │   │   │   ├── OrderController.php
│   │   │   │   ├── CategoryController.php
│   │   │   │   ├── DashboardController.php
│   │   │   │   ├── UserController.php
│   │   │   │   ├── EmailController.php
│   │   │   │   ├── NewsletterController.php
│   │   │   │   └── FavoriteController.php
│   │   │   ├── TagController.php
│   │   │   └── ReviewController.php
│   │   └── Models/
│   │       ├── User.php
│   │       ├── Product.php
│   │       ├── Category.php
│   │       ├── Order.php
│   │       ├── OrderItem.php
│   │       ├── Tag.php
│   │       ├── Review.php
│   │       └── ...
│   ├── database/
│   │   ├── migrations/               # 15+ migraciones
│   │   └── seeders/
│   │       ├── AdminUserSeeder.php
│   │       ├── TagSeeder.php
│   │       ├── AssignTagsSeeder.php
│   │       └── ReviewSeeder.php
│   └── routes/
│       └── api.php                   # 50+ endpoints
│
├── frontend/                         # React 18 SPA
│   ├── src/
│   │   ├── components/
│   │   │   ├── Layout.jsx
│   │   │   ├── home/
│   │   │   │   ├── HeroSection.jsx
│   │   │   │   ├── ProductsGrid.jsx
│   │   │   │   ├── ProductCard.jsx
│   │   │   │   ├── CategoriesSection.jsx
│   │   │   │   ├── FeaturesBar.jsx
│   │   │   │   └── RecentlyViewedSection.jsx
│   │   │   └── reviews/
│   │   │       ├── ReviewsCarousel.jsx
│   │   │       └── ReviewForm.jsx
│   │   ├── pages/
│   │   │   ├── Home.jsx
│   │   │   ├── Products.jsx
│   │   │   ├── ProductDetail.jsx
│   │   │   ├── ProductLandingParallax.jsx
│   │   │   ├── Cart.jsx
│   │   │   ├── Checkout.jsx
│   │   │   ├── TrackOrder.jsx
│   │   │   ├── Favorites.jsx
│   │   │   ├── Orders.jsx
│   │   │   ├── Login.jsx
│   │   │   ├── Register.jsx
│   │   │   └── admin/
│   │   │       ├── Dashboard.jsx
│   │   │       ├── ProductsManager.jsx
│   │   │       ├── CategoriesManager.jsx
│   │   │       ├── SiteSettings.jsx
│   │   │       ├── UsersManager.jsx
│   │   │       ├── EmailTemplates.jsx
│   │   │       └── NewsletterManager.jsx
│   │   ├── context/
│   │   │   ├── AuthContext.jsx
│   │   │   ├── CartContext.jsx
│   │   │   ├── FavoritesContext.jsx
│   │   │   └── ToastContext.jsx
│   │   ├── hooks/
│   │   │   ├── useSiteConfig.js
│   │   │   └── useRecentlyViewed.js
│   │   └── services/
│   │       └── api.js
│   └── public/
│       └── site-config.json           # Configuración visual
│
├── GUIA_PERSONALIZACION.md           # Guía para clientes
├── GUIA_PERSONALIZACION_AVANZADA.md  # Guía técnica
├── SISTEMA_TAGS.md                    # Documentación tags
├── SISTEMA_RESENAS.md                 # Documentación reseñas
├── GUEST_CHECKOUT.md                  # Documentación checkout invitado
├── install.ps1                        # Script instalación
└── README.md                          # Este archivo
```

---

## 🔌 API Endpoints

### Públicos (sin autenticación)

```http
# Autenticación
POST   /api/register
POST   /api/login

# Productos
GET    /api/products
GET    /api/products/{id}
GET    /api/search/products?q=

# Categorías
GET    /api/categories
GET    /api/categories/{id}

# Tags
GET    /api/tags
GET    /api/tags/{slug}/products

# Reseñas
GET    /api/products/{id}/reviews

# Órdenes (invitados)
POST   /api/orders/guest
POST   /api/orders/track

# Newsletter
POST   /api/newsletter/subscribe
```

### Protegidos (requieren autenticación)

```http
# Usuario
GET    /api/user
POST   /api/logout

# Favoritos
GET    /api/favorites
POST   /api/favorites/toggle
GET    /api/favorites/check/{productId}

# Órdenes
GET    /api/orders
POST   /api/orders
GET    /api/orders/{id}

# Reseñas
POST   /api/products/{id}/reviews
PUT    /api/reviews/{id}
DELETE /api/reviews/{id}
```

### Admin (solo administradores)

```http
# Dashboard
GET    /api/dashboard/stats
GET    /api/dashboard/sales-chart
GET    /api/dashboard/top-products

# Productos
POST   /api/products
PUT    /api/products/{id}
DELETE /api/products/{id}

# Usuarios
GET    /api/users
POST   /api/users
PUT    /api/users/{id}
DELETE /api/users/{id}

# Emails
GET    /api/email-templates
POST   /api/email-templates

# Newsletter
GET    /api/newsletter
POST   /api/newsletter/send
```

---

## 👤 Usuarios de Prueba

### Administrador
```
Email: admin@tienda.com
Password: admin123
Acceso: Panel completo de administración
```

### Usuario Regular
```
Email: user@test.com
Password: password
Acceso: Compras, favoritos, órdenes
```

### Usuarios de Reseñas (creados automáticamente)
- María García - maria@example.com
- Juan Pérez - juan@example.com
- Ana Martínez - ana@example.com
- Carlos López - carlos@example.com
- Laura Rodríguez - laura@example.com

---

## 📚 Documentación

### Guías Disponibles

1. **GUIA_RAPIDA.md** - Inicio rápido
2. **GUIA_PERSONALIZACION.md** - Para clientes (sin código)
3. **GUIA_PERSONALIZACION_AVANZADA.md** - Para desarrolladores
4. **PERSONALIZACION_RESUMEN.md** - Resumen ejecutivo
5. **EJEMPLOS_CONFIGURACIONES.md** - 8 ejemplos de tiendas
6. **SISTEMA_TAGS.md** - Sistema de etiquetas
7. **SISTEMA_RESENAS.md** - Sistema de reseñas
8. **GUEST_CHECKOUT.md** - Checkout sin registro
9. **INSTRUCCIONES.md** - Instrucciones generales

### Documentos Técnicos

- **Migraciones:** 15+ archivos de migración
- **Seeders:** Datos de prueba completos
- **API Routes:** 50+ endpoints documentados
- **Modelos:** 12 modelos Eloquent
- **Componentes:** 30+ componentes React

---

## 📸 Capturas de Pantalla

*Próximamente: Screenshots de las principales funcionalidades*

---

## 🎓 Características Avanzadas

### Sistema de Tags Inteligente
- 41 tags predefinidos en 8 categorías
- Sinónimos automáticos (18 categorías)
- Búsqueda fuzzy con algoritmo de Levenshtein
- Scoring de relevancia 0-100

### Checkout como Invitado
- Sin necesidad de registro
- Token único de 64 caracteres
- Rastreo con email + token
- Opción de crear cuenta después

### Reseñas Verificadas
- Compra verificada automática
- Un usuario = una reseña por producto
- Moderación automática o manual
- Carousel con auto-scroll

### Personalización Sin Código
- Panel visual intuitivo
- 6 esquemas predefinidos
- Cambios en tiempo real
- Sin reiniciar servidor

---

## 🔧 Configuración Avanzada

### Variables de Entorno Backend (.env)

```env
APP_NAME="Tu Tienda"
APP_URL=http://localhost:8000

DB_DATABASE=ecommerce_laravel
DB_USERNAME=root
DB_PASSWORD=

SANCTUM_STATEFUL_DOMAINS=localhost:5173
SESSION_DOMAIN=localhost
```

### Configuración Frontend (site-config.json)

```json
{
  "business": {
    "name": "Tu Tienda",
    "email": "contacto@tutienda.com",
    "phone": "+1234567890"
  },
  "theme": {
    "colors": {
      "primary": { "hex": "#06b6d4" },
      "secondary": { "hex": "#14b8a6" }
    }
  }
}
```

---

## 🚀 Despliegue a Producción

### Backend (Laravel)

```bash
# Optimizar
php artisan config:cache
php artisan route:cache
php artisan view:cache

# Migraciones
php artisan migrate --force
php artisan db:seed --force
```

### Frontend (React)

```bash
# Build de producción
npm run build

# Los archivos estarán en /dist
```

### Servidores Recomendados
- **Backend:** Laravel Forge, Heroku, DigitalOcean
- **Frontend:** Vercel, Netlify, AWS S3 + CloudFront
- **Base de Datos:** MySQL 8.0+, MariaDB 10.3+

---

## 🐛 Solución de Problemas

### Error: CORS
**Solución:** Verificar `config/cors.php` y `SANCTUM_STATEFUL_DOMAINS`

### Error: 419 CSRF Token
**Solución:** Sanctum configurado correctamente en `.env`

### Error: Storage Link
```bash
php artisan storage:link
```

### Error: Permisos
```bash
chmod -R 775 storage bootstrap/cache
```

---

## 📈 Roadmap Futuro

- [ ] Pasarela de pagos (Stripe/PayPal)
- [ ] Chat en vivo
- [ ] Notificaciones push
- [ ] App móvil (React Native)
- [ ] Sistema de cupones/descuentos
- [ ] Wishlist pública para compartir
- [ ] Comparador de productos
- [ ] Reviews con imágenes
- [ ] Integración con redes sociales
- [ ] SEO avanzado

---

## 🤝 Contribuir

Las contribuciones son bienvenidas. Por favor:

1. Fork el proyecto
2. Crea una rama (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

---

## 📄 Licencia

Este proyecto está bajo la Licencia MIT. Ver el archivo `LICENSE` para más detalles.

---

## 👨‍💻 Autor

**Diana García**
- GitHub: [@Dianagarcia33](https://github.com/Dianagarcia33)
- Repositorio: [ecommerce-laravel-react](https://github.com/Dianagarcia33/ecommerce-laravel-react)

---

## 🙏 Agradecimientos

- Laravel Team
- React Team
- Tailwind CSS Team
- Heroicons
- Comunidad Open Source

---

## 📞 Soporte

¿Problemas o preguntas? 

1. Revisa la [Documentación](#-documentación)
2. Busca en [Issues](https://github.com/Dianagarcia33/ecommerce-laravel-react/issues)
3. Crea un nuevo [Issue](https://github.com/Dianagarcia33/ecommerce-laravel-react/issues/new)

---

<div align="center">

**⭐ Si este proyecto te fue útil, considera darle una estrella ⭐**

Hecho con ❤️ y mucho ☕

</div>
