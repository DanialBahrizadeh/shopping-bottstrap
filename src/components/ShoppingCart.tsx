import { FunctionComponent } from "react";
import { Offcanvas, Stack } from "react-bootstrap";
import { useShoppingCart } from "../context/ShoppingCartContext";
import formatCurrency from "../utilities/formatCurrency";
import CartItem from "./CartItem";
import StoreItems from "../data/items.json";

const ShoppingCart: FunctionComponent = () => {
  const { closeCart, cartItems, isOpen } = useShoppingCart();
  const itemElements = cartItems.map((item) => {
    return <CartItem key={item.id} item={item} />;
  });
  const totalPrice = formatCurrency(
    cartItems.reduce((prev, curr) => {
      const item = StoreItems.find((i) => i.id === curr.id);
      return prev + (item?.price || 0) * curr.quantity;
    }, 0)
  );
  return (
    <Offcanvas show={isOpen} onHide={closeCart} placement="end">
      <Offcanvas.Header closeButton>
        <Offcanvas.Title>Cart</Offcanvas.Title>
      </Offcanvas.Header>
      <Offcanvas.Body>
        <Stack gap={3}>
          {itemElements}
          <div className="ms-auto fw-bold fs-5">Total {totalPrice}</div>
        </Stack>
      </Offcanvas.Body>
    </Offcanvas>
  );
};

export default ShoppingCart;
