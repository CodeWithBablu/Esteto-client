import { Marker, Popup } from "react-leaflet";
import { Estate, EstateRaw } from "../../lib";
import { Link } from "react-router-dom";

export default function Pin({ estate }: { estate: Estate | EstateRaw }) {

  return (
    <Marker position={[estate.latitude, estate.longitude]}>
      <Popup>
        <div className="popupContainer flex gap-5 min-w-80">
          <img className=" w-[64px] h-[48px] rounded-md object-cover" src={""} alt={estate.title} />

          <div className="textContainer flex flex-col text-wrap whitespace-normal justify-between">
            <Link to={`/${estate.id}`}>{estate.title}</Link>
            <span>{estate.bedroom} bedroom</span>
            <b>$ {estate.price}</b>
          </div>
        </div>
      </Popup>
    </Marker>
  );
}