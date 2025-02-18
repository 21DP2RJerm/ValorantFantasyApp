"use client"

import Image from "next/image"
import Link from "next/link"
import { useState } from "react"

export default function Leaderboard() {
  const [name, setName] = useState("")

  return (
    <div className="relative flex justify-center h-screen w-screen space bg-purple-900 ">
      <div className="absolute bg-purple-700 h-screen w-[15%] left-0 flex justify-center items-center border-r-8 border-white">
        <Image
          alt="Logo"
          width={200}
          height={200}
          src="/logo.png"
          style={{ objectFit: "contain" }}
          className="z-0 m-10 top-0 absolute"
          priority
        />
        <div className="w-50% h-50% relative flex-col justify-center items-center grid grid-cols-1">
          <Link href="/home" className="relative p-2 col-span-1 text-2xl">
            Home
          </Link>
          <Link href="/leaderboard" className="relative p-2 col-span-1 text-2xl ">
            Leaderboard
          </Link>
          <Link href="/myteams" className="relative p-2 col-span-1 text-2xl ">
            My Teams
          </Link>
          <Link href="/players" className="relative p-2 col-span-1 text-2xl ">
            Players
          </Link>
          <Link href="/profile" className="relative p-2 col-span-1 text-2xl ">
            Profile
          </Link>
        </div>
      </div>

      <div className="absolute right-0 flex justify-center items-start h-full w-[85%] space bg-purple-400 pt-20">
        <div className="relative w-[70%] h-[80%] bg-purple-700 rounded-lg border-8 border-white flex flex-col overflow-y-auto">
            <div  className="grid grid-cols-12 items-center w-full py-2 border-b-4 border-white last:border-b-0">
                <p className="col-span-1 text-lg text-white text-center">Nr</p>
                <p className="col-span-3 text-lg text-white text-center">Player name</p>
                <p className="col-span-3 text-lg text-white text-center">Team</p>
                <p className="col-span-1 text-lg text-white text-center">Kills</p>
                <p className="col-span-1 text-lg text-white text-center">Deaths</p>
                <p className="col-span-1 text-lg text-white text-center">Assists</p>
                <p className="col-span-2 text-lg text-white text-center">Points</p>
            </div>
        {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12,13,14,15,16].map((index) => (
            <div key={index} className="grid grid-cols-12 items-center w-full py-2 border-b border-white last:border-b-0">
                <p className="col-span-1 text-lg text-white text-center">{index}</p>
                <Link href="/players/profile" className="col-span-3 text-lg text-white text-center ">
                    Jamppi
                </Link>
                <Link href="/team" className="col-span-3 text-lg text-white text-center ">
                    Team Liquid
                </Link>
                <p className="col-span-1 text-lg text-white text-center">57</p>
                <p className="col-span-1 text-lg text-white text-center">53</p>
                <p className="col-span-1 text-lg text-white text-center">23</p>
                <p className="col-span-2 text-lg text-white text-center">426</p>
            </div>
        ))}
        </div>
      </div>
    </div>
  )
}

