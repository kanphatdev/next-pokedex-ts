"use client";
import PokeElementCard from "@/app/components/PokeElementCard";
import { useParams } from "next/navigation";
import useSWR from "swr";

const fetcher = (url: string) => fetch(url).then((r) => r.json());

export default function PokeElementPage() {
  const params = useParams();
  const { data, error, isLoading } = useSWR(
    `https://pokeapi.co/api/v2/type/${params.id}`,
    fetcher
  );

  if (isLoading)
    return (
      <div>
        <div className="flex w-52 flex-col gap-4">
          <div className="flex items-center gap-4">
            <div className="skeleton h-16 w-16 shrink-0 rounded-full"></div>
            <div className="flex flex-col gap-4">
              <div className="skeleton h-4 w-20"></div>
              <div className="skeleton h-4 w-28"></div>
            </div>
          </div>
          <div className="skeleton h-32 w-full"></div>
        </div>
      </div>
    );
  if (error) return <div>Error: {error.message}</div>;

  // Get Pokémon list from API response
  const pokemonList = data.pokemon.map((p) => p.pokemon);

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold capitalize mb-4">
        {params.id} Type Pokémon
      </h1>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {pokemonList.map((poke) => (
          <PokeCardFetcher key={poke.name} url={poke.url} />
        ))}
      </div>
    </div>
  );
}

// Fetch detailed Pokémon data
function PokeCardFetcher({ url }: { url: string }) {
  const { data, error } = useSWR(url, fetcher);

  if (!data) return <div>Loading...</div>;
  if (error) return <div>Error loading Pokémon</div>;

  const pokemonData = {
    name: data.name,
    image: data.sprites.other["official-artwork"].front_default,
    types: data.types,
  };

  return <PokeElementCard pokemon={pokemonData} />;
}
