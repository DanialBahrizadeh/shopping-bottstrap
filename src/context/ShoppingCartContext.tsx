import { createContext, FunctionComponent, useContext, useState } from "react";
import ShoppingCart from "../components/ShoppingCart";
import useSessionStorage from "../hooks/useSessionStorage";
interface ShoppingCart {
  getItemQuantity: (id: number) => number;
  increaseCartQuantity: (id: number) => void;
  decreaseCartQuantity: (id: number) => void;
  removeFromCart: (id: number) => void;
  openCart: () => void;
  closeCart: () => void;
  isOpen: boolean;
  cartQuantity: number;
  cartItems: CartItem[];
}

interface ShoppingCartProviderProps {
  children: React.ReactNode;
}

export interface CartItem {
  id: number;
  quantity: number;
}

const ShoppingCartContext = createContext<ShoppingCart>({} as ShoppingCart);

export const useShoppingCart: () => ShoppingCart = () => {
  return useContext(ShoppingCartContext);
};

const ShoppingCartProvider: FunctionComponent<ShoppingCartProviderProps> = ({
  children,
}) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [cartItems, setCartItems] = useSessionStorage<CartItem[]>(
    "shopping-cart",
    []
  );

  const value: ShoppingCart = {
    getItemQuantity: (id: number) => {
      return cartItems.find((item) => item.id === id)?.quantity || 0;
    },
    increaseCartQuantity: (id: number) => {
      setCartItems((prevCartItems) => {
        if (prevCartItems.find((item) => item.id === id) == null) {
          return [...prevCartItems, { id, quantity: 1 }];
        } else {
          return prevCartItems.map((item) =>
            item.id === id ? { ...item, quantity: item.quantity + 1 } : item
          );
        }
      });
    },
    decreaseCartQuantity: (id: number) => {
      setCartItems((prevCartItems) => {
        if (prevCartItems.find((item) => item.id === id)?.quantity === 1) {
          return prevCartItems.filter((item) => item.id !== id);
        } else {
          return prevCartItems.map((item) =>
            item.id === id ? { ...item, quantity: item.quantity - 1 } : item
          );
        }
      });
    },
    removeFromCart: (id: number) => {
      setCartItems((prevCartItems) => {
        return prevCartItems.find((item) => item.id === id)
          ? prevCartItems.filter((item) => item.id !== id)
          : prevCartItems;
      });
    },
    cartQuantity: cartItems.reduce((prev, curr) => {
      return curr.quantity + prev;
    }, 0),
    isOpen,
    openCart: () => setIsOpen(true),
    closeCart: () => setIsOpen(false),
    cartItems,
  };

  return (
    <ShoppingCartContext.Provider value={value}>
      {children}
      <ShoppingCart />
    </ShoppingCartContext.Provider>
  );
};

export default ShoppingCartProvider;
