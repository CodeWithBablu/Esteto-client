import "../styles/pages/listPage.scss";

import { Suspense } from "react";
import { Await, useLoaderData } from "react-router-dom";
import { CardSkeleton, Filter, Map, MapSkeleton } from "../components";
import Card from "../components/common/Card";
import { EstateRaw } from "@/lib";

export default function ListPage() {
  const res = useLoaderData() as { posts: Promise<EstateRaw[]> };

  return (
    <div className="listPage font-poppins">
      <div className="listContainer">
        <div className="wrapper no-scrollbar flex h-full flex-col justify-start gap-3 pt-10 sm:gap-10">
          <Filter />
          <Suspense fallback={<><CardSkeleton /><CardSkeleton /></>}>
            <Await
              resolve={res.posts}
              errorElement={<p>Error loading posts!</p>}
            >
              {(postResponse: { data: { value: EstateRaw[] } }) => (
                postResponse.data.value.map((estate) => (
                  <Card key={estate._id} item={estate} />
                ))
              )}
            </Await>
          </Suspense>
        </div>
      </div>

      <div className="mapContainer relative hidden bg-gray-200 lg:block">
        <div className=" h-full w-full overflow-hidden rounded-t-2xl">
          <Suspense fallback={<MapSkeleton />}>
            <Await
              resolve={res.posts}
              errorElement={<p>Error loading posts!</p>}
            >
              {(postResponse: { data: { value: EstateRaw[] } }) => (
                <Map data={postResponse.data.value} />
              )}
            </Await>
          </Suspense>
        </div>
      </div>
    </div>
  );
}
