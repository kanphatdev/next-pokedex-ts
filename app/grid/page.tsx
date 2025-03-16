"use client";
import useSWR from "swr";
import PokeCard from "../components/PokeCard";
import { useState } from "react";

const fetcher = (url: string) => fetch(url).then((r) => r.json());

interface PokemonResult {
  name: string;
  url: string;
}

interface PokemonAPIResponse {
  results: PokemonResult[];
}

export default function GridPage() {
  const [page, setPage] = useState(1);
  const limit = 100; // Number of Pokémon per page
  const offset = (page - 1) * limit; // Calculate offset

  const { data, error, isLoading } = useSWR<PokemonAPIResponse>(
    `https://pokeapi.co/api/v2/pokemon?limit=${limit}&offset=${offset}`,
    fetcher
  );

  if (isLoading)
    return (
      <div className="container mx-auto p-4">
        <div className="flex w-52 flex-col gap-4">
          <div className="skeleton h-32 w-full"></div>
          <div className="skeleton h-4 w-28"></div>
          <div className="skeleton h-4 w-full"></div>
          <div className="skeleton h-4 w-full"></div>
        </div>
      </div>
    );
  if (error)
    return <div className="container mx-auto p-4">Error: {error.message}</div>;

  return (
    <div className="container mx-auto p-4 bg-inherit">
      <h1 className="mb-4 text-lg font-bold">Pokédex   ({page})</h1>
      <div className="grid 2xl:grid-cols-5 xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 gap-4">
        {data?.results.map((poke, i) => {
          const id = poke.url.split("/").filter(Boolean).pop(); // Extract ID from URL
          const imageUrl = id
            ? `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`
            : "";
          return (
            <PokeCard
              key={i}
              name={poke.name}
              imageUrl={imageUrl}
              detailsUrl={poke.url}
            />
          );
        })}
      </div>

      {/* Pagination Controls */}
      <div className="flex justify-center mt-4">
        <button
          className="btn btn-dash mx-2"
          disabled={page === 1}
          onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
        >
          Previous
        </button>
        <span className="p-2 rounded-md shadow-md card"> {page}</span>
        <button
          className="btn btn-dash mx-2"
          onClick={() => setPage((prev) => prev + 1)}
        >
          Next
        </button>
      </div>
    </div>
  );
}
