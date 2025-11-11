export default function OrderItemCard({ item }) {
  const imageUrl = item.product?.images?.[0]?.image_url?.replace(
    'http://localhost:8000/products/', 
    'http://localhost:8000/storage/products/'
  ) || 'https://placehold.co/100x100?text=Producto'

  return (
    <div className="flex items-center gap-4 bg-gray-50 rounded-xl p-4">
      <img
        src={imageUrl}
        alt={item.product?.name}
        className="w-16 h-16 object-cover rounded-lg"
      />
      <div className="flex-1">
        <h4 className="font-semibold text-gray-900">{item.product?.name}</h4>
        <p className="text-sm text-gray-600">Cantidad: {item.quantity}</p>
      </div>
      <div className="text-right">
        <p className="font-bold text-cyan-600">${item.price}</p>
        <p className="text-sm text-gray-500">c/u</p>
      </div>
    </div>
  )
}
