import { TagIcon } from '@heroicons/react/24/outline'
import { useSiteConfig } from '../../hooks/useSiteConfig'

export default function EmptyState() {
  const config = useSiteConfig()

  return (
    <div className="text-center py-20">
      <div className="bg-gray-50 border-2 border-gray-200 rounded-2xl p-12 max-w-md mx-auto">
        <TagIcon className="w-16 h-16 text-gray-400 mx-auto mb-4" />
        <p className="text-gray-600 text-lg font-medium">{config.products.noResultsTitle}</p>
      </div>
    </div>
  )
}
