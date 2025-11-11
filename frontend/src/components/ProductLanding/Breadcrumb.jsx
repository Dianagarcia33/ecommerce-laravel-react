import { Link } from 'react-router-dom'

export default function Breadcrumb({ productName }) {
  return (
    <nav className="flex items-center gap-2 text-sm text-gray-400 mb-16">
      <Link to="/" className="hover:text-cyan-500 transition-colors">Inicio</Link>
      <span className="text-gray-300">/</span>
      <Link to="/products" className="hover:text-cyan-500 transition-colors">Productos</Link>
      <span className="text-gray-300">/</span>
      <span className="text-gray-700 font-medium truncate">{productName}</span>
    </nav>
  )
}
