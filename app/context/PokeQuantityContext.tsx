"use client";
import { createContext, useContext } from "react";
import { v4 as uuidv4 } from "uuid";
import { useLocalStorage } from "../hooks/useLocalStorage"; // Import useLocalStorage

interface Pokemon {
  uniqueId: string;
  name: string;
  image: string;
  types: string[];
  image_id: number;
}

interface PokeQuantityContextType {
  cart: Pokemon[];
  increase: (pokemon: Omit<Pokemon, "uniqueId">) => void;
  decrease: (uniqueId: string) => void;
  removeFromCart: (uniqueId: string) => void;
  getPokeQuantityItems: () => number;
}

const PokeQuantityContext = createContext<PokeQuantityContextType | undefined>(undefined);

export function PokeQuantityProvider({ children }: { children: React.ReactNode }) {
  const [cart, setCart] = useLocalStorage<Pokemon[]>("pokemon-cart", []);

  // Add Pokémon to the cart with a unique ID
  const increase = (pokemon: Omit<Pokemon, "uniqueId">) => {
    setCart((prevCart) => [...prevCart, { ...pokemon, uniqueId: uuidv4() }]);
  };

  // Remove a single instance of a Pokémon by uniqueId
  const decrease = (uniqueId: string) => {
    setCart((prevCart) => {
      const index = prevCart.findIndex((item) => item.uniqueId === uniqueId);
      if (index !== -1) {
        const newCart = [...prevCart];
        newCart.splice(index, 1);
        return newCart;
      }
      return prevCart;
    });
  };

  // Remove all instances of a Pokémon by uniqueId
  const removeFromCart = (uniqueId: string) => {
    setCart((prevCart) => prevCart.filter((item) => item.uniqueId !== uniqueId));
  };

  // Get total Pokémon count
  const getPokeQuantityItems = () => cart.length;

  return (
    <PokeQuantityContext.Provider value={{ cart, increase, decrease, removeFromCart, getPokeQuantityItems }}>
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
  