import 'leaflet/dist/leaflet.css'

import { MapContainer, TileLayer } from "react-leaflet";
import { Estate, EstateRaw } from '../../lib';
import Pin from './Pin';
// const positions = [51.505, -0.09];

export default function Map({ data }: { data: Estate[] | EstateRaw[] }) {

  console.log(data);

  return (
    <MapContainer className="z-10 w-full h-full bg-zinc-900" center={[51.505, -0.09]} zoom={7} scrollWheelZoom={false}>
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {data.map((estate) => (
        <Pin key={estate.id} estate={estate} />
      ))}
    </MapContainer>
  );
}