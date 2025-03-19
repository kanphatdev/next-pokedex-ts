"use client";

import { useState, useEffect } from "react";
import useSWR from "swr";

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

export default SearchPokeByName;
