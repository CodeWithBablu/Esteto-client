import { UserType } from "@/lib";
import { ChevronLeftIcon, PaperAirplaneIcon, UserCircleIcon } from "@heroicons/react/24/outline";
import axios from "axios";
import clsx from "clsx";
import { ChangeEvent, useEffect, useRef, useState } from "react";
import { ChatSkeleton } from "../ui/skeletons";



export default function Message({ isMessageOpen, setIsMessageOpen, chatInfo }: { isMessageOpen: boolean, setIsMessageOpen: (state: boolean) => void, chatInfo: { sender: string, receiver: UserType | null, chatId: string } }) {
  const { sender, receiver, chatId } = chatInfo;

  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (chatId && isMessageOpen)
      fetchChat(chatId);

  }, [chatId, isMessageOpen]);

  async function fetchChat(chatId: string) {
    setIsLoading(true);
    console.log("popos");

    setTimeout(async () => {
      const res = await axios.get(`/api/chat/${chatId}`);
      console.log(res.data);
      setIsLoading(false);
    }, 3000);
  }


  const ref = useRef<HTMLTextAreaElement>(null);

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
        "messageContainer absolute left-0 top-0 z-30 flex h-full w-full shrink-0 flex-col overflow-hidden bg-zinc-900/90 transition-all duration-300 ease-linear",
        {
          "translate-x-0": isMessageOpen,
          "translate-x-full": !isMessageOpen,
        },
      )}
    >

      {
        isLoading ? (
          <div className="flex w-full h-full items-center justify-center">
            <ChatSkeleton />
          </div>
        ) : (
          <>
            {
              receiver && (
                <div className="flex h-[70px] sm:h-[80px] w-full items-center justify-between gap-5 bg-zinc-900 px-2 sm:py-4 font-chillax shadow-2xl sm:px-5">
                  <ChevronLeftIcon
                    onClick={() => {
                      setIsMessageOpen(false);
                    }}
                    className="w-8 cursor-pointer text-gray-200"
                  />

                  <div className="text-center">
                    <h2 className="text-[20px] font-medium text-gray-50">{receiver.username}</h2>
                    <span className="flex items-center gap-2 text-gray-300">
                      <span className="inline-block h-2 w-2 animate-pulse rounded-full bg-green-500"></span>
                      Online
                    </span>
                  </div>

                  {
                    receiver.avatar ? (
                      <>
                        {(!receiver.avatar.includes('<svg')) &&
                          <img src={receiver.avatar} className="h-12 w-12 rounded-full object-cover" alt="avatar" />
                        }
                        {(receiver.avatar.includes('<svg')) &&
                          <div className=" w-12 h-12" dangerouslySetInnerHTML={{ __html: receiver?.avatar as string }} />
                        }
                      </>
                    ) :
                      <UserCircleIcon className="mx-2 h-10 w-10 text-zinc-600 md:h-12 md:w-12" />

                  }
                </div>
              )
            }


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
          </>
        )
      }

    </div>
  );
}