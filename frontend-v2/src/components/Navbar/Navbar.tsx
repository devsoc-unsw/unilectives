"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import logo from "../../../public/uni-lectives.svg";
import { BookOpenIcon, PencilSquareIcon, ShieldCheckIcon, UserCircleIcon, BarsArrowDownIcon, BarsArrowUpIcon, MoonIcon, ArrowRightOnRectangleIcon } from "@heroicons/react/24/outline";
import Tooltip from "@/components/Tooltip/Tooltip";

export default function Navbar() {
  const [doLogout, setDoLogout] = useState(false);
  const [collapsed, setCollapsed] = useState(true);

  return (
    <>
      {/* Collapsed View */}
      {collapsed ? (
        <div className="fixed flex flex-col items-center w-20 h-screen gap-4 p-4 bg-gray-50 z-50 xs:p-2 xs:w-15 xs:gap-2">
          {/* Logo */}
          <div className="flex items-center justify-between h-10 p-2">
            <Link href="/">
              <Image
                src={logo}
                width={33}
                height={33}
                alt="logo"
                priority
              />
            </Link>
          </div>
          {/* Navbar Container */}
          <div className="flex flex-col h-full w-full items-center justify-between border-t-2 border-gray-200">
            {/* Top Section */}
            <div className="flex flex-col gap-3 items-left py-3">
              {/* Browse Courses */}
              <Tooltip
                children={
                <Link className="hover:bg-slate-200 rounded-xl" href="/">
                  <BookOpenIcon className="w-12 h-12 p-3" />
                </Link>}
                tooltip={"Browse Courses"}
              />
              {/* My Reviews */}
              <Tooltip 
                children={
                  <Link className="hover:bg-slate-200 rounded-xl" href="/user/zid">
                    <PencilSquareIcon className="w-12 h-12 p-3 hover:bg-slate-200 rounded-xl" />
                  </Link>}
                tooltip={"My Reviews"}
              />
              {/* Terms and Conditions */}
              <Tooltip 
                children={
                  <Link className="hover:bg-slate-200 rounded-xl" href="/terms-and-conditions">
                    <ShieldCheckIcon className="w-12 h-12 p-3 hover:bg-slate-200 rounded-xl" />
                  </Link>}
                tooltip={"Terms and Conditions"}
              />
            </div>
            {/* Bottom Section */}
            <div className="flex flex-col gap-3 py-2 items-left">
              <div className="flex flex-col justify-between gap-2">
                {/* My Account */}
                <Tooltip 
                  children={
                    <Link className="hover:bg-slate-200 rounded-xl" href="user/zid">
                      <UserCircleIcon className="w-12 h-12 p-3" />
                    </Link>}
                  tooltip={"My Account"}
                />
                {/* Enlarge */}
                <Tooltip 
                  children={
                    <BarsArrowUpIcon onClick={() => setCollapsed(false)} className="w-12 h-12 p-3 rotate-90 hover:bg-slate-200 rounded-xl" />}
                  tooltip={"Expand"}
                />
                {/* Dark Mode */}
                <Tooltip 
                  children={
                    <MoonIcon title="Dark Mode" className="w-12 h-12 p-3 hover:bg-slate-200 rounded-xl" />}
                  tooltip={"Dark Mode"}
                />
              </div>
              {/* Logout Button */}
              <Tooltip
                children={
                <a
                  href={doLogout ? "/logout" : "#"}
                  onClick={(e) => { setDoLogout(true); if (!doLogout) { e.preventDefault() } }}
                  onMouseLeave={() => setDoLogout(false)}
                  className={`flex flex-row items-center justify-center rounded-xl gap-2 ${doLogout ? "hover:text-red-600 hover:bg-red-100" : "hover:bg-slate-200"}`}>
                  <ArrowRightOnRectangleIcon className="w-6 h-12 py-3" />
                </a>}
                tooltip={doLogout ? "Are you sure?" : "Logout"}
              />
            </div>
          </div>
        </div>
      ) : (
        // Enlarged (non-collapsed) View
        <div className="fixed flex flex-col w-72 h-screen gap-4 p-4 bg-gray-50 z-50">
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
            <p className="text-xl font-semibold">Uni-lectives</p>
            <BarsArrowDownIcon onClick={() => setCollapsed(true)} className="w-12 h-12 p-3 rotate-90 hover:bg-slate-200 rounded-xl" />
          </div>
          {/* Navbar Container */}
          <div className="flex flex-col h-full w-full justify-between border-t-2 border-gray-200">
            {/* Review Options */}
            <div className="flex flex-col gap-3 items-left py-3">
              <Link className="flex flex-row items-center hover:bg-slate-200 rounded-xl" href="/">
                <BookOpenIcon className="w-12 h-12 p-3" />
                <span>Browse Courses</span>
              </Link>
              <Link className="flex flex-row items-center hover:bg-slate-200 rounded-xl" href="/user/zid">
                <PencilSquareIcon className="w-12 h-12 p-3 hover:bg-slate-200 rounded-xl" />
                <span>My Reviews</span>
              </Link>
              <Link className="flex flex-row items-center hover:bg-slate-200 rounded-xl" href="/terms-and-conditions">
                <ShieldCheckIcon className="w-12 h-12 p-3 hover:bg-slate-200 rounded-xl" />
                <span>Terms and Conditions</span>
              </Link>
            </div>
            {/* Account Options */}
            <div className="flex flex-col gap-3 py-2 items-left">
              <div className="flex flex-row justify-between gap-2">
                <Link className="flex flex-row w-full items-center hover:bg-slate-200 rounded-xl" href="user/zid">
                  <UserCircleIcon className="w-12 h-12 p-3" />
                  <span>Darian Lee</span>
                </Link>
                <MoonIcon title="Dark Mode" className="w-12 h-12 p-3 hover:bg-slate-200 rounded-xl" />
              </div>
              <a
                href={doLogout ? "/logout" : "#"}
                onClick={(e) => { setDoLogout(true); if (!doLogout) { e.preventDefault() } }}
                onMouseLeave={() => setDoLogout(false)}
                className={`flex flex-row items-center justify-center rounded-xl gap-2 ${doLogout ? "hover:text-red-600 hover:bg-red-100" : "hover:bg-slate-200"}`}>
                <ArrowRightOnRectangleIcon className="w-6 h-12 py-3" />
                {!doLogout ? (
                  <span>Logout</span>
                ) : (
                  <span>Are you sure?</span>
                )}
              </a> 
              <span className="text-xs">By using this site, you agree to the <a href="/terms-and-conditions" className="inline text-blue-500 hover:underline lg:hidden">terms and conditions</a></span>
              <span className="text-xs">© CSESoc 2023, v1.0.0</span>
            </div>
          </div>
        </div>
      )}
    </>
  )
}