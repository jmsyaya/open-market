import { Main } from "../components/main/main";

const Home = ({ convertPrice, products, setProducts }) => {
  return (
    <Main
      convertPrice={convertPrice}
      products={products}
      setProducts={setProducts}
    />
  ); // Main으로 보내기
};

export default Home;
