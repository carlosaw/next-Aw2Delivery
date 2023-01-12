import { Tenant } from "../types/Tenant";

export type getTenantResponse = {
  name: string;
  mainColor: string;
  secondColor: string;
}

export const useApi = () => ({

  getTenant: (tenantSlug: string): boolean | Tenant => {
    switch(tenantSlug) {
      case 'aw2burger':
        return {
          slug: 'aw2burger',
          name: "Aw2Burger",
          mainColor: "#FF0000",
          secondColor: "#00FF00"
        }
      break;
      case 'aw2pizza':
        return {
          slug: 'aw2pizza',
          name: "Aw2Pizza",
          mainColor: "#0000FF",
          secondColor: "#FF0000"
        }
      break;
      default: return false;
    }
    
  }

});