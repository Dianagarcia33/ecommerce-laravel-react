<x-mail::message>
Hola **{{ $subscriber->name ?? 'Suscriptor' }}**,

{!! $emailContent !!}

@if(isset($data['products']) && count($data['products']) > 0)
## Productos Destacados

<x-mail::table>
| Producto | Precio |
|:---------|-------:|
@foreach($data['products'] as $product)
| {{ $product['name'] }} | **${{ number_format($product['price'], 2) }}** |
@endforeach
</x-mail::table>
@endif

@if(isset($data['buttonText']) && isset($data['buttonUrl']))
<x-mail::button :url="$data['buttonUrl']" color="primary">
{{ $data['buttonText'] }}
</x-mail::button>
@endif

@if(isset($data['discount']))
<x-mail::panel>
🎁 **Código de Descuento Exclusivo:** {{ $data['discount']['code'] }}  
Obtén **{{ $data['discount']['percentage'] }}% OFF** en tu próxima compra.  
Válido hasta: {{ $data['discount']['expires'] }}
</x-mail::panel>
@endif

---

Gracias por ser parte de nuestra comunidad,<br>
{{ config('app.name') }}

<sub>[Cancelar suscripción]({{ $unsubscribeUrl }})</sub>
</x-mail::message>
