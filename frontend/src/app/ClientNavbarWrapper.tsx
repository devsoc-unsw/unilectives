"use client";

import { useSelectedLayoutSegment } from "next/navigation";
import Navbar from "@/components/Navbar/Navbar";
import type { ReactNode } from "react";
import type { Session } from "next-auth";

export default function ClientNavbarWrapper({
  children,
  session,
}: {
  children: ReactNode;
  session: Session | null;
}) {
  const segment = useSelectedLayoutSegment();
  const navbarExemptSegments = ["wrapped"]; // Add paths that do not require the navbar here

  // If segment does not exist i.e. we are at the root (or home) navbar should be displayed
  const showNavbar = segment ? !navbarExemptSegments.includes(segment) : true;

  return (
    <>
      {showNavbar && <Navbar userZid={session?.user?.id} />}
      <div className={showNavbar ? "ml-20 xs:ml-15" : ""}>{children}</div>
    </>
  );
}
