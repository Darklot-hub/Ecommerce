import styles from "./Header.module.css";
import { FiShoppingCart, FiUser, FiHeart } from "react-icons/fi"; // ← импорт иконок

function Header() {
  return (
    <header className={styles.header}>
      <div className={styles.headerContainer}>
        <div className={styles.logoWrapper}>
          <span className={styles.logoIcon}>📺</span>
          <a href="/tv" className={styles.logo}>
            TechStore
          </a>
        </div>

        <nav className={styles.navTabs}>
          <button className={`${styles.tab} ${styles.tabActive}`}>TV</button>
          <button className={styles.tab}>Phone</button>
          <button className={styles.tab}>Laptop</button>
        </nav>

        <div className={styles.headerIcons}>
          <button className={styles.iconBtn} aria-label="Wishlist">
            <FiHeart size={20} />
            <span className={styles.badge}>0</span>
          </button>
          <button className={styles.iconBtn} aria-label="Cart">
            <FiShoppingCart size={20} />
            <span className={styles.badge}>0</span>
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
