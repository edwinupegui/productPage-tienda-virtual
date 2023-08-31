/* eslint-disable react-hooks/exhaustive-deps */
"use client";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import ProductImage from "@/components/molecules/ProductImage";
import ElasticsearchClient from "@/services/Elasticsearch/Client";
import { ProductBySlug } from "@/types/Elasticsearch/Index/products.type";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import ProductInformation from "@/components/organisms/ProductInformation";
import { useProductElasticContext } from "@/contexts/productElasticContext";
import useSWR from "swr";
import Image from "next/image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCartShopping } from "@fortawesome/pro-regular-svg-icons";
import { faWhatsapp } from "@fortawesome/free-brands-svg-icons";
import useSideCart from "@/hooks/useSideCart.hook";
import { ElasticLogIndex } from "@/types/Elasticsearch/Index/checkoutlog.types";
import HomeProductsSlider from "@/components/organisms/HomeProductsSlider";
const Product = () => {
  const { open, addNew } = useSideCart();
  const pathname = usePathname();
  const { product, setProduct } = useProductElasticContext();
  const [productStore, setProductStore] = useState<any[]>();

  const getProduct = async () => {
    const { hits } = await ElasticsearchClient.searchTemplate<ProductBySlug>(
      "products",
      {
        body: {
          id: "productBySlug",
          params: {
            keyword: pathname.split("/")[2] || "",
          },
        },
      }
    );
    if (!hits || hits.hits.length === 0) {
      return {
        notFound: true,
      };
    }
    getProductStore(hits.hits[0]?._source.sellerInfo.name);
    setProduct(hits.hits[0]?._source);
  };

  const getProductStore = async (store: string) => {
    const { hits } = await ElasticsearchClient.search<ElasticLogIndex>(
      "products",
      {
        body: {
          query: {
            terms: {
              "store.keyword": [store],
            },
          },
          from: 0,
          size: 10,
        },
      }
    );
    let arrayStore = [];
    for (let index = 0; index < 10; index++) {
      arrayStore.push(hits.hits[0]);
    }
    setProductStore(arrayStore);
  };

  useEffect(() => {
    getProduct();
  }, [pathname]);

  if (!product) {
    return (
      <main>
        <div className="space-y-4 py-2">
          <div className="space-y-4 py-2">
            <div className="card">
              <div className="grid grid-cols-1 md:grid-cols-5">
                <div className="col-span-3">
                  <div className="aspect-video animate-pulse rounded-md bg-slate-300"></div>
                </div>
                <div className="col-span-2 space-y-8 p-4">
                  <div className="h-[20px] w-full animate-pulse rounded-full bg-slate-300"></div>
                  <div className="space-y-2">
                    <div className="h-[20px] w-1/2 animate-pulse rounded-full bg-slate-300"></div>
                  </div>

                  <div className="flex flex-col gap-2 justify-center items-center">
                    <div className="h-[40px] w-2/3 animate-pulse rounded-full bg-slate-300"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-5 md:gap-4">
            <div className="col-span-3">
              <div className="card space-y-6">
                <div className="flex gap-5">
                  <div className="flex aspect-square w-14 items-center rounded-lg border">
                    <div className="h-full w-full animate-pulse rounded-lg bg-slate-300"></div>
                  </div>
                  <div className="flex aspect-square w-14 items-center rounded-lg border">
                    <div className="h-full w-full animate-pulse rounded-lg bg-slate-300"></div>
                  </div>
                  <div className="flex aspect-square w-14 items-center rounded-lg border">
                    <div className="h-full w-full animate-pulse rounded-lg bg-slate-300"></div>
                  </div>
                  <div className="flex aspect-square w-14 items-center rounded-lg border">
                    <div className="h-full w-full animate-pulse rounded-lg bg-slate-300"></div>
                  </div>
                  <div className="flex aspect-square w-14 items-center rounded-lg border">
                    <div className="h-full w-full animate-pulse rounded-lg bg-slate-300"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main >
      <header className="bg-info w-full h-[90px] flex justify-between py-2 px-10 items-center fixed z-10 top-0">
        <div className="flex gap-4 items-center">
          <div>
            <Image
              width={100}
              height={100}
              src={product.sellerInfo.imageUrl}
              className="rounded-full h-14 w-14"
              alt={product.sellerInfo.name}
            />
          </div>
          <div className="flex flex-col gap-1">
            <p className="text-lg font-bold text-white">
              {product.sellerInfo.name}
            </p>
            <p className="text-base font-medium text-white">
              {product.sellerInfo.city}
            </p>
          </div>
        </div>
        <div className="flex gap-10 ">
          <div className="border-r border-white pr-10">
            <p className="text-white text-base">¿Tienes dudas? Escríbenos</p>
            <div className="text-white text-xl font-bold flex gap-2 items-center">
              <FontAwesomeIcon icon={faWhatsapp} size="1x" />
              <p>300 123 4567</p>
            </div>
          </div>
          <div
            onClick={() => {
              addNew();
              open();
            }}
            className="bg-white text-info transition-all w-32 h-10 rounded-full flex justify-center items-center gap-2 cursor-pointer hover:bg-tamagotchi hover:text-white"
          >
            <FontAwesomeIcon icon={faCartShopping} size="1x" />
            <p className="font-semibold">Carrito</p>
          </div>
        </div>
      </header>
      <div className="md:px-[350px]">
        <section className="grid card shadow-card grid-cols-1 md:grid-cols-5 mx-auto md:container mt-[110px]">
          <section className="md:col-span-3">
            <ProductImage images={product.images} productName={product.name} />
          </section>
          <section className="md:col-span-2">
            <div className="h-2/3">
              <ProductInformation {...product} />
            </div>
            <div></div>
          </section>
        </section>
        <section className="mx-auto md:container my-[30px]">
          <HomeProductsSlider
            products={productStore}
            title="Más productos para ti"
          />
        </section>
      </div>
    </main>
  );
};

export default Product;
