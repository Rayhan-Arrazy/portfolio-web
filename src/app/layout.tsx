import type { Metadata } from "next";
import "./globals.scss";

export const metadata: Metadata = {
  title: "Rayhan Arrazy | Full Stack Developer",
  description: "Portfolio of Rayhan Arrazy, a Full Stack Developer specializing in React, Node.js, and Modern Web Applications.",
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
