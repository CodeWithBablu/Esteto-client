import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { useState } from "react";

const types = ["Buy", "Rent"];

export default function Searchbar() {
  const [query, setQuery] = useState({
    type: "Buy",
    location: "",
    minPrice: "",
    maxPrice: "",
  });

  const switchType = (val: string) => {
    setQuery((prev) => ({ ...prev, type: val }));
  };

  return (
    <div className="searchbar">
      <div className="type mb-2 flex w-fit gap-2 shadow-md bg-gray-100 rounded-2xl p-2">
        {types.map((type) => (
          <button
            key={type}
            onClick={() => switchType(type)}
            className={`cursor-pointer rounded-2xl px-8 py-4 transition-all duration-[0.5s] ease-linear ${type === query.type ? " bg-zinc-900 text-gray-100 ring-2 ring-zinc-700 ring-offset-2" : " text-zinc-900"}`}
          >
            {type}
          </button>
        ))}
      </div>

      <form
        action="POST"
        className=" flex flex-col overflow-hidden md:flex-row h-auto lg:h-16 justify-between gap-3 rounded-md md:border border-zinc-500"
      >
        <input
          className=" bg-transparent focus:border-blue-600 border rounded-md md:border-none outline-none px-3 py-3 w-full md:w-[200px]"
          type="text"
          name="location"
          id="location"
          placeholder="City Location"
        />

        <input
          className=" bg-transparent focus:border-blue-600 border rounded-md md:border-none outline-none px-3 py-3 w-full md:w-[140px] xl:w-[180px]"
          type="number"
          name="minPrice"
          id="minPrice"
          min={0}
          max={1000000}
          placeholder="Min Price"
        />

        <input
          className=" bg-transparent focus:border-blue-600 border rounded-md md:border-none outline-none px-3 py-3 w-full md:w-[140px] xl:w-[180px]"
          type="number"
          name="maxPrice"
          id="maxPrice"
          min={0}
          max={1000000}
          placeholder="Max Price"
        />

        <button className="flex items-center gap-5 md:gap-0 text-xl text-gray-100 justify-center border-none cursor-pointer h-14 w-full md:w-16 md:h-16 bg-blue-600 rounded-md">
          <MagnifyingGlassIcon className="w-6 h-6" />
          <span className="inline-block md:hidden">Search</span>
        </button>
      </form>
    </div>
  );
}
