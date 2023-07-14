import Image from "next/image";
import Link from "next/link";
import logo from "../../../public/uni-lectives.svg";
import Logout from "@/components/Logout/Logout";
import { BookOpenIcon, PencilSquareIcon, ShieldCheckIcon, UserCircleIcon, BarsArrowDownIcon, MoonIcon, ArrowRightOnRectangleIcon } from "@heroicons/react/24/outline";

export default function Navbar() {
	return (
		<div className="fixed flex flex-col h-screen w-72 gap-4 p-4 bg-gray-50 lg:w-20">
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
				<p className="text-xl font-semibold lg:hidden">Uni-lectives</p>
				<BarsArrowDownIcon title="Minimise (Coming Soon)" className="w-12 h-12 p-3 rotate-90 hover:bg-slate-200 rounded-xl lg:hidden" />
			</div>
			{/* Navbar Container */}
			<div className="flex flex-col h-full w-full justify-between border-t-2 border-gray-200">
				{/* Review Options */}
				<div className="flex flex-col gap-3 items-left py-3">
					<Link className="flex flex-row items-center hover:bg-slate-200 rounded-xl" href="/">
						<BookOpenIcon className="w-12 h-12 p-3" />
						<p className="lg:hidden">Browse Courses</p>
					</Link>
					<Link className="flex flex-row items-center hover:bg-slate-200 rounded-xl" href="/user/zid">
						<PencilSquareIcon className="w-12 h-12 p-3 hover:bg-slate-200 rounded-xl" />
						<p className="lg:hidden">My Reviews</p>
					</Link>					
					<Link className="flex flex-row items-center hover:bg-slate-200 rounded-xl" href="/terms-and-conditions">
						<ShieldCheckIcon className="w-12 h-12 p-3 hover:bg-slate-200 rounded-xl" />
						<p className="lg:hidden">Terms and Conditions</p>
					</Link>
				</div>
				{/* Account Options */}
				<div className="flex flex-col gap-3 py-2 items-left">
					<div className="flex flex-row justify-between gap-2 lg:flex-col">
						<Link className="flex flex-row w-full items-center hover:bg-slate-200 rounded-xl" href="user/zid">
							<UserCircleIcon className="w-12 h-12 p-3" />
							<p className="lg:hidden">Name</p>
						</Link>
						<MoonIcon title="Dark Mode" className="w-12 h-12 p-3 bg-transparent hover:bg-slate-200 rounded-xl" />
					</div>
					<Logout />
					<p className="text-xs lg:hidden">By using this site, you agree to the <a href="/terms-and-conditions" className="inline text-blue-500 hover:underline lg:hidden">terms and conditions</a></p>
					<p className="text-xs lg:hidden">© CSESoc 2023, v1.0.0</p>
				</div>
			</div>
		</div>
	)
}