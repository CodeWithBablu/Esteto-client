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

      <div className="bottom grid grid-flow-row grid-cols-3 md:grid-cols-5 gap-y-5 gap-x-2 md:gap-y-0">

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
          <label htmlFor="city">Location</label>
          <input type="text" name="city" id="city" placeholder="City Location" />
        </div>

        <div className="item">
          <label htmlFor="minPrice">Min Price</label>
          <input type="number" name="minPrice" id="minPrice" placeholder="any" />
        </div>

        <div className="item">
          <label htmlFor="maxPrice">Max Price</label>
          <input type="number" name="maxPrice" id="maxPrice" placeholder="any" />
        </div>

      </div>

      <button className="flex items-center justify-center gap-5 text-xl text-gray-100 border-none cursor-pointer flex-grow h-14 min-w-[100px] bg-blue-600 rounded-md">
        <MagnifyingGlassIcon className="inline-block w-6 h-6" />
        <span className='inline-block'>Search</span>
      </button>

    </div>
  );
}