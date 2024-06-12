import "./globals.css";
import Provider from "@/lib/session-context";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { AlertProvider } from "@/lib/snackbar-context";
import Navbar from "@/components/Navbar/Navbar";
import ThemeProviderComponent from "@/components/ThemeComponents/ThemeProvider";
import Head from "next/head";

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession(authOptions);

  return (
    <html lang='en' className='font-custom '>
      <head>
        <meta name="msapplication-TileColor" content="#38bdf8" />
        <meta name="theme-color" content="#ffffff" />
        <script
          dangerouslySetInnerHTML={{
            __html: `
                try {
                  if (localStorage.theme === 'dark' || (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
                    document.documentElement.classList.add('dark')
                    document.querySelector('meta[name="theme-color"]').setAttribute('content', '#1e293b')
                  } else {
                    document.documentElement.classList.remove('dark')
                  }
                } catch (_) {}
              `,
          }}
        />
      </head>
      <body className="bg-white dark:bg-slate-800 dark:text-gray-200">
        <Provider session={session}>
          <AlertProvider>
            <ThemeProviderComponent>
              <Navbar userZid={session?.user?.id} />
              <div className='ml-20 xs:ml-15 h-screen overflow-y-scroll'>
                {children}
              </div>
            </ThemeProviderComponent>
          </AlertProvider>
        </Provider>
      </body>
    </html >
  );
}
