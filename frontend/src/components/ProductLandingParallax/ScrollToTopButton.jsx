import { ArrowUpIcon } from '@heroicons/react/24/outline'

export default function ScrollToTopButton({ show, onClick }) {
  if (!show) return null

  return (
    <button
      onClick={onClick}
      className="fixed bottom-8 right-8 z-50 w-14 h-14 bg-gradient-to-r from-cyan-500 to-teal-500 text-white rounded-full shadow-2xl hover:shadow-[0_20px_60px_rgba(6,182,212,0.6)] hover:scale-110 transition-all duration-300 flex items-center justify-center group"
      aria-label="Volver arriba"
    >
      <ArrowUpIcon className="w-6 h-6 group-hover:-translate-y-1 transition-transform" />
    </button>
  )
}
