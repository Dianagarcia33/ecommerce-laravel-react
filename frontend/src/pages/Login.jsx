import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { AnimatedBackground, LoginHeader, LoginForm } from '../components/Auth';

export default function Login() {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    const result = await login(formData.email, formData.password);
    
    if (result.success) {
      navigate('/');
    } else {
      setError(result.error);
    }
    
    setLoading(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 via-cyan-900 to-teal-900 py-12 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      <AnimatedBackground />

      <div className="max-w-md w-full relative z-10">
        <LoginHeader />

        <LoginForm 
          formData={formData}
          setFormData={setFormData}
          onSubmit={handleSubmit}
          loading={loading}
          error={error}
        />

        {/* Footer Links */}
        <div className="mt-6 text-center">
          <Link to="/" className="text-sm text-gray-300 hover:text-white transition-colors">
            ← Volver al inicio
          </Link>
        </div>
      </div>
    </div>
  );
}
