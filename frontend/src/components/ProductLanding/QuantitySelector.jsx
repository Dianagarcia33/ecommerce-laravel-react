export default function QuantitySelector({ quantity, setQuantity, stock }) {
  return (
    <div className="flex items-center gap-8">
      <span className="text-gray-500 font-medium text-lg">Cantidad</span>
      <div className="flex items-center gap-5">
        <button
          onClick={() => setQuantity(Math.max(1, quantity - 1))}
          className="w-12 h-12 flex items-center justify-center bg-gray-100 hover:bg-gray-200 rounded-xl transition-all text-xl font-bold text-gray-700"
        >
          −
        </button>
        <span className="w-16 text-center text-2xl font-bold text-gray-900">{quantity}</span>
        <button
          onClick={() => setQuantity(Math.min(stock, quantity + 1))}
          disabled={quantity >= stock}
          className="w-12 h-12 flex items-center justify-center bg-gray-100 hover:bg-gray-200 rounded-xl transition-all text-xl font-bold text-gray-700 disabled:opacity-40 disabled:cursor-not-allowed"
        >
          +
        </button>
      </div>
      <span className="text-gray-400 text-sm ml-auto">
        {stock} en stock
      </span>
    </div>
  )
}
