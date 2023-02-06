import { getCookie, setCookie } from 'cookies-next';
import { GetServerSideProps } from 'next';
import { useEffect, useState } from 'react';
import { useAppContext } from '../../../contexts/app';
import { useAuthContext } from '../../../contexts/auth';
import { useApi } from '../../../libs/useApi';
import styles from '../../../styles/NewAddress.module.css';
import { Product } from '../../../types/Product';
import { Tenant } from '../../../types/Tenant';
import { User } from '../../../types/User';
import Head from 'next/head';
import { Header } from '../../../components/Header';
import { InputField } from '../../../components/InputField';
import { Button } from '../../../components/Button';
import { useFormatter } from '../../../libs/useFormatter';
import { CartItem } from '../../../types/CartItem';
import { useRouter } from 'next/router';
import { CartProductItem } from '../../../components/CartProductItem';
import { CartCookie } from '../../../types/CartCookie';
import { ButtonWithIcon } from '../../../components/ButtonWithIcon';
import { Address } from '../../../types/Address';
import { AddressItem } from '../../../components/AddressItem';

const NewAddress = (data: Props) => {
  const { setToken, setUser } = useAuthContext();
  const { tenant, setTenant, setShippingAddress, setShippingPrice } = useAppContext();

  useEffect(()=>{
    setTenant(data.tenant);
    setToken(data.token);
    if(data.user) setUser(data.user);
  }, []);

  const formatter = useFormatter();
  const router = useRouter();
  const api = useApi();

  const [addressCep, setAddressCep] = useState<string>('');
  const [addressStreet, setAddressStreet] = useState<string>('');
  const [addressNumber, setAddressNumber] = useState<string>('');
  const [addressNeighborhood, setAddressNeighborhood] = useState<string>('');
  const [addressCity, setAddressCity] = useState<string>('');
  const [addressState, setAddressState] = useState<string>('');
  const [addressComplement, setAddressComplement] = useState<string>('');


  const handleNewAddress = () => {
    router.push(`/${data.tenant.slug}/address/new`);
  }

  return (
    <div className={styles.container}>
      <Head>
        <title>Novo Endereço | {data.tenant.name}</title>
      </Head>
      <Header 
        backHref={`/${data.tenant.slug}/checkout`} 
        color={data.tenant.mainColor}
        title="Novo Endereço" 
      />

      <div className={styles.inputs}>
        <div className={styles.row}>
          <div className={styles.column}>
            <div className={styles.label}>CEP</div>
              <InputField
                color={data.tenant.mainColor}
                placeholder="Digite seu Cep"
                value={addressCep}
                onChange={value => setAddressCep(value)}
              />
          </div>
        </div>

        <div className={styles.row}>
          <div className={styles.column}>
            <div className={styles.label}>Rua</div>
              <InputField
                color={data.tenant.mainColor}
                placeholder="Digite uma Rua"
                value={addressStreet}
                onChange={value => setAddressStreet(value)}
              />
          </div>
          <div className={styles.column}>
            <div className={styles.label}>Número</div>
              <InputField
                color={data.tenant.mainColor}
                placeholder="Digite um Número"
                value={addressNumber}
                onChange={value => setAddressNumber(value)}
              />
          </div>
        </div>

        <div className={styles.row}>
          <div className={styles.column}>
            <div className={styles.label}>Bairro</div>
              <InputField
                color={data.tenant.mainColor}
                placeholder="Digite seu Bairro"
                value={addressNeighborhood}
                onChange={value => setAddressNeighborhood(value)}
              />
          </div>
        </div>

        <div className={styles.row}>
          <div className={styles.column}>
            <div className={styles.label}>Cidade</div>
              <InputField
                color={data.tenant.mainColor}
                placeholder="Digite sua Cidade"
                value={addressCity}
                onChange={value => setAddressCity(value)}
              />
          </div>
        </div>

        <div className={styles.row}>
          <div className={styles.column}>
            <div className={styles.label}>Estadoe</div>
              <InputField
                color={data.tenant.mainColor}
                placeholder="Digite seu Estado"
                value={addressState}
                onChange={value => setAddressState(value)}
              />
          </div>
        </div>

        <div className={styles.row}>
          <div className={styles.column}>
            <div className={styles.label}>Complemento</div>
              <InputField
                color={data.tenant.mainColor}
                placeholder="Digite o complemento"
                value={addressComplement}
                onChange={value => setAddressComplement(value)}
              />
          </div>
        </div>
      </div>

      <div className={styles.btnArea}>
        <Button
          color={data.tenant.mainColor}
          label="Adicionar"
          onClick={handleNewAddress}
          fill
        />
      </div>
      
    </div>
  );
}

export default NewAddress;

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