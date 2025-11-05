// 🎨 UTILIDADES PARA APLICAR TEMAS Y COLORES

import { siteConfig } from '../config/siteConfig';

/**
 * Genera las clases de Tailwind para un degradado
 * @param {string} type - 'primary' | 'secondary' | 'accent'
 * @returns {string} - Clases de Tailwind
 */
export const getGradientClasses = (type = 'primary') => {
  const colors = siteConfig.theme.colors[type];
  return `from-${colors.from} to-${colors.to}`;
};

/**
 * Genera las clases de Tailwind para texto con color
 * @param {string} type - 'primary' | 'secondary'
 * @returns {string} - Clases de Tailwind
 */
export const getTextColorClass = (type = 'primary') => {
  const colors = siteConfig.theme.colors[type];
  return `text-${colors.text}`;
};

/**
 * Genera las clases de Tailwind para hover
 * @param {string} type - 'primary' | 'secondary'
 * @returns {string} - Clases de Tailwind
 */
export const getHoverClasses = (type = 'primary') => {
  const colors = siteConfig.theme.colors[type];
  return `hover:${colors.hover}`;
};

/**
 * Genera clases completas para un botón con degradado
 * @param {string} type - 'primary' | 'secondary'
 * @param {boolean} outline - Si es botón outline
 * @returns {string} - Clases completas de Tailwind
 */
export const getButtonClasses = (type = 'primary', outline = false) => {
  const colors = siteConfig.theme.colors[type];
  
  if (outline) {
    return `border-2 border-${colors.from} text-${colors.text} hover:bg-${colors.from} hover:text-white`;
  }
  
  return `bg-gradient-to-r from-${colors.from} to-${colors.to} text-white hover:from-${colors.hover} hover:to-${colors.hover}`;
};

/**
 * Genera clases para badges/etiquetas
 * @param {string} type - 'primary' | 'secondary'
 * @returns {string} - Clases de Tailwind
 */
export const getBadgeClasses = (type = 'primary') => {
  const colors = siteConfig.theme.colors[type];
  return `bg-gradient-to-r from-${colors.from} to-${colors.to} text-gray-900`;
};

/**
 * Obtiene el preset de color actual
 * @returns {object} - Objeto con los colores del preset
 */
export const getCurrentPreset = () => {
  return siteConfig.theme.presets.default;
};

/**
 * Cambia el preset de colores (esto requeriría un sistema de gestión de estado)
 * @param {string} presetName - Nombre del preset
 */
export const changePreset = (presetName) => {
  const preset = siteConfig.theme.presets[presetName];
  if (preset) {
    // Aquí se podría implementar la lógica para cambiar dinámicamente
    console.log('Cambiar a preset:', presetName, preset);
    return preset;
  }
  return null;
};

/**
 * Obtiene el texto de configuración
 * @param {string} path - Ruta del texto (ej: 'home.hero.title')
 * @returns {string} - Texto configurado
 */
export const getText = (path) => {
  const keys = path.split('.');
  let value = siteConfig;
  
  for (const key of keys) {
    if (value && typeof value === 'object') {
      value = value[key];
    } else {
      return '';
    }
  }
  
  return value || '';
};

/**
 * Reemplaza variables en un texto
 * @param {string} text - Texto con variables {variable}
 * @param {object} vars - Objeto con las variables
 * @returns {string} - Texto con variables reemplazadas
 */
export const replaceVars = (text, vars = {}) => {
  return text.replace(/{(\w+)}/g, (match, key) => {
    return vars[key] !== undefined ? vars[key] : match;
  });
};

/**
 * Obtiene la configuración del negocio
 * @returns {object} - Información del negocio
 */
export const getBusinessInfo = () => {
  return siteConfig.business;
};

/**
 * Genera clases para fondos con degradado
 * @param {string} type - 'primary' | 'secondary' | 'dark'
 * @returns {string} - Clases de Tailwind
 */
export const getBackgroundClasses = (type = 'primary') => {
  if (type === 'dark') {
    return `bg-gradient-to-br from-slate-900 via-${siteConfig.theme.colors.primary.from} to-${siteConfig.theme.colors.accent.to}`;
  }
  
  const colors = siteConfig.theme.colors[type];
  return `bg-gradient-to-r from-${colors.from} to-${colors.to}`;
};

export default {
  getGradientClasses,
  getTextColorClass,
  getHoverClasses,
  getButtonClasses,
  getBadgeClasses,
  getCurrentPreset,
  changePreset,
  getText,
  replaceVars,
  getBusinessInfo,
  getBackgroundClasses,
};
