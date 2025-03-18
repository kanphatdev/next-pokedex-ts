import usePokeQuantity from "../context/PokeQuantityContext"; 
import Link from "next/link";
import Image from "next/image";

interface PokeCardProps {
  name: string;
  imageUrl: string;
  detailsUrl: string;
}

export default function PokeCard({ name, imageUrl, detailsUrl }: PokeCardProps) {
  const { cart, increase, decrease, removeFromCart } = usePokeQuantity();
  
  // นับจำนวน Pokémon ที่อยู่ใน cart โดยเช็คจาก item.name
  const quantity = cart.filter((item) => item.name === name).length;

  return (
    <div className="card w-80 bg-base-100 shadow-xl hover:scale-105 transition-transform duration-200">
      {/* รูปภาพ */}
      <figure className="px-5 pt-5">
        <Image
          src={imageUrl}
          alt={name}
          width={120}
          height={120}
          className="rounded-xl"
        />
      </figure>

      {/* เนื้อหา */}
      <div className="card-body items-center text-center">
        <h2 className="card-title capitalize text-lg font-bold">{name}</h2>
        
        {/* ปุ่ม Detail */}
        <Link href={`/details/${name}`} className="btn btn-sm btn-outline btn-primary w-full">
          View Details
        </Link>

        {/* ปุ่ม Add / Remove */}
        <div className="card-actions mt-2 w-full">
          {quantity > 0 ? (
            <div className="flex items-center gap-2 w-full">
              <button 
                onClick={() => decrease(name)} 
                className="btn btn-sm btn-secondary flex-1"
              >
                -
              </button>
              <span className="text-lg font-bold">{quantity}</span>
              <button 
                onClick={() => increase({ name, image: imageUrl, types: [] })} 
                className="btn btn-sm btn-primary flex-1"
              >
                +
              </button>
              <button 
                onClick={() => removeFromCart(name)} 
                className="btn btn-sm btn-error"
              >
                ✖
              </button>
            </div>
          ) : (
            <button 
              onClick={() => increase({ name, image: imageUrl, types: [] })} 
              className="btn btn-sm btn-primary w-full"
            >
              Add to Pocket
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
