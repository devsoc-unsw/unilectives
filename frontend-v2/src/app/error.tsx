"use client";

import { signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Error({error} : {error: Error}) {
  const router = useRouter();

  useEffect(() => {
    if (error.message === 'unauthorised') {
      signOut({
        redirect: false,
      });
    }
    router.push("/");
  }, []);

  return <></>;
}
