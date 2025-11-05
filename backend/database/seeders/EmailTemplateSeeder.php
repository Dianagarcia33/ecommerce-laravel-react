<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\EmailTemplate;

class EmailTemplateSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        EmailTemplate::create([
            'name' => 'welcome',
            'subject' => 'Bienvenido a ' . '{{app_name}}',
            'content' => '# ¡Bienvenido ' . '{{user_name}}' . '!' . "\n\n" .
                         'Gracias por unirte a ' . '{{app_name}}' . '. Estamos emocionados de tenerte con nosotros.' . "\n\n" .
                         '## ¿Qué puedes hacer ahora?' . "\n\n" .
                         '- Explora nuestro catálogo de productos' . "\n" .
                         '- Crea tu lista de deseos' . "\n" .
                         '- Aprovecha nuestras ofertas exclusivas' . "\n\n" .
                         '¡Comienza tu experiencia de compra hoy!',
            'variables' => json_encode(['user_name', 'app_name']),
            'is_active' => true
        ]);

        EmailTemplate::create([
            'name' => 'order_shipped',
            'subject' => 'Tu orden #' . '{{order_id}}' . ' ha sido enviada 📦',
            'content' => '# ¡Tu orden está en camino!' . "\n\n" .
                         'Hola ' . '{{user_name}}' . ',' . "\n\n" .
                         'Tu orden **#' . '{{order_id}}' . '** ha sido enviada y está en camino.' . "\n\n" .
                         '**Número de seguimiento:** ' . '{{tracking_number}}' . "\n" .
                         '**Fecha estimada de entrega:** ' . '{{delivery_date}}' . "\n\n" .
                         'Puedes rastrear tu paquete en cualquier momento.',
            'variables' => json_encode(['user_name', 'order_id', 'tracking_number', 'delivery_date']),
            'is_active' => true
        ]);

        EmailTemplate::create([
            'name' => 'password_reset',
            'subject' => 'Restablecer tu contraseña',
            'content' => '# Restablecer Contraseña' . "\n\n" .
                         'Hola ' . '{{user_name}}' . ',' . "\n\n" .
                         'Recibimos una solicitud para restablecer tu contraseña.' . "\n\n" .
                         'Si no realizaste esta solicitud, puedes ignorar este correo de forma segura.' . "\n\n" .
                         '**Este enlace expirará en ' . '{{expires_in}}' . ' minutos.**',
            'variables' => json_encode(['user_name', 'reset_url', 'expires_in']),
            'is_active' => true
        ]);

        EmailTemplate::create([
            'name' => 'promotion',
            'subject' => '🎉 ¡Oferta Especial Solo Para Ti!',
            'content' => '# ¡Oferta Exclusiva!' . "\n\n" .
                         'Hola ' . '{{user_name}}' . ',' . "\n\n" .
                         '## ' . '{{promo_title}}' . "\n\n" .
                         '{{promo_description}}' . "\n\n" .
                         '**Código de descuento:** ' . '{{discount_code}}' . "\n" .
                         '**Descuento:** ' . '{{discount_percentage}}' . '% OFF' . "\n" .
                         '**Válido hasta:** ' . '{{expires_date}}' . "\n\n" .
                         '¡No dejes pasar esta oportunidad!',
            'variables' => json_encode(['user_name', 'promo_title', 'promo_description', 'discount_code', 'discount_percentage', 'expires_date']),
            'is_active' => true
        ]);

        EmailTemplate::create([
            'name' => 'order_cancelled',
            'subject' => 'Orden #' . '{{order_id}}' . ' cancelada',
            'content' => '# Orden Cancelada' . "\n\n" .
                         'Hola ' . '{{user_name}}' . ',' . "\n\n" .
                         'Tu orden **#' . '{{order_id}}' . '** ha sido cancelada.' . "\n\n" .
                         '**Motivo:** ' . '{{cancellation_reason}}' . "\n\n" .
                         '{{refund_info}}' . "\n\n" .
                         'Si tienes alguna pregunta, no dudes en contactarnos.',
            'variables' => json_encode(['user_name', 'order_id', 'cancellation_reason', 'refund_info']),
            'is_active' => true
        ]);

        EmailTemplate::create([
            'name' => 'back_in_stock',
            'subject' => '{{product_name}}' . ' está de vuelta en stock! 🎊',
            'content' => '# ¡Buenas Noticias!' . "\n\n" .
                         'Hola ' . '{{user_name}}' . ',' . "\n\n" .
                         'El producto que estabas esperando ya está disponible:' . "\n\n" .
                         '## ' . '{{product_name}}' . "\n\n" .
                         '**Precio:** $' . '{{product_price}}' . "\n\n" .
                         '¡Corre a conseguirlo antes de que se agote de nuevo!',
            'variables' => json_encode(['user_name', 'product_name', 'product_price', 'product_url']),
            'is_active' => true
        ]);
    }
}
