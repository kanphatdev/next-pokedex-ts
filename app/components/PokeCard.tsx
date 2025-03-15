'use client'
import Image from "next/image";
import { ShoppingBasket } from "lucide-react";
import useSWR from "swr";
import Link from "next/link";

interface PokeCardProps {
  name: string;
  imageUrl: string;
  detailsUrl: string;
}

interface PokemonType {
  type: {
    name: string;
  };
}

interface PokemonDetails {
  types: PokemonType[];
}

const fetcher = (url: string) => fetch(url).then((res) => res.json());

export default function PokeCard({ name, imageUrl, detailsUrl }: PokeCardProps) {
  const { data } = useSWR<PokemonDetails>(detailsUrl, fetcher);

  return (
    <div className="card bg-base-100 w-96 shadow-sm">
      <figure className="px-10 pt-10">
        <Image
          src={imageUrl}
          alt={name}
          width={120}
          height={120}
          className="rounded-xl"
        />
      </figure>
      <div className="card-body items-center text-center">
        <h2 className="card-title capitalize">{name}</h2>
        <div className="flex gap-2 flex-wrap justify-center">
          {data?.types.map((t, index) => (
            <div key={index} className="badge badge-soft badge-primary capitalize">
              {t.type.name}
            </div>
          ))}
        </div>
        <div className="card-actions">
          <Link href={`/details/${name}`} className="btn btn-primary capitalize">Detail</Link>
          <button className="btn btn-dash btn-primary capitalize" title="Add to Pocket">
            <ShoppingBasket />
          </button>
        </div>
      </div>
    </div>
  );
}
