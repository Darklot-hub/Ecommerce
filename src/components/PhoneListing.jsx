import { products } from "../data/products";
import Listing from "../components/Listing"; // путь к компоненту в components

function PhoneListing({ cart, setCart, setPageType }) {
  return (
    <Listing
      category="phone"
      products={products}
      cart={cart}
      setCart={setCart}
      setPageType={setPageType}
    />
  );
}
export default PhoneListing;
