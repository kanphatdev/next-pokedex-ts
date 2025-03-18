import { ArrowLeft } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import usePokeQuantity from "../context/PokeQuantityContext"; // ✅ เพิ่มการใช้งาน Cart

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
  stats: {
    base_stat: number;
    stat: {
      name: string;
    };
  }[];
}

interface PokeDetailCardProps {
  pokemon: PokemonData;
}

export default function PokeDetailCard({ pokemon }: PokeDetailCardProps) {
  const { cart, increase, decrease, removeFromCart } = usePokeQuantity();

  // นับจำนวน Pokémon ที่มีอยู่ใน cart
  const quantity = cart.filter((item) => item.name === pokemon.name).length;

  return (
    <div className="card bg-base-100 shadow-sm p-4 flex flex-col items-center text-center">
      {/* รูปภาพ */}
      <figure className="w-64 h-64 flex justify-center items-center">
        <Image
          src={pokemon.sprites.other["official-artwork"].front_default}
          alt={pokemon.name}
          width={200}
          height={200}
          className="rounded-xl"
        />
      </figure>

      <div className="card-body w-full max-w-lg">
        <h2 className="card-title capitalize text-2xl font-bold">{pokemon.name}</h2>

        <div className="flex flex-col gap-2">
          <ul className="list bg-base-100 rounded-box shadow-md p-4">
            <li className="list-row flex items-center gap-4">
              <div className="w-24 font-semibold text-xs">Height</div>
              <progress className="progress w-full" value={pokemon.height} max="50"></progress>
            </li>

            <li className="list-row flex items-center gap-4">
              <div className="w-24 font-semibold text-xs">Weight</div>
              <progress className="progress w-full" value={pokemon.weight} max="200"></progress>
            </li>

            {pokemon.stats.map((stat) => (
              <li key={stat.stat.name} className="list-row flex items-center gap-4">
                <div className="w-24 font-semibold capitalize text-xs">{stat.stat.name}</div>
                <progress className="progress w-full" value={stat.base_stat} max="200"></progress>
              </li>
            ))}
          </ul>

          {/* แสดงประเภทของ Pokémon */}
          <div className="flex gap-2 justify-center mt-4">
            {pokemon.types.map((t) => (
              <span key={t.type.name} className="badge badge-soft badge-accent text-sm capitalize">
                {t.type.name}
              </span>
            ))}
          </div>
        </div>

        {/* ปุ่มเพิ่ม / ลด / ลบ Pokémon */}
        <div className="card-actions flex flex-col gap-2 mt-4">
          {quantity > 0 ? (
            <div className="flex items-center gap-2 w-full">
              <button onClick={() => decrease(pokemon.name)} className="btn btn-sm btn-secondary flex-1">-</button>
              <span className="text-lg font-bold">{quantity}</span>
              <button onClick={() => increase({ name: pokemon.name, image: pokemon.sprites.front_default, types: [] })} className="btn btn-sm btn-primary flex-1">+</button>
              <button onClick={() => removeFromCart(pokemon.name)} className="btn btn-sm btn-error">✖</button>
            </div>
          ) : (
            <button onClick={() => increase({ name: pokemon.name, image: pokemon.sprites.front_default, types: [] })} className="btn btn-sm btn-primary w-full">
              Add to Pocket
            </button>
          )}
        </div>

        {/* ปุ่มย้อนกลับ */}
        <div className="card-actions justify-center mt-4">
          <Link href=".." className="btn btn-primary capitalize">
            <ArrowLeft /> Back
          </Link>
        </div>
      </div>
    </div>
  );
}
