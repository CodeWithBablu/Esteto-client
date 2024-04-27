import { ChangeEvent, useRef, useState } from "react";
import { PaperAirplaneIcon } from "@heroicons/react/24/solid";
import { ChevronLeftIcon } from "@heroicons/react/24/outline";
import clsx from "clsx";

export default function Chat({ isOpen }: { isOpen: boolean }) {

  const [isMessageOpen, setIsMessageOpen] = useState(false);
  const ref = useRef<HTMLTextAreaElement>(null);


  const dummy = Array.from({ length: 20 }, (_, index) => index + 1);

  const handleInput = (e: ChangeEvent<HTMLTextAreaElement>) => {
    if (e.target.value.length === 0 && ref.current) {
      ref.current.style.height = `60px`;
    }
    if (e.target.value.length > 0 && ref.current) {
      ref.current.style.height = `${e.target.scrollHeight - 16}px`;
    }
  };

  return (
    <div
      className={clsx(
        "absolute left-0 top-[70px] flex h-[calc(100dvh-70px)] sm:h-[calc(100dvh-80px)] w-full max-w-[640px] overflow-hidden bg-zinc-950/90 font-poppins backdrop-blur-2xl transition-all duration-200 ease-in-out sm:left-auto sm:right-10 sm:rounded-2xl",
        {
          "translate-x-0": isOpen,
          "translate-x-[calc(100%+2.5rem)]": !isOpen,
        },
      )}
    >
      {/* //// contactContainer started */}
      <div
        className={clsx(
          "contactContainer relative h-full w-full shrink-0 transition-all duration-500 ease-linear",
          { "blur-sm": isMessageOpen },
        )}
      >
        <div className="flex w-full items-center justify-between px-2 sm:px-5 pt-3">
          <div className="flex items-center gap-5 sm:gap-10">
            <img
              className="h-10 w-10 rounded-full object-cover sm:h-14 sm:w-14"
              src="https://images.pexels.com/photos/1205033/pexels-photo-1205033.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
              alt="user"
            />
            <div className="flex items-center gap-2 sm:flex-col">
              <span className="text-gray-300/90">hey!</span>
              <h2 className="text-[20px] font-medium text-gray-50">John</h2>
            </div>
          </div>

          {/* <XMarkIcon className="w-8 hidden text-gray-300 mr-4" /> */}
        </div>

        <div className="pt-2 pb-3 flex items-center gap-5 px-2 sm:px-5">
          <hr className=" w-[60px] border-orange-400" />
          <h2 className=" font-chillax text-[20px] font-medium text-orange-600">
            Messages
          </h2>
          <hr className=" w-full border-orange-400" />
        </div>

        <div
          className={clsx("cardContainer h-full overflow-y-scroll pb-44 px-2 sm:px-5", {
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
              <h2 className="text-[16px] sm:text-[18px] font-medium text-gray-50">
                {"Rohit (Cythe)"}
              </h2>
              <span className="text-gray-300/70 text-[14px] sm:text-[16px]">
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
                <h2 className="text-[16px] sm:text-[18px] font-medium text-gray-50">{val}</h2>
                <span className="text-gray-300/70 text-[14px] sm:text-[16px]">
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
          "messageContainer absolute left-0 top-0 z-30 flex h-full w-full shrink-0 flex-col overflow-hidden bg-zinc-900/90 transition-all duration-300 ease-linear",
          {
            "translate-x-0": isMessageOpen,
            "translate-x-full": !isMessageOpen,
          },
        )}
      >
        <div className="flex h-[70px] sm:h-[80px] w-full items-center justify-between gap-5 bg-zinc-900 px-2 sm:py-4 font-chillax shadow-2xl sm:px-5">
          <ChevronLeftIcon
            onClick={() => {
              setIsMessageOpen(false);
            }}
            className="w-8 cursor-pointer text-gray-200"
          />

          <div className="text-center">
            <h2 className="text-[20px] font-medium text-gray-50">John Doe</h2>
            <span className="flex items-center gap-2 text-gray-300">
              <span className="inline-block h-2 w-2 animate-pulse rounded-full bg-green-500"></span>
              Online
            </span>
          </div>

          <img
            className="h-10 w-10 rounded-full object-cover sm:h-14 sm:w-14"
            src="https://images.pexels.com/photos/2379005/pexels-photo-2379005.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
            alt="user"
          />
        </div>

        <div className="conversationContainer flex h-full flex-1 flex-col overflow-y-scroll pb-10 bg-zinc-950/80 font-poppins text-sm sm:text-base font-medium px-5 sm:px-10">

          <div className="flex flex-col gap-2 mt-5 self-start w-fit max-w-[90%] sm:max-w-[80%] text-gray-300">
            <div className="bg-zinc-800/80 w-fit p-3 rounded-r-2xl rounded-t-2xl rounded-bl-none">
              <p>
                rohit chal khelte hai bgmi
                aa ra kya
              </p>
            </div>

            <span className="text-slate-400 self-start">7:11 PM</span>
          </div>


          <div className="flex flex-col gap-2 mt-5 self-end w-fit  max-w-[90%] sm:max-w-[80%] text-gray-100">
            <div className="bg-indigo-600 w-fit p-3 rounded-l-2xl rounded-t-2xl rounded-br-none">
              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatibus temporibus voluptatum obcaecati, enim aut maiores?
              </p>
            </div>

            <span className="text-slate-400 self-end">7:11 PM</span>
          </div>

          <div className="flex flex-col gap-2 mt-5 self-start w-fit  max-w-[90%] sm:max-w-[80%] text-gray-300">
            <div className="bg-zinc-800/80 w-fit p-3 rounded-r-2xl rounded-t-2xl rounded-bl-none">
              <p>
                rohit chal khelte hai bgmi
                aa ra kya
              </p>
            </div>

            <span className="text-slate-400 self-start">7:11 PM</span>
          </div>


          <div className="flex flex-col gap-2 mt-5 self-end w-fit  max-w-[90%] sm:max-w-[80%] text-gray-100">
            <div className="bg-indigo-600 w-fit p-3 rounded-l-2xl rounded-t-2xl rounded-br-none">
              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatibus temporibus voluptatum obcaecati, enim aut maiores?
              </p>
            </div>

            <span className="text-slate-400 self-end">7:11 PM</span>
          </div>

          <div className="flex flex-col gap-2 mt-5 self-start w-fit  max-w-[90%] sm:max-w-[80%] text-gray-300">
            <div className="bg-zinc-800/80 w-fit p-3 rounded-r-2xl rounded-t-2xl rounded-bl-none">
              <p>
                rohit chal khelte hai bgmi
                aa ra kya
              </p>
            </div>

            <span className="text-slate-400 self-start">7:11 PM</span>
          </div>


          <div className="flex flex-col gap-2 mt-5 self-end w-fit  max-w-[90%] sm:max-w-[80%] text-gray-100">
            <div className="bg-indigo-600 w-fit p-3 rounded-l-2xl rounded-t-2xl rounded-br-none">
              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatibus temporibus voluptatum obcaecati, enim aut maiores?
              </p>
            </div>

            <span className="text-slate-400 self-end">7:11 PM</span>
          </div>

          <div className="flex flex-col gap-2 mt-5 self-start w-fit  max-w-[90%] sm:max-w-[80%] text-gray-300">
            <div className="bg-zinc-800/80 w-fit p-3 rounded-r-2xl rounded-t-2xl rounded-bl-none">
              <p>
                rohit chal khelte hai bgmi
                aa ra kya
              </p>
            </div>

            <span className="text-slate-400 self-start">7:11 PM</span>
          </div>


          <div className="flex flex-col gap-2 mt-5 self-end w-fit max-w-[90%] sm:max-w-[80%] text-gray-100">
            <div className="bg-indigo-600 w-fit p-3 rounded-l-2xl rounded-t-2xl rounded-br-none">
              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatibus temporibus voluptatum obcaecati, enim aut maiores?
              </p>
            </div>

            <span className="text-slate-400 self-end">7:11 PM</span>
          </div>

        </div>

        <div className=" flex w-full items-center justify-center h-[100px] bg-zinc-900/50">
          <div className="inputContainer flex items-center relative h-full w-[95%] sm:w-[80%]">
            <textarea
              ref={ref}
              onChange={handleInput}
              placeholder="Start new chat here..."
              className="no-scrollbar absolute left-0 bottom-[20px] flex items-center min-h-[60px] max-h-[120px] h-auto w-full resize-none rounded-3xl border 
                border-zinc-700 bg-zinc-900 py-3 pl-6 pr-14 leading-[calc(1em+15px)] transition-all duration-150 ease-linear
                text-gray-300 sm:w-[80%] sm:px-6 focus:border-indigo-700 outline-none"
              name="message"
              id="message"
              rows={1}
            >
            </textarea>

            <button className="absolute bottom-[] sm:bottom-[20px] right-[5px] sm:right-5 flex h-[50px] w-[50px] items-center justify-center rounded-3xl bg-lime-400 sm:h-14 sm:w-14">
              <PaperAirplaneIcon className="h-6 w-6 -rotate-45 sm:h-8 sm:w-8" />
            </button>
          </div>
        </div>
      </div>
      {/* //// contactContainer ended */}
    </div>
  );
}
