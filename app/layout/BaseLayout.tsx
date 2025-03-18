"use client";

import { useState, useEffect } from "react";
import { LayoutGrid, List, Package2, Sun, Moon } from "lucide-react";
import Link from "next/link";
import useSWR from "swr";
import pokemonTypes from "../data/pokemonTypes";
import usePokeQuantity from "../context/PokeQuantityContext";

const fetcher = (url: string) => fetch(url).then((res) => res.json());

const SearchPokeByName = () => {
  const [query, setQuery] = useState("");
  const [filteredPokemon, setFilteredPokemon] = useState<{ name: string; url: string }[]>([]);
  const { data, error } = useSWR("https://pokeapi.co/api/v2/pokemon?limit=1000", fetcher);

  useEffect(() => {
    if (data?.results) {
      const results = data.results.filter((poke: { name: string }) =>
        poke.name.toLowerCase().includes(query.toLowerCase())
      );
      setFilteredPokemon(results);
    }
  }, [query, data]);

  if (error) return <p>Error loading Pokémon data</p>;

  return (
    <div className="relative w-full max-w-md">
      <label className="input flex items-center w-full">
        <svg className="h-[1em] opacity-50" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
          <g strokeLinejoin="round" strokeLinecap="round" strokeWidth="2.5" fill="none" stroke="currentColor">
            <circle cx="11" cy="11" r="8"></circle>
            <path d="m21 21-4.3-4.3"></path>
          </g>
        </svg>
        <input
          type="search"
          className="grow px-2"
          placeholder="Search Pokémon..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
      </label>

      {query && (
        <ul className="absolute left-0 mt-1 w-full bg-white shadow-md rounded-md max-h-40 overflow-auto z-10">
          {filteredPokemon.length > 0 ? (
            filteredPokemon.map((poke) => (
              <li key={poke.name} className="px-3 py-2 hover:bg-gray-100">
                <a href={`/details/${poke.name}`} className="capitalize text-base-200">
                  {poke.name}
                </a>
              </li>
            ))
          ) : (
            <li className="px-3 py-2 text-gray-500">No Pokémon found</li>
          )}
        </ul>
      )}
    </div>
  );
};

const BaseLayout = ({ children }: { children: React.ReactNode }) => {
  const { getPokeQuantityItems } = usePokeQuantity();
  const pokeCount = getPokeQuantityItems();

  return (
    <div className="drawer">
      <input id="my-drawer" type="checkbox" className="drawer-toggle" />
      <div className="drawer-content flex flex-col min-h-screen">
        <div className="navbar bg-base-300 w-full flex items-center justify-between px-4">
          <div className="flex-none lg:hidden">
            <label htmlFor="my-drawer" className="btn btn-square btn-ghost">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="inline-block h-6 w-6 stroke-current">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path>
              </svg>
            </label>
          </div>

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
                {pokeCount > 0 && <span className="indicator-item badge badge-soft badge-secondary">{pokeCount}</span>}
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
         
          <Link href="/pokeball" className="btn btn-soft btn-warning capitalize">Go to Pokeball</Link>
        </div>
      </div>
    </div>
  );
};

export default BaseLayout;