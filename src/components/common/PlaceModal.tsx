import { Dialog } from "@radix-ui/themes";
import { useState } from "react";
import { useDebouncedCallback } from "use-debounce";
import axios from "axios";
import clsx from "clsx";
import { Country } from "@/pages/newPostPage";
import { City } from "../home/Searchbar";



interface Props<T> {
  type: 'country' | 'city',
  data: T | null,
  setData: React.Dispatch<React.SetStateAction<T | null>>;
}

export default function PlaceModal<T extends Country | City>({ type, data, setData }: Props<T>) {

  const [open, setOpen] = useState(false);
  const [response, setResponse] = useState<T[] | []>([]);

  const handleSearch = useDebouncedCallback(async (term: string) => {

    let query = "";
    if (type === "country")
      query = `https://public.opendatasoft.com/api/explore/v2.1/catalog/datasets/countries-codes/records?select=iso2_code%20as%20iso2%2C%20geo_point_2d%20as%20coordinates%2C%20%20label_en%20as%20country&where=search%28country%2C%22${term.toLowerCase()}%22%29%20AND%20coordinates%20is%20not%20null&limit=20&offset=0&lang=en&timezone=UTC&include_links=false&include_app_metas=false`;

    if (type === "city")
      query = `https://public.opendatasoft.com/api/explore/v2.1/catalog/datasets/geonames-all-cities-with-a-population-1000/records?select=name%20as%20city%2C%20coordinates&where=search%28city%2C%22${term.toLowerCase()}%22%29%20AND%20coordinates%20is%20not%20null&limit=20&offset=0&lang=en&timezone=UTC&include_links=false&include_app_metas=false`;

    const res = await axios.get(query);

    if (res.data.results)
      setResponse(res.data.results);
  }, 500);

  const handleClick = (data: T) => {
    setData(data);
    setResponse([]);
    setOpen(false);
  }

  const handleOpenChange = (isOpen: boolean) => {
    setOpen(isOpen);
  };

  return (
    <div>
      <Dialog.Root open={open} onOpenChange={handleOpenChange}>
        <Dialog.Trigger>
          <div className="item h-full">
            {type === "country" &&
              <label htmlFor="country">
                {type === 'country' && 'Country'}
                <span className="text-rose-500">*</span>
              </label>}
            <input
              id="country"
              value={data ? (type === 'country' ? (data as Country).country : (data as City).city) : (type === 'country' ? 'select country' : 'City Location')}
              name="country"
              type="text"
              className={clsx(
                'placeholder-gray-400 w-full h-full',
                {
                  'w-full rounded-md border bg-transparent px-3 py-3 outline-none focus:border-blue-600 md:w-[200px] md:border-none': type === "city",
                  'text-gray-400': !data,
                  'text-zinc-800': data
                })}
              placeholder={type === 'country' ? 'select country' : 'City Location'}
              autoComplete="off"
            />
          </div>
        </Dialog.Trigger>

        <Dialog.Content className=" relative w-[95%] max-w-[600px] bg-zinc-950/80 p-3 backdrop-blur-md sm:w-[450px]">
          <input
            id="search"
            onChange={(e) => handleSearch(e.target.value)}
            className="z-10 h-14 w-full rounded-lg border-2 border-zinc-700 bg-zinc-800 px-6 text-gray-100 outline-none focus:border-indigo-500"
            placeholder="search location"
            autoComplete="off"
            type="text"
          />

          <div className=" mt-2 flex max-h-[30dvh] w-full flex-col gap-1 overflow-y-scroll font-poppins ">
            {response.length === 0 && (
              <>
                <span className="my-3 text-indigo-400">*Nothing to show</span>
              </>
            )}
            {response.length > 0 && (
              <>
                {response.map((item: T, index) => (
                  <span
                    className="cursor-pointer rounded-md px-6 py-1 text-gray-100 hover:bg-blue-500"
                    key={index}
                    onClick={() => handleClick(item)}
                  >
                    {type === 'country' ? `${(item as Country).country} (${(item as Country).iso2}) ` : (item as City).city}
                  </span>
                ))}
              </>
            )}
          </div>
        </Dialog.Content>
      </Dialog.Root>
    </div>
  );
}
