"use client";

import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import logo from "../../../public/uni-lectives.svg";
import {
  BookOpenIcon,
  PencilSquareIcon,
  ShieldCheckIcon,
  UserCircleIcon,
  BarsArrowDownIcon,
  BarsArrowUpIcon,
  MoonIcon,
  ArrowRightOnRectangleIcon,
  ArrowLeftOnRectangleIcon,
} from "@heroicons/react/24/outline";
import Tooltip from "@/components/Tooltip/Tooltip";

type NavbarProps = {
  zid: string | undefined;
};

export default function Navbar({ zid }: NavbarProps) {
  const [logout, setLogout] = useState(false);
  const [collapsed, setCollapsed] = useState(true);

  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: any) {
      if (ref.current && !ref.current.contains(event.target)) {
        setCollapsed(true);
      }
    }
    // Bind the event listener
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      // Unbind the event listener on clean up
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [ref]);

  function handleLogout(e: React.MouseEvent<Element, MouseEvent>) {
    setLogout(true);
    if (!logout) {
      e.preventDefault();
    }
  }

  function handleCollapse(val: boolean) {
    setCollapsed(val);
  }

  return (
    // Enlarged (non-collapsed) View
    <div
      ref={ref}
      className={
        collapsed
          ? "fixed flex flex-col items-center w-20 h-screen gap-4 p-4 duration-150 bg-gray-50 z-50 xs:p-2 xs:w-15 xs:gap-2"
          : "fixed flex flex-col w-72 h-screen gap-4 p-4 bg-gray-50 z-40 duration-150"
      }
    >
      {/* Logo */}
      <div className="flex flex-row items-center justify-between h-10 p-2">
        <Tooltip tooltip={collapsed ? "" : ""}>
          <a href="/">
            <Image src={logo} width={33} height={33} alt="logo" priority />
          </a>
        </Tooltip>
        <p
          className={
            collapsed ? "hidden" : "text-xl font-semibold whitespace-nowrap "
          }
        >
          uni-lectives
        </p>
        <BarsArrowDownIcon
          onClick={() => handleCollapse(true)}
          className={
            collapsed
              ? "hidden"
              : "w-12 h-12 p-3 rotate-90 hover:bg-slate-200 rounded-xl"
          }
        />
      </div>
      {/* Navbar Container */}
      <div className="flex flex-col h-full w-full justify-between border-t-2 border-gray-200">
        {/* Review Options */}
        <div
          className={`flex flex-col gap-3 py-3 ${
            collapsed ? "items-center" : "items-left"
          }`}
        >
          <a
            className={
              collapsed
                ? "flex"
                : "flex flex-row items-center hover:bg-slate-200 rounded-xl"
            }
            href="/"
          >
            <Tooltip tooltip={collapsed ? "Browse Courses" : ""}>
              <BookOpenIcon className="w-12 h-12 p-3 hover:bg-slate-200 rounded-xl" />
            </Tooltip>
            <span className={collapsed ? "hidden" : "whitespace-nowrap"}>
              Browse Courses
            </span>
          </a>
          <a
            className={
              collapsed
                ? "flex"
                : "flex flex-row items-center hover:bg-slate-200 rounded-xl"
            }
            href="/user/zid"
          >
            <Tooltip tooltip={collapsed ? "My Reviews" : ""}>
              <PencilSquareIcon className="w-12 h-12 p-3 hover:bg-slate-200 rounded-xl" />
            </Tooltip>
            <span className={collapsed ? "hidden" : "whitespace-nowrap"}>
              My Reviews
            </span>
          </a>
          <a
            className={
              collapsed
                ? "flex"
                : "flex flex-row items-center hover:bg-slate-200 rounded-xl"
            }
            href="/terms-and-conditions"
          >
            <Tooltip tooltip={collapsed ? "Terms and Conditions" : ""}>
              <ShieldCheckIcon className="w-12 h-12 p-3 hover:bg-slate-200 rounded-xl" />
            </Tooltip>
            <span className={collapsed ? "hidden" : "whitespace-nowrap"}>
              Terms and Conditions
            </span>
          </a>
        </div>
        {/* Account Options */}
        <div
          className={`flex flex-col gap-4 py-2 ${
            collapsed ? "items-center" : "items-left"
          }`}
        >
          <div
            className={
              collapsed
                ? "flex flex-col gap-3"
                : "flex flex-row justify-between gap-2"
            }
          >
            <Tooltip tooltip={"Expand"}>
              <BarsArrowUpIcon
                onClick={(e) => setCollapsed(false)}
                className={
                  collapsed
                    ? "w-12 h-12 p-3 rotate-90 hover:bg-slate-200 rounded-xl"
                    : "hidden"
                }
              />
            </Tooltip>
            {collapsed ? (
              <Tooltip tooltip={zid ? `${zid}` : "My Account"}>
                <a href={zid ? `/user/${zid}` : "/api/auth/signin"}>
                  <UserCircleIcon className="w-12 h-12 p-3 hover:bg-slate-200 rounded-xl" />
                </a>
              </Tooltip>
            ) : (
              <a
                className="flex flex-row w-full items-center hover:bg-slate-200 rounded-xl"
                href={zid ? `user/${zid}` : "api/auth/signin"}
              >
                <UserCircleIcon className="w-12 h-12 p-3" />
                <span className="whitespace-nowrap">
                  {zid ? zid : "My Account"}
                </span>
              </a>
            )}
            {collapsed ? (
              <Tooltip tooltip={"Dark Mode"}>
                <MoonIcon
                  title="Dark Mode"
                  className="w-12 h-12 p-3 hover:bg-slate-200 rounded-xl"
                />
              </Tooltip>
            ) : (
              <MoonIcon
                title="Dark Mode"
                className="w-12 h-12 p-3 hover:bg-slate-200 rounded-xl"
              />
            )}
          </div>
          {zid ? (
            collapsed ? (
              <Tooltip tooltip={logout ? "Are you sure?" : "Logout"}>
                <a
                  href={logout ? "/api/auth/signout" : "#"}
                  onClick={(e) => {
                    setLogout(true);
                    if (!logout) {
                      e.preventDefault();
                    }
                  }}
                  onMouseLeave={() => setLogout(false)}
                  className={`flex flex-row items-center justify-center rounded-xl gap-2 ${
                    logout
                      ? "hover:text-red-600 hover:bg-red-100"
                      : "hover:bg-slate-200"
                  }`}
                >
                  <ArrowRightOnRectangleIcon className="w-12 h-12 p-3" />
                </a>
              </Tooltip>
            ) : (
              <a
                href={logout ? "/api/auth/signout" : "#"}
                onClick={(e) => handleLogout(e)}
                onMouseLeave={() => setLogout(false)}
                className={`flex flex-row items-center justify-center rounded-xl gap-2 ${
                  logout
                    ? "hover:text-red-600 hover:bg-red-100"
                    : "hover:bg-slate-200"
                }`}
              >
                <ArrowRightOnRectangleIcon className="w-6 h-12 py-3" />
                {!logout ? (
                  <span className="whitespace-nowrap">Logout</span>
                ) : (
                  <span>Are you sure?</span>
                )}
              </a>
            )
          ) : collapsed ? (
            <Tooltip tooltip={"Login"}>
              <a
                href={"/api/auth/signin"}
                className="flex flex-row items-center justify-center rounded-xl gap-2 hover:bg-slate-200"
              >
                <ArrowLeftOnRectangleIcon className="w-12 h-12 rotate-180 p-3" />
              </a>
            </Tooltip>
          ) : (
            <a
              href={"/api/auth/signin"}
              className="flex flex-row items-center justify-center rounded-xl gap-2 hover:bg-slate-200"
            >
              <ArrowLeftOnRectangleIcon className="w-6 h-12 rotate-180 py-3" />
              <span>Login</span>
            </a>
          )}

          <div className="flex flex-col gap-3 max-h-20">
            <span className={collapsed ? "hidden" : "text-xs"}>
              By using this site, you agree to the{" "}
              <a
                href="/terms-and-conditions"
                className="inline text-blue-500 hover:underline"
              >
                terms and conditions
              </a>
              .
            </span>
            <span className={collapsed ? "hidden" : "text-xs"}>
              © CSESoc 2023, v1.0.0
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
