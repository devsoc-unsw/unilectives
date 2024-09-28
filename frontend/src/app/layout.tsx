import "./globals.css";
import Provider from "@/lib/session-context";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { AlertProvider } from "@/lib/snackbar-context";
import ThemeProviderComponent from "@/components/ThemeComponents/ThemeProvider";
import ClientNavbarWrapper from './ClientNavbarWrapper';

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession(authOptions);

  return (
    <html lang='en' className='font-custom '>
      <head>
        {/* Only used in Safari - Change Navbar to slate-800 colors when dark mode */}
        <meta name="theme-color" content="#ffffff" />
        {/* Fetch theme of user before page is loaded in order to avoid flashing in safari.
         also sets theme-color meta tag to the appropriate color */}
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
      <script defer data-domain="cselectives.staging.csesoc.unsw.edu.au" src="https://plausible.io/js/script.js"></script>
      </head>
      <body className="bg-white dark:bg-slate-800 dark:text-gray-200">
        <Provider session={session}>
          <AlertProvider>
            <ThemeProviderComponent>
              <ClientNavbarWrapper session={session}>
                {children}
              </ClientNavbarWrapper>
            </ThemeProviderComponent>
          </AlertProvider>
        </Provider>
      </body>
    </html >
  );
}
