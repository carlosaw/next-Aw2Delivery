import styles from './styles.module.css';

const ProductItem = () => {
  return(
    <div className={styles.container}>
      <div className={styles.head}></div>
    <div className={styles.info}>
      <div className={styles.img}>
        <img src="/tmp/burger.png" alt='' />
      </div>      
      <div className={styles.catName}>Tradicional</div>
      <div className={styles.name}>Texas Burger</div>
      <div className={styles.price}>R$ 25,50</div>
    </div>
    </div>
  )
}

export default ProductItem;