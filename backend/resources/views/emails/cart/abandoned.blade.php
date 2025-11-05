<x-mail::message>
# ¡No olvides tu carrito! 🛒

Hola **{{ $user->name }}**,

Notamos que dejaste algunos productos increíbles en tu carrito. ¡No te los pierdas!

## Productos en tu Carrito

<x-mail::table>
| Producto | Cantidad | Precio |
|:---------|:--------:|-------:|
@foreach($cartItems as $item)
| {{ $item['name'] }} | {{ $item['quantity'] }} | ${{ number_format($item['price'] * $item['quantity'], 2) }} |
@endforeach
|  |  |  |
| **Total** |  | **${{ number_format($cartTotal, 2) }}** |
</x-mail::table>

Tus productos te están esperando. ¡Completa tu compra antes de que se agoten!

<x-mail::button :url="$cartUrl" color="success">
Completar mi Compra
</x-mail::button>

## ¿Por qué comprar con nosotros?

<x-mail::panel>
✅ **Envío gratis** en compras mayores a $50  
✅ **Devoluciones fáciles** hasta 30 días  
✅ **Garantía de calidad** en todos nuestros productos  
✅ **Soporte 24/7** para ayudarte en lo que necesites
</x-mail::panel>

Si tienes alguna duda o necesitas ayuda para completar tu compra, estamos aquí para ayudarte.

¡Te esperamos!<br>
{{ config('app.name') }}

---

<sub>Este es un recordatorio automático. Si ya completaste tu compra, por favor ignora este mensaje.</sub>
</x-mail::message>
