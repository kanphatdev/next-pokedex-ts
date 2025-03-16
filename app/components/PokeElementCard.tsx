import { ShoppingBasket } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

interface PokemonData {
  name: string;
  image: string | null;
  types: { type: { name: string } }[];
}

interface PokeElementCardProps {
  pokemon: PokemonData;
}

export default function PokeElementCard({ pokemon }: PokeElementCardProps) {
  const defaultImage = "/placeholder.png"; // Provide a valid default image

  return (
    <div className="card bg-base-100 w-80 shadow-sm p-4">
      <figure className="px-6 pt-6 flex justify-center">
        <Image
          src={pokemon.image || defaultImage} // Use fallback if image is missing
          alt={pokemon.name}
          width={120}
          height={120}
          className="rounded-xl"
        />
      </figure>
      <div className="card-body items-center text-center">
        <h2 className="card-title capitalize">{pokemon.name}</h2>

        {/* Pokémon Type Badges */}
        <div className="flex gap-2">
          {pokemon.types.map((t) => (
            <span key={t.type.name} className="badge badge-soft badge-info capitalize">
              {t.type.name}
            </span>
          ))}
        </div>

        <div className="card-actions">
          <Link href={`/details/${pokemon.name}`} className="btn btn-info">
            Detail
          </Link>
          <button className="btn btn-dash btn-info">
            <ShoppingBasket />
          </button>
        </div>
      </div>
    </div>
  );
}
