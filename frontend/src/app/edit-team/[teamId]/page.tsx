"use client";

import Image from "next/image";
import React, { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { useRouter,useParams } from "next/navigation";
import Navigation from "../../navigation";
export default function UpdateTeam() {
    const {teamId} = useParams()
    const [teamName, setTeamName] = useState("");
    const [teamRegion, setTeamRegion] = useState("");
    const [teamLogo, setTeamLogo] = useState<File | null>(null);
    const [loading, setLoading] = useState(false);
    const router = useRouter();
    const regions = ["EMEA", "China", "Americas", "Pacific"];

    const fileInputRef = useRef<HTMLInputElement | null>(null);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files.length > 0) {
            setTeamLogo(e.target.files[0]);
        }
    };
    useEffect(() => {
        async function fetchTeamData() {
          try {
            const response = await fetch(`http://127.0.0.1:8000/api/getTeam/${teamId}`)
            if (!response.ok) throw new Error("Failed to fetch player data")
    
            const data = await response.json()
            setTeamName(data.name)
            setTeamRegion(data.region)
            setTeamLogo(data.logo)
            console.log("Player Data:",data.games)
          } catch (error) {
            console.error("Error fetching Player details:", error)
          }
        }
    
        fetchTeamData()
      }, [teamId])

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        const formData = new FormData();
        formData.append("name", teamName);
        formData.append("region", teamRegion);
        formData.append("logo", teamLogo);

        try {
            const response = await fetch(`http://127.0.0.1:8000/api/updateTeam/${teamId}`, {
                method: "POST",
                body: formData,
            });

            if (!response.ok) {
                throw new Error("Failed to update team");
            }

            const data = await response.json();
            alert("Team updated successfully!");
        } catch (error) {
            console.error("Error:", error);
            alert("Failed to update team.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="relative flex justify-center items-center h-screen w-screen bg-gray-900">
           <Navigation/>
            <form onSubmit={handleSubmit} className="flex flex-col items-center z-1 relative bg-purple-500 p-10 rounded-lg">
                <input
                    type="text"
                    name="teamName"
                    placeholder="Enter team name"
                    value={teamName}
                    onChange={(e) => setTeamName(e.target.value)}
                    className="h-12 w-64 mt-8 mb-4 rounded-lg p-4 text-zinc-950"
                    disabled={loading}
                    required
                />
                <select
                      id="team1"
                      value={teamRegion}
                      onChange={(e) => setTeamRegion(e.target.value)}
                      className="h-12 w-64 rounded-lg p-2 text-zinc-950 mb-4"
                      required
                    >
                      <option value="">Select region</option>
                      {regions.map((region) => (
                        <option key={region} value={region}>
                          {region}
                        </option>
                      ))}
                </select>
                <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    onChange={handleFileChange}
                    className="hidden"
                />
                <button
                    type="button"
                    className="bg-white px-6 py-2 rounded-md hover:bg-slate-300 transition-colors text-purple-500 mt-1 mb-6"
                    disabled={loading}
                    onClick={() => fileInputRef.current?.click()}
                >
                    Upload Team Logo
                </button>
                {teamLogo && <p className="text-white">Selected File: {teamLogo.name}</p>}
                <button
                    type="submit"
                    className="bg-white px-6 py-2 rounded-md hover:bg-slate-300 transition-colors text-purple-500 mt-1"
                    disabled={loading}
                >
                    {loading ? "Updating..." : "Update Team"}
                </button>
            </form>
        </div>
    );
}
