import { useState, useEffect, useCallback } from 'react';
import { PlusIcon } from '@heroicons/react/24/outline';
import { useProducts } from '../../hooks/useProducts';
import { useCategories } from '../../hooks/useCategories';
import { INITIAL_FORM_STATE } from '../../constants/product.constants';
import ProductForm from '../../components/admin/products/ProductForm';
import ProductTable from '../../components/admin/products/ProductTable';
import EmptyState from '../../components/admin/products/EmptyState';
import LoadingSpinner from '../../components/common/LoadingSpinner';
import ErrorDisplay from '../../components/common/ErrorDisplay';

export default function ProductsManager() {
  const { products, loading, error, fetchProducts, createProduct, updateProduct, deleteProduct } = useProducts();
  const { categories, fetchCategories } = useCategories();
  const [showModal, setShowModal] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);

  useEffect(() => {
    fetchProducts();
    fetchCategories();
  }, [fetchProducts, fetchCategories]);

  // Handle form submission
  const handleSubmit = async (formData) => {
    try {
      if (editingProduct) {
        await updateProduct(editingProduct.id, formData);
        alert('Producto actualizado exitosamente');
      } else {
        await createProduct(formData);
        alert('Producto creado exitosamente');
      }
      handleCloseModal();
    } catch (error) {
      alert(error.message || 'Error al guardar el producto. Por favor intenta de nuevo.');
    }
  };

  // Handle product deletion
  const handleDelete = async (id) => {
    if (!window.confirm('¿Estás seguro de eliminar este producto?')) return;

    try {
      await deleteProduct(id);
      alert('Producto eliminado exitosamente');
    } catch (error) {
      alert(error.message || 'Error al eliminar el producto. Por favor intenta de nuevo.');
    }
  };

  // Handle edit product
  const handleEdit = useCallback((product) => {
    setEditingProduct(product);
    setShowModal(true);
  }, []);

  // Open modal for new product
  const handleNewProduct = useCallback(() => {
    setEditingProduct(null);
    setShowModal(true);
  }, []);

  // Close modal and reset form
  const handleCloseModal = useCallback(() => {
    setShowModal(false);
    setEditingProduct(null);
  }, []);

  // Get initial form data for modal
  const getInitialFormData = () => {
    if (editingProduct) {
      // Las URLs ya vienen completas desde el backend
      const existingImagePreviews = editingProduct.images 
        ? editingProduct.images.map(img => img.image_url)
        : [];

      return {
        name: editingProduct.name,
        description: editingProduct.description,
        price: editingProduct.price,
        stock: editingProduct.stock,
        category_id: editingProduct.category_id,
        images: [],
        imagePreviews: existingImagePreviews,
        existingImages: editingProduct.images || [] // Guardar referencia de imágenes existentes
      };
    }
    return INITIAL_FORM_STATE;
  };

  // Render loading state
  if (loading && products.length === 0) {
    return <LoadingSpinner message="Cargando productos..." />;
  }

  // Render error state
  if (error) {
    return <ErrorDisplay message={error} onRetry={fetchProducts} />;
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Gestión de Productos</h1>
            <p className="text-gray-600 mt-1">Total: {products.length} productos</p>
          </div>
          <button
            onClick={handleNewProduct}
            disabled={loading}
            className="flex items-center gap-2 px-5 py-2 rounded-full font-medium transition-all duration-300 transform hover:scale-105 bg-gradient-to-r from-cyan-400 to-cyan-600 text-white shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <PlusIcon className="h-5 w-5" />
            Nuevo Producto
          </button>
        </div>

        {/* Products Table */}
        <div className="bg-white shadow-md rounded-lg overflow-hidden">
          {products.length === 0 ? (
            <EmptyState onCreateProduct={handleNewProduct} />
          ) : (
            <ProductTable
              products={products}
              onEdit={handleEdit}
              onDelete={handleDelete}
              isLoading={loading}
            />
          )}
        </div>
      </div>

      {/* Product Form Modal */}
      <ProductForm
        isOpen={showModal}
        onClose={handleCloseModal}
        onSubmit={handleSubmit}
        initialData={getInitialFormData()}
        categories={categories}
        isEditing={!!editingProduct}
      />
    </div>
  );
}
