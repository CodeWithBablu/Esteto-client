import "../styles/pages/listPage.scss";

import { Suspense } from "react";
import { Await, useLoaderData } from "react-router-dom";
import { CardSkeleton, Filter, List, Map, MapSkeleton } from "../components";
// import Card from "../components/common/Card";
import { EstateRaw } from "@/lib";

export default function ListPage() {
  const res = useLoaderData() as { posts: Promise<EstateRaw[]> };

  return (
    <div className="listPage font-poppins mb-10">
      <div className="listContainer no-scrollbar">
        <div className="wrapper no-scrollbar flex h-full flex-col justify-start gap-3 pt-10 sm:gap-10">
          <Filter />
          <Suspense
            fallback={
              <>
                <CardSkeleton />
                <CardSkeleton />
              </>
            }
          >
            <Await
              resolve={res.posts}
              errorElement={
                <div className=" w-full flex flex-col items-center">
                  <span className="text-xl font-chillax font-medium animate-pulse">Some technical glitch occured</span>
                  <img src="/assets/icons/oops.png" alt="search" className="h-[15rem] w-[15rem] object-contain" />
                </div>}
            >
              {(postResponse: { data: { value: EstateRaw[] } }) => {
                console.log(postResponse.data);
                if (postResponse.data.value.length > 0)
                  return <List listData={postResponse.data.value} btnDisabled={false} />;
                else
                  return (<div className=" w-full flex flex-col items-center">
                    <span className="text-2xl font-chillax font-medium animate-pulse">No property found</span>
                    <img src="/assets/icons/search.gif" alt="search" className="h-[20rem] w-[20rem] md:h-[25rem] md:w-[25rem] object-cover" />
                  </div>
                  )
              }
                // postResponse.data.value.map((estate) => (
                //   // <Card key={estate._id} item={estate} btnDisabled={false} />
                // ))
              }
            </Await>
          </Suspense>
        </div>
      </div>

      <div className="mapContainer relative bg-slate-100">
        <div className="h-full lg:h-[70%] xl:h-[90%] w-full overflow-hidden rounded-2xl lg:rounded-t-2xl">
          <Suspense fallback={<MapSkeleton loading={true} />}>
            <Await
              resolve={res.posts}
              errorElement={<p>Some technical glitch occured</p>}
            >
              {(postResponse: { data: { value: EstateRaw[] } }) => {
                if (postResponse.data.value.length > 0)
                  return <Map data={postResponse.data.value} />
                else
                  return <MapSkeleton loading={false} />
              }}
            </Await>
          </Suspense>
        </div>
      </div>
    </div>
  );
}
