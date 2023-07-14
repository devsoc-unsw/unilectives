"use client";

import Link from "next/link";
import { useState } from "react";
import { ArrowRightOnRectangleIcon } from "@heroicons/react/24/outline";
import React from "react";

export default function Logout() {
  const [doLogout, setDoLogout] = useState(false); 

	return (
		<a
			href={doLogout ? "/logout" : "#"}
			onClick={(e) => {setDoLogout(true); if(!doLogout){e.preventDefault()}}}
			onMouseLeave={() => setDoLogout(false)} 
			className={`flex flex-row items-center justify-center rounded-xl gap-2 ${doLogout ? "hover:text-red-600 hover:bg-red-100" : "hover:bg-slate-200"}`}>
				<ArrowRightOnRectangleIcon className="w-6 h-12 py-3" />
				{!doLogout ? (					
					<p className="lg:hidden">Logout</p>
				) : (
					<p className="lg:hidden">Are you sure?</p>
				)}
		</a>
	)
}