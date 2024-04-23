import Searchbar from "../components/home/Searchbar";
import "../styles/pages/homePage.scss";

export default function HomePage() {
  return (
    <div className="homePage font-poppins">
      <div className="textContainer">
        <div className="wrapper flex h-full flex-col justify-center gap-3 sm:gap-10">
          <h1 className=" text-4xl font-medium md:text-6xl">
            Find Real Estate & Get your dream place
          </h1>

          <p className="font-light">
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Ullam, ut
            ducimus beatae quasi cupiditate molestiae ea quae consequuntur non.
            Vero!
          </p>

          <Searchbar />

          <div className="boxes hidden flex-row justify-between gap-5 sm:flex lg:items-center lg:gap-0">
            <div className="box">
              <h1 className=" text-3xl font-semibold">16+</h1>
              <h2 className=" text-xl font-light">Years of Experience</h2>
            </div>
            <div className="box">
              <h1 className=" text-3xl font-semibold">200</h1>
              <h2 className=" text-xl font-light">Award Gained</h2>
            </div>
            <div className="box">
              <h1 className=" text-3xl font-semibold">2000+</h1>
              <h2 className=" text-xl font-light">Property Ready</h2>
            </div>
          </div>
        </div>
      </div>

      <div className="imgContainer relative hidden bg-gray-200 lg:block">
        <div className="absolute left-10 top-[6%] h-[15rem] w-[15rem] animate-blob rounded-full bg-gradient-radial from-cyan-500/40 blur-2xl filter xl:h-[25rem] xl:w-[25rem]"></div>
        <div className="animation-delay-7000 absolute left-0 top-[20%] h-[15rem] w-[15rem] animate-blob rounded-full bg-gradient-radial from-pink-500/40 blur-2xl filter xl:h-[25rem] xl:w-[25rem]"></div>

        <div className="relative z-10 flex h-full w-full items-center">
          <img
            className="absolute right-0 w-[105%] max-w-none xl:w-[115%]"
            src="/assets/home/bgnew.png"
            alt="bghome"
          />
        </div>
      </div>
    </div>
  );
}
