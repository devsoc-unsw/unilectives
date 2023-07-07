"use client";
import { FormEvent, useState } from "react";
import { signIn, signOut } from "next-auth/react";
import { Session } from "next-auth";

type LoginWindowProps = {
  onClose: () => void;
  session: Session | null;
};

export default function LoginWindow({ onClose, session }: LoginWindowProps) {
  const [zid, setZid] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");
    if (zid === "") {
      setError("Please enter a valid zID");
      return;
    }
    if (password === "") {
      setError("Please enter your UNSW password");
      return;
    }

    try {
      const res = await fetch("http://localhost:8080/api/v1/auth/verify", {
        method: "POST",
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          zid: zid.startsWith("z") || zid.startsWith("Z") ? zid.slice(1) : zid,
          password: password,
        }),
      });
      if (!res.ok) {
        if (res.headers.get('Content-Type')?.includes('application/json')) {
          const errorMessage = await res.json();
          setError(errorMessage.error);
        } else {
          setError("Something went wrong, try again");
        }
        return;
      }
      onClose();
    } catch (err) {
      console.log(err);
      setError("Something went wrong, try again");
    }
  };

  return (
    <div
      className='fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center'
      onClick={onClose}
    >
      <form
        className='relative bg-white rounded-xl py-6 px-24 shadow-lg flex flex-col'
        onSubmit={handleSubmit}
        onClick={(e) => e.stopPropagation()}
      >
        <div className='absolute top-0 right-0 m-2'>
          <button type='button' className='rounded-full px-4 py-2 border' onClick={onClose}>
            X
          </button>
        </div>
        <h2 className='text-2xl font-bold mb-4'>Login</h2>
        <p className='text-gray-600 mb-4'>
          Please log in with your UNSW account
        </p>
        {/* I will create a more dynamic error handling system with the input boxes later */}
        {error && (
          <div className='bg-red-200 text-red-800 p-2 mb-4 rounded h-10'>
            {error}
          </div>
        )}
        <div className='flex flex-col mb-4'>
          <label className='mb-1'>zID</label>
          <input
            placeholder='z1234567'
            value={zid}
            onChange={(e) => setZid(e.target.value)}
            className='border border-gray-300 rounded-md p-2 w-full'
          />
        </div>
        <div className='flex flex-col mb-4'>
          <label className='mb-1'>Password</label>
          <input
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            type='password'
            className='border border-gray-300 rounded-md p-2 w-full'
          />
        </div>
        <div className='flex flex-row content-center justify-center gap-3'>
          <button
            type='submit'
            className='bg-blue-200 rounded p-2 font-bold text-black'
          >
            Log in
          </button>
          <button
            className='bg-blue-50 rounded p-2 font-bold text-black'
            type="button"
            onClick={() => signIn("google")}
          >
            Guwoogle
          </button>
        </div>
      </form>
    </div>
  );
}
