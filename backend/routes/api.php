<?php

use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\CategoryController;
use App\Http\Controllers\Api\ProductController;
use App\Http\Controllers\Api\OrderController;
use App\Http\Controllers\Api\DashboardController;
use App\Http\Controllers\Api\UserController;
use App\Http\Controllers\Api\EmailController;
use App\Http\Controllers\Api\NewsletterController;
use Illuminate\Support\Facades\Route;

// Rutas de autenticación
Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);

// Rutas públicas
Route::get('/categories', [CategoryController::class, 'index']);
Route::get('/categories/{id}', [CategoryController::class, 'show']);

Route::get('/products', [ProductController::class, 'index']);
Route::get('/products/{id}', [ProductController::class, 'show']);

// Newsletter (públicas)
Route::post('/newsletter/subscribe', [NewsletterController::class, 'subscribe']);
Route::post('/newsletter/unsubscribe/{token}', [NewsletterController::class, 'unsubscribe']);

// Rutas protegidas (requieren autenticación)
Route::middleware('auth:sanctum')->group(function () {
    // Auth
    Route::post('/logout', [AuthController::class, 'logout']);
    Route::get('/user', [AuthController::class, 'user']);
    
    // Dashboard (solo admin)
    Route::get('/dashboard/stats', [DashboardController::class, 'stats']);
    Route::get('/dashboard/sales-chart', [DashboardController::class, 'salesChart']);
    Route::get('/dashboard/top-products', [DashboardController::class, 'topProducts']);
    Route::get('/dashboard/recent-orders', [DashboardController::class, 'recentOrders']);
    Route::get('/dashboard/low-stock', [DashboardController::class, 'lowStock']);
    
    // Órdenes
    Route::get('/orders', [OrderController::class, 'index']);
    Route::post('/orders', [OrderController::class, 'store']);
    Route::get('/orders/{id}', [OrderController::class, 'show']);
    Route::put('/orders/{id}/status', [OrderController::class, 'updateStatus']);
    
    // Categorías (solo admin)
    Route::post('/categories', [CategoryController::class, 'store']);
    Route::put('/categories/{id}', [CategoryController::class, 'update']);
    Route::delete('/categories/{id}', [CategoryController::class, 'destroy']);
    
    // Productos (solo admin)
    Route::post('/products', [ProductController::class, 'store']);
    Route::put('/products/{id}', [ProductController::class, 'update']);
    Route::delete('/products/{id}', [ProductController::class, 'destroy']);
    Route::delete('/products/{productId}/images/{imageId}', [ProductController::class, 'deleteImage']);
    
    // Usuarios (solo admin)
    Route::get('/users', [UserController::class, 'index']);
    Route::post('/users', [UserController::class, 'store']);
    Route::get('/users/statistics', [UserController::class, 'statistics']);
    Route::get('/users/{id}', [UserController::class, 'show']);
    Route::put('/users/{id}', [UserController::class, 'update']);
    Route::delete('/users/{id}', [UserController::class, 'destroy']);
    Route::patch('/users/{id}/status', [UserController::class, 'updateStatus']);
    
    // Email Templates (solo admin)
    Route::get('/email-templates', [EmailController::class, 'index']);
    Route::post('/email-templates', [EmailController::class, 'store']);
    Route::get('/email-templates/{id}', [EmailController::class, 'show']);
    Route::put('/email-templates/{id}', [EmailController::class, 'update']);
    Route::delete('/email-templates/{id}', [EmailController::class, 'destroy']);
    Route::post('/email-templates/{id}/preview', [EmailController::class, 'preview']);
    Route::patch('/email-templates/{id}/toggle-status', [EmailController::class, 'toggleStatus']);
    
    // Newsletter (solo admin)
    Route::get('/newsletter', [NewsletterController::class, 'index']);
    Route::get('/newsletter/stats', [NewsletterController::class, 'stats']);
    Route::post('/newsletter/send', [NewsletterController::class, 'send']);
    Route::post('/newsletter/send-test', [NewsletterController::class, 'sendTest']);
    Route::delete('/newsletter/{id}', [NewsletterController::class, 'destroy']);
    Route::patch('/newsletter/{id}/activate', [NewsletterController::class, 'activate']);
});
