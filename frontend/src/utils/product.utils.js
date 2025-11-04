import { STOCK_STATUS } from '../constants/product.constants';

/**
 * Get stock status class based on stock level
 */
export const getStockStatusClass = (stock) => {
  if (stock > STOCK_STATUS.HIGH.threshold) {
    return STOCK_STATUS.HIGH.className;
  } else if (stock > STOCK_STATUS.LOW.threshold) {
    return STOCK_STATUS.LOW.className;
  } else {
    return STOCK_STATUS.OUT.className;
  }
};

/**
 * Format price with currency
 */
export const formatPrice = (price) => {
  return `$${parseFloat(price).toFixed(2)}`;
};
