import { ChevronLeftIcon, PaperAirplaneIcon } from "@heroicons/react/24/outline";

export function CardSkeleton() {
  return (
    <div className="card flex flex-col md:flex-row shadow-lg md:shadow-none bg-gray-100 md:bg-transparent p-2 rounded-2xl animate-pulse">
      <div className="imgContainer h-[250px] bg-gray-200"></div>

      <div className="textContainer flex flex-col gap-3 md:justify-between">
        <h2 className="cardTitle">
          <div className="h-4 bg-gray-200 rounded w-1/2"></div>
        </h2>

        <div className="address flex items-center gap-2">
          <div className="w-5 h-5 bg-gray-200 rounded"></div>
          <div className="w-1/2 h-4 bg-gray-200 rounded"></div>
        </div>

        <div className="price h-5 bg-gray-200 rounded w-1/3"></div>

        <div className="bottom flex flex-col items-start gap-3 lg:flex-row lg:items-center lg:justify-between">
          <div className="features">
            <div className="feature">
              <div className="flex items-center gap-2">
                <div className="w-5 h-5 bg-gray-200 rounded"></div>
                <div className="w-10 h-4 bg-gray-200 rounded"></div>
              </div>
              <div className="h-4 bg-gray-200 rounded w-full"></div>
            </div>

            <div className="feature">
              <div className="flex items-center gap-2">
                <div className="w-5 h-5 bg-gray-200 rounded"></div>
                <div className="w-10 h-4 bg-gray-200 rounded"></div>
              </div>
              <div className="h-4 bg-gray-200 rounded w-full"></div>
            </div>
          </div>

          <div className="icon flex">
            <div className=" w-8 h-8 bg-gray-200 rounded mr-4"></div>
            <div className=" w-8 h-8 bg-gray-200 rounded"></div>
          </div>
        </div>
      </div>
    </div>
  );
}


export function MapSkeleton() {
  return (
    <div className="flex flex-col gap-3 items-center justify-center w-full h-full">
      <span className="font-medium font-chillax text-2xl">Loading <span className="animate-bounce inline-block">...</span></span>
      <img src="/assets/icons/map.gif" alt="" />
    </div>
  );
}


export function ChatSkeleton() {
  return (
    <div className="animate-pulse flex flex-col w-full h-full">
      <div className="flex w-full items-center justify-between gap-2 bg-zinc-800 py-2 px-2">
        <ChevronLeftIcon className="w-8 h-8 text-zinc-600" />
        <div className="text-center">
          <div className="h-4 w-32 bg-zinc-700 rounded"></div>
          <div className="flex items-center gap-2 mt-2">
            <div className="w-2 h-2 bg-zinc-700 rounded-md"></div>
            <div className="w-16 h-4 bg-zinc-700 rounded-full"></div>
          </div>
        </div>
        <div className="h-12 w-12 rounded-full bg-zinc-700"></div>
      </div>

      <div className="h-full flex flex-1 flex-col w-full overflow-y-scroll pb-10 mt-10">

        <div className="flex flex-col gap-2 mt-5 h-20 w-full">
          <div className="bg-zinc-800 ml-5 sm:ml-10 h-full w-3/4 rounded-r-2xl rounded-t-2xl rounded-bl-none">
            <div className="h-4 rounded"></div>
          </div>

          <div className="w-16 h-4 ml-5 sm:ml-10 bg-zinc-700 rounded"></div>
        </div>

        <div className="flex flex-col mt-5 h-32 gap-2 items-end w-full">
          <div className="bg-indigo-600 mr-5 sm:mr-10 h-full w-3/4 rounded-l-2xl rounded-t-2xl rounded-br-none">
            <div className="h-4 rounded"></div>
          </div>

          <div className="w-16 h-4 mr-5 sm:mr-10 bg-zinc-700  rounded"></div>
        </div>

        <div className="flex flex-col gap-2 mt-5 h-20 w-full">
          <div className="bg-zinc-800 ml-5 sm:ml-10 h-full w-3/4 rounded-r-2xl rounded-t-2xl rounded-bl-none">
            <div className="h-4 rounded"></div>
          </div>

          <div className="w-16 h-4 ml-5 sm:ml-10 bg-zinc-700 rounded"></div>
        </div>

        <div className="flex flex-col mt-5 h-32 gap-2 items-end w-full">
          <div className="bg-indigo-600 mr-5 sm:mr-10 h-full w-3/4 rounded-l-2xl rounded-t-2xl rounded-br-none">
            <div className="h-4 rounded"></div>
          </div>

          <div className="w-16 h-4 mr-5 sm:mr-10 bg-zinc-700  rounded"></div>
        </div>

      </div>

      <div className=" flex w-full items-center justify-center h-24 px-5 bg-zinc-800/60">
        <div className="relative flex items-center h-full w-full gap-2 sm:w-3/4">
          <textarea className="relative h-[60px] w-full resize-none bg-zinc-800 py-3 rounded-3xl"></textarea>
          <button className="absolute right-2 h-[50px] w-[50px] flex items-center justify-center rounded-full bg-lime-500">
            <PaperAirplaneIcon className="h-6 w-6 -rotate-45 sm:h-8 sm:w-8" />
          </button>
        </div>
      </div>
    </div>
  )
}