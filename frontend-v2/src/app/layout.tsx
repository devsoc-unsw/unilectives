import "./globals.css";
import Provider from "@/lib/session-context";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { AlertProvider } from "@/lib/snackbar-context";

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
          <AlertProvider>{children}</AlertProvider>
        </Provider>
      </body>
    </html>
  );
}
