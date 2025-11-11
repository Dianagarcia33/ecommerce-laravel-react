export default function LoadingSpinner() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-white">
      <div className="text-center">
        <div className="inline-block animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-cyan-500 mb-4"></div>
        <p className="text-gray-600 text-lg">Cargando producto...</p>
      </div>
    </div>
  )
}
