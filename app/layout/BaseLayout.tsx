"use client";

import { useState, useEffect } from "react";
import { LayoutGrid, List, Package2, Sun, Moon } from "lucide-react";
import Link from "next/link";
import usePokeQuantity from "../context/PokeQuantityContext";
import SearchPokeByName from "../components/SearchPokeByName"; 
import pokemonTypes from "../data/pokemonTypes";
import PokeCartCard from "../components/PokeCartCard";

const BaseLayout = ({ children }: { children: React.ReactNode }) => {
  const { cart } = usePokeQuantity(); // Use `cart` directly from the context
  const [pokeCount, setPokeCount] = useState(0);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setPokeCount(cart.length); // Get the count directly
    setIsMounted(true);
  }, [cart]); // Dependency should be `cart`, not a function

  return (
    <div className="drawer">
      <input id="my-drawer" type="checkbox" className="drawer-toggle" />
      <div className="drawer-content flex flex-col min-h-screen">
        <div className="navbar bg-base-300 w-full flex items-center justify-between px-4">
          <div className="flex-1 flex justify-center">
            <SearchPokeByName />
          </div>

          <div className="hidden lg:flex items-center gap-2">
            <Link href="/grid">
              <button className="btn btn-soft btn-accent capitalize">
                Grid <LayoutGrid />
              </button>
            </Link>

            <Link href="/list">
              <button className="btn btn-soft btn-warning capitalize">
                List <List />
              </button>
            </Link>

            <details className="dropdown">
              <summary className="btn btn-dash btn-success capitalize">Poke Elements</summary>
              <ul className="menu dropdown-content bg-base-100 rounded-box w-52 p-2 shadow-sm">
                {pokemonTypes.map((type, index) => (
                  <li key={index}>
                    <a className="capitalize" href={`/elements/${type.name}`}>{type.name}</a>
                  </li>
                ))}
              </ul>
            </details>

            <div className="indicator">
              <label htmlFor="my-drawer" className="btn btn-primary btn-soft drawer-button">
                {isMounted && pokeCount > 0 && (
                  <span className="indicator-item badge badge-soft badge-secondary">{pokeCount}</span>
                )}
                <Package2 />
              </label>
            </div>

            <label className="swap swap-rotate">
              <input type="checkbox" className="theme-controller" value="dark" />
              <Sun className="swap-off h-6 w-6 text-yellow-500" />
              <Moon className="swap-on h-6 w-6 text-gray-500" />
            </label>
          </div>
        </div>

        <main className="flex-grow">{children}</main>
      </div>
      
      <div className="drawer-side">
        <label htmlFor="my-drawer" aria-label="close sidebar" className="drawer-overlay"></label>
        <div className="menu bg-base-200 text-base-content min-h-full w-80 p-4">
          <Link href="/pokeball" className="btn btn-dash btn-primary capitalize">Go to Pokeball</Link>
          <PokeCartCard />
        </div>
      </div>
    </div>
  );
};

export default BaseLayout;
