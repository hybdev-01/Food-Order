import styles from './Header.module.css';
import sushiImg from '../../assets/sushi.jpg'
import HeaderCartButton from './HeaderCartButton';

const Header = (props) => {
   return (
      <>
         <header className={styles.header}>
            <h2>Японская кухня</h2>
            <HeaderCartButton onClick={props.onShowCart}/>
         </header>
         <div className={styles['main-image']}>
            <img src={sushiImg} alt="Блюда японской кухни" />
         </div>   
      </>
   )
}

export default Header;