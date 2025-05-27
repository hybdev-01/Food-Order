import { useContext } from 'react';
import styles from './MealItem.module.css'
import MealItemForm from './MealItemForm';
import CartContext from '../../../store/CartContext';

const MealItem = (props) => {

   const cartCtx = useContext(CartContext)

   const formattedPrice = `$${props.price.toFixed(2)}`;

   const addToCartHandler = (amount) => {

      cartCtx.addItem({
         id: props.id,
         name: props.name,
         amount: amount,
         price: props.price
      })
      
   }

   return (
      <li className={styles.meal}>
         <div>
            <h3>{props.name}</h3>
            <div className={styles.description}>{props.description}</div>
            <div className={styles.price}>{formattedPrice}</div>
         </div>
         <div>
            <MealItemForm id={props.id} onAddToCart={addToCartHandler}/>
         </div>
      </li>
   )

}

export default MealItem;