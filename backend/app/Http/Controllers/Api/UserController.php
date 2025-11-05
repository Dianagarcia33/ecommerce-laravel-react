<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\User;
use App\Models\Order;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;
use Illuminate\Validation\Rule;

class UserController extends Controller
{
    /**
     * Display a listing of users with filters
     */
    public function index(Request $request)
    {
        try {
            $query = User::query();

            // Filtro por rol
            if ($request->has('role') && $request->role !== 'all') {
                $query->where('role', $request->role);
            }

            // Filtro por estado
            if ($request->has('status') && $request->status !== 'all') {
                $query->where('status', $request->status);
            }

            // Búsqueda por nombre o email
            if ($request->has('search') && $request->search) {
                $search = $request->search;
                $query->where(function ($q) use ($search) {
                    $q->where('name', 'like', "%{$search}%")
                      ->orWhere('email', 'like', "%{$search}%");
                });
            }

            // Ordenamiento
            $sortBy = $request->get('sort_by', 'created_at');
            $sortOrder = $request->get('sort_order', 'desc');
            $query->orderBy($sortBy, $sortOrder);

            // Paginación
            $perPage = $request->get('per_page', 10);
            $users = $query->paginate($perPage);

            // Agregar información adicional
            $users->getCollection()->transform(function ($user) {
                return [
                    'id' => $user->id,
                    'name' => $user->name,
                    'email' => $user->email,
                    'phone' => $user->phone,
                    'role' => $user->role,
                    'avatar' => $user->avatar,
                    'status' => $user->status,
                    'last_login_at' => $user->last_login_at ? $user->last_login_at->format('Y-m-d H:i:s') : null,
                    'last_login_at_human' => $user->last_login_at ? $user->last_login_at->diffForHumans() : 'Nunca',
                    'last_login_ip' => $user->last_login_ip,
                    'created_at' => $user->created_at->format('Y-m-d H:i:s'),
                    'orders_count' => $user->orders()->count(),
                    'total_spent' => $user->orders()->where('status', 'completed')->sum('total'),
                ];
            });

            return response()->json($users);
        } catch (\Exception $e) {
            return response()->json([
                'message' => 'Error al obtener usuarios',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    /**
     * Store a newly created user
     */
    public function store(Request $request)
    {
        try {
            $validator = Validator::make($request->all(), [
                'name' => 'required|string|max:255',
                'email' => 'required|string|email|max:255|unique:users',
                'phone' => 'nullable|string|max:20',
                'password' => 'required|string|min:8|confirmed',
                'role' => 'required|in:admin,user,vendor',
                'status' => 'nullable|in:active,inactive,suspended',
            ]);

            if ($validator->fails()) {
                return response()->json([
                    'message' => 'Error de validación',
                    'errors' => $validator->errors()
                ], 422);
            }

            $user = User::create([
                'name' => $request->name,
                'email' => $request->email,
                'phone' => $request->phone,
                'password' => Hash::make($request->password),
                'role' => $request->role,
                'status' => $request->status ?? 'active',
            ]);

            return response()->json([
                'message' => 'Usuario creado exitosamente',
                'user' => [
                    'id' => $user->id,
                    'name' => $user->name,
                    'email' => $user->email,
                    'phone' => $user->phone,
                    'role' => $user->role,
                    'status' => $user->status,
                    'created_at' => $user->created_at->format('Y-m-d H:i:s'),
                ]
            ], 201);
        } catch (\Exception $e) {
            return response()->json([
                'message' => 'Error al crear usuario',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    /**
     * Display the specified user
     */
    public function show($id)
    {
        try {
            $user = User::findOrFail($id);

            // Obtener órdenes recientes
            $recentOrders = $user->orders()
                ->orderBy('created_at', 'desc')
                ->limit(5)
                ->get()
                ->map(function ($order) {
                    return [
                        'id' => $order->id,
                        'total' => floatval($order->total),
                        'status' => $order->status,
                        'created_at' => $order->created_at->format('Y-m-d H:i:s'),
                        'created_at_human' => $order->created_at->diffForHumans(),
                    ];
                });

            // Estadísticas del usuario
            $stats = [
                'total_orders' => $user->orders()->count(),
                'completed_orders' => $user->orders()->where('status', 'completed')->count(),
                'pending_orders' => $user->orders()->where('status', 'pending')->count(),
                'cancelled_orders' => $user->orders()->where('status', 'cancelled')->count(),
                'total_spent' => floatval($user->orders()->where('status', 'completed')->sum('total')),
                'average_order' => floatval($user->orders()->where('status', 'completed')->avg('total')),
            ];

            return response()->json([
                'user' => [
                    'id' => $user->id,
                    'name' => $user->name,
                    'email' => $user->email,
                    'phone' => $user->phone,
                    'role' => $user->role,
                    'avatar' => $user->avatar,
                    'status' => $user->status,
                    'last_login_at' => $user->last_login_at ? $user->last_login_at->format('Y-m-d H:i:s') : null,
                    'last_login_at_human' => $user->last_login_at ? $user->last_login_at->diffForHumans() : 'Nunca',
                    'last_login_ip' => $user->last_login_ip,
                    'created_at' => $user->created_at->format('Y-m-d H:i:s'),
                    'email_verified_at' => $user->email_verified_at ? $user->email_verified_at->format('Y-m-d H:i:s') : null,
                ],
                'stats' => $stats,
                'recent_orders' => $recentOrders,
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'message' => 'Usuario no encontrado',
                'error' => $e->getMessage()
            ], 404);
        }
    }

    /**
     * Update the specified user
     */
    public function update(Request $request, $id)
    {
        try {
            $user = User::findOrFail($id);

            $validator = Validator::make($request->all(), [
                'name' => 'sometimes|required|string|max:255',
                'email' => [
                    'sometimes',
                    'required',
                    'string',
                    'email',
                    'max:255',
                    Rule::unique('users')->ignore($user->id)
                ],
                'phone' => 'nullable|string|max:20',
                'password' => 'nullable|string|min:8|confirmed',
                'role' => 'sometimes|required|in:admin,user,vendor',
                'status' => 'sometimes|required|in:active,inactive,suspended',
            ]);

            if ($validator->fails()) {
                return response()->json([
                    'message' => 'Error de validación',
                    'errors' => $validator->errors()
                ], 422);
            }

            // Actualizar campos
            if ($request->has('name')) $user->name = $request->name;
            if ($request->has('email')) $user->email = $request->email;
            if ($request->has('phone')) $user->phone = $request->phone;
            if ($request->has('role')) $user->role = $request->role;
            if ($request->has('status')) $user->status = $request->status;
            if ($request->has('password') && $request->password) {
                $user->password = Hash::make($request->password);
            }

            $user->save();

            return response()->json([
                'message' => 'Usuario actualizado exitosamente',
                'user' => [
                    'id' => $user->id,
                    'name' => $user->name,
                    'email' => $user->email,
                    'phone' => $user->phone,
                    'role' => $user->role,
                    'status' => $user->status,
                ]
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'message' => 'Error al actualizar usuario',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    /**
     * Remove the specified user
     */
    public function destroy($id)
    {
        try {
            $user = User::findOrFail($id);

            // No permitir eliminar el propio usuario
            if (auth()->id() === $user->id) {
                return response()->json([
                    'message' => 'No puedes eliminar tu propia cuenta'
                ], 403);
            }

            // Verificar si el usuario tiene órdenes
            $ordersCount = $user->orders()->count();
            if ($ordersCount > 0) {
                return response()->json([
                    'message' => "No se puede eliminar el usuario porque tiene {$ordersCount} órdenes asociadas. Considera desactivarlo en su lugar.",
                    'orders_count' => $ordersCount
                ], 409);
            }

            $user->delete();

            return response()->json([
                'message' => 'Usuario eliminado exitosamente'
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'message' => 'Error al eliminar usuario',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    /**
     * Update user status
     */
    public function updateStatus(Request $request, $id)
    {
        try {
            $user = User::findOrFail($id);

            $validator = Validator::make($request->all(), [
                'status' => 'required|in:active,inactive,suspended',
            ]);

            if ($validator->fails()) {
                return response()->json([
                    'message' => 'Error de validación',
                    'errors' => $validator->errors()
                ], 422);
            }

            $user->status = $request->status;
            $user->save();

            return response()->json([
                'message' => 'Estado actualizado exitosamente',
                'user' => [
                    'id' => $user->id,
                    'name' => $user->name,
                    'status' => $user->status,
                ]
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'message' => 'Error al actualizar estado',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    /**
     * Get user statistics
     */
    public function statistics()
    {
        try {
            $stats = [
                'total' => User::count(),
                'by_role' => [
                    'admin' => User::where('role', 'admin')->count(),
                    'user' => User::where('role', 'user')->count(),
                    'vendor' => User::where('role', 'vendor')->count(),
                ],
                'by_status' => [
                    'active' => User::where('status', 'active')->count(),
                    'inactive' => User::where('status', 'inactive')->count(),
                    'suspended' => User::where('status', 'suspended')->count(),
                ],
                'recent' => User::orderBy('created_at', 'desc')->limit(5)->get()->map(function ($user) {
                    return [
                        'id' => $user->id,
                        'name' => $user->name,
                        'email' => $user->email,
                        'role' => $user->role,
                        'created_at' => $user->created_at->diffForHumans(),
                    ];
                }),
                'active_today' => User::whereDate('last_login_at', today())->count(),
            ];

            return response()->json($stats);
        } catch (\Exception $e) {
            return response()->json([
                'message' => 'Error al obtener estadísticas',
                'error' => $e->getMessage()
            ], 500);
        }
    }
}
