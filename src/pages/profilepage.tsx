import { PlusIcon } from "@heroicons/react/24/outline";
import { List } from "../components";
import "../styles/pages/profilePage.scss";

export default function ProfilePage() {
  return (
    <div className="profilePage font-poppins">
      <div className="details no-scrollbar ">
        <div className="wrapper">
          <div className="info flex flex-col items-center gap-5 rounded-xl bg-gradient-to-r from-blue-100 to-rose-100 py-10 md:flex-row md:gap-10 md:p-3">
            <div>
              <img
                src="https://images.pexels.com/photos/6256894/pexels-photo-6256894.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                alt="profileimg"
                className="h-20 w-20 rounded-full object-cover"
              />
            </div>

            <div className="flex flex-col gap-5">
              <div className="top flex items-end justify-center gap-3 font-chillax md:justify-start">
                <h1 className="text-2xl font-medium text-gray-500">Hey!</h1>
                <div className="h-auto overflow-hidden">
                  <span className="inline-block animate-fadeIn text-4xl font-semibold text-pink-500">
                    John
                  </span>
                </div>
              </div>

              <div className="bottominfo text-center md:text-left">
                <div>
                  <h2 className="text-xl">Email</h2>
                  <span className="font-chillax">
                    babasahebbhalekar8245@gmail.com
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div className="title">
            <h1 className="font-chillax text-2xl font-semibold">My List</h1>
            <button className=" flex items-center rounded-md bg-blue-600 px-4 py-3 font-medium text-gray-100">
              Create Posts <PlusIcon className="w-6" />
            </button>
          </div>

          <List />

          <div className="title">
            <h1 className="font-chillax text-2xl font-semibold">Saved List</h1>
            <button className=" flex items-center rounded-md bg-blue-600 px-4 py-3 font-medium text-gray-100">
              Create Posts <PlusIcon className="w-6" />
            </button>
          </div>
        </div>
      </div>

      <div className="chatContainer hidden lg:inline-block"></div>
    </div>
  );
}
