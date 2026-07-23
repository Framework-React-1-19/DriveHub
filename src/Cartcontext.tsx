import { createContext, useContext, useState } from "react";
import type { ReactNode } from "react";
import type { Product, CartItem } from "./types";

interface CartContextValue {
  items: CartItem[];
  addItem(product: Product): void;
  removeItem(productId: number): void;
  updateQuantity(productId: number, quantity: number): void;
  clearCart(): void;
  total: number;
  itemCount: number;
}

const CartContext = createContext<CartContextValue | undefined>(undefined);

export function CartProvider({ children }: { children: ReactNode }) {
  // "items" è la lista dei prodotti nel carrello.
  // "setItems" è la funzione che uso per modificarla.
  const [items, setItems] = useState<CartItem[]>([]);

  function addItem(product: Product) {
    const existing = items.find((item) => item.product.id === product.id);

    if (existing) {
      // Il prodotto c'è già: costruisco una nuova lista dove
      // aumento la quantità solo del prodotto giusto
      const newItems = [];
      for (const item of items) {
        if (item.product.id === product.id) {
          newItems.push({ ...item, quantity: item.quantity + 1 });
        } else {
          newItems.push(item);
        }
      }
      setItems(newItems);
    } else {
      // Il prodotto non c'è: lo aggiungo con quantità 1
      setItems([...items, { product, quantity: 1 }]);
    }
  }

  function removeItem(productId: number) {
    const newItems = items.filter((item) => item.product.id !== productId);
    setItems(newItems);
  }

  function updateQuantity(productId: number, quantity: number) {
    const newItems = [];
    for (const item of items) {
      if (item.product.id === productId) {
        let safeQuantity = quantity;
        if (safeQuantity < 1) {
          safeQuantity = 1;
        }
        newItems.push({ ...item, quantity: safeQuantity });
      } else {
        newItems.push(item);
      }
    }
    setItems(newItems);
  }

  function clearCart() {
    setItems([]);
  }

  let total = 0;
  for (const item of items) {
    total = total + item.product.price * item.quantity;
  }

  let itemCount = 0;
  for (const item of items) {
    itemCount = itemCount + item.quantity;
  }

  const value: CartContextValue = {
    items,
    addItem,
    removeItem,
    updateQuantity,
    clearCart,
    total,
    itemCount,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart deve essere usato dentro un CartProvider");
  }
  return context;
}