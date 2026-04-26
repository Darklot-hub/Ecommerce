import { useState, useEffect } from "react";
import styles from "./Sidebar.module.css";

function Sidebar({ brands, onApplyFilters, resetTrigger }) {
  const [selectedBrand, setSelectedBrand] = useState("");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");

  useEffect(() => {
    setSelectedBrand("");
    setMinPrice("");
    setMaxPrice("");
  }, [resetTrigger]);

  const handleApply = () => {
    onApplyFilters({
      brand: selectedBrand,
      minPrice: minPrice ? Number(minPrice) : undefined,
      maxPrice: maxPrice ? Number(maxPrice) : 5000,
    });
  };

  return (
    <aside className={styles.sidebar}>
      <div className={styles.sidebarHeader}>
        <h3>Filters</h3>
      </div>

      <div className={styles.filterGroup}>
        <label className={styles.filterLabel}>Brand</label>
        <select
          className={styles.filterSelect}
          value={selectedBrand}
          onChange={(e) => setSelectedBrand(e.target.value)}
        >
          <option value="">All Brands</option>
          {brands.map((brand) => (
            <option key={brand} value={brand}>
              {brand}
            </option>
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
            value={minPrice}
            onChange={(e) => setMinPrice(e.target.value)}
          />
          <span className={styles.priceSeparator}>—</span>
          <input
            type="number"
            placeholder="Max $"
            className={styles.priceInput}
            value={maxPrice}
            onChange={(e) => setMaxPrice(e.target.value)}
          />
        </div>
      </div>

      <button className={styles.applyBtn} onClick={handleApply}>
        Apply Filters
      </button>

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
