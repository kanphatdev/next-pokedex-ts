"use client";
import { useState, useEffect } from "react";
import usePokeQuantity from "../context/PokeQuantityContext"; 
import { Trash2 } from "lucide-react";
import Image from "next/image";

export default function PokeCartCard() {
  const { cart, removeFromCart } = usePokeQuantity();
  const [cartItems, setCartItems] = useState(cart); // ใช้ค่าเริ่มต้นจาก `cart`

  useEffect(() => {
    setCartItems(cart); // อัปเดตค่าเมื่อ `cart` เปลี่ยนแปลง
  }, [cart]);

  // ถ้า `cartItems` ยังโหลดไม่เสร็จ
  if (!cartItems) {
    return <p className="text-center text-gray-500">Loading...</p>;
  }

  return (
    <div className="w-full p-4 flex flex-wrap justify-center gap-4">
      {cartItems.length > 0 ? (
        cartItems.map((pokemon) => (
          <div key={pokemon.uniqueId} className="card bg-base-100 shadow-md w-80">
            <figure className="w-full">
              <Image src={pokemon.image} alt={pokemon.name} width={384} height={216} className="object-cover w-full h-48" />
            </figure>

            <div className="card-body">
              <h2 className="card-title capitalize">{pokemon.name}</h2>

              {/* Pokémon Type Badges */}
              <div className="flex gap-2">
                {pokemon.types.map((type) => (
                  <span key={type} className="badge badge-outline capitalize">{type}</span>
                ))}
              </div>

              <div className="card-actions justify-end">
                <button className="btn btn-error flex items-center gap-2" onClick={() => removeFromCart(pokemon.uniqueId)}>
                  <Trash2 size={16} /> Remove
                </button>
              </div>
            </div>
          </div>
        ))
      ) : (
        <p className="text-center text-gray-500">No Pokémon in cart</p>
      )}
    </div>
  );
}
