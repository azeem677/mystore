"use client";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "./component/navbar";
import { Provider } from "react-redux";
import { store } from "./store/store";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

// export const metadata = {
//   title: "E-Commerce Store",
//   description: "A simple store built with Next.js & Tailwind",
// };

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
         <Provider store={store}>  
        <Navbar />
        {children}
        </Provider>
      </body>
    </html>
  );
}
