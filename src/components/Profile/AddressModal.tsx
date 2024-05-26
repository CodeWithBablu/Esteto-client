import { Dialog } from "@radix-ui/themes";
import 'mapbox-gl/dist/mapbox-gl.css';
import { useCallback, useEffect, useRef, useState } from "react";
import { useDebouncedCallback } from 'use-debounce';
import Map, { GeolocateControl, GeolocateResultEvent, Marker, ViewStateChangeEvent, ViewportProps } from 'react-map-gl';
import mapboxgl from "mapbox-gl";
import axios from "axios";
import { UserType } from "@/lib";

interface Viewport extends ViewportProps {
  width?: number | string;
  height?: number | string;
  latitude: number;
  longitude: number;
  zoom?: number;
}

export default function AddressModal({ currUser, userLocation, setUserLocation, viewport, setViewPort }: {
  currUser: UserType,
  userLocation: { latitude: number, longitude: number } | null,
  setUserLocation: React.Dispatch<React.SetStateAction<Viewport>>,
  viewport: Viewport,
  setViewPort: React.Dispatch<React.SetStateAction<Viewport>>
}) {

  const [open, setOpen] = useState(false);
  const [address, setAddress] = useState<{ address: string, latitude: number, longitude: number } | null>(null);

  const geoLocatorRef = useRef<mapboxgl.GeolocateControl>(null);

  const handleSearch = useDebouncedCallback((term: string) => {

    //   axios.get(`https://api.mapbox.com/search/searchbox/v1/suggest?q=kalyani&language=en&
    // country=in&proximity=-73.990593,40.740121&access_token=${import.meta.env.VITE_MAPBOX_PUBLIC_KEY}`)
    console.log(`Searching... ${term}`);
  }, 500);

  useEffect(() => {
    // Activate as soon as the control is loaded
    console.log(open);
    if (geoLocatorRef.current) {
      console.log("you called me");
      geoLocatorRef.current.trigger();
    }
  }, [open]);

  const handleOnMapLoad = () => {
    if (geoLocatorRef.current) {
      geoLocatorRef.current.trigger();
    }
  }

  const handleOpenChange = (isOpen: boolean) => {
    setOpen(isOpen);
    // if (geoLocatorRef.current) {
    //   geoLocatorRef.current.trigger();
    // }
    if (!isOpen) {
      console.log('Dialog closed');
    }
  };

  // const handleGeoLocate = (e: GeolocateResultEvent) => {
  //   console.log(e.coords);
  //   setUserLocation({ latitude: e.coords.latitude, longitude: e.coords.longitude });
  //   setViewPort((prev) => ({ ...prev, latitude: e.coords.latitude, longitude: e.coords.longitude }));
  // }


  const handleOnMove = useCallback((e: ViewStateChangeEvent) => {
    if (open) {
      setViewPort((prev) => ({ ...prev, latitude: e.viewState.latitude, longitude: e.viewState.longitude }));
      console.log(e.viewState);
    }
    // console.log('Center coordinates:', {
    //   latitude: newViewport.latitude,
    //   longitude: newViewport.longitude,
    // });
    // if (geoLocatorRef.current) {
    //   // console.log(geoLocatorRef.current.getDefaultPosition);
    // }
  }, [open, setViewPort]);

  return (
    <div>
      <Dialog.Root open={open} onOpenChange={handleOpenChange}>
        <Dialog.Trigger>
          <div className="item">
            <label htmlFor="address">Address <span className="text-rose-500">*</span></label>
            <input id="address" name="address" type="text" placeholder="address" />
          </div>
        </Dialog.Trigger>

        <Dialog.Content className=" relative h-[90dvh] w-[95%] xl:h-[800px] xl:w-[800px] max-w-[800px] p-0">


          <input
            id="search"
            onChange={(e) => handleSearch(e.target.value)}
            className="z-10 absolute top-5 left-5 bg-gray-100 w-80 h-14 rounded-lg px-6 outline-none border-2 focus:border-zinc-400"
            placeholder="search location"
            type="text"
          />

          <Map
            onMove={(e) => handleOnMove(e)}
            onLoad={handleOnMapLoad}
            {...viewport}
            mapboxAccessToken={import.meta.env.VITE_MAPBOX_ACCESS_TOKEN}
            reuseMaps
            mapStyle="mapbox://styles/mapbox/streets-v9"
          >
            {address &&
              <Marker
                latitude={address.latitude}
                longitude={address.longitude}
              >
                <div>
                  <span className="bg-zinc-950/90 backdrop-blur-sm p-2 text-sm">Your address will be set to this</span>
                </div>

              </Marker>}


            <GeolocateControl ref={geoLocatorRef} />
            {/* <GeolocateControl onGeolocate={(e: GeolocateResultEvent) => handleGeoLocate(e)} ref={geoLocatorRef} /> */}
            {userLocation && (
              <Marker
                latitude={userLocation.latitude}
                longitude={userLocation.longitude}
              >
                <div className="relative flex flex-col justify-center items-center">
                  <div className="z-40 w-4 h-4 rounded-full bg-sky-500">
                  </div>

                  <div className="absolute bottom-5 p-1 bg-gray-50 rounded-full">
                    {
                      currUser.avatar && (
                        <>
                          {(!currUser.avatar.includes('<svg')) &&
                            <img src={currUser.avatar} className="h-8 w-8 rounded-full object-cover" alt="avatar" />
                          }
                          {(currUser.avatar.includes('<svg')) &&
                            <div className="z-10 w-10 h-10" dangerouslySetInnerHTML={{ __html: currUser?.avatar as string }} />
                          }
                        </>
                      )
                    }
                  </div>
                </div>

              </Marker>
            )}

          </Map>

        </Dialog.Content>
      </Dialog.Root>
    </div>
  );
}