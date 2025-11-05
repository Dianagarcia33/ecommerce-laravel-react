import { useState, useEffect } from 'react';
import {
  EnvelopeIcon,
  PlusIcon,
  PencilIcon,
  TrashIcon,
  EyeIcon,
  CheckCircleIcon,
  XCircleIcon,
  MagnifyingGlassIcon,
  CodeBracketIcon,
} from '@heroicons/react/24/outline';
import emailService from '../../services/emails';
import { useSiteConfig } from '../../hooks/useSiteConfig';

export default function EmailTemplates() {
  const { showNotification } = useSiteConfig();
  const [templates, setTemplates] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [showPreview, setShowPreview] = useState(false);
  const [selectedTemplate, setSelectedTemplate] = useState(null);
  const [previewData, setPreviewData] = useState({});
  const [renderedContent, setRenderedContent] = useState('');

  const [formData, setFormData] = useState({
    name: '',
    subject: '',
    content: '',
    variables: [],
    is_active: true,
  });

  // Helper para obtener variables como array
  const getVariablesArray = (variables) => {
    if (!variables) return [];
    if (Array.isArray(variables)) return variables;
    try {
      return JSON.parse(variables);
    } catch (e) {
      return [];
    }
  };

  useEffect(() => {
    loadTemplates();
  }, []);

  const loadTemplates = async () => {
    try {
      setLoading(true);
      const response = await emailService.getTemplates();
      setTemplates(response.templates || []);
    } catch (error) {
      showNotification('Error al cargar las plantillas', 'error');
      console.error('Error loading templates:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleOpenModal = (template = null) => {
    if (template) {
      setSelectedTemplate(template);
      setFormData({
        name: template.name,
        subject: template.subject,
        content: template.content,
        variables: getVariablesArray(template.variables),
        is_active: template.is_active,
      });
    } else {
      setSelectedTemplate(null);
      setFormData({
        name: '',
        subject: '',
        content: '',
        variables: [],
        is_active: true,
      });
    }
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedTemplate(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (selectedTemplate) {
        await emailService.updateTemplate(selectedTemplate.id, formData);
        showNotification('Plantilla actualizada exitosamente', 'success');
      } else {
        await emailService.createTemplate(formData);
        showNotification('Plantilla creada exitosamente', 'success');
      }
      handleCloseModal();
      loadTemplates();
    } catch (error) {
      showNotification(
        error.response?.data?.message || 'Error al guardar la plantilla',
        'error'
      );
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('¿Estás seguro de eliminar esta plantilla?')) return;

    try {
      await emailService.deleteTemplate(id);
      showNotification('Plantilla eliminada exitosamente', 'success');
      loadTemplates();
    } catch (error) {
      showNotification('Error al eliminar la plantilla', 'error');
    }
  };

  const handleToggleStatus = async (id) => {
    try {
      await emailService.toggleTemplateStatus(id);
      showNotification('Estado actualizado exitosamente', 'success');
      loadTemplates();
    } catch (error) {
      showNotification('Error al actualizar el estado', 'error');
    }
  };

  const handlePreview = async (template) => {
    setSelectedTemplate(template);
    setShowPreview(true);
    
    // Datos de ejemplo para la previsualización
    const sampleData = {};
    if (template.variables && template.variables.length > 0) {
      template.variables.forEach(varName => {
        sampleData[varName] = `[${varName}]`;
      });
    }
    setPreviewData(sampleData);

    try {
      const response = await emailService.previewTemplate(template.id, sampleData);
      setRenderedContent(response.rendered_content);
    } catch (error) {
      showNotification('Error al generar la vista previa', 'error');
    }
  };

  const addVariable = () => {
    const varName = prompt('Nombre de la variable (sin {{}}):');
    if (varName) {
      setFormData(prev => ({
        ...prev,
        variables: [...prev.variables, varName.trim()],
      }));
    }
  };

  const removeVariable = (index) => {
    setFormData(prev => ({
      ...prev,
      variables: prev.variables.filter((_, i) => i !== index),
    }));
  };

  const filteredTemplates = templates.filter(template =>
    template.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    template.subject.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-cyan-50 to-blue-50 p-6">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-2">
          <div className="p-2 bg-gradient-to-br from-cyan-500 to-blue-500 rounded-xl shadow-lg">
            <EnvelopeIcon className="w-8 h-8 text-white" />
          </div>
          <div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-cyan-600 to-blue-600 bg-clip-text text-transparent">
              Plantillas de Email
            </h1>
            <p className="text-slate-600">Gestiona las plantillas de correo electrónico</p>
          </div>
        </div>
      </div>

      {/* Search and Actions */}
      <div className="mb-6 flex flex-col sm:flex-row gap-4 items-center justify-between">
        <div className="relative flex-1 max-w-md">
          <MagnifyingGlassIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
          <input
            type="text"
            placeholder="Buscar plantillas..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
          />
        </div>
        <button
          onClick={() => handleOpenModal()}
          className="flex items-center gap-2 px-6 py-2.5 bg-gradient-to-r from-cyan-500 to-blue-500 text-white rounded-xl hover:shadow-lg transform hover:scale-105 transition-all duration-200"
        >
          <PlusIcon className="w-5 h-5" />
          Nueva Plantilla
        </button>
      </div>

      {/* Templates Grid */}
      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="bg-white rounded-2xl p-6 shadow-sm animate-pulse">
              <div className="h-6 bg-slate-200 rounded w-3/4 mb-4"></div>
              <div className="h-4 bg-slate-200 rounded w-full mb-2"></div>
              <div className="h-4 bg-slate-200 rounded w-2/3"></div>
            </div>
          ))}
        </div>
      ) : filteredTemplates.length === 0 ? (
        <div className="text-center py-12">
          <EnvelopeIcon className="w-16 h-16 text-slate-300 mx-auto mb-4" />
          <p className="text-slate-500 text-lg">No se encontraron plantillas</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredTemplates.map((template) => (
            <div
              key={template.id}
              className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-xl transition-all duration-300 border border-slate-100"
            >
              {/* Header */}
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <h3 className="text-lg font-bold text-slate-800">{template.name}</h3>
                    {template.is_active ? (
                      <CheckCircleIcon className="w-5 h-5 text-green-500" title="Activa" />
                    ) : (
                      <XCircleIcon className="w-5 h-5 text-slate-400" title="Inactiva" />
                    )}
                  </div>
                  <p className="text-sm text-slate-600 line-clamp-2">{template.subject}</p>
                </div>
              </div>

              {/* Variables */}
              {(() => {
                const vars = getVariablesArray(template.variables);
                return vars.length > 0 && (
                  <div className="mb-4">
                    <p className="text-xs text-slate-500 mb-2">Variables disponibles:</p>
                    <div className="flex flex-wrap gap-1">
                      {vars.slice(0, 3).map((variable, idx) => (
                        <span
                          key={idx}
                          className="px-2 py-1 bg-cyan-50 text-cyan-700 text-xs rounded-lg font-mono"
                        >
                          {`{{${variable}}}`}
                        </span>
                      ))}
                      {vars.length > 3 && (
                        <span className="px-2 py-1 bg-slate-100 text-slate-600 text-xs rounded-lg">
                          +{vars.length - 3}
                        </span>
                      )}
                    </div>
                  </div>
                );
              })()}

              {/* Actions */}
              <div className="flex gap-2 pt-4 border-t border-slate-100">
                <button
                  onClick={() => handlePreview(template)}
                  className="flex-1 flex items-center justify-center gap-1 px-3 py-2 bg-slate-100 text-slate-700 rounded-lg hover:bg-slate-200 transition-colors text-sm"
                  title="Vista Previa"
                >
                  <EyeIcon className="w-4 h-4" />
                  Ver
                </button>
                <button
                  onClick={() => handleOpenModal(template)}
                  className="flex-1 flex items-center justify-center gap-1 px-3 py-2 bg-cyan-50 text-cyan-700 rounded-lg hover:bg-cyan-100 transition-colors text-sm"
                  title="Editar"
                >
                  <PencilIcon className="w-4 h-4" />
                  Editar
                </button>
                <button
                  onClick={() => handleToggleStatus(template.id)}
                  className={`px-3 py-2 rounded-lg transition-colors text-sm ${
                    template.is_active
                      ? 'bg-green-50 text-green-700 hover:bg-green-100'
                      : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                  }`}
                  title={template.is_active ? 'Desactivar' : 'Activar'}
                >
                  {template.is_active ? '✓' : '○'}
                </button>
                <button
                  onClick={() => handleDelete(template.id)}
                  className="px-3 py-2 bg-red-50 text-red-700 rounded-lg hover:bg-red-100 transition-colors text-sm"
                  title="Eliminar"
                >
                  <TrashIcon className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Create/Edit Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50 animate-fade-in">
          <div className="bg-white rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto animate-scale-in">
            <div className="sticky top-0 bg-gradient-to-r from-cyan-500 to-blue-500 text-white p-6 rounded-t-2xl">
              <h2 className="text-2xl font-bold flex items-center gap-3">
                <EnvelopeIcon className="w-7 h-7" />
                {selectedTemplate ? 'Editar Plantilla' : 'Nueva Plantilla'}
              </h2>
            </div>

            <form onSubmit={handleSubmit} className="p-6 space-y-6">
              {/* Name */}
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">
                  Nombre Identificador *
                </label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-cyan-500"
                  placeholder="welcome, order_shipped, etc."
                />
              </div>

              {/* Subject */}
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">
                  Asunto del Email *
                </label>
                <input
                  type="text"
                  required
                  value={formData.subject}
                  onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-cyan-500"
                  placeholder="Bienvenido a {{app_name}}"
                />
              </div>

              {/* Content */}
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">
                  Contenido (Markdown) *
                </label>
                <textarea
                  required
                  value={formData.content}
                  onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                  rows={12}
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-cyan-500 font-mono text-sm"
                  placeholder="# Hola {{user_name}}!&#10;&#10;Contenido del email..."
                />
                <p className="text-xs text-slate-500 mt-2">
                  Usa variables con doble llave: {`{{variable}}`}
                </p>
              </div>

              {/* Variables */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <label className="block text-sm font-semibold text-slate-700">
                    Variables Disponibles
                  </label>
                  <button
                    type="button"
                    onClick={addVariable}
                    className="flex items-center gap-1 px-3 py-1 bg-cyan-50 text-cyan-700 rounded-lg hover:bg-cyan-100 transition-colors text-sm"
                  >
                    <PlusIcon className="w-4 h-4" />
                    Agregar
                  </button>
                </div>
                <div className="flex flex-wrap gap-2">
                  {formData.variables.map((variable, idx) => (
                    <span
                      key={idx}
                      className="flex items-center gap-2 px-3 py-1.5 bg-slate-100 text-slate-700 rounded-lg text-sm font-mono"
                    >
                      {`{{${variable}}}`}
                      <button
                        type="button"
                        onClick={() => removeVariable(idx)}
                        className="text-red-500 hover:text-red-700"
                      >
                        ×
                      </button>
                    </span>
                  ))}
                </div>
              </div>

              {/* Is Active */}
              <div className="flex items-center gap-3">
                <input
                  type="checkbox"
                  id="is_active"
                  checked={formData.is_active}
                  onChange={(e) => setFormData({ ...formData, is_active: e.target.checked })}
                  className="w-5 h-5 text-cyan-600 rounded focus:ring-2 focus:ring-cyan-500"
                />
                <label htmlFor="is_active" className="text-sm font-medium text-slate-700">
                  Plantilla activa
                </label>
              </div>

              {/* Actions */}
              <div className="flex gap-3 pt-4 border-t border-slate-200">
                <button
                  type="button"
                  onClick={handleCloseModal}
                  className="flex-1 px-6 py-2.5 bg-slate-100 text-slate-700 rounded-xl hover:bg-slate-200 transition-colors font-medium"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="flex-1 px-6 py-2.5 bg-gradient-to-r from-cyan-500 to-blue-500 text-white rounded-xl hover:shadow-lg transition-all font-medium"
                >
                  {selectedTemplate ? 'Actualizar' : 'Crear'} Plantilla
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Preview Modal */}
      {showPreview && selectedTemplate && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50 animate-fade-in">
          <div className="bg-white rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto animate-scale-in">
            <div className="sticky top-0 bg-gradient-to-r from-purple-500 to-pink-500 text-white p-6 rounded-t-2xl">
              <h2 className="text-2xl font-bold flex items-center gap-3">
                <CodeBracketIcon className="w-7 h-7" />
                Vista Previa: {selectedTemplate.name}
              </h2>
            </div>

            <div className="p-6">
              <div className="mb-6">
                <h3 className="text-sm font-semibold text-slate-700 mb-2">Asunto:</h3>
                <p className="text-lg font-medium text-slate-900">{selectedTemplate.subject}</p>
              </div>

              <div className="bg-slate-50 rounded-xl p-6 border border-slate-200">
                <h3 className="text-sm font-semibold text-slate-700 mb-4">Contenido:</h3>
                <div className="prose prose-slate max-w-none">
                  <pre className="whitespace-pre-wrap font-sans text-sm text-slate-700">
                    {renderedContent || selectedTemplate.content}
                  </pre>
                </div>
              </div>

              <div className="flex gap-3 mt-6 pt-4 border-t border-slate-200">
                <button
                  onClick={() => setShowPreview(false)}
                  className="flex-1 px-6 py-2.5 bg-slate-100 text-slate-700 rounded-xl hover:bg-slate-200 transition-colors font-medium"
                >
                  Cerrar
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
