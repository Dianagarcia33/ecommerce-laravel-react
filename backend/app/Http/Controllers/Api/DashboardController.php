<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Product;
use App\Models\Category;
use App\Models\Order;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Carbon\Carbon;

class DashboardController extends Controller
{
    /**
     * Get dashboard statistics
     */
    public function stats(Request $request)
    {
        try {
            // Conteos básicos
            $stats = [
                'products' => [
                    'total' => Product::count(),
                    'active' => Product::where('stock', '>', 0)->count(),
                    'outOfStock' => Product::where('stock', 0)->count(),
                ],
                'categories' => [
                    'total' => Category::count(),
                    'withProducts' => Category::has('products')->count(),
                ],
                'orders' => [
                    'total' => Order::count(),
                    'pending' => Order::where('status', 'pending')->count(),
                    'completed' => Order::where('status', 'completed')->count(),
                    'cancelled' => Order::where('status', 'cancelled')->count(),
                ],
                'users' => [
                    'total' => User::count(),
                    'admins' => User::where('role', 'admin')->count(),
                    'customers' => User::where('role', 'user')->count(),
                ],
                'revenue' => [
                    'total' => Order::where('status', 'completed')->sum('total'),
                    'thisMonth' => Order::where('status', 'completed')
                        ->whereMonth('created_at', Carbon::now()->month)
                        ->whereYear('created_at', Carbon::now()->year)
                        ->sum('total'),
                    'lastMonth' => Order::where('status', 'completed')
                        ->whereMonth('created_at', Carbon::now()->subMonth()->month)
                        ->whereYear('created_at', Carbon::now()->subMonth()->year)
                        ->sum('total'),
                ],
            ];

            return response()->json($stats);
        } catch (\Exception $e) {
            return response()->json([
                'message' => 'Error al obtener estadísticas',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    /**
     * Get sales chart data for the last 7 days
     */
    public function salesChart(Request $request)
    {
        try {
            $days = $request->get('days', 7);
            
            $salesData = Order::where('status', 'completed')
                ->where('created_at', '>=', Carbon::now()->subDays($days))
                ->select(
                    DB::raw('DATE(created_at) as date'),
                    DB::raw('COUNT(*) as orders'),
                    DB::raw('SUM(total) as revenue')
                )
                ->groupBy('date')
                ->orderBy('date', 'asc')
                ->get();

            // Rellenar días sin ventas
            $chartData = [];
            for ($i = $days - 1; $i >= 0; $i--) {
                $date = Carbon::now()->subDays($i)->format('Y-m-d');
                $dayData = $salesData->firstWhere('date', $date);
                
                $chartData[] = [
                    'date' => $date,
                    'dateFormatted' => Carbon::parse($date)->format('d/m'),
                    'orders' => $dayData ? $dayData->orders : 0,
                    'revenue' => $dayData ? floatval($dayData->revenue) : 0,
                ];
            }

            return response()->json($chartData);
        } catch (\Exception $e) {
            return response()->json([
                'message' => 'Error al obtener datos de ventas',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    /**
     * Get top selling products
     */
    public function topProducts(Request $request)
    {
        try {
            $limit = $request->get('limit', 5);

            $topProducts = DB::table('order_items')
                ->join('products', 'order_items.product_id', '=', 'products.id')
                ->join('orders', 'order_items.order_id', '=', 'orders.id')
                ->where('orders.status', 'completed')
                ->select(
                    'products.id',
                    'products.name',
                    'products.price',
                    DB::raw('SUM(order_items.quantity) as total_sold'),
                    DB::raw('SUM(order_items.price * order_items.quantity) as total_revenue')
                )
                ->groupBy('products.id', 'products.name', 'products.price')
                ->orderBy('total_sold', 'desc')
                ->limit($limit)
                ->get()
                ->map(function ($product) {
                    // Obtener la primera imagen del producto
                    $image = DB::table('product_images')
                        ->where('product_id', $product->id)
                        ->value('image_url');
                    
                    return [
                        'id' => $product->id,
                        'name' => $product->name,
                        'price' => $product->price,
                        'image' => $image,
                        'total_sold' => $product->total_sold,
                        'total_revenue' => $product->total_revenue,
                    ];
                });

            return response()->json($topProducts);
        } catch (\Exception $e) {
            return response()->json([
                'message' => 'Error al obtener productos más vendidos',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    /**
     * Get recent orders
     */
    public function recentOrders(Request $request)
    {
        try {
            $limit = $request->get('limit', 5);

            $recentOrders = Order::with('user:id,name,email')
                ->orderBy('created_at', 'desc')
                ->limit($limit)
                ->get()
                ->map(function ($order) {
                    return [
                        'id' => $order->id,
                        'user_name' => $order->user ? $order->user->name : 'Cliente',
                        'user_email' => $order->user ? $order->user->email : 'N/A',
                        'total' => floatval($order->total),
                        'status' => $order->status,
                        'created_at' => $order->created_at->format('Y-m-d H:i:s'),
                        'created_at_formatted' => $order->created_at->diffForHumans(),
                    ];
                });

            return response()->json($recentOrders);
        } catch (\Exception $e) {
            return response()->json([
                'message' => 'Error al obtener órdenes recientes',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    /**
     * Get low stock products
     */
    public function lowStock(Request $request)
    {
        try {
            $threshold = $request->get('threshold', 10);
            $limit = $request->get('limit', 5);

            $lowStockProducts = Product::with('images:id,product_id,image_url')
                ->where('stock', '<=', $threshold)
                ->where('stock', '>', 0)
                ->orderBy('stock', 'asc')
                ->limit($limit)
                ->get()
                ->map(function ($product) {
                    return [
                        'id' => $product->id,
                        'name' => $product->name,
                        'stock' => $product->stock,
                        'price' => $product->price,
                        'image' => $product->images->first()->image_url ?? null,
                    ];
                });

            return response()->json($lowStockProducts);
        } catch (\Exception $e) {
            return response()->json([
                'message' => 'Error al obtener productos con bajo stock',
                'error' => $e->getMessage()
            ], 500);
        }
    }
}
