import { createContext, ReactNode, useContext, useState } from 'react';
import { Tenant } from '../types/Tenant';

// Cria o type do contexto
type appContextType = {
  tenant: Tenant | null;
  setTenant: (newTenant: Tenant) => void;
}
// Cria os valores padrões
const defaultValues: appContextType = {
  tenant: null,
  setTenant: () => null
}

// Cria o contexto (usa o appContextType e os valores 'defaultValues')
const appContext = createContext<appContextType>(defaultValues);
export const useAppContext = () => useContext(appContext);

// Cria o provider para usar em algum lugar
type Props = {
  children: ReactNode;
}
const AppContextProvider = ({ children }: Props) => {
  const [tenant, setTenant] = useState<Tenant | null>(null);

  return (
    <appContext.Provider value={{ tenant, setTenant }}>
      {children}
    </appContext.Provider>
  )
}

export default AppContextProvider;