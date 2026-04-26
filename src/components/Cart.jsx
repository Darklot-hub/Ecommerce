import { FiTrash2, FiPlus, FiMinus } from "react-icons/fi";
import styles from "./Cart.module.css";
import { products } from "../data/products";

function Cart({ cart, setCart, setPageType }) {
  const getProductById = (id) => products.find((p) => p.id === id);
  const cartItems = Array.from(cart.entries()).map(([id, quantity]) => {
    const product = getProductById(id);
    return { ...product, quantity };
  });

  const subtotal = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0,
  );
  const tax = subtotal * 0.08;
  const total = subtotal + tax;

  const updateQuantity = (id, newQuantity) => {
    if (newQuantity <= 0) {
      const newCart = new Map(cart);
      newCart.delete(id);
      setCart(newCart);
    } else {
      const newCart = new Map(cart);
      newCart.set(id, newQuantity);
      setCart(newCart);
    }
  };

  const removeItem = (id) => {
    const newCart = new Map(cart);
    newCart.delete(id);
    setCart(newCart);
  };

  if (cartItems.length === 0) {
    return (
      <div className={styles.emptyCart}>
        <h2>Your cart is empty</h2>
        <button
          className={styles.continueBtn}
          onClick={() => setPageType("tv")}
        >
          Continue Shopping
        </button>
      </div>
    );
  }

  return (
    <div className={styles.cartContainer}>
      <h2>Shopping Cart</h2>
      <div className={styles.cartContent}>
        <div className={styles.itemsList}>
          {cartItems.map((item) => (
            <div key={item.id} className={styles.cartItem}>
              <img
                src={item.images[0]}
                alt={item.model}
                className={styles.itemImage}
              />
              <div className={styles.itemDetails}>
                <div className={styles.itemBrand}>{item.make}</div>
                <div className={styles.itemModel}>{item.model}</div>
                <div className={styles.itemPrice}>
                  ${item.price.toLocaleString()}
                </div>
              </div>
              <div className={styles.itemQuantity}>
                <button
                  onClick={() => updateQuantity(item.id, item.quantity - 1)}
                >
                  <FiMinus size={16} />
                </button>
                <span>{item.quantity}</span>
                <button
                  onClick={() => updateQuantity(item.id, item.quantity + 1)}
                >
                  <FiPlus size={16} />
                </button>
              </div>
              <div className={styles.itemTotal}>
                ${(item.price * item.quantity).toLocaleString()}
              </div>
              <button
                className={styles.removeBtn}
                onClick={() => removeItem(item.id)}
              >
                <FiTrash2 size={18} />
              </button>
            </div>
          ))}
        </div>
        <div className={styles.orderSummary}>
          <h3>Order Summary</h3>
          <div className={styles.summaryRow}>
            <span>Subtotal</span>
            <span>${subtotal.toFixed(2)}</span>
          </div>
          <div className={styles.summaryRow}>
            <span>Tax (8%)</span>
            <span>${tax.toFixed(2)}</span>
          </div>
          <div className={styles.summaryRow}>
            <span>Shipping</span>
            <span>Calculated at checkout</span>
          </div>
          <div className={`${styles.summaryRow} ${styles.totalRow}`}>
            <span>Total</span>
            <span>${total.toFixed(2)}</span>
          </div>
          <button className={styles.checkoutBtn}>Proceed to Checkout</button>
          <button className={styles.backBtn} onClick={() => setPageType("tv")}>
            Back to Shopping
          </button>
        </div>
      </div>
    </div>
  );
}

export default Cart;
