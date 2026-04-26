import { useState } from 'react';
import styles from './ProductCard.module.css';
import { FaHeart, FaRegHeart } from 'react-icons/fa';

function ProductCard({ product, cart, setCart }) {
  const [imgIndex, setImgIndex] = useState(0);
  const [isFavorite, setIsFavorite] = useState(false);
  const quantity = cart.get(product.id) || 0;

  const images = product.images;
  const hasMultiple = images.length > 1;

  const nextImage = () => setImgIndex((prev) => (prev + 1) % images.length);
  const prevImage = () => setImgIndex((prev) => (prev - 1 + images.length) % images.length);

  const updateCart = (newQuantity) => {
    if (newQuantity <= 0) {
      const newCart = new Map(cart);
      newCart.delete(product.id);
      setCart(newCart);
    } else {
      const newCart = new Map(cart);
      newCart.set(product.id, newQuantity);
      setCart(newCart);
    }
  };

  const addToCart = () => updateCart(quantity + 1);
  const increment = () => updateCart(quantity + 1);
  const decrement = () => updateCart(quantity - 1);

  return (
    <div className={styles.productCard}>
      <div className={styles.carouselContainer}>
        <img src={images[imgIndex]} alt={product.model} className={styles.carouselImage} />
        {hasMultiple && (
          <>
            <button className={`${styles.carouselArrow} ${styles.left}`} onClick={prevImage}>‹</button>
            <button className={`${styles.carouselArrow} ${styles.right}`} onClick={nextImage}>›</button>
            <div className={styles.carouselIndicator}>{imgIndex+1}/{images.length}</div>
          </>
        )}
      </div>
      <div className={styles.cardBody}>
        {product.isSpecialOffer && <div className={styles.specialBadge}>Special Offer</div>}
        <div className={styles.brand}>{product.make}</div>
        <div className={styles.model}>{product.model}</div>
        <div className={styles.price}>${product.price.toLocaleString()}</div>
        <div className={styles.cardActions}>
          <button className={styles.favoriteBtn} onClick={() => setIsFavorite(!isFavorite)}>
            {isFavorite ? <FaHeart color="#e11d48" /> : <FaRegHeart />}
          </button>
          <div className={styles.cartControl}>
            {quantity === 0 ? (
              <button className={styles.addBtn} onClick={addToCart}>Add to Cart</button>
            ) : (
              <div className={styles.cartCounter}>
                <button onClick={decrement}>−</button>
                <span>{quantity} in cart</span>
                <button onClick={increment}>+</button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductCard;