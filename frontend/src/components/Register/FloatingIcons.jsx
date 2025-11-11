import { SparklesIcon, ShoppingBagIcon, CheckCircleIcon } from '@heroicons/react/24/outline'

export default function FloatingIcons() {
  return (
    <div className="absolute inset-0 pointer-events-none">
      <SparklesIcon className="absolute top-20 left-10 w-12 h-12 text-lime-300 opacity-20 animate-float" />
      <ShoppingBagIcon className="absolute top-40 right-20 w-16 h-16 text-cyan-300 opacity-20 animate-float" style={{ animationDelay: '1s' }} />
      <CheckCircleIcon className="absolute bottom-32 left-1/4 w-14 h-14 text-orange-300 opacity-20 animate-float" style={{ animationDelay: '2s' }} />
    </div>
  )
}
