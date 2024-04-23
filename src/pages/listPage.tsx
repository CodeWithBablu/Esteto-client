import "../styles/pages/listPage.scss";

import { Filter, Map } from "../components";
import Card from "../components/common/Card";
import { listData } from "../lib";

export default function ListPage() {
  return (
    <div className="listPage font-poppins ">
      <div className="listContainer">
        <div className="wrapper no-scrollbar flex h-full flex-col justify-start gap-3 pt-10 sm:gap-10">
          <Filter />

          {listData.map((estate) => (
            <Card key={estate.id} item={estate} />
          ))}
        </div>
      </div>

      <div className="mapContainer relative hidden bg-gray-200 lg:block">
        <div className=" h-full w-full overflow-hidden rounded-t-2xl">
          <Map data={listData} />
        </div>
      </div>
    </div>
  );
}
