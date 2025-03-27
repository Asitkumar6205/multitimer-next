import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navigation from "./components/Navigation";
import { TimerProvider } from "./contexts/TimerContext";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "MultiTimer - Manage Multiple Timers",
  description: "A modern timer application for managing multiple timers with categories and history tracking.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <TimerProvider>
          <Navigation />
          {children}
        </TimerProvider>
      </body>
    </html>
  );
}
