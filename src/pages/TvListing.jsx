import { products } from "../data/products";
import Listing from "../components/Listing"; 

function TvListing({ cart, setCart, setPageType }) {
  return (
    <Listing
      category="tv"
      products={products}
      cart={cart}
      setCart={setCart}
      setPageType={setPageType}
    />
  );
}

export default TvListing;
