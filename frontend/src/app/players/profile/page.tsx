"use client"

import Image from "next/image"
import Link from "next/link"

export default function PlayerProfile() {
  // Sample player data
  const player = {
    name: "Jamppi",
    team: "Team Liquid",
    role: "Initiator",
    image: "/jamppi.png",
    stats: {
      kills: 245,
      deaths: 200,
      assists: 150,
      points: 426,
    },
  }

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
        <div className="relative w-[70%] h-[30%] bg-purple-700 rounded-lg border-8 border-white flex flex-col">
          <div className="flex items-center p-6">
            <div className="flex-shrink-0">
              <Image
                src={player.image }
                alt={`${player.name}'s profile picture`}
                width={200}
                height={200}
                style={{ objectFit: "contain" }}
                className="rounded-full border-4 border-white"
              />
            </div>
            <div className="flex-grow ml-8">
              <div className="text-4xl text-white mb-2">{player.name}</div>
              <div className="text-2xl text-white">{player.team}</div>
              <div className="text-2xl text-white">{player.role}</div>
            </div>
            <div className="flex-grow ml-8 h-full w-full mt-16">
              <div className="grid grid-cols-4 gap-4 text-white">
                {Object.entries(player.stats).map(([stat, value]) => (
                  <div key={stat} className="flex flex-col items-center justify-center">
                    <p className="text-lg font-semibold capitalize">{stat}</p>
                    <p className="text-3xl font-bold">{value}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

