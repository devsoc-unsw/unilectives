"use client";
import { useState } from "react";
import { Session } from "next-auth";
import { signIn, signOut } from "next-auth/react";

type LoginButtonProps = {
  session: Session | null;
};

export default function LoginButton({ session }: LoginButtonProps) {
  // const [showWindow, setShowWindow] = useState(false);

  if (session === null) {
    return (
      <div className='absolute top-3 right-3 z-10'>
        <button
          className='rounded-3xl px-4 py-2 font-extrabold text-[#182525]  border-[#2B4141] border-2'
          onClick={() => signIn()}
        >
          Log In
        </button>
        {/* {showWindow && (
          <LoginWindow session={session} onClose={() => setShowWindow(false)} />
        )} */}
      </div>
    );
  } else {
    return (
      <div className='flex absolute top-3 right-3 z-10'>
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
