import { XMarkIcon, TruckIcon, MapPinIcon } from '@heroicons/react/24/outline';
import { useState, useEffect } from 'react';
import { useSiteConfig } from '../hooks/useSiteConfig';

export default function AnnouncementBar() {
  const config = useSiteConfig();
  const { announcement, theme } = config;
  const { colors } = theme;
  const [isVisible, setIsVisible] = useState(true);

  // Si no está habilitado el announcement o fue cerrado, no mostrar nada
  if (!announcement?.enabled || !isVisible) {
    return null;
  }

  return (
    <div
      className="fixed top-0 left-0 right-0 z-[60] w-full text-white text-center text-sm font-medium overflow-hidden"
      style={{
        background: `linear-gradient(90deg, ${colors.primary.hex}, ${colors.primary.dark}, ${colors.secondary.hex})`,
        padding: '10px 16px',
        margin: 0,
        border: 'none',
        height: '44px',
        lineHeight: '24px'
      }}
    >
      {/* Patrón decorativo de fondo */}
      <div
        className="absolute inset-0 opacity-10"
        style={{
          backgroundImage: 'radial-gradient(circle, rgba(255, 255, 255, 0.3) 1px, transparent 1px)',
          backgroundSize: '20px 20px'
        }}
      />

      {/* Contenido */}
      <div className="relative flex items-center justify-center gap-4 max-w-7xl mx-auto">
        {/* Icono de camión */}
        {announcement.showIcon && (
          <TruckIcon className="w-5 h-5 flex-shrink-0 animate-pulse hidden sm:block" />
        )}

        {/* Mensajes */}
        <div className="flex items-center gap-4 flex-wrap justify-center">
          <span className="flex items-center gap-1.5">
            <MapPinIcon className="w-4 h-4" />
            {announcement.message1}
          </span>

          {announcement.message2 && (
            <>
              <span className="hidden sm:inline text-white/60">•</span>
              <span className="flex items-center gap-1.5">
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                {announcement.message2}
              </span>
            </>
          )}
        </div>

        {/* Botón para cerrar */}
        {announcement.closeable && (
          <button
            onClick={() => setIsVisible(false)}
            className="absolute right-2 sm:right-4 p-1 hover:bg-white/10 rounded-full transition-colors"
            aria-label="Cerrar anuncio"
          >
            <XMarkIcon className="w-4 h-4" />
          </button>
        )}
      </div>

      {/* Animación de brillo */}
      <div
        className="absolute top-0 left-0 w-full h-full pointer-events-none"
        style={{
          background: 'linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.1), transparent)',
          animation: 'shimmer 3s infinite'
        }}
      />

      <style>{`
        @keyframes shimmer {
          0% {
            transform: translateX(-100%);
          }
          100% {
            transform: translateX(100%);
          }
        }
      `}</style>
    </div>
  );
}
