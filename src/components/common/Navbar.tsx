import { useState } from "react";
import "../../styles/ui/navbar.scss";
import { Bars3Icon, UserCircleIcon } from "@heroicons/react/24/outline";
import { useLocation } from "react-router-dom";
import clsx from "clsx";
import Chat from "../Profile/Chat";

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isChatOpen, setIsChatOpen] = useState(false);

  const location = useLocation();
  const user = true;

  return (
    <nav className=" z-30 w-full font-chillax">
      <div className="left">
        <div className="relative">
          <div
            className="animation-delay-4000 absolute bottom-0 left-16 h-10 w-10 animate-blob
      rounded-full bg-rose-500 opacity-100 blur-xl"
          ></div>

          <div
            className="animation-delay-2000 absolute -top-5 left-32 h-10 w-10 animate-blob
      rounded-full bg-cyan-600 opacity-100 blur-xl"
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
        className={clsx(`right bg-gray-200 text-[20px] font-medium`, {
          "bg-transparent": location.pathname === "/profile",
        })}
      >
        {user ? (
          <>
            <UserCircleIcon className=" mx-2 h-8 w-8 text-zinc-600 md:mx-4 md:h-10 md:w-10" />
            <span className=" mx-4 hidden font-medium text-zinc-600 lg:inline-block">
              John Doe
            </span>
            <div className="relative cursor-pointer">
              <img
                onClick={() => setIsChatOpen((prev) => !prev)}
                src="/assets/icons/message3.png"
                alt="message"
                className="relative mx-2 h-8 w-8 md:mx-4 md:h-10 md:w-10"
              />
              <div className="absolute right-0 top-0 flex h-6 w-6 -translate-x-1/2 -translate-y-1/3 items-center justify-center rounded-full bg-rose-600 text-sm font-medium text-gray-100">
                3
              </div>
            </div>
          </>
        ) : (
          <>
            <a href="/" className="mx-4 text-zinc-800">
              Sign in
            </a>
            <a href="/" className="mx-4 bg-blue-500 px-6 py-3 text-gray-50">
              Sign up
            </a>
          </>
        )}

        <Bars3Icon
          onClick={() => setIsMenuOpen((prev) => !prev)}
          className="z-30 inline w-8 cursor-pointer text-zinc-800 lg:hidden lg:w-10"
        />

        <div
          className={`z-10 flex flex-col items-center justify-center gap-5 text-2xl font-semibold text-zinc-800 ${isMenuOpen ? "menu active" : "menu"}`}
        >
          <a href="/">Home</a>
          <a href="/">About</a>
          <a href="/">Contact</a>
          <a href="/">Agents</a>
          <a href="/">Sign in</a>
          <a href="/">Sign up</a>
        </div>
      </div>

      <Chat isOpen={isChatOpen} />
    </nav>
  );
}
