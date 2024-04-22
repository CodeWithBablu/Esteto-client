import { MapIcon } from "@heroicons/react/24/outline";
import { Map, Slider } from "../components";
import { singlePostData, userData } from "../lib/dummyData";

import '../styles/pages/estatePage.scss';

export default function EstatePage() {
  return (
    <div className="estatePage font-poppins no-scrollbar">
      <div className="details no-scrollbar">
        <div className="wrapper">
          {singlePostData.images &&
            <Slider images={singlePostData.images} />
          }
          <div className="info">

            <div className="top">

              <div className="post">
                <h1 className="text-2xl font-semibold text-gray-700">{singlePostData.title}</h1>
                <div className="address">
                  <MapIcon className="w-5" />
                  <span>{singlePostData.address}</span>
                </div>
                <span className="price">$ {singlePostData.price}</span>
              </div>

              <div className="user bg-gradient-radial from-blue-800 py-[10px] min-w-36 px-5 sm:px-10">
                <img src={userData.img} alt={userData.name} />
                <span>{userData.name}</span>
              </div>
            </div>
            <div className="bottom">
              {singlePostData.description}
            </div>
          </div>
        </div>
      </div>

      <div className="features bg-gray-200 no-scrollbar rounded-xl lg:rounded-none">
        <div className="wrapper">

          <div>
            <p className="title">General</p>
            <div className="listVertical bg-gradient-to-r from-rose-100 to-lime-200  shadow-lg shadow-gray-300 p-2 md:p-3 rounded-xl">

              <div className="feature">
                <img src="/assets/icons/utility.png" alt="utility" />
                <div className="featureText">
                  <span>Utilities</span>
                  <p>Renter is responsible</p>
                </div>
              </div>

              <div className="feature">
                <img src="/assets/icons/pet.png" alt="pet" />
                <div className="featureText">
                  <span>Pet policy</span>
                  <p>Pets Allowed</p>
                </div>
              </div>

              <div className="feature">
                <img src="/assets/icons/fee.png" alt="utility" />
                <div className="featureText">
                  <span>Property Fees</span>
                  <p>Must have 3x the rent in toal household income</p>
                </div>
              </div>

            </div>
          </div>

          <div>
            <p className="title">Room Sizes</p>
            <div className="listHorizontal bg-gradient-to-r from-blue-200 to-stone-200 shadow-lg shadow-gray-300 p-2 md:p-3 rounded-xl flex justify-around">

              <div className="size">
                <img src="/assets/icons/size.png" alt="size" />
                <span>80 sqft 8.61 ft</span>
              </div>

              <div className="size">
                <img src="/assets/icons/bed.png" alt="bed" />
                <span>1 <span className="hidden sm:inline-block lg:hidden xl:inline-block">beds</span></span>
              </div>

              <div className="size">
                <img src="/assets/icons/bath.png" alt="bath" />
                <span>1 <span className="hidden sm:inline-block lg:hidden xl:inline-block">bathrooom</span></span>
              </div>

            </div>
          </div>


          <div>
            <p className="title">Nearby Places</p>
            <div className="places bg-gradient-to-r from-lime-200 to-indigo-200 shadow-lg shadow-gray-300 p-2 md:p-3 rounded-xl flex justify-around flex-col sm:flex-row lg:flex-col xl:flex-row gap-3">
              <div className="place flex flex-row items-center gap-3">
                <img src="/assets/icons/school.png" alt="school" />
                <div className="placeText flex flex-row w-full justify-between max-w-[200px] sm:flex-col lg:flex-row xl:flex-col sm:items-start sm:gap-1 gap-3 items-center">
                  <span className=" font-[600]">School</span>
                  <p>250m away</p>
                </div>
              </div>

              <div className="place flex flex-row items-center gap-3">
                <img src="/assets/icons/bus.png" alt="bus" />
                <div className="placeText flex flex-row w-full justify-between max-w-[200px] sm:flex-col lg:flex-row xl:flex-col sm:items-start sm:gap-1 gap-3 items-center">
                  <span className=" font-[600]">Bus Stop</span>
                  <p>100m away</p>
                </div>
              </div>

              <div className="place flex flex-row items-center gap-3">
                <img src="/assets/icons/restaurant.png" alt="Restaurant" />
                <div className="placeText flex flex-row w-full justify-between max-w-[200px] sm:flex-col lg:flex-row xl:flex-col sm:items-start sm:gap-1 gap-3 items-center">
                  <span className=" font-[600]">Restaurant</span>
                  <p>200m away</p>
                </div>
              </div>
            </div>
          </div>


          <div>
            <p className="title">Location</p>
            <div className="mapContainer">
              <Map data={[singlePostData]} />
            </div>
          </div>

          <div className="icons flex justify-between">

            <div className="flex items-center cursor-pointer transition-all duration-300 ease-linear hover:scale-95 hover:opacity-60 gap-3 px-4 py-1 rounded-md border border-zinc-400 lg:border-zinc-600">
              <img className='icon' src="/assets/icons/chat2.png" alt="chat" />
              <span className="text-lg text-gray-800 font-medium">chat</span>
            </div>

            <div className="flex items-center cursor-pointer transition-all duration-300 ease-linear hover:scale-95 hover:opacity-60 gap-3 px-4 py-1 rounded-md border border-zinc-400 lg:border-zinc-600">
              <img className='icon' src="/assets/icons/save.png" alt="save" />
              <span className="text-lg text-gray-800 font-medium">save</span>
            </div>

          </div>

        </div>
      </div>
    </div>
  );
}