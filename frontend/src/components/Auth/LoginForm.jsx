import { Link } from 'react-router-dom';
import {
  EnvelopeIcon,
  LockClosedIcon,
  ArrowRightIcon
} from '@heroicons/react/24/outline';
import ErrorAlert from './ErrorAlert';
import { useSiteConfig } from '../../hooks/useSiteConfig';

export default function LoginForm({ formData, setFormData, onSubmit, loading, error }) {
  const config = useSiteConfig();

  return (
    <div className="bg-white/95 backdrop-blur-lg rounded-3xl shadow-2xl p-8 border border-gray-100">
      <ErrorAlert error={error} />

      <form onSubmit={onSubmit} className="space-y-6">
        {/* Email */}
        <div>
          <label htmlFor="email" className="block text-sm font-bold text-gray-700 mb-2">
            {config.auth.login.emailLabel}
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <EnvelopeIcon className="h-5 w-5 text-gray-400" />
            </div>
            <input
              id="email"
              type="email"
              required
              placeholder="tu@email.com"
              className="w-full pl-12 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:border-cyan-400 focus:ring-4 focus:ring-cyan-100 transition-all outline-none"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            />
          </div>
        </div>

        {/* Password */}
        <div>
          <label htmlFor="password" className="block text-sm font-bold text-gray-700 mb-2">
            {config.auth.login.passwordLabel}
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <LockClosedIcon className="h-5 w-5 text-gray-400" />
            </div>
            <input
              id="password"
              type="password"
              required
              placeholder="••••••••"
              className="w-full pl-12 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:border-cyan-400 focus:ring-4 focus:ring-cyan-100 transition-all outline-none"
              value={formData.password}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
            />
          </div>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={loading}
          className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-cyan-400 to-cyan-600 text-white font-bold py-4 rounded-xl hover:from-cyan-300 hover:to-cyan-500 focus:ring-4 focus:ring-cyan-200 transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 shadow-lg hover:shadow-xl"
        >
          {loading ? (
            <>
              <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
              <span>{config.auth.login.processingButton}</span>
            </>
          ) : (
            <>
              <span>{config.auth.login.submitButton}</span>
              <ArrowRightIcon className="w-5 h-5" />
            </>
          )}
        </button>
      </form>

      {/* Divider */}
      <div className="relative my-6">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-gray-200"></div>
        </div>
        <div className="relative flex justify-center text-sm">
          <span className="px-4 bg-gray-100 text-gray-500 font-medium">{config.auth.login.noAccount}</span>
        </div>
      </div>

      {/* Register Link */}
      <Link
        to="/register"
        className="block w-full text-center py-3 border-2 border-gray-200 text-gray-700 font-bold rounded-xl hover:border-cyan-400 hover:bg-cyan-50 hover:text-cyan-600 transition-all duration-300"
      >
        {config.auth.login.registerLink}
      </Link>
    </div>
  );
}
