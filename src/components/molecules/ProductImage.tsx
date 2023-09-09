import { useState } from "react";
import clsx from "clsx";
import { Swiper as SwiperClass } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import Image from "next/image";

interface IProductImage {
  images: any[];
  productName: string;
}

const ProductImage = ({ images = [], productName }: IProductImage) => {
  const [imageSelected, setImageSelected] = useState<number>(0);
  const [swiper, setSwiper] = useState<SwiperClass>();

  const handleImage = (key: number) => {
    if (swiper) {
      swiper.slideTo(key);
      setImageSelected(key);
    }
  };

  return (
    <div className="my-2 flex flex-col md:my-0 md:flex-row">
      <div className="relative my-2 aspect-square w-full overflow-hidden bg-white md:my-0 md:mx-4">
        <div className="absolute inset-0 h-auto w-full">
          <Swiper
            slidesPerView={1}
            onSwiper={setSwiper}
            centeredSlides={true}
            initialSlide={0}
          >
            {images.length > 0 ? (
              images?.map(({ src }, key) => (
                <SwiperSlide key={key}>
                  <div className="pointer-events-none flex aspect-square flex-col items-center justify-center object-scale-down transition duration-300 ease-in-out sm:pointer-events-auto cursor-zoom-in md:hover:scale-150">
                    <Image
                      width={500}
                      height={500}
                      className="h-[50%] w-[80%] object-scale-down"
                      src={src}
                      alt={productName}
                    />
                  </div>
                </SwiperSlide>
              ))
            ) : (
              <SwiperSlide>
                <div className="flex aspect-square flex-col items-center justify-center bg-gray-200 object-scale-down text-center">
                  <span className="text-4xl font-bold text-gray-400">
                    Producto sin imágenes
                  </span>
                </div>
              </SwiperSlide>
            )}
          </Swiper>
        </div>
        <div className="absolute bottom-2 z-10 w-full space-x-4 p-1 md:mx-4">
          <Swiper
            effect="fade"
            spaceBetween={50}
            breakpoints={{
              375: {
                slidesPerView: 8,
              },
              768: {
                slidesPerView: 8,
              },
              1024: {
                slidesPerView: 12,
              },
            }}
          >
            {images?.map(({ src }, key) => (
              <SwiperSlide key={key}>
                <span
                  className="cursor-pointer mx-10"
                  onMouseEnter={() => handleImage(key)}
                  onClick={() => handleImage(key)}
                >
                  <div
                    className={clsx(
                      "h-12 w-12 rounded-lg border bg-white shadow transition ease-in-out hover:border-tamagotchi md:h-14 md:w-14 border-[#E2E2E2]",
                      imageSelected === key && "border-tamagotchi"
                    )}
                  >
                    <Image
                      width={500}
                      height={500}
                      className="aspect-square rounded-lg"
                      src={src}
                      alt={`${productName} (${key + 1})`}
                    />
                  </div>
                </span>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </div>
  );
};

export default ProductImage;
