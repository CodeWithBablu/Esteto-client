import { useState } from "react";
import "../../styles/ui/filter.scss";

import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { Link, useSearchParams } from "react-router-dom";

export default function Filter() {
  const [searchParams, setSearchParams] = useSearchParams();

  const [query, setQuery] = useState({
    city: searchParams.get("city") || "",
    type: searchParams.get("type") || "",
    property: searchParams.get("property") || "",
    bedroom: searchParams.get("bedroom") || "",
    minPrice: searchParams.get("minPrice") || "0",
    maxPrice: searchParams.get("maxPrice") || "1000000",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    setQuery((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    console.log(query);
  };

  return (
    <div className="filter">
      <h1 className=" text-2xl font-light">
        Search results for{" "}
        <b className="font-semibold">{searchParams.get("city")}</b>
      </h1>

      <form>
        <div className="top">
          <div className="item flex-1">
            <label htmlFor="city">City</label>
            <input
              onChange={handleChange}
              type="text"
              name="city"
              id="city"
              placeholder="City Location"
              defaultValue={query.city}
            />
          </div>

          <div className="item flex-1">
            <label htmlFor="type">Type</label>
            <select
              onChange={handleChange}
              defaultValue={query.type}
              name="type"
              id="type"
            >
              <option value="">any</option>
              <option value="buy">Buy</option>
              <option value="rent">Rent</option>
            </select>
          </div>
        </div>

        <div className="bottom grid grid-flow-row grid-cols-2 gap-x-2 gap-y-5 md:grid-cols-4 md:gap-y-0">
          <div className="item">
            <label htmlFor="property">Property</label>
            <select
              onChange={handleChange}
              defaultValue={query.property}
              name="property"
              id="property"
            >
              <option value="">any</option>
              <option value="apartment">Apartment</option>
              <option value="house">House</option>
              <option value="condo">Condo</option>
              <option value="land">Land</option>
            </select>
          </div>

          <div className="item">
            <label htmlFor="bedroom">Bedroom</label>
            <input
              onChange={handleChange}
              type="number"
              min={0}
              max={1000}
              name="bedroom"
              id="bedroom"
              placeholder="any"
              defaultValue={query.bedroom}
            />
          </div>

          <div className="item">
            <label htmlFor="minPrice">Min Price</label>
            <input
              onChange={handleChange}
              type="number"
              min={0}
              max={1000000}
              name="minPrice"
              id="minPrice"
              placeholder="any"
              defaultValue={query.minPrice}
            />
          </div>

          <div className="item">
            <label htmlFor="maxPrice">Max Price</label>
            <input
              onChange={handleChange}
              type="number"
              min={0}
              max={1000000}
              name="maxPrice"
              id="maxPrice"
              placeholder="any"
              defaultValue={query.maxPrice}
            />
          </div>
        </div>

        <Link
          to={`/list?city=${query.city}&type=${query.type}&property=${query.property}&bedroom=${query.bedroom}&minPrice=${query.minPrice}&maxPrice=${query.maxPrice}`}
          className="mt-5 flex h-14 min-w-[100px] flex-grow cursor-pointer items-center justify-center gap-5 rounded-md border-none bg-blue-600 px-6 text-xl text-gray-100"
        >
          <MagnifyingGlassIcon className="inline-block h-6 w-6" />
          <span className="inline-block">Search</span>
        </Link>
      </form>
    </div>
  );
}
