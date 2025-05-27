import styles from "./HeaderCartButton.module.css";
import CartIcon from "../Cart/CartIcon";
import { useContext, useEffect, useState } from "react";
import CartContext from "../../store/CartContext";

const HeaderCartButton = (props) => {
  const [buttonIsBumped, setButtonBumped] = useState(false);

  const cartCtx = useContext(CartContext);

  const cartItemsNumber = cartCtx.items.reduce(
    (currentValue, item) => currentValue + item.amount,
    0
  );

  const buttonClass = `${styles.button} ${
    (buttonIsBumped && styles.bump) || ""
  }`;

  useEffect(() => {
    if (cartCtx.items.length) {
      setButtonBumped(true);
    }

    const timer = setTimeout(() => {
      setButtonBumped(false);
    }, 300);

    return () => {
      clearTimeout(timer);
    };
  }, [cartCtx.items]);

  return (
    <button className={buttonClass} onClick={props.onClick}>
      <span className={styles.icon}>
        <CartIcon />
      </span>
      <span>Корзина</span>
      <span className={styles.badge}>{cartItemsNumber}</span>
    </button>
  );
};

export default HeaderCartButton;
