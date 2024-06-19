import { Cart } from "../components/cart/cart";

const Basket = ({ cart, setCart, convertPrice }) => {
  return <Cart cart={cart} setCart={setCart} convertPrice={convertPrice} />; // Cart로 보내기
};

export default Basket;
