import '../styles/pages/listPage.scss';

import { Filter, Map } from "../components";
import Card from "../components/common/Card";
import { listData } from "../lib";



export default function ListPage() {
  return (
    <div className="listPage font-poppins ">
      <div className="listContainer">
        <div className="wrapper no-scrollbar flex h-full flex-col justify-start pt-10 gap-3 sm:gap-10">

          <Filter />

          {listData.map((estate) => (
            <Card key={estate.id} item={estate} />
          ))}

        </div>
      </div>

      <div className="mapContainer hidden lg:block relative bg-gray-200">
        <div className=' w-full h-full rounded-t-2xl overflow-hidden'><Map data={listData} /></div>
      </div>

    </div>
  );
}