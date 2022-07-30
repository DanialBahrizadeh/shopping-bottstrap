import { FunctionComponent } from "react";
import { Button, Card } from "react-bootstrap";
import { useShoppingCart } from "../context/ShoppingCartContext";
import formatCurrency from "../utilities/formatCurrency";

interface StoreItemProps {
  item: {
    id: number;
    name: string;
    price: number;
    imgUrl: string;
  };
}

const StoreItem: FunctionComponent<StoreItemProps> = ({ item }) => {
  const shoppingCart = useShoppingCart();
  const quantity = shoppingCart.getItemQuantity(item.id);
  return (
    <Card className="h-100">
      <Card.Img
        variant="top"
        src={item.imgUrl}
        height="200px"
        style={{ objectFit: "cover" }}
      />
      <Card.Body className="d-flex flex-column">
        <Card.Title className="d-flex justify-content-between align-items-baseline mb-4">
          <span className="fs-2">{item.name}</span>
          <span className="ms-2 text-muted">{formatCurrency(item.price)}</span>
        </Card.Title>
        <div className="mt-auto">
          {quantity === 0 ? (
            <Button
              className="w-100"
              onClick={() => shoppingCart.increaseCartQuantity(item.id)}
            >
              + Add To Cart
            </Button>
          ) : (
            <div
              className="d-flex align-items-center flex-column"
              style={{ gap: ".5rem" }}
            >
              <div
                className="d-flex align-items-center justify-content-center"
                style={{ gap: ".5rem" }}
              >
                <Button
                  onClick={() => shoppingCart.decreaseCartQuantity(item.id)}
                >
                  -
                </Button>
                <div>
                  <span className="fs-3">{quantity}</span>in cart
                </div>
                <Button
                  onClick={() => shoppingCart.increaseCartQuantity(item.id)}
                >
                  +
                </Button>
              </div>
              <Button
                variant="danger"
                size="sm"
                onClick={() => shoppingCart.removeFromCart(item.id)}
              >
                remove
              </Button>
            </div>
          )}
        </div>
      </Card.Body>
    </Card>
  );
};

export default StoreItem;
