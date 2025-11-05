<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\NewsletterSubscriber;
use App\Mail\Newsletter;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Facades\Validator;

class NewsletterController extends Controller
{
    /**
     * Obtener todos los suscriptores
     */
    public function index(Request $request)
    {
        $query = NewsletterSubscriber::query();

        // Filtrar por estado
        if ($request->has('status') && $request->status !== 'all') {
            $query->where('status', $request->status);
        }

        // Búsqueda
        if ($request->has('search') && $request->search) {
            $query->where(function($q) use ($request) {
                $q->where('email', 'like', '%' . $request->search . '%')
                  ->orWhere('name', 'like', '%' . $request->search . '%');
            });
        }

        // Ordenar
        $sortBy = $request->input('sort_by', 'created_at');
        $sortOrder = $request->input('sort_order', 'desc');
        $query->orderBy($sortBy, $sortOrder);

        // Paginación
        $perPage = $request->input('per_page', 15);
        $subscribers = $query->paginate($perPage);

        return response()->json([
            'success' => true,
            'subscribers' => $subscribers
        ]);
    }

    /**
     * Estadísticas de newsletter
     */
    public function stats()
    {
        $stats = [
            'total' => NewsletterSubscriber::count(),
            'active' => NewsletterSubscriber::where('status', 'active')->count(),
            'inactive' => NewsletterSubscriber::where('status', 'inactive')->count(),
            'recent' => NewsletterSubscriber::where('created_at', '>=', now()->subDays(7))->count(),
        ];

        return response()->json([
            'success' => true,
            'stats' => $stats
        ]);
    }

    /**
     * Suscribirse al newsletter (endpoint público)
     */
    public function subscribe(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'email' => 'required|email|unique:newsletter_subscribers,email',
            'name' => 'nullable|string|max:255'
        ]);

        if ($validator->fails()) {
            return response()->json([
                'success' => false,
                'errors' => $validator->errors()
            ], 422);
        }

        $subscriber = NewsletterSubscriber::create([
            'email' => $request->email,
            'name' => $request->name,
            'status' => 'active',
            'subscribed_at' => now()
        ]);

        return response()->json([
            'success' => true,
            'message' => '¡Gracias por suscribirte! Recibirás nuestras novedades en tu correo.',
            'subscriber' => $subscriber
        ], 201);
    }

    /**
     * Desuscribirse del newsletter (endpoint público con token)
     */
    public function unsubscribe(Request $request, $token)
    {
        $subscriber = NewsletterSubscriber::where('token', $token)->first();

        if (!$subscriber) {
            return response()->json([
                'success' => false,
                'message' => 'Token de suscripción inválido'
            ], 404);
        }

        $subscriber->unsubscribe();

        return response()->json([
            'success' => true,
            'message' => 'Has sido desuscrito exitosamente'
        ]);
    }

    /**
     * Enviar newsletter a todos los suscriptores activos
     */
    public function send(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'subject' => 'required|string|max:500',
            'content' => 'required|string',
            'data' => 'nullable|array'
        ]);

        if ($validator->fails()) {
            return response()->json([
                'success' => false,
                'errors' => $validator->errors()
            ], 422);
        }

        $subscribers = NewsletterSubscriber::active()->get();
        $count = 0;

        foreach ($subscribers as $subscriber) {
            Mail::to($subscriber->email)->queue(
                new Newsletter(
                    $subscriber,
                    $request->subject,
                    $request->content,
                    $request->data ?? []
                )
            );
            $count++;
        }

        return response()->json([
            'success' => true,
            'message' => "Newsletter enviado a {$count} suscriptores",
            'count' => $count
        ]);
    }

    /**
     * Enviar newsletter de prueba
     */
    public function sendTest(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'email' => 'required|email',
            'subject' => 'required|string|max:500',
            'content' => 'required|string',
            'data' => 'nullable|array'
        ]);

        if ($validator->fails()) {
            return response()->json([
                'success' => false,
                'errors' => $validator->errors()
            ], 422);
        }

        // Crear suscriptor temporal para la vista previa
        $testSubscriber = new NewsletterSubscriber([
            'email' => $request->email,
            'name' => 'Usuario de Prueba',
            'token' => 'test-token'
        ]);

        Mail::to($request->email)->send(
            new Newsletter(
                $testSubscriber,
                '[PRUEBA] ' . $request->subject,
                $request->content,
                $request->data ?? []
            )
        );

        return response()->json([
            'success' => true,
            'message' => 'Email de prueba enviado a ' . $request->email
        ]);
    }

    /**
     * Eliminar un suscriptor
     */
    public function destroy($id)
    {
        $subscriber = NewsletterSubscriber::find($id);
        
        if (!$subscriber) {
            return response()->json([
                'success' => false,
                'message' => 'Suscriptor no encontrado'
            ], 404);
        }

        $subscriber->delete();

        return response()->json([
            'success' => true,
            'message' => 'Suscriptor eliminado exitosamente'
        ]);
    }

    /**
     * Activar suscripción
     */
    public function activate($id)
    {
        $subscriber = NewsletterSubscriber::find($id);
        
        if (!$subscriber) {
            return response()->json([
                'success' => false,
                'message' => 'Suscriptor no encontrado'
            ], 404);
        }

        $subscriber->subscribe();

        return response()->json([
            'success' => true,
            'message' => 'Suscriptor activado exitosamente',
            'subscriber' => $subscriber
        ]);
    }
}
