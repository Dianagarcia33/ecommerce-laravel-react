export default function PriceSection({ price }) {
  return (
    <div className="space-y-3">
      <div className="flex items-baseline gap-4">
        <span className="text-7xl font-extrabold bg-gradient-to-r from-cyan-500 via-cyan-600 to-teal-600 bg-clip-text text-transparent">
          ${parseFloat(price).toFixed(2)}
        </span>
        <span className="text-3xl text-gray-300 line-through font-light">
          ${(parseFloat(price) * 1.2).toFixed(2)}
        </span>
        <span className="px-3 py-1 bg-lime-400 text-gray-900 text-sm font-bold rounded-full">
          -20%
        </span>
      </div>
      <p className="text-sm text-gray-400">Precio incluye IVA</p>
    </div>
  )
}
