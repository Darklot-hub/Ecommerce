import { useState, useEffect } from "react";
import styles from "../components/Listing.module.css";
import Sidebar from "./Sidebar/Sidebar";
import Toolbar from "./ToolBar/ToolBar";
import ProductGrid from "./ProductGrid/ProductGrid";
import { products } from "./../data/products";

function Listing({ category, cart, setCart, setPageType }) {
  const categoryProducts = products.filter((p) => p.category === category);
  const [filteredProducts, setFilteredProducts] = useState(categoryProducts);
  const [sortType, setSortType] = useState("lowToHigh");
  const [filterBrand, setFilterBrand] = useState("");
  const [filterMinPrice, setFilterMinPrice] = useState(undefined);
  const [filterMaxPrice, setFilterMaxPrice] = useState(5000);
  const [resetTrigger, setResetTrigger] = useState(0);
  const brands = [...new Set(categoryProducts.map((p) => p.brand))];

  useEffect(() => {
    setSortType("lowToHigh");
    setFilterBrand("");
    setFilterMinPrice(undefined);
    setFilterMaxPrice(5000);
    setResetTrigger((prev) => prev + 1);
  }, [category]);

  const applyFilters = ({ brand, minPrice, maxPrice }) => {
    setFilterBrand(brand || "");
    setFilterMinPrice(minPrice);
    setFilterMaxPrice(maxPrice);
    updateFilteredProducts(brand || "", minPrice, maxPrice, sortType);
  };

  const updateFilteredProducts = (brand, minPrice, maxPrice, sort) => {
    let filtered = [...categoryProducts];
    if (brand) {
      filtered = filtered.filter((p) => p.brand === brand);
    }
    if (minPrice !== undefined && minPrice !== "") {
      filtered = filtered.filter((p) => p.price >= minPrice);
    }
    if (maxPrice !== undefined && maxPrice !== "") {
      filtered = filtered.filter((p) => p.price <= maxPrice);
    }
    if (sort === "lowToHigh") {
      filtered.sort((a, b) => a.price - b.price);
    } else {
      filtered.sort((a, b) => b.price - a.price);
    }
    setFilteredProducts(filtered);
  };

  const handleSortChange = (newSort) => {
    setSortType(newSort);
    updateFilteredProducts(
      filterBrand,
      filterMinPrice,
      filterMaxPrice,
      newSort,
    );
  };

  useEffect(() => {
    updateFilteredProducts(
      filterBrand,
      filterMinPrice,
      filterMaxPrice,
      sortType,
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [category]);

  return (
    <div className={styles.listingLayout}>
      <Sidebar
        brands={brands}
        onApplyFilters={applyFilters}
        resetTrigger={resetTrigger}
      />
      <div className={styles.productsArea}>
        <Toolbar
          productCount={filteredProducts.length}
          sortType={sortType}
          onSortChange={handleSortChange}
        />
        <ProductGrid
          products={filteredProducts}
          cart={cart}
          setCart={setCart}
        />
      </div>
    </div>
  );
}

export default Listing;
