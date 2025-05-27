import { useEffect, useState } from "react";
import styles from "./SubmitOrder.module.css";
import useInput from "../../hooks/useInput";

const SubmitOrder = (props) => {

  const [clickedCloseButton, setClickedCloseButton] = useState(false)

  const {
    value: enteredName,
    isValid: isNameInputValid,
    hasError: nameInputHasInvalidValue,
    inputValueChangeHandler: nameInputChangeHandler,
    inputLostFocusHandler: nameInputLostFocus,
    resetValues: resetNameInputValue,
  } = useInput((inputValue) => inputValue.trim() !== "");

  const [nameInputError, setNameInputError] = useState(false);

  const {
    value: enteredAddress,
    isValid: isAddressInputValid,
    hasError: addressInputHasInvalidValue,
    inputValueChangeHandler: addressInputChangeHandler,
    inputLostFocusHandler: addressInputLostFocus,
    resetValues: resetAddressInputValue,
  } = useInput((inputValue) => inputValue.trim() !== "");

  let isFormValid = false;

  if (isNameInputValid && isAddressInputValid) {
    isFormValid = true;
  }


  const submitFormHandler = (event) => {
    event.preventDefault();

    if(clickedCloseButton) {
      props.onCancel();
      return;
    }
    

    if (!isFormValid) {
      console.log('Заполни форму корректно')
      return;
    }

    const userData = { clientName: enteredName, clientAddress: enteredAddress };

   
    props.onSendData(userData)

    resetNameInputValue();
    resetAddressInputValue();
    
  };

  useEffect(() => {

   const timer = setTimeout(() => {

      if(enteredName.length <= 1 && enteredName !== '') {
         setNameInputError(true)
      } else setNameInputError(false)

   }, 300)

   return () => {
      clearTimeout(timer);
   }

  }, [enteredName])

  const nameInputClassName = (nameInputHasInvalidValue || nameInputError) && `${styles.control} ${styles.invalid}` || styles.control;
  const addressInputClassName = addressInputHasInvalidValue && `${styles.control} ${styles.invalid}` || styles.control;

  return (
      <form className={styles.form} onSubmit={submitFormHandler}>
        <div className={nameInputClassName}>
          <label htmlFor="name">Ваше имя</label>
          <input
            type="text"
            id="name"
            value={enteredName}
            onChange={nameInputChangeHandler}
            onBlur={nameInputLostFocus}
          />
        </div>
        {nameInputHasInvalidValue && <p>Нужно ввести имя</p>}
        {(!nameInputHasInvalidValue && nameInputError) && <p>Имя не может состоять из 1 буквы</p>}
        <div className={addressInputClassName}>
          <label htmlFor="address">Адрес</label>
          <input
            type="text"
            id="address"
            value={enteredAddress}
            onChange={addressInputChangeHandler}
            onBlur={addressInputLostFocus}
          />
        </div>
        {addressInputHasInvalidValue && <p>Нужно ввести адрес</p>}
        <div className={styles.actions}>
          <button onClick={() => setClickedCloseButton(true)}>Отменить</button>
          <button className={styles.submit}>Отправить</button>
        </div>
      </form>
  );
};

export default SubmitOrder;
