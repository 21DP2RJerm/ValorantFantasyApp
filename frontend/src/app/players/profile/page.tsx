"use client"

import Navigation from "@/app/navigation"
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
    <div className="relative flex justify-center h-screen w-screen space bg-purple-900">
       <Navigation/>

      <div className="absolute right-0 flex flex-col items-start h-full w-[85%] space-y-6 bg-purple-400 pt-10 px-6 overflow-y-auto">
        <div className="w-full bg-purple-700 rounded-lg border-8 border-white flex flex-col">
          <div className="flex items-center p-6">
            <div className="flex-shrink-0">
              <Image
                src={player.image}
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
          </div>
          <div className="border-t-4 border-white p-6">
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
        <div className="w-full bg-purple-700 rounded-lg border-8 border-white flex flex-col overflow-y-auto">
          <div className="grid grid-cols-12 items-center w-full py-2 border-b-4 border-white last:border-b-0">
            <p className="col-span-2 text-lg text-white text-center">Date</p>
            <p className="col-span-2 text-lg text-white text-center">vs</p>
            <p className="col-span-2 text-lg text-white text-center">Kills</p>
            <p className="col-span-2 text-lg text-white text-center">Deaths</p>
            <p className="col-span-2 text-lg text-white text-center">Assists</p>
            <p className="col-span-2 text-lg text-white text-center">Points</p>
          </div>
          {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16].map((index) => (
            <div
              key={index}
              className="grid grid-cols-12 items-center w-full py-2 border-b border-white last:border-b-0"
            >
              <p className="col-span-2 text-lg text-white text-center">01/12/25</p>
              <p className="col-span-2 text-lg text-white text-center">Team Heretics</p>
              <p className="col-span-2 text-lg text-white text-center">23</p>
              <p className="col-span-2 text-lg text-white text-center">24</p>
              <p className="col-span-2 text-lg text-white text-center">12</p>
              <p className="col-span-2 text-lg text-white text-center">102</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
