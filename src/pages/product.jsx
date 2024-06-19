import { Detail } from "../components/product_detail/detail";

const Product = ({ convertPrice, cart, setCart }) => {
  return <Detail convertPrice={convertPrice} cart={cart} setCart={setCart} />; // Detail로 보내기
};

export default Product;
