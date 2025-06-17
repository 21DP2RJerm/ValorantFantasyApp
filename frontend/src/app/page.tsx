import Image from "next/image"
import Link from "next/link";

export default function Home() {
  return (
    <div className="relative flex justify-center items-center h-screen w-screen">
      <Image
        alt="Background"
        fill={true}
        src="/backgroundmain.png"
        style={{ objectFit: "cover" }}
        className="z-0"
        priority
      />
      <div className="z-10 absolute top-[17%] left-1/2 transform -translate-x-1/2 -translate-y-1/2">
        <div className="relative w-[480px] h-[550px] sm:w-[550px] sm:h-[650px] md:w-[600px] md:h-[700px] lg:w-[650px] lg:h-[750px] xl:w-[700px] xl:h-[800px]">
          <Image alt="omen" src="/omen2.webp" fill className="object-contain" priority />
        </div>
      </div>
      {/* <Image
      //   alt="omen"
      //   src="/omen2.webp"
      //   width={1400}
      //   height={1200}
      //   style={{ objectFit: "contain" }}
      //   className="z-10 absolute top-[17%] left-1/2 transform -translate-x-1/2 -translate-y-1/2"
      //   priority
      // /> */}
      <div className="flex flex-col w-1/2 h-auto py-8 border-4 border-cyan-50 bg-purple-500 relative z-10 rounded-md items-center justify-center space-y-6 top-[25%]">
        <h1 className="text-center text-4xl text-white px-4">
          Join the biggest Valorant Fantasy community out there today!
        </h1>
        <p className="text-center text-xl">
          Assemble a team of your favorite players and have your team face off against the rest of the world to see who can create the best fantasy Valorant team
        </p>
        <div className="flex space-x-4">
          <Link href="/signup">
            <button className=" bg-purple-700 text-white px-6 py-2 rounded-md hover:bg-purple-800 transition-colors">
              Sign Up
            </button>
          </Link>
          <Link href="/login">
            <button className=" bg-white  px-6 py-2 rounded-md hover:bg-slate-300 transition-colors text-purple-500">
              Log In
            </button>
          </Link>
        </div>
      </div>
    </div>
  )
}

