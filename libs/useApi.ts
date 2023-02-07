import { Address } from "../types/Address";
import { CartItem } from "../types/CartItem";
import { Product } from "../types/Product";
import { Tenant } from "../types/Tenant";
import { User } from "../types/User";

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

export const useApi = () => ({

  getTenant: async (tenantSlug?: string) => {
    switch(tenantSlug) {
      case 'aw2burger':
        return {
          slug: 'aw2burger',
          name: "Aw2🍔Burger",
          mainColor: "#FB9400",
          secondColor: "#FFF9F2"
        }
      break;
      case 'aw2pizza':
        return {
          slug: 'aw2pizza',
          name: "Aw2🍕Pizza",
          mainColor: "#6AB70A",
          secondColor: "#E0E0E0"
        }
      break;
      default: return false;
    }    
  },

  getAllProducts: async () => {
    let products = [];
      for (let q = 0; q < 10; q++) {
        products.push({
          ...TEMPORARYoneProduct,
          id: q + 1
        });
      }
    return products;
  },

  getProduct: async (id: number) => {
    return { ...TEMPORARYoneProduct, id};
  },

  authorizeToken: async ( token: string): Promise<User | false> => {
    if(!token) return false;

    return {
      name: 'Alberto',
      email: 'alberto@gmail.com'
    }
  },
  
  getCartProducts: async (cartCookie: string) => {
    let cart: CartItem[] = [];
    if(!cartCookie) return cart;

    const cartJson = JSON.parse(cartCookie);
    for(let i in cartJson) {
      if(cartJson[i].id && cartJson[i].qt) {
        const product = {
          ...TEMPORARYoneProduct,
          id: cartJson[i].id
        };
        cart.push({
          qt: cartJson[i].qt,
          product
        });
      }
    }

    return cart;
  }, 
  
  getUserAddresses: async (email: string) => {
    const addresses: Address[] = [];

    for(let i = 0; i < 8; i++) {
      addresses.push({
        id: i + 1,
        street: 'Rua das Flores',
        number: `${i + 1}00`,
        cep: '999999999',
        city: 'São Paulo',
        neighborhood: 'Jardins',
        state: 'SP'
      });
    }

    return addresses;
  },

  addUserAddress: async ( address: Address) => {
    //console.log(address);
    return { ...address, id: 9};
  },

  getShippingPrice: async (address: Address) => {
    return 9.16;
  }

});