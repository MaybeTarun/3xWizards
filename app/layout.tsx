import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { MyContextProvider } from "@/app/context/MyContext";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "zkLend",
  description: "Developed by 3xWizards",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} bg-black ${geistMono.variable} antialiased`}
      >
<MyContextProvider>{children}</MyContextProvider>      </body>
    </html>
  );
}
