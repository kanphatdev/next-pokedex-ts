import { ShoppingBasket } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import usePokeQuantity from "../context/PokeQuantityContext";

interface PokemonData {
  name: string;
  image: string | null;
  types: { type: { name: string } }[];
}

interface PokeElementCardProps {
  pokemon: PokemonData;
}

export default function PokeElementCard({ pokemon }: PokeElementCardProps) {
  const { cart, increase, decrease, removeFromCart } = usePokeQuantity();
  
  // ✅ คำนวณจำนวน Pokémon ใน cart โดยอิงจากชื่อ
  const quantity = cart.filter((item) => item.name === pokemon.name).length;

  // ✅ หา uniqueId ตัวแรกของ Pokémon ใน cart
  const firstUniqueId = cart.find((item) => item.name === pokemon.name)?.uniqueId;

  const defaultImage = "../img/Poke_Ball.webp"; // Provide a valid default image

  return (
    <div className="card w-80 bg-base-100 shadow-md hover:shadow-lg transition-shadow duration-200 p-4">
      {/* รูป Pokémon */}
      <figure className="px-6 pt-6 flex justify-center">
        <Image
          src={pokemon.image || defaultImage}
          alt={pokemon.name}
          width={120}
          height={120}
          className="rounded-xl"
        />
      </figure>

      {/* ข้อมูล Pokémon */}
      <div className="card-body items-center text-center">
        <h2 className="card-title capitalize text-lg font-bold">{pokemon.name}</h2>

        {/* ประเภทของ Pokémon */}
        <div className="flex flex-wrap gap-2 mt-2">
          {pokemon.types.map((t) => (
            <span key={t.type.name} className="badge badge-outline capitalize">
              {t.type.name}
            </span>
          ))}
        </div>

        {/* ปุ่ม Detail & Add to Pocket */}
        <div className="card-actions mt-4 w-full">
          <Link href={`/details/${pokemon.name}`} className="btn btn-sm btn-outline btn-info w-full">
            Detail
          </Link>

          {/* แสดงปุ่ม Increase/Decrease ถ้ามี Pokémon ใน Pocket */}
          {quantity > 0 ? (
            <div className="flex items-center gap-2 w-full mt-2">
              <button 
                onClick={() => firstUniqueId && decrease(firstUniqueId)} 
                className="btn btn-sm btn-secondary flex-1"
              >
                -
              </button>
              <span className="text-lg font-bold">{quantity}</span>
              {/* ✅ ส่ง object ที่ถูกต้องไปยัง increase */}
              <button 
                onClick={() => increase({ 
                  name: pokemon.name, 
                  image: pokemon.image || defaultImage, 
                  types: pokemon.types.map(t => t.type.name) 
                })} 
                className="btn btn-sm btn-primary flex-1"
              >
                +
              </button>
              <button 
                onClick={() => firstUniqueId && removeFromCart(firstUniqueId)} 
                className="btn btn-sm btn-error"
              >
                ✖
              </button>
            </div>
          ) : (
            <button 
              onClick={() => increase({ 
                name: pokemon.name, 
                image: pokemon.image || defaultImage, 
                types: pokemon.types.map(t => t.type.name) 
              })} 
              className="btn btn-sm btn-primary w-full mt-2"
            >
              <ShoppingBasket className="mr-2" /> Add to Pocket
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
