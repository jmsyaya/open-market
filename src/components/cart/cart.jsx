import styles from "./cart.module.css";
import { useState } from "react";
import { CartHeader } from "./cartHeader";
import { CartList } from "./cartList";
import { TotalCart } from "./totalCart";

// 장바구니 안에 데이터 확인
export const Cart = ({ cart, setCart, convertPrice }) => {
  const [total, setTotal] = useState(0);

  const [checkLists, setCheckLists] = useState([]);

  // 장바구니 각 제품들 모두 체크시 전체선택 활성화, 및 비활성화
  const isAllChecked =
    cart.length === checkLists.length && checkLists.length !== 0;

  // 체크가 된 항목들 반환
  const found = checkLists.map((checkList) =>
    cart.filter((el) => el.id === parseInt(checkList))
  );

  // 장바구니 내에서 수량 기능
  const handleQuantity = (type, id, quantity) => {
    const found = cart.filter((el) => el.id === id)[0]; // el = anythings
    const idx = cart.indexOf(found);

    if (type === "plus") {
      const cartItem = {
        id: found.id,
        image: found.image,
        name: found.name,
        quantity: quantity,
        price: found.price,
        provider: found.provider,
      };
      setCart([...cart.slice(0, idx), cartItem, ...cart.slice(idx + 1)]);
    } else {
      if (quantity === 0) return; // 수량 마이너스로 가는 것을 방지.
      const cartItem = {
        id: found.id,
        image: found.image,
        name: found.name,
        quantity: quantity,
        price: found.price,
        provider: found.provider,
      };
      setCart([...cart.slice(0, idx), cartItem, ...cart.slice(idx + 1)]);
    }
  };

  // 장바구니 내에서 X클릭 시 그 제품을 장바구니에서 삭제 기능
  const handleRemove = (id) => {
    setCart(cart.filter((cart) => cart.id !== id));
    setCheckLists(checkLists.filter((check) => parseInt(check) !== id)); // 체크리스트와 카트 둘다 삭제해야 전체삭제후 개별 삭제시 오류가 안남.
  };

  // 장바구니 내에서 각 제품 선택 기능
  const handleCheckList = (checked, id) => {
    if (checked) {
      setCheckLists([...checkLists, id]);
    } else {
      setCheckLists(checkLists.filter((check) => check !== id));
    }
  };

  // 전체 선택 기능
  const handleCheckAll = (checked) => {
    if (checked) {
      const checkItems = [];
      cart.map((cart) => checkItems.push(`${cart.id}`));
      setCheckLists(checkItems);
    } else {
      setCheckLists([]);
    }
  };

  return (
    <>
      <CartHeader isAllChecked={isAllChecked} handleCheckAll={handleCheckAll} />
      {cart.length !== 0 ? (
        cart.map((cart) => {
          return (
            <CartList
              key={`key-${cart.id}`}
              cart={cart}
              setCart={setCart}
              convertPrice={convertPrice}
              handleQuantity={handleQuantity}
              handleRemove={handleRemove}
              handleCheckList={handleCheckList}
              checkLists={checkLists}
            />
          );
        })
      ) : (
        <div className={styles.not}>
          <h2>장바구니에 담긴 상품이 없습니다.</h2>
          <p>원하는 상품을 장바구니에 담아보세요!</p>
        </div>
      )}
      {cart.length !== 0 ? (
        <TotalCart
          cart={cart}
          total={total}
          setTotal={setTotal}
          convertPrice={convertPrice}
          found={found}
        />
      ) : (
        ""
      )}
    </>
  );
};
