import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Emperor Graphics | Building Visual Dominance",
  description:
    "A premium graphic design portfolio for Emperor Graphics, showcasing brand identity, logo design, social media graphics, and promotional design work.",
};

export default function RootLayout({
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
