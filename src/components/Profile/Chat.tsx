import { useState } from "react";
import { UserCircleIcon } from "@heroicons/react/24/outline";
import clsx from "clsx";
import { ChatType, UserType } from "@/lib";
import Message from "./Message";

export default function Chat({ isOpen, chats, currUser }: { isOpen: boolean, chats: ChatType[] | [], currUser: UserType | null }) {

  const [isMessageOpen, setIsMessageOpen] = useState(false);
  const [chatInfo, setChatInfo] = useState<{ sender: string, receiver: UserType | null, chatId: string }>({
    sender: "",
    receiver: null,
    chatId: "",
  });

  const handleClick = (sender: string, receiver: UserType | null, chatId: string) => {
    setChatInfo({
      sender,
      receiver,
      chatId
    })
    setIsMessageOpen(true);
  }

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
      {currUser && (
        <>
          {/* //// contactContainer started */}
          <div
            className={clsx(
              "contactContainer relative h-full w-full shrink-0 transition-all duration-500 ease-linear",
              { "blur-sm": isMessageOpen },
            )}
          >
            <div className="flex w-full items-center justify-between px-2 sm:px-5 pt-3">

              <div className="flex items-center gap-5 sm:gap-8">
                {
                  currUser.avatar ? (
                    <>
                      {(!currUser.avatar.includes('<svg')) &&
                        <img src={currUser.avatar} className="h-12 w-12 rounded-full object-cover" alt="avatar" />
                      }
                      {(currUser.avatar.includes('<svg')) &&
                        <div className=" w-12 h-12" dangerouslySetInnerHTML={{ __html: currUser?.avatar as string }} />
                      }
                    </>
                  ) :
                    <UserCircleIcon className="mx-2 h-10 w-10 text-zinc-600 md:h-12 md:w-12" />

                }

                <div className="flex items-center gap-2 sm:flex-col sm:items-start">
                  <span className="text-gray-300/90">hey!</span>
                  <h2 className="text-[20px] font-medium text-gray-50">{currUser.username}</h2>
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

              {chats ? <>
                {chats.map((chat, index) => {
                  const receiver = chat.participants.filter((user) => user._id !== currUser._id)[0] as UserType;
                  return (
                    <div
                      onClick={() => handleClick(currUser._id as string, receiver, chat._id)}
                      key={index}
                      className={clsx(
                        'user relative flex cursor-pointer items-center gap-5 border-b border-zinc-600 py-3 sm:gap-8',
                        {
                          'border-pink-600': !chat.seenBy.includes(currUser._id) && chat.messages.length > 0
                        }
                      )}
                    >

                      {
                        receiver.avatar ? (
                          <>
                            {(!receiver.avatar.includes('<svg')) &&
                              <img src={receiver.avatar} className="h-12 w-12 rounded-full object-cover" alt="avatar" />
                            }
                            {(receiver.avatar.includes('<svg')) &&
                              <div className="w-12 h-12" dangerouslySetInnerHTML={{ __html: receiver.avatar }} />
                            }
                          </>
                        ) :
                          <UserCircleIcon className="mx-2 h-10 w-10 text-zinc-600 md:h-12 md:w-12" />
                      }

                      <div>
                        <h2 className="text-[16px] sm:text-[18px] font-medium text-gray-50">{receiver.username}</h2>
                        <span className="text-gray-300/70 text-[14px] sm:text-[16px]">
                          {chat.latestMessage ? chat.latestMessage : 'Hey! I am on esteto'}
                        </span>
                      </div>

                      <span className={clsx(
                        'absolute right-2 w-2 h-2 bg-pink-600 animate-pulse ease-in rounded-full',
                        {
                          'inline-block': !chat.seenBy.includes(currUser._id) && chat.messages.length > 0,
                          'hidden': chat.seenBy.includes(currUser._id) || chat.messages.length === 0,
                        }
                      )}></span>
                    </div>
                  )
                })}
              </> :
                <span className="text-gray-400 text-center">**Nothing to show</span>
              }

            </div>
          </div>
          {/* //// contactContainer ended */}


          {/* //// messageContainer*/}
          <Message isMessageOpen={isMessageOpen} setIsMessageOpen={setIsMessageOpen} chatInfo={chatInfo} />
        </>
      )}
    </div >
  );
}
