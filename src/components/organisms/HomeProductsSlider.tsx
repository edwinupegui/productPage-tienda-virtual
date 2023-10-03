import { faArrowRight } from "@fortawesome/pro-regular-svg-icons";
import Button from "../atoms/Button";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import ProductCard, { ProductCardProps } from "../molecules/ProductCard";

import { Navigation, Pagination, Autoplay } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

interface HomeProductsSlider {
  title: string;
  products: any;
}
export default function HomeProductsSlider({
  title,
  products = [],
}: HomeProductsSlider) {
  if (products.length <= 0) return null;

  return (
    <div className="my-2">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-black">{title}</h2>

        <div className="hidden md:block">
          <Button size="md" variant="text" icon={faArrowRight} animation="left">
            Ver Más
          </Button>
        </div>
      </div>
      <div className="relative mb-6 flex card shadow-card">
        <Swiper
          spaceBetween={5}
          navigation
          pagination={{
            clickable: true,
            dynamicBullets: true,
          }}
          autoplay
          modules={[Navigation, Pagination]}
          breakpoints={{
            320: {
              slidesPerView: 1.2,
            },
            768: {
              slidesPerView: 2.5,
            },
            1024: {
              slidesPerView: 6,
            },
          }}
        >
          {products.map((product: any, key: number) => (
            <SwiperSlide key={key}>
              <ProductCard product={product} />
            </SwiperSlide>
          ))}
        </Swiper>
        {/* <div
          className="swiper-pagination swiper-pagination-slider"
          style={{
            bottom: "10px !important",
          }}
        /> */}
      </div>
      <div className="pt-4 px-10 md:hidden">
        <a className="flex items-center justify-between font-extrabold">
          Ver Más
          <FontAwesomeIcon icon={faArrowRight} />
        </a>
      </div>
    </div>
  );
}
