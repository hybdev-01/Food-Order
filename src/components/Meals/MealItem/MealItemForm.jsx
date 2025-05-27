import { useRef, useState } from 'react';
import Input from '../../UI/Input';
import styles from './MealItemForm.module.css'

const MealItemForm = (props) => {

   const [isAmountValid, setAmountValid] = useState(true);

   const amountInputRef = useRef();

   const submitHandler = (event) => {
      event.preventDefault();

      const inputAmount = amountInputRef.current.value;

      if(inputAmount.trim().length === 0 || +inputAmount < 1 || +inputAmount > 10) {
         setAmountValid(false)
         return;
      }

      props.onAddToCart(+inputAmount)

   }

   return (
      <form className={styles.form} onSubmit={submitHandler}>
         <Input 
            ref={amountInputRef}
            label='Количество' 
            input={{
               id: props.id,
               type: 'number',
               min: 1,
               max: 10,
               step: 1,
               defaultValue: 1,    
         }} />
         <button>Добавить</button>
         {!isAmountValid && <p>Количество должно быть больше 0 и меньше 10</p>}
      </form>
   )
}

export default MealItemForm;