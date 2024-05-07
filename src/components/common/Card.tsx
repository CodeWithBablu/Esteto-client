import "../../styles/ui/card.scss";
import { Link } from "react-router-dom";
import { MapIcon } from "@heroicons/react/24/outline";
import { Estate, EstateRaw } from "../../lib";

export default function Card({ item }: { item: EstateRaw | Estate }) {
  return (
    <div className="card flex flex-col md:flex-row shadow-lg md:shadow-none bg-gray-100 md:bg-transparent p-2 rounded-2xl">
      <Link to={`/${item._id}`} className="imgContainer h-[250px]">
        <img src={item.images[0]} alt={item.title} />
      </Link>

      <div className="textContainer flex flex-col gap-3 md:justify-between">
        <h2 className="cardTitle">
          <Link to={`/${item._id}`}>{item.title}</Link>
        </h2>

        <p className="address">
          <MapIcon className="w-5" />
          <span>{item.address}</span>
        </p>

        <p className="price">$ {item.price}</p>

        <div className="bottom flex flex-col items-start gap-3 lg:flex-row lg:items-center lg:justify-between">
          <div className="features">
            <div className="feature">
              <div className="flex items-center gap-2">
                <img src="/assets/icons/bed.png" alt="bed" />
                <span>{item.bedroom}</span>
              </div>
              <span className="">bedroom</span>
            </div>

            <div className="feature">
              <div className="flex items-center gap-2">
                <img src="/assets/icons/bath.png" alt="bath" />
                <span>{item.bathroom}</span>
              </div>
              <span className="">bathroom</span>
            </div>
          </div>

          <div className="icons">
            <img className="icon" src="/assets/icons/save.png" alt="save" />
            <img className="icon" src="/assets/icons/chat.png" alt="chat" />
          </div>
        </div>
      </div>
    </div>
  );
}
