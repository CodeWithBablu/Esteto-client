import "@/styles/pages/newPostPage.scss";
import "react-quill/dist/quill.snow.css";
import { AddressModal, PlaceModal, UploadWidget } from "@/components";
import ReactQuill from "react-quill";
import { useNavigate } from "react-router-dom";
import { SubmitHandler, useForm } from "react-hook-form";
import {
  ChevronDoubleUpIcon,
  ExclamationCircleIcon,
} from "@heroicons/react/24/outline";

import axios, { AxiosError } from "axios";
import { UserType, errorHandler, toastMessage } from "@/lib";
import { useContext, useEffect, useState } from "react";
import clsx from "clsx";
import { AuthContext } from "@/context/AuthContext";

const Loader = (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    className="h-8 w-8"
    fill="currentColor"
  >
    <path d="M3.05469 13H5.07065C5.55588 16.3923 8.47329 19 11.9998 19C15.5262 19 18.4436 16.3923 18.9289 13H20.9448C20.4474 17.5 16.6323 21 11.9998 21C7.36721 21 3.55213 17.5 3.05469 13ZM3.05469 11C3.55213 6.50005 7.36721 3 11.9998 3C16.6323 3 20.4474 6.50005 20.9448 11H18.9289C18.4436 7.60771 15.5262 5 11.9998 5C8.47329 5 5.55588 7.60771 5.07065 11H3.05469Z"></path>
  </svg>
);

export interface Address {
  place: string;
  city: string;
  latitude: number;
  longitude: number;
}

export interface Viewport {
  width?: number | string;
  height?: number | string;
  latitude: number;
  longitude: number;
  zoom?: number;
}

export interface Country {
  iso2: string;
  coordinates: { lon: number; lat: number };
  country: string;
}

interface IFormInput {
  title: string;
  price: number;
  images: [string];
  address: string;
  city: string;
  country: string;
  bedroom: number;
  bathroom: number;
  type: "buy" | "rent";
  property: "apartment" | "house" | "condo" | "land";
  latitude: string;
  longitude: string;

  // postdetail
  desc: string;
  utilities: string;
  pet: string;
  income?: string;
  size: number;
  school?: number;
  bus?: number;
  restaurant?: number;
}

