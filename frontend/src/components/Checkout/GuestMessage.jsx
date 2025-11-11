import { useNavigate } from 'react-router-dom';

export default function GuestMessage() {
  const navigate = useNavigate();

  return (
    <div className="bg-blue-50 border-2 border-blue-200 rounded-xl p-4 mb-6">
      <div className="flex items-start gap-3">
        <svg className="w-6 h-6 text-blue-600 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        <div className="flex-1">
          <p className="font-semibold text-blue-900 mb-1">Compra como invitado</p>
          <p className="text-sm text-blue-700">
            No necesitas crear una cuenta. Te enviaremos un código para rastrear tu pedido.
          </p>
          <button
            type="button"
            onClick={() => navigate('/login')}
            className="text-sm font-semibold text-blue-600 hover:text-blue-800 underline mt-2"
          >
            ¿Ya tienes cuenta? Inicia sesión aquí
          </button>
        </div>
      </div>
    </div>
  );
}
