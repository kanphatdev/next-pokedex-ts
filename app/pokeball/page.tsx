"use client"
import Image from "next/image";
import usePokeQuantity from "../context/PokeQuantityContext";

export default function PokemonCart() {
  const { cart, decrease, removeFromCart, getPokeQuantityItems } = usePokeQuantity();

  return (
    <div className="flex flex-col lg:flex-row gap-8 p-6 bg-base-100 min-h-screen">
      {/* Pokemon List */}
      <div className="bg-base-300 shadow-md rounded-lg p-6 flex-1">
        <h2 className="text-xl font-bold mb-4">Pocket List ({getPokeQuantityItems()})</h2>
        <div className="w-full overflow-x-auto">
          <table className="table w-full">
            <thead>
              <tr>
                <th className="text-left">Product Name</th>
                <th className="text-center">Quantity</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {cart.map((pokemon) => (
                <tr key={pokemon.uniqueId} className="border-b">
                  <td className="flex items-center gap-4 p-4">
                    <Image src={pokemon.image} alt={pokemon.name} width={50} height={50} className="rounded" />
                    <div>
                      <p className="font-semibold">{pokemon.name}</p>
                      <div className="flex gap-1">
                        {pokemon.types.map((type) => (
                          <span key={type} className="badge badge-warning badge-sm capitalize">{type}</span>
                        ))}
                      </div>
                    </div>
                  </td>
                  <td className="text-center text-lg">1</td>
                  <td>
                    <button onClick={() => decrease(pokemon.uniqueId)} className="btn btn-sm btn-warning">-</button>
                    <button onClick={() => removeFromCart(pokemon.uniqueId)} className="btn btn-sm btn-error ml-2">🗑</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Order Summary */}
      <div className="shadow-md rounded-lg p-6 w-full lg:w-1/3">
        <h2 className="text-xl font-bold mb-4">Order Summary</h2>
        <div className="flex justify-between border-b pb-2">
          <span>Subtotal</span>
          <span className="font-bold">{getPokeQuantityItems()} Product</span>
        </div>
        <button className="btn btn-primary w-full mt-4">Proceed To Checkout</button>
      </div>
    </div>
  );
}
