import styles from "./Home.module.css";
import Header from "../components/Header/Header";
import Footer from "../components/Footer/Footer";
import Sidebar from "../components/Sidebar/Sidebar";
import Toolbar from "../components/Toolbar/ToolBar";
import ProductGrid from "../components/ProductGrid/ProductGrid";
import { products } from "../data/products";

function Home() {
  const tvProducts = products.filter((p) => p.category === "tv");

  return (
    <div className={styles.homeLayout}>
      <Header />
      <div className={styles.homeMain}>
        <Sidebar />
        <div className={styles.productsArea}>
          <Toolbar productCount={tvProducts.length} />
          <ProductGrid products={tvProducts} />
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default Home;
