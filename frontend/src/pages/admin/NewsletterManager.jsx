import { useState, useEffect } from 'react';
import {
  PaperAirplaneIcon,
  UsersIcon,
  EnvelopeIcon,
  CheckCircleIcon,
  XCircleIcon,
  MagnifyingGlassIcon,
  TrashIcon,
  ChartBarIcon,
  SparklesIcon,
} from '@heroicons/react/24/outline';
import newsletterService from '../../services/newsletter';
import { useSiteConfig } from '../../hooks/useSiteConfig';

export default function NewsletterManager() {
  const { showNotification } = useSiteConfig();
  const [subscribers, setSubscribers] = useState([]);
  const [stats, setStats] = useState({ total: 0, active: 0, inactive: 0, recent: 0 });
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [showSendModal, setShowSendModal] = useState(false);
  const [showTestModal, setShowTestModal] = useState(false);
  const [sending, setSending] = useState(false);

  const [newsletterData, setNewsletterData] = useState({
    subject: '',
    content: '',
    data: {
      products: [],
      buttonText: '',
      buttonUrl: '',
      discount: null,
    },
  });

  const [testEmail, setTestEmail] = useState('');

  useEffect(() => {
    loadSubscribers();
    loadStats();
  }, [currentPage, searchTerm, statusFilter]);

  const loadSubscribers = async () => {
    try {
      setLoading(true);
      const response = await newsletterService.getSubscribers({
        page: currentPage,
        search: searchTerm,
        status: statusFilter,
        per_page: 15,
      });
      setSubscribers(response.subscribers.data || []);
      setTotalPages(response.subscribers.last_page || 1);
    } catch (error) {
      showNotification('Error al cargar suscriptores', 'error');
      console.error('Error loading subscribers:', error);
    } finally {
      setLoading(false);
    }
  };

  const loadStats = async () => {
    try {
      const response = await newsletterService.getStats();
      setStats(response.stats);
    } catch (error) {
      console.error('Error loading stats:', error);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('¿Estás seguro de eliminar este suscriptor?')) return;

    try {
      await newsletterService.deleteSubscriber(id);
      showNotification('Suscriptor eliminado exitosamente', 'success');
      loadSubscribers();
      loadStats();
    } catch (error) {
      showNotification('Error al eliminar el suscriptor', 'error');
    }
  };

  const handleActivate = async (id) => {
    try {
      await newsletterService.activateSubscriber(id);
      showNotification('Suscriptor activado exitosamente', 'success');
      loadSubscribers();
      loadStats();
    } catch (error) {
      showNotification('Error al activar el suscriptor', 'error');
    }
  };

  const handleSendNewsletter = async (e) => {
    e.preventDefault();
    if (!window.confirm(`¿Enviar newsletter a ${stats.active} suscriptores activos?`)) return;

    try {
      setSending(true);
      await newsletterService.sendNewsletter(newsletterData);
      showNotification('Newsletter enviado exitosamente', 'success');
      setShowSendModal(false);
      setNewsletterData({
        subject: '',
        content: '',
        data: { products: [], buttonText: '', buttonUrl: '', discount: null },
      });
    } catch (error) {
      showNotification('Error al enviar el newsletter', 'error');
    } finally {
      setSending(false);
    }
  };

  const handleSendTest = async (e) => {
    e.preventDefault();
    try {
      setSending(true);
      await newsletterService.sendTestEmail({
        email: testEmail,
        ...newsletterData,
      });
      showNotification('Email de prueba enviado exitosamente', 'success');
      setShowTestModal(false);
      setTestEmail('');
    } catch (error) {
      showNotification('Error al enviar el email de prueba', 'error');
    } finally {
      setSending(false);
    }
  };

  const StatCard = ({ icon: Icon, label, value, color }) => (
    <div className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-lg transition-shadow border border-slate-100">
      <div className="flex items-center gap-4">
        <div className={`p-3 rounded-xl ${color}`}>
          <Icon className="w-8 h-8 text-white" />
        </div>
        <div>
          <p className="text-sm text-slate-600 font-medium">{label}</p>
          <p className="text-3xl font-bold text-slate-900">{value}</p>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-purple-50 to-pink-50 p-6">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-2">
          <div className="p-2 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl shadow-lg">
            <PaperAirplaneIcon className="w-8 h-8 text-white" />
          </div>
          <div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
              Newsletter Manager
            </h1>
            <p className="text-slate-600">Gestiona suscriptores y envía newsletters</p>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <StatCard
          icon={UsersIcon}
          label="Total Suscriptores"
          value={stats.total}
          color="bg-gradient-to-br from-blue-500 to-cyan-500"
        />
        <StatCard
          icon={CheckCircleIcon}
          label="Activos"
          value={stats.active}
          color="bg-gradient-to-br from-green-500 to-emerald-500"
        />
        <StatCard
          icon={XCircleIcon}
          label="Inactivos"
          value={stats.inactive}
          color="bg-gradient-to-br from-slate-500 to-slate-600"
        />
        <StatCard
          icon={SparklesIcon}
          label="Últimos 7 días"
          value={stats.recent}
          color="bg-gradient-to-br from-purple-500 to-pink-500"
        />
      </div>

      {/* Actions */}
      <div className="mb-6 flex flex-col lg:flex-row gap-4 items-start lg:items-center justify-between">
        <div className="flex flex-col sm:flex-row gap-4 flex-1 w-full lg:w-auto">
          <div className="relative flex-1 max-w-md">
            <MagnifyingGlassIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
            <input
              type="text"
              placeholder="Buscar por email o nombre..."
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value);
                setCurrentPage(1);
              }}
              className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            />
          </div>
          <select
            value={statusFilter}
            onChange={(e) => {
              setStatusFilter(e.target.value);
              setCurrentPage(1);
            }}
            className="px-4 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-purple-500 bg-white"
          >
            <option value="all">Todos</option>
            <option value="active">Activos</option>
            <option value="inactive">Inactivos</option>
          </select>
        </div>
        <div className="flex gap-3 w-full lg:w-auto">
          <button
            onClick={() => setShowTestModal(true)}
            className="flex-1 lg:flex-none flex items-center justify-center gap-2 px-6 py-2.5 bg-white border-2 border-purple-500 text-purple-600 rounded-xl hover:bg-purple-50 transition-all duration-200 font-medium"
          >
            <EnvelopeIcon className="w-5 h-5" />
            Enviar Prueba
          </button>
          <button
            onClick={() => setShowSendModal(true)}
            className="flex-1 lg:flex-none flex items-center justify-center gap-2 px-6 py-2.5 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-xl hover:shadow-lg transform hover:scale-105 transition-all duration-200 font-medium"
          >
            <PaperAirplaneIcon className="w-5 h-5" />
            Enviar Newsletter
          </button>
        </div>
      </div>

      {/* Subscribers Table */}
      <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gradient-to-r from-purple-500 to-pink-500 text-white">
              <tr>
                <th className="px-6 py-4 text-left text-sm font-semibold">Email</th>
                <th className="px-6 py-4 text-left text-sm font-semibold">Nombre</th>
                <th className="px-6 py-4 text-left text-sm font-semibold">Estado</th>
                <th className="px-6 py-4 text-left text-sm font-semibold">Fecha Suscripción</th>
                <th className="px-6 py-4 text-center text-sm font-semibold">Acciones</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {loading ? (
                [...Array(5)].map((_, i) => (
                  <tr key={i} className="animate-pulse">
                    <td className="px-6 py-4"><div className="h-4 bg-slate-200 rounded w-48"></div></td>
                    <td className="px-6 py-4"><div className="h-4 bg-slate-200 rounded w-32"></div></td>
                    <td className="px-6 py-4"><div className="h-6 bg-slate-200 rounded-full w-20"></div></td>
                    <td className="px-6 py-4"><div className="h-4 bg-slate-200 rounded w-28"></div></td>
                    <td className="px-6 py-4"><div className="h-8 bg-slate-200 rounded w-24 mx-auto"></div></td>
                  </tr>
                ))
              ) : subscribers.length === 0 ? (
                <tr>
                  <td colSpan="5" className="px-6 py-12 text-center">
                    <UsersIcon className="w-16 h-16 text-slate-300 mx-auto mb-4" />
                    <p className="text-slate-500 text-lg">No se encontraron suscriptores</p>
                  </td>
                </tr>
              ) : (
                subscribers.map((subscriber) => (
                  <tr key={subscriber.id} className="hover:bg-slate-50 transition-colors">
                    <td className="px-6 py-4">
                      <p className="font-medium text-slate-900">{subscriber.email}</p>
                    </td>
                    <td className="px-6 py-4">
                      <p className="text-slate-700">{subscriber.name || '—'}</p>
                    </td>
                    <td className="px-6 py-4">
                      {subscriber.status === 'active' ? (
                        <span className="inline-flex items-center gap-1 px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm font-medium">
                          <CheckCircleIcon className="w-4 h-4" />
                          Activo
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1 px-3 py-1 bg-slate-100 text-slate-600 rounded-full text-sm font-medium">
                          <XCircleIcon className="w-4 h-4" />
                          Inactivo
                        </span>
                      )}
                    </td>
                    <td className="px-6 py-4 text-slate-600">
                      {new Date(subscriber.subscribed_at || subscriber.created_at).toLocaleDateString('es-ES')}
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center justify-center gap-2">
                        {subscriber.status !== 'active' && (
                          <button
                            onClick={() => handleActivate(subscriber.id)}
                            className="px-3 py-1.5 bg-green-50 text-green-700 rounded-lg hover:bg-green-100 transition-colors text-sm font-medium"
                            title="Activar"
                          >
                            Activar
                          </button>
                        )}
                        <button
                          onClick={() => handleDelete(subscriber.id)}
                          className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                          title="Eliminar"
                        >
                          <TrashIcon className="w-5 h-5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex items-center justify-between px-6 py-4 border-t border-slate-100">
            <button
              onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
              disabled={currentPage === 1}
              className="px-4 py-2 text-sm font-medium text-slate-700 bg-white border border-slate-200 rounded-lg hover:bg-slate-50 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Anterior
            </button>
            <span className="text-sm text-slate-600">
              Página {currentPage} de {totalPages}
            </span>
            <button
              onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
              disabled={currentPage === totalPages}
              className="px-4 py-2 text-sm font-medium text-slate-700 bg-white border border-slate-200 rounded-lg hover:bg-slate-50 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Siguiente
            </button>
          </div>
        )}
      </div>

      {/* Send Newsletter Modal */}
      {showSendModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50 animate-fade-in">
          <div className="bg-white rounded-2xl shadow-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto animate-scale-in">
            <div className="sticky top-0 bg-gradient-to-r from-purple-500 to-pink-500 text-white p-6 rounded-t-2xl">
              <h2 className="text-2xl font-bold flex items-center gap-3">
                <PaperAirplaneIcon className="w-7 h-7" />
                Enviar Newsletter
              </h2>
              <p className="text-purple-100 mt-1">Se enviará a {stats.active} suscriptores activos</p>
            </div>

            <form onSubmit={handleSendNewsletter} className="p-6 space-y-6">
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">
                  Asunto *
                </label>
                <input
                  type="text"
                  required
                  value={newsletterData.subject}
                  onChange={(e) => setNewsletterData({ ...newsletterData, subject: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-purple-500"
                  placeholder="¡Novedades de este mes!"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">
                  Contenido (Markdown) *
                </label>
                <textarea
                  required
                  value={newsletterData.content}
                  onChange={(e) => setNewsletterData({ ...newsletterData, content: e.target.value })}
                  rows={10}
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-purple-500 font-mono text-sm"
                  placeholder="# Hola!&#10;&#10;Te contamos las novedades de este mes..."
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">
                    Texto del Botón
                  </label>
                  <input
                    type="text"
                    value={newsletterData.data.buttonText}
                    onChange={(e) => setNewsletterData({
                      ...newsletterData,
                      data: { ...newsletterData.data, buttonText: e.target.value }
                    })}
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-purple-500"
                    placeholder="Ver Productos"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">
                    URL del Botón
                  </label>
                  <input
                    type="url"
                    value={newsletterData.data.buttonUrl}
                    onChange={(e) => setNewsletterData({
                      ...newsletterData,
                      data: { ...newsletterData.data, buttonUrl: e.target.value }
                    })}
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-purple-500"
                    placeholder="https://..."
                  />
                </div>
              </div>

              <div className="flex gap-3 pt-4 border-t border-slate-200">
                <button
                  type="button"
                  onClick={() => setShowSendModal(false)}
                  disabled={sending}
                  className="flex-1 px-6 py-2.5 bg-slate-100 text-slate-700 rounded-xl hover:bg-slate-200 transition-colors font-medium disabled:opacity-50"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  disabled={sending}
                  className="flex-1 px-6 py-2.5 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-xl hover:shadow-lg transition-all font-medium disabled:opacity-50 flex items-center justify-center gap-2"
                >
                  {sending ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      Enviando...
                    </>
                  ) : (
                    <>
                      <PaperAirplaneIcon className="w-5 h-5" />
                      Enviar Newsletter
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Send Test Modal */}
      {showTestModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50 animate-fade-in">
          <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full animate-scale-in">
            <div className="bg-gradient-to-r from-cyan-500 to-blue-500 text-white p-6 rounded-t-2xl">
              <h2 className="text-2xl font-bold flex items-center gap-3">
                <EnvelopeIcon className="w-7 h-7" />
                Enviar Email de Prueba
              </h2>
            </div>

            <form onSubmit={handleSendTest} className="p-6 space-y-6">
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">
                  Email de destino *
                </label>
                <input
                  type="email"
                  required
                  value={testEmail}
                  onChange={(e) => setTestEmail(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-cyan-500"
                  placeholder="tu@email.com"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">
                  Asunto *
                </label>
                <input
                  type="text"
                  required
                  value={newsletterData.subject}
                  onChange={(e) => setNewsletterData({ ...newsletterData, subject: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-cyan-500"
                  placeholder="Asunto del email de prueba"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">
                  Contenido *
                </label>
                <textarea
                  required
                  value={newsletterData.content}
                  onChange={(e) => setNewsletterData({ ...newsletterData, content: e.target.value })}
                  rows={8}
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-cyan-500 font-mono text-sm"
                  placeholder="Contenido del email..."
                />
              </div>

              <div className="flex gap-3 pt-4 border-t border-slate-200">
                <button
                  type="button"
                  onClick={() => setShowTestModal(false)}
                  disabled={sending}
                  className="flex-1 px-6 py-2.5 bg-slate-100 text-slate-700 rounded-xl hover:bg-slate-200 transition-colors font-medium disabled:opacity-50"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  disabled={sending}
                  className="flex-1 px-6 py-2.5 bg-gradient-to-r from-cyan-500 to-blue-500 text-white rounded-xl hover:shadow-lg transition-all font-medium disabled:opacity-50 flex items-center justify-center gap-2"
                >
                  {sending ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      Enviando...
                    </>
                  ) : (
                    <>
                      <PaperAirplaneIcon className="w-5 h-5" />
                      Enviar Prueba
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
