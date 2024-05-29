import { Dialog } from "@radix-ui/themes";
import "mapbox-gl/dist/mapbox-gl.css";
import { useCallback, useRef, useState } from "react";
import { useDebouncedCallback } from "use-debounce";
import Map, {
  GeolocateControl,
  GeolocateResultEvent,
  Marker,
  ViewStateChangeEvent,
} from "react-map-gl";
import mapboxgl from "mapbox-gl";
import axios from "axios";
import { UserType, toastMessage } from "@/lib";
import { Address, Country } from "@/pages/newPostPage";
import clsx from "clsx";


interface Viewport {
  width?: number | string;
  height?: number | string;
  latitude: number;
  longitude: number;
  zoom?: number;
}

export default function AddressModal({
  currUser,
  country,
  address,
  setAddress,
  userLocation,
  setUserLocation,
  viewport,
  setViewPort,
}: {
  currUser: UserType;
  country: Country | null,
  address: Address | null;
  setAddress: React.Dispatch<React.SetStateAction<Address | null>>,
  userLocation: { latitude: number; longitude: number } | null;
  setUserLocation: React.Dispatch<React.SetStateAction<Viewport | null>>
  viewport: Viewport;
  setViewPort: React.Dispatch<React.SetStateAction<Viewport>>;
}) {

  const [open, setOpen] = useState(false);

  const geoLocatorRef = useRef<mapboxgl.GeolocateControl>(null);

  const handleSearch = useDebouncedCallback(async (term: string) => {
    console.log(country);
    const query = `https://api.mapbox.com/search/geocode/v6/forward?q=${term}&country=${country ? country.country : ""}&proximity=ip&language=en&autocomplete=true&access_token=${import.meta.env.VITE_MAPBOX_ACCESS_TOKEN}`;
    const res = await axios.get(query);

    console.log(res);

    console.log(`Searching... ${term}`);
  }, 500);


  // useEffect(() => {

  // }, [open]);

  const handleOnMapLoad = () => { };

  const handleGeoLocate = (e: GeolocateResultEvent) => {
    setUserLocation({ latitude: e.coords.latitude, longitude: e.coords.longitude });
    setViewPort((prev) => ({ ...prev, latitude: e.coords.latitude, longitude: e.coords.longitude }));
  }

  const handleOpenChange = (isOpen: boolean) => {
    if (isOpen) {
      if (country)
        setOpen(isOpen)
      else
        toastMessage("error", "Country is required", 5000);
    }
    else
      setOpen(isOpen);
  };

  const fetchAddress = useDebouncedCallback(async () => {
    let query = "";
    if (viewport)
      query = `https://api.mapbox.com/search/geocode/v6/reverse?country=${country?.iso2 ? country.iso2 : ""}&language=en&longitude=${viewport.longitude}&latitude=${viewport.latitude}&access_token=${import.meta.env.VITE_MAPBOX_ACCESS_TOKEN}`;

    console.log("lat: ", viewport?.latitude, "Long: ", viewport?.longitude);
    try {
      const res = await axios.get(query);

      if (res.data.features && res.data.features[0]) {
        const feature = res.data.features[0];
        setAddress((prev) => ({
          ...prev,
          place: feature.properties.full_address,
          city: (feature.properties.context.district.name as string).toLowerCase(),
          latitude: feature.geometry.coordinates[1] as number,
          longitude: feature.geometry.coordinates[0] as number
        }));
      }

      console.log(address);
    } catch (error) {
      toastMessage("error", "Failed to fetch address", 5000);
    }
  }, 2000);

  const handleOnMove = useCallback((e: ViewStateChangeEvent) => {
    if (open) {
      setViewPort((prev) => ({
        ...prev,
        latitude: e.viewState.latitude,
        longitude: e.viewState.longitude,
        zoom: e.viewState.zoom,
      }));
      console.log(e.viewState);
    }

    fetchAddress();
  }, [open, setViewPort, fetchAddress]);



  return (
    <div className="col-span-2">
      <Dialog.Root open={open} onOpenChange={handleOpenChange}>
        <Dialog.Trigger>
          <div className="item">
            <label htmlFor="address">
              Address <span className="text-rose-500">*</span>
            </label>
            <input
              id="address"
              value={address?.place ? (address.place.length > 40 ? address.place.slice(0, 40) + '...' : address.place) : "add address"}
              name="address"
              className={clsx({
                'text-gray-400': !address?.place,
                'text-zinc-800': address?.place
              })}
              type="text"
              autoComplete="off"
              placeholder="add address"
            />
          </div>
        </Dialog.Trigger>

        <Dialog.Content className=" relative h-[80dvh] w-[95%] font-poppins font-medium max-w-[800px] p-0 xl:h-[800px] xl:w-[800px]">
          <input
            id="search"
            onChange={(e) => handleSearch(e.target.value)}
            className="absolute left-0 right-0 m-auto sm:right-auto sm:left-5 top-5 z-10 h-14 w-[95%] sm:w-80 text-lg rounded-lg bg-zinc-950/80 backdrop-blur-sm text-gray-50 placeholder-zinc-400 px-6 outline-none"
            placeholder="search location"
            type="text"
            autoComplete="off"
          />

          <Map
            onMove={(e) => handleOnMove(e)}
            onLoad={handleOnMapLoad}
            {...viewport}
            mapboxAccessToken={import.meta.env.VITE_MAPBOX_ACCESS_TOKEN}
            reuseMaps
            mapStyle="mapbox://styles/mapbox/streets-v9"
          >

            <GeolocateControl onGeolocate={(e: GeolocateResultEvent) => handleGeoLocate(e)} ref={geoLocatorRef} />

            {userLocation && (
              <Marker
                latitude={userLocation.latitude}
                longitude={userLocation.longitude}
              >
                <div className="relative flex flex-col items-center justify-center">
                  <div className="relative flex justify-center items-center">
                    <span className="h-4 w-4 rounded-full bg-sky-500"></span>
                    <span className="absolute h-4 w-4 rounded-full bg-blue-500 animate-ping duration-1000"></span>
                  </div>

                  <div className=" absolute -left-12 -bottom-12 shadow-lg shadow-blue-600 rounded-l-3xl rounded-br-3xl  bg-zinc-700 p-1">
                    {currUser.avatar && (
                      <>
                        {!currUser.avatar.includes("<svg") && (
                          <img
                            src={currUser.avatar}
                            className="h-8 w-8 rounded-full object-cover"
                            alt="avatar"
                          />
                        )}
                        {currUser.avatar.includes("<svg") && (
                          <div
                            className="h-10 w-10 rounded-full"
                            dangerouslySetInnerHTML={{
                              __html: currUser?.avatar as string,
                            }}
                          />
                        )}
                      </>
                    )}
                  </div>
                </div>
              </Marker>
            )}

            {viewport && (
              <Marker latitude={viewport.latitude} longitude={viewport.longitude}>
                <div className="relative z-50 flex flex-col items-center font-poppins font-medium">

                  <div className="z-50 absolute bottom-5 flex flex-col items-center">
                    <span className="bg-zinc-950/70 text-center p-2 text-sm text-gray-50 rounded-md whitespace-pre backdrop-blur-sm">
                      Your address will<br />
                      be set to this
                    </span>
                    <span className="w-4 h-4 bg-zinc-950/70 -z-10 -mt-3 rotate-45 backdrop-blur-xl"></span>
                  </div>

                  <div className="z-50 relative flex justify-center items-center">
                    <div className="z-50 h-4 w-4 rounded-full bg-rose-500"></div>
                    <span className="absolute h-4 w-4 rounded-full bg-rose-400 animate-ping duration-1000"></span>
                  </div>

                </div>
              </Marker>
            )}

          </Map>
          {
            address?.place &&
            <div className="w-full bg-rose-500 flex justify-center">
              <div className="absolute bottom-2 z-40 flex items-center justify-center text-sky-100 p-3 rounded-xl h-24 sm:h-20 bg-zinc-950/80 backdrop-blur-sm w-[95%]">
                <span>{address.place.length > 100 ? address.place.slice(0, 100) + '...' : address.place}</span>
              </div>
            </div>
          }

        </Dialog.Content>
      </Dialog.Root>
    </div >
  );
}
