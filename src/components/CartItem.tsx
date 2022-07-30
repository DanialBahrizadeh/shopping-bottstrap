import { FunctionComponent } from "react";
import { Button, Stack } from "react-bootstrap";
import {
  CartItem as CI,
  useShoppingCart,
} from "../context/ShoppingCartContext";
import StoreItems from "../data/items.json";
import formatCurrency from "../utilities/formatCurrency";

interface CartItemProps {
  item: CI;
}

const CartItem: FunctionComponent<CartItemProps> = ({ item }) => {
  const { removeFromCart } = useShoppingCart();
  const target = StoreItems.find((i) => i.id === item.id);
  if (!target) return null;
  return (
    <Stack direction="horizontal" gap={2} className="d-flex align-items-center">
      <img
        src={target.imgUrl}
        alt={target.name}
        style={{ width: "125px", height: "125px", objectFit: "cover" }}
      />
      <div className="me-auto">
        <div>
          {target.name}{" "}
          {item.quantity > 1 && (
            <span className="text-muted" style={{ fontSize: ".65rem" }}>
              x{item.quantity}
            </span>
          )}
        </div>
        <div className="text-muted" style={{ fontSize: ".75rem" }}>
          {formatCurrency(target.price)}
        </div>
      </div>
      <div>{formatCurrency(target.price * item.quantity)}</div>
      <Button
        variant="outline-danger"
        size="sm"
        onClick={() => removeFromCart(target.id)}
      >
        &times;
      </Button>
    </Stack>
  );
};

export default CartItem;
