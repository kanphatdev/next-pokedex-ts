import { BookOpen, ShoppingBasket } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import useSWR from "swr";

const fetcher = (url: string) => fetch(url).then((r) => r.json());

interface PekeListProps {
  name: string;
  url: string;
  imageUrl: string;
}

interface PokemonType {
  type: { name: string };
}

interface PokemonDetails {
  types: PokemonType[];
}

export default function PekeList({ name, url, imageUrl }: PekeListProps) {
  const { data, error } = useSWR<PokemonDetails>(url, fetcher);

  return (
    <ul className="list bg-base-100 rounded-box shadow-md w-full">
      <li className="list-row flex items-center gap-4 p-4 w-full shadow-inner my-4 bg-base-200">
        <div>
          <Image className="rounded-box" src={imageUrl} alt={name} width={50} height={50} />
        </div>
        <div className="flex-1">
          <div className="font-bold capitalize text-lg">{name}</div>
          <div className="flex gap-1 mt-1">
            {data?.types.map((typeInfo, index) => (
              <div key={index} className="badge badge-soft badge-accent capitalize">
                {typeInfo.type.name}
              </div>
            ))}
          </div>
        </div>
        <div className="flex gap-2">
          <button className="btn btn-primary capitalize" title="Add to Pocket">
            <ShoppingBasket />
          </button>
          <Link
          href={`/details/${name}`} className="btn btn-secondary capitalize">
            <BookOpen />
          </Link>
        </div>
      </li>
    </ul>
  );
}
