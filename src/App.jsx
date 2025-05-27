import { useState } from "react"
import Cart from "./components/Cart/Cart"
import Header from "./components/Layout/Header"
import Meals from "./components/Meals/Meals"
import CartContextProvider from "./store/CartContextProvider";

function App() {

  const [cartIsVisible, setCartVisible] = useState(false);

  const showCartHandler = () => {
    setCartVisible(true)
  }

  const hideCartHandler = () => {
    setCartVisible(false)
  }
  
  return (
    <CartContextProvider>
      {cartIsVisible && <Cart onHideCart={hideCartHandler}/>}
      <Header onShowCart={showCartHandler}/>
      <main>
        <Meals />
      </main>
    </CartContextProvider>
  )
}

export default App
