import "./globals.css";

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
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
