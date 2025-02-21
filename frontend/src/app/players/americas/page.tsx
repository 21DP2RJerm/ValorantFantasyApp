"use client"

import Image from "next/image"
import Link from "next/link"
import { useState } from "react"

export default function Americas() {
  const [name, setName] = useState("")

  // Sample data for top players
  const topPlayers = [
    { name: "Jamppi", kills: 57, deaths: 53, assists: 23, points: 426 },
    { name: "ScreaM", kills: 55, deaths: 48, assists: 20, points: 415 },
    { name: "nAts", kills: 52, deaths: 45, assists: 25, points: 410 },
    { name: "cNed", kills: 50, deaths: 47, assists: 22, points: 405 },
    { name: "Derke", kills: 49, deaths: 46, assists: 21, points: 400 },
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

      <div className="absolute right-0 flex justify-between items-start h-full w-[85%] space-x-4 bg-purple-400 pt-20 px-4">
        <div className="w-[85%] bg-purple-700 rounded-lg border-8 border-white flex flex-col overflow-y-auto">
          <h2 className="text-2xl text-white font-bold text-center py-4">Teams</h2>
          <div className="flex flex-wrap justify-center p-6 gap-4">
            {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map((index) => (
              <Link
                href={'/team'}
                key={index}
                className="flex flex-col items-center justify-center border-4 border-white rounded-lg w-[20%] aspect-square transition-transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-white"
              >
                <Image
                  src="/TL.png"
                  alt="Team Logo"
                  width={140}
                  height={140}
                  style={{ objectFit: "contain" }}
                  className="rounded-full mb-2 mt-4"
                />
                <p className="text-lg text-white text-center">Team Liquid</p>
              </Link>
            ))}
          </div>
        </div>

        <div className="w-[25%] bg-purple-700 rounded-lg border-8 border-white flex flex-col">
          <h2 className="text-2xl text-white font-bold text-center py-4">Top Players of the Week</h2>
          <div className="grid grid-cols-8 items-center w-full py-2 border-b-4 border-white">
            <p className="col-span-3 text-sm text-white text-center">Player</p>
            <p className="col-span-1 text-sm text-white text-center">K</p>
            <p className="col-span-1 text-sm text-white text-center">D</p>
            <p className="col-span-1 text-sm text-white text-center">A</p>
            <p className="col-span-2 text-sm text-white text-center">Points</p>
          </div>
          <div className="overflow-y-auto">
            {topPlayers.map((player, index) => (
              <div
                key={index}
                className="grid grid-cols-8 items-center w-full py-2 border-b border-white last:border-b-0"
              >
                <Link
                  href={`/players/profile`}
                  className="col-span-3 text-sm text-white text-center hover:underline"
                >
                  {player.name}
                </Link>
                <p className="col-span-1 text-sm text-white text-center">{player.kills}</p>
                <p className="col-span-1 text-sm text-white text-center">{player.deaths}</p>
                <p className="col-span-1 text-sm text-white text-center">{player.assists}</p>
                <p className="col-span-2 text-sm text-white text-center">{player.points}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
