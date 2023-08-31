import { Source } from "@/types/Elasticsearch/Index/products.type";
import { Dispatch, ReactNode, SetStateAction, createContext, useContext, useState } from "react";

export interface IProductElasticContext {
  setProduct: Dispatch<SetStateAction<undefined>>
  product: Source;
  setQuantity: Dispatch<SetStateAction<number>>
  quantity: number;
}

const ProductElasticContext = createContext<IProductElasticContext>({
  setProduct: () => {
    return;
  },
  product: {
    objectID: "",
    databaseId: "",
    id: "",
    name: "",
    price: "",
    minPrice: 0,
    maxPrice: 0,
    assumedValue: 0,
    applyWarranty: true,
    priceFilter: 0,
    regularPrice: "",
    slug: "",
    slugBase: "",
    status: "",
    totalSales: 0,
    stock: 0,
    stockStatus: "",
    type: "simple",
    weight: 0,
    width: 0,
    height: 0,
    length: 0,
    image: "",
    checkTransport: false,
    images: [
      {
        src: "",
        name: "",
        alt: "",
      },
    ],
    store: "",
    sellerInfo: {
      sellerId: 0,
      name: "",
      slug: "",
      city: "",
      imageUrl: "",
      rate: 0,
    },
    storeId: 83,
    sku: "",
    description: "",
    modification: "",
    creation: "",
    promotions: [],
    categories: [
      {
        id: 0,
        name: "",
        slug: "",
      },
    ],
    warehouseId: 0,
    isUpdate: false,
    visible: true,
    totalOff: 0,
    isIvaDiscount: false,
    isUsed: false,
    locations: [
      {
        lat: 0,
        lon: 0,
      },
    ],
    warehouses: [
      {
        city: "",
        name: "",
      },
    ],
    brands: [],
    atributes: [],
    warranty: {
      unit: '',
      value: 0,
      warrantyInDays: 0,
    }
  },
  setQuantity: () => {
    return;
  },
  quantity: 0,
});

export default function ProductElasticProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [product, setProduct] = useState<any>()
  const [quantity, setQuantity] = useState<number>(1)

  return (
    <ProductElasticContext.Provider
      value={{
        setProduct,
        product,
        setQuantity,
        quantity
      }}
    >
      {children}
    </ProductElasticContext.Provider>
  );
}

export function useProductElasticContext() {
  return useContext(ProductElasticContext);
}