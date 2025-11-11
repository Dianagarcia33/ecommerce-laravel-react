import {
  TruckIcon,
  ShieldCheckIcon,
  ArrowPathIcon,
  SparklesIcon
} from '@heroicons/react/24/outline'

export default function TrustBadges() {
  const features = [
    { 
      icon: SparklesIcon, 
      title: 'Premium Quality', 
      description: 'Materiales de primera selección'
    },
    { 
      icon: TruckIcon, 
      title: 'Envío Express', 
      description: 'Entrega en 24-48 horas'
    },
    { 
      icon: ShieldCheckIcon, 
      title: 'Compra Segura', 
      description: 'Pago 100% protegido'
    },
    { 
      icon: ArrowPathIcon, 
      title: 'Devolución Gratis', 
      description: '30 días de garantía'
    },
  ]

  return (
    <div className="grid grid-cols-2 gap-4 pt-8 border-t border-gray-100">
      {features.map((feature, index) => (
        <div key={index} className="flex items-center gap-3">
          <div className="w-10 h-10 bg-gradient-to-br from-cyan-50 to-lime-50 rounded-full flex items-center justify-center flex-shrink-0">
            <feature.icon className="w-5 h-5 text-cyan-600" />
          </div>
          <div>
            <p className="font-bold text-gray-900 text-sm">{feature.title}</p>
            <p className="text-xs text-gray-400">{feature.description}</p>
          </div>
        </div>
      ))}
    </div>
  )
}
