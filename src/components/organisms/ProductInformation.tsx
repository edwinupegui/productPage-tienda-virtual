import Button from "../atoms/Button";
import QuantityInput from "../molecules/QuantityInput";
import Chip from "../atoms/Chip";
import { NumericFormat } from "react-number-format";
import { Source } from "@/types/Elasticsearch/Index/products.type";
import { useState } from "react";
import useSideCart from "@/hooks/useSideCart.hook";
import { useProductElasticContext } from "@/contexts/productElasticContext";

const ProductInformation = (product: Source) => {
  const { open, addNew } = useSideCart();
  const [disableButtons, setDisableButtons] = useState(false);
  const stock = product.stock;
  const available = product.stock ? Boolean(+product.stock > 0) : false;
  const { setQuantity } = useProductElasticContext();
  
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
              {available ? "Stock disponible" : "Stock No Disponible"}
            </Chip>
            {!available && (
              <div className="border rounded-md ">
                <p>
                  ¿Deseas que te notifiquemos cuando este producto tenga stock
                  disponible?
                </p>
                <Button color="info" size="md">
                  Si, avisame
                </Button>
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

      <div className="flex flex-col gap-2 mt-10">
        <Button
          color="info"
          size="lg"
          disabled={!available || disableButtons}
          fullwidth
          onClick={() => {
            addNew();
            open();
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
          onClick={() => {
            addNew();
            open();
          }}
        >
          Comprar ahora
        </Button>
      </div>
    </div>
  );
};

export default ProductInformation;
