import "@/styles/pages/newPostPage.scss";
import "react-quill/dist/quill.snow.css";
import { UploadWidget } from "@/components";
import ReactQuill from "react-quill";
import { useNavigate } from "react-router-dom";
import { SubmitHandler, useForm } from "react-hook-form";
import { ChevronDoubleUpIcon, ExclamationCircleIcon } from "@heroicons/react/24/outline";
import axios, { AxiosError } from "axios";
import { errorHandler, toastMessage } from "@/lib";
import { useState } from "react";
import clsx from "clsx";

const Loader = <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="w-8 h-8" fill="currentColor">
  <path d="M3.05469 13H5.07065C5.55588 16.3923 8.47329 19 11.9998 19C15.5262 19 18.4436 16.3923 18.9289 13H20.9448C20.4474 17.5 16.6323 21 11.9998 21C7.36721 21 3.55213 17.5 3.05469 13ZM3.05469 11C3.55213 6.50005 7.36721 3 11.9998 3C16.6323 3 20.4474 6.50005 20.9448 11H18.9289C18.4436 7.60771 15.5262 5 11.9998 5C8.47329 5 5.55588 7.60771 5.07065 11H3.05469Z"></path>
</svg>;

interface IFormInput {
  title: string;
  price: number;
  images: [string];
  address: string;
  city: string;
  bedroom: number;
  bathroom: number;
  type: 'buy' | 'rent';
  property: 'apartment' | 'house' | 'condo' | 'land';
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

  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IFormInput>();


  const onclick = () => {
    let errorMessage = "";
    console.log(desc);
    if (desc.length === 0 || desc === '<p><br></p>')
      errorMessage += `description: desc required\n`;

    if (images.length === 0)
      errorMessage += `images: upload images\n`;

    if (Object.entries(errors).length > 0) {
      for (const [key, value] of Object.entries(errors).slice(0, 4)) {
        errorMessage += `${key} : ${value.message}\n`;
      }
    }

    if (errorMessage.length > 0)
      toastMessage("alert", errorMessage, 6000);
  }

