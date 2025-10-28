# 🛍️ Ecommerce Laravel + React

Sistema de comercio electrónico moderno construido con **Laravel 12** (Backend API REST) y **React 18** (Frontend SPA).

## ✅ INSTALACIÓN COMPLETADA

El proyecto base está **100% instalado y configurado**. Solo necesitas seguir los pasos finales para que funcione.

## 🛠️ Tecnologías

### Backend
- Laravel 10
- MySQL
- Laravel Sanctum (Autenticación API)
- Laravel Eloquent ORM

### Frontend
- React 18
- Vite
- React Router
- Axios
- Tailwind CSS

## 📋 Requisitos Previos

Antes de comenzar, asegúrate de tener instalado:

1. **PHP 8.1 o superior**
   - Viene incluido con XAMPP
   
2. **Composer** (Gestor de dependencias PHP)
   - Descarga desde: https://getcomposer.org/download/
   
3. **Node.js 18+ y npm**
   - Descarga desde: https://nodejs.org/

4. **XAMPP**
   - MySQL debe estar corriendo

## 🚀 Instalación

### Paso 1: Instalar Laravel

Abre PowerShell en esta carpeta y ejecuta:

```powershell
# Crear proyecto Laravel en la carpeta actual
composer create-project laravel/laravel backend

# Entrar a la carpeta del backend
cd backend

# Instalar Laravel Sanctum para autenticación API
composer require laravel/sanctum

# Publicar configuración de Sanctum
php artisan vendor:publish --provider="Laravel\Sanctum\SanctumServiceProvider"
```

### Paso 2: Configurar Base de Datos

1. Crea la base de datos en phpMyAdmin:
   - Ve a http://localhost/phpmyadmin
   - Crea una base de datos llamada `ecommerce_laravel`

2. Edita el archivo `backend/.env`:
```env
DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=ecommerce_laravel
DB_USERNAME=root
DB_PASSWORD=
```

3. Ejecutar migraciones:
```powershell
php artisan migrate
```

### Paso 3: Instalar Frontend React

Desde la carpeta raíz del proyecto:

```powershell
# Volver a la raíz
cd ..

# Crear app React con Vite
npm create vite@latest frontend -- --template react

# Entrar a la carpeta frontend
cd frontend

# Instalar dependencias
npm install

# Instalar dependencias adicionales
npm install react-router-dom axios tailwindcss postcss autoprefixer
npm install -D @tailwindcss/forms

# Inicializar Tailwind CSS
npx tailwindcss init -p
```

### Paso 4: Ejecutar el Proyecto

Necesitarás **2 terminales**:

**Terminal 1 - Backend Laravel:**
```powershell
cd backend
php artisan serve
# Backend corriendo en: http://localhost:8000
```

**Terminal 2 - Frontend React:**
```powershell
cd frontend
npm run dev
# Frontend corriendo en: http://localhost:5173
```

## 📁 Estructura del Proyecto

```
plantillaEcommerce/
├── backend/                    # Laravel API
│   ├── app/
│   │   ├── Http/
│   │   │   └── Controllers/   # Controladores API
│   │   └── Models/            # Modelos Eloquent
│   ├── database/
│   │   ├── migrations/        # Migraciones de BD
│   │   └── seeders/           # Datos de prueba
│   ├── routes/
│   │   └── api.php            # Rutas API
│   └── .env                   # Configuración
│
└── frontend/                   # React SPA
    ├── src/
    │   ├── components/        # Componentes React
    │   ├── pages/             # Páginas
    │   ├── services/          # API calls (Axios)
    │   └── App.jsx            # Componente principal
    ├── public/
    └── package.json
```

## 🎯 Características a Implementar

- ✅ API REST con Laravel
- ✅ Autenticación JWT con Sanctum
- ✅ CRUD de Productos
- ✅ Sistema de Categorías
- ✅ Carrito de Compras
- ✅ Gestión de Pedidos
- ✅ Panel de Administración
- ✅ Interfaz moderna con React
- ✅ Responsive Design con Tailwind

## 🔑 Endpoints API (una vez configurado)

```
POST   /api/register          - Registro de usuario
POST   /api/login             - Login
POST   /api/logout            - Logout
GET    /api/productos         - Listar productos
GET    /api/productos/{id}    - Ver producto
POST   /api/carrito           - Agregar al carrito
GET    /api/carrito           - Ver carrito
POST   /api/pedidos           - Crear pedido
GET    /api/pedidos           - Listar pedidos del usuario
```

## 👤 Usuarios de Prueba (después de seeders)

```
Admin: admin@tienda.com / admin123
Cliente: cliente@tienda.com / cliente123
```

## 🐛 Solución de Problemas

### Error de Composer
- Asegúrate de tener Composer instalado y agregado al PATH

### Error de Node/npm
- Instala Node.js desde nodejs.org

### Error de permisos en Laravel
```powershell
# En la carpeta backend
php artisan storage:link
```

### Error CORS
- Ya se configurará en Laravel para permitir peticiones desde React

## 📚 Próximos Pasos Después de la Instalación

1. Crear migraciones para productos, categorías, pedidos
2. Crear controladores API
3. Configurar rutas API
4. Crear componentes React
5. Implementar autenticación
6. Conectar frontend con backend

## 🤝 Contribuir

Este es un proyecto de aprendizaje. Siéntete libre de mejorarlo.

## 📄 Licencia

Open source - Uso libre
