import { Link } from 'react-router-dom'
import { useSiteConfig } from '../../hooks/useSiteConfig'

export default function LoginLink() {
  const config = useSiteConfig()

  return (
    <Link
      to="/login"
      className="block w-full text-center py-3 border-2 border-gray-200 text-gray-700 font-bold rounded-xl hover:border-cyan-400 hover:bg-cyan-50 hover:text-cyan-600 transition-all duration-300"
    >
      {config.auth.register.loginLink}
    </Link>
  )
}
