import { Hit, ProductIndex } from "@/types/Elasticsearch/Index/products.type";
import { NumericFormat } from "react-number-format";

export interface ProductCardProps {
  product: Hit | undefined;
}

const ProductCard = ({ product }: ProductCardProps) => {
  console.log(product);
  const cardType = "full";
  if (!product) return null;

  return (
    <div className="group bg-gray-50 min-h-full rounded-lg border border-transparent bg-white transition ease-in-out hover:cursor-pointer md:hover:border-secondary md:hover:shadow-md">
      <div className="p-2">
        <div className="relative flex aspect-square w-full items-center justify-center bg-white">
          <a
            href={`/productos/${product._source.slug}`}
            className="flex aspect-square w-full flex-col items-center justify-center"
          >
            <img
              className="rounded-lg"
              src={product._source.image}
              alt={product._source.name}
              title={product._source.name}
            />
          </a>
        </div>
      </div>
      <div className="h-full py-2 px-4">
        <a
          href={`/productos/${product._source.slug}`}
          className="space-y-1 no-underline hover:text-black hover:no-underline"
        >
          {cardType === "full" && (
            <div>
              <div>
                <NumericFormat
                  className="font-bold tracking-wider md:text-xl"
                  value={product._source.price}
                  prefix="$"
                  displayType="text"
                  thousandSeparator
                />
              </div>
            </div>
          )}
          <div>
            <span className="text-sm leading-tight line-clamp-2 md:text-sm md:group-hover:text-secondary">
              {product._source.name}
            </span>
          </div>
        </a>
      </div>
    </div>
  );
};

export default ProductCard;
