import { useState, useEffect } from 'react';
import { PlusIcon, PencilIcon, TrashIcon } from '@heroicons/react/24/outline';
import { XMarkIcon } from '@heroicons/react/24/solid';

export default function ProductsManager() {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    stock: '',
    category_id: '',
    images: [],
    imagePreviews: []
  });

  useEffect(() => {
    fetchProducts();
    fetchCategories();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await fetch('http://localhost:8000/api/products');
      const data = await response.json();
      setProducts(data);
    } catch (error) {
      console.error('Error al cargar productos:', error);
    }
  };

  const handleImageUpload = (e, formData, setFormData) => {
    const newFiles = Array.from(e.target.files);

    // Combinar las imágenes nuevas con las anteriores
    const combinedFiles = [...formData.images, ...newFiles];

    // Validar que haya entre 3 y 5 imágenes
    if (combinedFiles.length > 5) {
      alert('Solo puedes subir un máximo de 5 imágenes.');
      e.target.value = '';
      return;
    }

    // Generar las vistas previas solo de las nuevas imágenes
    const readers = newFiles.map(file => {
      return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onloadend = () => resolve({ file, preview: reader.result });
        reader.onerror = reject;
        reader.readAsDataURL(file);
      });
    });

    Promise.all(readers)
      .then(newImages => {
        setFormData({
          ...formData,
          images: combinedFiles,
          imagePreviews: [
            ...formData.imagePreviews,
            ...newImages.map(i => i.preview)
          ]
        });
      })
      .catch(() => {
        alert('Error al cargar las imágenes.');
      });
  };

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
    const form = new FormData();

    // Agregar campos del producto
    form.append('name', formData.name);
    form.append('description', formData.description);
    form.append('price', formData.price);
    form.append('stock', formData.stock);
    form.append('category_id', formData.category_id);

    // Agregar imágenes (mínimo 3, máximo 5)
    formData.images.forEach((img) => {
      form.append('images[]', img);
    });

    try {
      const url = editingProduct
        ? `http://localhost:8000/api/products/${editingProduct.id}`
        : 'http://localhost:8000/api/products';

      const response = await fetch(url, {
        method: editingProduct ? 'POST' : 'POST', 
        headers: {
          'Authorization': `Bearer ${token}`,
          'Accept': 'application/json',
        },
        body: form, 
      });

      const data = await response.json();

      if (response.ok) {
        fetchProducts();
        handleCloseModal();
        alert(editingProduct ? 'Producto actualizado' : 'Producto creado');
      } else {
        console.error('Error del servidor:', data);
        alert('Error al guardar el producto');
      }
    } catch (error) {
      console.error('Error de red:', error);
      alert('Error al guardar el producto');
    }
  };

  const handleDelete = async (id) => {
    if (!confirm('¿Estás seguro de eliminar este producto?')) return;

    const token = localStorage.getItem('token');

    try {
      const response = await fetch(`http://localhost:8000/api/products/${id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Accept': 'application/json'
        }
      });

      if (response.ok) {
        fetchProducts();
        alert('Producto eliminado');
      } else {
        alert('Error al eliminar el producto');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Error al eliminar el producto');
    }
  };

  const handleEdit = (product) => {
    setEditingProduct(product);
    setFormData({
      name: product.name,
      description: product.description,
      price: product.price,
      stock: product.stock,
      category_id: product.category_id,
      image: product.image
    });
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setEditingProduct(null);
    setFormData({
      name: '',
      description: '',
      price: '',
      stock: '',
      category_id: '',
      image: ''
    });
  };

  const handleRemoveImage = (index) => {
    const updatedImages = formData.images.filter((_, i) => i !== index);
    const updatedPreviews = formData.imagePreviews.filter((_, i) => i !== index);
    setFormData({
      ...formData,
      images: updatedImages,
      imagePreviews: updatedPreviews,
    });
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Gestión de Productos</h1>
          <button
            onClick={() => setShowModal(true)}
            className="flex items-center gap-2 px-5 py-2 rounded-full font-medium transition-all duration-300 transform hover:scale-105 bg-gradient-to-r from-cyan-400 to-cyan-600 text-white shadow-lg"
          >
            <PlusIcon className="h-5 w-5" />
            Nuevo Producto
          </button>
        </div>

        <div className="bg-white shadow-md rounded-lg overflow-hidden">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Imagen</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Nombre</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Categoría</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Precio</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Stock</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Acciones</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {products.map((product) => (
                <tr key={product.id}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <img src={product.image} alt={product.name} className="h-12 w-12 object-cover rounded" />
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">{product.name}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{product.category?.name}</td>
                  <td className="px-6 py-4 whitespace-nowrap">${product.price}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{product.stock}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <button
                      onClick={() => handleEdit(product)}
                      className="text-cyan-400 hover:text-cyan-600 mr-4"
                    >
                      <PencilIcon className="h-5 w-5" />
                    </button>
                    <button
                      onClick={() => handleDelete(product.id)}
                      className="text-red-600 hover:text-red-900"
                    >
                      <TrashIcon className="h-5 w-5" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal para crear/editar producto */}
      {showModal && (
        <div className="fixed inset-0 backdrop-blur-lg bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-8 max-w-md w-full">
            <h2 className="text-2xl font-bold mb-4">
              {editingProduct ? 'Editar Producto' : 'Nuevo Producto'}
            </h2>
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label className="block text-gray-700 mb-2">Nombre</label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full pl-4 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:border-cyan-400 focus:ring-2 focus:ring-cyan-200 transition-all outline-none"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 mb-2">Descripción</label>
                <textarea
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  className="w-full pl-4 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:border-cyan-400 focus:ring-2 focus:ring-cyan-200 transition-all outline-none"
                  rows="3"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 mb-2">Categoría</label>
                <select
                  value={formData.category_id}
                  onChange={(e) => setFormData({ ...formData, category_id: e.target.value })}
                  className="w-full pl-4 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:border-cyan-400 focus:ring-2 focus:ring-cyan-200 transition-all outline-none"
                  required
                >
                  <option value="">Seleccionar categoría</option>
                  {categories.map((cat) => (
                    <option key={cat.id} value={cat.id}>{cat.name}</option>
                  ))}
                </select>
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 mb-2">Precio</label>
                <input
                  type="number"
                  step="0.01"
                  value={formData.price}
                  onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                  className="w-full pl-4 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:border-cyan-400 focus:ring-2 focus:ring-cyan-200 transition-all outline-none"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 mb-2">Cantidad</label>
                <input
                  type="number"
                  step="1"
                  value={formData.stock}
                  onChange={(e) => setFormData({ ...formData, stock: e.target.value })}
                  className="w-full pl-4 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:border-cyan-400 focus:ring-2 focus:ring-cyan-200 transition-all outline-none"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 mb-2">Cargar Imágenes (3-5)</label>

                <div className="w-full min-h-48 border-2 border-dashed border-gray-200 rounded-xl bg-gray-50 p-4 hover:bg-gray-100 transition-all">
                  {formData.imagePreviews && formData.imagePreviews.length > 0 ? (
                    <div className="grid grid-cols-3 gap-3">
                      {formData.imagePreviews.map((preview, index) => (
                        <div key={index} className="relative group">
                          <img
                            src={preview}
                            alt={`Preview ${index + 1}`}
                            className="h-28 w-full object-cover rounded-lg shadow-sm border border-gray-200"
                          />
                          <button
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation();
                              handleRemoveImage(index);
                            }}
                            className="absolute top-1 right-1 bg-white text-gray-700 rounded-full p-1 shadow-md hover:bg-red-500 hover:text-white transition z-20"
                          >
                            <XMarkIcon className="w-4 h-4" />
                          </button>
                        </div>
                      ))}

                      {/* Botón de agregar imágenes adicionales */}
                      {formData.imagePreviews.length < 5 && (
                        <label className="flex flex-col items-center justify-center h-28 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100 transition">
                          <input
                            type="file"
                            accept="image/*"
                            multiple
                            onChange={(e) => handleImageUpload(e, formData, setFormData)}
                            className="hidden"
                          />
                          <PlusIcon className="w-6 h-6 text-gray-500" />
                          <span className="text-xs text-gray-400">Agregar</span>
                        </label>
                      )}
                    </div>
                  ) : (
                    // Si no hay imágenes aún
                    <label className="flex flex-col items-center justify-center h-48 cursor-pointer">
                      <input
                        type="file"
                        accept="image/*"
                        multiple
                        onChange={(e) => handleImageUpload(e, formData, setFormData)}
                        className="hidden"
                      />
                      <svg
                        className="mx-auto h-12 w-12 text-gray-400"
                        stroke="currentColor"
                        fill="none"
                        viewBox="0 0 48 48"
                      >
                        <path
                          d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                      <p className="mt-1 text-gray-500">Haz clic o arrastra para agregar imágenes</p>
                      <p className="text-sm text-gray-400">Entre 3 y 5 imágenes — PNG o JPG</p>
                    </label>
                  )}
                </div>
              </div>
              <div className="flex gap-4">
                <button
                  type="submit"
                  className="flex-1 px-5 py-2 rounded-full font-medium transition-all duration-300 transform hover:scale-105 bg-gradient-to-r from-cyan-400 to-cyan-600 text-white shadow-lg"
                >
                  {editingProduct ? 'Actualizar' : 'Crear'}
                </button>
                <button
                  type="button"
                  onClick={handleCloseModal}
                  className="flex-1 px-4 py-2 rounded-full font-medium transition-all duration-300 transform hover:scale-105 bg-white text-gray-700 border-2 border-gray-200 hover:border-cyan-300"
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
