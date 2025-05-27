import { forwardRef } from 'react';
import styles from './Input.module.css'

const Input = forwardRef((props, inputRef) => {
   return (
      <div className={styles.input}>
         <label htmlFor={props.input.id}>{props.label}</label>
         <input ref={inputRef} {...props.input} />
      </div>
   )
})

export default Input;