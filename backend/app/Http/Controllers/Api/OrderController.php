<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Order;
use App\Models\OrderItem;
use App\Models\Product;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class OrderController extends Controller
{
    public function index(Request $request)
    {
        $user = $request->user();
        
        // Si es admin, ver todas las órdenes
        if ($user->role === 'admin') {
            $orders = Order::with(['user', 'items.product'])->latest()->get();
        } else {
            // Si es usuario normal, solo sus órdenes
            $orders = Order::with(['items.product'])
                ->where('user_id', $user->id)
                ->latest()
                ->get();
        }

        return response()->json($orders);
    }

    public function store(Request $request)
    {
        $request->validate([
            'items' => 'required|array|min:1',
            'items.*.product_id' => 'required|exists:products,id',
            'items.*.quantity' => 'required|integer|min:1',
            'customer_name' => 'required|string',
            'customer_email' => 'required|email',
            'customer_phone' => 'nullable|string',
            'shipping_address' => 'required|string',
            'notes' => 'nullable|string',
            'is_guest' => 'boolean',
        ]);

        try {
            DB::beginTransaction();

            $total = 0;
            $orderItems = [];

            // Calcular total y validar stock
            foreach ($request->items as $item) {
                $product = Product::findOrFail($item['product_id']);
                
                if ($product->stock < $item['quantity']) {
                    return response()->json([
                        'message' => "Stock insuficiente para {$product->name}"
                    ], 400);
                }

                $subtotal = $product->price * $item['quantity'];
                $total += $subtotal;

                $orderItems[] = [
                    'product_id' => $product->id,
                    'quantity' => $item['quantity'],
                    'price' => $product->price
                ];

                // Reducir stock
                $product->decrement('stock', $item['quantity']);
            }

            // Determinar si es invitado o usuario autenticado
            $isGuest = $request->input('is_guest', false) || !$request->user();
            
            // Crear orden
            $order = Order::create([
                'user_id' => $isGuest ? null : $request->user()->id,
                'is_guest' => $isGuest,
                'guest_token' => $isGuest ? Order::generateGuestToken() : null,
                'total' => $total,
                'status' => 'pending',
                'customer_name' => $request->customer_name,
                'customer_email' => $request->customer_email,
                'customer_phone' => $request->customer_phone,
                'shipping_address' => $request->shipping_address,
                'notes' => $request->notes,
            ]);

            // Crear items de la orden
            foreach ($orderItems as $item) {
                $order->items()->create($item);
            }

            DB::commit();

            $response = [
                'message' => 'Orden creada exitosamente',
                'order' => $order->load('items.product')
            ];

            // Si es invitado, incluir el token para rastreo
            if ($isGuest) {
                $response['guest_token'] = $order->guest_token;
                $response['tracking_url'] = url("/track-order/{$order->guest_token}");
            }

            return response()->json($response, 201);

        } catch (\Exception $e) {
            DB::rollBack();
            return response()->json([
                'message' => 'Error al crear la orden',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    public function show($id)
    {
        $order = Order::with(['items.product', 'user'])->findOrFail($id);
        
        // Solo el dueño de la orden o un admin puede verla
        if (auth()->user()->id !== $order->user_id && auth()->user()->role !== 'admin') {
            return response()->json(['message' => 'No autorizado'], 403);
        }

        return response()->json($order);
    }

    public function updateStatus(Request $request, $id)
    {
        // Solo admin puede actualizar el status
        if (auth()->user()->role !== 'admin') {
            return response()->json(['message' => 'No autorizado'], 403);
        }

        $request->validate([
            'status' => 'required|in:pending,processing,completed,cancelled'
        ]);

        $order = Order::findOrFail($id);
        $order->update(['status' => $request->status]);

        return response()->json([
            'message' => 'Estado actualizado exitosamente',
            'order' => $order
        ]);
    }

    /**
     * Rastrear orden de invitado por token
     */
    public function trackGuestOrder(Request $request)
    {
        $request->validate([
            'token' => 'required|string',
            'email' => 'required|email'
        ]);

        $order = Order::where('guest_token', $request->token)
            ->where('customer_email', $request->email)
            ->where('is_guest', true)
            ->with('items.product')
            ->first();

        if (!$order) {
            return response()->json([
                'message' => 'Orden no encontrada. Verifica el código y email.'
            ], 404);
        }

        return response()->json([
            'order' => $order
        ]);
    }
}
