import TvListing from "../pages/TvListing";
import PhoneListing from "./PhoneListing";
import LaptopListing from "./LaptopListing";
import Cart from "./Cart";

function Content({ pageType, setPageType, cart, setCart }) {
  switch (pageType) {
    case "tv":
      return (
        <TvListing cart={cart} setCart={setCart} setPageType={setPageType} />
      );
    case "phone":
      return (
        <PhoneListing cart={cart} setCart={setCart} setPageType={setPageType} />
      );
    case "laptop":
      return (
        <LaptopListing
          cart={cart}
          setCart={setCart}
          setPageType={setPageType}
        />
      );
    case "cart":
      return <Cart cart={cart} setCart={setCart} setPageType={setPageType} />;
    default:
      return null;
  }
}

export default Content;
