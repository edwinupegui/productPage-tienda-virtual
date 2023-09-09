/* eslint-disable no-console */
import { useEffect, useState } from "react";
import axios, { AxiosError, AxiosResponse } from "axios";

import UseApiToken from "./useApiToken.hook";
import {
  Data,
  IBodyProduct,
  ICartResponse,
  Product,
} from "@/types/Cart/CartResponse";

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
    'Api-Token': newApiToken,
    'api-key': `${process.env.NEXT_PUBLIC_CART_API_KEY}`,
  };
  fetchCart.defaults.headers = headers;
};

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

export default function useCart(): IUseCart {
  const [cartUniqueId, setcartUniqueId] = useState(null as string | null);
  const [data, setData] = useState<ICartResponse>();
  const [error, setError] = useState<AxiosError<ICartResponse>>();
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    if (!window) return;
    const cartId = localStorage.getItem("cuid");
    if (cartId) {
      setcartUniqueId(cartId);
    }
    generateAndSetToken()
  }, []);

  const getCart = async (cartId: string) => {
    let retries = 3;
    while (retries > 0) {
      try {
        setLoading(true)
        generateAndSetToken();
        const response = await fetchCart.get<ICartResponse>(
          `/${cartId === null ? cartUniqueId : cartId}`
        );
        setData(response.data);
        setLoading(false)
        return response;
      } catch (error) {
        const axiosError = error as AxiosError<ICartResponse>;
        setError(axiosError)
        if (axiosError.response && axiosError.response.status === 401) {
          await new Promise((resolve) => setTimeout(resolve, 1000));
          retries--;
        } else {
          break;
        }
      }
    }
  };

  const revalidateCart = async () => {
    const cartUniqueId = localStorage.getItem("cuid");
    if (!cartUniqueId || cartUniqueId === "")
      throw new Error("No pudimos obtener la información de tu orden.");
   const response = await getCart(cartUniqueId);
   if (response) setData(response.data)
   console.log(response)
  };

  const updateCart = async (newProduct: IBodyProduct, action = "add") => {
    let retries = 3;
    while (retries > 0) {
      try {
        setLoading(true)
        generateAndSetToken();
        revalidateCart()
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
        setLoading(false)
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
    data: data && data.data,
    items: data?.data.cartAttributes.products || [],
    getCart,
    updateCart,
    error: error as AxiosError<ICartResponse>,
    loading: loading,
    // cartErrors: data && data.data.errors,
  };
}

export { fetchCart };
