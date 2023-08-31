import { ChangeEvent, useState } from 'react';
import clsx from 'clsx';

import {
  faCircleMinus,
  faCirclePlus,
  faSpinnerThird,
} from '@fortawesome/pro-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import IconButton from '../atoms/IconButton';
import Select from '../atoms/Select';
import TextField from '../atoms/TextField';



interface ProductQuantity {
  defaultValue?: number;
  max?: string | number;
  disabled?: boolean;
  disableInput?: boolean;
  onChange: (quantity: number) => Promise<boolean>;
  dense?: boolean;
  cart?: boolean;
  labelQuantity?: boolean;
}

const QuantityInput = ({
  defaultValue = 1,
  max,
  disabled,
  disableInput,
  onChange,
  dense = false,
  cart,
  labelQuantity = false,
}: ProductQuantity) => {
  const [quantity, setQuantity] = useState<number>(defaultValue);
  const [activeQuantity, setActiveQuantity] = useState<boolean>(false);
  const productsAvailable = Number(max) <= 10 ? max : 10;

  const addQuantity = async () => {
    activateloading();
    const newQuantity = quantity + 1;
    if (max) {
      if (newQuantity <= Number(max)) {
        if (await onChange(newQuantity)) setQuantity(newQuantity);
      }
    } else {
      if (await onChange(newQuantity)) setQuantity(newQuantity);
    }
  };

  const subtractQuantity = async () => {
    activateloading();
    const newQuantity = quantity - 1;
    if (newQuantity <= 0) {
      setQuantity(defaultValue);
    } else {
      if (await onChange(newQuantity)) setQuantity(newQuantity);
    }
  };

  const handleSelectQuantity = async (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    const newQuantity = +e.target.value;
    if (await onChange(newQuantity)) setQuantity(newQuantity);
  };

  const handleInputOnBlur = () => {
    if (!quantity || quantity <= 0) {
      setQuantity(quantity + 1);
    }
  };

  const activateloading = () => {
    setActiveQuantity(true);
    setTimeout(() => {
      setActiveQuantity(false);
    }, 1000);
  };

  return (
    <div>
      <div className="flex items-center space-x-2">
        {labelQuantity && <label className="label font-bold">Cantidad</label>}
        {Boolean(max) && labelQuantity && (
          <span className="helper-text">({max}) disponibles</span>
        )}
      </div>
      <div className={clsx(dense ? 'w-40' : 'w-full rounded md:w-44')}>
        <div className="z-20 flex items-center gap-2">
          <div className="flex items-center justify-between">
            <IconButton
              icon={faCircleMinus}
              size={dense ? '2x' : 'lg'}
              onClick={subtractQuantity}
              disabled={quantity <= 1 ? true : disabled || activeQuantity}
            />
            {max && !cart ? (
              <Select
                value={{
                  label: quantity,
                  value: quantity,
                }}
                onChange={async (option) => {
                  if (await onChange(Number(option.value)))
                    setQuantity(Number(option.value));
                }}
                options={Array.from({ length: Number(productsAvailable) }).map(
                  (_, key) => ({
                    label: key + 1,
                    value: key + 1,
                  })
                )}
                disabled={disabled}
                fullwidth
              />
            ) : (
              <TextField
                value={quantity}
                defaultValue={defaultValue}
                onChange={handleSelectQuantity}
                onBlur={handleInputOnBlur}
                disabled={disabled || dense || disableInput}
                textCenter={true}
              />
            )}
            <IconButton
              icon={faCirclePlus}
              size={dense ? '2x' : 'lg'}
              onClick={addQuantity}
              disabled={disabled || activeQuantity}
            />
          </div>
          <div>
            {activeQuantity && (
              <FontAwesomeIcon
                className="animate-spin text-lg text-secondary"
                icon={faSpinnerThird}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuantityInput;
