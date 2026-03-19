import apiClient from '../api/client';
import { API_ENDPOINTS } from '../api/endpoints';

export async function getCategories() {
  const response = await apiClient.get(API_ENDPOINTS.categories);
  return response.data;
}

export async function getProducts() {
  const response = await apiClient.get(API_ENDPOINTS.products);
  return response.data;
}

export async function getProductsByCategory(categoryId) {
  const response = await apiClient.get(API_ENDPOINTS.productsByCategory(categoryId));
  return response.data;
}
