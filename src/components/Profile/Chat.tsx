// import { XMarkIcon } from "@heroicons/react/24/outline";
import { ChevronLeftIcon } from "@heroicons/react/24/outline";
import clsx from "clsx";
import { useState } from "react";

export default function Chat({ isOpen }: { isOpen: boolean }) {
  const dummy = Array.from({ length: 20 }, (_, index) => index + 1);

  const [isMessageOpen, setIsMessageOpen] = useState(false);

  return (
    <div
      className={clsx(
        "absolute left-0 top-[100px] flex h-[calc(100vh-100px)] w-full max-w-[640px] translate-x-full overflow-hidden bg-gradient-to-b from-zinc-900/90 from-50% to-gray-900/90 px-2 font-poppins backdrop-blur-3xl transition-all duration-700 ease-linear sm:left-auto sm:right-0 sm:rounded-l-3xl sm:px-5",
        {
          "translate-x-0": isOpen,
          "translate-x-full": !isOpen,
        },
      )}
    >
      {/* //// contactContainer started */}
      <div
        className={clsx(
          "contactContainer relative h-full w-full shrink-0 transition-all duration-500 ease-linear",
          { 'blur-md': isMessageOpen }
        )}
      >
        <div className="flex w-full items-center justify-between py-5 ">
          <div className="flex items-center gap-5 sm:gap-10">
            <img
              className="h-10 w-10 rounded-full object-cover sm:h-14 sm:w-14"
              src="https://images.pexels.com/photos/1205033/pexels-photo-1205033.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
              alt="user"
            />
            <div>
              <span className="text-gray-300/90">hey</span>
              <h2 className="text-[20px] font-medium text-gray-50">John</h2>
            </div>
          </div>

          {/* <XMarkIcon className="w-8 hidden text-gray-300 mr-4" /> */}
        </div>

        <div className="mb-3 flex items-center gap-5">
          <hr className=" w-[60px] border-orange-200" />
          <h2 className=" font-chillax text-[20px] font-medium text-orange-500">
            Messages
          </h2>
          <hr className=" w-full border-orange-200" />
        </div>

        <div
          className={clsx("cardContainer h-full overflow-y-scroll", {
            "overflow-hidden": isMessageOpen,
          })}
        >
          <div className="user flex gap-5 border-b border-zinc-600 py-2 sm:gap-8">
            <img
              className="h-12 w-12 rounded-full object-cover sm:h-16 sm:w-16"
              src="https://images.pexels.com/photos/2379005/pexels-photo-2379005.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
              alt="user"
            />

            <div>
              <h2 className="text-[20px] font-medium text-gray-50">
                {"Rohit (Cythe)"}
              </h2>
              <span className="text-gray-300/90">
                Aare kya kar raha hai namune...
              </span>
            </div>
          </div>

          {dummy.map((val, index) => (
            <div
              onClick={() => {
                setIsMessageOpen(true);
              }}
              key={index}
              className="user flex cursor-pointer gap-5 border-b border-zinc-600 py-3 sm:gap-8"
            >
              <img
                className="h-12 w-12 rounded-full object-cover sm:h-16 sm:w-16"
                src="https://images.pexels.com/photos/2379005/pexels-photo-2379005.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                alt="user"
              />

              <div>
                <h2 className="text-[20px] font-medium text-gray-100">{val}</h2>
                <span className="text-gray-300/90">
                  I am going for this number{index}...
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
      {/* //// contactContainer ended */}

      {/* //// messageContainer started */}
      <div
        className={clsx(
          "messageContainer absolute left-0 top-0 z-30 h-full w-full shrink-0 translate-x-full bg-zinc-900/90 transition-all duration-500 ease-linear",
          {
            "translate-x-0": isMessageOpen,
            "translate-x-full": !isMessageOpen,
          },
        )}
      >
        <div className="flex w-full items-center justify-between py-5 ">
          <div className="flex items-center gap-5 font-chillax shadow-2xl px-2 sm:px-5">
            <ChevronLeftIcon
              onClick={() => {
                setIsMessageOpen(false);
              }}
              className="w-8 cursor-pointer text-gray-200"
            />
            <img
              className="h-10 w-10 rounded-full object-cover sm:h-14 sm:w-14"
              src="https://images.pexels.com/photos/2379005/pexels-photo-2379005.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
              alt="user"
            />
            <div>
              <h2 className="text-[20px] font-medium text-gray-50">John</h2>
              <span className="flex items-center gap-2 text-gray-300">
                <span className="inline-block h-2 w-2 animate-pulse rounded-full bg-green-500"></span>
                Online
              </span>
            </div>
          </div>

          {/* <XMarkIcon className="w-8 hidden text-gray-300 mr-4" /> */}
        </div>

        <div className="conversationContainer h-full overflow-y-scroll pb-44"></div>
      </div>
      {/* //// contactContainer ended */}
    </div>
  );
}
