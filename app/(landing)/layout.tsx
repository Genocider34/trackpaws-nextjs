import type { Metadata } from "next";

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
      <body>{children}</body>
    </html>
  );
}
