// import { XMarkIcon } from "@heroicons/react/24/outline";
import { ChevronLeftIcon } from "@heroicons/react/24/outline";
import clsx from "clsx";
import { useState } from "react";

export default function Chat({ isOpen }: { isOpen: boolean }) {

  const dummy = Array.from({ length: 20 }, (_, index) => index + 1);

  const [isMessageOpen, setIsMessageOpen] = useState(false);

  return (
    <div className={clsx(
      'absolute font-poppins left-0 flex sm:left-auto h-[calc(100vh-100px)] overflow-hidden bg-gradient-to-b from-zinc-900/90 from-50% to-gray-900/90 backdrop-blur-3xl sm:right-0 top-[100px] max-w-[640px] px-2 sm:px-5 w-full sm:rounded-l-3xl transition-all translate-x-full ease-linear duration-700',
      {
        '-translate-x-0': isOpen,
        'translate-x-full': !isOpen,
      }
    )}>

      {/* //// contactContainer started */}
      < div className={clsx(
        'relative h-full w-full shrink-0 contactContainer transition-all ease-linear duration-300'
      )}>

        <div className="flex items-center justify-between w-full py-5 ">

          <div className="flex items-center gap-5 sm:gap-10">
            <img className="h-10 w-10 sm:h-14 sm:w-14 rounded-full object-cover" src="https://images.pexels.com/photos/1205033/pexels-photo-1205033.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" alt="user" />
            <div>
              <span className="text-gray-300/90">hey</span>
              <h2 className="text-gray-50 font-medium text-[20px]">John</h2>
            </div>
          </div>

          {/* <XMarkIcon className="w-8 hidden text-gray-300 mr-4" /> */}
        </div>

        <div className="mb-3 flex gap-5 items-center" >
          <hr className=" w-[60px] border-orange-200" />
          <h2 className=" font-chillax font-medium text-[20px] text-orange-500">Messages</h2>
          <hr className=" w-full border-orange-200" />
        </div>

        <div className={clsx(
          'cardContainer h-full overflow-y-scroll',
          { 'overflow-hidden': isMessageOpen }
        )}>

          <div className="user flex gap-5 py-2 sm:gap-8 border-b border-zinc-600">
            <img className="h-12 w-12 sm:h-16 sm:w-16 object-cover rounded-full" src="https://images.pexels.com/photos/2379005/pexels-photo-2379005.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" alt="user" />

            <div>
              <h2 className="text-gray-50 font-medium text-[20px]">{'Rohit (Cythe)'}</h2>
              <span className="text-gray-300/90">Aare kya kar raha hai namune...</span>
            </div>
          </div>

          {dummy.map((val, index) => (
            <div onClick={() => { setIsMessageOpen(true) }} key={index} className="user cursor-pointer flex gap-5 py-3 sm:gap-8 border-b border-zinc-600">
              <img className="h-12 w-12 sm:h-16 sm:w-16 object-cover rounded-full" src="https://images.pexels.com/photos/2379005/pexels-photo-2379005.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" alt="user" />

              <div>
                <h2 className="text-gray-100 font-medium text-[20px]">{val}</h2>
                <span className="text-gray-300/90">I am going for this number{index}...</span>
              </div>
            </div>
          ))}

        </div>

      </div>
      {/* //// contactContainer ended */}


      {/* //// messageContainer started */}
      <div className={clsx(
        'absolute top-0 left-0 z-30 bg-zinc-900/90 backdrop-blur-xl h-full w-full shrink-0 messageContainer transition-all ease-linear duration-500 translate-x-full',
        {
          '-translate-x-0': isMessageOpen,
          'translate-x-full': !isMessageOpen,
        }
      )}>

        <div className="flex items-center justify-between w-full py-5 ">

          <div className="flex items-center gap-5 font-chillax shadow-2xl">
            <ChevronLeftIcon onClick={() => { setIsMessageOpen(false) }} className="w-8 text-gray-200 cursor-pointer" />
            <img className="h-10 w-10 sm:h-14 sm:w-14 rounded-full object-cover" src="https://images.pexels.com/photos/2379005/pexels-photo-2379005.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" alt="user" />
            <div>
              <h2 className="text-gray-50 font-medium text-[20px]">John</h2>
              <span className="text-gray-300 flex items-center gap-2"><span className="w-2 h-2 animate-pulse inline-block bg-green-500 rounded-full"></span>Online</span>
            </div>
          </div>

          {/* <XMarkIcon className="w-8 hidden text-gray-300 mr-4" /> */}
        </div>


        <div className="conversationContainer h-full overflow-y-scroll pb-44">



        </div>

      </div>
      {/* //// contactContainer ended */}


    </div >
  );
}