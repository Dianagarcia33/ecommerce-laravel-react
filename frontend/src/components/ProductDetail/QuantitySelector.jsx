import { MinusIcon, PlusIcon } from '@heroicons/react/24/outline'

export default function QuantitySelector({ quantity, setQuantity, maxStock }) {
  return (
    <div className="mb-8">
      <label htmlFor="quantity" className="block text-sm font-semibold text-gray-700 mb-3">
        Cantidad:
      </label>
      <div className="flex items-center gap-4">
        <button
          onClick={() => setQuantity(Math.max(1, quantity - 1))}
          className="flex items-center justify-center w-12 h-12 bg-white border-2 border-gray-300 rounded-xl hover:border-primary-500 hover:bg-primary-50 transition-all duration-200 shadow-sm hover:shadow-md"
          disabled={quantity <= 1}
        >
          <MinusIcon className="w-5 h-5 text-gray-700" />
        </button>
        
        <input
          id="quantity"
          type="number"
          min="1"
          max={maxStock}
          value={quantity}
          onChange={(e) => {
            const value = parseInt(e.target.value) || 1
            setQuantity(Math.min(Math.max(1, value), maxStock))
          }}
          className="w-24 text-center text-xl font-bold border-2 border-gray-300 rounded-xl py-3 focus:border-primary-500 focus:ring-2 focus:ring-primary-200 transition-all duration-200"
        />
        
        <button
          onClick={() => setQuantity(Math.min(maxStock, quantity + 1))}
          className="flex items-center justify-center w-12 h-12 bg-white border-2 border-gray-300 rounded-xl hover:border-primary-500 hover:bg-primary-50 transition-all duration-200 shadow-sm hover:shadow-md"
          disabled={quantity >= maxStock}
        >
          <PlusIcon className="w-5 h-5 text-gray-700" />
        </button>
      </div>
    </div>
  )
}
