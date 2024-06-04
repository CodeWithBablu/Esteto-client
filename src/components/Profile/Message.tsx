import { UserType, errorHandler, formatLastSeen, formatMessageDate, formatTime, toastMessage, useNotificationStore } from "@/lib";
import {
  ChevronLeftIcon,
  PaperAirplaneIcon,
  UserCircleIcon,
} from "@heroicons/react/24/outline";
import axios, { AxiosError } from "axios";
import clsx from "clsx";
import React, {
  ChangeEvent,
  FormEvent,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import { ChatSkeleton } from "../ui/skeletons";
import { MessageType } from "@/lib/definations";
import { Socket } from "socket.io-client";
import { SocketContext } from "@/context/SocketContext";

export default function Message({
  isMessageOpen,
  setMessageOpen,
  chatInfo,
}: {
  isMessageOpen: boolean;
  setMessageOpen: (state: boolean) => void;
  chatInfo: { sender: string; receiver: UserType | null; chatId: string };
}) {

  const [stickyDate, setStickyDate] = useState('');
  const [messages, setMessages] = useState<MessageType[]>([]);
  const [message, setMessage] = useState("");
  const [isOnline, setIsOnline] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { socket } = useContext(SocketContext) as { socket: Socket };

  const ref = useRef<HTMLTextAreaElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const messageEndRef = useRef<HTMLDivElement>(null);

  const { dec } = useNotificationStore();
  const { sender, receiver, chatId } = chatInfo;

  useEffect(() => {
    const read = async () => {
      try {
        await axios.post(`api/chat/read/${chatId}`);

      } catch (error) {
        if (error instanceof AxiosError) {
          toastMessage("error", error.response?.data.message, 4000);
        } else toastMessage("error", "Failed to read message", 4000);

      }
    };

    const fetchChat = async (chatId: string) => {
      setIsLoading(true);
      try {
        const res = await axios.get(`/api/chat/${chatId}`);
        setMessages(res.data.value.messages);
      } catch (error) {
        if (error instanceof AxiosError) {
          toastMessage("error", error.response?.data.message, 4000);
        } else toastMessage("error", "Coundn't fetch chat", 4000);
      } finally {
        setIsLoading(false);
      }
    };

    if (socket) {
      socket.on("getMessage", async (data) => {
        console.log("Hello");
        if (isMessageOpen && chatId === data.chatId) {
          setMessages((prev) => [...prev, data]);
          read();
        }
      });

      socket.on("userStatus", ({ online }: { online: boolean }) => {
        setIsOnline(online);
      });

      if (isMessageOpen && receiver) {
        socket.emit("getUserStatus", receiver._id as string);
        console.log(formatLastSeen(receiver.lastSeenAt));
      }
    }

    if (chatId && isMessageOpen) {
      fetchChat(chatId);
    }

    return () => {
      if (socket) socket.off("getMessage");
    };
  }, [chatId, isMessageOpen, socket, receiver, dec]);

  useEffect(() => {
    if (messageEndRef.current && isMessageOpen) {
      messageEndRef.current.scrollIntoView({
        block: "end",
        behavior: "smooth",
      });
    }

    const handleScroll = () => {
      const container = containerRef.current;
      if (container) {
        const parentRect = container.getBoundingClientRect();
        const chatDividers = container.querySelectorAll<HTMLDivElement>('.date-divider');

        chatDividers.forEach((divider) => {
          const rect = divider.getBoundingClientRect();
          const top = rect.top - parentRect.top;
          const bottom = rect.bottom - parentRect.top;
          console.log(divider.dataset.date, ":", top, bottom);

          if (top <= 20) {
            console.log(divider.dataset.date, ":", top, bottom);
            setStickyDate(divider.dataset.date || '');
          }
        })
      }
    };

    const container = containerRef.current;
    if (container)
      container.addEventListener('scroll', handleScroll);

    return () => {
      if (container)
        container.removeEventListener('scroll', handleScroll);
    };

  }, [messages, isMessageOpen]);

  // useEffect(() => {
  //   const handleScroll = () => {
  //     const container = containerRef.current;
  //     console.log("Hi");
  //     if (container) {
  //       const chatDividers = container.querySelectorAll<HTMLDivElement>('.date-divider');

  //       for (const divider of chatDividers) {
  //         const rect = divider.getBoundingClientRect();
  //         if (rect.top <= 0 && rect.bottom >= 0) {
  //           console.log(divider.dataset.date);
  //           setStickyDate(divider.dataset.date || '');
  //           break;
  //         }
  //       }
  //     }
  //   };

  //   if (containerRef.current)
  //     containerRef.current.addEventListener('scroll', handleScroll);

  //   // return () => {
  //   //   if (containerRef.current)
  //   //     containerRef.current.removeEventListener('scroll', handleScroll);
  //   // };
  // }, []);

  const handleInput = (e: ChangeEvent<HTMLTextAreaElement>) => {
    if (e.target.value.length === 0 && ref.current) {
      ref.current.style.height = `60px`;
    }

    if (e.target.value.length > 0 && ref.current) {
      if (
        e.target.scrollHeight - 16 >
        parseInt(ref.current.style.height.toString())
      ) {
        ref.current.style.height = `${e.target.scrollHeight}px`;
      }
    }

    setMessage(e.target.value);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  const handleSubmit = async (
    e: FormEvent<HTMLFormElement> | React.KeyboardEvent<HTMLTextAreaElement>,
  ) => {
    e.preventDefault();

    try {
      const res = await axios.post(`api/message/${chatId}`, {
        text: message,
      });
      const updatedMessages = [...messages, res.data.value];
      socket.emit("sendMessage", {
        receiverId: receiver?._id,
        data: res.data.value,
      });
      setMessages(updatedMessages);
      setMessage("");
      if (ref.current) {
        ref.current.style.height = `60px`;
      }
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
  };

  return (
    <div
      className={clsx(
        "messageContainer z-50 absolute left-0 top-0 flex h-full w-full shrink-0 flex-col overflow-hidden bg-zinc-900/90 transition-all duration-300 ease-linear",
        {
          "translate-x-0": isMessageOpen,
          "translate-x-full": !isMessageOpen,
        },
      )}
    >
      {isLoading ? (
        <div className="flex h-full w-full items-center justify-center">
          <ChatSkeleton />
        </div>
      ) : (
        <>
          {receiver && (
            <div className="flex h-[70px] w-full items-center gap-5 self-start bg-zinc-900 px-2 font-chillax shadow-2xl sm:h-[80px] sm:px-5 sm:py-4">
              <ChevronLeftIcon
                onClick={() => {
                  setStickyDate('');
                  setMessageOpen(false);
                }}
                className="mr-2 w-8 cursor-pointer text-gray-200"
              />

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
                      className=" h-12 w-12"
                      dangerouslySetInnerHTML={{
                        __html: receiver?.avatar as string,
                      }}
                    />
                  )}
                </>
              ) : (
                <UserCircleIcon className="mx-2 h-10 w-10 text-zinc-600 md:h-12 md:w-12" />
              )}

              <div className="flex flex-col">
                <h2 className="text-[20px] font-medium text-gray-50 capitalize">
                  {receiver.username}
                </h2>
                <span className="flex items-center text-sm gap-2 font-poppins text-gray-300">
                  <span className={clsx(
                    'w-2 h-2 rounded-full animate-pulse bg-green-600',
                    {
                      'inline-block': isOnline,
                      'hidden': !isOnline
                    })}></span>
                  {isOnline ? 'online' : formatLastSeen(receiver.lastSeenAt)}
                </span>
              </div>
            </div>
          )}

          <div ref={containerRef} className="conversationContainer flex h-full flex-1 flex-col scroll-smooth overflow-y-scroll overflow-x-hidden bg-zinc-950/80 px-5 pb-10 font-poppins text-sm font-medium sm:px-10 sm:text-base">

            <div className=" flex sticky top-5 z-20 justify-center w-full my-3 transition-all duration-300">
              <span className="text-[12px] font-poppins px-3 shadow-lg shadow-orange-500/10 text-orange-500 bg-zinc-900/60 backdrop-blur-xl rounded-full">{stickyDate}</span>
            </div>

            {messages.map((message, index) => {

              const messageDate = formatMessageDate(message.createdAt);
              const prevMessage = index > 0 ? formatMessageDate(messages[index - 1].createdAt) : null;
              const showDateDivider = messageDate !== prevMessage;

              return (
                <React.Fragment key={index}>
                  {showDateDivider && (
                    <div className={clsx(
                      "date-divider flex justify-center w-full mb-3 transition-all duration-100 ease-in-out",
                      {
                        'invisible': stickyDate === messageDate,
                        'visible': stickyDate !== messageDate,
                      }
                    )} data-date={messageDate}>
                      <span className="text-[12px] font-poppins px-3 shadow-lg shadow-orange-500/10 text-orange-500 bg-zinc-900/60 backdrop-blur-xl rounded-full">{messageDate}</span>
                    </div>
                  )}

                  <div
                    key={index}
                    className={clsx(
                      "mt-5 flex w-fit max-w-[90%] flex-col gap-1 py-2 px-3 self-start sm:max-w-[80%] text-left",
                      {
                        "self-start text-gray-300 rounded-r-xl rounded-t-xl rounded-bl-none bg-zinc-800/80": message.sender !== sender,
                        "self-end text-gray-50 rounded-l-xl rounded-t-xl rounded-br-none bg-indigo-600": message.sender === sender,
                      },
                    )}
                  >

                    <p className="w-full whitespace-pre text-sm">
                      {message.text}
                      {message.text.length <= 30 &&
                        <span
                          className={clsx(" text-stone-400 text-sm shrink-0 ml-3")}
                        >
                          {formatTime(message.createdAt)}
                        </span>
                      }
                    </p>

                    {
                      message.text.length > 30 &&
                      <span
                        className={clsx(" text-stone-400 text-sm shrink-0", {
                          "self-start": message.sender !== sender,
                          "self-end": message.sender === sender,
                        })}
                      >
                        {formatTime(message.createdAt)}
                      </span>
                    }

                  </div>
                </React.Fragment>)
            })}

            <div className="mt-5" ref={messageEndRef} />
          </div>

          <div className=" flex h-[100px] w-full items-center justify-center self-end bg-zinc-900/50">
            <form
              onSubmit={handleSubmit}
              className="inputContainer relative flex h-full w-[95%] items-center sm:w-[80%]"
            >
              <textarea
                ref={ref}
                onKeyDown={handleKeyDown}
                onChange={handleInput}
                value={message}
                placeholder="Start new chat here..."
                className="no-scrollbar absolute bottom-[20px] left-0 flex h-auto max-h-[120px] min-h-[60px] w-full resize-none items-center rounded-3xl border 
            border-zinc-700 bg-zinc-900 py-3 pl-6 pr-14 text-[16px] leading-7 text-gray-300 outline-none transition-all
            duration-150 ease-in-out focus:border-indigo-700 sm:w-[80%] sm:px-6"
                name="message"
                id="message"
                rows={1}
              ></textarea>

              <button
                type="submit"
                className="absolute bottom-[] right-[5px] flex h-[50px] w-[50px] items-center justify-center rounded-3xl bg-lime-400 sm:bottom-[20px] sm:right-5 sm:h-14 sm:w-14"
              >
                <PaperAirplaneIcon className="h-6 w-6 -rotate-45 sm:h-8 sm:w-8" />
              </button>
            </form>
          </div>
        </>
      )}
    </div>
  );
}
