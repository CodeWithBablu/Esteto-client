import "../styles/pages/profilePage.scss";
import { Await, Link, useLoaderData } from "react-router-dom";
import { AuthContext } from "@/context/AuthContext";
import { Suspense, useContext } from "react";
import { PlusIcon } from "@heroicons/react/24/outline";
import { CardSkeleton, List } from "../components";
import { EstateRaw, UserType } from "@/lib";

export default function ProfilePage() {
  const res = useLoaderData() as {
    user: Promise<{
      value: {
        userPosts: EstateRaw[],
        savedPosts: EstateRaw[],
      }
    }>
  };

  const { currUser } = useContext(AuthContext) as { currUser: UserType | null, updateUser: (data: UserType | null) => void };

  return (
    <div className="profilePage font-poppins pt-10">
      <div className="details no-scrollbar ">
        <div className="wrapper flex flex-col">

          <div className="info flex items-center flex-col w-full gap-5 rounded-xl py-3 sm:py-10 xs:flex-row xs:gap-10">
            <div>
              <img
                src="https://images.pexels.com/photos/6256894/pexels-photo-6256894.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                alt="profileimg"
                className="h-16 w-16 sm:h-24 sm:w-24 rounded-full object-cover"
              />
            </div>

            <div className="flex flex-col gap-2">
              <div className="top flex items-end justify-center gap-3 font-chillax xs:justify-start">
                <h1 className="text-2xl font-medium text-gray-500">Hey!</h1>
                <div className="h-auto overflow-hidden">
                  <span className="inline-block capitalize animate-fadeIn text-2xl font-[500] text-blue-500">
                    {currUser?.username}
                  </span>
                </div>
              </div>

              <div className="bottominfo text-center xs:text-left">
                <div>
                  <h2 className="text-xl text-gray-500">Email</h2>
                  <span className="font-chillax">
                    {currUser?.email}
                  </span>
                </div>
              </div>
            </div>
          </div>

          <Link to={"/profile/update"} className=" xs:w-fit py-2 px-6 bg-zinc-900 rounded-md text-center text-lg font-semibold text-gray-100">UPDATE</Link>

          <div className="title">
            <h1 className="font-chillax text-2xl font-semibold">My List</h1>
            <Link to={"/add"} className=" flex items-center rounded-md bg-blue-600 px-4 py-3 font-medium text-gray-100">
              Create Posts <PlusIcon className="w-6" />
            </Link>
          </div>

          <Suspense fallback={<><CardSkeleton /><CardSkeleton /></>}>
            <Await
              resolve={res.user}
              errorElement={<p>Error loading posts!</p>}
            >
              {(res: { data: { value: { userPosts: EstateRaw[], savedPosts: EstateRaw[] } } }) => {

                return <>
                  {res.data.value.userPosts.length > 0 ?
                    <List listData={res.data.value.userPosts} btnDisabled={true} />
                    :
                    <span className=" text-gray-500">** Nothing to show</span>
                  }
                </>
              }}
            </Await>
          </Suspense>

          <div className="title">
            <h1 className="font-chillax text-2xl font-semibold">Saved List</h1>
          </div>

          <Suspense fallback={<><CardSkeleton /><CardSkeleton /></>}>
            <Await
              resolve={res.user}
              errorElement={<p>Error loading posts!</p>}
            >
              {(res: { data: { value: { userPosts: EstateRaw[], savedPosts: EstateRaw[] } } }) => {

                return <>
                  {res.data.value.savedPosts.length > 0 ?
                    <List listData={res.data.value.savedPosts} btnDisabled={false} />
                    :
                    <span className=" text-gray-500">** Nothing to show</span>
                  }
                </>
              }}
            </Await>
          </Suspense>

        </div>
      </div>

      <div className="chatContainer hidden lg:inline-block"></div>
    </div>
  );
}
