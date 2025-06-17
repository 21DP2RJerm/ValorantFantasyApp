"use client"

import Image from "next/image"
import type React from "react"
import { useEffect, useState, useRef } from "react"
import { useRouter } from "next/navigation"
import api from "axios"
import Navigation from "../navigation"

export default function CreateTournament() {
  
  const [name, setName] = useState("")
  const [type, setType] = useState("")
  const [start_date, setStartDate] = useState("")
  const [end_date, setEndDate] = useState("")
  const [location, setLocation] = useState("")
  const [loading, setLoading] = useState(false)
  const [region, setRegion] = useState("")
  const [logo, setLogo] = useState<File | null>(null)
  const [teams, setTeams] = useState([])
  const [selectedTeams, setSelectedTeams] = useState([])
  const [error, setError] = useState<string | null>(null)
  const [isAdmin, setIsAdmin] = useState<boolean | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const router = useRouter()

  const fileInputRef = useRef<HTMLInputElement | null>(null)


  useEffect(() => {
    checkAdminAccess()
  }, [])

  const checkAdminAccess = async () => {
    try {
      const token = localStorage.getItem("userToken")

      if (!token) {
        router.push("/login")
        return
      }
      console.log(token)
      const response = await fetch("http://127.0.0.1:8000/api/verifyAdmin", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: "application/json",
        },
      })

      if (response.ok) {
        const data = await response.json()
        if (data.is_admin) {
          setIsAdmin(true)
        } else {
          setIsAdmin(false)
          router.push("/")
        }
      } else {
        router.push("/home")
      }
    } catch (error) {
      console.error("Error checking admin access:", error)
      router.push("/")
    } finally {
      setIsLoading(false)
    }
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setLogo(e.target.files[0])
    }
  }

  useEffect(() => {
    if (isAdmin) {
      fetchTeams()
    }
  }, [isAdmin])

  async function fetchTeams() {
    try {
      setLoading(true)
      const token = localStorage.getItem("userToken")
      const response = await fetch("http://127.0.0.1:8000/api/allTeams", {
        headers: {
          Authorization: `Bearer ${token}`,
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

  const filteredTeams = region === "" ? teams : teams.filter((team) => team.region === region)

  const toggleTeamSelection = (team: any) => {
    if (selectedTeams.some((selectedTeam) => selectedTeam.id === team.id)) {
      setSelectedTeams(selectedTeams.filter((selectedTeam) => selectedTeam.id !== team.id))
    } else {
      setSelectedTeams([...selectedTeams, team])
    }
  }

  const isTeamSelected = (teamId: number) => {
    return selectedTeams.some((team) => team.id === teamId)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!name || !type || !start_date || !end_date || !location || !logo) {
      setError("Please fill all required fields!")
      return
    }
    if (selectedTeams.length === 0) {
      setError("Please select at least one team!")
      return
    }

    setLoading(true)
    setError(null)

    const formData = new FormData()
    formData.append("name", name)
    formData.append("type", type)
    formData.append("start_date", start_date)
    formData.append("end_date", end_date)
    formData.append("location", location)
    formData.append("logo", logo)
    selectedTeams.forEach((team) => {formData.append("teams[]", team.id)})

    try {
      const token = localStorage.getItem("userToken")
      const response = await api.post("http://127.0.0.1:8000/api/createTournament", formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: "application/json",
        },
      })

      alert("Tournament created successfully!")
      router.push("/tournaments")
    } catch (err: any) {
      console.error("Tournament creation failed:", err)
      setError(err.response?.data?.message || err.message)
      alert(err.response?.data?.message || "Failed to create tournament")
    } finally {
      setLoading(false)
    }
  }

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen w-screen bg-gray-900">
        <div className="text-white text-2xl">Verifying access...</div>
      </div>
    )
  }

  return (
    <div className="relative flex justify-center items-center h-screen w-screen bg-gray-900">
      <Navigation />

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
            </div>
            <input ref={fileInputRef} type="file" accept="image/*" onChange={handleFileChange} className="hidden" />
            <button
              type="button"
              className="bg-white px-6 py-2 rounded-md hover:bg-slate-300 transition-colors text-purple-500 mt-1 mb-6"
              disabled={loading}
              onClick={() => fileInputRef.current?.click()}
            >
              Upload Tournament Logo
            </button>
            {logo && <p className="text-white">Selected File: {logo.name}</p>}
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
                      className="mb-2"
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
