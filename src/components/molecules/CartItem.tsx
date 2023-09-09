import useCart from "@/hooks/useCart.hook";
import { Product } from "@/types/Cart/CartResponse";
import clsx from "clsx";
import { NumericFormat } from "react-number-format";
import { toast } from "react-toastify";
import Badge from "../atoms/Badge";
import Chip from "../atoms/Chip";
import Button from "../atoms/Button";
import QuantityInput from "./QuantityInput";
import { useEffect } from "react";

interface CartItem {
  id: string;
  product: Product;
  variant?: "cart" | "saved" | "checkout" | "side";
  onError?: (error: any) => void;
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
  const { updateCart, getCart, items } = useCart();
  const available = product.attributes.stock
    ? Boolean(+product.attributes.stock > 0)
    : false;
  const isServiceProduct =
    product.attributes.categories.length > 0 &&
    product.attributes.categories?.some((item) => item.name === "Servicios");
  const isVirtualProduct = product.attributes.categories?.some(
    (item) => item.name === "Pines Virtuales"
  );

  if (isServiceProduct || isVirtualProduct) {
    product.quantity = 1;
  }

  const slug =
    product.attributes.type === "variation"
      ? product.attributes.slugParent
      : product.attributes.slug;


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
          badgeContent={product.quantity}
          color="info"
          visible={variant !== "cart"}
        >
          <div className="flex aspect-square h-12 w-12 cursor-pointer items-center justify-center rounded-lg bg-white">
            <a title="productImage" href={`/productos/${slug}`}>
              <img
                className="aspect-square rounded-lg"
                src={product.attributes.images[0]}
                alt={product.attributes.name || "Product"}
              />
            </a>
          </div>
        </Badge>
        <div className="px-0 lg:px-2">
          <div className="text-xs text-gray-400">
            <span>{product.attributes.sellerName}</span>
          </div>
          <div className={clsx(variant === "cart" && "flex")}>
            <span
              className={clsx(
                "cursor-pointer font-semibold",
                variant === "cart" && "text-lg line-clamp-1",
                variant === "checkout" && "text-sm line-clamp-2"
              )}
            >
              <a title="productName" href={`/productos/${slug}`}>
                {product.attributes.name}
              </a>
            </span>
            <div
              className={clsx(variant === "cart" && "relative top-1 left-2")}
            >
              {isServiceProduct &&
                (variant === "checkout" || variant === "cart") && (
                  <Chip color="info">Servicio</Chip>
                )}
              {isVirtualProduct &&
                (variant === "checkout" || variant === "cart") && (
                  <Chip color="info">Virtual</Chip>
                )}
            </div>
          </div>

          {(variant === "cart" || variant === "side") && (
            <Button
              size="sm"
              variant="text"
              color="error"
              onClick={() => {
                updateCart(
                  {
                    product: {
                      productId: id,
                      quantity: product.quantity,
                    },
                  },
                  "delete"
                ).then((response) => {
                  if (response?.data.data.cartAttributes.products.length) {
                    if (setQuantityOfProducst) {
                      setQuantityOfProducst(
                        response?.data.data.cartAttributes.products.length
                      );
                    }
                  } else {
                    if (setQuantityOfProducst) {
                      setQuantityOfProducst(0);
                    }
                  }
                });
                toast("Se ha eliminado el producto del carrito.", {
                  position: "top-center",
                });
              }}
            >
              Eliminar
            </Button>
          )}
        </div>
      </div>

      <div
        className={clsx(
          (variant === "cart" || variant === "side") &&
            "grid grid-cols-2 place-items-end items-center gap-2",
          variant === "checkout" && "flex min-w-max items-center justify-end",
          (isServiceProduct || isVirtualProduct) && "grid-cols-none"
        )}
      >
        {(variant === "cart" || variant === "side") &&
          !isServiceProduct &&
          !isVirtualProduct &&
          available && (
            <QuantityInput
              defaultValue={product.quantity}
              max={product.attributes.stock}
              dense={variant === "side" || variant === "cart"}
              cart={variant === "side" || variant === "cart"}
              labelQuantity={labelQuantity}
              disableInput
              onChange={async (quantity: number) => {
                return updateCart({
                  product: {
                    productId: id,
                    quantity:
                      product.quantity > quantity
                        ? (product.quantity - quantity) * -1
                        : quantity - product.quantity,
                  },
                })
                  .then((response) => {
                    if (response?.data.data.cartAttributes.products.length) {
                      if (setQuantityOfProducst) {
                        setQuantityOfProducst(
                          response?.data.data.cartAttributes.products.length
                        );
                      }
                    } else {
                      if (setQuantityOfProducst) {
                        setQuantityOfProducst(0);
                      }
                    }
                    onSuccess();
                    return true;
                  })
                  .catch((error) => {
                    onError(error);
                    return false;
                  });
              }}
            />
          )}

        <div className="flex flex-col items-end">
          <NumericFormat
            className="ml-4 text-xl font-bold"
            value={+product.productTotal}
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