function NewPostPage() {
  const [images, setImages] = useState<string[]>([]);
  const [desc, setDesc] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [userLocation, setUserLocation] = useState<Viewport | null>(null);

  const [viewport, setViewPort] = useState<Viewport>({
    latitude: 54.526,
    longitude: 15.2551,
    zoom: 8,
  });

  const [country, setCountry] = useState<Country | null>(null);
  const [address, setAddress] = useState<Address | null>(null);

  const { currUser } = useContext(AuthContext) as { currUser: UserType };

  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IFormInput>();

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setUserLocation({ latitude, longitude });
          setViewPort((prev) => ({
            ...prev,
            latitude,
            longitude,
          }));
        },
        (error) => {
          console.error("Error getting user location:", error);
        },
      );
    }
  }, []);

  const onclick = () => {
    let errorMessage = "";
    if (desc.length === 0 || desc === "<p><br></p>")
      errorMessage += `description: desc required\n`;

    if (images.length === 0) errorMessage += `images: upload images\n`;

    if (!country || !address) errorMessage += `address not specified\n`;

    if (Object.entries(errors).length > 0) {
      for (const [key, value] of Object.entries(errors).slice(0, 4)) {
        errorMessage += `${key} : ${value.message}\n`;
      }
    }

    if (errorMessage.length > 0) toastMessage("alert", errorMessage, 6000);
  };

  const onSubmit: SubmitHandler<IFormInput> = async (data) => {
    setError("");
    setIsLoading(true);
    try {
      if (desc.length === 0 || desc === "<p><br></p>")
        throw new Error("desc required");

      if (images.length === 0) throw new Error("upload images");

      if (!country) throw new Error("country required");

      if (!address) throw new Error("address not specified");

      const body = {
        post: {
          title: data.title,
          price: data.price,
          images: images,
          address: address.place,
          city: address.city.toLowerCase(),
          bedroom: data.bedroom,
          bathroom: data.bathroom,
          type: data.type,
          property: data.property,
          latitude: address.latitude,
          longitude: address.longitude,
        },
        postdetail: {
          desc: desc,
          utilities: data.utilities,
          pet: data.pet,
          income: data.income || "Not specified",
          size: data.size,
          school: data.school || -1,
          bus: data.bus || -1,
          restaurant: data.restaurant || -1,
        },
      };
      const res = await axios.post(`/api/post`, body);
      toastMessage("success", res.data.message, 4000);
      navigate("/profile");
    } catch (error) {
      console.log(error);

      if (error instanceof AxiosError) {
        setError(error.response?.data.message);
      } else setError(errorHandler(error, "Failed to add post") as string);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="newPostPage">
      <div className="formContainer">
        <h1 className="mt-10 text-lg font-medium">Add New Post</h1>
        <div className="wrapper">
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="grid w-full grid-cols-2 lg:grid-cols-3"
          >
            <div className="item">
              <label htmlFor="title">
                Title <span className="text-rose-500">*</span>
              </label>
              <input
                {...register("title", {
                  required: "title required. max: 40",
                  maxLength: 40,
                })}
                aria-invalid={errors.title ? "true" : "false"}
                maxLength={40}
                id="title"
                name="title"
                type="text"
                placeholder="title"
                autoComplete="title"
              />
            </div>

            <div className="item">
              <label htmlFor="price">
                Price <span className="text-rose-500">*</span>
              </label>
              <input
                {...register("price", { required: "price required" })}
                aria-invalid={errors.price ? "true" : "false"}
                min={0}
                max={1000000}
                id="price"
                name="price"
                type="number"
                placeholder="price"
                autoComplete="price"
              />
            </div>

            <div className="item">
              <label htmlFor="size">
                Total Size (sqft) <span className="text-rose-500">*</span>
              </label>
              <div className="relative flex w-full items-center">
                <input
                  {...register("size", { required: "size required" })}
                  min={0}
                  step={0.01}
                  className="m-input"
                  id="size"
                  name="size"
                  type="number"
                />
                <span className="absolute left-[1px] flex h-[calc(100%-1.5px)] items-center rounded-l-[5px] border-none bg-slate-200 px-2 shadow-xl">
                  sqft
                </span>
              </div>
            </div>


            <div className="item description">
              <label htmlFor="desc">
                Description <span className="text-rose-500">*</span>
              </label>
              <ReactQuill theme="snow" onChange={setDesc} value={desc} />
            </div>

            {/* <div className="item">
              <label htmlFor="address">Address <span className="text-rose-500">*</span></label>
              <input {...register("address", { required: "address required. max: 50", maxLength: 50 })}
                aria-invalid={errors.address ? "true" : "false"} maxLength={50}
                id="address" name="address" type="text" placeholder="address" autoComplete="address" />
            </div> */}
            <PlaceModal type="country" data={country} setData={setCountry} />

            {currUser && (
              <AddressModal
                currUser={currUser}
                country={country}
                address={address}
                setAddress={setAddress}
                userLocation={userLocation}
                setUserLocation={setUserLocation}
                viewport={viewport}
                setViewPort={setViewPort}
              />
            )}




            <div className="item">
              <label htmlFor="bedroom">
                Bedroom count <span className="text-rose-500">*</span>
              </label>
              <input
                {...register("bedroom", { required: "bedroom required" })}
                aria-invalid={errors.bedroom ? "true" : "false"}
                defaultValue={0}
                min={0}
                max={1000}
                id="bedroom"
                name="bedroom"
                type="number"
                placeholder="bedroom"
                autoComplete="bedroom"
              />
            </div>

            <div className="item">
              <label htmlFor="bathroom">
                Bathroom count <span className="text-rose-500">*</span>
              </label>
              <input
                {...register("bathroom", { required: "bathroom required" })}
                aria-invalid={errors.bathroom ? "true" : "false"}
                defaultValue={0}
                min={0}
                max={1000}
                id="bathroom"
                name="bathroom"
                type="number"
                placeholder="bathroom"
                autoComplete="bathroom"
              />
            </div>

            <div className="item">
              <label htmlFor="type">Type</label>
              <select
                {...register("type", { required: "type required" })}
                name="type"
              >
                <option value="rent" defaultChecked>
                  Rent
                </option>
                <option value="buy">Buy</option>
              </select>
            </div>

            <div className="item">
              <label htmlFor="property">Property</label>
              <select
                {...register("property", { required: "property required" })}
                name="property"
              >
                <option value="apartment">Apartment</option>
                <option value="house">House</option>
                <option value="condo">Condo</option>
                <option value="land">Land</option>
              </select>
            </div>

            <div className="item">
              <label htmlFor="utilities">Utilities Policy</label>
              <select
                {...register("utilities", { required: "utilities required" })}
                name="utilities"
              >
                <option value="Owner is responsible">
                  Owner is responsible
                </option>
                <option value="Tenant is responsible">
                  Tenant is responsible
                </option>
                <option value="shared">Shared</option>
              </select>
            </div>

            <div className="item">
              <label htmlFor="pet">Pet Policy</label>
              <select {...register("pet")} name="pet">
                <option value="Allowed">Allowed</option>
                <option value="Not allowed">Not Allowed</option>
              </select>
            </div>

            <div className="item">
              <label htmlFor="income">Income Policy</label>
              <input
                {...register("income")}
                id="income"
                name="income"
                type="text"
                placeholder="Income Policy"
              />
            </div>

            <div className="item">
              <label htmlFor="school">School</label>
              <div className="relative flex w-full items-center">
                <input
                  {...register("school")}
                  min={0}
                  max={20000}
                  className="m-input"
                  id="school"
                  name="school"
                  type="number"
                />
                <span className="absolute left-[1px] flex h-[calc(100%-1.5px)] items-center rounded-l-[5px] border-none bg-slate-200 px-2 shadow-xl">
                  m
                </span>
              </div>
            </div>

            <div className="item">
              <label htmlFor="bus">bus</label>
              <div className="relative flex w-full items-center">
                <input
                  {...register("bus")}
                  min={0}
                  max={20000}
                  className="m-input"
                  id="bus"
                  name="bus"
                  type="number"
                />
                <span className="absolute left-[1px] flex h-[calc(100%-1.5px)] items-center rounded-l-[5px] border-none bg-slate-200 px-2 shadow-xl">
                  m
                </span>
              </div>
            </div>

            <div className="item">
              <label htmlFor="restaurant">Restaurant</label>
              <div className="relative flex w-full items-center">
                <input
                  {...register("restaurant")}
                  min={0}
                  max={20000}
                  className="m-input"
                  id="restaurant"
                  name="restaurant"
                  type="number"
                />
                <span className="absolute left-[1px] flex h-[calc(100%-1.5px)] items-center rounded-l-[5px] border-none bg-slate-200 px-2 shadow-xl">
                  m
                </span>
              </div>
            </div>

            <div className="relative flex items-center justify-center">
              {isLoading && (
                <span className="absolute z-20 animate-spin text-zinc-800">
                  {Loader}
                </span>
              )}
              <button
                onClick={onclick}
                type="submit"
                className={clsx(
                  "relative h-fit w-full self-end rounded-md bg-blue-600 py-[10px] text-lg font-medium text-gray-50",
                  { "pointer-events-none opacity-50": isLoading },
                  { "opacity-100": !isLoading },
                )}
              >
                Add
              </button>
            </div>
          </form>

          {error && (
            <p
              role="alert"
              className="w-full text-center font-[400] text-rose-500"
            >
              <ExclamationCircleIcon className="mr-1 inline-block w-6" />
              {error}
            </p>
          )}
        </div>
      </div>

      <div className="sideContainer relative flex flex-col items-center justify-center lg:bg-slate-100">

        <div className="absolute top-[20%] z-0 xl:top-[10%] hidden lg:inline-block h-[15rem] w-[15rem] animate-blob rounded-full bg-gradient-radial from-teal-500/40 blur-2xl filter xl:h-[25rem] xl:w-[25rem]"></div>
        <div className="animation-delay-7000 z-0 hidden lg:inline-block absolute left-[10%] top-[30%] h-[15rem] w-[15rem] animate-blob rounded-full bg-gradient-radial from-indigo-500/50 blur-2xl filter xl:h-[25rem] xl:w-[25rem]"></div>


        <div className="smallImages relative flex h-[200px] w-[300px] items-center sm:h-[250px] sm:w-[300px] sm:justify-center">
          <div
            className={clsx(
              "no-scrollbar relative flex h-[200px] flex-row gap-5 overflow-scroll sm:flex-col lg:h-[250px]",
            )}
          >
            {images.map((image, index) => (
              <img
                className="h-full w-full object-cover"
                key={index}
                src={image}
                alt="property"
              />
            ))}
          </div>

          <div
            className={clsx(
              "absolute right-0 flex w-20 rotate-90 items-center justify-center gap-3  rounded-md bg-gradient-radial from-blue-600 p-2 font-semibold text-gray-200 backdrop-blur-2xl sm:bottom-0 sm:right-auto sm:w-fit sm:rotate-0",
              {
                hidden: images.length <= 1,
                block: images.length > 1,
              },
            )}
          >
            <ChevronDoubleUpIcon className="w-6 animate-bounce ease-linear" />
            <span className="hidden sm:inline-block">scroll up</span>
          </div>
        </div>

        <UploadWidget
          uwConfig={{
            cloudName: "codewithbablu",
            uploadPreset: "esteto",
            multiple: true,
            maxImageFileSize: 20000000,
            folders: "posts",
          }}
          setState={setImages}
        />
      </div>
    </div>
  );
}

export default NewPostPage;
