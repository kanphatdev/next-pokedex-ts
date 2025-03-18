"use client";

import { createContext, useContext, useState } from "react";

interface PokemonCartItem {
  name: string;
  image: string;
  types: string[];
}

interface PokeQuantityContextType {
  cart: PokemonCartItem[];
  getPokeQuantityItems: () => number;
  increase: (pokemon: PokemonCartItem) => void;
  decrease: (name: string) => void;
  removeFromCart: (name: string) => void;
}

const PokeQuantityContext = createContext<PokeQuantityContextType | undefined>(undefined);

export function PokeQuantityProvider({ children }: { children: React.ReactNode }) {
  const [cart, setCart] = useState<PokemonCartItem[]>([]);

  const increase = (pokemon: PokemonCartItem) => {
    setCart((prev) => [...prev, pokemon]);
  };

  const decrease = (name: string) => {
    setCart((prev) => {
      const lastIndex = prev.map((item) => item.name).lastIndexOf(name);
      if (lastIndex !== -1) {
        return prev.filter((_, index) => index !== lastIndex);
      }
      return prev;
    });
  };

  const removeFromCart = (name: string) => {
    setCart((prev) => prev.filter((item) => item.name !== name));
  };

  const getPokeQuantityItems = () => cart.length;

  return (
    <PokeQuantityContext.Provider value={{ cart, getPokeQuantityItems, increase, decrease, removeFromCart }}>
      {children}
    </PokeQuantityContext.Provider>
  );
}

export default function usePokeQuantity() {
  const context = useContext(PokeQuantityContext);
  if (!context) {
    throw new Error("usePokeQuantity must be used within a PokeQuantityProvider");
  }
  return context;
}
