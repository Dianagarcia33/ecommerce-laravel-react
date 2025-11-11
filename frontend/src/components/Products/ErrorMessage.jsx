export default function ErrorMessage({ message }) {
  return (
    <div className="text-center py-20">
      <div className="bg-red-50 border-2 border-red-200 rounded-2xl p-8 max-w-md mx-auto">
        <p className="text-red-600 font-semibold">{message}</p>
      </div>
    </div>
  )
}
