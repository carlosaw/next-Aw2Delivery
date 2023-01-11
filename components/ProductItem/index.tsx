import Link from 'next/link';
import { Product } from '../../types/Product';
import styles from './styles.module.css';

type Props = {
  data: Product;
  mainColor: string;
  secondColor: string;
}
const ProductItem = ({ data, mainColor, secondColor}: Props) => {
  return(
    <Link href={`aw2burger/product/${data.id}`}>
      <div className={styles.container}>
        <div className={styles.head} style={{ backgroundColor: secondColor }}></div>
        <div className={styles.info}>
          <div className={styles.img}>
            <img src={data.image} alt='' />
          </div>      
          <div className={styles.catName}>{data.categoryName}</div>
          <div className={styles.name}>{data.name}</div>
          <div className={styles.price} style={{color: mainColor}}>{data.price}</div>
        </div>
      </div>
    </Link>
  )
}

export default ProductItem;