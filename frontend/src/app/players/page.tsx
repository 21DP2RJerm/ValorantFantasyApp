"use client"

import Image from "next/image"
import Link from "next/link"
import { useState } from "react"

export default function Players() {
  const [name, setName] = useState("")

  const regions = [
    { name: "EMEA", src: "/emea.png", href: "/players/emea" },
    { name: "Americas", src: "/americas.png", href: "/players/americas" },
    { name: "Pacific", src: "/pacific.png", href: "/players/pacific" },
    { name: "China", src: "/china.png", href: "/players/china" },
  ]

  return (
    <div className="relative flex justify-center h-screen w-screen space bg-purple-900">
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
          <Link href="/home" className="relative p-2 col-span-1 text-2xl text-white">
              Home
          </Link>
          <Link href="/leaderboard" className="relative p-2 col-span-1 text-2xl text-white">
              Leaderboard
          </Link>
          <Link href="/myteams" className="relative p-2 col-span-1 text-2xl text-white">
              My Teams
          </Link>
          <Link href="/players" className="relative p-2 col-span-1 text-2xl text-white">
              Players
          </Link>
          <Link href="/profile" className="relative p-2 col-span-1 text-2xl text-white">
              Profile
          </Link>
        </div>
      </div>

      <div className="absolute right-0 flex justify-center items-center h-full w-[85%] bg-purple-400">
        <div className="grid grid-cols-2 gap-8 w-[80%] h-[80%]">
          {regions.map((region, index) => (
            <Link
              key={index}
              href={region.href}
              className="bg-purple-700 rounded-lg border-8 border-white flex items-center justify-center overflow-hidden transition-transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-white"
            >
              <Image
                alt={`${region.name} Logo`}
                width={200}
                height={200}
                src={region.src || "/placeholder.svg"}
                style={{ objectFit: "contain" }}
                className="w-full h-full p-4"
                priority
              />
              <span className="sr-only">View {region.name} players</span>
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}
