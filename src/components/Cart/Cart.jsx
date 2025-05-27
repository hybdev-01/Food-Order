import { useContext, useEffect, useState } from "react";
import Modal from "../UI/Modal";
import styles from "./Cart.module.css";

import CartContext from "../../store/CartContext";
import CartItem from "./CartItem";
import SubmitOrder from "./SubmitOrder";
import useHttp from "../../hooks/useHttp";
import { BASE_URL } from "../../utils/config";

const Cart = (props) => {
  const [isFormVisible, setIsFormVisible] = useState(false);

  const cartCtx = useContext(CartContext);

  const totalAmount = `$${Math.abs(cartCtx.totalAmount).toFixed(2)}`;
  const hasItemAmount = cartCtx.items.length > 0;

  const { hasError, sendHttpRequest } = useHttp();

  const [submittedSuccessfull, setSubmitSuccessful] = useState(false);

  const submitedData = (data) => {
    console.log(`Заказ ${data?.name} успешно создан`);
    setSubmitSuccessful(true);

    cartCtx.clearItems();
  };

  const sendOrderData = (userData) => {
    sendHttpRequest(
      {
        endpoint: `${BASE_URL}/orderList.json`,
        method: "post",
        body: {
          orderData: cartCtx.items,
          user: userData,
        },
        headers: {
          "Content-Type": "application/json",
        },
      },
      submitedData
    );
  };

  const addCartItemHandler = (item) => {
    cartCtx.addItem({ ...item, amount: 1 });
  };

  const removeCartItemHandler = (id) => {
    cartCtx.removeItem(id);
    !hasItemAmount && setIsFormVisible(false);
  };

  const cartItems = cartCtx.items.map((item) => (
    <CartItem
      key={item.id}
      name={item.name}
      price={item.price}
      amount={item.amount}
      onAdd={addCartItemHandler.bind(null, item)}
      onRemove={removeCartItemHandler.bind(null, item.id)}
    />
  ));

  useEffect(() => {
    const timer = setTimeout(() => {
      if (submittedSuccessfull) {
        props.onHideCart();
      }
    }, 5000);

    return () => {
      clearTimeout(timer);
    };
  }, [submittedSuccessfull, props]);

  const cartButtons = (
    <div className={styles.actions}>
      <button className={styles["button--alt"]} onClick={props.onHideCart}>
        Закрыть
      </button>
      {hasItemAmount && (
        <button
          className={styles.button}
          onClick={() => setIsFormVisible(true)}
        >
          Заказать
        </button>
      )}
    </div>
  );

  const cartContent = (
    <>
      <ul className={styles["cart-items"]}>{cartItems}</ul>
      <div className={styles.total}>
        <span>Итого</span>
        <span>{totalAmount}</span>
      </div>
      {!isFormVisible && cartButtons}
      {isFormVisible && (
        <SubmitOrder onCancel={props.onHideCart} onSendData={sendOrderData} />
      )}
      {hasError.length > 0 && <p>Что-то пошло не так {hasError}</p>}
    </>
  );

  return (
    <Modal onOverlayClick={props.onHideCart}>
      {(!submittedSuccessfull && cartContent) || (
        <p style={{ textAlign: "center" }}>Данные успешно отправлены</p>
      )}
    </Modal>
  );
};

export default Cart;
