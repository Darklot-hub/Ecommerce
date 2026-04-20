import styles from "./ProductGrid.module.css";
import ProductCard from "../ProductCard/ProductCard";

function ProductGrid({ products }) {
  if (!products || products.length === 0) {
    return <div className={styles.productsGrid}>No products available</div>;
  }

  return (
    <div className={styles.productsGrid}>
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}

export default ProductGrid;
