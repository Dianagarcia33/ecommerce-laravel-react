# 🚀 Guía Rápida - Ecommerce Laravel + React

## ✅ Lo que ya está instalado:

1. ✅ **Laravel 12** en `/backend`
2. ✅ **Laravel Sanctum** para autenticación API
3. ✅ **React 18 con Vite** en `/frontend`
4. ✅ **React Router DOM** para navegación
5. ✅ **Axios** para peticiones HTTP
6. ✅ **Tailwind CSS** para estilos
7. ✅ **Componentes básicos**: Layout, Home, AuthContext

## 📋 PRÓXIMOS PASOS PARA COMPLETAR:

### 1. Configurar Base de Datos (IMPORTANTE)

```powershell
# 1. Abre phpMyAdmin: http://localhost/phpmyadmin
# 2. Crea una base de datos llamada: ecommerce_laravel
```

Luego edita `backend/.env`:
```env
DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=ecommerce_laravel
DB_USERNAME=root
DB_PASSWORD=
```

### 2. Crear Migraciones y Modelos en Laravel

```powershell
cd backend

# Crear modelo y migración de Productos
php artisan make:model Product -m

# Crear modelo y migración de Categorías
php artisan make:model Category -m

# Crear modelo y migración de Carrito
php artisan make:model CartItem -m

# Crear modelo y migración de Pedidos
php artisan make:model Order -m

# Crear modelo y migración de Detalles de Pedido
php artisan make:model OrderItem -m
```

### 3. Editar Migraciones

Edita `backend/database/migrations/xxxx_create_categories_table.php`:
```php
public function up()
{
    Schema::create('categories', function (Blueprint $table) {
        $table->id();
        $table->string('name');
        $table->text('description')->nullable();
        $table->string('image')->nullable();
        $table->boolean('active')->default(true);
        $table->timestamps();
    });
}
```

Edita `backend/database/migrations/xxxx_create_products_table.php`:
```php
public function up()
{
    Schema::create('products', function (Blueprint $table) {
        $table->id();
        $table->foreignId('category_id')->nullable()->constrained()->onDelete('set null');
        $table->string('name');
        $table->text('description');
        $table->decimal('price', 10, 2);
        $table->decimal('sale_price', 10, 2)->nullable();
        $table->integer('stock')->default(0);
        $table->string('image');
        $table->boolean('featured')->default(false);
        $table->boolean('active')->default(true);
        $table->timestamps();
    });
}
```

### 4. Ejecutar Migraciones

```powershell
cd backend
php artisan migrate
```

### 5. Crear Controladores API

```powershell
cd backend

# Crear controlador de autenticación
php artisan make:controller Api/AuthController

# Crear controlador de productos
php artisan make:controller Api/ProductController --api

# Crear controlador de categorías
php artisan make:controller Api/CategoryController --api

# Crear controlador de carrito
php artisan make:controller Api/CartController

# Crear controlador de pedidos
php artisan make:controller Api/OrderController
```

### 6. Configurar Rutas API

Edita `backend/routes/api.php`:
```php
use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\ProductController;
use App\Http\Controllers\Api\CategoryController;
use App\Http\Controllers\Api\CartController;
use App\Http\Controllers\Api\OrderController;

// Rutas públicas
Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);

// Productos y categorías (públicas)
Route::get('/products', [ProductController::class, 'index']);
Route::get('/products/{id}', [ProductController::class, 'show']);
Route::get('/categories', [CategoryController::class, 'index']);

// Rutas protegidas (requieren autenticación)
Route::middleware('auth:sanctum')->group(function () {
    Route::post('/logout', [AuthController::class, 'logout']);
    Route::get('/user', [AuthController::class, 'user']);
    
    // Carrito
    Route::get('/cart', [CartController::class, 'index']);
    Route::post('/cart', [CartController::class, 'store']);
    Route::put('/cart/{id}', [CartController::class, 'update']);
    Route::delete('/cart/{id}', [CartController::class, 'destroy']);
    
    // Pedidos
    Route::get('/orders', [OrderController::class, 'index']);
    Route::post('/orders', [OrderController::class, 'store']);
    Route::get('/orders/{id}', [OrderController::class, 'show']);
});
```

### 7. Configurar CORS

Edita `backend/config/cors.php`:
```php
return [
    'paths' => ['api/*', 'sanctum/csrf-cookie'],
    'allowed_methods' => ['*'],
    'allowed_origins' => ['http://localhost:5173', 'http://localhost:5174'],
    'allowed_origins_patterns' => [],
    'allowed_headers' => ['*'],
    'exposed_headers' => [],
    'max_age' => 0,
    'supports_credentials' => true,
];
```

### 8. Crear Seeder para Datos de Prueba

```powershell
cd backend
php artisan make:seeder DatabaseSeeder
```

