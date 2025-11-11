export const getStatusColor = (status) => {
  const colors = {
    pending: {
      bg: 'bg-yellow-50',
      border: 'border-yellow-200',
      text: 'text-yellow-800',
      badge: 'bg-yellow-100 border-yellow-300'
    },
    processing: {
      bg: 'bg-blue-50',
      border: 'border-blue-200',
      text: 'text-blue-800',
      badge: 'bg-blue-100 border-blue-300'
    },
    completed: {
      bg: 'bg-green-50',
      border: 'border-green-200',
      text: 'text-green-800',
      badge: 'bg-green-100 border-green-300'
    },
    cancelled: {
      bg: 'bg-red-50',
      border: 'border-red-200',
      text: 'text-red-800',
      badge: 'bg-red-100 border-red-300'
    }
  };
  return colors[status] || {
    bg: 'bg-gray-50',
    border: 'border-gray-200',
    text: 'text-gray-800',
    badge: 'bg-gray-100 border-gray-300'
  };
};

export const getStatusText = (status) => {
  const texts = {
    pending: 'Pendiente',
    processing: 'Procesando',
    completed: 'Completada',
    cancelled: 'Cancelada'
  };
  return texts[status] || status;
};

export const getStatusIcon = (status) => {
  const icons = {
    pending: '⏳',
    processing: '🔄',
    completed: '✅',
    cancelled: '❌'
  };
  return icons[status] || '📦';
};
