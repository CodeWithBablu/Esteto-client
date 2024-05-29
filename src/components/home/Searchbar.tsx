import { toastMessage, useCoordinateStore } from "@/lib";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { FormEvent, useState } from "react";
import { useNavigate } from "react-router-dom";
import PlaceModal from "../common/PlaceModal";

const types = ["buy", "rent"];

interface IFormInput {
  type: 'buy' | 'rent'
  city: string,
  minPrice: string;
  maxPrice: string;
}

export interface City {
  "city": string,
  "coordinates": {
    "lon": number,
    "lat": number
  }
}

export default function Searchbar() {
  const [query, setQuery] = useState<IFormInput>({
    type: "buy",
    city: "",
    minPrice: "",
    maxPrice: "",
  });

  const [city, setCity] = useState<City | null>(null)

  const { setCenterCoordinate } = useCoordinateStore();

  const navigate = useNavigate();

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    setQuery((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    console.log(query);
  };

  const switchType = (val: string) => {
    setQuery((prev) => ({ ...prev, type: val as ('buy' | 'rent') }));
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const data: IFormInput = {
      type: query.type,
      city: city?.city as string | "",
      minPrice: query.minPrice as string | "0",
      maxPrice: query.maxPrice as string | "1000000",
    };

    if (!data.city) {
      toastMessage("alert", "Type in the city name to begin your property search 😅", 4000)
      return;
    }

    if (data.minPrice > data.maxPrice) {
      toastMessage("alert", "The minimum price must be lower than the maximum price 😅", 4000)
      return;
    }

    if (city)
      setCenterCoordinate({ lat: city.coordinates.lat, lon: city.coordinates.lon });
    navigate(`/list?city=${data.city}&type=${data.type}&minPrice=${data.minPrice}&maxPrice=${data.maxPrice}`);
  }

  return (
    <div className="searchbar font-poppins font-medium">
      <div className="type mb-2 flex w-fit text-lg gap-2 rounded-2xl bg-gray-100 p-2 shadow-md">
        {types.map((type) => (
          <button
            key={type}
            onClick={() => switchType(type)}
            className={`cursor-pointer rounded-2xl px-8 py-4 capitalize transition-all duration-[0.5s] ease-linear ${type === query.type ? " bg-zinc-900 text-gray-100 ring-2 ring-zinc-700 ring-offset-2" : " text-zinc-900"}`}
          >
            {type}
          </button>
        ))}
      </div>

      <form
        onSubmit={handleSubmit}
        action="POST"
        className="flex h-auto flex-col justify-between gap-3 overflow-hidden rounded-md border-zinc-500 md:flex-row md:border lg:h-16"
      >
        {/* <input
          onChange={handleChange}
          className="w-full rounded-md border bg-transparent px-3 py-3 outline-none focus:border-blue-600 md:w-[200px] md:border-none"
          type="text"
          id="city"
          name="city"
          placeholder="City Location"
        /> */}

        <PlaceModal type="city" data={city} setData={setCity} />

        <input
          onChange={handleChange}
          className=" w-full rounded-md border bg-transparent px-3 py-3 outline-none focus:border-blue-600 md:w-[140px] md:border-none xl:w-[180px]"
          type="number"
          name="minPrice"
          id="minPrice"
          min={0}
          max={1000000}
          placeholder="Min Price"
        />

        <input
          onChange={handleChange}
          className=" w-full rounded-md border bg-transparent px-3 py-3 outline-none focus:border-blue-600 md:w-[140px] md:border-none xl:w-[180px]"
          type="number"
          name="maxPrice"
          id="maxPrice"
          min={0}
          max={1000000}
          placeholder="Max Price"
        />

        {/* <Link
          to={`/list?city=${query.city}&type=${query.type}&minPrice=${query.minPrice}&maxPrice=${query.maxPrice}`}
          className="flex h-14 w-full cursor-pointer items-center justify-center gap-5 rounded-md border-none bg-blue-600 text-xl text-gray-100 md:h-16 md:w-16 md:gap-0"
        >
          <MagnifyingGlassIcon className="h-6 w-6" />
          <span className="inline-block md:hidden">Search</span>
        </Link> */}
        <button
          type="submit"
          className="flex h-14 w-full cursor-pointer items-center justify-center gap-5 rounded-md border-none bg-blue-600 text-xl text-gray-100 md:h-16 md:w-16 md:gap-0"
        >
          <MagnifyingGlassIcon className="h-6 w-6" />
          <span className="inline-block md:hidden">Search</span>
        </button>
      </form>
    </div>
  );
}
