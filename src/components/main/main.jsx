import styles from "./main.module.css";
import { useEffect } from "react";
import { EventBanner } from "../eventBanner/eventBanner";
import { Product } from "../products/product";
import { getProducts } from "../../service/fetcher";

export const Main = ({ convertPrice, products, setProducts }) => {
  // 제품 정렬
  const sortProduct = (type) => {
    if (type === "recent") {
      const newProduct = [...products]; // ...product -> 기존 products 가져오기
      newProduct.sort((a, b) => a.id - b.id);
      setProducts(newProduct);
    } else if (type === "row") {
      const newProduct = [...products];
      newProduct.sort((a, b) => a.price - b.price);
      setProducts(newProduct);
    } else if (type === "high") {
      const newProduct = [...products];
      newProduct.sort((a, b) => b.price - a.price);
      setProducts(newProduct);
    }
  };

  useEffect(() => {
    getProducts().then((data) => {
      setProducts(data.data.products);
    }); // getProducts() - service 폴더 안 fetcher.js
  }, [setProducts]);
  return (
    <>
      <EventBanner />
      <div className={styles.filter}>
        <p onClick={() => sortProduct("recent")}>최신순</p>
        <p onClick={() => sortProduct("row")}>낮은 가격</p>
        <p onClick={() => sortProduct("high")}>높은 가격</p>
      </div>
      <main className={styles.flex_wrap}>
        {products.map((product) => {
          return (
            <Product
              key={`key-${product.id}`}
              product={product}
              convertPrice={convertPrice}
            />
          ); // map 함수를 이용해 페이지에 제품들을 표시하기
        })}
      </main>
    </>
  );
}; // 컴포넌트들을 모아서 조립
