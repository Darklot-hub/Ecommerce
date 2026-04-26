import styles from "./Header.module.css";
import { FiShoppingCart, FiUser, FiHeart } from "react-icons/fi";

function Header({ pageType, setPageType, cart }) {
  const totalItems = Array.from(cart.values()).reduce(
    (sum, qty) => sum + qty,
    0,
  );

  return (
    <header className={styles.header}>
      <div className={styles.headerContainer}>
        <div className={styles.logoWrapper}>
          <span className={styles.logoIcon}>📺</span>
          <button onClick={() => setPageType("tv")} className={styles.logoBtn}>
            TechStore
          </button>
        </div>

        <nav className={styles.navTabs}>
          <button
            className={`${styles.tab} ${pageType === "tv" ? styles.tabActive : ""}`}
            onClick={() => setPageType("tv")}
          >
            TV
          </button>
          <button
            className={`${styles.tab} ${pageType === "phone" ? styles.tabActive : ""}`}
            onClick={() => setPageType("phone")}
          >
            Phone
          </button>
          <button
            className={`${styles.tab} ${pageType === "laptop" ? styles.tabActive : ""}`}
            onClick={() => setPageType("laptop")}
          >
            Laptop
          </button>
        </nav>

        <div className={styles.headerIcons}>
          <button className={styles.iconBtn} aria-label="Wishlist">
            <FiHeart size={20} />
            <span className={styles.badge}>0</span>
          </button>
          <button
            className={styles.iconBtn}
            aria-label="Cart"
            onClick={() => setPageType("cart")}
          >
            <FiShoppingCart size={20} />
            {totalItems > 0 && (
              <span className={styles.badge}>{totalItems}</span>
            )}
          </button>
          <button
            className={`${styles.iconBtn} ${styles.userBtn}`}
            aria-label="User"
          >
            <FiUser size={20} />
          </button>
        </div>
      </div>
    </header>
  );
}

export default Header;
