export default function LoadingSkeleton() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
            <div key={i} className="bg-white rounded-2xl shadow-md overflow-hidden animate-pulse">
              <div className="w-full h-56 bg-gray-200"></div>
              <div className="p-5 space-y-3">
                <div className="h-5 bg-gray-200 rounded w-4/5"></div>
                <div className="h-3 bg-gray-200 rounded w-full"></div>
                <div className="h-8 bg-gray-200 rounded w-20"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
