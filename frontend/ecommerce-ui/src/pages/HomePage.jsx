import { useEffect, useMemo, useState } from 'react';
import CategorySidebar from '../components/CategorySidebar';
import ProductListPage from './ProductListPage';
import { getCategories, getProducts, getProductsByCategory } from '../services/api';

function HomePage() {
  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);
  const [selectedCategoryId, setSelectedCategoryId] = useState(null);
  const [isCategoriesLoading, setIsCategoriesLoading] = useState(true);
  const [isProductsLoading, setIsProductsLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    async function loadCategories() {
      try {
        const data = await getCategories();
        setCategories(data);
      } catch (loadError) {
        setError('Unable to load categories from the backend.');
      } finally {
        setIsCategoriesLoading(false);
      }
    }

    loadCategories();
  }, []);

  useEffect(() => {
    async function loadProducts() {
      setIsProductsLoading(true);
      setError('');

      try {
        const data = selectedCategoryId === null
          ? await getProducts()
          : await getProductsByCategory(selectedCategoryId);

        setProducts(data);
      } catch (loadError) {
        setError('Unable to load products from the backend.');
      } finally {
        setIsProductsLoading(false);
      }
    }

    loadProducts();
  }, [selectedCategoryId]);

  const selectedCategory = useMemo(
    () => categories.find((category) => category.id === selectedCategoryId) ?? null,
    [categories, selectedCategoryId],
  );

  const pageTitle = selectedCategory ? selectedCategory.name : 'All Products';
  const pageDescription = selectedCategory?.description
    || 'Discover the latest products from the Spring Boot ecommerce backend.';

  return (
    <main className="app-shell">
      <CategorySidebar
        categories={categories}
        selectedCategoryId={selectedCategoryId}
        onSelectCategory={setSelectedCategoryId}
        isLoading={isCategoriesLoading}
      />

      <ProductListPage
        title={pageTitle}
        description={pageDescription}
        products={products}
        isLoading={isProductsLoading}
        error={error}
      />
    </main>
  );
}

export default HomePage;