  const onSubmit: SubmitHandler<IFormInput> = async (data) => {
    setError("");
    setIsLoading(true);
    try {

      if (desc.length === 0 || desc === '<p><br></p>')
        throw new Error('desc required');

      if (images.length === 0)
        throw new Error('upload images');

      const body = {
        post: {
          title: data.title,
          price: data.price,
          images: images,
          address: data.address,
          city: data.city,
          bedroom: data.bedroom,
          bathroom: data.bathroom,
          type: data.type,
          property: data.property,
          latitude: data.latitude,
          longitude: data.longitude,
        },
        postdetail: {
          desc: desc,
          utilities: data.utilities,
          pet: data.pet,
          income: data.income || "Not specified",
          size: data.size,
          school: data.school || -1,
          bus: data.bus || -1,
          restaurant: data.restaurant || -1
        }
      }
      const res = await axios.post(`/api/post`, body);
      toastMessage("success", res.data.message, 4000);
      navigate("/profile");
    } catch (error) {
      console.log(error);

      if (error instanceof AxiosError) {
        setError(error.response?.data.message);
      }
      else
        setError(errorHandler(error, "Failed to signup") as string);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="newPostPage">
      <div className="formContainer">
        <h1 className="mt-10 font-medium text-lg">Add New Post</h1>
        <div className="wrapper">
          <form onSubmit={handleSubmit(onSubmit)} className="grid w-full grid-cols-2 lg:grid-cols-3">
            <div className="item">
              <label htmlFor="title">Title <span className="text-rose-500">*</span></label>
              <input {...register("title", { required: "title required. max: 40", maxLength: 40 })}
                aria-invalid={errors.title ? "true" : "false"} maxLength={40}
                id="title" name="title" type="text" placeholder="title" autoComplete="title" />
            </div>

            <div className="item">
              <label htmlFor="price">Price <span className="text-rose-500">*</span></label>
              <input {...register("price", { required: "price required" })}
                aria-invalid={errors.price ? "true" : "false"} min={0} max={1000000}
                id="price" name="price" type="number" placeholder="price" autoComplete="price" />
            </div>

            <div className="item">
              <label htmlFor="address">Address <span className="text-rose-500">*</span></label>
              <input {...register("address", { required: "address required. max: 50", maxLength: 50 })}
                aria-invalid={errors.address ? "true" : "false"} maxLength={50}
                id="address" name="address" type="text" placeholder="address" autoComplete="address" />
            </div>

            <div className="item description">
              <label htmlFor="desc">Description <span className="text-rose-500">*</span></label>
              <ReactQuill theme="snow" onChange={setDesc} value={desc} />
            </div>

            <div className="item">
              <label htmlFor="city">City <span className="text-rose-500">*</span></label>
              <input {...register("city", { required: "city required. max: 30", maxLength: 30 })}
                aria-invalid={errors.city ? "true" : "false"} maxLength={30}
                id="city" name="city" type="text" placeholder="city" autoComplete="city" />
            </div>

            <div className="item">
              <label htmlFor="bedroom">Bedroom Number <span className="text-rose-500">*</span></label>
              <input {...register("bedroom", { required: "bedroom required" })}
                aria-invalid={errors.bedroom ? "true" : "false"} defaultValue={0} min={0} max={1000}
                id="bedroom" name="bedroom" type="number" placeholder="bedroom" autoComplete="bedroom" />
            </div>

            <div className="item">
              <label htmlFor="bathroom">Bathroom Number <span className="text-rose-500">*</span></label>
              <input {...register("bathroom", { required: "bathroom required" })}
                aria-invalid={errors.bathroom ? "true" : "false"} defaultValue={0} min={0} max={1000}
                id="bathroom" name="bathroom" type="number" placeholder="bathroom" autoComplete="bathroom" />
            </div>

            <div className="item">
              <label htmlFor="latitude">Latitude <span className="text-rose-500">*</span></label>
              <input {...register("latitude", { required: "latitude required" })}
                aria-invalid={errors.latitude ? "true" : "false"}
                id="latitude" name="latitude" type="text" placeholder="latitude" autoComplete="latitude" />
            </div>

            <div className="item">
              <label htmlFor="longitude">Longitude <span className="text-rose-500">*</span></label>
              <input {...register("longitude", { required: "longitude required" })}
                aria-invalid={errors.longitude ? "true" : "false"} maxLength={50}
                id="longitude" name="longitude" type="text" placeholder="longitude" autoComplete="longitude" />
            </div>

            <div className="item">
              <label htmlFor="type">Type</label>
              <select {...register("type", { required: "type required" })} name="type">
                <option value="rent" defaultChecked>Rent</option>
                <option value="buy">Buy</option>
              </select>
            </div>

            <div className="item">
              <label htmlFor="property">Property</label>
              <select {...register("property", { required: "property required" })} name="property">
                <option value="apartment">Apartment</option>
                <option value="house">House</option>
                <option value="condo">Condo</option>
                <option value="land">Land</option>
              </select>
            </div>

            <div className="item">
              <label htmlFor="utilities">Utilities Policy</label>
              <select {...register("utilities", { required: "utilities required" })} name="utilities">
                <option value="Owner is responsible">Owner is responsible</option>
                <option value="Tenant is responsible">Tenant is responsible</option>
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
              <input {...register("income")}
                id="income" name="income" type="text" placeholder="Income Policy" />
            </div>

            <div className="item">
              <label htmlFor="size">Total Size (sqft) <span className="text-rose-500">*</span></label>
              <div className="relative w-full flex items-center">
                <input {...register("size", { required: "size required" })} min={0} step={0.01} className="m-input" id="size" name="size" type="number" />
                <span className="absolute rounded-l-[5px] left-[1px] flex items-center bg-slate-200 border-none px-2 h-[calc(100%-1.5px)] shadow-xl">m</span>
              </div>
            </div>

            <div className="item">
              <label htmlFor="school">School</label>
              <div className="relative w-full flex items-center">
                <input {...register("school")} min={0} max={20000} className="m-input" id="school" name="school" type="number" />
                <span className="absolute rounded-l-[5px] left-[1px] flex items-center bg-slate-200 border-none px-2 h-[calc(100%-1.5px)] shadow-xl">m</span>
              </div>
            </div>

            <div className="item">
              <label htmlFor="bus">bus</label>
              <div className="relative w-full flex items-center">
                <input {...register("bus")} min={0} max={20000} className="m-input" id="bus" name="bus" type="number" />
                <span className="absolute rounded-l-[5px] left-[1px] flex items-center bg-slate-200 border-none px-2 h-[calc(100%-1.5px)] shadow-xl">m</span>
              </div>
            </div>

            <div className="item">
              <label htmlFor="restaurant">Restaurant</label>
              <div className="relative w-full flex items-center">
                <input {...register("restaurant")} min={0} max={20000} className="m-input" id="restaurant" name="restaurant" type="number" />
                <span className="absolute rounded-l-[5px] left-[1px] flex items-center bg-slate-200 border-none px-2 h-[calc(100%-1.5px)] shadow-xl">m</span>
              </div>
            </div>

            <div className="relative flex items-center justify-center">
              {isLoading &&
                <span className="absolute z-20 animate-spin text-zinc-800">{Loader}</span>}
              <button onClick={onclick} type="submit" className={clsx(
                'relative h-fit py-[10px] self-end w-full bg-blue-600 text-gray-50 font-medium text-lg rounded-md',
                { 'opacity-50 pointer-events-none': isLoading },
                { 'opacity-100': !isLoading },
              )}>Add</button>
            </div>
          </form>

          {error && <p role="alert" className="text-rose-500 w-full text-center font-[400]"><ExclamationCircleIcon className="w-6 inline-block mr-1" />{error}</p>}
        </div>
      </div>


      <div className="sideContainer lg:bg-slate-100 flex flex-col items-center justify-center">
        {/* <img src="/assets/icons/avatar.svg" alt="avatar" /> */}

        <div className="smallImages relative flex items-center sm:justify-center w-[300px] sm:w-[300px] h-[200px] sm:h-[250px]">
          <div
            className={clsx("no-scrollbar relative flex flex-row gap-5 h-[200px] lg:h-[250px] overflow-scroll sm:flex-col")}
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

        <UploadWidget uwConfig={{
          cloudName: "codewithbablu",
          uploadPreset: "esteto",
          multiple: true,
          maxImageFileSize: 20000000,
          folders: "posts"
        }}
          setState={setImages}
        />
      </div>
    </div>
  );
}

export default NewPostPage;