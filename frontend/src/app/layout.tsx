import type { Metadata } from "next";
import { Unbounded, JetBrains_Mono } from "next/font/google";
import "./tailwind-built.css";
import "./globals.css";
import { ThemeProvider } from "@/hooks/useTheme";
import { Web3Provider } from "@/hooks/useWeb3";
import { PageTransition } from "@/components/PageTransition";
import { FallingLeavesCanvas } from "@/components/FallingLeavesCanvas";

const unbounded = Unbounded({
  subsets: ["latin"],
  variable: "--font-unbounded",
  display: "swap",
  weight: ["600", "700", "800", "900"],
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains-mono",
  display: "swap",
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "OmniSurge | Sub-Second Concentrated Liquidity Protocol",
  description:
    "Autonomous Just-In-Time concentrated liquidity rebalancer on Base Sepolia and Unichain Sepolia via the Reactive Network.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      data-theme="dark"
      className={`${unbounded.variable} ${jetbrainsMono.variable} antialiased bg-[#0A0A0A] text-[#EDEDED]`}
    >
      <body className="min-h-screen bg-[#0A0A0A] text-[#EDEDED] flex flex-col font-sans overflow-x-clip selection:bg-[#E23B3B]/30">
        <FallingLeavesCanvas />
        <ThemeProvider>
          <Web3Provider>
            <PageTransition>{children}</PageTransition>
          </Web3Provider>
        </ThemeProvider>
      </body>
    </html>
  );
}
