import Image from "next/image";
import Link from "next/link";
import logo from "../../../public/uni-lectives.svg";
import { BookOpenIcon, PencilSquareIcon, ShieldCheckIcon, UserCircleIcon, BarsArrowDownIcon, MoonIcon, ArrowRightOnRectangleIcon } from "@heroicons/react/24/outline";

export default function Navbar() {
	return (
		<div className="fixed flex flex-col h-screen w-72 gap-4 p-4 bg-gray-50">
			{/* Logo */}
			<div className="flex flex-row items-center justify-between h-10 p-3">
				<Link href="/">
					<Image
						src={logo}
						width={33}
						height={33}
						alt="logo"
						priority
					/>
				</Link>
				<p className="text-xl font-semibold">Uni-lectives</p>
				<BarsArrowDownIcon title="Minimise " className="w-12 h-12 p-3 rotate-90 hover:bg-slate-200 rounded-xl" />
			</div>
			{/* Toolkit Container */}
			<div className="flex flex-col h-full w-full justify-between border-t-2 border-gray-200">
				{/* Review Options */}
				<div className="flex flex-col gap-3 items-left py-3">
					<Link className="flex flex-row items-center hover:bg-slate-200 rounded-xl" href="/">
						<BookOpenIcon className="w-12 h-12 p-3" />
						<p>Browse Courses</p>
					</Link>
					<Link className="flex flex-row items-center hover:bg-slate-200 rounded-xl" href="/user/zid">
						<PencilSquareIcon className="w-12 h-12 p-3 hover:bg-slate-200 rounded-xl" />
						<p>My Reviews</p>
					</Link>					
					<Link className="flex flex-row items-center hover:bg-slate-200 rounded-xl" href="/terms-and-conditions">
						<ShieldCheckIcon className="w-12 h-12 p-3 hover:bg-slate-200 rounded-xl" />
						<p>Terms and Conditions</p>
					</Link>
				</div>
				{/* Account Options */}
				<div className="flex flex-col gap-3 py-2 items-left">
					{/* link to `/user/{zID} */}
					<div className="flex flex-row justify-between gap-2">
						<Link className="flex flex-row w-full items-center hover:bg-slate-200 rounded-xl" href="user/zid">
							<UserCircleIcon className="w-12 h-12 p-3" />
							<p>Name</p>
						</Link>
						<MoonIcon title="Dark Mode" className="w-12 h-12 p-3 bg-transparent hover:bg-slate-200 rounded-xl" />
					</div>
					<Link className="flex flex-row items-center justify-center hover:text-red-600 hover:bg-red-100 rounded-xl gap-2" href="/logout">
						<ArrowRightOnRectangleIcon className="w-6 h-12 py-3" />
						<p>Logout</p>
					</Link>
					<p className="text-xs">By using this site, you agree to the <a href="/terms-and-conditions" className="inline text-blue-500 hover:underline">terms and conditions</a></p>
					<p className="text-xs">© CSESoc 2023, v1.0.0</p>
				</div>
			</div>
		</div>
	)
}