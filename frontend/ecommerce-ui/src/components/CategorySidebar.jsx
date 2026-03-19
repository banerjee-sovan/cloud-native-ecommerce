function CategorySidebar({ categories, selectedCategoryId, onSelectCategory, isLoading }) {
  return (
    <aside className="sidebar">
      <div className="sidebar__header">
        <p className="eyebrow">Browse</p>
        <h2>Categories</h2>
      </div>

      <button
        type="button"
        className={`sidebar__item ${selectedCategoryId === null ? 'sidebar__item--active' : ''}`}
        onClick={() => onSelectCategory(null)}
      >
        All products
      </button>

      {isLoading ? (
        <p className="sidebar__status">Loading categories...</p>
      ) : (
        <div className="sidebar__list">
          {categories.map((category) => (
            <button
              key={category.id}
              type="button"
              className={`sidebar__item ${
                selectedCategoryId === category.id ? 'sidebar__item--active' : ''
              }`}
              onClick={() => onSelectCategory(category.id)}
            >
              <span>{category.name}</span>
              {category.description ? (
                <small>{category.description}</small>
              ) : (
                <small>Curated collection</small>
              )}
            </button>
          ))}
        </div>
      )}
    </aside>
  );
}

export default CategorySidebar;
