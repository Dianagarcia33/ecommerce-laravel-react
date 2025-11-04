// Product configuration constants
export const PRODUCT_CONFIG = {
  MIN_IMAGES: 3,
  MAX_IMAGES: 5,
};

export const INITIAL_FORM_STATE = {
  name: '',
  description: '',
  price: '',
  stock: '',
  category_id: '',
  images: [],
  imagePreviews: []
};

export const STOCK_STATUS = {
  HIGH: { threshold: 10, className: 'bg-green-100 text-green-800' },
  LOW: { threshold: 1, className: 'bg-yellow-100 text-yellow-800' },
  OUT: { threshold: 0, className: 'bg-red-100 text-red-800' }
};