Edita `backend/database/seeders/DatabaseSeeder.php`:
```php
public function run()
{
    // Crear categorías
    Category::create(['name' => 'Electrónica', 'description' => 'Productos electrónicos']);
    Category::create(['name' => 'Ropa', 'description' => 'Ropa y accesorios']);
    Category::create(['name' => 'Hogar', 'description' => 'Artículos para el hogar']);
    
    // Crear productos
    Product::create([
        'category_id' => 1,
        'name' => 'Laptop HP',
        'description' => 'Laptop HP 15 pulgadas, Intel Core i5, 8GB RAM',
        'price' => 699.99,
        'stock' => 10,
        'image' => '/images/laptop.jpg',
        'featured' => true
    ]);
    
    // Crear usuario admin
    User::create([
        'name' => 'Admin',
        'email' => 'admin@tienda.com',
        'password' => bcrypt('admin123'),
        'is_admin' => true
    ]);
}
```

Ejecutar:
```powershell
php artisan db:seed
```

## 🚀 INICIAR EL PROYECTO

### Terminal 1 - Backend Laravel:
```powershell
cd c:\xampp\htdocs\plantillaEcommerce\backend
php artisan serve
```
Backend corriendo en: **http://localhost:8000**

### Terminal 2 - Frontend React:
```powershell
cd c:\xampp\htdocs\plantillaEcommerce\frontend
npm run dev
```
Frontend corriendo en: **http://localhost:5173** (o 5174)

## 📁 Archivos Creados Hasta Ahora:

### Backend (Laravel):
- ✅ Instalación completa de Laravel
- ✅ Laravel Sanctum instalado
- ✅ Configuración básica

### Frontend (React):
- ✅ `/src/App.jsx` - Componente principal con rutas
- ✅ `/src/index.css` - Estilos con Tailwind CSS
- ✅ `/src/services/api.js` - Cliente Axios configurado
- ✅ `/src/context/AuthContext.jsx` - Context de autenticación
- ✅ `/src/components/Layout.jsx` - Layout principal
- ✅ `/src/pages/Home.jsx` - Página de inicio

### Archivos de Configuración:
- ✅ `/frontend/tailwind.config.js` - Configuración de Tailwind
- ✅ `/frontend/postcss.config.js` - Configuración de PostCSS
- ✅ `/README.md` - Documentación completa
- ✅ `/install.ps1` - Script de instalación automática
- ✅ `/package.json` - Scripts npm del proyecto

## 📝 PÁGINAS PENDIENTES POR CREAR:

Necesitas crear estos archivos en `/frontend/src/pages/`:

1. **Products.jsx** - Listado de productos
2. **ProductDetail.jsx** - Detalle de producto
3. **Cart.jsx** - Carrito de compras
4. **Login.jsx** - Página de login
5. **Register.jsx** - Página de registro

## 🎯 Estructura Completa del Proyecto:

```
plantillaEcommerce/
├── backend/                    # Laravel API
│   ├── app/
│   │   ├── Http/
│   │   │   └── Controllers/
│   │   │       └── Api/       # Crear controladores aquí
│   │   └── Models/            # Crear modelos aquí
│   ├── database/
│   │   ├── migrations/        # Editar migraciones
│   │   └── seeders/           # Crear seeders
│   ├── routes/
│   │   └── api.php            # Configurar rutas API
│   └── .env                   # Configurar BD
│
└── frontend/                   # React SPA
    ├── src/
    │   ├── components/
    │   │   └── Layout.jsx     # ✅ Creado
    │   ├── context/
    │   │   └── AuthContext.jsx # ✅ Creado
    │   ├── pages/
    │   │   ├── Home.jsx       # ✅ Creado
    │   │   ├── Products.jsx   # ⚠️ Por crear
    │   │   ├── ProductDetail.jsx # ⚠️ Por crear
    │   │   ├── Cart.jsx       # ⚠️ Por crear
    │   │   ├── Login.jsx      # ⚠️ Por crear
    │   │   └── Register.jsx   # ⚠️ Por crear
    │   ├── services/
    │   │   └── api.js         # ✅ Creado
    │   ├── App.jsx            # ✅ Creado
    │   └── index.css          # ✅ Creado
    └── tailwind.config.js     # ✅ Creado
```

## 🐛 Solución de Problemas Comunes:

### Error: "Failed to fetch"
- Asegúrate de que el backend Laravel está corriendo en http://localhost:8000
- Verifica la configuración de CORS en `backend/config/cors.php`

### Error: "SQLSTATE[HY000] [1049] Unknown database"
- Crea la base de datos `ecommerce_laravel` en phpMyAdmin
- Verifica la configuración en `backend/.env`

### Tailwind no funciona
- Los errores de @tailwind son normales en VS Code
- Verifica que `tailwind.config.js` y `postcss.config.js` existan
- Reinicia el servidor de Vite: Ctrl+C y `npm run dev`

## 📚 Recursos Adicionales:

- **Laravel Docs**: https://laravel.com/docs
- **React Docs**: https://react.dev
- **Tailwind CSS**: https://tailwindcss.com/docs
- **Sanctum Auth**: https://laravel.com/docs/sanctum

## 🎉 ¡El proyecto está listo para continuar!

Sigue los pasos de esta guía para completar la configuración y empezar a programar tu ecommerce.
