import { useCallback, useState } from 'react';
import { PlusIcon, XMarkIcon } from '@heroicons/react/24/outline';
import { PRODUCT_CONFIG } from '../../../constants/product.constants';

/**
 * Image uploader component for product images
 */
export default function ImageUploader({ images, imagePreviews, onChange }) {
  const [uploadError, setUploadError] = useState(null);

  const handleImageUpload = useCallback((e) => {
    setUploadError(null);
    const newFiles = Array.from(e.target.files);
    const combinedFiles = [...images, ...newFiles];

    if (combinedFiles.length > PRODUCT_CONFIG.MAX_IMAGES) {
      setUploadError(`Solo puedes subir un máximo de ${PRODUCT_CONFIG.MAX_IMAGES} imágenes.`);
      e.target.value = '';
      return;
    }

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
        onChange({
          images: combinedFiles,
          imagePreviews: [...imagePreviews, ...newImages.map(i => i.preview)]
        });
      })
      .catch(() => {
        setUploadError('Error al cargar las imágenes.');
      });
  }, [images, imagePreviews, onChange]);

  const handleRemoveImage = useCallback((index) => {
    onChange({
      images: images.filter((_, i) => i !== index),
      imagePreviews: imagePreviews.filter((_, i) => i !== index)
    });
  }, [images, imagePreviews, onChange]);

  return (
    <div className="mb-4">
      <label className="block text-gray-700 text-sm font-medium mb-2">
        Cargar Imágenes ({PRODUCT_CONFIG.MIN_IMAGES}-{PRODUCT_CONFIG.MAX_IMAGES})
      </label>

      {uploadError && (
        <div className="mb-2 p-2 sm:p-3 bg-red-100 text-red-700 rounded-lg text-xs sm:text-sm">
          {uploadError}
        </div>
      )}

      <div className="w-full min-h-40 sm:min-h-48 border-2 border-dashed border-gray-200 rounded-lg sm:rounded-xl bg-gray-50 p-3 sm:p-4 hover:bg-gray-100 hover:border-gray-300 transition-all">
        {imagePreviews && imagePreviews.length > 0 ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 sm:gap-3">
            {imagePreviews.map((preview, index) => (
              <div key={index} className="relative group">
                <div
                  className={`relative rounded-lg overflow-hidden border-2 ${index === 0 ? 'border-blue-500' : 'border-transparent'
                    } transition-all`}
                >
                  <img
                    src={preview}
                    alt={`Preview ${index + 1}`}
                    className="h-20 sm:h-28 w-full object-cover rounded-md shadow-sm"
                  />

                  {index === 0 && (
                    <span className="absolute top-1 left-1 bg-blue-500 text-white text-[10px] px-2 py-0.5 rounded-md shadow-sm">
                      Principal
                    </span>
                  )}
                </div>
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleRemoveImage(index);
                  }}
                  className="absolute top-1 right-1 bg-white text-gray-700 rounded-full p-1 shadow-md hover:bg-red-500 hover:text-white transition-all transform hover:scale-110 z-20"
                  aria-label="Eliminar imagen"
                >
                  <XMarkIcon className="w-3 h-3 sm:w-4 sm:h-4" />
                </button>
              </div>
            ))}

            {/* Botón de agregar imágenes adicionales */}
            {imagePreviews.length < PRODUCT_CONFIG.MAX_IMAGES && (
              <label className="flex flex-col items-center justify-center h-20 sm:h-28 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer bg-white hover:bg-gray-50 hover:border-cyan-400 transition-all">
                <input
                  type="file"
                  accept="image/*"
                  multiple
                  onChange={handleImageUpload}
                  className="hidden"
                />
                <PlusIcon className="w-5 h-5 sm:w-6 sm:h-6 text-gray-400" />
                <span className="text-xs text-gray-400 mt-1">Agregar</span>
              </label>
            )}
          </div>
        ) : (
          // Si no hay imágenes aún
          <label className="flex flex-col items-center justify-center h-40 sm:h-48 cursor-pointer hover:bg-white transition-colors rounded-lg">
            <input
              type="file"
              accept="image/*"
              multiple
              onChange={handleImageUpload}
              className="hidden"
            />
            <svg
              className="mx-auto h-10 w-10 sm:h-12 sm:w-12 text-gray-400"
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
            <p className="mt-2 text-sm sm:text-base text-gray-500 text-center px-4">
              Haz clic o arrastra para agregar imágenes
            </p>
            <p className="text-xs sm:text-sm text-gray-400 mt-1 text-center px-4">
              Entre {PRODUCT_CONFIG.MIN_IMAGES} y {PRODUCT_CONFIG.MAX_IMAGES} imágenes — PNG o JPG
            </p>
          </label>
        )}
      </div>
    </div>
  );
}
