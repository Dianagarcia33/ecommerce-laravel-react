export default function LoadingSkeleton() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
        <div
          key={i}
          className="bg-white rounded-2xl shadow-md overflow-hidden animate-pulse"
        >
          {/* Skeleton imagen */}
          <div className="w-full h-56 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 bg-[length:200%_100%] animate-shimmer"></div>
          
          {/* Skeleton contenido */}
          <div className="p-5 space-y-3">
            {/* Skeleton título */}
            <div className="space-y-2">
              <div className="h-5 bg-gray-200 rounded-lg w-4/5"></div>
              <div className="h-5 bg-gray-200 rounded-lg w-3/5"></div>
            </div>
            
            {/* Skeleton descripción */}
            <div className="space-y-2 pt-2">
              <div className="h-3 bg-gray-200 rounded w-full"></div>
              <div className="h-3 bg-gray-200 rounded w-4/5"></div>
            </div>
            
            {/* Skeleton precio y botón */}
            <div className="flex items-center justify-between pt-4 border-t border-gray-100">
              <div className="h-8 bg-gray-200 rounded-lg w-20"></div>
              <div className="h-10 bg-gray-200 rounded-full w-24"></div>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}
