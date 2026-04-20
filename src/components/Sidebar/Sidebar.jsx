import { products } from "../../data/products";
import styles from "./Sidebar.module.css";

function Sidebar() {
  const brands = [
    ...new Set(products.filter((p) => p.category === "tv").map((p) => p.brand)),
  ];

  return (
    <aside className={styles.sidebar}>
      <div className={styles.sidebarHeader}>
        <h3>Filters</h3>
      </div>

      <div className={styles.filterGroup}>
        <label className={styles.filterLabel}>Brand</label>
        <select className={styles.filterSelect}>
          <option>All Brands</option>
          {brands.map((b) => (
            <option key={b}>{b}</option>
          ))}
        </select>
      </div>

      <div className={styles.filterGroup}>
        <label className={styles.filterLabel}>Price Range</label>
        <div className={styles.priceInputs}>
          <input
            type="number"
            placeholder="Min $"
            className={styles.priceInput}
          />
          <span className={styles.priceSeparator}>—</span>
          <input
            type="number"
            placeholder="Max $"
            className={styles.priceInput}
          />
        </div>
      </div>

      <button className={styles.applyBtn}>Apply Filters</button>

      <div className={styles.specialDeal}>
        <div className={styles.dealBadge}>🔥 SPECIAL DEAL</div>
        <div className={styles.timerDisplay}>
          <span className={styles.timeUnit}>00</span>:
          <span className={styles.timeUnit}>59</span>:
          <span className={styles.timeUnit}>59</span>
        </div>
        <p className={styles.dealText}>Free shipping on all orders!</p>
      </div>
    </aside>
  );
}

export default Sidebar;
