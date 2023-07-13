import "./globals.css";
import Navbar from "@/components/Navbar/Navbar";

export const metadata = {
  title: "uni-lectives",
  description: "Course review website for UNSW made by CSESoc",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="font-custom">
      <body>
        <Navbar />
        <div className="ml-20">{children}</div>
      </body>
    </html>
  );
}
