export default function LoadingSpinner() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="flex flex-col items-center justify-center space-y-4">
        <div className="w-16 h-16 border-4 border-gray-200 border-t-primary-600 rounded-full animate-spin"></div>
        <p className="text-center text-gray-500 text-lg font-medium">Cargando producto...</p>
      </div>
    </div>
  )
}
