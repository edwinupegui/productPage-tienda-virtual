/* eslint-disable react-hooks/exhaustive-deps */
"use client";
import 'swiper/css'
import 'swiper/css/pagination'
import 'swiper/css/navigation'
import ProductImage from "@/components/molecules/ProductImage";
import ElasticsearchClient from "@/services/Elasticsearch/Client";
import { ProductBySlug, Source } from "@/types/Elasticsearch/Index/products.type";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import ProductInformation from '@/components/organisms/ProductInformation';

const Product = () => {
  const pathname = usePathname();
  const [product, setProduct] = useState<Source>();

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

    console.log(hits.hits[0]?._source)

    setProduct(hits.hits[0]?._source);
  };

  useEffect(() => {
    getProduct();
  }, [pathname]);

  console.log(product)

  if (!product) {
    return (
      <main className="p-10">
        <div className="space-y-4 py-2">
          <div className="space-y-4 py-2">
            <div className="h-[20px] w-1/4 animate-pulse rounded-full bg-slate-300"></div>
            <div className="card">
              <div className="grid grid-cols-1 md:grid-cols-5">
                <div className="col-span-3">
                  <div className="aspect-video animate-pulse rounded-md bg-slate-300"></div>
                </div>
                <div className="col-span-2 space-y-8 p-4">
                  <div className="h-[20px] w-full animate-pulse rounded-full bg-slate-300"></div>
                  <div className="space-y-2">
                    <div className="h-[20px] w-1/2 animate-pulse rounded-full bg-slate-300"></div>
                    <div className="h-[10px] w-full animate-pulse rounded-full bg-slate-300"></div>
                    <div className="h-[10px] w-full animate-pulse rounded-full bg-slate-300"></div>
                  </div>
                  <div className="h-[20px] w-1/2 animate-pulse rounded-full bg-slate-300"></div>
                  <div className="flex gap-2 items-center">
                    <div className="h-[20px] w-[20px] animate-pulse rounded-full bg-slate-300"></div>
                    <div className="h-[40px] w-[60px] animate-pulse rounded-lg bg-slate-300"></div>
                    <div className="h-[20px] w-[20px] animate-pulse rounded-full bg-slate-300"></div>
                  </div>
                  <div className="flex flex-col gap-2 justify-center items-center">
                    <div className="h-[40px] w-2/3 animate-pulse rounded-full bg-slate-300"></div>
                    <div className="h-[40px] w-2/3 animate-pulse rounded-full bg-slate-300"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-5 md:gap-4">
            <div className="col-span-3">
              <div className="card space-y-6">
                <div className="h-[20px] w-1/2 animate-pulse rounded-full bg-slate-300"></div>
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
    <main className="grid grid-cols-1 md:grid-cols-5 md:px-52 py-10">
      <section className='md:col-span-3'><ProductImage images={product.images} productName={product.name}/></section>
      <section className='md:col-span-2'>
        <div className='h-2/3'><ProductInformation {...product}/></div>
        <div></div>
      </section>
    </main>
  );
};

export default Product;
