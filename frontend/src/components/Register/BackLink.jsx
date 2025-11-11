import { Link } from 'react-router-dom'

export default function BackLink() {
  return (
    <div className="mt-6 text-center">
      <Link to="/" className="text-sm text-gray-300 hover:text-white transition-colors">
        ← Volver al inicio
      </Link>
    </div>
  )
}
