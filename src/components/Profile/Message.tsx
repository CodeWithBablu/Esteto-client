import { UserType, errorHandler, toastMessage } from "@/lib";
import { ChevronLeftIcon, PaperAirplaneIcon, UserCircleIcon } from "@heroicons/react/24/outline";
import axios, { AxiosError } from "axios";
import clsx from "clsx";
import { ChangeEvent, FormEvent, useContext, useEffect, useRef, useState } from "react";
import { ChatSkeleton } from "../ui/skeletons";
import { MessageType } from "@/lib/definations";
import { format } from 'timeago.js';
import { Socket } from "socket.io-client";
import { SocketContext } from "@/context/SocketContext";


export default function Message({ isMessageOpen, setIsMessageOpen, chatInfo }: { isMessageOpen: boolean, setIsMessageOpen: (state: boolean) => void, chatInfo: { sender: string, receiver: UserType | null, chatId: string } }) {

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
        }
        else
          toastMessage("error", "Failed to read message", 4000);
      }
    }

    const fetchChat = async (chatId: string) => {
      setIsLoading(true);
      try {
        const res = await axios.get(`/api/chat/${chatId}`);
        setMessages(res.data.value.messages);
      } catch (error) {
        if (error instanceof AxiosError) {
          toastMessage("error", error.response?.data.message, 4000);
        }
        else
          toastMessage("error", "Coundn't fetch chat", 4000);
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
        console.log(online);
      })

      if (isMessageOpen && receiver)
        socket.emit("getUserStatus", receiver._id as string);
    }

    if (chatId && isMessageOpen) {
      fetchChat(chatId);
    }

    return () => {
      if (socket)
        socket.off("getMessage");
    }
  }, [chatId, isMessageOpen, socket, receiver]);

  useEffect(() => {
    if (messageEndRef.current && isMessageOpen) {
      messageEndRef.current.scrollIntoView({ block: "end", behavior: "smooth" });
    }

  }, [messages, isMessageOpen]);

  const handleInput = (e: ChangeEvent<HTMLTextAreaElement>) => {
    if (e.target.value.length === 0 && ref.current) {
      ref.current.style.height = `58px`;
    }
    if (ref.current) {
      console.log(ref.current.style.height);
      console.log(e.target.scrollHeight);
    }

    if (e.target.value.length > 0 && ref.current) {
      if ((e.target.scrollHeight - 16) > parseInt(ref.current.style.height)) {
        console.log("changed height")
        ref.current.style.height = `${e.target.scrollHeight - 16}px`;
      }

      if ((e.target.scrollHeight - 16) < parseInt(ref.current.style.height) * 1.5) {
        console.log("changed height")
        ref.current.style.height = `${e.target.scrollHeight - 16}px`;
      }
    }

    setMessage(e.target.value);
  };

  // if (ref.current) {
  //   console.log(ref.current.style.height);
  //   console.log(e.target.scrollHeight);
  // }
  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    // if (e.shiftKey && e.key === 'Enter' && ref.current) {
    //   console.log(ref.current.scrollHeight);
    //   ref.current.style.height = `${ref.current.scrollHeight + 16}px`;
    // }

    // if (e.key === "Backspace" && ref.current) {
    //   console.log(parseInt(ref.current.style.height));
    //   console.log(ref.current.scrollHeight);
    //   if (parseInt(ref.current.style.height) < ref.current.scrollHeight)
    //     console.log("height-reduced");
    //   ref.current.style.height = `${ref.current.scrollHeight - 16}px`;
    // }

    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }

  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement> | React.KeyboardEvent<HTMLTextAreaElement>) => {
    e.preventDefault();

    try {
      const res = await axios.post(`api/message/${chatId}`, {
        text: message
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
      }
      else
        toastMessage("error", errorHandler(error, "Failed to sent message") as string, 5000);
    }
  }


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
                <div className="flex h-[70px] sm:h-[80px] self-start w-full items-center gap-5 bg-zinc-900 px-2 sm:py-4 font-chillax shadow-2xl sm:px-5">
                  <ChevronLeftIcon
                    onClick={() => {
                      setIsMessageOpen(false);
                    }}
                    className="w-8 mr-5 cursor-pointer text-gray-200"
                  />

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

                  <div className="text-center">
                    <h2 className="text-[20px] font-medium text-gray-50">{receiver.username}</h2>
                    <span className="flex items-center gap-2 text-gray-300">
                      <span className="inline-block h-2 w-2 animate-pulse rounded-full bg-green-500"></span>
                      Online
                    </span>
                  </div>

                </div>
              )
            }


            <div className="conversationContainer flex h-full flex-1 flex-col overflow-y-scroll pb-10 bg-zinc-950/80 font-poppins text-sm sm:text-base font-medium px-5 sm:px-10">

              {messages.map((message, index) => (
                <div key={index} className={clsx(
                  'flex flex-col gap-2 mt-5 self-start w-fit max-w-[90%] sm:max-w-[80%]',
                  {
                    'self-start text-gray-300': message.sender !== sender,
                    'self-end text-gray-50': message.sender === sender,
                  }
                )}>
                  <div className={clsx(
                    'w-fit min-w-[80px] p-3',
                    {
                      'bg-zinc-800/80 rounded-r-2xl rounded-t-2xl rounded-bl-none self-start text-right': message.sender !== sender,
                      'bg-indigo-600 rounded-l-2xl rounded-t-2xl rounded-br-none self-end': message.sender === sender,
                    }
                  )}>
                    <p className="whitespace-pre w-full">
                      {message.text}
                    </p>
                  </div>

                  <span className={clsx(
                    'text-stone-400 self-start',
                    {
                      'self-start': message.sender !== sender,
                      'self-end': message.sender === sender,
                    }
                  )}>{format(message.createdAt)}</span>
                </div>
              ))}

              <div className="mt-5" ref={messageEndRef} />

            </div>

            <div className=" flex w-full items-center justify-center self-end h-[100px] bg-zinc-900/50">
              <form onSubmit={handleSubmit} className="inputContainer flex items-center relative h-full w-[95%] sm:w-[80%]">
                <textarea
                  ref={ref}
                  onKeyDown={handleKeyDown}
                  onChange={handleInput}
                  value={message}
                  placeholder="Start new chat here..."
                  className="no-scrollbar absolute left-0 bottom-[20px] flex items-center min-h-[58px] max-h-[120px] h-auto w-full resize-none rounded-3xl border 
            border-zinc-700 bg-zinc-900 py-3 pl-6 pr-14 leading-7 text-[16px] transition-all duration-150 ease-in-out
            text-gray-300 sm:w-[80%] sm:px-6 focus:border-indigo-700 outline-none"
                  name="message"
                  id="message"
                  rows={1}
                >
                </textarea>

                <button type="submit" className="absolute bottom-[] sm:bottom-[20px] right-[5px] sm:right-5 flex h-[50px] w-[50px] items-center justify-center rounded-3xl bg-lime-400 sm:h-14 sm:w-14">
                  <PaperAirplaneIcon className="h-6 w-6 -rotate-45 sm:h-8 sm:w-8" />
                </button>
              </form>
            </div>
          </>
        )
      }

    </div>
  );
}