import "../../styles/ui/navbar.scss";
import { useContext, useEffect, useRef, useState } from "react";
import { Bars3Icon } from "@heroicons/react/24/outline";
import { useLocation } from "react-router-dom";
import clsx from "clsx";
import Chat from "../Profile/Chat";
import Menu from "./Menu";
import { UserType } from "@/lib";
import { AuthContext } from "@/context/AuthContext";
import axios from "axios";

export default function Navbar() {
  const refs = useRef({
    chatRef: null as HTMLDivElement | null,
    chatTriggerRef: null as HTMLDivElement | null,
  });
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [chats, setChats] = useState([]);
  const { currUser } = useContext(AuthContext) as { currUser: UserType | null };

  useEffect(() => {

    document.addEventListener("mousedown", handler);
    if (isChatOpen)
      fetchChats();

    return () => {
      document.removeEventListener('mousedown', handler);
    };
  }, [isChatOpen])

  function handler(e: MouseEvent) {
    if (refs.current.chatRef && refs.current.chatTriggerRef)
      if (!refs.current.chatTriggerRef.contains(e.target as Node) && !refs.current.chatRef.contains(e.target as Node)) {
        setIsChatOpen(false);
      }
  }

  async function fetchChats() {
    const res = await axios.get('api/chat/');
    // console.log(res.data.value);
    setChats(res.data.value);
  }

  const location = useLocation();

  return (
    <nav className=" z-30 w-full font-chillax">
      <div className="left">
        <div className="relative">
          <div
            className="animation-delay-4000 absolute bottom-0 left-16 h-10 w-10 animate-blob
      rounded-full bg-teal-500 opacity-100 blur-xl"
          ></div>

          <div
            className="animation-delay-2000 absolute -top-5 left-32 h-10 w-10 animate-blob
      rounded-full bg-indigo-600 opacity-100 blur-xl"
          ></div>

          <a
            href="/"
            className=" relative flex w-fit shrink-0 items-center md:w-12 lg:w-fit bg-transparent"
          >
            <img
              className="h-10 w-10 -rotate-90 rounded-full lg:h-12 lg:w-12"
              src={"/mountain.png"}
              alt="logo"
            />

            <span className="z-10 ml-2 font-chillax text-4xl font-semibold text-zinc-700">
              Esteto
            </span>
          </a>
        </div>

        <div className="navLinks flex items-center gap-[30px] text-[20px] font-medium text-gray-800">
          <a href="/">Home</a>
          <a href="/">About</a>
          <a href="/">Contact</a>
          <a href="/">Agents</a>
        </div>
      </div>

      <div
        className={clsx(`right bg-slate-100 text-[20px] font-medium`, {
          "bg-transparent": location.pathname === "/profile",
        })}
      >
        {currUser ? (
          <>
            <Menu />
            <div ref={(el) => (refs.current.chatTriggerRef = el)} onClick={() => setIsChatOpen(prev => !prev)} className="relative cursor-pointer">
              <img
                src="/assets/icons/message3.png"
                alt="message"
                className="relative mx-4 h-8 w-8 md:mx-4 md:h-10 md:w-10"
              />
              <div className="absolute right-0 top-0 flex h-6 w-6 -translate-x-1/2 -translate-y-1/3 items-center justify-center rounded-full bg-rose-600 text-sm font-medium text-gray-100">
                3
              </div>
            </div>
          </>
        ) : (
          <>
            <a href="/login" className="mx-4 text-zinc-800">
              Sign in
            </a>
            <a href="/register" className="mx-4 bg-blue-500 px-6 py-3 text-gray-50">
              Sign up
            </a>
          </>
        )}

        <Bars3Icon
          onClick={() => setIsMenuOpen(prev => !prev)}
          className={`z-30 inline w-8 cursor-pointer lg:hidden lg:w-10 ${isMenuOpen ? 'text-gray-200' : 'text-zinc-800'}`}
        />

        <div
          className={clsx(
            `z-10 flex flex-col items-center justify-center gap-5 text-2xl font-semibold text-slate-200`,
            {
              'menu active': isMenuOpen,
              'menu': !isMenuOpen
            }
          )}
        >
          <a href="/">Home</a>
          <a href="/">About</a>
          <a href="/">Contact</a>
          <a href="/">Agents</a>
          {
            currUser ?
              <>
                <a href="/profile">Profile</a>
                <a className="mt-5 text-red-500" href="/profile">Logout</a>
              </> :
              <>
                <a href="/login">Sign in</a>
                <a href="/register">Sign up</a>
              </>
          }
        </div>


      </div>

      <div ref={(el) => { refs.current.chatRef = el }}>
        <Chat isOpen={isChatOpen} chats={chats} currUser={currUser} />
      </div>
    </nav >
  );
}
