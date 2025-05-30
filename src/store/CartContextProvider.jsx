import { useReducer } from "react";
import CartContext from "./CartContext";

const defaultCartState = {
   items: [],
   totalAmount: 0
}

const cartReducer = (state, action) => {

   if(action.type === 'ADD_ITEM') {
      const updatedTotalAmount = state.totalAmount + action.item.price * action.item.amount;

      const existingCartItemIndex = state.items.findIndex(item => item.id === action.item.id)

      const existingCartItem = state.items[existingCartItemIndex]

      
      let updatedItems;

      if(existingCartItem) {

         const updatedItem = {
            ...existingCartItem,
            amount: existingCartItem.amount + action.item.amount
         }

         updatedItems = [...state.items] 
         updatedItems[existingCartItemIndex] = updatedItem

      } else {
         updatedItems = state.items.concat(action.item);
      }

      return {
         items: updatedItems,
         totalAmount: updatedTotalAmount
      }
   }

   if(action.type === 'REMOVE_ITEM') {

      const existingCartItemIndex = state.items.findIndex(item => item.id === action.id)
      
      const existingCartItem = state.items[existingCartItemIndex]
      
      const updatedTotalAmount = state.totalAmount - existingCartItem.price;

      let updatedItems;

      if(existingCartItem.amount === 1) {
         
         updatedItems = state.items.filter(item => item.id !== action.id)

      } else {

         const updatedItem = {
            ...existingCartItem,
            amount: existingCartItem.amount - 1
         }

         updatedItems = [...state.items]
         updatedItems[existingCartItemIndex] = updatedItem;

      }

      return {
         items: updatedItems,
         totalAmount: updatedTotalAmount
      }

   }

   return defaultCartState;
}

const CartContextProvider = (props) => {

   const [cartState, dispatchCartAction] = useReducer(cartReducer, defaultCartState)

   const addItemHandler = (item) => {
      dispatchCartAction({type: 'ADD_ITEM', item: item})
   }
   const removeItemHandler = (id) => {
      dispatchCartAction({type: 'REMOVE_ITEM', id: id})
   }

   const clearItemsHandler = () => {
      dispatchCartAction({type: 'CLEAR_ITEMS'})
   }

   const cartContextValue = {
      items: cartState.items,
      totalAmount: cartState.totalAmount,
      addItem: addItemHandler,
      removeItem: removeItemHandler,
      clearItems: clearItemsHandler,
   }


   return (
      <CartContext.Provider value={cartContextValue}>
         {props.children}
      </CartContext.Provider>
   );
}

export default CartContextProvider;