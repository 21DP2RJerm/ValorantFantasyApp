"use client";

import Image from "next/image"
import React, { useState } from 'react';
import Link from "next/link";
import { useRouter } from 'next/navigation';
import Navigation from "../navigation";
export default function Home() {
    return(
        <div className="relative flex justify-center items-center h-screen w-screen space bg-purple-900 ">
           <Navigation />
        </div>
    )

}