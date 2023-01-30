import { getCookie } from 'cookies-next';
import { GetServerSideProps } from 'next';
import { useEffect, useState } from 'react';
import { Banner } from '../../components/Banner';
import ProductItem from '../../components/ProductItem';
import SearchInput from '../../components/SearchInput';
import { Sidebar } from '../../components/Sidebar';
import { useAppContext } from '../../contexts/app';
import { useAuthContext } from '../../contexts/auth';
//import { useAuthContext } from '../../contexts/auth';
import { useApi } from '../../libs/useApi';
import styles from '../../styles/Home.module.css';
import { Product } from '../../types/Product';
import { Tenant } from '../../types/Tenant';
import { User } from '../../types/User';

const Home = (data: Props) => {
  const { setToken, setUser } = useAuthContext();
  const { tenant, setTenant } = useAppContext();

  useEffect(()=>{
    setTenant(data.tenant);
    setToken(data.token);
    if(data.user) setUser(data.user);
  }, []);

  const [products, setProducts] = useState<Product[]>(data.products);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const handleSearch = (searchValue: string) => {
    console.log(`Você está buscando por: ${searchValue}`);
  }

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <div className={styles.headerTop}>
          <div className={styles.headerTopLeft}>
            <div className={styles.headerTitle}>Seja Bem-Vindo(a) 👋</div>
            <div className={styles.headerSubtitle}>O que deseja para hoje?</div>
          </div>
          <div className={styles.headerTopRight}>
            <div className={styles.menuButton}
              onClick={() => setSidebarOpen(true)}
            >
              <div className={styles.menuButtonLine}
                style={{backgroundColor: tenant?.mainColor}}>
              </div>
              <div className={styles.menuButtonLine}
                style={{backgroundColor: tenant?.mainColor}}>
              </div>
              <div className={styles.menuButtonLine}
                style={{backgroundColor: tenant?.mainColor}}>
              </div>
            </div>
            <Sidebar 
              tenant={data.tenant}
              open={sidebarOpen}
              onClose={()=> setSidebarOpen(false)}
            />
          </div>
        </div>
        <div
          className={styles.headerBotton}>
          <SearchInput onSearch={handleSearch} />         
        </div>
      </header>

      <Banner />

      <div className={styles.grid}>
        {products.map((item, index) => (
          <ProductItem
            key={index}
            data={item}
          />
        ))}        
      </div>

    </div>
  );
}

export default Home;

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