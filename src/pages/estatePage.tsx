import "../styles/pages/estatePage.scss";

import { MapIcon } from "@heroicons/react/24/outline";
import { Map, Slider } from "../components";
import { useLoaderData, useNavigate } from "react-router-dom";
import DOMPurify from 'dompurify';
import { Tooltip } from "@radix-ui/themes";
import { Estate, UserType, toastMessage } from "@/lib";
import { useContext, useState } from "react";
import { AuthContext } from "@/context/AuthContext";
import axios, { AxiosError } from "axios";

const Loader = <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="w-8 h-8" fill="currentColor">
  <path d="M3.05469 13H5.07065C5.55588 16.3923 8.47329 19 11.9998 19C15.5262 19 18.4436 16.3923 18.9289 13H20.9448C20.4474 17.5 16.6323 21 11.9998 21C7.36721 21 3.55213 17.5 3.05469 13ZM3.05469 11C3.55213 6.50005 7.36721 3 11.9998 3C16.6323 3 20.4474 6.50005 20.9448 11H18.9289C18.4436 7.60771 15.5262 5 11.9998 5C8.47329 5 5.55588 7.60771 5.07065 11H3.05469Z"></path>
</svg>;

export default function EstatePage() {
  const estate = useLoaderData() as Estate;

  const [isLoading, setIsLoading] = useState(false);
  const [isSaved, setIsSaved] = useState(estate.isSaved || false);
  const { currUser } = useContext(AuthContext) as { currUser: UserType | null, updateUser: (data: UserType | null) => void };
  const navigate = useNavigate();


  const handleSave = async () => {
    setIsLoading(true);
    if (!currUser)
      navigate('/login');
    try {
      const res = await axios.post('/api/post/save', { 'postId': estate._id })
      toastMessage("success", res.data.message, 4000);
      setIsSaved(prev => !prev);
    } catch (error) {
      console.log(error);

      if (error instanceof AxiosError) {
        toastMessage("error", error.response?.data.message, 4000);
      }
      else
        toastMessage("error", "error occured. Try again", 4000);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="estatePage no-scrollbar font-poppins">
      <div className="details no-scrollbar">
        <div className="wrapper mt-5 xl:mt-0">
          {estate.images && <Slider images={estate.images} />}
          <div className="info">
            <div className="top flex flex-col gap-5 sm:flex-row sm:justify-between">
              <div className="post">
                <h1 className="text-2xl font-semibold text-gray-700">
                  {estate.title}
                </h1>
                <div className="address">
                  <MapIcon className="w-5" />
                  <span>{estate.address}</span>
                </div>
                <span className="price">{estate.price}</span>
              </div>

              <Tooltip className="text-2xl" content={estate.user.username.slice(0, 30)}>
                <div className="user w-fit min-w-36 bg-gradient-radial from-blue-800 px-3 py-5 sm:px-5">
                  <img src={estate.user.avatar} alt={estate.user.username} />
                  <span>{estate.user.username.slice(0, 15)}</span>
                </div>
              </Tooltip>

            </div>

            <div className="bottom" dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(estate.postdetail.desc) }}></div>
          </div>
        </div>
      </div>

      <div className="features no-scrollbar mb-10 rounded-xl sm:bg-gray-200 lg:rounded-none">
        <div className="wrapper py-[10px] sm:px-[20px]">
          <div>
            <p className="title">General</p>
            <div className="listVertical rounded-xl bg-gradient-to-r from-rose-100  to-lime-200 p-2 shadow-lg shadow-gray-300 md:p-3">
              <div className="feature">
                <img src="/assets/icons/utility.png" alt="utility" />
                <div className="featureText">
                  <span>Utilities</span>
                  <p>{estate.postdetail.utilities}</p>
                </div>
              </div>

              <div className="feature">
                <img src="/assets/icons/pet.png" alt="pet" />
                <div className="featureText">
                  <span>Pet policy</span>
                  <p>{estate.postdetail.pet}</p>
                </div>
              </div>

              <div className="feature">
                <img src="/assets/icons/fee.png" alt="utility" />
                <div className="featureText">
                  <span>Property Fees</span>
                  <p>{estate.postdetail.income}</p>
                </div>
              </div>
            </div>
          </div>

          <div>
            <p className="title">Room Sizes</p>
            <div className="listHorizontal flex flex-col sm:flex-row gap-3 justify-around rounded-xl bg-gradient-to-r from-blue-200 to-stone-200 p-2 shadow-lg shadow-gray-300 md:p-3">
              <div className="size">
                <img src="/assets/icons/size.png" alt="size" />
                <span>{estate.postdetail.size} sqft</span>
              </div>

              <div className="size">
                <img src="/assets/icons/bed.png" alt="bed" />
                <span>
                  {estate.bedroom}{" "}
                  <span className="inline-block lg:hidden xl:inline-block">
                    beds
                  </span>
                </span>
              </div>

              <div className="size">
                <img src="/assets/icons/bath.png" alt="bath" />
                <span>
                  {estate.bathroom}{" "}
                  <span className="inline-block lg:hidden xl:inline-block">
                    baths
                  </span>
                </span>
              </div>
            </div>
          </div>

          <div>
            <p className="title">Nearby Places</p>
            <div className="places flex flex-col justify-around gap-3 rounded-xl bg-gradient-to-r from-lime-200 to-indigo-200 p-2 shadow-lg shadow-gray-300 sm:flex-row md:p-3 lg:flex-col xl:flex-row">
              <div className="place flex flex-row items-center gap-3">
                <img src="/assets/icons/school.png" alt="school" />
                <div className="placeText flex w-full max-w-[200px] flex-row items-center justify-between gap-3 sm:flex-col sm:items-start sm:gap-1 lg:flex-row xl:flex-col">
                  <span className=" font-[600]">School</span>
                  <p>{estate.postdetail.school}</p>
                </div>
              </div>

              <div className="place flex flex-row items-center gap-3">
                <img src="/assets/icons/bus.png" alt="bus" />
                <div className="placeText flex w-full max-w-[200px] flex-row items-center justify-between gap-3 sm:flex-col sm:items-start sm:gap-1 lg:flex-row xl:flex-col">
                  <span className=" font-[600]">Bus Stop</span>
                  <p>{estate.postdetail.bus}</p>
                </div>
              </div>

              <div className="place flex flex-row items-center gap-3">
                <img src="/assets/icons/restaurant.png" alt="Restaurant" />
                <div className="placeText flex w-full max-w-[200px] flex-row items-center justify-between gap-3 sm:flex-col sm:items-start sm:gap-1 lg:flex-row xl:flex-col">
                  <span className=" font-[600]">Restaurant</span>
                  <p>{estate.postdetail.restaurant}</p>
                </div>
              </div>
            </div>
          </div>

          <div>
            <p className="title">Location</p>
            <div className="mapContainer">
              <Map data={[estate]} />
            </div>
          </div>

          <div className="icons flex justify-between">
            <div className="flex cursor-pointer items-center gap-3 rounded-md border border-zinc-400 px-2 py-1 transition-all duration-300 ease-linear hover:scale-95 hover:opacity-60 lg:border-zinc-600">
              <img className="icon" src="/assets/icons/chat2.png" alt="chat" />
              <span className="text-lg font-medium text-gray-800">chat</span>
            </div>

            <div onClick={handleSave} className="relative cursor-pointer flex items-center justify-center">
              {isLoading &&
                <span className="absolute z-20 animate-spin text-zinc-800">{Loader}</span>
              }

              <div className="flex relative cursor-pointer items-center gap-3 rounded-md border border-zinc-400 px-2 py-1 transition-all duration-300 ease-linear hover:scale-95 hover:opacity-60 lg:border-zinc-600">
                <img className="icon" src={`${isSaved ? "/assets/icons/save.png" : "/assets/icons/unsaved.png"}`} alt="save" />
                <span className="text-lg font-medium text-gray-800">{isSaved ? 'unsave' : 'save'}</span>
              </div>
            </div>


          </div>
        </div>
      </div>
    </div >
  );
}
