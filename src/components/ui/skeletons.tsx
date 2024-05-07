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