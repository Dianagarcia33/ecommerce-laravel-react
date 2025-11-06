import { useState, useEffect } from 'react';
import { 
  UserGroupIcon, 
  MagnifyingGlassIcon,
  PlusIcon,
  PencilIcon,
  TrashIcon,
  FunnelIcon,
  CheckCircleIcon,
  XCircleIcon,
  ExclamationCircleIcon,
  ShieldCheckIcon,
  UserIcon,
  ShoppingBagIcon as VendorIcon,
  EyeIcon,
  ArrowPathIcon
} from '@heroicons/react/24/outline';
import { userService } from '../../services/users';
import { useSiteConfig } from '../../hooks/useSiteConfig';

export default function UsersManager() {
  const config = useSiteConfig();
  const { colors } = config.theme;

  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [userDetails, setUserDetails] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  
  // Filtros
  const [filters, setFilters] = useState({
    role: 'all',
    status: 'all',
    search: '',
    sort_by: 'created_at',
    sort_order: 'desc',
    per_page: 10,
    page: 1,
  });

  // Paginación
  const [pagination, setPagination] = useState({
    current_page: 1,
    last_page: 1,
    total: 0,
    per_page: 10,
  });

  // Form data
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    password: '',
    password_confirmation: '',
    role: 'user',
    status: 'active',
  });

  useEffect(() => {
    loadUsers();
  }, [filters]);

  const loadUsers = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await userService.getUsers(filters);
      setUsers(response.data);
      setPagination({
        current_page: response.current_page,
        last_page: response.last_page,
        total: response.total,
        per_page: response.per_page,
      });
    } catch (err) {
      setError('Error al cargar usuarios');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleFilter = (key, value) => {
    setFilters(prev => ({ ...prev, [key]: value, page: 1 }));
  };

  const handlePageChange = (page) => {
    setFilters(prev => ({ ...prev, page }));
  };

  const handleOpenModal = (user = null) => {
    if (user) {
      setIsEditing(true);
      setSelectedUser(user);
      setFormData({
        name: user.name,
        email: user.email,
        phone: user.phone || '',
        password: '',
        password_confirmation: '',
        role: user.role,
        status: user.status,
      });
    } else {
      setIsEditing(false);
      setSelectedUser(null);
      setFormData({
        name: '',
        email: '',
        phone: '',
        password: '',
        password_confirmation: '',
        role: 'user',
        status: 'active',
      });
    }
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedUser(null);
    setIsEditing(false);
  };

  const handleViewDetails = async (user) => {
    try {
      setSelectedUser(user);
      setShowDetailModal(true);
      const details = await userService.getUser(user.id);
      setUserDetails(details);
    } catch (err) {
      console.error('Error loading user details:', err);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      if (isEditing) {
        await userService.updateUser(selectedUser.id, formData);
      } else {
        await userService.createUser(formData);
      }
      
      handleCloseModal();
      loadUsers();
    } catch (err) {
      console.error('Error saving user:', err);
      alert(err.response?.data?.message || 'Error al guardar usuario');
    }
  };

  const handleDelete = async (user) => {
    if (!confirm(`¿Estás seguro de eliminar al usuario "${user.name}"?`)) {
      return;
    }

    try {
      await userService.deleteUser(user.id);
      loadUsers();
    } catch (err) {
      console.error('Error deleting user:', err);
      alert(err.response?.data?.message || 'Error al eliminar usuario');
    }
  };

  const handleStatusChange = async (user, newStatus) => {
    try {
      await userService.updateStatus(user.id, newStatus);
      loadUsers();
      if (userDetails && userDetails.user.id === user.id) {
        setUserDetails({
          ...userDetails,
          user: { ...userDetails.user, status: newStatus }
        });
      }
    } catch (err) {
      console.error('Error updating status:', err);
      alert('Error al actualizar estado');
    }
  };

  const getRoleIcon = (role) => {
    switch (role) {
      case 'admin':
        return <ShieldCheckIcon className="w-4 h-4" />;
      case 'vendor':
        return <VendorIcon className="w-4 h-4" />;
      default:
        return <UserIcon className="w-4 h-4" />;
    }
  };

  const getRoleBadge = (role) => {
    const badges = {
      admin: { bg: 'bg-purple-100', text: 'text-purple-800', label: 'Admin' },
      vendor: { bg: 'bg-blue-100', text: 'text-blue-800', label: 'Vendedor' },
      user: { bg: 'bg-gray-100', text: 'text-gray-800', label: 'Cliente' },
    };
    const badge = badges[role] || badges.user;
    
    return (
      <span className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ${badge.bg} ${badge.text}`}>
        {getRoleIcon(role)}
        {badge.label}
      </span>
    );
  };

  const getStatusBadge = (status) => {
    const badges = {
      active: { 
        bg: 'bg-green-100', 
        text: 'text-green-800', 
        icon: CheckCircleIcon, 
        label: 'Activo' 
      },
      inactive: { 
        bg: 'bg-gray-100', 
        text: 'text-gray-800', 
        icon: XCircleIcon, 
        label: 'Inactivo' 
      },
      suspended: { 
        bg: 'bg-red-100', 
        text: 'text-red-800', 
        icon: ExclamationCircleIcon, 
        label: 'Suspendido' 
      },
    };
    const badge = badges[status] || badges.inactive;
    const Icon = badge.icon;
    
    return (
      <span className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ${badge.bg} ${badge.text}`}>
        <Icon className="w-4 h-4" />
        {badge.label}
      </span>
    );
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('es-MX', {
      style: 'currency',
      currency: 'MXN',
    }).format(amount || 0);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div 
                className="p-3 rounded-xl shadow-lg"
                style={{ background: `linear-gradient(135deg, ${colors.primary.hex}, ${colors.secondary.hex})` }}
              >
                <UserGroupIcon className="w-8 h-8 text-white" />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-gray-900">Gestión de Usuarios</h1>
                <p className="text-gray-600">Administra usuarios, roles y permisos</p>
              </div>
            </div>
            
            <button
              onClick={() => handleOpenModal()}
              className="flex items-center gap-2 px-4 py-2 rounded-xl text-white font-semibold shadow-lg hover:shadow-xl transition-all hover:scale-105"
              style={{ background: `linear-gradient(135deg, ${colors.primary.hex}, ${colors.secondary.hex})` }}
            >
              <PlusIcon className="w-5 h-5" />
              Nuevo Usuario
            </button>
          </div>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-xl shadow-md p-6 mb-6">
          <div className="flex items-center gap-2 mb-4">
            <FunnelIcon className="w-5 h-5 text-gray-600" />
            <h3 className="font-semibold text-gray-900">Filtros</h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {/* Search */}
            <div className="relative">
              <MagnifyingGlassIcon className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
              <input
                type="text"
                placeholder="Buscar por nombre o email..."
                value={filters.search}
                onChange={(e) => handleFilter('search', e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            {/* Role Filter */}
            <select
              value={filters.role}
              onChange={(e) => handleFilter('role', e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="all">Todos los roles</option>
              <option value="admin">Administrador</option>
              <option value="vendor">Vendedor</option>
              <option value="user">Cliente</option>
            </select>

            {/* Status Filter */}
            <select
              value={filters.status}
              onChange={(e) => handleFilter('status', e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="all">Todos los estados</option>
              <option value="active">Activo</option>
              <option value="inactive">Inactivo</option>
              <option value="suspended">Suspendido</option>
            </select>

            {/* Refresh Button */}
            <button
              onClick={loadUsers}
              disabled={loading}
              className="flex items-center justify-center gap-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors disabled:opacity-50"
            >
              <ArrowPathIcon className={`w-5 h-5 ${loading ? 'animate-spin' : ''}`} />
              Actualizar
            </button>
          </div>
        </div>

        {/* Users Table */}
        {loading ? (
          <div className="bg-white rounded-xl shadow-md p-8 text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
            <p className="mt-4 text-gray-600">Cargando usuarios...</p>
          </div>
        ) : error ? (
          <div className="bg-red-50 border-2 border-red-200 rounded-xl p-6 text-center">
            <ExclamationCircleIcon className="w-12 h-12 text-red-500 mx-auto mb-3" />
            <p className="text-red-800 font-semibold">{error}</p>
            <button
              onClick={loadUsers}
              className="mt-4 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
            >
              Reintentar
            </button>
          </div>
        ) : (
          <>
            <div className="bg-white rounded-xl shadow-md overflow-hidden">
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Usuario
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Contacto
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Rol
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Estado
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Estadísticas
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Última Actividad
                      </th>
                      <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Acciones
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {users.map((user) => (
                      <tr key={user.id} className="hover:bg-gray-50 transition-colors">
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <div className="flex-shrink-0 h-10 w-10 rounded-full bg-gradient-to-br from-blue-400 to-purple-500 flex items-center justify-center text-white font-bold">
                              {user.name.charAt(0).toUpperCase()}
                            </div>
                            <div className="ml-4">
                              <div className="text-sm font-medium text-gray-900">{user.name}</div>
                              <div className="text-xs text-gray-500">ID: {user.id}</div>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900">{user.email}</div>
                          <div className="text-xs text-gray-500">{user.phone || 'Sin teléfono'}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          {getRoleBadge(user.role)}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          {getStatusBadge(user.status)}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900">{user.orders_count || 0} órdenes</div>
                          <div className="text-xs text-gray-500">{formatCurrency(user.total_spent || 0)}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900">{user.last_login_at_human || 'Nunca'}</div>
                          <div className="text-xs text-gray-500">{user.last_login_ip || 'N/A'}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                          <div className="flex items-center justify-end gap-2">
                            <button
                              onClick={() => handleViewDetails(user)}
                              className="text-blue-600 hover:text-blue-900 p-2 hover:bg-blue-50 rounded-lg transition-colors"
                              title="Ver detalles"
                            >
                              <EyeIcon className="w-5 h-5" />
                            </button>
                            <button
                              onClick={() => handleOpenModal(user)}
                              className="text-yellow-600 hover:text-yellow-900 p-2 hover:bg-yellow-50 rounded-lg transition-colors"
                              title="Editar"
                            >
                              <PencilIcon className="w-5 h-5" />
                            </button>
                            <button
                              onClick={() => handleDelete(user)}
                              className="text-red-600 hover:text-red-900 p-2 hover:bg-red-50 rounded-lg transition-colors"
                              title="Eliminar"
                            >
                              <TrashIcon className="w-5 h-5" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Pagination */}
              {pagination.last_page > 1 && (
                <div className="bg-gray-50 px-6 py-4 flex items-center justify-between border-t border-gray-200">
                  <div className="text-sm text-gray-700">
                    Mostrando {users.length} de {pagination.total} usuarios
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={() => handlePageChange(pagination.current_page - 1)}
                      disabled={pagination.current_page === 1}
                      className="px-3 py-1 border border-gray-300 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-100 transition-colors"
                    >
                      Anterior
                    </button>
                    <span className="px-4 py-1 text-gray-700">
                      Página {pagination.current_page} de {pagination.last_page}
                    </span>
                    <button
                      onClick={() => handlePageChange(pagination.current_page + 1)}
                      disabled={pagination.current_page === pagination.last_page}
                      className="px-3 py-1 border border-gray-300 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-100 transition-colors"
                    >
                      Siguiente
                    </button>
                  </div>
                </div>
              )}
            </div>
          </>
        )}
      </div>

      {/* Create/Edit Modal */}
      {showModal && (
        <UserFormModal
          isOpen={showModal}
          onClose={handleCloseModal}
          isEditing={isEditing}
          formData={formData}
          setFormData={setFormData}
          onSubmit={handleSubmit}
          colors={colors}
        />
      )}

      {/* Detail Modal */}
      {showDetailModal && selectedUser && (
        <UserDetailModal
          isOpen={showDetailModal}
          onClose={() => {
            setShowDetailModal(false);
            setUserDetails(null);
          }}
          user={selectedUser}
          userDetails={userDetails}
          onStatusChange={handleStatusChange}
          colors={colors}
          formatCurrency={formatCurrency}
          getRoleBadge={getRoleBadge}
          getStatusBadge={getStatusBadge}
        />
      )}
    </div>
  );
}

// User Form Modal Component
function UserFormModal({ isOpen, onClose, isEditing, formData, setFormData, onSubmit, colors }) {
  if (!isOpen) return null;

  return (
    <div 
      className="fixed inset-0 bg-gradient-to-br from-gray-900/80 via-gray-800/90 to-gray-900/80 backdrop-blur-sm flex items-center justify-center z-50 p-4 animate-fadeIn"
      onClick={onClose}
    >
      <div 
        className="bg-white rounded-xl sm:rounded-2xl p-4 sm:p-6 md:p-8 max-w-md md:max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl animate-scaleIn transform transition-all"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">
              {isEditing ? 'Editar Usuario' : 'Nuevo Usuario'}
            </h2>
            <p className="text-sm text-gray-600 mt-1">
              {isEditing ? 'Actualiza la información del usuario' : 'Completa los datos del nuevo usuario'}
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors rounded-full p-2 hover:bg-gray-100"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <form onSubmit={onSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Name */}
            <div className="md:col-span-2">
              <label className="block text-gray-700 text-sm font-medium mb-2">
                Nombre Completo *
              </label>
              <input
                type="text"
                required
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-cyan-400 focus:ring-2 focus:ring-cyan-200 transition-all outline-none"
                placeholder="Juan Pérez"
              />
            </div>

            {/* Email */}
            <div className="md:col-span-2">
              <label className="block text-gray-700 text-sm font-medium mb-2">
                Email *
              </label>
              <input
                type="email"
                required
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-cyan-400 focus:ring-2 focus:ring-cyan-200 transition-all outline-none"
                placeholder="usuario@ejemplo.com"
              />
            </div>

            {/* Phone */}
            <div className="md:col-span-2">
              <label className="block text-gray-700 text-sm font-medium mb-2">
                Teléfono
              </label>
              <input
                type="tel"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-cyan-400 focus:ring-2 focus:ring-cyan-200 transition-all outline-none"
                placeholder="555-1234-5678"
              />
            </div>

            {/* Role */}
            <div>
              <label className="block text-gray-700 text-sm font-medium mb-2">
                Rol *
              </label>
              <select
                required
                value={formData.role}
                onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-cyan-400 focus:ring-2 focus:ring-cyan-200 transition-all outline-none"
              >
                <option value="user">Cliente</option>
                <option value="vendor">Vendedor</option>
                <option value="admin">Administrador</option>
              </select>
            </div>

            {/* Status */}
            <div>
              <label className="block text-gray-700 text-sm font-medium mb-2">
                Estado *
              </label>
              <select
                required
                value={formData.status}
                onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-cyan-400 focus:ring-2 focus:ring-cyan-200 transition-all outline-none"
              >
                <option value="active">Activo</option>
                <option value="inactive">Inactivo</option>
                <option value="suspended">Suspendido</option>
              </select>
            </div>

            {/* Password */}
            <div>
              <label className="block text-gray-700 text-sm font-medium mb-2">
                Contraseña {!isEditing && '*'}
              </label>
              <input
                type="password"
                required={!isEditing}
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-cyan-400 focus:ring-2 focus:ring-cyan-200 transition-all outline-none"
                placeholder={isEditing ? 'Dejar en blanco para mantener' : 'Mínimo 8 caracteres'}
              />
            </div>

            {/* Password Confirmation */}
            <div>
              <label className="block text-gray-700 text-sm font-medium mb-2">
                Confirmar Contraseña {!isEditing && '*'}
              </label>
              <input
                type="password"
                required={!isEditing}
                value={formData.password_confirmation}
                onChange={(e) => setFormData({ ...formData, password_confirmation: e.target.value })}
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-cyan-400 focus:ring-2 focus:ring-cyan-200 transition-all outline-none"
                placeholder="Repite la contraseña"
              />
            </div>
          </div>

          {/* Buttons */}
          <div className="flex flex-col-reverse sm:flex-row gap-3 mt-6">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-5 py-3 rounded-full font-medium bg-white text-gray-700 border-2 border-gray-300 hover:border-cyan-400 hover:text-cyan-600 transition-all"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="flex-1 px-5 py-3 rounded-full font-medium text-white shadow-lg hover:shadow-xl transition-all"
              style={{ background: `linear-gradient(135deg, ${colors.primary.hex}, ${colors.secondary.hex})` }}
            >
              {isEditing ? 'Actualizar Usuario' : 'Crear Usuario'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

// User Detail Modal Component
function UserDetailModal({ isOpen, onClose, user, userDetails, onStatusChange, colors, formatCurrency, getRoleBadge, getStatusBadge }) {
  if (!isOpen) return null;

  return (
    <div 
      className="fixed inset-0 bg-gradient-to-br from-gray-900/80 via-gray-800/90 to-gray-900/80 backdrop-blur-sm flex items-center justify-center z-50 p-4"
      onClick={onClose}
    >
      <div 
        className="bg-white rounded-2xl p-8 max-w-4xl w-full max-h-[90vh] overflow-y-auto shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">Detalles del Usuario</h2>
            <p className="text-sm text-gray-600 mt-1">Información completa y estadísticas</p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors rounded-full p-2 hover:bg-gray-100"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {userDetails ? (
          <div className="space-y-6">
            {/* User Info */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-gray-50 rounded-2xl p-5 border-2 border-gray-200">
                <h3 className="font-semibold text-gray-900 mb-3">Información Personal</h3>
                <div className="space-y-2 text-sm">
                  <div><span className="text-gray-600">Nombre:</span> <span className="font-medium">{userDetails.user.name}</span></div>
                  <div><span className="text-gray-600">Email:</span> <span className="font-medium">{userDetails.user.email}</span></div>
                  <div><span className="text-gray-600">Teléfono:</span> <span className="font-medium">{userDetails.user.phone || 'No registrado'}</span></div>
                  <div><span className="text-gray-600">Rol:</span> {getRoleBadge(userDetails.user.role)}</div>
                  <div><span className="text-gray-600">Estado:</span> {getStatusBadge(userDetails.user.status)}</div>
                </div>
              </div>

              <div className="bg-gray-50 rounded-2xl p-5 border-2 border-gray-200">
                <h3 className="font-semibold text-gray-900 mb-3">Actividad</h3>
                <div className="space-y-2 text-sm">
                  <div><span className="text-gray-600">Última sesión:</span> <span className="font-medium">{userDetails.user.last_login_at_human || 'Nunca'}</span></div>
                  <div><span className="text-gray-600">IP:</span> <span className="font-medium">{userDetails.user.last_login_ip || 'N/A'}</span></div>
                  <div><span className="text-gray-600">Registro:</span> <span className="font-medium">{new Date(userDetails.user.created_at).toLocaleDateString('es-MX')}</span></div>
                </div>
              </div>
            </div>

            {/* Stats */}
            {userDetails.stats && (
              <div className="bg-cyan-50 rounded-2xl p-6 border-2 border-cyan-200">
                <h3 className="font-semibold text-gray-900 mb-4">Estadísticas de Compras</h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="bg-white rounded-xl p-3 text-center shadow-sm">
                    <div className="text-2xl font-bold text-cyan-600">{userDetails.stats.total_orders || 0}</div>
                    <div className="text-xs text-gray-600">Total Órdenes</div>
                  </div>
                  <div className="bg-white rounded-xl p-3 text-center shadow-sm">
                    <div className="text-2xl font-bold text-green-600">{userDetails.stats.completed_orders || 0}</div>
                    <div className="text-xs text-gray-600">Completadas</div>
                  </div>
                  <div className="bg-white rounded-xl p-3 text-center shadow-sm">
                    <div className="text-2xl font-bold text-yellow-600">{userDetails.stats.pending_orders || 0}</div>
                    <div className="text-xs text-gray-600">Pendientes</div>
                  </div>
                  <div className="bg-white rounded-xl p-3 text-center shadow-sm">
                    <div className="text-2xl font-bold text-red-600">{userDetails.stats.cancelled_orders || 0}</div>
                    <div className="text-xs text-gray-600">Canceladas</div>
                  </div>
                </div>
                <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="bg-white rounded-xl p-4 shadow-sm">
                    <div className="text-sm text-gray-600">Total Gastado</div>
                    <div className="text-xl font-bold text-green-600">{formatCurrency(userDetails.stats.total_spent || 0)}</div>
                  </div>
                  <div className="bg-white rounded-xl p-4 shadow-sm">
                    <div className="text-sm text-gray-600">Promedio por Orden</div>
                    <div className="text-xl font-bold text-cyan-600">{formatCurrency(userDetails.stats.average_order || 0)}</div>
                  </div>
                </div>
              </div>
            )}

            {/* Recent Orders */}
            {userDetails.recent_orders && userDetails.recent_orders.length > 0 && (
              <div>
                <h3 className="font-semibold text-gray-900 mb-3">Órdenes Recientes</h3>
                <div className="space-y-3">
                  {userDetails.recent_orders.map((order) => (
                    <div key={order.id} className="bg-gray-50 rounded-xl p-4 flex items-center justify-between border-2 border-gray-200">
                      <div>
                        <div className="font-medium">Orden #{order.id}</div>
                        <div className="text-xs text-gray-600">{order.created_at_human}</div>
                      </div>
                      <div className="text-right">
                        <div className="font-bold text-gray-900">{formatCurrency(order.total)}</div>
                        <div className="text-xs">
                          <span className={`px-2 py-1 rounded-full text-xs ${
                            order.status === 'completed' ? 'bg-green-100 text-green-800' :
                            order.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                            'bg-red-100 text-red-800'
                          }`}>
                            {order.status}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Status Change */}
            <div className="bg-gray-50 rounded-2xl p-5 border-2 border-gray-200">
              <h3 className="font-semibold text-gray-900 mb-3">Cambiar Estado</h3>
              <div className="flex flex-col sm:flex-row gap-3">
                <button
                  onClick={() => onStatusChange(user, 'active')}
                  disabled={userDetails.user.status === 'active'}
                  className="flex-1 px-4 py-3 bg-gradient-to-r from-green-500 to-green-600 text-white rounded-xl hover:from-green-600 hover:to-green-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all font-medium"
                >
                  ✓ Activar
                </button>
                <button
                  onClick={() => onStatusChange(user, 'inactive')}
                  disabled={userDetails.user.status === 'inactive'}
                  className="flex-1 px-4 py-3 bg-gradient-to-r from-gray-500 to-gray-600 text-white rounded-xl hover:from-gray-600 hover:to-gray-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all font-medium"
                >
                  ⏸ Desactivar
                </button>
                <button
                  onClick={() => onStatusChange(user, 'suspended')}
                  disabled={userDetails.user.status === 'suspended'}
                  className="flex-1 px-4 py-3 bg-gradient-to-r from-red-500 to-red-600 text-white rounded-xl hover:from-red-600 hover:to-red-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all font-medium"
                >
                  ✕ Suspender
                </button>
              </div>
            </div>
          </div>
        ) : (
          <div className="p-12 text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-4 border-cyan-500 mx-auto"></div>
            <p className="mt-4 text-gray-600 font-medium">Cargando detalles...</p>
          </div>
        )}

        {/* Close Button */}
        <div className="flex justify-end mt-6 pt-6 border-t border-gray-200">
          <button
            onClick={onClose}
            className="px-6 py-3 rounded-full font-medium bg-white text-gray-700 border-2 border-gray-300 hover:border-cyan-400 hover:text-cyan-600 transition-all"
          >
            Cerrar
          </button>
        </div>
      </div>
    </div>
  );
}
