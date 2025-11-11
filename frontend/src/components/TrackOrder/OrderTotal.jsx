export default function OrderTotal({ total }) {
  return (
    <div className="mt-6 pt-6 border-t border-gray-200">
      <div className="flex justify-between items-center">
        <span className="text-xl font-bold text-gray-900">Total</span>
        <span className="text-3xl font-extrabold bg-gradient-to-r from-cyan-500 to-teal-600 bg-clip-text text-transparent">
          ${total}
        </span>
      </div>
    </div>
  )
}
