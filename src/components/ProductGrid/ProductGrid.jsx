import styles from "./ProductGrid.module.css";
import ProductCard from "../ProductCard/ProductCard";

function ProductGrid({ products, cart, setCart }) {
  if (!products || products.length === 0) {
    return <div className={styles.productsGrid}>No products match filters</div>;
  }
  return (
    <div className={styles.productsGrid}>
      {products.map((product) => (
        <ProductCard
          key={product.id}
          product={product}
          cart={cart}
          setCart={setCart}
        />
      ))}
    </div>
  );
}

export default ProductGrid;
