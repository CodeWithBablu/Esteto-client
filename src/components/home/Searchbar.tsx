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
      <div className="type mb-2 flex w-fit gap-2 rounded-2xl bg-gray-100 p-2 shadow-md">
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
        className=" flex h-auto flex-col justify-between gap-3 overflow-hidden rounded-md border-zinc-500 md:flex-row md:border lg:h-16"
      >
        <input
          className=" w-full rounded-md border bg-transparent px-3 py-3 outline-none focus:border-blue-600 md:w-[200px] md:border-none"
          type="text"
          name="location"
          id="location"
          placeholder="City Location"
        />

        <input
          className=" w-full rounded-md border bg-transparent px-3 py-3 outline-none focus:border-blue-600 md:w-[140px] md:border-none xl:w-[180px]"
          type="number"
          name="minPrice"
          id="minPrice"
          min={0}
          max={1000000}
          placeholder="Min Price"
        />

        <input
          className=" w-full rounded-md border bg-transparent px-3 py-3 outline-none focus:border-blue-600 md:w-[140px] md:border-none xl:w-[180px]"
          type="number"
          name="maxPrice"
          id="maxPrice"
          min={0}
          max={1000000}
          placeholder="Max Price"
        />

        <button className="flex h-14 w-full cursor-pointer items-center justify-center gap-5 rounded-md border-none bg-blue-600 text-xl text-gray-100 md:h-16 md:w-16 md:gap-0">
          <MagnifyingGlassIcon className="h-6 w-6" />
          <span className="inline-block md:hidden">Search</span>
        </button>
      </form>
    </div>
  );
}
