import OrderItemCard from './OrderItemCard'

export default function ProductsList({ items }) {
  return (
    <div>
      <h3 className="font-bold text-gray-900 mb-3 text-lg">Productos</h3>
      <div className="space-y-3">
        {items?.map((item) => (
          <OrderItemCard key={item.id} item={item} />
        ))}
      </div>
    </div>
  )
}
