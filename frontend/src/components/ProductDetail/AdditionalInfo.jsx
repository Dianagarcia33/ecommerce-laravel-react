import { TruckIcon, ShieldCheckIcon, ArrowPathIcon, CreditCardIcon } from '@heroicons/react/24/outline'
import { useSiteConfig } from '../../hooks/useSiteConfig'

export default function AdditionalInfo() {
  const { colors } = useSiteConfig()

  const benefits = [
    {
      icon: TruckIcon,
      text: 'Envío gratis en compras superiores a $50'
    },
    {
      icon: ShieldCheckIcon,
      text: 'Garantía de satisfacción'
    },
    {
      icon: ArrowPathIcon,
      text: 'Devoluciones dentro de 30 días'
    },
    {
      icon: CreditCardIcon,
      text: 'Pago seguro'
    }
  ]

  return (
    <div className="mt-8 pt-8 border-t-2 border-gray-200">
      <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
        <ShieldCheckIcon className="w-6 h-6" style={{ color: colors.primary.hex }} />
        Información Adicional
      </h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {benefits.map((benefit, index) => {
          const Icon = benefit.icon
          return (
            <div
              key={index}
              className="flex items-start gap-3 p-4 bg-gradient-to-br from-gray-50 to-white rounded-xl border border-gray-200 hover:shadow-md transition-all duration-300"
            >
              <div
                className="flex-shrink-0 w-10 h-10 rounded-lg flex items-center justify-center"
                style={{ backgroundColor: `${colors.primary.hex}15` }}
              >
                <Icon className="w-6 h-6" style={{ color: colors.primary.hex }} />
              </div>
              <p className="text-gray-700 text-sm leading-relaxed pt-1">
                {benefit.text}
              </p>
            </div>
          )
        })}
      </div>
    </div>
  )
}
