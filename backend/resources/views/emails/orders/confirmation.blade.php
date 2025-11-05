<x-mail::message>
# ¡Gracias por tu compra! 🎉

Hola **{{ $order->user->name }}**,

Tu orden **#{{ $order->id }}** ha sido confirmada exitosamente.

## Detalles de la Orden

<x-mail::table>
| Producto | Cantidad | Precio |
|:---------|:--------:|-------:|
@foreach($order->items as $item)
| {{ $item->product->name }} | {{ $item->quantity }} | ${{ number_format($item->price * $item->quantity, 2) }} |
@endforeach
|  |  |  |
| **Subtotal** |  | **${{ number_format($order->subtotal, 2) }}** |
| **Impuestos** |  | **${{ number_format($order->tax, 2) }}** |
| **Envío** |  | **${{ number_format($order->shipping_cost, 2) }}** |
| **Total** |  | **${{ number_format($order->total, 2) }}** |
</x-mail::table>

## Información de Envío

**{{ $order->shipping_name }}**  
{{ $order->shipping_address }}  
{{ $order->shipping_city }}, {{ $order->shipping_state }} {{ $order->shipping_zip }}  
{{ $order->shipping_phone }}

## Estado del Pedido

Tu pedido está actualmente en estado: **{{ ucfirst($order->status) }}**

<x-mail::button :url="$orderUrl">
Ver Detalles de la Orden
</x-mail::button>

Si tienes alguna pregunta sobre tu pedido, no dudes en contactarnos.

Gracias por confiar en nosotros,<br>
{{ config('app.name') }}
</x-mail::message>
