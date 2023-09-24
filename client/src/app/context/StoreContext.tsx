import { PropsWithChildren, createContext, useContext, useState } from "react";
import { Basket } from "../model/basket";

interface StoreContextValue {
  basket: Basket | null;
  setBasket: (basket: Basket) => void;
  removeItem: (productId: string, quantity: number) => void;
}

export const StoreContext = createContext<StoreContextValue | undefined>(
  undefined
);

export function useStoreContext() {
  const context = useContext(StoreContext);
  if (context === undefined)
    throw Error("Oops - we do not seem to be inside the provider.");

  return context;
}

export function StoreProvider({ children }: PropsWithChildren<any>) {
  const [basket, setBasket] = useState<Basket | null>(null);

  function removeItem(productId: string, quantity: number) {
    if (!basket) return;
    const basketItems = [...basket.basketItems];
    const itemIndex = basketItems.findIndex((i) => i.productId === productId);
    if (itemIndex >= 0) basketItems[itemIndex].quantity -= quantity;
    if (basketItems[itemIndex].quantity === 0) basketItems.splice(itemIndex, 1);
    setBasket((prevState) => {
      return { ...prevState!, basketItems };
    });
  }

  return (
    <StoreContext.Provider value={{ basket, setBasket, removeItem }}>
      {children}
    </StoreContext.Provider>
  );
}
