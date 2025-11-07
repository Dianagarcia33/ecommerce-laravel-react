import { useEffect } from 'react'
import { XMarkIcon, CheckCircleIcon, HeartIcon, ExclamationCircleIcon } from '@heroicons/react/24/outline'
import { HeartIcon as HeartIconSolid } from '@heroicons/react/24/solid'

export default function Toast({ message, type = 'success', onClose, duration = 3000 }) {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose()
    }, duration)

    return () => clearTimeout(timer)
  }, [duration, onClose])

  const getIcon = () => {
    switch (type) {
      case 'favorite-added':
        return <HeartIconSolid className="w-6 h-6 text-red-500" />
      case 'favorite-removed':
        return <HeartIcon className="w-6 h-6 text-gray-500" />
      case 'success':
        return <CheckCircleIcon className="w-6 h-6 text-green-500" />
      case 'warning':
        return <ExclamationCircleIcon className="w-6 h-6 text-yellow-500" />
      default:
        return <CheckCircleIcon className="w-6 h-6 text-blue-500" />
    }
  }

  const getColors = () => {
    switch (type) {
      case 'favorite-added':
        return 'bg-white border-red-200 shadow-red-100'
      case 'favorite-removed':
        return 'bg-white border-gray-200 shadow-gray-100'
      case 'success':
        return 'bg-white border-green-200 shadow-green-100'
      case 'warning':
        return 'bg-white border-yellow-200 shadow-yellow-100'
      default:
        return 'bg-white border-blue-200 shadow-blue-100'
    }
  }

  return (
    <div className="fixed top-20 right-4 z-[9999] animate-slideInRight">
      <div className={`flex items-center gap-3 px-4 py-3 rounded-xl border-2 ${getColors()} shadow-xl backdrop-blur-sm max-w-sm`}>
        <div className="flex-shrink-0 animate-bounce">
          {getIcon()}
        </div>
        <p className="text-gray-800 font-medium flex-1">{message}</p>
        <button
          onClick={onClose}
          className="flex-shrink-0 p-1 hover:bg-gray-100 rounded-full transition-colors"
        >
          <XMarkIcon className="w-4 h-4 text-gray-400 hover:text-gray-600" />
        </button>
      </div>
    </div>
  )
}
