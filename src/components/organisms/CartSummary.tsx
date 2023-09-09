import { NumericFormat } from "react-number-format";
import Button from "../atoms/Button";
import { Dialog, Transition } from "@headlessui/react";
import IconButton from "../atoms/IconButton";
import { faArrowRight, faXmark } from "@fortawesome/pro-regular-svg-icons";
import clsx from "clsx";
import Backdrop from "../atoms/Backdrop";
import Alert from "../atoms/Alert";
import Link from "next/link";
import EmptyCart from "./EmptyCart";
import useSideCart from "@/hooks/useSideCart.hook";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import CartItem from "../molecules/CartItem";
import useCart from "@/hooks/useCart.hook";

interface CheckoutResume {
  variant?: "checkout" | "side";
  focusInput?: () => void;
}

const CartSummary = ({ variant = "checkout" }: CheckoutResume) => {
  const router = useRouter();
  const { close } = useSideCart();
  const { data: cart, items, loading } = useCart();
  const [openResume, setOpenResume] = useState<boolean>(false);
  const [cartErrors, setCartErrors] = useState<Error[]>();
  const [cartUpdated, setCartUpdated] = useState(false);

  return (
    <div className="h-full">
      {cart && variant === "checkout" && (
        <div className="w-full">
          {!openResume && (
            <div className="fixed inset-x-0 bottom-3 z-[5] px-2 lg:hidden">
              <div className="flex w-full justify-between rounded bg-secondary p-4 text-white shadow-card">
                <div className="flex items-center justify-between space-x-4">
                  <div className="flex h-6 w-6 items-center justify-center rounded-full bg-black">
                    <b>{cart.cartAttributes.totalItems}</b>
                  </div>
                  <Button
                    className="underline"
                    onClick={() => {
                      setOpenResume(true);
                    }}
                  >
                    Ver resumen
                  </Button>
                </div>
                <h6 className="font-bold">
                  <NumericFormat
                    value={cart.cartAttributes.total}
                    prefix="$"
                    displayType="text"
                    thousandSeparator
                    decimalScale={0}
                  />
                </h6>
              </div>
            </div>
          )}
          <Transition.Root show={openResume}>
            <Dialog
              as="div"
              className="fixed inset-0 z-40 flex"
              onClose={() => {
                setOpenResume(false);
              }}
            >
              <Transition.Child
                enter="transition-opacity ease-linear duration-300"
                enterFrom="opacity-0"
                enterTo="opacity-100"
                leave="transition-opacity ease-linear duration-300"
                leaveFrom="opacity-100"
                leaveTo="opacity-0"
              >
                <Dialog.Overlay className="fixed inset-0 bg-black bg-opacity-25" />
              </Transition.Child>
              <Transition.Child
                enter="transition ease-in-out duration-300 transform"
                enterFrom="-translate-x-full"
                enterTo="translate-x-0"
                leave="transition ease-in-out duration-300 transform"
                leaveFrom="translate-x-0"
                leaveTo="-translate-x-full"
              >
                <div className="scrollbar relative h-full min-w-min overflow-y-auto bg-white p-2 pb-12 shadow-xl">
                  <div className="flex items-center justify-between">
                    <h5 className="font-bold">
                      Productos ({cart.cartAttributes.totalItems})
                    </h5>
                    <IconButton
                      icon={faXmark}
                      size="lg"
                      onClick={() => {
                        setOpenResume(false);
                      }}
                    />
                  </div>
                  <div>
                    <div className="divide-y overflow-auto py-4">
                      {items.map((product, key) => (
                        <CartItem
                          id={product.id}
                          product={product}
                          key={key}
                          variant="checkout"
                        />
                      ))}
                    </div>
                    <div className="my-1 w-full">
                      <div className="space-y-2 p-4 font-bold">
                        {cart.cartAttributes.delivery > 0 &&
                          variant === "checkout" && (
                            <div className="flex justify-between">
                              <span>Envío</span>
                              <NumericFormat
                                value={cart.cartAttributes.delivery}
                                prefix="$"
                                displayType="text"
                                thousandSeparator
                                decimalScale={0}
                              />
                            </div>
                          )}
                        <div className="flex justify-between">
                          <span>Subtotal</span>
                          <NumericFormat
                            value={+cart.cartAttributes.subTotal}
                            prefix="$"
                            displayType="text"
                            thousandSeparator
                            decimalScale={0}
                          />
                        </div>
                        {cart.cartAttributes.discount > 0 && (
                          <div className="flex justify-between text-secondary">
                            <span>Descuento</span>
                            <NumericFormat
                              value={+cart.cartAttributes.discount}
                              prefix="- $"
                              displayType="text"
                              thousandSeparator
                              decimalScale={0}
                            />
                          </div>
                        )}
                      </div>
                      <div className="flex justify-between rounded-lg border border-secondary py-2 px-4 text-2xl font-bold text-secondary">
                        <span>Total</span>
                        <NumericFormat
                          value={+cart.cartAttributes.total}
                          prefix="$"
                          displayType="text"
                          thousandSeparator
                          decimalScale={0}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </Transition.Child>
            </Dialog>
          </Transition.Root>
        </div>
      )}
      <div
        className={clsx(
          "h-full rounded-r",
          variant === "checkout" &&
            "hidden bg-secondary bg-opacity-5 p-4 lg:block"
        )}
      >
        <Backdrop
          open={!cart && variant !== "checkout"}
          content={
            <img className="w-20" src="/assets/loading.gif" alt="loading" />
          }
        >
          {cartUpdated && !cartErrors && (
            <Alert color="success" type="success" icon>
              Carrito actualizado.
            </Alert>
          )}
          {/* {cartErrors &&
            cartErrors.map(({ code, message }) => (
              <Alert color="error" type="error" key={code}>
                {message}
              </Alert>
            ))} */}
          {cart && items.length > 0 ? (
            <div
              className={clsx(
                "divide-y",
                variant === "side" &&
                  "flex h-full flex-col justify-between divide-y",
                variant === "checkout" && "block"
              )}
            >
              <div className="scrollbar mb-8 divide-y overflow-y-auto">
                {items.map((product, key) => (
                  <CartItem
                    id={product.id}
                    product={product}
                    key={key}
                    variant={variant}
                    onError={(err) => setCartErrors(err.response?.data.errors)}
                    onSuccess={() => {
                      setCartUpdated(true);
                      setCartErrors(undefined);
                    }}
                  />
                ))}
              </div>

              <div
                className={clsx(
                  "sticky bottom-1 bg-[#eeeef6] pb-10",
                  variant === "side" && "bg-white"
                )}
              >
                <div className="my-1 w-full">
                  <div className="space-y-2 p-4 font-bold">
                    {cart.cartAttributes.delivery > 0 &&
                      variant === "checkout" && (
                        <div className="flex justify-between">
                          <span>Envío</span>
                          <NumericFormat
                            value={cart.cartAttributes.delivery}
                            prefix="$"
                            displayType="text"
                            thousandSeparator
                            decimalScale={0}
                          />
                        </div>
                      )}
                    <div className="flex justify-between">
                      <span>Subtotal</span>
                      <NumericFormat
                        value={+cart.cartAttributes.subTotal}
                        prefix="$"
                        displayType="text"
                        thousandSeparator
                        decimalScale={0}
                      />
                    </div>
                    {cart.cartAttributes.discount > 0 && (
                      <div className="flex justify-between text-secondary">
                        <span>Descuento</span>
                        <NumericFormat
                          value={+cart.cartAttributes.discount}
                          prefix="- $"
                          displayType="text"
                          thousandSeparator
                          decimalScale={0}
                        />
                      </div>
                    )}
                  </div>
                  <div className="flex justify-between rounded-lg border border-secondary py-2 px-4 text-2xl font-bold text-secondary">
                    <span>Total</span>
                    <NumericFormat
                      value={+cart.cartAttributes.total}
                      prefix="$"
                      displayType="text"
                      thousandSeparator
                      decimalScale={0}
                    />
                  </div>
                </div>
                {variant === "side" && (
                  <div className="flex flex-col justify-between space-y-2 px-4">
                    {items.length > 0 ? (
                      <>
                        <Link href="/checkout" passHref>
                          <Button
                            color="info"
                            size="lg"
                            fullwidth
                            icon={faArrowRight}
                            onClick={() => {
                              close();
                            }}
                          >
                            Completar orden
                          </Button>
                        </Link>
                      </>
                    ) : (
                      <Button
                        color="info"
                        variant="text"
                        size="lg"
                        fullwidth
                        onClick={() => {
                          close();
                          router.back();
                        }}
                      >
                        Seguir comprando
                      </Button>
                    )}
                  </div>
                )}
              </div>
            </div>
          ) : (
            <>
            {
              !loading && (

                <EmptyCart
                  onClick={() => {
                    close();
                    router.back();
                  }}
                />
              )
            }
            </>
          )}
        </Backdrop>
      </div>
    </div>
  );
};

export default CartSummary;
