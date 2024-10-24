import type { Metadata } from "next";
import NavBar from "./_components/NavBar";

export const metadata: Metadata = {
  title: "Track Paws",
};

export default function LandingLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <NavBar />
        {children}
      </body>
    </html>
  );
}
