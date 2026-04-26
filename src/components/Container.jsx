import { useState } from "react";
import Header from "./Header/Header";
import Content from "../components/Content";
import Footer from "./Footer/Footer";

function Container() {
  const [pageType, setPageType] = useState("tv");
  const [cart, setCart] = useState(new Map());

  return (
    <div className="app-wrapper">
      <Header pageType={pageType} setPageType={setPageType} cart={cart} />
      <Content
        pageType={pageType}
        setPageType={setPageType}
        cart={cart}
        setCart={setCart}
      />
      <Footer />
    </div>
  );
}

export default Container;
