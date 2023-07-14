"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import logo from "../../../public/uni-lectives.svg";
import { BookOpenIcon, PencilSquareIcon, ShieldCheckIcon, UserCircleIcon, BarsArrowDownIcon, BarsArrowUpIcon, MoonIcon, ArrowRightOnRectangleIcon } from "@heroicons/react/24/outline";

export default function Navbar() {
	const [doLogout, setDoLogout] = useState(false);
	const [maximise, setMaximise] = useState(false);

	return (
		<div className={`fixed flex flex-col h-screen gap-4 p-4 bg-gray-50 z-50 ${maximise ? "w-72" : "w-20"}`}>
			{/* Logo */}
			<div className="flex flex-row items-center justify-between h-10 p-2">
				<Link href="/">
					<Image
						src={logo}
						width={33}
						height={33}
						alt="logo"
						priority
					/>
				</Link>
				<p className={`text-xl font-semibold ${!maximise && "hidden"}`}>Uni-lectives</p>
				<BarsArrowDownIcon onClick={() => setMaximise(false)} className={`w-12 h-12 p-3 rotate-90 hover:bg-slate-200 rounded-xl ${!maximise && "hidden"}`} />
			</div>
			{/* Navbar Container */}
			<div className="flex flex-col h-full w-full justify-between border-t-2 border-gray-200">
				{/* Review Options */}
				<div className="flex flex-col gap-3 items-left py-3">
					<Link className="flex flex-row items-center hover:bg-slate-200 rounded-xl" href="/">
						<BookOpenIcon className="w-12 h-12 p-3" />
						<p className={`${!maximise && "hidden"}`}>Browse Courses</p>
					</Link>
					<Link className="flex flex-row items-center hover:bg-slate-200 rounded-xl" href="/user/zid">
						<PencilSquareIcon className="w-12 h-12 p-3 hover:bg-slate-200 rounded-xl" />
						<p className={`${!maximise && "hidden"}`}>My Reviews</p>
					</Link>					
					<Link className="flex flex-row items-center hover:bg-slate-200 rounded-xl" href="/terms-and-conditions">
						<ShieldCheckIcon className="w-12 h-12 p-3 hover:bg-slate-200 rounded-xl" />
						<p className={`${!maximise && "hidden"}`}>Terms and Conditions</p>
					</Link>
				</div>
				{/* Account Options */}
				<div className="flex flex-col gap-3 py-2 items-left">
					<div className={`flex ${maximise ? "flex-row" : "flex-col"} justify-between gap-2`}>
						<Link className="flex flex-row w-full items-center hover:bg-slate-200 rounded-xl" href="user/zid">
							<UserCircleIcon className="w-12 h-12 p-3" />
							<p className={`${!maximise && "hidden"}`}>Darian Lee</p>
						</Link>
						<BarsArrowUpIcon onClick={() => setMaximise(true)} className={`w-12 h-12 p-3 rotate-90 hover:bg-slate-200 rounded-xl ${maximise && "hidden"}`} />
						<MoonIcon title="Dark Mode" className="w-12 h-12 p-3 hover:bg-slate-200 rounded-xl" />
					</div>
					<a
					href={doLogout ? "/logout" : "#"}
					onClick={(e) => {setDoLogout(true); if(!doLogout){e.preventDefault()}}}
					onMouseLeave={() => setDoLogout(false)} 
					className={`flex flex-row items-center justify-center rounded-xl gap-2 ${doLogout ? "hover:text-red-600 hover:bg-red-100" : "hover:bg-slate-200"}`}>
						<ArrowRightOnRectangleIcon className="w-6 h-12 py-3" />
						{!doLogout ? (					
							<p className={`${!maximise && "hidden"}`}>Logout</p>
						) : (
							<p className={`${!maximise && "hidden"}`}>Are you sure?</p>
						)}
					</a>
					<p className={`text-xs ${!maximise && "hidden"}`}>By using this site, you agree to the <a href="/terms-and-conditions" className="inline text-blue-500 hover:underline lg:hidden">terms and conditions</a></p>
					<p className={`text-xs ${!maximise && "hidden"}`}>© CSESoc 2023, v1.0.0</p>
				</div>
			</div>
		</div>
	)
}