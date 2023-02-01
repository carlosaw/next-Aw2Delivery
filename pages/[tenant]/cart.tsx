import { getCookie } from 'cookies-next';
import { GetServerSideProps } from 'next';
import { useEffect, useState } from 'react';
import { useAppContext } from '../../contexts/app';
import { useAuthContext } from '../../contexts/auth';
import { useApi } from '../../libs/useApi';
import styles from '../../styles/Cart.module.css';
import { Product } from '../../types/Product';
import { Tenant } from '../../types/Tenant';
import { User } from '../../types/User';
import Head from 'next/head';
import { Header } from '../../components/Header';

const Cart = (data: Props) => {
  const { setToken, setUser } = useAuthContext();
  const { tenant, setTenant } = useAppContext();

  useEffect(()=>{
    setTenant(data.tenant);
    setToken(data.token);
    if(data.user) setUser(data.user);
  }, []);

  return (
    <div className={styles.container}>
      <Head>
          <title>Sacola | {data.tenant.name}</title>
      </Head>
      <Header 
        backHref={`/${data.tenant.slug}`} 
        color={data.tenant.mainColor}
        title="Sacola" 
      />

      <div className={styles.productsQuantity}>x items</div>

      <div className={styles.productsList}>
        ...
      </div>

      
        
    </div>
  );
}

export default Cart;

// Validação do slug
type Props = {
  tenant: Tenant;
  products: Product[];
  token: string;
  user: User | null;
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

  // Get Products
  const products = await api.getAllProducts();

  return {
    props: {
      tenant,
      products,
      token,
      user
    }
  }
}