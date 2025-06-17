"use client"

import Image from "next/image"
import { useState, useEffect } from "react"
import Navigation from "../navigation"

export default function Home() {
  const [tournament, setTournament] = useState([])
  const [games, setGames] = useState([])
  const [topPlayer, setTopPlayer] = useState([])

  useEffect(() => {
    async function fetchTournamentData() {
      try {
        const response = await fetch(`http://127.0.0.1:8000/api/getLatestTournamentInfo`)
        if (!response.ok) throw new Error("Failed to fetch tournament data")

        const data = await response.json()
        setTournament(data.tournament)
        setGames(data.games)
        setTopPlayer(data.top_player)
        console.log("tournament Data:", data)
      } catch (error) {
        console.error("Error fetching tournament details:", error)
      }
    }

    fetchTournamentData()
  }, [])

  return (
    <div className="relative flex justify-end items-center h-screen w-screen space bg-gray-900 pr-10">
      <Navigation />
      <div className="relative w-[50%] h-[65%] bg-purple-700 rounded-lg border-8 mr-10 border-white flex flex-col text-center items-center">
        <p className="sm:text-lg lg:text-2xl text-white text-center font-bold pt-5">Welcome to the Fantasy Valorant League</p>
        <div className="flex flex-row text-center w-full justify-center space-x-2">
          <p className="sm:text-lg lg:text-xl text-white text-center font-bold pt-5">Head over to</p>
          <p className="sm:text-lg lg:text-xl text-gray-900 text-center font-bold pt-5">My Teams</p>
          <p className="sm:text-lg lg:text-xl text-white text-center font-bold pt-5">to create yours right now</p>
        </div>
        <div className="flex flex-row text-center w-full justify-center space-x-2">
          <p className="sm:text-lg lg:text-xl text-white text-center font-bold pt-5">Or check out other teams in the</p>
          <p className="sm:text-lg lg:text-xl text-gray-900 text-center font-bold pt-5">Leaderboard</p>
        </div>
        <div className="flex flex-row text-center w-full justify-center space-x-2">
          <p className="sm:text-lg lg:text-xl text-white text-center font-bold pt-5">Have a look at the players and teams of the league in the</p>
          <p className="sm:text-lg lg:text-xl text-gray-900 text-center font-bold pt-5">Players</p>
          <p className="sm:text-lg lg:text-xl   text-white text-center font-bold pt-5">Section</p>
        </div>
        <p className="sm:text-lg lg:text-2xl text-white text-center font-bold pt-3">Player spotlight</p>
        <div className="bg-purple-900 rounded-lg border-white mt-3 p-4 flex items-center flex-shrink-0 shadow-xl">
          <div className="flex-shrink-0">
            <Image
              src={`http://127.0.0.1:8000/storage/players/${topPlayer.image}`}
              alt={topPlayer.name || "Top player"}
              width={150}
              height={150}
              style={{ objectFit: "cover" }}
              className="rounded-full border-2 border-white"
            />
          </div>
          <div className="flex-grow">
            <p className="text-lg text-white font-bold">{tournament.name}</p>
            <p className="text-3xl text-white font-bold p-2">{topPlayer.name || "Top player"}</p>
            <p className="text-xl text-purple-300">K/D: {topPlayer.kills_deaths_ratio}</p>
          </div>
        </div>
      </div>
      <div className="relative w-[20%] h-[65%] bg-purple-700 rounded-lg border-8 mx-10 border-white flex flex-col">
        <div className="relative flex items-center p-6 h-1/3 overflow-hidden rounded-t-lg">
          {tournament.logo && (
            <div className="absolute inset-0">
              <Image
                src={`http://127.0.0.1:8000/storage/tournaments/${tournament.logo}`}
                alt={tournament.name || "tournament"}
                fill
                style={{ objectFit: "cover" }}
              />
              <div className="absolute inset-0 bg-black bg-opacity-50"></div>
            </div>
          )}

          {tournament.type == "Masters" && (
            <Image
              src={"/masters.png"}
              alt="Masters"
              width={70}
              height={70}
              style={{
                zIndex: 10,
              }}
            />
          )}
          {tournament.type == "Champions" && (
            <Image
              src={"/champions.webp"}
              alt="champions"
              width={70}
              height={70}
              style={{
                zIndex: 10,
              }}
            />
          )}
          {tournament.type == "Regional" && (
            <Image
              src={"/regional.png"}
              alt="regional"
              width={70}
              height={70}
              style={{
                zIndex: 10,
              }}
            />
          )}
          {tournament.type == "Kickoff" && (
            <Image
              src={"/regional.png"}
              alt="regional"
              width={70}
              height={70}
              style={{
                zIndex: 10,
              }}
            />
          )}
          <div className="relative z-10 flex-grow ml-8">
            <div className="text-2xl text-white mb-2 font-bold">{tournament.name}</div>
          </div>
        </div>
        {games.length > 0 ? (
          games.map((game, index) => (
            <div
              key={game.id}
              className="relative w-full h-1/3 border-y-2 border-white flex flex-row items-center justify-between p-2"
            >
              <div className="flex items-center justify-center">
                <Image
                  src={`http://127.0.0.1:8000/storage/teams/${game.results[0].team_logo}`}
                  alt={"team1"}
                  width={80}
                  height={80}
                  style={{ objectFit: "contain" }}
                  className="max-w-full max-h-full"
                />
              </div>
              <div className="flex flex-col items-center justify-center flex-1 px-4">
                <p className="text-lg text-white text-center font-bold">
                  {game.results[0].score + " : " + game.results[1].score}
                </p>
                <p className="text-sm text-white text-center truncate">{game.game_name}</p>
              </div>
              <div className="flex items-center justify-center">
                <Image
                  src={`http://127.0.0.1:8000/storage/teams/${game.results[1].team_logo}`}
                  alt={"team2"}
                  width={80}
                  height={80}
                  style={{ objectFit: "contain" }}
                  className="max-w-full max-h-full"
                />
              </div>
            </div>
          ))
        ) : (
          <p className="text-white text-lg col-span-full text-center">Loading games...</p>
        )}
      </div>
    </div>
  )
}
