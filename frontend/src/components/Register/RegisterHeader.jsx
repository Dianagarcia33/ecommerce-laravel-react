import { ShoppingBagIcon } from '@heroicons/react/24/outline'

export default function RegisterHeader() {
  return (
    <div className="text-center mb-8">
      <div className="inline-flex items-center justify-center bg-gradient-to-r from-lime-400 to-green-500 p-4 rounded-2xl shadow-2xl mb-4">
        <ShoppingBagIcon className="h-12 w-12 text-white" />
      </div>
      <h2 className="text-4xl font-extrabold text-white mb-2">Únete a nosotros</h2>
      <p className="text-gray-300">Crea tu cuenta y comienza a comprar</p>
    </div>
  )
}
