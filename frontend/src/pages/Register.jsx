import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { useSiteConfig } from '../hooks/useSiteConfig'
import { EnvelopeIcon, LockClosedIcon, UserIcon } from '@heroicons/react/24/outline'
import {
  AnimatedBackground,
  FloatingIcons,
  RegisterHeader,
  ErrorAlert,
  FormInput,
  SubmitButton,
  FormDivider,
  LoginLink,
  BackLink
} from '../components/Register'

export default function Register() {
  const config = useSiteConfig()
  const navigate = useNavigate()
  const { register } = useAuth()
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    password_confirmation: ''
  })
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')

    if (formData.password !== formData.password_confirmation) {
      setError('Las contraseñas no coinciden')
      return
    }

    setLoading(true)
    const result = await register(formData)
    
    if (result.success) {
      navigate('/')
    } else {
      setError(result.error)
    }
    
    setLoading(false)
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 via-cyan-900 to-teal-900 py-12 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      <AnimatedBackground />
      <FloatingIcons />

      <div className="max-w-md w-full relative z-10">
        <RegisterHeader />

        <div className="bg-white/95 backdrop-blur-lg rounded-3xl shadow-2xl p-8 border border-gray-100">
          <ErrorAlert message={error} />

          <form onSubmit={handleSubmit} className="space-y-5">
            <FormInput
              id="name"
              label={config.auth.register.nameLabel}
              type="text"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              placeholder="Tu nombre"
              icon={UserIcon}
              required
            />

            <FormInput
              id="email"
              label={config.auth.register.emailLabel}
              type="email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              placeholder="tu@email.com"
              icon={EnvelopeIcon}
              required
            />

            <FormInput
              id="password"
              label={config.auth.register.passwordLabel}
              type="password"
              value={formData.password}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              placeholder="••••••••"
              icon={LockClosedIcon}
              required
              minLength={8}
              helperText="Mínimo 8 caracteres"
            />

            <FormInput
              id="password_confirmation"
              label={config.auth.register.confirmPasswordLabel}
              type="password"
              value={formData.password_confirmation}
              onChange={(e) => setFormData({ ...formData, password_confirmation: e.target.value })}
              placeholder="••••••••"
              icon={LockClosedIcon}
              required
            />

            <SubmitButton loading={loading} />
          </form>

          <FormDivider text={config.auth.register.hasAccount} />
          <LoginLink />
        </div>

        <BackLink />
      </div>

      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-20px); }
        }
        .animate-float {
          animation: float 3s ease-in-out infinite;
        }
      `}</style>
    </div>
  )
}
