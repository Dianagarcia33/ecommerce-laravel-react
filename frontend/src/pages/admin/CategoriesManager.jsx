import { useState, useEffect, useCallback } from 'react';
import { PlusIcon } from '@heroicons/react/24/outline';
import { useCategoriesManager } from '../../hooks/useCategoriesManager';
import CategoryForm from '../../components/admin/categories/CategoryForm';
import CategoryGrid from '../../components/admin/categories/CategoryGrid';
import CategoryEmptyState from '../../components/admin/categories/CategoryEmptyState';
import LoadingSpinner from '../../components/common/LoadingSpinner';
import ErrorDisplay from '../../components/common/ErrorDisplay';

export default function CategoriesManager() {
  const { categories, loading, error, fetchCategories, createCategory, updateCategory, deleteCategory } = useCategoriesManager();
  const [showModal, setShowModal] = useState(false);
  const [editingCategory, setEditingCategory] = useState(null);

  useEffect(() => {
    fetchCategories();
  }, [fetchCategories]);

  // Handle form submission
  const handleSubmit = async (formData) => {
    try {
      if (editingCategory) {
        await updateCategory(editingCategory.id, formData);
        alert('Categoría actualizada exitosamente');
      } else {
        await createCategory(formData);
        alert('Categoría creada exitosamente');
      }
      handleCloseModal();
    } catch (error) {
      alert(error.message || 'Error al guardar la categoría. Por favor intenta de nuevo.');
    }
  };

  // Handle category deletion
  const handleDelete = async (id) => {
    if (!window.confirm('¿Estás seguro de eliminar esta categoría? Esto puede afectar los productos asociados.')) return;

    try {
      await deleteCategory(id);
      alert('Categoría eliminada exitosamente');
    } catch (error) {
      alert(error.message || 'Error al eliminar la categoría. Por favor intenta de nuevo.');
    }
  };

  // Handle edit category
  const handleEdit = useCallback((category) => {
    setEditingCategory(category);
    setShowModal(true);
  }, []);

  // Open modal for new category
  const handleNewCategory = useCallback(() => {
    setEditingCategory(null);
    setShowModal(true);
  }, []);

  // Close modal and reset form
  const handleCloseModal = useCallback(() => {
    setShowModal(false);
    setEditingCategory(null);
  }, []);

  // Get initial form data for modal
  const getInitialFormData = () => {
    if (editingCategory) {
      return {
        name: editingCategory.name,
        description: editingCategory.description,
        image_url: editingCategory.image_url
      };
    }
    return { name: '', description: '', image_url: '' };
  };

  // Render loading state
  if (loading && categories.length === 0) {
    return <LoadingSpinner message="Cargando categorías..." />;
  }

  // Render error state
  if (error) {
    return <ErrorDisplay message={error} onRetry={fetchCategories} />;
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 mb-8">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">Gestión de Categorías</h1>
            <p className="text-gray-600 mt-1">Total: {categories.length} categoría{categories.length !== 1 ? 's' : ''}</p>
          </div>
          <button
            onClick={handleNewCategory}
            disabled={loading}
            className="flex items-center justify-center sm:justify-start gap-2 px-5 py-2.5 sm:py-2 rounded-lg sm:rounded-full font-medium transition-all duration-300 transform hover:scale-105 bg-gradient-to-r from-cyan-400 to-cyan-600 text-white shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed active:scale-95"
          >
            <PlusIcon className="h-5 w-5" />
            Nueva Categoría
          </button>
        </div>

        {/* Categories Grid */}
        {categories.length === 0 ? (
          <CategoryEmptyState onCreateCategory={handleNewCategory} />
        ) : (
          <CategoryGrid
            categories={categories}
            onEdit={handleEdit}
            onDelete={handleDelete}
            isLoading={loading}
          />
        )}
      </div>

      {/* Category Form Modal */}
      <CategoryForm
        isOpen={showModal}
        onClose={handleCloseModal}
        onSubmit={handleSubmit}
        initialData={getInitialFormData()}
        isEditing={!!editingCategory}
      />
    </div>
  );
}
