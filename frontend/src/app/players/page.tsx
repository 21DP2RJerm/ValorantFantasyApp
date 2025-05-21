"use client"

import Image from "next/image"
import Link from "next/link"
import { useState } from "react"
import Navigation from "../navigation"

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
      <Navigation/>

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
