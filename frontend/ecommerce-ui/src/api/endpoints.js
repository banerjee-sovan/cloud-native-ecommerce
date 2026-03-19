export const API_ENDPOINTS = {
  categories: '/api/categories',
  products: '/api/products',
  productsByCategory: (categoryId) => `/api/categories/${categoryId}/products`,
};
