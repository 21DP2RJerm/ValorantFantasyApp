"use client"

import Image from "next/image"
import Link from "next/link"
import { useState } from "react"
import Navigation from "../navigation"
export default function Leaderboard() {
  const [name, setName] = useState("")

  return (
    <div className="relative flex justify-center h-screen w-screen space bg-purple-900 ">
      <Navigation/>   

      <div className="absolute right-0 flex justify-center items-start h-full w-[85%] space bg-purple-400 pt-20">
        <div className="relative w-[70%] h-[80%] bg-purple-700 rounded-lg border-8 border-white flex flex-col overflow-y-auto">
            <div  className="grid grid-cols-12 items-center w-full py-2 border-b-4 border-white last:border-b-0">
                <p className="col-span-1 text-lg text-white text-center">Nr</p>
                <p className="col-span-2 text-lg text-white text-center">User</p>
                <p className="col-span-7 text-lg text-white text-center">Player</p>
                <p className="col-span-2 text-lg text-white text-center">Points</p>

            </div>
        {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12,13,14,15,16].map((index) => (
            <div key={index} className="grid grid-cols-12 items-center w-full py-2 border-b border-white last:border-b-0">
            <p className="col-span-1 text-lg text-white text-center">{index}</p>
            <p className="col-span-2 text-lg text-white text-center">Jertix</p>
            <p className="col-span-7 text-lg text-white text-center">Jamppi, Chronicle, Boaster, Aspas, Redgar</p>
            <p className="col-span-2 text-lg text-white text-center">426</p>
            </div>
        ))}
        </div>
      </div>
    </div>
  )
}
