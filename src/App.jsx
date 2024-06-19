import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { useState } from "react";
import { TopNavigationBar } from "./components/header/topNavigationBar/topNavigationBar";
import Home from "./pages/home";
import Product from "./pages/product";
import Basket from "./pages/basket";

function App() {
  const [products, setProducts] = useState([]); // 제품 변수
  const [cart, setCart] = useState([]); // 장바구니 변수

  const convertPrice = (price) => {
    return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","); // 가격표기에 천원단위마다 "." 표시
  };

  return (
    <BrowserRouter>
      <TopNavigationBar cart={cart} />
      <Routes>
        <Route
          path="/"
          element={
            <Home
              convertPrice={convertPrice}
              products={products}
              setProducts={setProducts}
            />
          } // 정보를 보내기
        />
        <Route
          path="/product/:id"
          element={
            <Product
              convertPrice={convertPrice}
              cart={cart}
              setCart={setCart}
            />
          } // 정보를 보내기
        />
        <Route
          path="/cart"
          element={
            <Basket cart={cart} setCart={setCart} convertPrice={convertPrice} />
          }
        />
      </Routes>
    </BrowserRouter>
  ); // Route안의 Product는 Page 안에있는 Product.jsx
  // 각 Routes 마다 setProducts 등 필요하면 각각에 채우기
  // App - product - xx 순으로
}

export default App;
