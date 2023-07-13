"use client";

import { FormEventHandler, useState } from "react";

export default function Login() {
  const [open, setOpen] = useState(false);
  const [error, setError] = useState<string>("");

  const [zid, setZid] = useState("");
  const [password, setPassword] = useState("");

  const login: FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();
    setError("");
    if (zid === "") {
      setError("zid not provided");
      return;
    }
    if (password === "") {
      setError("Password not provided");
      return;
    }
    if (!zid.startsWith("z")) {
      setError("zid should begin with z");
      return;
    }
    try {
      const res = await fetch("http://localhost:8080/api/v1/auth/login", {
        cache: "no-store",
        method: "POST",
        body: JSON.stringify({
          zid,
          password,
        }),
      });
      if (!res.ok) {
        const errorMessage = await res.json();
        setError(errorMessage.error);
        return;
      }
      const { token } = await res.json();
      localStorage.setItem("uetoken", token);
      setOpen(false);
    } catch (err) {
      setError("An error occurred when logging in.");
    }
  };
  return (
    <>
      <button
        className="rounded bg-gray-200 p-2 font-extrabold text-black"
        onClick={() => setOpen(true)}
      >
        Login
      </button>
      <dialog open={open}>
        <form
          method="dialog"
          className="bg-white rounded-lg p-8 shadow-lg flex-col items-center justify-center"
          onSubmit={login}
        >
          {error && (
            <div className="bg-red-200 text-red-800 p-2 mb-4 rounded">
              {error}
            </div>
          )}
          <h2 className="text-2xl font-bold mb-4">Login</h2>
          <p className="text-gray-600 mb-4">
            Please log in with the same credentials as your UNSW account
          </p>
          <div className="flex flex-col mb-4">
            <label className="mb-1">zID</label>
            <input
              value={zid}
              onChange={(e) => setZid(e.target.value)}
              className="border border-gray-300 rounded p-2"
            />
          </div>
          <div className="flex flex-col mb-4">
            <label className="mb-1">Password</label>
            <input
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              type="password"
              className="border border-gray-300 rounded p-2"
            />
          </div>
          <button
            type="submit"
            className="bg-blue-200 rounded p-2 font-bold text-black"
          >
            Log in
          </button>
        </form>
      </dialog>
    </>
  );
}
