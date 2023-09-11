import { useEffect, useState } from "react";
import axios, { AxiosError, AxiosResponse } from "axios";

import UseApiToken from "./useApiToken.hook";
import {
  Data,
  Error,
  IBodyProduct,
  ICartResponse,
  Product,
} from "@/types/Cart/CartResponse";
import { toast } from "react-toastify";
import useSWR from "swr";

const { generateToken, apiToken } = UseApiToken();

const fetchCart = axios.create({
  baseURL: process.env.NEXT_PUBLIC_CART_SERVICE,
  headers: {
    "api-key": `${process.env.NEXT_PUBLIC_CART_API_KEY}`,
    "Api-Token": apiToken,
  },
});

const generateAndSetToken = () => {
  const newApiToken = generateToken();
  const headers = {
    ...fetchCart.defaults.headers,
    "Api-Token": newApiToken,
    "api-key": `${process.env.NEXT_PUBLIC_CART_API_KEY}`,
  };
  fetchCart.defaults.headers = headers;
};

const errorsCodes: Record<string, string> = {
  "9": "Producto sin Stock",
  "10": "El carrito no existe.",
  "11": "El carrito no se pudo actualizar.",
  "12": "Producto sin Stock",
  "13": "Sin unidades disponibles.",
  "14": "Este producto estÃ¡ inactivo.",
  "15": "Solo puedes agregar (1) unidad del servicio o producto virtual al carrito.",
  "16": "Excediste la cantidad mÃ¡xima por carrito.",
  "17": "La cantidad a eliminar es mayor que la existente en el carrito.",
  "18": "No puedes agregar mÃ¡s %s unidad(es) de este producto al carrito.",
};

const errorCodes = (error: Error, responseMessage?: string) => {
  let message = errorsCodes[error.code];
  if (error.code === "18" && responseMessage) {
    const maxQuantity = responseMessage.match(/[0-9]/) || ["de"];
    message = message.replace(/%s/, `de ${maxQuantity[0]}`);
  }
  return {
    ...error,
    message,
  };
};

fetchCart.interceptors.response.use(
  (response: AxiosResponse<ICartResponse>) => {
    if (response.data.errors.length > 0) {
      response.data.errors = response.data.errors.map((error) => {
        return errorCodes(error, error.message);
      });
    }
    return response;
  },
  (err: AxiosError<ICartResponse>) => {
    if (!err.response) throw err;
    if (err.response.data.errors.length === 0) return Promise.reject(err);
    err.response.data.errors = err.response.data.errors.map((error) => {
      if (err.response?.status === 404) {
        toast.error("producto sin existencia");
      }
      return errorCodes(error, err.response?.data.message);
    });
    return Promise.reject(err);
  }
);

export interface IUseCart {
  data: Data | undefined;
  items: Product[];
  getCart: (
    cartUniqueId: string
  ) => Promise<AxiosResponse<ICartResponse> | undefined>;
  updateCart: (
    product: IBodyProduct,
    action?: string
  ) => Promise<AxiosResponse<ICartResponse> | undefined>;
  error: AxiosError<ICartResponse>;
  loading: boolean;
  cartErrors?: Error[];
}

const fetcher = (url: string) => fetchCart.get<ICartResponse>(url);

export default function useCart(): IUseCart {
  const [cartUniqueId, setcartUniqueId] = useState(null as string | null);
  const { data, error, mutate, isValidating } = useSWR(
    cartUniqueId && `/${cartUniqueId}`,
    fetcher,
    {
      revalidateOnFocus: false,
    }
  );

  useEffect(() => {
    if (!window) return;
    const cartId = localStorage.getItem("cuid");
    if (cartId) {
      setcartUniqueId(cartId);
    }
    generateAndSetToken();
  }, []);

  const getCart = async (cartId: string) => {
    let retries = 3;
    while (retries > 0) {
      try {
        generateAndSetToken();
        const response = await fetchCart.get<ICartResponse>(
          `/${cartId === null ? cartUniqueId : cartId}`
        );
        mutate(response, { revalidate: false });
        return response;
      } catch (error) {
        const axiosError = error as AxiosError<ICartResponse>;
        if (axiosError.response && axiosError.response.status === 401) {
          await new Promise((resolve) => setTimeout(resolve, 1000));
          retries--;
        } else {
          break;
        }
      }
    }
  };

  const updateCart = async (newProduct: IBodyProduct, action = "add") => {
    let retries = 3;
    while (retries > 0) {
      try {
        generateAndSetToken();
        const cuid = localStorage.getItem("cuid");
        const cart = await fetchCart.post<ICartResponse>("/", {
          ...newProduct,
          ...{
            cart: {
              cartUniqueId: cuid ?? "",
              lastUserStep: `${window.location}`,
              notes: action,
            },
            product: newProduct.product,
          },
        } as IBodyProduct);

        if (!cuid) {
          localStorage.setItem(
            "cuid",
            cart ? String(cart.data.data.cartUniqueId) : ""
          );
        }
        mutate(cart, { revalidate: false });
        return cart;
      } catch (error) {
        const axiosError = error as AxiosError<ICartResponse>;
        if (axiosError?.response?.status === 404) {
          return;
        }
        if (axiosError.response && axiosError.response.status === 401) {
          await new Promise((resolve) => setTimeout(resolve, 1000));
          retries--;
        } else {
          break;
        }
      }
    }
  };

  return {
    data: data && data.data.data,
    items: data?.data.data.cartAttributes.products || [],
    getCart,
    updateCart,
    error: error as AxiosError<ICartResponse>,
    loading: isValidating,
    cartErrors: data && data.data.errors,
  };
}

export { fetchCart };
