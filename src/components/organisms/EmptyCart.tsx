import { faCartCircleExclamation } from '@fortawesome/pro-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Button from '../atoms/Button';


interface EmptyCart {
  onClick: () => void;
}

const EmptyCart = ({ onClick }: EmptyCart) => (
  <div className="flex flex-col items-center justify-center space-y-4 text-center text-disabled">
    <FontAwesomeIcon icon={faCartCircleExclamation} size="10x" />
    <h4>
      <b>Tu carrito está vacío.</b>
    </h4>
    <p>Agrega productos a tu carrito y cumple ese antojito. ✌</p>
    <Button color="lipa" size="lg" onClick={onClick}>
      Seguir comprando
    </Button>
  </div>
);

export default EmptyCart;
