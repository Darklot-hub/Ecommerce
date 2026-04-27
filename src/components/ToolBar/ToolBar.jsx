import styles from "./Toolbar.module.css";

function Toolbar({ productCount }) {
  return (
    <div className={styles.toolbar}>
      <div className={styles.productCount}>
        <span>{productCount}</span> products
      </div>
      <div className={styles.sortWrapper}>
        <label>Sort by:</label>
        <select className={styles.sortSelect}>
          <option>Price: High to Low</option>
          <option>Price: Low to High</option>
        </select>
      </div>
    </div>
  );
}

export default Toolbar;
