import Button from "../atoms/Button";
import QuantityInput from "../molecules/QuantityInput";
import Chip from "../atoms/Chip";
import { NumericFormat } from "react-number-format";
import { Source } from "@/types/Elasticsearch/Index/products.type";
import { useState } from "react";
import useSideCart from "@/hooks/useSideCart.hook";
import useCart from "@/hooks/useCart.hook";
import { ICartResponse } from "@/types/Cart/CartResponse";
import { AxiosError } from "axios";
import { toast } from "react-toastify";
import router from "next/router";
import Alert from "../atoms/Alert";
import Modal from "../atoms/Modal";
import ProductsUnavailabilityForm from "../molecules/ProductsUnavailabilityForm";

const ProductInformation = (product: Source) => {
  const { open, addNew } = useSideCart();
  const { updateCart } = useCart();
  const [cartErrors, setCartErrors] = useState<any>();
  const [quantity, setQuantity] = useState<number>(1);
  const [disableButtons, setDisableButtons] = useState(false);
  const [modal, setModal] = useState<boolean>(false);
  const stock = product.stock;
  const available = product.stock ? Boolean(+product.stock > 0) : false;

  const onClose = () => {
    setModal(false);
  };

  return (
    <div className="h-full space-y-4 rounded border-l p-4 flex flex-col gap-4">
      <div className="">
        <div className="mb-1 space-x-1 text-xs uppercase text-gray-400">
          {product.sku}
        </div>
        <div className="mb-1 space-x-1 text-xs uppercase text-gray-400">
          {product.totalSales} Vendidos
        </div>
        <h1 className="text-xl font-bold normal-case">{product.name}</h1>
      </div>
      <div className="">
        <NumericFormat
          value={product.price}
          displayType="text"
          thousandSeparator={true}
          prefix={"$ "}
          decimalScale={0}
          allowNegative={false}
          className="text-3xl font-bold"
        />
      </div>
      <div className="">
        {typeof stock !== "undefined" && (
          <div className="space-y-2">
            <Chip color={available ? "success" : "error"}>
              {available ? "Stock Disponible" : "Stock No Disponible"}
            </Chip>
            {!available && (
              <div className="border rounded-md p-7 border-[#E2E2E2] bg-[#FBFBFB] flex flex-col gap-4 font-medium">
                <p>
                  ¿Deseas que te notifiquemos cuando este producto tenga stock
                  disponible?
                </p>
                <div>
                  <Button color="info" size="md" onClick={() => setModal(true)}>
                    Si, avisame
                  </Button>
                </div>
              </div>
            )}
            {available && +stock === 1 && (
              <span className="ml-2 font-bold">¡Último disponible!</span>
            )}
            {available &&
              (product.type === "simple" || product.type === "variation") && (
                <QuantityInput
                  max={+product.stock}
                  labelQuantity={true}
                  onChange={async (quantity: number) => {
                    setQuantity(quantity);
                    return true;
                  }}
                />
              )}
          </div>
        )}
      </div>
      {cartErrors &&
        cartErrors.map(({ code, message }: any) => (
          <Alert color="error" type="error" key={code}>
            {message}
          </Alert>
        ))}
      {available && (
        <div className="flex flex-col gap-2 mt-10">
          <Button
            color="info"
            size="lg"
            disabled={!available || disableButtons}
            fullwidth
            onClick={async () => {
              setDisableButtons(true);
              updateCart({
                product: {
                  productId: product.id,
                  quantity:
                    product.type === "service" || product.type === "virtual"
                      ? 1
                      : quantity,
                },
              })
                .then(() => {
                  addNew();
                  open();
                })
                .catch((error: AxiosError<ICartResponse>) => {
                  setCartErrors(error.response?.data.errors);
                })
                .finally(() => {
                  setDisableButtons(false);
                });
            }}
          >
            Añadir al carrito
          </Button>
          <Button
            color="tamagotchi"
            size="lg"
            variant="outlined"
            disabled={!available || disableButtons}
            fullwidth
            onClick={async () => {
              setDisableButtons(true);
              updateCart({
                product: {
                  productId: product.id,
                  quantity:
                    product.type === "service" || product.type === "virtual"
                      ? 1
                      : quantity,
                },
              })
                .then(() => {
                  if (available) {
                    toast.success(
                      "¡Tu producto se agregó al carrito! Redireccionando al checkout...",
                      {
                        position: "top-center",
                      }
                    );
                    // router.push('/checkout');
                  }
                })
                .catch((error: AxiosError<ICartResponse>) => {
                  setCartErrors(error.response?.data.errors);
                });
            }}
          >
            Comprar ahora
          </Button>
        </div>
      )}
      <Modal open={modal} onClose={onClose} size="3xl">
        <div className="px-10 py-5 flex flex-col gap-3 ml-10">
          <h2 className="text-xl">Danos tus datos</h2>
          <ProductsUnavailabilityForm />
        </div>
      </Modal>
    </div>
  );
};

export default ProductInformation;
