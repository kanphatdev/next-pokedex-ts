"use client";
import useSWR from "swr";
import PekeList from "../components/PekeList";

const fetcher = (url: string) => fetch(url).then((r) => r.json());

interface PokemonResult {
  name: string;
  url: string;
}

interface PokemonAPIResponse {
  results: PokemonResult[];
}

export default function ListPage() {
  const { data, error, isLoading } = useSWR<PokemonAPIResponse>(
    "https://pokeapi.co/api/v2/pokemon?limit=50&offset=0", // Reduce limit for performance
    fetcher
  );

  if (isLoading) return <div>
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
  </div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div className="container mx-auto p-4">
      <h1 className="mb-4 font-bold text-lg capitalize">Poke List</h1>
      <div className="flex flex-col gap-4">
        {data?.results.map((poke, i) => {
          const id = poke.url.split("/").filter(Boolean).pop(); // Extract ID from URL
          const imageUrl = id
            ? `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`
            : "";
          return <PekeList key={i} name={poke.name} url={poke.url} imageUrl={imageUrl} />;
        })}
      </div>
    </div>
  );
}
