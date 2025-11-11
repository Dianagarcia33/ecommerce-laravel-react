import GuestMessage from './GuestMessage';

export default function ShippingForm({ user, error, formData, setFormData, loading, onSubmit }) {
  return (
    <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 bg-gradient-to-br from-cyan-400 to-cyan-600 rounded-xl flex items-center justify-center">
          <svg className="w-6 h-6 text-gray-900" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
        </div>
        <h2 className="text-2xl font-bold text-gray-900">Datos de Envío</h2>
      </div>

      {/* Mensaje para invitados */}
      {!user && <GuestMessage />}
      
      {error && (
        <div className="bg-red-50 border-2 border-red-200 text-red-700 px-4 py-3 rounded-xl mb-6 flex items-start">
          <svg className="w-5 h-5 mr-2 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd"/>
          </svg>
          <span>{error}</span>
        </div>
      )}

      <form onSubmit={onSubmit} className="space-y-5">
        <div>
          <label className="block text-sm font-bold text-gray-700 mb-2">Nombre Completo</label>
          <input
            type="text"
            required
            value={formData.customer_name}
            onChange={(e) => setFormData({ ...formData, customer_name: e.target.value })}
            className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-cyan-400 focus:ring-4 focus:ring-cyan-100 transition-all outline-none"
            placeholder="Juan Pérez"
          />
        </div>

        <div>
          <label className="block text-sm font-bold text-gray-700 mb-2">Email</label>
          <input
            type="email"
            required
            value={formData.customer_email}
            onChange={(e) => setFormData({ ...formData, customer_email: e.target.value })}
            className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-cyan-400 focus:ring-4 focus:ring-cyan-100 transition-all outline-none"
            placeholder="juan@email.com"
          />
        </div>

        <div>
          <label className="block text-sm font-bold text-gray-700 mb-2">Teléfono</label>
          <input
            type="tel"
            value={formData.customer_phone}
            onChange={(e) => setFormData({ ...formData, customer_phone: e.target.value })}
            className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-cyan-400 focus:ring-4 focus:ring-cyan-100 transition-all outline-none"
            placeholder="+1 234 567 890"
          />
        </div>

        <div>
          <label className="block text-sm font-bold text-gray-700 mb-2">Dirección de Envío</label>
          <textarea
            required
            rows="3"
            value={formData.shipping_address}
            onChange={(e) => setFormData({ ...formData, shipping_address: e.target.value })}
            className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-cyan-400 focus:ring-4 focus:ring-cyan-100 transition-all outline-none resize-none"
            placeholder="Calle Principal 123, Apartamento 4B, Ciudad"
          />
        </div>

        <div>
          <label className="block text-sm font-bold text-gray-700 mb-2">Notas (Opcional)</label>
          <textarea
            rows="2"
            value={formData.notes}
            onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
            className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-cyan-400 focus:ring-4 focus:ring-cyan-100 transition-all outline-none resize-none"
            placeholder="Instrucciones especiales de entrega..."
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-lime-400 to-green-500 text-gray-900 font-bold py-4 rounded-xl hover:from-lime-300 hover:to-green-400 focus:ring-4 focus:ring-lime-200 transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 shadow-lg hover:shadow-xl"
        >
          {loading ? (
            <>
              <div className="w-5 h-5 border-2 border-gray-900 border-t-transparent rounded-full animate-spin"></div>
              <span>Procesando...</span>
            </>
          ) : (
            <>
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
              </svg>
              <span>Confirmar Orden</span>
            </>
          )}
        </button>
      </form>
    </div>
  );
}
