import "./globals.css";
import Navbar from "@/components/Navbar/Navbar";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

export const metadata = {
  title: "uni-lectives",
  description: "Course review website for UNSW made by CSESoc",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession(authOptions);
  console.log("layout re-rendered")
  return (
    <html lang="en" className="font-custom">
      <body>
        <Navbar zid={session?.user?.id}/>
        <div className="ml-20 xs:ml-15">{children}</div>
      </body>
    </html>
  );
}
