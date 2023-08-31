import { AxiosError } from "axios";
import clsx from "clsx";
import { NumericFormat } from "react-number-format";
import Badge from "../atoms/Badge";
import Button from "../atoms/Button";
import QuantityInput from "./QuantityInput";
import { useProductElasticContext } from "@/contexts/productElasticContext";
import Image from "next/image";
interface CartItem {
  id: string;
  product: any;
  variant?: "cart" | "saved" | "checkout" | "side";
  onError?: (error: AxiosError<any>) => void;
  onSuccess?: () => void;
  setQuantityOfProducst?: (Qualitity: number) => void;
  labelQuantity?: boolean;
}

const CartItem = ({
  product,
  id,
  variant = "cart",
  onSuccess = () => {
    return;
  },
  onError = () => {
    return;
  },
  setQuantityOfProducst,
  labelQuantity = false,
}: CartItem) => {
  const { setQuantity, quantity } = useProductElasticContext();
  const available = product.stock ? Boolean(+product.stock > 0) : false;

  return (
    <div
      className={clsx(
        "relative py-4 px-2 md:p-4",
        variant === "cart" && "grid grid-cols-1 space-y-2 lg:grid-cols-2",
        variant === "checkout" && "flex justify-between"
      )}
    >
      <div className="flex space-x-2">
        <Badge
          badgeContent={quantity}
          color="info"
          visible={variant !== "cart"}
        >
          <div className="flex aspect-square cursor-pointer items-center justify-center rounded-lg bg-white">
            <Image
            width={100}
            height={100}
              className="aspect-square rounded-lg"
              src={product.images[0].src}
              alt={product.images[0].name || "Product"} // TODO: Descirption product does not exist
            />
          </div>
        </Badge>
        <div className="px-0 lg:px-2">
          <div className="text-xs text-gray-400">
            <span>{product.sellerInfo.name}</span>
          </div>
          <div className={clsx(variant === "cart" && "flex")}>
            <span
              className={clsx(
                "cursor-pointer font-semibold",
                variant === "cart" && "text-lg line-clamp-1",
                variant === "checkout" && "text-sm line-clamp-2"
              )}
            >
              {product.name}
            </span>
          </div>

          {(variant === "cart" || variant === "side") && (
            <Button size="sm" variant="text" color="error">
              Eliminar
            </Button>
          )}
        </div>
      </div>

      <div
        className={clsx(
          (variant === "cart" || variant === "side") &&
            "grid grid-cols-3 place-items-center items-center gap-2",
          variant === "checkout" && "flex min-w-max items-center justify-end"
        )}
      >
        {(variant === "cart" || variant === "side") && available && (
          <div className="col-span-2">

            <QuantityInput
              defaultValue={quantity}
              max={product.stock}
              dense={variant === "side" || variant === "cart"}
              cart={variant === "side" || variant === "cart"}
              labelQuantity={labelQuantity}
              disableInput
              onChange={async (quantity) => {
                setQuantity(quantity);
                return true;
              }}
            />
          </div>
        )}

        <div className="flex flex-col items-end col-span-1">
          <NumericFormat
            className="ml-4 text-xl font-bold"
            value={+product.price}
            prefix="$"
            displayType="text"
            thousandSeparator
            decimalScale={0}
          />
        </div>
      </div>
    </div>
  );
};

export default CartItem;
