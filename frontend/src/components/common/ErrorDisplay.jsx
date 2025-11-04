/**
 * Error display component with retry option
 */
export default function ErrorDisplay({ message, onRetry }) {
  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="text-center">
        <p className="text-red-600 text-lg mb-4">{message}</p>
        {onRetry && (
          <button
            onClick={onRetry}
            className="px-6 py-3 bg-cyan-500 text-white rounded-lg hover:bg-cyan-600 transition"
          >
            Reintentar
          </button>
        )}
      </div>
    </div>
  );
}
