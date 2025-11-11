import { ArrowRightIcon } from '@heroicons/react/24/outline'

export default function SubmitButton({ loading }) {
  return (
    <button
      type="submit"
      disabled={loading}
      className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-lime-400 to-green-500 text-white font-bold py-4 rounded-xl hover:from-lime-300 hover:to-green-400 focus:ring-4 focus:ring-lime-200 transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 shadow-lg hover:shadow-xl mt-6"
    >
      {loading ? (
        <>
          <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
          <span>Registrando...</span>
        </>
      ) : (
        <>
          <span>Crear Cuenta</span>
          <ArrowRightIcon className="w-5 h-5" />
        </>
      )}
    </button>
  )
}
