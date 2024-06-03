import { useContext, useEffect, useState } from "react";
import { UserCircleIcon } from "@heroicons/react/24/outline";
import clsx from "clsx";
import {
  ChatType,
  UserType,
  errorHandler,
  toastMessage,
  useNotificationStore,
} from "@/lib";
import Message from "./Message";
import axios, { AxiosError } from "axios";
import { SocketContext } from "@/context/SocketContext";
import { Socket } from "socket.io-client";

export default function Chat({
  isOpen,
  currUser,
}: {
  isOpen: boolean;
  currUser: UserType | null;
}) {
  const [isMessageOpen, setIsMessageOpen] = useState(false);
  const [chatInfo, setChatInfo] = useState<{
    sender: string;
    receiver: UserType | null;
    chatId: string;
  }>({
    sender: "",
    receiver: null,
    chatId: "",
  });

  const [chats, setChats] = useState<ChatType[]>([]);
  const { socket } = useContext(SocketContext) as { socket: Socket };
  const { fetch, dec } = useNotificationStore();

  useEffect(() => {
    if (socket) {
      socket.on("getMessage", () => {

        if (!isMessageOpen) {
          fetch();
          fetchChats()
        }
      });
    }

    if (isOpen) fetchChats();

    return () => {
      if (socket) socket.off("getMessage");
    };
  }, [isOpen, isMessageOpen, socket, fetch]);

  async function fetchChats() {
    try {
      const res = await axios.get("api/chat/");
      setChats(res.data.value);
    } catch (error) {
      if (error instanceof AxiosError) {
        toastMessage("error", error.response?.data.message, 5000);
      } else
        toastMessage(
          "error",
          errorHandler(error, "Failed to sent message") as string,
          5000,
        );
    }
  }

  const handleClick = (
    sender: string,
    receiver: UserType | null,
    chatId: string,
    seenBy: string[],
  ) => {
    if (!seenBy.includes(sender)) {
      const updatedChats = chats.map((chat) => {
        if (chat._id === chatId) {
          chat.seenBy.push(sender);
          dec();
        }
        return chat;
      });
      setChats(updatedChats);
    }
    setChatInfo({
      sender,
      receiver,
      chatId,
    });
    setIsMessageOpen(true);
  };

  return (
    <div
      className={clsx(
        "absolute z-50 left-0 top-[70px] flex h-[calc(100dvh-70px)] w-full max-w-[600px] overflow-hidden bg-zinc-950/90 font-poppins backdrop-blur-2xl transition-all duration-200 ease-in-out sm:left-auto sm:right-10 sm:h-[calc(100dvh-80px)] sm:rounded-2xl",
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
              "contactContainer z-40 sticky top-0 h-full w-full shrink-0 transition-all duration-500 ease-linear",
              { "blur-sm": isMessageOpen },
            )}
          >
            <div className="flex w-full items-center justify-between px-2 pt-3 sm:px-5">
              <div className="flex items-center gap-5 sm:gap-8">
                {currUser.avatar ? (
                  <>
                    {!currUser.avatar.includes("<svg") && (
                      <img
                        src={currUser.avatar}
                        className="h-12 w-12 rounded-full object-cover"
                        alt="avatar"
                      />
                    )}
                    {currUser.avatar.includes("<svg") && (
                      <div
                        className=" h-12 w-12"
                        dangerouslySetInnerHTML={{
                          __html: currUser?.avatar as string,
                        }}
                      />
                    )}
                  </>
                ) : (
                  <UserCircleIcon className="mx-2 h-10 w-10 text-zinc-600 md:h-12 md:w-12" />
                )}

                <div className="flex items-center gap-2 sm:flex-col sm:items-start">
                  <span className="text-gray-300/90">hey!</span>
                  <h2 className="text-[20px] font-medium text-gray-50">
                    {currUser.username}
                  </h2>
                </div>
              </div>

              {/* <XMarkIcon className="w-8 hidden text-gray-300 mr-4" /> */}
            </div>

            <div className="flex items-center gap-5 px-2 pb-3 pt-2 sm:px-5">
              <hr className=" w-[60px] border-orange-400" />
              <h2 className=" font-chillax text-[20px] font-medium text-orange-600">
                Messages
              </h2>
              <hr className=" w-full border-orange-400" />
            </div>

            <div
              className={clsx(
                "cardContainer h-full overflow-y-scroll px-2 pb-44 sm:px-5",
                {
                  "overflow-hidden": isMessageOpen,
                },
              )}
            >
              {chats ? (
                <>
                  {chats.map((chat, index) => {
                    const receiver = chat.participants.filter(
                      (user) => user._id !== currUser._id,
                    )[0] as UserType;
                    return (
                      <div
                        onClick={() =>
                          handleClick(
                            currUser._id as string,
                            receiver,
                            chat._id,
                            chat.seenBy,
                          )
                        }
                        key={index}
                        className={clsx(
                          "user relative flex cursor-pointer items-center gap-5 border-b py-3 sm:gap-8",
                          {
                            "border-pink-600":
                              !chat.seenBy.includes(currUser._id) &&
                              chat.messages.length > 0,
                            "border-zinc-600":
                              chat.seenBy.includes(currUser._id) ||
                              chat.messages.length === 0,
                          },
                        )}
                      >
                        {receiver.avatar ? (
                          <>
                            {!receiver.avatar.includes("<svg") && (
                              <img
                                src={receiver.avatar}
                                className="h-12 w-12 rounded-full object-cover"
                                alt="avatar"
                              />
                            )}
                            {receiver.avatar.includes("<svg") && (
                              <div
                                className="h-12 w-12"
                                dangerouslySetInnerHTML={{
                                  __html: receiver.avatar,
                                }}
                              />
                            )}
                          </>
                        ) : (
                          <UserCircleIcon className="mx-2 h-10 w-10 text-zinc-600 md:h-12 md:w-12" />
                        )}

                        <div>
                          <h2 className="font-chillax text-[16px] font-medium text-gray-50 sm:text-[18px]">
                            {receiver.username}
                          </h2>
                          <span
                            className={clsx(
                              "font-chillax text-[14px] font-medium sm:text-[16px]",
                              {
                                "text-pink-500":
                                  !chat.seenBy.includes(currUser._id) &&
                                  chat.messages.length > 0,
                                "text-gray-300":
                                  chat.seenBy.includes(currUser._id) ||
                                  chat.messages.length === 0,
                              },
                            )}
                          >
                            {chat.latestMessage &&
                              (chat.latestMessage.length > 25
                                ? chat.latestMessage.slice(0, 40) + "..."
                                : chat.latestMessage)}
                            {!chat.latestMessage && "Hey! I am on esteto"}
                          </span>
                        </div>

                        <span
                          className={clsx(
                            "absolute right-2 h-2 w-2 animate-pulse rounded-full bg-pink-600 ease-in",
                            {
                              "inline-block":
                                !chat.seenBy.includes(currUser._id) &&
                                chat.messages.length > 0,
                              hidden:
                                chat.seenBy.includes(currUser._id) ||
                                chat.messages.length === 0,
                            },
                          )}
                        ></span>
                      </div>
                    );
                  })}
                </>
              ) : (
                <span className="text-center text-gray-400">
                  **Nothing to show
                </span>
              )}
            </div>
          </div>
          {/* //// contactContainer ended */}

          {/* //// messageContainer*/}
          <Message
            isMessageOpen={isMessageOpen}
            setIsMessageOpen={setIsMessageOpen}
            chatInfo={chatInfo}
          />
        </>
      )}
    </div>
  );
}
