import styles from "./ToolBar.module.css";

function Toolbar({ productCount, sortType, onSortChange }) {
  return (
    <div className={styles.toolbar}>
      <div className={styles.productCount}>
        <span>{productCount}</span> products
      </div>
      <div className={styles.sortWrapper}>
        <label>Sort by:</label>
        <select
          className={styles.sortSelect}
          value={sortType}
          onChange={(e) => onSortChange(e.target.value)}
        >
          <option value="lowToHigh">Price: Low to High</option>
          <option value="highToLow">Price: High to Low</option>
        </select>
      </div>
    </div>
  );
}

export default Toolbar;
