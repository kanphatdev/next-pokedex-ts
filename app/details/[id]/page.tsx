"use client";

import useSWR from "swr";
import { useParams } from "next/navigation";
import PokeDetailCard from "@/app/components/PokeDetailCard";

interface PokemonData {
  id: number;
  name: string;
  height: number;
  weight: number;
  sprites: {
    front_default: string;
    other: {
      "official-artwork": {
        front_default: string;
      };
    };
  };
  types: {
    slot: number;
    type: {
      name: string;
    };
  }[];
}

const fetcher = (url: string) => fetch(url).then((res) => res.json());

export default function PokeDetailPage() {
  const params = useParams();
  const { data, error, isLoading } = useSWR<PokemonData>(
    `https://pokeapi.co/api/v2/pokemon/${params.id}`,
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

  if (error) return <div className="text-red-500">Error: {error.message}</div>;

  if (!data) return <div>No Pokémon found!</div>;

  return <PokeDetailCard pokemon={data} />;
}
