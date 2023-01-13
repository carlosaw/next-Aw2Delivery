import { Product } from "../types/Product";
import { Tenant } from "../types/Tenant";

export type getTenantResponse = {
  name: string;
  mainColor: string;
  secondColor: string;
}

const TEMPORARYoneProduct: Product = {
  id: 1,
  image: '/tmp/burger.png',
  categoryName: 'Tradicional',
  name: 'Texas Burger',
  price: 25.50,
  description: '2 Blends de carne de 150g, Queijo Cheddar, Bacon Caramelizado, Salada, Molho da casa, Pão brioche artesanal, '
  
  
}

export const useApi = (tenantSlug: string) => ({

  getTenant: async () => {
    switch(tenantSlug) {
      case 'aw2burger':
        return {
          slug: 'aw2burger',
          name: "Aw2🍔Burger",
          mainColor: "#FF0000",
          secondColor: "#00FF00"
        }
      break;
      case 'aw2pizza':
        return {
          slug: 'aw2pizza',
          name: "Aw2🍕Pizza",
          mainColor: "#0000FF",
          secondColor: "#FF0000"
        }
      break;
      default: return false;
    }    
  },

  getAllProducts: async () => {
    let products = [];
      for (let q = 0; q < 10; q++) {
        products.push(TEMPORARYoneProduct);
      }
    return products;
  },

  getProducts: async (id: string) => {
    return TEMPORARYoneProduct;
  }

});