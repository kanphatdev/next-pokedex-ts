"use client";
import usePokeQuantity from "../context/PokeQuantityContext";
import Link from "next/link";
import Image from "next/image";

interface PokeCardProps {
  name: string;
  imageUrl: string;
  detailsUrl: string;
  types?: string[]; // Mark types as optional
}

export default function PokeCard({ name, imageUrl, detailsUrl, types = [] }: PokeCardProps) {
  const { cart, increase, decrease, removeFromCart } = usePokeQuantity();

  const getPokemonId = (url: string) => {
    const match = url.match(/\/(\d+)\.png$/);
    return match ? parseInt(match[1], 10) : 1;
  };

  const image_id = getPokemonId(imageUrl);
  const quantity = cart.filter((item) => item.name === name).length;

  return (
    <div className="card w-80 bg-base-100 shadow-xl hover:scale-105 transition-transform duration-200">
      <figure className="px-5 pt-5">
        <Image src={imageUrl} alt={name} width={120} height={120} className="rounded-xl" />
      </figure>

      <div className="card-body items-center text-center">
        <h2 className="card-title capitalize text-lg font-bold">{name}</h2>

        {/* Pokémon Type Badges */}
        <div className="flex gap-2">
          {(types || []).map((type) => (
            <span key={type} className="badge badge-outline capitalize">{type}</span>
          ))}
        </div>

        <Link href={detailsUrl} className="btn btn-sm btn-outline btn-primary w-full">
          View Details
        </Link>

        <div className="card-actions mt-2 w-full">
          {quantity > 0 ? (
            <div className="flex items-center gap-2 w-full">
              <button onClick={() => decrease(cart.find((item) => item.name === name)?.uniqueId || "")} className="btn btn-sm btn-secondary flex-1">-</button>
              <span className="text-lg font-bold">{quantity}</span>
              <button onClick={() => increase({ name, image: imageUrl, types: types || [], image_id })} className="btn btn-sm btn-primary flex-1">+</button>
              <button onClick={() => removeFromCart(cart.find((item) => item.name === name)?.uniqueId || "")} className="btn btn-sm btn-error">✖</button>
            </div>
          ) : (
            <button onClick={() => increase({ name, image: imageUrl, types: types || [], image_id })} className="btn btn-sm btn-primary w-full">
              Add to Pocket
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
