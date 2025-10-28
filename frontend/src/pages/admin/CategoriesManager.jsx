import { useState, useEffect } from 'react';
import { PlusIcon, PencilIcon, TrashIcon } from '@heroicons/react/24/outline';

export default function CategoriesManager() {
  const [categories, setCategories] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [editingCategory, setEditingCategory] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    description: ''
  });

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const response = await fetch('http://localhost:8000/api/categories');
      const data = await response.json();
      setCategories(data);
    } catch (error) {
      console.error('Error al cargar categorías:', error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const token = localStorage.getItem('token');
    
    try {
      const url = editingCategory 
        ? `http://localhost:8000/api/categories/${editingCategory.id}`
        : 'http://localhost:8000/api/categories';
      
      const response = await fetch(url, {
        method: editingCategory ? 'PUT' : 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
          'Accept': 'application/json'
        },
        body: JSON.stringify(formData)
      });

      if (response.ok) {
        fetchCategories();
        handleCloseModal();
        alert(editingCategory ? 'Categoría actualizada' : 'Categoría creada');
      } else {
        alert('Error al guardar la categoría');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Error al guardar la categoría');
    }
  };

  const handleDelete = async (id) => {
    if (!confirm('¿Estás seguro de eliminar esta categoría?')) return;
    
    const token = localStorage.getItem('token');
    
    try {
      const response = await fetch(`http://localhost:8000/api/categories/${id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Accept': 'application/json'
        }
      });

      if (response.ok) {
        fetchCategories();
        alert('Categoría eliminada');
      } else {
        alert('Error al eliminar la categoría');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Error al eliminar la categoría');
    }
  };

  const handleEdit = (category) => {
    setEditingCategory(category);
    setFormData({
      name: category.name,
      description: category.description
    });
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setEditingCategory(null);
    setFormData({
      name: '',
      description: ''
    });
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Gestión de Categorías</h1>
          <button
            onClick={() => setShowModal(true)}
            className="flex items-center gap-2 bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700"
          >
            <PlusIcon className="h-5 w-5" />
            Nueva Categoría
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories.map((category) => (
            <div key={category.id} className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-xl font-semibold mb-2">{category.name}</h3>
              <p className="text-gray-600 mb-4">{category.description}</p>
              <p className="text-sm text-gray-500 mb-4">
                {category.products_count || 0} productos
              </p>
              <div className="flex gap-2">
                <button
                  onClick={() => handleEdit(category)}
                  className="flex-1 flex items-center justify-center gap-2 bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700"
                >
                  <PencilIcon className="h-4 w-4" />
                  Editar
                </button>
                <button
                  onClick={() => handleDelete(category.id)}
                  className="flex-1 flex items-center justify-center gap-2 bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700"
                >
                  <TrashIcon className="h-4 w-4" />
                  Eliminar
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Modal para crear/editar categoría */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-8 max-w-md w-full">
            <h2 className="text-2xl font-bold mb-4">
              {editingCategory ? 'Editar Categoría' : 'Nueva Categoría'}
            </h2>
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label className="block text-gray-700 mb-2">Nombre</label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-3 py-2 border rounded-lg"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 mb-2">Descripción</label>
                <textarea
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  className="w-full px-3 py-2 border rounded-lg"
                  rows="3"
                />
              </div>
              <div className="flex gap-4">
                <button
                  type="submit"
                  className="flex-1 bg-indigo-600 text-white py-2 rounded-lg hover:bg-indigo-700"
                >
                  {editingCategory ? 'Actualizar' : 'Crear'}
                </button>
                <button
                  type="button"
                  onClick={handleCloseModal}
                  className="flex-1 bg-gray-300 text-gray-700 py-2 rounded-lg hover:bg-gray-400"
                >
                  Cancelar
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
