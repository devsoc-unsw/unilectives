"use client";
import { useState } from "react";
import LoginWindow from "../LoginWindow/LoginWindow";
import { Session } from "next-auth";
import { signOut } from "next-auth/react";

type LoginButtonProps = {
  session: Session | null;
};

export default function LoginButton({ session }: LoginButtonProps) {
  const [showWindow, setShowWindow] = useState(false);

  if (session === null) {
    return (
      <div className='absolute top-3 right-3 z-10'>
        <button
          className='rounded-3xl px-4 py-2 font-extrabold text-[#182525]  border-[#2B4141] border-2'
          onClick={() => setShowWindow(true)}
        >
          Log In
        </button>
        {showWindow && (
          <LoginWindow session={session} onClose={() => setShowWindow(false)} />
        )}
      </div>
    );
  } else {
      return (<div className='flex absolute top-3 right-3 z-10'>
        {/* <h2 className='text-2xl font-bold mb-4'>Hi {session.user?.email}</h2> */}
        {/* <img src={session.user?.image === null ? "favicon.ico" : session.user?.image}></img> */}
        <button
          className='rounded-3xl px-4 py-2 font-extrabold text-[#182525]  border-[#2B4141] border-2'
          onClick={() => signOut()}
        >
          Sign out
        </button>
      </div>
      );
  }
}
