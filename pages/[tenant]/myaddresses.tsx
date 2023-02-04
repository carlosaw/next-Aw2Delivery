import { getCookie, setCookie } from 'cookies-next';
import { GetServerSideProps } from 'next';
import { useEffect, useState } from 'react';
import { useAppContext } from '../../contexts/app';
import { useAuthContext } from '../../contexts/auth';
import { useApi } from '../../libs/useApi';
import styles from '../../styles/MyAddresses.module.css';
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
import { AddressItem } from '../../components/AddressItem';

const MyAddresses = (data: Props) => {
  const { setToken, setUser } = useAuthContext();
  const { tenant, setTenant } = useAppContext();

  useEffect(()=>{
    setTenant(data.tenant);
    setToken(data.token);
    if(data.user) setUser(data.user);
  }, []);

  const formatter = useFormatter();
  const router = useRouter();

  const handleNewAddress = () => {
    router.push(`/${data.tenant.slug}/address`);
  }

  const handleAddressSelect = (address: Address) => {
    console.log(`Selecionou o endereço: ${address.street}, ${address.number}`)
  }
  const handleAddressEdit = (id: number) => {
    
  }
  const handleAddressDelete = (id: number) => {
    
  }

  return (
    <div className={styles.container}>
      <Head>
        <title>Meus Endereços | {data.tenant.name}</title>
      </Head>
      <Header 
        backHref={`/${data.tenant.slug}/checkout`} 
        color={data.tenant.mainColor}
        title="Meus Endereços" 
      />

      <div className={styles.list}>
        {data.addresses.map((item, index) => (
          <AddressItem
            key={index}
            color={data.tenant.mainColor}
            address={item}
            onSelect={handleAddressSelect}
            onEdit={handleAddressEdit}
            onDelete={handleAddressDelete}
          />
        ))}
      </div>

      <div className={styles.btnArea}>
        <Button
          color={data.tenant.mainColor}
          label="Novo Endereço"
          onClick={handleNewAddress}
          fill
        />
      </div>
      
    </div>
  );
}

export default MyAddresses;

// Validação do slug
type Props = {
  tenant: Tenant;
  token: string;
  user: User | null;
  addresses: Address[];
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
  if(!user) {
    return { redirect: { destination: '/login', permanent: false } }
  }

  // Get Addresses from Logged User
  const addresses = await api.getUserAddresses(user.email);

  return {
    props: {
      tenant,
      token,
      user,
      addresses
    }
  }
}