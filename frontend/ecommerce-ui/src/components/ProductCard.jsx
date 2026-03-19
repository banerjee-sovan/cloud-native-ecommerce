const fallbackImage =
  'https://images.unsplash.com/photo-1512436991641-6745cdb1723f?auto=format&fit=crop&w=900&q=80';

function formatPrice(price) {
  const numericPrice = Number(price ?? 0);
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(numericPrice);
}

function ProductCard({ product }) {
  return (
    <article className="product-card">
      <div className="product-card__media">
        <img
          src={product.imageUrl || fallbackImage}
          alt={product.name}
          className="product-card__image"
        />
      </div>
      <div className="product-card__content">
        <p className="product-card__category">{product.categoryName || 'Featured product'}</p>
        <h3 className="product-card__title">{product.name}</h3>
        <p className="product-card__price">{formatPrice(product.price)}</p>
        <button type="button" className="product-card__button">
          Add to cart
        </button>
      </div>
    </article>
  );
}

export default ProductCard;
