import { ShoppingBagIcon, SparklesIcon } from '@heroicons/react/24/outline';

export default function AnimatedBackground() {
  return (
    <>
      {/* Animated Background */}
      <div className="absolute inset-0">
        <div className="absolute top-0 right-0 w-96 h-96 bg-lime-400 rounded-full opacity-15 blur-3xl animate-pulse"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-cyan-400 rounded-full opacity-15 blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
      </div>

      {/* Floating Icons */}
      <div className="absolute inset-0 pointer-events-none">
        <ShoppingBagIcon className="absolute top-20 left-10 w-12 h-12 text-cyan-300 opacity-20 animate-float" />
        <SparklesIcon className="absolute top-40 right-20 w-16 h-16 text-lime-300 opacity-20 animate-float" style={{ animationDelay: '1s' }} />
        <ShoppingBagIcon className="absolute bottom-32 left-1/4 w-14 h-14 text-orange-300 opacity-20 animate-float" style={{ animationDelay: '2s' }} />
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
    </>
  );
}
