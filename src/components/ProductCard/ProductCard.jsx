import { useState } from "react";
import styles from "./ProductCard.module.css";

function ProductCard({ product }) {
  const [imgIndex, setImgIndex] = useState(0);
  const [isFavorite, setIsFavorite] = useState(false);
  const [cartQty, setCartQty] = useState(0);

  const images = product.images;
  const hasMultiple = images.length > 1;

  const nextImage = () => setImgIndex((prev) => (prev + 1) % images.length);
  const prevImage = () =>
    setImgIndex((prev) => (prev - 1 + images.length) % images.length);

  return (
    <div className={styles.productCard}>
      <div className={styles.carouselContainer}>
        <img
          src={images[imgIndex]}
          alt={product.model}
          className={styles.carouselImage}
        />
        {hasMultiple && (
          <>
            <button
              className={`${styles.carouselArrow} ${styles.left}`}
              onClick={prevImage}
            >
              ‹
            </button>
            <button
              className={`${styles.carouselArrow} ${styles.right}`}
              onClick={nextImage}
            >
              ›
            </button>
            <div className={styles.carouselIndicator}>
              {imgIndex + 1}/{images.length}
            </div>
          </>
        )}
        {product.isSpecialOffer && (
          <div className={styles.specialBadgeOverlay}>Special Offer</div>
        )}
      </div>

      <div className={styles.cardBody}>
        {/* Строка ниже удалена, бейдж больше не здесь */}
        <div className={styles.brand}>{product.make}</div>
        <div className={styles.model}>{product.model}</div>
        <div className={styles.price}>${product.price.toLocaleString()}</div>

        <div className={styles.cardActions}>
          <button
            className={styles.favoriteBtn}
            onClick={() => setIsFavorite(!isFavorite)}
          >
            {isFavorite ? "❤️" : "🤍"}
          </button>

          <div className={styles.cartControl}>
            {cartQty === 0 ? (
              <button className={styles.addBtn} onClick={() => setCartQty(1)}>
                Add to Cart
              </button>
            ) : (
              <div className={styles.cartCounter}>
                <button onClick={() => setCartQty(cartQty - 1)}>−</button>
                <span>{cartQty} in cart</span>
                <button onClick={() => setCartQty(cartQty + 1)}>+</button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductCard;
