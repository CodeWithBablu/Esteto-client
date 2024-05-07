import "leaflet/dist/leaflet.css";

import { MapContainer, TileLayer } from "react-leaflet";
import { Estate, EstateRaw } from "../../lib";
import Pin from "./Pin";
// const positions = [51.505, -0.09];

export default function Map({ data }: { data: Estate[] | EstateRaw[] }) {

  return (
    <MapContainer
      className="z-10 h-full w-full bg-zinc-900"
      center={
        data.length === 1
          ? [parseInt(data[0].latitude), parseInt(data[0].longitude)]
          : [52.4749, -1.90269]
      }
      zoom={7}
      scrollWheelZoom={false}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {data.map((estate) => (
        <Pin key={estate._id} estate={estate} />
      ))}
    </MapContainer>
  );
}
