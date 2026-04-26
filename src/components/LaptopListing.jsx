import { products } from "../data/products";
import Listing from "../components/Listing"; 

function LaptopListing({ cart, setCart, setPageType }) {
  return (
    <Listing
      category="laptop"
      products={products}
      cart={cart}
      setCart={setCart}
      setPageType={setPageType}
    />
  );
}
export default LaptopListing;
