import "./globals.css";
import Provider from "@/lib/session-context";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { AlertProvider } from "@/lib/snackbar-context";
import Navbar from "@/components/Navbar/Navbar";

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

  return (
    <html lang="en" className="font-custom">
      <body>
        <Provider session={session}>
          <AlertProvider>
            <Navbar zid={session?.user?.id} />
            <div className="ml-20 xs:ml-15">{children}</div>
          </AlertProvider>
        </Provider>
      </body>
    </html>
  );
}
