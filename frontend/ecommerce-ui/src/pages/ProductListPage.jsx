import ProductCard from '../components/ProductCard';

function ProductListPage({ title, description, products, isLoading, error }) {
  if (isLoading) {
    return <div className="content-panel">Loading products...</div>;
  }

  if (error) {
    return <div className="content-panel content-panel--error">{error}</div>;
  }

  if (!products.length) {
    return (
      <div className="content-panel">
        <h2>{title}</h2>
        <p>{description}</p>
        <p>No products are available for this selection.</p>
      </div>
    );
  }

  return (
    <section className="content-panel">
      <div className="content-panel__header">
        <div>
          <p className="eyebrow">Catalog</p>
          <h1>{title}</h1>
        </div>
        <p className="content-panel__description">{description}</p>
      </div>

      <div className="product-grid">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </section>
  );
}

export default ProductListPage;
