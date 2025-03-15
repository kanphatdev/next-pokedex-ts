"use client";
import useSWR from "swr";
import PokeCard from "../components/PokeCard";

const fetcher = (url: string) => fetch(url).then((r) => r.json());

interface PokemonResult {
  name: string;
  url: string;
}

interface PokemonAPIResponse {
  results: PokemonResult[];
}

interface PokemonType {
  type: {
    name: string;
  };
}

interface PokemonDetails {
  types: PokemonType[];
}

export default function GridPage() {
  const { data, error, isLoading } = useSWR<PokemonAPIResponse>(
    "https://pokeapi.co/api/v2/pokemon?limit=1302&offset=0",
    fetcher
  );

  if (isLoading)
    return (
      <div className="container mx-auto p-4">
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
  if (error) return <div className="container mx-auto p-4">Error: {error.message}</div>;

  return (
    <div className="container mx-auto p-4 bg-inherit">
      <h1 className="mb-4 text-lg font-bold">Grid</h1>
      <div className="grid 2xl:grid-cols-5 xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 gap-4">
        {data?.results.map((poke, i) => {
          const id = poke.url.split("/").filter(Boolean).pop(); // Extract ID from URL
          const imageUrl = id
            ? `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`
            : "";
          const detailsUrl = poke.url; // URL to fetch more details
          
          return <PokeCard key={i} name={poke.name} imageUrl={imageUrl} detailsUrl={detailsUrl} />;
        })}
      </div>
    </div>
  );
}
