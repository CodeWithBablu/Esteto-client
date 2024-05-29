import { UserType, errorHandler, toastMessage } from "@/lib";
import {
  ChevronLeftIcon,
  PaperAirplaneIcon,
  UserCircleIcon,
} from "@heroicons/react/24/outline";
import axios, { AxiosError } from "axios";
import clsx from "clsx";
import {
  ChangeEvent,
  FormEvent,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import { ChatSkeleton } from "../ui/skeletons";
import { MessageType } from "@/lib/definations";
import { format } from "timeago.js";
import { Socket } from "socket.io-client";
import { SocketContext } from "@/context/SocketContext";

export default function Message({
  isMessageOpen,
  setIsMessageOpen,
  chatInfo,
}: {
  isMessageOpen: boolean;
  setIsMessageOpen: (state: boolean) => void;
  chatInfo: { sender: string; receiver: UserType | null; chatId: string };
}) {
  const [messages, setMessages] = useState<MessageType[]>([]);
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { socket } = useContext(SocketContext) as { socket: Socket };

  const ref = useRef<HTMLTextAreaElement>(null);
  const messageEndRef = useRef<HTMLDivElement>(null);

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
      socket.on("getMessage", (data) => {
        if (isMessageOpen && chatId === data.chatId)
          setMessages((prev) => [...prev, data]);
        read();
      });

      socket.on("userStatus", ({ online }) => {
        // console.log(online);
      });

      if (isMessageOpen && receiver)
        socket.emit("getUserStatus", receiver._id as string);
    }

    if (chatId && isMessageOpen) {
      fetchChat(chatId);
    }

    return () => {
      if (socket) socket.off("getMessage");
    };
  }, [chatId, isMessageOpen, socket, receiver]);

  useEffect(() => {
    if (messageEndRef.current && isMessageOpen) {
      messageEndRef.current.scrollIntoView({
        block: "end",
        behavior: "smooth",
      });
    }
  }, [messages, isMessageOpen]);

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
        "messageContainer absolute left-0 top-0 z-30 flex h-full w-full shrink-0 flex-col overflow-hidden bg-zinc-900/90 transition-all duration-300 ease-linear",
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
                  setIsMessageOpen(false);
                }}
                className="mr-5 w-8 cursor-pointer text-gray-200"
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

              <div className="text-center">
                <h2 className="text-[20px] font-medium text-gray-50">
                  {receiver.username}
                </h2>
                <span className="flex items-center gap-2 text-gray-300">
                  <span className="inline-block h-2 w-2 animate-pulse rounded-full bg-green-500"></span>
                  Online
                </span>
              </div>
            </div>
          )}

          <div className="conversationContainer flex h-full flex-1 flex-col overflow-y-scroll bg-zinc-950/80 px-5 pb-10 font-poppins text-sm font-medium sm:px-10 sm:text-base">
            {messages.map((message, index) => (
              <div
                key={index}
                className={clsx(
                  "mt-5 flex w-fit max-w-[90%] flex-col gap-2 self-start sm:max-w-[80%]",
                  {
                    "self-start text-gray-300": message.sender !== sender,
                    "self-end text-gray-50": message.sender === sender,
                  },
                )}
              >
                <div
                  className={clsx("w-fit min-w-[80px] p-3", {
                    "self-start rounded-r-2xl rounded-t-2xl rounded-bl-none bg-zinc-800/80 text-right":
                      message.sender !== sender,
                    "self-end rounded-l-2xl rounded-t-2xl rounded-br-none bg-indigo-600":
                      message.sender === sender,
                  })}
                >
                  <p className="w-full whitespace-pre">{message.text}</p>
                </div>

                <span
                  className={clsx("self-start text-stone-400", {
                    "self-start": message.sender !== sender,
                    "self-end": message.sender === sender,
                  })}
                >
                  {format(message.createdAt)}
                </span>
              </div>
            ))}

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
