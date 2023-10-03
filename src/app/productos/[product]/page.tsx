"use client";

import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

import ProductImage from "@/components/molecules/ProductImage";
import ElasticsearchClient from "@/services/Elasticsearch/Client";
import { usePathname } from "next/navigation";
import ProductInformation from "@/components/organisms/ProductInformation";
import useSWR from "swr";
import { ProductBySlug } from "@/types/Elasticsearch/Index/products.type";

const Product = () => {
  const pathname = usePathname();

  const { data: product, isLoading } = useSWR<ProductBySlug>(
    {
      index: "products",
      request: {
        body: {
          id: "productBySlug",
          params: {
            keyword: pathname.split("/")[2] || "",
          },
        },
      },
    },
    ElasticsearchClient.searchTemplate,
    {
      revalidateIfStale: false,
      revalidateOnFocus: false,
    }
  );

  if (isLoading) {
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
    <main className="grid card shadow-card grid-cols-1 sm:grid-cols-5 mx-auto">
      {product && (
        <>
          <section className="sm:col-span-3">
            <ProductImage
              images={product.hits.hits[0]?._source.images}
              productName={product.hits.hits[0]?._source.name}
            />
          </section>
          <section className="sm:col-span-2">
            <div className="h-2/3">
              <ProductInformation {...product.hits.hits[0]?._source} />
            </div>
            <div></div>
          </section>
          <section className="mx-auto md:container my-[30px]">
          <HomeProductsSlider
            products={productStore}
            title="Más productos para ti"
          />
        </section>
        </>
      )}
    </main>
  );
};

export default Product;
