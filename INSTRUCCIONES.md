# 🛒 ECOMMERCE COMPLETO - GUÍA DE USO

## 📦 Características Implementadas

✅ **Backend (Laravel 12)**
- Sistema de autenticación con Laravel Sanctum
- Gestión de roles (Admin/Usuario)
- CRUD completo de Categorías y Productos
- Sistema de órdenes de compra
- Control de stock automático
- API RESTful completa

✅ **Frontend (React 18)**
- Catálogo de productos con filtros
- Carrito de compras funcional (localStorage)
- Proceso de checkout completo
- Panel de administración
- Historial de órdenes
- Interfaz responsive con Tailwind CSS

---

## 🔐 CREDENCIALES DE ACCESO

### Usuario Administrador
```
Email: admin@tienda.com
Contraseña: admin123
```

### Crear Usuario Normal
Ve a `/register` y regístrate con tu email

---

## 🚀 CÓMO INICIAR EL PROYECTO

### 1. Backend (Laravel)
```powershell
cd C:\xampp\htdocs\plantillaEcommerce\backend
php artisan serve --host=127.0.0.1 --port=8000
```

### 2. Frontend (React)
```powershell
cd C:\xampp\htdocs\plantillaEcommerce\frontend
npm run dev
```

### 3. Acceder a la aplicación
- Frontend: http://localhost:5174
- Backend API: http://localhost:8000/api

---

## 👤 FUNCIONES POR ROL

### Como USUARIO:
1. **Registrarse/Iniciar Sesión** (`/register` o `/login`)
2. **Ver Productos** (`/products`)
   - Filtrar por categorías
   - Ver detalles de productos
3. **Agregar al Carrito** (clic en "Agregar al Carrito")
4. **Ver Carrito** (`/cart`)
   - Modificar cantidades
   - Eliminar productos
5. **Realizar Compra** (`/checkout`)
   - Completar datos de envío
   - Confirmar orden
6. **Ver Mis Órdenes** (`/orders`)
   - Historial de compras
   - Estado de cada orden

### Como ADMIN:
1. **Iniciar Sesión** con credenciales de admin
2. **Panel de Admin** (`/admin`)
3. **Gestionar Productos** (`/admin/products`)
   - Crear nuevos productos
   - Editar productos existentes
   - Eliminar productos
   - Control de stock
4. **Gestionar Categorías** (`/admin/categories`)
   - Crear categorías
   - Editar categorías
   - Eliminar categorías
5. **Ver Todas las Órdenes** (`/orders`)
   - Ver órdenes de todos los clientes
   - Actualizar estado de órdenes

---

## 📊 ESTRUCTURA DE LA BASE DE DATOS

### Tablas Principales:
- **users**: Usuarios del sistema (role: 'user' o 'admin')
- **categories**: Categorías de productos
- **products**: Productos del catálogo
- **orders**: Órdenes de compra
- **order_items**: Detalle de productos en cada orden

### Datos de Prueba:
- 3 Categorías: Electrónica, Ropa, Hogar
- 9 Productos con stock
- 1 Usuario Admin

---

## 🔄 FLUJO DE COMPRA

1. Usuario navega por productos
2. Agrega productos al carrito
3. Va al carrito y revisa su compra
4. Procede al checkout
5. Completa datos de envío
6. Confirma la orden
7. Sistema reduce el stock automáticamente
8. Usuario puede ver su orden en "Mis Órdenes"
9. Admin puede ver y gestionar todas las órdenes

---

## 🛠️ COMANDOS ÚTILES

### Backend:
```powershell
# Ver rutas
php artisan route:list

# Limpiar caché
php artisan cache:clear
php artisan config:clear
php artisan route:clear

# Ejecutar migraciones
php artisan migrate

# Ejecutar seeders
php artisan db:seed
```

### Frontend:
```powershell
# Instalar dependencias
npm install

# Desarrollo
npm run dev

# Compilar para producción
npm run build
```

---

## 📝 NOTAS IMPORTANTES

1. **Carrito**: Se guarda en localStorage del navegador
2. **Stock**: Se reduce automáticamente al crear una orden
3. **Roles**: Solo el admin puede crear/editar/eliminar productos y categorías
4. **Autenticación**: Usa tokens de Laravel Sanctum
5. **CORS**: Configurado para localhost:5173 y localhost:5174

---

## 🎯 PRÓXIMAS MEJORAS SUGERIDAS

- [ ] Subida de imágenes de productos
- [ ] Métodos de pago (Stripe, PayPal)
- [ ] Notificaciones por email
- [ ] Sistema de cupones/descuentos
- [ ] Calificaciones y reseñas de productos
- [ ] Lista de deseos
- [ ] Búsqueda avanzada de productos

---

## 🆘 SOLUCIÓN DE PROBLEMAS

### El backend no responde:
```powershell
cd backend
php artisan serve --host=127.0.0.1 --port=8000
```

### Error de CORS:
Verifica que el backend esté corriendo y que el puerto en `frontend/src/services/api.js` sea el correcto.

### No puedo crear productos:
Asegúrate de haber iniciado sesión con el usuario admin.

### El carrito no guarda productos:
Verifica que estés autenticado (iniciado sesión).

---

## 📧 SOPORTE

Para problemas o dudas, revisa:
1. La consola del navegador (F12)
2. Los logs de Laravel en `backend/storage/logs/laravel.log`
3. La terminal donde corre el backend

---

¡Disfruta de tu ecommerce completo! 🎉
