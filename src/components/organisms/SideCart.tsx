import useSideCart from '@/hooks/useSideCart.hook';
import { faXmark } from '@fortawesome/pro-regular-svg-icons';
import { Transition } from '@headlessui/react';
import IconButton from '../atoms/IconButton';
import CartSummary from './CartSummary';


const SideCart = () => {
  const { state, close } = useSideCart();

  return (
    <Transition className="fixed top-0 z-30" show={state}>
      <div>
        <Transition.Child
          enter="transition-opacity ease-in-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="transition-opacity ease-in-out duration-300"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div
            className="absolute h-screen w-screen bg-black bg-opacity-30"
            onClick={() => {
              close();
            }}
          ></div>
        </Transition.Child>
        <div className="lx:w-1/3 fixed right-0 z-30 h-full w-full lg:w-1/3">
          <Transition.Child
            className="h-full"
            enter="transition-transform duration-500"
            enterFrom="translate-y-full"
            enterTo="translate-y-0"
            leave="transition-transform duration-500"
            leaveFrom="translate-y-0"
            leaveTo="translate-y-full"
          >
            <div className="pace-y-2 scrollbar relative flex h-screen flex-col justify-between overflow-y-auto bg-white lg:h-full">
              <div className="space-y-2">
                <div className="flex w-full items-center justify-between px-4">
                  <h5 className="font-bold">Carrito</h5>
                  <IconButton
                    icon={faXmark}
                    size="2x"
                    onClick={() => {
                      close();
                    }}
                  />
                </div>
              </div>
              <div className="grow px-4">
                <CartSummary variant="side" />
              </div>
            </div>
          </Transition.Child>
        </div>
      </div>
    </Transition>
  );
};

export default SideCart;
