import { useState } from "react";
import "../../styles/ui/navbar.scss";
import { Bars3Icon, UserCircleIcon } from "@heroicons/react/24/outline";
import { useLocation } from "react-router-dom";
import clsx from "clsx";
import Chat from "../Profile/Chat";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const location = useLocation();
  const user = true;

  const [isChatOpen, setIsChatOpen] = useState(true);


  return (
    <nav className=" z-30 w-full font-chillax">
      <div className="left">
        <div className="relative">
          <div
            className="animation-delay-4000 absolute bottom-0 left-16 h-10 w-10 animate-blob
      rounded-full bg-rose-500 opacity-100 blur-xl filter"
          ></div>

          <div
            className="animation-delay-2000 absolute -top-5 left-32 h-10 w-10 animate-blob
      rounded-full bg-cyan-600 opacity-100 blur-xl filter"
          ></div>

          <a
            href="/"
            className=" relative flex w-fit shrink-0 items-center md:w-12 lg:w-fit "
          >
            <img
              className="h-10 w-10 lg:h-12 lg:w-12 -rotate-90 rounded-full"
              src={"/mountain.png"}
              alt="logo"
            />

            <span className="z-10 ml-2 text-4xl bg-gradient-to-r from-indigo-500 to-teal-500 bg-clip-text font-chillax font-semibold text-transparent">
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

      <div className={clsx(
        `right bg-gray-200 text-[20px] font-medium`,
        { 'bg-transparent': location.pathname === '/profile' }
      )}>
        {user ? (
          <>
            <UserCircleIcon className=" w-8 h-8 md:w-10 md:h-10 mx-2 md:mx-4 text-zinc-600" />
            <span className=" hidden lg:inline-block font-medium mx-4 text-zinc-600">John Doe</span>
            <div className="relative cursor-pointer">
              <img onClick={() => setIsChatOpen((prev) => !prev)} src="/assets/icons/message3.png" alt="message" className="relative w-8 h-8 md:w-10 md:h-10 mx-2 md:mx-4" />
              <div className="absolute right-0 top-0 -translate-x-1/2 -translate-y-1/3 w-6 h-6 rounded-full flex justify-center text-sm items-center text-gray-100 font-medium bg-rose-600">3</div>
            </div>
          </>
        ) : (
          <>
            <a href="/" className="mx-4 text-zinc-800">
              Sign in
            </a>
            <a href="/" className="mx-4 bg-blue-500 text-gray-50 px-6 py-3">
              Sign up
            </a>
          </>)
        }

        <Bars3Icon
          onClick={() => setOpen((prev) => !prev)}
          className="z-30 inline text-zinc-800 w-8 lg:w-10 cursor-pointer lg:hidden"
        />

        <div
          className={`flex flex-col items-center justify-center text-zinc-800 gap-5 z-10 text-2xl font-semibold ${open ? "menu active" : "menu"}`}
        >
          <a href="/">Home</a>
          <a href="/">About</a>
          <a href="/">Contact</a>
          <a href="/">Agents</a>
          <a href="/">Sign in</a>
          <a href="/">Sign up</a>
        </div>
      </div >

      <Chat isOpen={isChatOpen} />

    </nav >
  );
}
