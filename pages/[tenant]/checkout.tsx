import { getCookie, setCookie } from 'cookies-next';
import { GetServerSideProps } from 'next';
import { useEffect, useState } from 'react';
import { useAppContext } from '../../contexts/app';
import { useAuthContext } from '../../contexts/auth';
import { useApi } from '../../libs/useApi';
import styles from '../../styles/Checkout.module.css';
import { Product } from '../../types/Product';
import { Tenant } from '../../types/Tenant';
import { User } from '../../types/User';
import Head from 'next/head';
import { Header } from '../../components/Header';
import { InputField } from '../../components/InputField';
import { Button } from '../../components/Button';
import { useFormatter } from '../../libs/useFormatter';
import { CartItem } from '../../types/CartItem';
import { useRouter } from 'next/router';
import { CartProductItem } from '../../components/CartProductItem';
import { CartCookie } from '../../types/CartCookie';
import { ButtonWithIcon } from '../../components/ButtonWithIcon';
import { Address } from '../../types/Address';

const Checkout = (data: Props) => {
  const { setToken, setUser } = useAuthContext();
  const { tenant, setTenant } = useAppContext();

  useEffect(()=>{
    setTenant(data.tenant);
    setToken(data.token);
    if(data.user) setUser(data.user);
  }, []);

  const formatter = useFormatter();
  const router = useRouter();

  // Product Control
  const [cart, setCart] = useState<CartItem[]>(data.cart);
  const handleCartChange = (newCount: number, id: number) => {
    const tmpCart: CartItem[] = [...cart];
    const cartIndex = tmpCart.findIndex(item => item.product.id === id);
    if(newCount > 0) {
      tmpCart[cartIndex].qt = newCount;
    } else {
      delete tmpCart[cartIndex];
    }
    let newCart: CartItem[] = tmpCart.filter(item => item);
    setCart(newCart);

    // Update cookie
    let cartCookie: CartCookie[] = [];
    for(let i in newCart) {
      cartCookie.push({
        id: newCart[i].product.id,
        qt: newCart[i].qt
      });
    }
    setCookie('cart', JSON.stringify(cartCookie));
  }

  // Shipping
  const [shippingPrice, setShippingPrice] = useState(0);
  const [shippingAddress, setShippingAddress] = useState<Address>();
  const handleChangeAddress = () => {
    //router.push(`/${data.tenant.slug}/myaddresses`);
    setShippingAddress({
      id: 1,
      cep: '999999-99',
      street: 'Rua das Flores',
      number: '321',
      neighborhood: 'Jardins',
      city: 'São Paulo',
      state: 'SP'
    });
    setShippingPrice(9.50);
  }
  
  // Resume 
  const [subtotal, setSubtotal] = useState(0);
  useEffect(()=>{
    let sub = 0;
    for(let i in cart){
      sub += cart[i].product.price * cart[i].qt;
    }
    setSubtotal(sub);
  }, [cart]);
  const handleFinish = () => {
    //router.push(`/${data.tenant.slug}/checkout`);
  }

  return (
    <div className={styles.container}>
      <Head>
          <title>Checkout | {data.tenant.name}</title>
      </Head>
      <Header 
        backHref={`/${data.tenant.slug}`} 
        color={data.tenant.mainColor}
        title="Checkout" 
      />

      <div className={styles.infoGroup}>
        <div className={styles.infoArea}>
          <div className={styles.infoTitle}>Endereço</div>
          <div className={styles.infoBody}>
            <ButtonWithIcon 
              color={data.tenant.mainColor}
              leftIcon={"location"}
              rightIcon={"rightArrow"}
              value={shippingAddress ? `${shippingAddress.street}, ${shippingAddress.number}
               - ${shippingAddress.city}` : 'Escolha um endereço'}
              onClick={handleChangeAddress}
            />
          </div>
        </div>
        <div className={styles.infoArea}>
          <div className={styles.infoTitle}>Tipo de Pagamento</div>
          <div className={styles.infoBody}>
            <div className={styles.paymentTypes}>
              <div className={styles.paymentBtn}>
                <ButtonWithIcon
                  color={data.tenant.mainColor}
                  leftIcon='money'
                  value="Dinheiro"
                  onClick={() => {}}
                  fill
                />
              </div>
              <div className={styles.paymentBtn}>
                <ButtonWithIcon
                  color={data.tenant.mainColor}
                  leftIcon='card'
                  value="Cartão"
                  onClick={() => {}}
                />
              </div>
            </div>
          </div>
        </div>
        <div className={styles.infoArea}>
          <div className={styles.infoTitle}>Troco</div>
          <div className={styles.infoBody}>
            <InputField
              color={data.tenant.mainColor}
              placeholder="Quanto você tem em dinheiro?"
              value={""}
              onChange={newValue => { }}
            />
          </div>
        </div>
        <div className={styles.infoArea}>
          <div className={styles.infoTitle}>Cupom de desconto</div>
          <div className={styles.infoBody}>
            <ButtonWithIcon
              color={data.tenant.mainColor}
              leftIcon="cupom"
              rightIcon="checked"
              value="TESTE 123"
            />
          </div>
        </div>
      </div>

      <div className={styles.productsQuantity}>{cart.length} {cart.length === 1 ? 'item' : 'itens'}</div>

      <div className={styles.productsList}>
        {cart.map((cartItem, index)=>(
          <CartProductItem 
            key={index}
            color={data.tenant.mainColor}
            quantity={cartItem.qt}
            product={cartItem.product}
            onChange={handleCartChange}
            noEdit
          />
        ))}
      </div>

      <div className={styles.resumeArea}>
        <div className={styles.resumeItem}>
          <div className={styles.resumeLeft}>Subtotal</div>
          <div className={styles.resumeRight}><strong>{formatter.formatPrice(subtotal)}</strong></div>
        </div>
      
        <div className={styles.resumeItem}>
          <div className={styles.resumeLeft}>Frete</div>
          <div className={styles.resumeRight}>{shippingPrice > 0 ? formatter.formatPrice(shippingPrice) : '--'}</div>
        </div>

        <div className={styles.resumeLine}></div>

        <div className={styles.resumeItem}>
          <div className={styles.resumeLeft}>Total</div>
          <div className={styles.resumeRightBig} style={{ color: data.tenant.mainColor}}>{formatter.formatPrice(shippingPrice + subtotal)}</div>          
        </div>
      </div>

      <div className={styles.resumeButton}>
        <Button
          color={data.tenant.mainColor}
          label="Finalizar Pedido"
          onClick={handleFinish}
          fill
          disabled={!shippingAddress}
        />
      </div>        
      
    </div>
  );
}

export default Checkout;

// Validação do slug
type Props = {
  tenant: Tenant;
  token: string;
  user: User | null;
  cart: CartItem[];
}
export const getServerSideProps: GetServerSideProps = async (context) => {
  const { tenant: tenantSlug } = context.query;
  //console.log('TENANT: ', tenantSlug);
  const api = useApi();

  // Get Tenant (identificando o tenant)
  const tenant = await api.getTenant(tenantSlug as string);
  if(!tenant) {
    return { redirect: { destination: '/', permanent: false } }   
  }

  // Get Logged User
  //const token = context.req.cookies.token;
  const token = getCookie('token', context);
  const user = await api.authorizeToken(token as string);

  // Get Cart Products
  const cartCookie = getCookie('cart', context);
  //console.log("CART", cartCookie);
  const cart = await api.getCartProducts(cartCookie as string);
  return {
    props: {
      tenant,
      token,
      user,
      cart
    }
  }
}