# Script de instalación automática para Windows PowerShell
# Ecommerce Laravel + React

Write-Host "================================" -ForegroundColor Cyan
Write-Host "  Instalación Ecommerce" -ForegroundColor Cyan
Write-Host "  Laravel + React" -ForegroundColor Cyan
Write-Host "================================" -ForegroundColor Cyan
Write-Host ""

# Verificar si Composer está instalado
Write-Host "Verificando Composer..." -ForegroundColor Yellow
if (!(Get-Command composer -ErrorAction SilentlyContinue)) {
    Write-Host "❌ Composer no está instalado." -ForegroundColor Red
    Write-Host "📥 Descárgalo desde: https://getcomposer.org/download/" -ForegroundColor Yellow
    exit
}
Write-Host "✅ Composer encontrado" -ForegroundColor Green

# Verificar si Node.js está instalado
Write-Host "Verificando Node.js..." -ForegroundColor Yellow
if (!(Get-Command node -ErrorAction SilentlyContinue)) {
    Write-Host "❌ Node.js no está instalado." -ForegroundColor Red
    Write-Host "📥 Descárgalo desde: https://nodejs.org/" -ForegroundColor Yellow
    exit
}
Write-Host "✅ Node.js encontrado" -ForegroundColor Green
Write-Host ""

# Instalar Laravel
Write-Host "📦 Instalando Laravel..." -ForegroundColor Cyan
composer create-project laravel/laravel backend

if ($LASTEXITCODE -ne 0) {
    Write-Host "❌ Error al instalar Laravel" -ForegroundColor Red
    exit
}

# Configurar Laravel
Write-Host "⚙️ Configurando Laravel..." -ForegroundColor Cyan
Set-Location backend
composer require laravel/sanctum
php artisan vendor:publish --provider="Laravel\Sanctum\SanctumServiceProvider"

Write-Host ""
Write-Host "✅ Backend Laravel instalado correctamente" -ForegroundColor Green
Write-Host ""

# Volver a la raíz
Set-Location ..

# Instalar React con Vite
Write-Host "📦 Instalando React con Vite..." -ForegroundColor Cyan
npm create vite@latest frontend -- --template react

if ($LASTEXITCODE -ne 0) {
    Write-Host "❌ Error al instalar React" -ForegroundColor Red
    exit
}

Set-Location frontend
npm install

Write-Host "📦 Instalando dependencias adicionales..." -ForegroundColor Cyan
npm install react-router-dom axios

Write-Host "📦 Instalando Tailwind CSS..." -ForegroundColor Cyan
npm install -D tailwindcss postcss autoprefixer @tailwindcss/forms
npx tailwindcss init -p

Set-Location ..

Write-Host ""
Write-Host "================================" -ForegroundColor Green
Write-Host "  ✅ INSTALACIÓN COMPLETADA" -ForegroundColor Green
Write-Host "================================" -ForegroundColor Green
Write-Host ""
Write-Host "📋 PRÓXIMOS PASOS:" -ForegroundColor Yellow
Write-Host ""
Write-Host "1. Crear base de datos 'ecommerce_laravel' en phpMyAdmin" -ForegroundColor White
Write-Host "   👉 http://localhost/phpmyadmin" -ForegroundColor Cyan
Write-Host ""
Write-Host "2. Configurar archivo backend/.env con los datos de la BD" -ForegroundColor White
Write-Host ""
Write-Host "3. Ejecutar migraciones:" -ForegroundColor White
Write-Host "   cd backend" -ForegroundColor Cyan
Write-Host "   php artisan migrate" -ForegroundColor Cyan
Write-Host ""
Write-Host "4. Iniciar el backend (Terminal 1):" -ForegroundColor White
Write-Host "   cd backend" -ForegroundColor Cyan
Write-Host "   php artisan serve" -ForegroundColor Cyan
Write-Host ""
Write-Host "5. Iniciar el frontend (Terminal 2):" -ForegroundColor White
Write-Host "   cd frontend" -ForegroundColor Cyan
Write-Host "   npm run dev" -ForegroundColor Cyan
Write-Host ""
Write-Host "🎉 ¡Listo para programar!" -ForegroundColor Green
