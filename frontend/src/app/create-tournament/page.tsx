"use client"

import Image from "next/image"
import type React from "react"
import { useEffect, useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import api from "axios"

interface Team {
  id: number
  name: string
  logo: string
  region: string
}

export default function CreateTournament() {
  const [name, setName] = useState("")
  const [type, setType] = useState("")
  const [start_date, setStartDate] = useState("")
  const [end_date, setEndDate] = useState("")
  const [location, setLocation] = useState("")
  const [loading, setLoading] = useState(false)
  const [region, setRegion] = useState("")
  const [teams, setTeams] = useState<Team[]>([])
  const [selectedTeams, setSelectedTeams] = useState<Team[]>([])
  const [error, setError] = useState<string | null>(null)
  const router = useRouter()

  useEffect(() => {
    async function fetchTeams() {
      try {
        setLoading(true)
        const response = await fetch("http://127.0.0.1:8000/api/allTeams", {
          headers: {
            Accept: "application/json",
          },
        })
        const data = await response.json()
        console.log(data)
        setTeams(data)
      } catch (error) {
        console.error("Error fetching teams:", error)
        setError("Failed to load teams")
      } finally {
        setLoading(false)
      }
    }
    fetchTeams()
  }, [])

  // Filter teams by selected region
  const filteredTeams = region === "" ? teams : teams.filter((team) => team.region === region)

  // Toggle team selection
  const toggleTeamSelection = (team: Team) => {
    if (selectedTeams.some((selectedTeam) => selectedTeam.id === team.id)) {
      // If team is already selected, remove it
      setSelectedTeams(selectedTeams.filter((selectedTeam) => selectedTeam.id !== team.id))
    } else {
      // If team is not selected, add it
      setSelectedTeams([...selectedTeams, team])
    }
  }

  // Check if a team is selected
  const isTeamSelected = (teamId: number) => {
    return selectedTeams.some((team) => team.id === teamId)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!name || !type || !start_date || !end_date || !location) {
      alert("Please fill all required fields!")
      return
    }

    if (selectedTeams.length === 0) {
      alert("Please select at least one team for the tournament!")
      return
    }

    setLoading(true)
    setError(null)
    try {
      // Add credentials: 'include' to send cookies if your API uses session authentication
      const response = await api.post(
        "http://127.0.0.1:8000/api/createTournament",
        {
          name: name,
          type: type,
          start_date: start_date,
          end_date: end_date,
          location: location,
          teams: selectedTeams.map((team) => team.id), // Send only team IDs
        },
        {
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
        },
      )

      console.log("Response status:", response.status)

      alert("Tournament created successfully!")
      router.push("/home") // Redirect to home page after successful creation
    } catch (error: any) {
      console.error("Tournament creation failed:", error)
      setError(error.message || "Failed to create tournament")
      alert(error.message || "Failed to create tournament")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="relative flex justify-center items-center h-screen w-screen bg-purple-900">
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

      <div className="flex justify-center align-center items-start w-[85%] absolute right-0 h-full">
        <div className="flex flex-col items-center z-1 relative bg-purple-500 p-10 rounded-lg m-10 w-[30%] h-[80%]">
          <form onSubmit={handleSubmit} className="flex flex-col items-center w-full">
            <h1 className="text-2xl font-bold text-white mb-4">Create Tournament</h1>

            {error && (
              <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4 w-full">{error}</div>
            )}

            <input
              type="text"
              name="name"
              placeholder="Enter tournament name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="h-12 w-64 mt-4 mb-4 rounded-lg p-4 text-zinc-950"
              disabled={loading}
              required
            />
            <select
              name="type"
              value={type}
              onChange={(e) => setType(e.target.value)}
              className="h-12 w-64 my-4 rounded-lg p-4 text-zinc-950"
              disabled={loading}
              required
            >
              <option value="">Select tournament type</option>
              <option value="Masters">Masters</option>
              <option value="Champions">Champions</option>
              <option value="Kickoff">Kickoff</option>
              <option value="Challengers">Regular Season</option>
            </select>
            <input
              id="startDate"
              type="date"
              name="startDate"
              value={start_date}
              onChange={(e) => setStartDate(e.target.value)}
              className="h-12 w-64 my-4 rounded-lg p-4 text-zinc-950"
              disabled={loading}
              required
            />
            <input
              id="endDate"
              type="date"
              name="endDate"
              value={end_date}
              onChange={(e) => setEndDate(e.target.value)}
              className="h-12 w-64 my-4 rounded-lg p-4 text-zinc-950"
              disabled={loading}
              required
            />
            <input
              type="text"
              name="location"
              placeholder="Enter tournament location"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              className="h-12 w-64 my-4 rounded-lg p-4 text-zinc-950"
              disabled={loading}
              required
            />
            <div className="mt-4 w-64 text-white">
              <p className="font-semibold mb-2">Selected Teams: {selectedTeams.length}</p>
              <div className="flex flex-wrap gap-2">
                {selectedTeams.map((team) => (
                  <div key={team.id} className="bg-purple-700 px-2 py-1 rounded-md text-sm flex items-center">
                    {team.name}
                    <button
                      type="button"
                      onClick={() => toggleTeamSelection(team)}
                      className="ml-2 text-white hover:text-red-300"
                    >
                      ✕
                    </button>
                  </div>
                ))}
              </div>
            </div>
            <button
              type="submit"
              className="bg-white px-6 py-2 rounded-md hover:bg-slate-300 transition-colors text-purple-500 mt-6 font-semibold"
              disabled={loading}
            >
              {loading ? "Creating..." : "Create Tournament"}
            </button>
          </form>
        </div>

        <div className="flex flex-col items-center z-1 relative bg-purple-500 p-10 rounded-lg m-10 w-[60%] h-[80%] overflow-hidden">
          <h2 className="text-2xl font-bold text-white mb-4">Select Teams</h2>

          <select
            name="region"
            value={region}
            onChange={(e) => setRegion(e.target.value)}
            className="h-12 w-64 mb-6 rounded-lg p-4 text-zinc-950"
          >
            <option value="">All Regions</option>
            <option value="EMEA">EMEA</option>
            <option value="CHINA">CHINA</option>
            <option value="AMERICAS">AMERICAS</option>
            <option value="PACIFIC">PACIFIC</option>
          </select>

          <div className="w-full flex-grow overflow-y-auto">
            <div className="grid grid-cols-4 gap-4">
              {loading ? (
                <p className="text-white col-span-2 text-center">Loading teams...</p>
              ) : filteredTeams.length > 0 ? (
                filteredTeams.map((team) => (
                  <div
                    key={team.id}
                    className={`flex flex-col items-center justify-center border-4 ${
                      isTeamSelected(team.id) ? "border-green-400" : "border-white"
                    } rounded-lg cursor-pointer p-4`}
                    onClick={() => toggleTeamSelection(team)}
                  >
                    <Image
                      src={team.logo || "/placeholder.svg"}
                      alt={team.name}
                      width={80}
                      height={80}
                      style={{ objectFit: "contain" }}
                      className="rounded-full mb-2"
                    />
                    <p className="text-lg text-white text-center">{team.name}</p>
                    <p className="text-sm text-white text-center opacity-75">{team.region}</p>
                  </div>
                ))
              ) : (
                <p className="text-white col-span-2 text-center">No teams found for this region</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
