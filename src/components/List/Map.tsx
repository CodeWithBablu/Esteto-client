import "leaflet/dist/leaflet.css";

import { MapContainer, TileLayer } from "react-leaflet";
import { Estate, EstateRaw, useCoordinateStore } from "../../lib";
import Pin from "./Pin";

export default function Map({ data }: { data: Estate[] | EstateRaw[] }) {
  console.log(data);
  const { coordinate } = useCoordinateStore();
  return (
    <MapContainer
      className="z-10 h-full w-full bg-zinc-900"
      center={
        coordinate
          ? [coordinate.lat, coordinate.lon]
          : [parseFloat(data[0].latitude), parseFloat(data[0].longitude)]
      }
      zoom={8}
      scrollWheelZoom={true}
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
