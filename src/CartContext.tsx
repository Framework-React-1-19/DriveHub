import { createContext, useContext, useState, useEffect } from "react";
import type { ReactNode } from "react";
import type { Car, CartItem } from './types';

interface CartContextValue {
  items: CartItem[];
  addItem(product: Car): void;
  removeItem(productId: string): void;
  updateQuantity(productId: string, quantity: number): void;
  clearCart(): void;
  total: number;
  itemCount: number;
}

const STORAGE_KEY = "drivehub_cart";

// Helper 1: Legge sempre lo stato aggiornato da localStorage
const getStoredCart = (): CartItem[] => {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    return saved ? JSON.parse(saved) : [];
  } catch (error) {
    console.error("Errore nella lettura da localStorage:", error);
    return [];
  }
};

// Helper 2: Scrive su localStorage e manda una notifica per aggiornare l'interfaccia
const setStoredCart = (items: CartItem[]) => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
    // Notifichiamo tutti i componenti nello stesso tab che localStorage è cambiato
    window.dispatchEvent(new Event("cart-updated"));
  } catch (error) {
    console.error("Errore nella scrittura su localStorage:", error);
  }
};

const CartContext = createContext<CartContextValue | undefined>(undefined);

export function CartProvider({ children }: { children: ReactNode }) {
  // Inizializza lo stato leggendo direttamente da localStorage
  const [items, setItems] = useState<CartItem[]>(getStoredCart);

  // Ascolta sia le modifiche dirette a localStorage che l'evento personalizzato 'cart-updated'
  useEffect(() => {
    const handleStorageChange = () => {
      setItems(getStoredCart());
    };

    window.addEventListener("storage", handleStorageChange);
    window.addEventListener("cart-updated", handleStorageChange);

    return () => {
      window.removeEventListener("storage", handleStorageChange);
      window.removeEventListener("cart-updated", handleStorageChange);
    };
  }, []);

  function addItem(product: Car) {
    const currentItems = getStoredCart();
    const carId = product.id || `${product.brand}-${product.model}`;
    const existing = currentItems.find(
      (item) => (item.product.id || `${item.product.brand}-${item.product.model}`) === carId
    );

    let updatedItems: CartItem[];
    if (existing) {
      updatedItems = currentItems.map((item) => {
        const currentId = item.product.id || `${item.product.brand}-${item.product.model}`;
        return currentId === carId ? { ...item, quantity: item.quantity + 1 } : item;
      });
    } else {
      updatedItems = [...currentItems, { product: { ...product, id: carId }, quantity: 1 }];
    }

    setStoredCart(updatedItems);
  }

  function removeItem(productId: string) {
    const currentItems = getStoredCart();
    const updatedItems = currentItems.filter(
      (item) => (item.product.id || `${item.product.brand}-${item.product.model}`) !== productId
    );
    setStoredCart(updatedItems);
  }

  function updateQuantity(productId: string, quantity: number) {
    const currentItems = getStoredCart();
    const safeQuantity = quantity < 1 ? 1 : quantity;
    const updatedItems = currentItems.map((item) => {
      const currentId = item.product.id || `${item.product.brand}-${item.product.model}`;
      return currentId === productId ? { ...item, quantity: safeQuantity } : item;
    });
    setStoredCart(updatedItems);
  }

  function clearCart() {
    setStoredCart([]);
  }

  // Calcolo Totali basato sull'array sincronizzato
  let total = 0;
  for (const item of items) {
    total += item.product.price * item.quantity;
  }

  let itemCount = 0;
  for (const item of items) {
    itemCount += item.quantity;
  }

  return (
    <CartContext.Provider
      value={{
        items,
        addItem,
        removeItem,
        updateQuantity,
        clearCart,
        total,
        itemCount,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart deve essere usato dentro un CartProvider");
  }
  return context;
}