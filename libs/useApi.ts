export type getTenantResponse = {
  name: string;
  mainColor: string;
  secondColor: string;
}

export const useApi = () => ({

  getTenant: (tenantSlug: string): boolean | getTenantResponse => {
    switch(tenantSlug) {
      case 'aw2burger':
        return {
          name: "Aw2Burger",
          mainColor: "#FF0000",
          secondColor: "#00FF00"
        }
      break;
      case 'aw2pizza':
        return {
          name: "Aw2Pizza",
          mainColor: "#0000FF",
          secondColor: "#FF0000"
        }
      break;
      default: return false;
    }
    
  }

});