import '../../styles/ui/filter.scss';

import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";

export default function Filter() {
  return (
    <div className="filter">
      <h1 className=" font-light text-2xl">Search results for <b className='font-semibold'>London</b></h1>

      <div className="top">
        <div className="item">
          <label htmlFor="city">Location</label>
          <input className=' w-full' type="text" name="city" id="city" placeholder="City Location" />
        </div>
      </div>

      <div className="bottom">

        <div className="item">
          <label htmlFor="type">Type</label>
          <select name="type" id="type">
            <option value="">any</option>
            <option value="buy">Buy</option>
            <option value="rent">Rent</option>
          </select>
        </div>

        <div className="item">
          <label htmlFor="property">Property</label>
          <select name="property" id="property">
            <option value="">any</option>
            <option value="apartment">Apartment</option>
            <option value="house">House</option>
            <option value="condo">Condo</option>
            <option value="land">Land</option>
          </select>
        </div>

        <div className="item">
          <label htmlFor="minPrice">Min Price</label>
          <input type="number" name="minPrice" id="minPrice" placeholder="any" />
        </div>

        <div className="item">
          <label htmlFor="maxPrice">Max Price</label>
          <input type="number" name="maxPrice" id="maxPrice" placeholder="any" />
        </div>

        <div className="item">
          <label htmlFor="city">Location</label>
          <input type="text" name="city" id="city" placeholder="City Location" />
        </div>

        <button className="flex items-center gap-5 md:gap-0 text-xl text-gray-100 justify-center border-none cursor-pointer w-[100px] p-5 bg-blue-600 rounded-md">
          <MagnifyingGlassIcon className="w-6 h-6" />
          <span className="inline-block md:hidden">Search</span>
        </button>
      </div>

    </div>
  );
}