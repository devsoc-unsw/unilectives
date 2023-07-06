import Image from "next/image";
import { BookOpenIcon, PencilSquareIcon, ShieldCheckIcon, UserCircleIcon, MoonIcon, ArrowRightOnRectangleIcon} from "@heroicons/react/24/outline";

export default function AdminSidebar() {
  return (
    <div className="fixed flex flex-col h-screen w-20 gap-4 py-4 bg-gray-100">
      {/* Logo */}
      <div className="px-6">
        <Image
          src="uni-lectives.svg"
          width={18}
          height={18}
          alt="logo"
          layout="responsive"
        />
      </div>
      {/* Toolkit Container */}
      <div className="flex flex-col h-full w-full justify-between border-t-2 border-gray-200">
        {/* Review Options */}
        <div className="flex flex-col gap-3 items-center py-3">
          <div className="h-12 w-12 hover:bg-slate-200 rounded-xl">
            <BookOpenIcon className="w-12 h-12 p-3 bg-transparent"/>
          </div>
          <div className="h-12 w-12 hover:bg-slate-200 rounded-xl">
            <PencilSquareIcon className="w-12 h-12 p-3 bg-transparent"/>
          </div>
          <div className="h-12 w-12 hover:bg-slate-200 rounded-xl">
            <ShieldCheckIcon className="w-12 h-12 p-3 bg-transparent"/>
          </div>
        </div>
        {/* Account Options */}
        <div className="flex flex-col gap-3 py-2 items-center">
          <div className="h-12 w-12 hover:bg-slate-200 rounded-xl">
            <UserCircleIcon className="w-12 h-12 p-3 bg-transparent"/>
          </div>
          <div className="h-12 w-12 hover:bg-slate-200 rounded-xl">
            <MoonIcon className="w-12 h-12 p-3 bg-transparent"/>
          </div>
          <div className="h-12 w-12 hover:bg-slate-200 rounded-xl">
            <ArrowRightOnRectangleIcon className="w-12 h-12 p-3 bg-transparent"/>
          </div>
        </div>
      </div>
    </div>
  )
}